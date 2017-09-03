import express from 'express'
import net from 'net'
import cors from 'cors'
import bodyParser from 'body-parser'
import level from 'level'
import hyperlog from 'hyperlog'

import signLog from './signLog'
import verifyLog from './verifyLog'
import signerAddress from './signerAddress'
import logWebHookEvent from './logWebHookEvent'
import handleWebHookEvent from './handleWebHookEvent'

export default class GitTokenWebHookManager {
  constructor({ port, signerIpcPath, logDBPath, recoveryShare }) {

    // Web Hook Mgr. Bound methods
    this.signLog            = signLog.bind(this)
    this.verifyLog          = verifyLog.bind(this)
    this.signerAddress      = signerAddress.bind(this)
    this.logWebHookEvent    = logWebHookEvent.bind(this)
    this.handleWebHookEvent = handleWebHookEvent.bind(this)
    this.signerIpcPath      = signerIpcPath

    this.recoveryShare   = recoveryShare
    this.signerConnect()

    // Hyperlog DAG Store
    this.level = level(logDBPath)
    this.log = hyperlog(this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: null,
      sign: this.signLog,
      verify: this.verifyLog
    })

    // Express Application
    this.app = express()

    this.app.use(cors())
    this.app.use(bodyParser.json()) // handle json data
    this.app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
    this.app.post('/', this.handleWebHookEvent)

    this.app.listen(port, () => {
      console.log(`GitToken Web Hook Manager Listening for Events on Port ${port}`)
    })
  }

  signerConnect() {
    this.signer = net.connect(this.signerIpcPath)
    this.signer.on('connect', () => {
      console.log('Connected to GitToken Signer')
      this.signer.write(JSON.stringify({ event: 'get_address' }))
      this.signer.on('data', (msg) => {
        const { event, result } = JSON.parse(msg)
        if (event == 'get_address') {
          console.log('GitToken Signer Address: ', result)
          this.log.identity = result
        }
      })
    })

    this.signer.on('error', () => {
      console.log('Connection Error to GitToken Signer.')
      this.signerReconnect()
    })

    this.signer.on('end', () => {
      console.log('Connection to GitToken Signer Closed.')
      this.signerReconnect()
    })
  }

  signerReconnect() {
    console.log('Attempting to Reconnect in 15 seconds...')
    setTimeout(() => {
      console.log('Attempting to Reconnect.')
      this.signerConnect()
    }, 1000 * 15)
  }

}

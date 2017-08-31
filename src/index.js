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

export default class GitTokenWebHookManager {
  constructor({ port, signerIpcPath, logDBPath, recoveryShare }) {

    // Web Hook Mgr. Bound methods
    this.signLog         = signLog.bind(this)
    this.verifyLog       = verifyLog.bind(this)
    this.signerAddress   = signerAddress.bind(this)
    this.logWebHookEvent = logWebHookEvent.bind(this)

    this.recoveryShare   = recoveryShare
    this.signer          = net.connect(signerIpcPath)

    // Hyperlog DAG Store
    this.level = level(logDBPath)
    this.log = hyperlog(this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: this.signerAddress(),
      sign: this.signLog,
      verify: this.verifyLog
    })


    // Express Application
    this.app = express()

    this.app.use(cors())
    this.app.use(bodyParser.json()) // handle json data
    this.app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
    this.app.post('/', this.logWebHookEvent)

    this.app.listen(port, () => {
      console.log(`GitToken Web Hook Manager Listening for Events on Port ${port}`)
    })
  }


}

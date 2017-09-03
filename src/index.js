import express from 'express'
import net from 'net'
import cors from 'cors'
import bodyParser from 'body-parser'
import level from 'level'
import hyperlog from 'hyperlog'
import chalk from 'chalk'

import GitTokenSignerClient from 'gittoken-signer/dist/signerClient'

import signLog from './signLog'
import verifyLog from './verifyLog'
import logWebHookEvent from './logWebHookEvent'
import handleWebHookEvent from './handleWebHookEvent'

export default class GitTokenWebHookManager extends GitTokenSignerClient {
  constructor({ port, signerIpcPath, logDBPath, recoveryShare }) {
    super({ signerIpcPath })

    // Web Hook Mgr. Bound methods
    this.signLog            = signLog.bind(this)
    this.verifyLog          = verifyLog.bind(this)
    this.logWebHookEvent    = logWebHookEvent.bind(this)
    this.handleWebHookEvent = handleWebHookEvent.bind(this)
    this.signerIpcPath      = signerIpcPath
    this.recoveryShare      = recoveryShare

    // Hyperlog DAG Store
    this.level = level(logDBPath)
    this.log = hyperlog(this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: this.signerAddress,
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
      console.log(chalk.hex('#210b49').bgHex('#cc5333')(`GitToken Web Hook Manager Listening for Events on Port ${port}`))
    })
  }
}

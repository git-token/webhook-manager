import express from 'express'
import net from 'net'
import cors from 'cors'
import bodyParser from 'body-parser'
import level from 'level'
import hyperlog from 'hyperlog'
import chalk from 'chalk'
import mysql from 'mysql'

import GitTokenSignerClient from 'gittoken-signer/dist/signerClient'

import {
  processEvent,
  signLog,
  verifyLog,
  calculateRewardBonus
} from './utils/index'

import {
  selectFromRegistry,
  insertIntoWebhook
} from './sql/index'

import {
  saveEvent,
  validateOrganization
} from './middleware/index'

import {
  handleWebHookEvent
} from './controllers/index'

import {
  pingEvent
} from './events/index'

import {
  deploy,
  rewardContributor
} from './contract/index'

import webhookRouter from './router/index'



export default class GitTokenWebHookManager extends GitTokenSignerClient {
  constructor({
    port,
    signerIpcPath,
    logDBPath,
    recoveryShare,
    mysqlHost,
    mysqlUser,
    mysqlRootPassword,
    mysqlDatabase
  }) {
    super({ signerIpcPath })

    // // Methods
    this.signLog              = signLog.bind(this)
    this.verifyLog            = verifyLog.bind(this)
    this.processEvent         = processEvent.bind(this)
    this.selectFromRegistry   = selectFromRegistry.bind(this)
    this.insertIntoWebhook    = insertIntoWebhook.bind(this)
    this.saveEvent            = saveEvent.bind(this)
    this.validateOrganization = validateOrganization.bind(this)
    this.webhookRouter        = webhookRouter.bind(this)
    this.handleWebHookEvent   = handleWebHookEvent.bind(this)
    this.rewardContributor    = rewardContributor.bind(this)
    this.calculateRewardBonus = calculateRewardBonus.bind(this)
    this.deploy               = deploy.bind(this)
    this.pingEvent            = pingEvent.bind(this)


    // Variables
    this.signerIpcPath        = signerIpcPath
    this.recoveryShare        = recoveryShare
    // this.deployParams         = deployParams


    // Hyperlog DAG Store
    this.level = level(logDBPath)
    this.log = hyperlog(this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: this.signerAddress,
      sign: this.signLog,
      verify: this.verifyLog
    })


    this.mysql = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase,
    })

    // Express Application
    this.app = express()

    this.app.use(cors())
    this.app.use(bodyParser.json()) // handle json data
    this.app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data
    this.app.use('/', this.webhookRouter())
    // this.app.get('/', this.getLoggedEvents)

    this.app.listen(port, () => {
      console.log(chalk.hex('#210b49').bgHex('#cc5333')(`GitToken Web Hook Manager Listening for Events on Port ${port}`))
    })
  }
}

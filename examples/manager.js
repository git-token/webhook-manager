const Promise = require('bluebird')
const GitTokenWebHookManager = require('../dist/index').default

const {
  port,
  logDBPath,
  signerIpcPath,
  recoveryShare,
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase
} = require('../config')

const manager = new GitTokenWebHookManager({
  port,
  logDBPath,
  signerIpcPath,
  recoveryShare,
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase
})

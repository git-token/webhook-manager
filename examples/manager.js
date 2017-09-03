const Promise = require('bluebird')
const GitTokenWebHookManager = require('../dist/index').default

const {
  port,
  logDBPath,
  signerIpcPath,
  recoveryShare
} = require('../config')

const manager = new GitTokenWebHookManager({
  port,
  logDBPath,
  signerIpcPath,
  recoveryShare
})

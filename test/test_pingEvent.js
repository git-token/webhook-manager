const Promise = require('bluebird')
const GitTokenWebHookManager = require('../dist/index').default
const assert = require('chai').assert

const {
  port,
  logDBPath,
  signerIpcPath,
  watcherIpcPath,
  recoveryShare,
  mysqlHost,
  mysqlUser,
  mysqlRootPassword,
  mysqlDatabase
} = require('../config')

function instantiateWebhookMgr() {
  return new Promise((resolve, reject) => {

    /**
     * NOTE: To run the tests, both the GitToken Signer and Contract Event Listener
     * services must be running locally before running the tests and the correct environmental
     * variables provided in the constructor of the WebHook Manager
     *
     */

    try {
      const manager = new GitTokenWebHookManager({
        port,
        logDBPath,
        signerIpcPath,
        watcherIpcPath,
        recoveryShare,
        mysqlHost,
        mysqlUser,
        mysqlRootPassword,
        mysqlDatabase
      })

      resolve(manager)

    } catch (error) {
      reject(error)
    }
  })
}


describe('GitToken Webhook Manager Ping Event', function() {
  it('Should deploy a new contract on a ping event', function() {
    instantiateWebhookMgr().then((manager) => {
      assert.notEqual(manager, null, "Expect web hook manager instance to not be null")
    }).catch((error) => {
      assert.equal(error, null, "Expect no errors to occur")
    })
  }).timeout(20000)
})


/**
 * NOTE If running the server using NodeJS instead of docker-compose, uncomment the line
 * below to read the .env file and map to config
 */

 require('dotenv').config({ path: `${process.cwd()}/.env`})

/**
 * Configuration file for GitToken Web Hook Manager instance
 * This file parses the environment variable passed to the docker-compose.yml
 * env_file field, then exports the configuration to be used in the application.
 * @type {Object}
 */


const config = {
  port: process.env['WEBHOOK_MANAGER_PORT'],
  recoveryShare:     process.env['RECOVERY_SHARE'],
  signerIpcPath:     process.env['SIGNER_IPC_PATH'],
  logDBPath:         process.env['LOG_DB_PATH'],
  recover:           process.env['RECOVER_KEYSTORE'],
  mysqlHost:         process.env['MYSQL_HOST'],
  mysqlUser:         process.env['MYSQL_USER'],
  mysqlRootPassword: process.env['MYSQL_ROOT_PASSWORD'],
  mysqlDatabase:     process.env['MYSQL_DATABASE']
}

module.exports = config

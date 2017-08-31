import express from 'express'
import net from 'net'
import cors from 'cors'
import bodyParser from 'body-parser'
import level from 'level'
import hyperlog from 'hyperlog'

export default class GitTokenWebHookManager {
  constructor({ port, dbPath, signerIpcPath }) {

    this.signLog         = signLog.bind(this)
    this.verifyLog       = verifyLog.bind(this)
    this.signerAddress   = signerAddress.bind(this)
    this.logWebHookEvent = logWebHookEvent.bind(this)

    this.signer = net.connect(signerIpcPath)

    this.app = express()
    this.app.use(cors())
    this.app.use(bodyParser.json()) // handle json data
    this.app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

    this.level = level(dbPath)
    this.log = hyperlog(this.level, {
      id: 'GitToken'
      identity: this.signerAddress()
      sign: this.signLog,
      verify: this.verifyLog
    })


    this.app.use('/', this.logWebHookEvent)

    this.app.listen(port, () => {
      console.log(`GitToken Server Listening on Port ${port}`)
    })
  }


}

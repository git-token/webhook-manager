import { sha3 } from 'ethereumjs-util'

export default function signLog(node, cb) {
  // Set the identity of the logger to the signer address if it is null
  if (!this.log.identity) { this.log.identity = this.signerAddress }

  this.signer.write(JSON.stringify({
    event: 'sign_message',
    data: {
      messageHash: sha3(node.key).toString('hex'),
      recoveryShare: this.recoveryShare
    }
  }))

  this.signer.on('data', (msg) => {
    const { event, result } = JSON.parse(msg)
    if (event == 'sign_message') {
      cb(null, JSON.stringify(result));
    }
  })
}

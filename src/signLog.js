import { sha3 } from 'ethereumjs-util'

export default function signLog(node, cb) {
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

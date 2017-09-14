import { sha3, ecrecover } from 'ethereumjs-util'

export default function verifyLog(node, cb) {
  if (!node.signature || !node.identity || !node.key) { cb(null, false) }
  console.log('node', node)

  const signature  = JSON.parse(node.signature)
  console.log('signature', signature)

  const { v, r, s } = signature
  console.log('v, r, s', v, r, s)

  const hash       = sha3(node.key).toString('hex')
  console.log('hash', hash)

  const pubKey     = ecrecover(hash, v, r, +s)
  console.log('pubKey', pubKey)

  const match = pubKey.toString('hex') == node.identity.toString('hex')
  console.log('match', match)

  cb(null, match)

}

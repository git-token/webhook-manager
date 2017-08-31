export default function signerAddress() {
  this.signer.write(JSON.stringify({ event: 'get_address' }))
  this.signer.on('data', (msg) => {
    const { event, result } = JSON.parse(msg)
    if (event == 'get_address') { return result; }
  })
}

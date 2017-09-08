import Promise from 'bluebird'

export default function deploy() {
  return new Promise((resolve, reject) => {

    const msgID = `deploy_contract_${new Date().getTime()}`

    this.signer.write(JSON.stringify({
      id: msgID,
      event: 'deploy_contract',
      data: {
        params: [
          this.deployParams.contributor,
          this.deployParams.name,
          this.deployParams.username,
          this.deployParams.organization,
          this.deployParams.symbol,
          this.deployParams.decimals
        ],
        recoveryShare: this.recoveryShare
      }
    }))

    this.signer.on('data', (msg) => {
      console.log('deploy::msg', msg)
      const { event, result, id } = JSON.parse(msg)
      if (event == 'deploy_contract' && msgID == id) {
        resolve(result)
      } else if (event == 'error' && msgID == id) {
        reject(result)
      }
    })
  })
}

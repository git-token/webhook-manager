import Promise from 'bluebird'

export default function deploy() {
  return new Promise((resolve, reject) => {
    console.log('deploy contract')
    this.signer.write(JSON.stringify({
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
      const { event, result } = JSON.parse(msg)
      if (event == 'deploy_contract') {
        resolve(result)
      } else if (event == 'error') {
        reject(result)
      }
    })
  })
}

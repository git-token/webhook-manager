import Promise from 'bluebird'

/**
 * [deploy description]
 * @param  {[type]} tokenDetails [description]
 * @return [type]                [description]
 */
export default function deploy({ tokenDetails }) {
  return new Promise((resolve, reject) => {

    const msgID = `deploy_contract_${new Date().getTime()}`

    const payload = {
      id: msgID,
      event: 'deploy_contract',
      data: {
        params: [
          tokenDetails['admin_address'],
          tokenDetails['name'],
          tokenDetails['admin_username'],
          tokenDetails['organization'],
          tokenDetails['symbol'],
          tokenDetails['decimals']
        ],
        organization: tokenDetails['organization'],
        recoveryShare: this.recoveryShare
      }
    }

    console.log('payload', payload)
    this.signer.write(JSON.stringify(payload))

    this.signer.on('data', (_msg) => {
      const msg = JSON.parse(_msg.toString('utf8'))
      console.log('deploy::msg', msg)
      const { event, result, id } = msg
      if (event == 'deploy_contract' && msgID == id) {
        resolve(result)
      } else if (event == 'error' && msgID == id) {
        reject(result)
      }
    })
  })
}

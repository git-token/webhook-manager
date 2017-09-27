import Promise from 'bluebird'
import split from 'split'

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

    // console.log('payload', payload)
    this.signer.write(JSON.stringify(payload))

    this.signer.on('data', (msg) => {
      const { event, result, id } = JSON.parse(msg.toString('utf8'))
      if (event == 'deploy_contract' && msgID == id) {
        resolve(result)
      } else if (event == 'error' && msgID == id) {
        reject(result)
      }
    })
  })
}

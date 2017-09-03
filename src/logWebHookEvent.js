import Promise from 'bluebird'

export default function logWebHookEvent({ headers, body }) {
  return new Promise((resolve, reject) => {
    this.log.add(null, JSON.stringify({ headers, body }), (error, node) => {
      if (error) { reject(error) }
      resolve(node)
    })
  })
}

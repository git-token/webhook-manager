import Promise from 'bluebird'

export default function logWebHookEvent({ headers, body }) {
  return new Promise((resolve, reject) => {
    this.log.heads((error, heads) => {
      if (error) { reject(error) }

      let links = []
      let latest = heads[heads.length-1];

      if (heads.length) {
        links = latest.links.concat(latest.key)
      }

      this.log.add([ ...links ], JSON.stringify({ headers, body }), (error, node) => {
        if (error) { reject(error) }
        resolve(node)
      })
    })
  })
}

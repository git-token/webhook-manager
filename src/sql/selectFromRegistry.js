import Promise from 'bluebird'

export default function selectFromRegistry({ key, value }) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      select * from registry where ${key}="${value}";
    `, (error, result) => {
      if (error) { reject(error) }
      if (!result[0]) {
        reject('Error: Organization not registered!')
      } else {
        resolve(result[0])
      }
    })
  })
}

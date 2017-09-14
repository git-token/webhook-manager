import Promise from 'bluebird'

/**
 * [insertIntoWebhook description]
 * @param  {String} [delivery_id]   [description]
 * @param  {String} [event]         [description]
 * @param  {String} [action]        [description]
 * @param  {String} [request_url]   [description]
 * @param  {String} [organization]  [description]
 * @param  {String} [contributor]   [description]
 * @param  {Date}   [date_received] [description]
 * @return [type]                   [description]
 */
export default function insertIntoWebhook({
  delivery_id="",
  event="",
  action="",
  request_url="",
  organization="",
  contributor="",
  date_received=new Date().getTime()
}) {
  return new Promise((resolve, reject) => {
    this.mysql.query(`
      INSERT INTO webhook (
        delivery_id,
        event,
        action,
        request_url,
        organization,
        contributor,
        date_received
      ) VALUES (
        "${delivery_id}",
        "${event}",
        "${action}",
        "${request_url}",
        "${organization}",
        "${contributor}",
        ${date_received}
      )
    `, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

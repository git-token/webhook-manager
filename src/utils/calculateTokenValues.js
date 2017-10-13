import Promise from 'bluebird'

export default function calculateTokenValues({ eventDetails }) {
  return new Promise ((resolve, reject) => {



    resolve({
      rewardValue: 0,
      reservedValue: 0
    })
  })
}

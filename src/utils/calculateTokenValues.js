import Promise from 'bluebird'
import { rewardValues, reservedValues } from 'gittoken-reward-values'

export default function calculateTokenValues({ eventDetails }) {
  return new Promise ((resolve, reject) => {

    /**
     * TODO: Parse event details and payload body for reward values
     */


    resolve({
      rewardValue: 0,
      reservedValue: 0
    })
  })
}

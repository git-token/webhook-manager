import Promise from 'bluebird'

export default function generateReward ({ rewardType, deliveryID, contributorUsername, rewardBonus, reservedType }) {
  return new Promise((resolve, reject) => {
    const params = [ contributorUsername, rewardType, reservedType, rewardBonus, deliveryID ]
    
  })
}

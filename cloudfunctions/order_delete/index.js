
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

exports.main = async (event, context) => {
  const db = cloud.database()
  let { _id } = event
  const collectionDirection = db.collection('order')
  let res = await collectionDirection.where({_id}).remove()
  console.log(res)
  return {
    res
  }
}
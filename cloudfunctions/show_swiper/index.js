
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

exports.main = async (event, context) => {
  const db = cloud.database()
  const collectionDirection = db.collection('swiper')
  let res = await collectionDirection.get()
  console.log(res)
  return {
    res
  }
}
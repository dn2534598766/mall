// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let { OPENID } = cloud.getWXContext()
  const db = cloud.database()
  const collectionDirection = db.collection('address')
  let res = await collectionDirection.where({_openid:OPENID}).get()
  console.log(res)
  return {
    res
  }
}
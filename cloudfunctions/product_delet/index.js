// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const ap = cloud.getWXContext()
  try {
    return await db.collection('shopping_carts').where({
      _openid:ap.OPENID,
      product_checked: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}
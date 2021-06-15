// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let { OPENID } = cloud.getWXContext()
  let {name,phone_number,address,beizhu,money,product,time,product_state} = event
  const db = cloud.database()
  const collectionDirection = db.collection('order')
  let res = await collectionDirection.add({
    data:{
      _openid:OPENID,
      name,
      phone_number,
      address,
      beizhu,
      money,
      product,
      time,
      product_state
    }
  })
  console.log(res)
  return {
    res
  }
}
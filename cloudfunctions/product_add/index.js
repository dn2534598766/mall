// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {name,src,price,id,num,product_checked,color,size} = event
  let { OPENID } = cloud.getWXContext()
  const db = cloud.database()
  const collectionDirection = db.collection('shopping_carts')
  let res = await collectionDirection.add({
    data:{name,src,price,id,num,product_checked,color,size,_openid:OPENID}
  })
  console.log(res)
  return {
    res
  }
}
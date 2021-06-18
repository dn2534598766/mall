// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gpqxhoq044253ee',
})

// 云函数入口函数
exports.main = async (event, context) => {
  let {id,product_checked} = event
  const db = cloud.database()
  const collectionDirection = db.collection('shopping_carts')
  let res = await collectionDirection.doc(id).update({
    data:{
      product_checked
    }
  })
  console.log(res)
  return {
    res
  }
}
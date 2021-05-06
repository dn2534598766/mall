const db = wx.cloud.database()
const util = require('../../utils/util.js')
Page({
  data:{
    money:0,
    product:[],
    address:'',
    num:'',
    name:''
  },
  onLoad(option){
    let that=this
    let product=JSON.parse(option.product)
    let product2=product.data
    this.setData({
      money:option.money,
      product:product2
    })
    db.collection('address').get({
      success(res){
        console.log(res.data[res.data.length-1].address)
        that.setData({
          address:res.data[res.data.length-1].address,
          name:res.data[res.data.length-1].name,
          num:res.data[res.data.length-1].num
        })
      },
      err(res){
        console.log('获取address云数据库失败',res)
      }
    })
  },
  onshow(){
    this.onLoad()
  },
  pay:function(e){
    let that = this
    var DATE = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""){
      db.collection('order').add({
            data:{
              name:that.data.name,
              phone_number:that.data.num,
              address:that.data.address,
              beizhu:that.data.beizhu,
              money:that.data.money,
              product:that.data.product,
              time:DATE,
              product_state:"待发货"
            },success:function(res){
              console.log('下单成功',res)
              wx.cloud.callFunction({
                name:"product_delet",
                data:{
                },
                success:function(res){
                  console.log('购物车删除成功',res)
                  for(var i= 0;i<that.data.product.length;i++){
                    wx.cloud.callFunction({
                      name:"inc_product_num",
                      data:{
                        product_id:that.data.product[i].product_id
                      },success:function(res){
                        console.log('商品销量自加成功',res)
                      }
                    })
                  }
                  wx.switchTab({
                    url: '../cart/cart',
                  })
                },fail:function(res){
                  console.log('购物车删除失败',res)
                }
              })
            },fail:function(res){
              console.log('下单失败',res)
            }
          })
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
    
  },
  beizhu:function(e){
    let that = this
    console.log(e)
    that.setData({
      beizhu:e.detail.value
    })
  }
})
 

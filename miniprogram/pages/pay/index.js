const db = wx.cloud.database()
const util = require('../../utils/util.js')
Page({
  data:{
    money:0,
    product:[],
    address:'',
    num:'',
    name:'',
    control:false,
    aaa:0
  },
  async onLoad(option){
    console.log(option.product)
    let that=this
    if(option.product){
    let product=JSON.parse(option.product)
    let product2=product.data

    this.setData({
      money:option.money,
      product:product2
    })
    }else{
      console.log(option.product2)
      let product3=JSON.parse(option.product2)
      this.setData({
        product:product3,
        money:option.money
      })
    }

    
    await wx.cloud.callFunction({
      name:'address'
    }).then(res=>{
      that.setData({
              address:res.result.res.data[res.result.res.data.length-1].address,
              name:res.result.res.data[res.result.res.data.length-1].name,
              num:res.result.res.data[res.result.res.data.length-1].num
            })
            if(res.result.res.data.length!=0){
              that.setData({
                control:"true"
              })
            }
    })
    // db.collection('address').get({
    //   success(res){
    //     console.log(res.data.length)
    //     console.log(res.data[res.data.length-1].address)
        
    //     console.log(that.data.control)
    //     that.setData({
    //       address:res.data[res.data.length-1].address,
    //       name:res.data[res.data.length-1].name,
    //       num:res.data[res.data.length-1].num
    //     })
    //     if(res.data.length!=0){
    //       that.setData({
    //         control:"true"
    //       })
    //     }
    //   },
    //   err(res){
    //     console.log('获取address云数据库失败',res)
    //   }
    // })
  },
  onshow(){
    this.onLoad()
  },
  async pay(e){
    let that = this
    var DATE = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""){
      if(that.data.aaa!=1){
        that.setData({
          aaa:1
        })

        
        await wx.cloud.callFunction({
          name:'add_order',
          data:{
            name:that.data.name,
            phone_number:that.data.num,
            address:that.data.address,
            beizhu:that.data.beizhu,
            money:that.data.money,
            product:that.data.product,
            time:DATE,
            product_state:"待发货"
          }
        }).then(res=>{
           wx.cloud.callFunction({
            name:"product_delet"
          })
        })
        // db.collection('order').add({
        //   data:{
        //     name:that.data.name,
        //     phone_number:that.data.num,
        //     address:that.data.address,
        //     beizhu:that.data.beizhu,
        //     money:that.data.money,
        //     product:that.data.product,
        //     time:DATE,
        //     product_state:"待发货"
        //   },success:function(res){
        //     console.log('下单成功',res)
        //     wx.cloud.callFunction({
        //       name:"product_delet",
        //       data:{
        //       },
        //       success:function(res){
        //         console.log('购物车删除成功',res)
        //         for(var i= 0;i<that.data.product.length;i++){
        //           wx.cloud.callFunction({
        //             name:"inc_product_num",
        //             data:{
        //               product_id:that.data.product[i].product_id
        //             },success:function(res){
        //               console.log('商品销量自加成功',res)
        //             }
        //           })
        //         }
                wx.showToast({
                  title: '下单成功!',
                }).then(res=>{
                  
                  setTimeout(that.tiaozhuan,1000)
                })
                
                
                
        //       },fail:function(res){
        //         console.log('购物车删除失败',res)
        //       }
        //     })
        //   },fail:function(res){
        //     console.log('下单失败',res)
        //   }
        // })
      }
      else{
        
      }
      
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
    
  },
  tiaozhuan(){
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  beizhu:function(e){
    let that = this
    console.log(e)
    that.setData({
      beizhu:e.detail.value
    })
  },
  address(){
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  db.collection('address').add({
                    data:{
                      name:res.userName,
                      num:res.telNumber,
                      address:res.provinceName+res.cityName+res.countyName+res.detailInfo
                    },
                    success(res2){
                      console.log('添加地址成功'+res2)
                      wx.showToast({
                        title: '设置地址成功!',
                      })
                      console.log(res)
                      that.setData({
                        control:true,
                        name:res.userName,
                        num:res.telNumber,
                        address:res.provinceName+res.cityName+res.countyName+res.detailInfo
                      })
                    },
                    fail(res){
                      console.log(res)
                    }
                  })
                }
              })
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
})
 

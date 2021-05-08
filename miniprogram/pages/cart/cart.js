const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    control:"",
    money:0,
    delet_id:[],
    count:0,
    control2:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('shopping_carts').get({
      success:function(res){
        console.log('获取购物车商品成功',res)
        if(res.data.length==0){
          that.setData({
            control2:false
          })
        }else if(res.data.length!=0){
          that.setData({
            control2:true
          })
        }
        that.setData({
          product:res.data,
        })
        that.get_money_sum()
      },fail:function(res){
        console.log('获取购物车商品失败',res)
      }
    })
    // this.number()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let that=this
    // db.collection('shopping_carts').get({
    //   success(res){
    //     console.log('获取shopping_carts云数据库成功',res)
    //     that.setData({
    //       product:res.data
    //     })
    //   },
    //   err(res){
    //     console.log('获取shopping_carts云数据库失败',res)
    //   }
    // })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  xuanze(e){
    let that=this
    // console.log(e.detail.value[0])
    this.setData({
      delet_id:that.data.delet_id.concat(e.detail.value[0])
    })
    
    // console.log(e.target.dataset.id)
    if(e.detail.value.length !== 0){
      
      db.collection('shopping_carts').doc(e.target.dataset.id).update({
        data:{
          product_checked:"true",
        },success:function(res){
          that.onLoad()
          
        }
      })
      
    }else{
      db.collection('shopping_carts').doc(e.target.dataset.id).update({
        data:{
          product_checked:""
        },success:function(){
          that.onLoad()
          that.setData({
            control:""
          })
        }
      })
      
    }
    
  },
  all(e){
    let that = this
    
      if(that.data.control==""){
        for(let x=0;x<that.data.product.length;x++){
          db.collection('shopping_carts').doc(that.data.product[x]._id).update({
            data:{
              product_checked:"true",
            },success:function(res){
              that.onLoad()
            }
          })
        }
          this.setData({
            control:"true"
          })
        }
        else if(that.data.control=="true"){
          for(let x=0;x<that.data.product.length;x++){
          db.collection('shopping_carts').doc(that.data.product[x]._id).update({
            data:{
              product_checked:""
            },
            success:function(){
              that.onLoad()
            }
          })
        }
          this.setData({
            control:""
          })
          
    }
    
    
  },
  get_money_sum(){
    let that = this
    console.log(that.data.product)
    let money_sum=0
    for(let x=0;x<that.data.product.length;x++){
      if(that.data.product[x].product_checked=="true"){
        money_sum=money_sum+(that.data.product[x].num*that.data.product[x].price)
      }
    }
    that.setData({
      money:money_sum
    })
  },
  add(e){
    let that = this
    // console.log(e.currentTarget.dataset.id)
    db.collection('shopping_carts').doc(e.currentTarget.dataset.id).update({
      data:{
        num:_.inc(1)
      },
      success(res){
        console.log("商品数量+1",res)
        that.onLoad()
      },
      fail(res){
        console.log("获取商品价格失败",res)
      }
    })
  },
  sub(e){
    let that = this
    console.log(e.currentTarget.dataset.id)
    db.collection('shopping_carts').doc(e.currentTarget.dataset.id).update({
      data:{
        num:_.inc(-1)
      },
      success(res){
        console.log("商品数量-1",res)
        that.onLoad()
      },
      fail(res){
        console.log("获取商品价格失败",res)
      }
    })
  },
  delete:function(){
    let that = this
    wx.cloud.callFunction({
      name:"product_delet",
      success:function(res){
        console.log('删除商品成功',res)
        that.onLoad()
        that.setData({
          control:""
        })
      },fail:function(res){
        console.log('删除商品失败',res)
      }
    })
  },
  pay(e){
    let that = this
    db.collection('shopping_carts').where({
      product_checked:"true"
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        if(res.data.length == 0){
          wx.showToast({
            title: '你还未选择商品',
            icon:"none"
          })
        }else{
          wx.redirectTo({
            url: '../pay/index?money='+that.data.money+"&product="+JSON.stringify(res)
          })
        }
      },fail:function(res){
        console.log('获取商品失败',res)
      }
    })
  },
  toIndex(){
    wx.switchTab({
      url:'../../pages/index/index'
    })
  }
  // number(){
  //   let that = this
  //   let count=that.data.count
  //   for(let x=0;x<that.data.product.length;x++){
  //     if(that.data.product[x].product_checked==""){
  //       count++
  //     }
  //   }
  //   that.setData({
  //     count:count
  //   })
  // }
  
})
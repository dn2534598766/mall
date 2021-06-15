const db = wx.cloud.database()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待发货', index: 2 },{name:'待收货',index:3},{name:'待评价',index:4}],
    product:[],
    control:true,
    deviceW:0,
    deviceH:0

    // ,{name:'待收货',index:3},{name:'待发货',index:4}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if(options){
      this.setData({
        currtab:options.num
      })
    }
    let that = this

    await wx.cloud.callFunction({
      name:'show_order'
    }).then(res=>{
      if(res.result.res.data.length==0){
        that.setData({
          control:false
        })
      }else if(res.result.res.data.length!=0){
        that.setData({
          control:true
        })
      }
      that.setData({
        product:res.result.res.data
      })
    })
    // db.collection('order').get({
    //   success:function(res){
    //     console.log(res.data.length)
    //     console.log('获取订单商品成功',res)
    //     if(res.data.length==0){
    //       that.setData({
    //         control:false
    //       })
    //     }else if(res.data.length!=0){
    //       that.setData({
    //         control:true
    //       })
    //     }
    //     that.setData({
    //       product:res.data
    //     })
    //   },fail:function(res){
    //     console.log('获取订单商品失败',res)
    //   }
    // })
  },
  // onShow(){
  //   let that = this
  //   db.collection('order').get({
  //     success:function(res){
  //       console.log('获取订单商品成功',res)
  //       that.setData({
  //         product:res.data
  //       })
  //     },fail:function(res){
  //       console.log('获取订单商品失败',res)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    this.setData({
      
    })
  },
 
  waitPayShow:function(){
    this.setData({
      waitPayOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "186" }],
    })
  },
 
  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "已取消", time: "2018-10-4 10:00-12:00", status: "未开始", url: "../../images/bad1.jpg", money: "122" }],
    })
  },
  async delete(e){
    console.log(e)
    await wx.cloud.callFunction({
      name:'order_delete',
      data:{
        _id:e.currentTarget.dataset.id
      }
    })
    
    // db.collection('order').where({
    //   _id:e.currentTarget.dataset.id
    // }).remove()
    wx.showToast({
      title: '删除订单成功',
    })
    this.onLoad()
  },
  click(e){
    console.log(e.currentTarget.dataset)
    let message=e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/detail?name='+message.name+'&src='+message.src+'&price='+message.price+'&id='+message.id
    })
  }
 
  
})

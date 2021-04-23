const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:'',
    state:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  defaultFun:function(data){
    app.http('v1/user/defaultCity', {
      id: data.currentTarget.dataset.item._id
    }, 'POST')
      .then(res => {
        app.globalData.userInfo.address = res.data
        this.setData({
          id: res.data._id
        })
        if (this.data.state == 1){
          wx.navigateBack({
            delta: 1
          })
        }
      })
  },
  onLoad: function (options) {
    this.setData({
      id: app.globalData.userInfo.address._id,
      state: options ? options.type:null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onShow: function () {
    app.http('v1/user/cityList', {
      openid: app.globalData.openid
    })
      .then(res => {
        this.setData({
          list: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  

  
 
})
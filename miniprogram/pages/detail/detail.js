const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    name:'',
    price:0,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      src:options.src,
      name:options.name,
      price:options.price,
      id:options.id
    })
  },
  addCart(){
    let that = this
    db.collection('shopping_carts').where({
      id:that.data.id
    }).get({
      success(res){
        console.log(res)
        if(res.data==''){
          db.collection('shopping_carts').add({
            data:{
              name:that.data.name,
              src:that.data.src,
              price:that.data.price,
              id:that.data.id,
              num:1
            },
            success(res){
              console.log('加入购物车成功'+res)
              wx.showToast({
                title: '加入购物车成功!',
              })
            },
            fail(res){
              console.log(res)
            }
          })
        }else{
          wx.showToast({
            title: '购物车已有这件商品',
          })
        }
      }
    })
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

  }
})
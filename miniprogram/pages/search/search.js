const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:[],
    isShowSideslip: false,
    sideslipMenuArr: ['衬衫', 'T恤', '西装', '短裤'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let search=this.data.search
    let that=this
    wx.getStorage({
      key: 'search',
      success: function(res) {
        console.log(res.data);
        that.setData({
          search:res.data
        })
      },
    })
    if(search!=[]){
      this.setData({
        search
      })
    }else{
      search=app.globaldata.commodity
      this.setData({
        search
      })
    }
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

  },

  show: function() {
    this.setData({
      isShowSideslip: true
    })
  },
  offSideslipMen: function(){
    this.setData({
      isShowSideslip: false
    })
  }
  ,
  itemClick: function(e) {
    let that=this
    console.log(e)
    let search=this.data.search
    let commodity=e.currentTarget.dataset.commodity

    console.log(commodity)
    db.collection('commodity').where({
      name:{							
        $regex:commodity,	
        $options: 'i'
      }
    }).get({
      success:function(res){
        console.log(res)
        console.log(that.data.search)
        that.setData({
          search:res.data,
          isShowSideslip:false
        })
        wx.clearStorage('search')
        wx.setStorage({
          data: res.data,
          key: 'search',
        })

        console.log(this.data.search)
      },
      fail:function(res){
        console.log('搜索失败',res)
      }
    })
    // for (var i = 0; i < index.data.sideslipMenuArr.length;i++){
    //   if (tapId == i){
    //     this.setData({
    //       isShowSideslip:false
    //     })
       
    //   }
    // }
  }


})
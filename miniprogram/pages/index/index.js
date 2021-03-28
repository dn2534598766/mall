
const db = wx.cloud.database()

const app = getApp()

Page({
  data: {
   banner:[]
  },

  onLoad: function() {
    let that=this
    db.collection('swiper').get({
      success(res){
        console.log('获取云数据库成功',res)
        that.setData({
          banner:res.data
        })
      },
      err(res){
        console.log('获取云数据库失败',res)
      }
    })
  },
  getUserInfo(e){
    console.log(e)
    app.getUserInfo=e.detail.userInfo
    console.log(app.getUserInfo)
  }
  
  

})

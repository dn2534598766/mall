//index.js
const app = getApp()

Page({
  data: {
   
  },

  onLoad: function() {
    
  },
  getUserInfo(e){
    console.log(e)
    app.getUserInfo=e.detail.userInfo
    console.log(app.getUserInfo)
  }
  
  

})

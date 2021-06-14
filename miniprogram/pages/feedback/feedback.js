Page({
  feedback(e){
    this.setData({
      a:''
    })
    wx.showToast({
      title: '感想您的反馈',
      icon: 'success',
      duration: 2000
    })
  }
})
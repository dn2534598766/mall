
const db = wx.cloud.database()

const app = getApp()

Page({
  data: {
   banner:[],
   commodity:[],
   search:[]
  },

  onLoad: function() {
    let that=this
    db.collection('swiper').get({
      success(res){
        console.log('获取swiper云数据库成功',res)
        that.setData({
          banner:res.data
        })
      },
      err(res){
        console.log('获取swiper云数据库失败',res)
      }
    }),
    db.collection('commodity').get({
      success(res){
        console.log('获取commodity云数据库成功',res)
        wx.setStorage({
          data: res.data,
          key: 'search',
        })
        that.setData({
          commodity:res.data
        })
        
      },
      err(res){
        console.log('获取commodity云数据库失败',res)
      }
    })
  },
  search:function(e){
    let that=this
    db.collection('commodity').where({
      name:{							
        $regex:e.detail.value,	
        $options: 'i'
      }
      // name:e.detail.value
    }).get({
      success:function(res){
        that.setData({
          search:res.data
        })
        console.log('搜索成功',that.data.search)
        
        // wx.setStorage({
        //   data: res.data,
        //   key: 'search',
        // })
        // console.log(search)
        if(e.detail.value==""){
          wx.showToast({
            title: '输入不能为空',
            icon:'none'
          })
        }else if(that.data.search==''){
          wx.showToast({
            title: '未找到商品',
            icon:'none'
          })
        }else{
          wx.setStorage({
              data: res.data,
              key: 'search',
            })
           
          wx.reLaunch({
            url: '../search/search'
          })
        }
      },
      fail:function(res){
        console.log('搜索失败',res)
      }
    })
  },
  click(e){
    console.log(e.currentTarget.dataset)
    let message=e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/detail?name='+message.name+'&src='+message.src+'&price='+message.price+'&id='+message.id
    })
  }
  
  

})

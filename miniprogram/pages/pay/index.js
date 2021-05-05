Page({
  data:{
    money:0,
    product:[]
  },
  onLoad(option){
    let product=JSON.parse(option.product)
    let product2=product.data
    this.setData({
      money:option.money,
      product:product2
    })
    console.log(this.data.product)
  }
})
 

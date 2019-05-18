Page({
// 产生事件--捕捉事件---回调函数---处理事件
  onTap:function(){
    console.log("onTap");
// 跳转页面  ---有返回键 ---参数是对象
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })
    // 跳转页面  ---无返回键
    wx.redirectTo({
      url: '../posts/posts',
    })
 // 冒泡和非冒泡  catch\bind
  }
})
// pages/posts/posts.js
 //  此处只能用相对路径
var postData=require("../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据 ---只有data里面的数据才能进行单向数据绑定---自动js-->html
   */
  data: {
   // date: "Nov 18 2019",
   // title: "正是虾肥蟹壮时"
  },
  // 自己定义的data1 中数据无法实现绑定
  data1: {
    title: "正是虾肥蟹壮时"
  },

  process: function() {
    // 数据绑定--angularJs
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ post_key: postData.postList }); 
      // 把javascript对象拷贝到data中显示--一定是对象!!!!!!!!!!!!!!
  //  this.setData({ post_key: post_content}); 
    // ES6的建议写法
   // this.setData({  post_content });--相当于下面这样
   // this.setData({ post_content:post_content });
  },

  onPostTap:function(event){
    // dataset是所有自定义属性的合集  定义是大写的postId 但这里会变成postid
    var postId=event.currentTarget.dataset.postid;
    console.log("onPostTap")
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperItemTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap:function(event){
    // 冒泡机制替换onSwiperItemTap
    // target和currentTarget区别
    // target指的是当前点击的组件，而currentTarget指的是事件捕获的组件
    // target这里指的是image 而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  //  console.log("onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   // console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
   // console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
   // console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
   // console.log("onShareAppMessage")
  }
})
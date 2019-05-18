// pages/posts/post-detail/post-detail.js
var postsData = require("../../../data/posts-data.js");
var app=getApp(); // 获取app.js中全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      currentCollectedId: postId
    });
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        currentCollected: postCollected
      });
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
         this.setData({
           isPlayingMusic:true
         });
    }
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    // 监听总控音乐
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentCollectedId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId =null;
    });
  },
  onCollectionTap: function(event) {
    var that=this;
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentCollectedId];
    // 收藏未收藏切换
    postCollected = !postCollected;
    postsCollected[this.data.currentCollectedId] = postCollected;
    // 更新缓存中文章是否收藏
    wx.setStorageSync("posts_collected", postsCollected);
    // 更新数据绑定页面，实现图片切换
    that.setData({
      currentCollected: postCollected
    });
    if (postCollected) {
      wx.showToast({
        title: '收藏成功',
      })
    } else {
      wx.showToast({
        title: '取消成功',
      })
    }
  },

  onShareTap:function(event){
    var itemList = ["微信好友",
      "朋友圈",
      "QQ",
      "微博"];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
      //res.cancel 用户是否点击了取消
      // res.tapIndex 数组元素的序号 0开始
       wx.showToast({
         title: '分享到' + itemList[res.tapIndex],
       })
      }
    })
  },

 // 音乐播放 or暂停
  onMusicTap:function(event){
    var currentId=this.data.currentCollectedId;
    var postData = postsData.postList[currentId];
    var isPlayingMusic=this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
  
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  }
})
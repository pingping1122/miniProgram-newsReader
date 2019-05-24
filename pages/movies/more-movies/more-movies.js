// pages/movies/more-movies/more-movies.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl:'',
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = '';
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case 'Top250':
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl,
    });
    util.http(dataUrl, this.proccessData);
  },

  proccessData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertStarsToArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }  
    var totalMovies={}; 
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.setData({
        isEmpty:false
      });
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },
 //下拉刷新--重新变为20条数据
 onPullDownRefresh:function(){
   var refreshUrl = this.data.requestUrl +
     "?star=0&count=20";
     this.setData({
       movies:{},
       isEmpty:true,
       totalCount:0
     });
   util.http(refreshUrl, this.processDoubanData);
   wx.showNavigationBarLoading();
 },

  // 上划加载更多---与下拉刷新矛盾
  onScrollLower: function () {
    console.log("加载更多");
    // url不变，加载序号变化
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl, this.proccessData);
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
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
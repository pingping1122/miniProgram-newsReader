// pages/movies/movies.js
var util = require("../../utils/util.js");
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 这里的一样要有初始化
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow: true,
    searchPanelShow: false,
    searchResult:{}
      },

        /**
           * 生命周期函数--监听页面加载
              */
                onLoad: function(options) {
                ;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl,'inTheaters','正在热映');
    this.getMovieListData(comingSoonUrl,'comingSoon','即将上映');
    this.getMovieListData(top250Url,'top250','Top250');
  },

  getMovieListData: function (url, type, categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        that.proccessDoubanData(res.data, type, categoryTitle);
      },
      fail: function () {
      },
      complete: function () {

      }
    })
  },

  proccessDoubanData:function(moviesDouban,type,categoryTitle){
     var movies=[];
     for(var idx in moviesDouban.subjects){
       var subject = moviesDouban.subjects[idx];
        var title=subject.title;
        if(title.length>=6){
              title=title.substring(0,6)+"...";
        }
        var temp={
          stars:util.convertStarsToArray(subject.rating.stars),
          title:title,
          average: subject.rating.average,
          coverageUrl:subject.images.large,
          movieId:subject.id,
        }
        movies.push(temp);
     }
    var readyData={};
    readyData[type]={
      categoryTitle: categoryTitle,
      movies:movies};
    this.setData(readyData);
  },

  // 点击搜索框内的×号
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
    }
    )
  },
  //点击获取更多
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movies/more-movies?category=' + category,
    })
  },

  onBindFocus: function (event) {
     this.setData({
       containerShow: false,
       searchPanelShow: true
     })
  },

  onBindConfirm: function (event) {
    var text = event.detail.value; // 查询内容
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

// 点击查看电影详情
  onMovieTap:function(event){
    // 注意此处movieId变成movieid
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
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
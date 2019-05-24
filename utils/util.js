// 此文件用于存放公共函数
//将stars转为 [1,1,1,0,0]
function convertStarsToArray(stars){
  var num=stars.toString().substring(0,1);
  var array=[];
  for (var i = 1; i <= 5; i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
return array;
}
// 此处必须加回调函数---因为是异步
function http(url,callBack){
  wx.request({
    url: url,
    method: "GET",
    header: {
      "Content-Type": ""
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
    },
    complete: function () {

    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertStarsToArray: convertStarsToArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
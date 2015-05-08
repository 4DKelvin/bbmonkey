var fs = require("fs"),
    qiniu = require("qiniu");
//七牛配置
qiniu.conf.ACCESS_KEY = "7dRQxdIWcAOGCeOxy8_-JqH0hkYMRwbeu5p6KZ0O";
qiniu.conf.SECRET_KEY = "DQXyFybgjmjqE0LQGPm4JkVNxNlvKCqsPT6Ukiff";
qiniu.conf.BUCKET_NAME = "imageload";

//上传的目录
var UPLOAD_DIR = 'resources';

var uploadFile = function (localFile, key) {
  "use strict";
  var extra = new qiniu.io.PutExtra(),
      uptoken = new qiniu.rs.PutPolicy(qiniu.conf.BUCKET_NAME).token();

  qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log('[上传成功] [' + key + '] ');
    } else {
      // 上传失败， 处理返回代码
      console.log('[上传失败] [' + key + '] ', err);
      //if (err.code == 614) {
      //文件存在先删除
      var client = new qiniu.rs.Client();
      client.remove(qiniu.conf.BUCKET_NAME, key, function (err, ret) {
        if (!err) {
          // ok
          console.log('[删除成功] [' + key + '] 正在重新上传……');
          uploadFile(localFile, key);
        } else {
          console.log('[删除失败] [' + key + '] ', err);
        }
      });
      //}
    }
  });
};

var walk = function (dir, done) {
  "use strict";
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(UPLOAD_DIR, function (err, results) {
  "use strict";
  if (err) throw err;
  console.log(results.length + '个文件正准备上传……');
  results.forEach(function (file, index) {
    var key = file.replace(UPLOAD_DIR + '/', '');
    uploadFile(file, key);
  });
});

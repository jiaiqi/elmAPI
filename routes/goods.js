const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');
const goodsSQL = require('../db/goodssql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
let responseJSON = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({     code:'200',     msg: '操作失败'
    });
  } else {
    res.json(ret);
  }};

// 添加用户
router.get('/addgoods', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 增加一个用户信息
    connection.query(goodsSQL.insert, [param.food_name,param.food_type,param.food_activity,param.food_detail,param.food_pic,param.food_feature,param.food_size,param.package_fee,param.price], function(err, result) {
      if(result) {
        //result =  responseJSON(res, result);
        result = '1'
        responseJSON(result)
      }else{
        responseJSON(err)
      }
      // // 以json形式，把操作结果返回给前台页面
      // responseJSON(res, result);
      // 释放连接
      connection.release();
    });
  });
});

// 查找所有用户信息
router.get('/findAllgoods', function(req, res,next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
  //  let param = req.query || req.params;
// 建立连接
    connection.query(goodsSQL.queryAll,  function(err, result) {
      if(result) { // 以json形式，把操作结果返回给前台页面
        responseJSON(res, result);
        // result = 'success';
      }
      // 释放连接
      connection.release();
    });
  });
});


// 根据用户名查找用户信息
router.get('/findgoods', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 查找用户信息
    connection.query(goodsSQL.findgoods, param.goods_name, function(err, result) {
      if(result) { // 以json形式，把操作结果返回给前台页面
        res.status = '0';
        responseJSON(res, result);
        // result = 'success';
      }else {
        // responseJSON(res, err);
        responseJSON(1)
      }
      // 释放连接
      connection.release();
    });
  });
});

// 根据用户名编辑用户信息
router.get('/updategoods', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 编辑用户信息
    connection.query(goodsSQL.update, [param.goods_name,param.register_date,param.register_address,param.role_id,param.id], function(err, result) {
      if(result) { // 以json形式，把操作结果返回给前台页面
        responseJSON(1)
        //responseJSON(res, result);
      }else {
        //responseJSON(res, err);
        responseJSON(0)
      }
      // 释放连接
      connection.release();
    });
  });
});

// 根据用户id删除用户
router.get('/deletegoods', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 编辑用户信息
    connection.query(goodsSQL.delete, param.id, function(err, result) {
      if(result) { // 以json形式，把操作结果返回给前台页面
        responseJSON(res,result);
        //responseJSON(res, result);
      }else {
        // responseJSON(res, err);
        responseJSON(0)
      }
      // 释放连接
      connection.release();
    });
  });
});



module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');
const userSQL = require('../db/usersql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
let responseJSON = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({     code:'1',     msg: '操作失败'
    });
  } else {
    res.json(ret);
  }};

// 添加用户
router.get('/addUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 增加一个用户信息
    connection.query(userSQL.insert, [param.user_name,param.user_pwd], function(err, result) {
      if(result) {
      responseJSON(res,'0');
        // responseJSON('0')
      }else{
        responseJSON(res, result);
      }
      // 以json形式，把操作结果返回给前台页面+6
     
      // 释放连接
      connection.release();
    });
  });
});

// 查找所有用户信息
router.get('/findAllUser', function(req, res,next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
  //  let param = req.query || req.params;
// 建立连接
    connection.query(userSQL.queryAll,  function(err, result) {
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
router.get('/findUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 查找用户信息
    connection.query(userSQL.findUser, param.user_name, function(err, result) {
      if(result) { // 以json形式，把操作结果返回给前台页面
        responseJSON( res,result);
        // result = 'success';
      }else {
        // responseJSON(res, err);
        let err = '1';
        responseJSON(err)
      }
      // 释放连接
      connection.release();
    });
  });
});

// 根据用户名编辑用户信息
router.get('/updateUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 编辑用户信息
    connection.query(userSQL.update, [param.user_name,param.register_date,param.register_address,param.role_id,param.id], function(err, result) {
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
router.get('/deleteUser', function(req, res, next){
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
    let param = req.query || req.params;
// 建立连接 编辑用户信息
    connection.query(userSQL.delete, param.id, function(err, result) {
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

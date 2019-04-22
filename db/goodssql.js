let goodsSQL = {
  insert:'insert into goods(food_name,food_type,food_activity,food_detail,food_pic,food_feature,food_size,package_fee,price) VALUES(?,?,?,?,?,?,?,?,?)',
  update:'update goods set goods_name=?,register_date=?,register_address=?,role_id=? where id=? ',
  delete:'delete from goods where id = ?',
  queryAll:'select * from goods',
  findgoods:'select * from goods where goods_name = ? ',
};
module.exports = goodsSQL;
let ShopSQL = {
    insert:'insert into shopInfo(shop_name,shop_address,shop_phone,shop_intro,shop_slogan,shop_type,shop_feature,peisong,qisong,opentime,closetime,headpic,business_license,service_license) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    update:'update user set shop_name = ?,shop_address= ?,shop_phone= ?,shop_intro= ?, shop_slogan=?, shop_type=?, shop_feature=?, peisong=?,qisong=?,opentime=?,closetime=?,headpic=?,business_license-?,service_license=? where shop_name= ?, ',
    delete:'delete from user where shop_name = ?',
    queryAll:'select * from shopInfo',
    findUser:'select * from shopInfo where shop_name = ? ',
};
module.exports = ShopSQL;
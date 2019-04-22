let ActSQL = {
    insert:'insert into shopInfo(activity_name,activity_title,activity_detail) VALUES(?,?,?)',
    update:'update user set activity_name = ?,activity_title = ?,activity_detail = ?',
    //delete:'delete from user where shop_name = ?',
    queryAll:'select * from activity',
};
module.exports = ActSQL;
let UserSQL = {
    insert:'insert into user(user_name,user_pwd) VALUES(?,?)',
    update:'update user set user_name=?,register_date=?,register_address=?,role_id=? where id=? ',
    delete:'delete from user where id = ?',
    queryAll:'select * from user',
    findUser:'select * from user where user_name = ? ',
};
module.exports = UserSQL;
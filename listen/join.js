const { userInfo } = require('../util');

const join = user => {
    return userInfo(user, 'New Member');
};

module.exports = join;

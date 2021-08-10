const bcrypt = require('bcrypt');
const usersData = {
    users : [
        {
            name : 'Santa',
            email : 'santa@gmail.com',
            password : bcrypt.hashSync('1234' , 8),
            isAdmin : true,
        },
        {
            name : 'Apurba',
            email : 'apu@gmail.com',
            password : bcrypt.hashSync('1234' , 8),
            isAdmin : false,
        },
    ]
}

module.exports = usersData ;
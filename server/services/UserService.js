const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const User = require('../models/usersSchem.js')
const { v4: uuidv4 } = require('uuid')
//todo move to env
const SECRET = 'shhhhh'


const UserService = {

    async findById(id) {
        return User.findById(id);
    },

    async findByEmail(email) {
        return User.findOne({ email: email }).lean();
    },

    async checkPassword(user, password) {
        return bcrypt.compare(password, user.password);
    },

    //----------------------------------***********---------------------------------
    async addUser(data) {
        try {
            const { name, surename, mobile, wave, role, email, password } = data;
            console.log(wave);
            const existingUser = await this.findByEmail(email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data._id = new uuidv4();
            const newUser = {
                // _id: data._id, // Assuming id is a unique identifier
                email: data.email,
                password: hashedPassword,
                name: data.name,
                wave: data.wave,
                surename: data.surename,
                mobile: data.mobile,
                // role: data.role
            };

            const user = new User(newUser);
            await user.save();
            return user;
        } catch (error) {
            console.error('Error adding user:', error.message);
            throw error;
        }
    },

    // toJSON(user) {
    //     // console.log(user);
    //     return {
    //         // id: user._id,
    //         email: user.email
    //     }
    // },
    toJSON(user) {
        console.log(user);
        if (user) {
            return {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                surename: user.surename,
                wave: user.wave,
                mobile: user.mobile
            };
        }
        return null; 
    },
    generateToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({ id: user._id }, SECRET, {
                expiresIn: "24h"
            }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    },
    validateToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}

// const plaintextPassword = '1111';
// const saltRounds = 10;

// bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
//   if (err) {
//     console.error(err);
//   } else {
//     // Store the 'hash' in your database
//     console.log(hash);
//   }
// });

// console.log(users)
// console.log(bcrypt.hashSync('1111', 10));

module.exports = UserService
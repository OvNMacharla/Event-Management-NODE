const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async (args) => {
        try {
            const isuser = await User.findOne({ email: args.userInput.email })
            if (isuser) {
                throw new Error('User alredy exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const res = await user.save();
            return res
        }
        catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("User does not exist!");
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error("Password is incorrect");
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, 'secretkey', {
                expiresIn: '1h'
            });
            return { userId: user.id, token: token, tokenExpiration: 1 }

        }
        catch (err) {
            throw err
        }
    }
}
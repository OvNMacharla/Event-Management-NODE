const bcrypt = require('bcryptjs');
const User = require('../../models/user');

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
    }
}
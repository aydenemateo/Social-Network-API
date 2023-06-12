const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { new: true } );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }

        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Application.deleteMany({ _id: { $in: user.applications } });
            res.json({ message: 'User deleted!' })

        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } }, { new: true });

            if (!user) {
                return res.status(404).json({ messeage: 'no user with this ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
                ;
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } }, { new: true });

            if (!user) {
                return res.status(404).json({ messeage: 'no user with this ID' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
                ;
        }
    }

};
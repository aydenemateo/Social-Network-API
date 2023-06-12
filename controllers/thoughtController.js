const { Thought, User } = require("../models");

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find();

            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // const user = await User.findOneAndUpdate(
            //     { _id: req.body.userId },
            //     { $push: { thoughts: thought._id } },
            //     { new: true }
            // );
            if (!thought) {
                return res.status(404).json({ message: 'thought created, but no user with this ID' })
            }

            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { new: true },
                { runValidators: true, new: true });
            
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json({ message: 'thought updated!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

};
const mongoose = require('mongoose');
const { Item } = require('../Model/itemModel');
const { User } = require('../Model/userModel');

module.exports.addItem = async (req, res) => {
    const { name, price, description, user_id } = req.body;
    console.log('name', user_id)
    try {
        const newItem = { name, price, description, user_id };
        const createdItem = await Item.create(newItem);
        // await User.items.push(createdItem);
        return res.json({ message: 'Item created successfully', item: createdItem });
    } catch (error) {

    }

}
// 63f8eafebfc0e4a524816684
module.exports.getItem = async (req, res) => {
    const userId = req.query.id
    try {
        const item = await Item.find({ user_id: userId });
        return res.json({ message: 'Get Item List successfully', item: item });
    } catch (error) {
    }
}



module.exports.updateItem = async (req, res) => {
    const {id} = req.query;
    console.log("::::",id)
    try {
        await Item.findByIdAndUpdate(id,{$set:req.body});
        return res.json({ message: 'Item Update successfully' });
    } catch (error) {
    }
}

module.exports.deleteItem = async (req, res) => {
    const {id} = req.query;
    try {
        await Item.deleteOne({ _id: id });
        return res.json({ message: 'Item Deleted successfully' });
    } catch (error) {
    }
}
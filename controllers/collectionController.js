const Collection = require("../models/Collection");
const Notes = require("../models/Note");

// ================= Create Collection ================ //
exports.createCollection = async (req, res) => { 
    try {
        const { name } = req.body;

        const collection = await Collection.create({
            name,
            user: req.user.id
        });
        
        res.status(201).json({
            message: "Collection created successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    
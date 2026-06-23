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
    
// ================= Get Collections ================ //
exports.getCollections = async (req, res) => { 
    try {
        const collections = await Collection.find({
            user: req.user.id,
        }).sort("createdAt : -1");

        res.status(200).json({
            success: true,
            count: collections.length,
            data: collections
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    
// ================= Get single Collection ================ //
exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= Update Collection ================ //
exports.updateCollection = async (req, res) => {
    try {
        const collection = await Collection.findByIdAndUpdate({
            _id: req.params.id,
            user: req.user.id,
            
        },
        req.body,
        {
            new: true,
            runValidators: true,
            })
        
        
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        
        res.status(200).json({
            success: true,
            data: collection,
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ================= Delete Collection ================ //
exports.deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findByIdAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        await Notes.updateMany(
            { collection: req.params.id, },
            {$set: {collection: null}
        });
        res.status(200).json({
            success: true,
            message: "Collection deleted successfully",
            data: {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

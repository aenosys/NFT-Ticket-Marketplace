const NFT = require("../models/nft")

exports.read = (req, res) => {
    NFT.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.filter = async(req,res) => {
    const { name } = req.body;
    console.log(name)
    await NFT.findOne({ category: name}, (err, nft) => {
        if (err || !nft) {
            return res.status(400).json({
                error: 'NFT not found'
            });
        }
        const { _id, tokenId, price, ownerAddress, category, image, name} = nft;
        return res.json({nft: { _id, tokenId, price, ownerAddress, category, image, name}});
    });
}

exports.getToken = (req, res) => {
    const address = req.params.address
    NFT.find({ownerAddress: address}, (error, data) => {
        if(error){
            console.log(error)
        }
        res.send(data)
    })
};

exports.getData = (req, res) => {
    const id = req.params.id
    NFT.find({tokenId: id}, (error, data) => {
        if(error){
            console.log(error)
        }
        res.send(data)
    })
};

exports.relatedNft = (req, res) => {
    const category = req.params.category
    NFT.find({category: category}, (error, data) => {
        if(error){
            console.log(error)
        }
        res.send(data)
    })
};



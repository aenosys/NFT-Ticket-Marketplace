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
    const { category } = req.body;
    console.log(req.body)
    await NFT.findOne({ category }, (err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: 'Data not found'
            });
        }
        const { _id, name, category, photo, price, ownerAddress, tokenId} = data;
        return res.json({data: { _id,  name, category, photo, price, ownerAddress, tokenId }});
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

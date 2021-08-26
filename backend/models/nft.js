const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const nftSchema = new mongoose.Schema(
    {
        tokenId: {
            type: Number,
            required: true
        },
        ownerAddress: {
            type: String,
            required: true
        },
        price:{
          type: Number
        },
        category: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("NFT", nftSchema);
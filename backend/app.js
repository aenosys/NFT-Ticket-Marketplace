const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

const Web3 = require("web3");
const web3ProviderUrl = "";
const web3 = new Web3(new Web3.providers.WebsocketProvider(web3ProviderUrl));
const Ticket = require("./ABI/Ticket.json");
const NFT = require("./models/nft")
const axios = require("axios")

// import routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const nftRoutes = require('./routes/nft');

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', nftRoutes);

var init = function() {
    let ticketInstance = new web3.eth.Contract(
      Ticket.abi,
      process.env.Ticket
    );
  
    let mint = ticketInstance.events
        .Mint({fomBlock: "latest",})
        .on("connected", (event) => {
          console.log("connected");
        })
        .on("data", async(event) => {
            console.log(event.returnValues)
            const data = await ticketInstance.methods.tokenURI(event.returnValues.id).call()
            const tokenResponse= await axios.get(`https://${data.split("/")[2]}.ipfs.dweb.link/metadata.json`)
            let nft = new NFT({
              tokenId: event.returnValues.id,
              price: event.returnValues.price,
              ownerAddress:event.returnValues.owner.toLowerCase(),
              category: tokenResponse.data.description,
              image:tokenResponse.data.image,
              name:tokenResponse.data.name
            })
            nft.save((error, data) => {
              if (error) {
                  console.log(error)
              }
              console.log(data)
          })
        })

        let buy = ticketInstance.events
        .Buy({fomBlock: "latest",})
        .on("connected", (event) => {
          console.log("connected");
        })
        .on("data", async(event) => {
           console.log(event.returnValues);
           const data = await ticketInstance.methods.tokenURI(event.returnValues.id).call()
           const tokenResponse = await axios.get(`https://${data.split("/")[2]}.ipfs.dweb.link/metadata.json`)
           const {id, price, buyer} = event.returnValues;
           const {name, description, image} = tokenResponse.data
           NFT.findOne({tokenId:id}, (err, data) => {
           if (err || !data) {
           return res.status(400).json({
              error: 'data not found'
            });
        }

           if (err || !price) {
            return res.status(400).json({
            error: 'Price not found'
            });
            }else {
           data.price = price;
            }

      if (err || !name) {
        return res.status(400).json({
            error: 'name not found'
        });
      }else {
        data.name = name;
      }

      if (err || !description) {
        return res.status(400).json({
            error: 'Description not found'
        });
      }else {
        data.category = description;
      }

         if (err || !image) {
        return res.status(400).json({
            error: 'Image not found'
        });
        }  else {
          data.image = image;
         }

        if (err || !buyer) {
         return res.status(400).json({
            error: 'Buyer not found'
        });
        }else {
         console.log("buyer is : ", buyer.toLowerCase())
         data.ownerAddress = buyer.toLowerCase();
       }

        data.save((error, result) => {
          if (error) {
            console.log(error)
          }
         console.log(result)
     })
  })
})
}

init();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
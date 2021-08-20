const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

// const Web3 = require("web3");
// const web3ProviderUrl = "";
// const web3 = new Web3(new Web3.providers.WebsocketProvider(web3ProviderUrl));
// const Ticket = require("./ABI/Ticket.json");
// const nft = require("./models/NFT")
// const axios = require("axios")

// import routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

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

// var init = function() {
//     let ticketInstance = new web3.eth.Contract(
//       Ticket,
//       process.env.Ticket
//     );
  
//     let mint = ticketInstance.events
//         .Mint({fomBlock: "latest",})
//         .on("connected", (event) => {
//           console.log("connected");
//         })
// }

// init();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
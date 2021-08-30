# NFT-Ticket-Marketplace

Steps to get started with the project

install metamask and add custom rpc url from infura for Matic. Also add some test tokens from MATIC FAUCET
for custorm rpc (https://rpc.maticvigil.com/)

Client:

1 clone the repo
2 place the deployed address of contracts in file utils/api.js and ABI of the contracts in ABI folder
3 check backend server should run
4 Do npm install
5 start server by "npm start"


Backend:

1 clone the repo
2 place the deployed address of contracts in .env file and ABI of the contracts in ABI folder
3 Add Database uri from mongodb in .env folder
4 npm install
5 add custorm rpc url you made, copy for web sockets and paste in app.js line 11

Smart Contracts:

1 deploy contracts on remix or truffle on matic etwork
2 and copy and paste abi in frontend and backend folders.

import Ticket from '../abi/Ticket.json'
import Web3 from 'web3'
import axios from 'axios'

const getAccount = async () => {
    // let accounts, accountsP
    console.log("we are connecting to wallet")
    if (window.ethereum.isMetaMask) {
        console.log("we are in the fi conditoin")
        const data = [{
            chainId: '0x13881',
            chainName: 'Matic Network',
            nativeCurrency:
                {
                    name: 'Matic Token',
                    symbol: 'MATIC',
                    decimals: 18
                },
            rpcUrls: ['https://rpc-mumbai.matic.today'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        }]

        window.ethereum.request({method: 'wallet_addEthereumChain', params:data}).then((res) => {

            console.log("the reas is ", res)
        }).catch((err) => {
            console.log("the errror is ", err)
        })
        
        // console.log("here we ggo again ", tx)
        // if (tx) {
        // }
        // window.ethereum.enable()
    }
    // accountsP = await window.ethereum.request({
    //     method: 'eth_requestAccounts'
    // }).then((res) => {
    //     accounts = res
    // })
    // accounts = await accountsP
    return await window.ethereum.request({
        method: 'eth_requestAccounts'
    })
}

const mint = async(string_uri, price) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "0x7D4feBc3AA60Ec597C9DDB249aB89cfc6bb0e7D0")
    await ticket.methods.mintToken(string_uri, price).send({from: account[0]})
}

const buy = async(id) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "0x7D4feBc3AA60Ec597C9DDB249aB89cfc6bb0e7D0")
    console.log("the id is :", id, " contaract :", ticket)
    const price = await ticket.methods.prices(id).call()
    console.log("the price is :", price)
    await ticket.methods.buy(id).send({from: account[0], value: price})
}

const putOnSale = async(id) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "0x7D4feBc3AA60Ec597C9DDB249aB89cfc6bb0e7D0")
    await ticket.methods.putOnSale(id).send({from: account[0]})
}
const sold = async(id) => {
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "0x7D4feBc3AA60Ec597C9DDB249aB89cfc6bb0e7D0")
    const resp = await ticket.methods.sold(id).call()
    return resp
}

const listTokens = async() => {
   const resp = await axios.get('http://localhost:8080/api/list')
    return resp.data;
};

const listMyToken = async () => {
    const account = await getAccount()
    const resp = await axios.get(`http://localhost:8080/api/nft/${account[0]}`)
    return resp.data;
}

export{
    mint,
    listTokens,
    putOnSale,
    buy,
    getAccount,
    sold,
    listMyToken,
    category
}
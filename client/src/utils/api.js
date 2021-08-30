import Ticket from '../ABI/Ticket.json'
import Web3 from 'web3'
import axios from 'axios'

const getAccount = async () => {
    // let accounts, accountsP
    console.log("we are connecting to wallet")
    if (window.ethereum.isMetaMask) {
        console.log("we are in the fi conditoin")
        const data = [{
            chainId: '80001',
            chainName: 'Matic Network',
            nativeCurrency:
                {
                    name: 'Matic Token',
                    symbol: 'MATIC',
                    decimals: 18
                },
            rpcUrls: [''],
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
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "")
    await ticket.methods.mintToken(string_uri, price).send({from: account[0]})
}

const buy = async(id) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "")
    console.log("the id is :", id, " contaract :", ticket)
    const price = await ticket.methods.prices(id).call()
    console.log("the price is :", price)
    await ticket.methods.buy(id).send({from: account[0], value: price})
}

const putOnSale = async(id) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "")
    await ticket.methods.putOnSale(id).send({from: account[0]})
}
const sold = async(id) => {
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "")
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

const listToken = async(id, category) => {
    const resp = await axios.get(`http://localhost:8080/api/token/${id}/${category}`)
    return resp.data;
}

const listRelatedToken = async(category) => {
    const resp = await axios.get(`http://localhost:8080/api/related/${category}`)
    console.log(resp.data)
    return resp.data;
}

 const createCategory = (category) => {
    return fetch('http://localhost:8080/api/category/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

const getFilteredTickets = (data) => {
    console.log(data)
    return fetch('http://localhost:8080/api/filter', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export{
    mint,
    listTokens,
    putOnSale,
    buy,
    getAccount,
    sold,
    listMyToken,
    createCategory,
    listToken,
    getFilteredTickets,
    listRelatedToken
}
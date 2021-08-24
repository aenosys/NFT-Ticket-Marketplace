import Ticket from '../abi/ticket.json'
import Web3 from 'web3'

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

const mint = async (price, string_uri) => {
    const account = await getAccount()
	window.web3 = new Web3(window.ethereum)
    let ticket = await new window.web3.eth.Contract(Ticket.abi, "")
    await ticket.methods.mint(price, string_uri).send({
        from: account[0]
    })
}

export{
    mint,
}
import React, { useRef } from 'react';
import './navbar.css';
// import mainlogo from '../../../assets/icons/mainLogo.svg';
// import mobilemenu from '../../../assets/icons/mobileMenu.svg';
// import close from '../../../assets/icons/close.svg';
// import { Link, useHistory } from 'react-router-dom';
// import { getAccount } from '../../../api/wallet';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import axios from 'axios'

const Navbar = () => {

    const mobileNav = useRef();
    // const walletId = useSelector(state => state.walletId);
    // const dispatch = useDispatch();
    // const menu = useRef()
    // const history = useHistory();

    // const handleMenu = () => {
    //     if(menu.current){
    //         console.log("we have menu")
    //         if(menu.current.classList.contains("active")){
    //             menu.current.classList.remove("active")
    //         }else{
    //             menu.current.classList.add("active")
    //         }
    //     }
    // }

    // const handleClose = () => {
    //     menu.current.classList.remove("active") 
    // }

    // const openMobileNav = () => {
    //     mobileNav.current.style.opacity = "100%";
    //     mobileNav.current.style.zIndex = "2";
    // }
    
    // const closeMobileNav = () => {
    //     mobileNav.current.style.opacity = "0%";
    //     mobileNav.current.style.zIndex = "-1";
    // }

    // const checkUserLoginStatus =  async (account) => {
    //     var data = JSON.stringify({
    //         "walletAddress": account[0]
    //     });
        
    //     var config = {
    //         method: 'post',
    //         url: `${process.env.REACT_APP_URL}/api/signin`,
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : data
    //     };
    //     try {

    //         const resp = await axios(config)
    //         console.log(resp)
    //     } catch(err) {
    //         console.log(err)
    //         history.push('/signup')
    //     }
        
    // } 

    // const connectTOWallet = async () => {
    //     const account = await getAccount();
    //     dispatch({
    //         type: 'SET_WALLET',
    //         payload: account[0],
    //     })

    //     checkUserLoginStatus(account)
    //     console.log("got response")
        
    // }

    // const handleDisconnect = () => {
    //     // window.ethereum.isMetaMask = false
    //     dispatch({
    //         type: 'SET_WALLET',
    //         payload: '',
    //     })
    // } 

    // useEffect(() => {
    //     if(window.ethereum !== undefined) {
    //         window.ethereum.on('accountsChanged', (accounts) => {
    //             console.log("you have these accounts :", accounts)
    //         });
    //     }
    // }, [mobileNav])
    

    // useEffect(() => {
    //     if(window.ethereum && !window.ethereum.isMetaMask){
    //         console.log(!window.ethereum.isMetaMask)
    //         dispatch({
    //             type: 'SET_WALLET',
    //             payload: '',
    //         })
    //     } else {
    //         // connectTOWallet()
    //     }
    // }, [])

    return (
        <div className="navbar">
            {/* <Link to="/">
                <div className="brand-logo">
                    <img src={mainlogo} alt="tapir" />
                </div>
            </Link>
            <div className="navlink-container">
                <Link to="/explore">
                    <div className="navlink">
                        <p>Store</p>
                    </div>
                </Link>
                <Link to="/showcase">
                    <div className="navlink">
                        <p>Showcase</p>
                    </div>
                </Link>
                <Link to="/about-us">
                    <div className="navlink">
                        <p>About Us</p>
                    </div>
                </Link>
                <Link to="/create-token">
                    <div className="navlink">
                        <p>Create Token</p>
                    </div>
                </Link>
            </div>
            <div className="auth-link">
                {
                    (walletId && walletId.length !== 0) ?
                    <div className="navlink">
                        <div className="id" onClick={handleMenu}>
                            <p>{walletId.slice(0,7)}...</p>
                        </div>
                        <div className="menu" onClick={handleClose} ref={menu}>
                            <Link to={`/user/${walletId}`}>
                                <p>My Profile</p>
                            </Link>
                            <Link to='/edit-profile'>
                                <p>Edit Profile</p>
                            </Link>
                            <p onClick={handleDisconnect}>DisConnect</p>
                        </div>
                    </div>:
                    <div className="navlink" onClick={() => {connectTOWallet()}}>
                        <p>Login</p>
                    </div>
                }
            </div>
            <div className="mobile-menu">
                <img src={mobilemenu} alt="mobileMenu" onClick={openMobileNav} />
                <div className="navlink-container" ref={mobileNav} >
                    <Link to="/explore">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>Store</p>
                        </div>
                    </Link>
                    <Link to="/showcase">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>Showcase</p>
                        </div>
                    </Link>
                    <Link to="/about-us">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>About Us</p>
                        </div>
                    </Link>
                    <Link to="/about-us">
                        <div className="navlink"  onClick={closeMobileNav}>
                            <p>About Us</p>
                        </div>
                    </Link>
                    <Link to="/create-token">
                        <div className="navlink"  onClick={closeMobileNav}>
                            <p>Create Token</p>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>Login</p>
                        </div>
                    </Link>
                    <img src={close} alt="close" onClick={closeMobileNav} />
                </div>
            </div> */}
        </div>
    );
}

export default Navbar;

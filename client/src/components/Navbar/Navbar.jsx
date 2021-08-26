import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import mainlogo from '../../assets/times-circle-regular.svg'
import { useDispatch, useSelector } from 'react-redux';
import {getAccount} from '../../utils/api.js'



export default function Navbar() {
    const mobileNav = useRef();
    const walletId = useSelector(state => state.walletId);
    const menu = useRef()
    const dispatch = useDispatch()

    const handleMenu = () => {
        if(menu.current){
            console.log("we have menu")
            if(menu.current.classList.contains("active")){
                menu.current.classList.remove("active")
            }else{
                menu.current.classList.add("active")
            }
        }
    }

    const handleClose = () => {
        menu.current.classList.remove("active") 
    }

    const openMobileNav = () => {
        mobileNav.current.style.opacity = "100%";
        mobileNav.current.style.zIndex = "2";
    }
    
    const closeMobileNav = () => {
        mobileNav.current.style.opacity = "0%";
        mobileNav.current.style.zIndex = "-1";
    } 

    const connectTOWallet = async () => {
        const account = await getAccount();
        dispatch({
            type: 'SET_WALLET',
            payload: account[0],
        })

        // checkUserLoginStatus(account)
        console.log("got response")
        
    }

    const handleDisconnect = () => {
        // window.ethereum.isMetaMask = false
        dispatch({
            type: 'SET_WALLET',
            payload: '',
        })
    }

    return (
        <div className="navbar">
            <Link to="/">
                <div className="brand-logo">
                    <img src={mainlogo} alt="tapir" />
                </div>
            </Link>
            <div className="navlink-container">
                <Link to="/">
                    <div className="navlink">
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/mint">
                    <div className="navlink">
                        <p>Mint</p>
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
                            <p onClick={handleDisconnect}>Disconnect</p>
                        </div>
                    </div>:
                    <div className="navlink" onClick={() => {connectTOWallet()}}>
                        <p>Login</p>
                    </div>
                }
            </div>
            <div className="mobile-menu">
                <img src={mainlogo} alt="mobileMenu" onClick={openMobileNav} />
                <div className="navlink-container" ref={mobileNav} >
                    <Link to="/">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to="/mint">
                        <div className="navlink" onClick={closeMobileNav} >
                            <p>Mint</p>
                        </div>
                    </Link>
                    <img src={mainlogo} alt="close" onClick={closeMobileNav} />
                </div>
            </div>
        </div>
    )
}

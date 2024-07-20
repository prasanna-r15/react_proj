import React, { useState, useEffect, useRef } from "react";
import style from './scss/landingScreen.module.scss';
import companyLogo from "../assets/Images/Graph.png" 
import setting from "../assets/Images/Setting.png"
import bag from "../assets/Images/Bag.png"
import category from "../assets/Images/Category.png"
import chat from "../assets/Images/Chat.png"
import folder from "../assets/Images/Folder.png"
import user from "../assets/Images/user.png"
import gift from "../assets/Images/gift.png"
import headphones from "../assets/Images/headphones.png"
import logout from "../assets/Images/Logout.png"
import { Icon } from 'semantic-ui-react'
import Header from'./Header';
import Dashboard from "./Dashboard";
import OrderSummary from "./OrderSummary";

function LandingScreen() {

    const navJson = [
        {
            "id":1,
            "name":"Dashboard",
            "img":category      
        },
        {
            "id":2,
            "name":"Orders",
            "img":bag        
        },
        {
            "id":3,
            "name":"Customers",
            "img":user
        },
        {
            "id":4,
            "name":"Inventory",
            "img":folder         
        },
        {
            "id":5,
            "name":"Conversations",
            "img":chat
        },
        {
            "id":6,
            "name":"Settings",
            "img":setting
        }
    ]
    const [isOpen, setIsOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [activeNav, setActiveNav] = useState(1);

    const handleActiveNav = (e) => setActiveNav(e);

    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        let timer;
        if (hovering) {
            timer = setTimeout(() => setIsOpen(true), 200);
        } else {
            timer = setTimeout(() => setIsOpen(false), 200);
        }

        return () => clearTimeout(timer);
    }, [hovering]);

    const handleMouseOver = () => {
        if (window.innerWidth > 540) {
            setHovering(true);
        }
    };

    const handleMouseOut = () => {
        setHovering(false);
    };

    const renderNavBar = () => {
        return(
            navJson?.map((e) =>(
                <div className={`${style.sidebarPosition} ${activeNav === e.id ? style.activeBar : ''}`} onClick={()=>handleActiveNav(e.id)}>
                    <img src={e.img} alt="category"/>
                    <span>{e.name}</span>
                </div>
            ))
        )
    }

    const handleNavContent = () => {
        if(activeNav === 1){
            return(
                <Dashboard isOpen={isOpen}/>
            )
        }else if(activeNav === 2){
            return(
                <OrderSummary isOpen={isOpen}/>
            )
        }
        return(<></>)
    }

    const handleMobileNav = () => {
        if (window.innerWidth <= 540) {
            setNavOpen(!navOpen);
            setIsOpen(true);
            console.log('nav open');
        }
        console.log('entered');
    }

    return (
        <>
            <div className={`${style.sidebar} ${isOpen ? style.sidebarOpen : ''}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <div>
                    <div className={style.trigger}>
                        <img src={companyLogo} alt="cLogo" onClick={() => handleMobileNav()} />
                        <span className={style.companyName}>Metrix</span>
                    </div>
                    <div className={style.navWrapper}>{renderNavBar()}</div>
                </div>
                <div className={style.bottomBar}>
                    <div className={`${style.sidebarPosition} ${style.contactSupport}`}>
                        <img src={headphones} alt="category" />
                        <span>Contact Support</span>
                    </div>
                    <div className={`${style.sidebarPosition} ${style.giftContainer}`}>
                        <div className={style.giftWrapper}>
                            <img src={gift} alt="category" />
                            <span>Free Gift Awaits You!</span>
                        </div>
                        <span className={style.upgrade}><div>Upgrade your account</div><Icon color="black" name='angle right' /></span>
                    </div>
                    <div className={style.sidebarPosition}>
                        <img src={logout} alt="category" />
                        <span className={style.logout}>Logout</span>
                    </div>
                </div>
            </div>
            <Header isOpen={isOpen} name={navJson.find((e) => e.id === activeNav)?.name}/>
            {handleNavContent()}
        </>
    );
}

export default LandingScreen;

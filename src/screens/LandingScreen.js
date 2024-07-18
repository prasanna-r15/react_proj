import React, { useState } from "react";
import style from './scss/landingScreen.module.scss';
import companyLogo from "../assets/Images/Graph.webp" 
import setting from "../assets/Images/Setting.webp"
import bag from "../assets/Images/Bag.webp"
import category from "../assets/Images/Category.webp"
import chat from "../assets/Images/Chat.webp"
import folder from "../assets/Images/Folder.webp"
import user from "../assets/Images/user.webp"
import gift from "../assets/Images/gift.webp"
import headphones from "../assets/Images/headphones.webp"
import logout from "../assets/Images/Logout.webp"
import { Icon } from 'semantic-ui-react'

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
    const [activeNav, setActiveNav] = useState(1);

    const handleTrigger = () => setIsOpen(!isOpen);

    const handleActiveNav = (e) => setActiveNav(e);

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

    return (
        <div className={style.App}>
            <div className={style.page}>
                <div className={`${style.sidebar} ${isOpen ? style.sidebarOpen : ''}`}>
                    <div>
                        <div className={style.trigger} onClick={handleTrigger}>
                            <img src={companyLogo} alt="cLogo"/>
                            <span className={style.companyName}>Metrix</span>
                        </div>
                        <div className={style.navWrapper}>{renderNavBar()}</div>
                    </div>
                    <div className={style.bottomBar}>
                        <div className={`${style.sidebarPosition} ${style.contactSupport}`}>
                            <img src={headphones} alt="category"/>
                            <span>Contact Support</span>
                        </div>
                        <div className={`${style.sidebarPosition} ${style.giftContainer}`}>
                            <div className={style.giftWrapper}>
                                <img src={gift} alt="category"/>
                                <span>Free Gift Awaits You!</span>
                            </div>
                            <span className={style.upgrade}><div>Upgrade your account</div><Icon color="black" name='angle right' /></span>
                        </div>
                        <div className={style.sidebarPosition}>
                            <img src={logout} alt="category"/>
                            <span className={style.logout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default LandingScreen;

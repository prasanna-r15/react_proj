import React from "react";
import style from './scss/header.module.scss';
import { Dropdown } from 'semantic-ui-react';
import notification from "../assets/Images/Notification.png";
import profile from "../assets/Images/profile.png";
import home from "../assets/Images/Home.png";

function Header({ isOpen, name }) {
    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'Nanny’s Shop' },
        { key: 'ms', value: 'ms', text: 'My Shop' }
    ]

    const handleNav = (() => {
        if(name !== "Dashboard"){
            return(
                <div className={style.navContent}><div>/</div><div>{name}</div></div>
            )
        }
    })
      
    return (
        <div className={`${style.headWrapper} ${isOpen ? style.sidebarOpen : ''}`}>
            <div className={style.headContainer}>
                <div className={style.headName}>{name}</div>
                <div className={style.profileWrapper}>
                    <Dropdown value={countryOptions[0].value} selection options={countryOptions} className={style.dropDown}/>
                    <img src={notification} alt="nLogo" className={style.notification}/>
                    <img src={profile} alt="pLogo" />
                </div>
            </div>
            <div className={style.navHandler}>
                <img src={home} alt="hLogo" />
                {handleNav()}
            </div>
        </div>
    );
}

export default Header;

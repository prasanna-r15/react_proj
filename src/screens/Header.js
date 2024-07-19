import React from "react";
import style from './scss/header.module.scss';
import { Dropdown } from 'semantic-ui-react';
import notification from "../assets/Images/Notification.webp";
import profile from "../assets/Images/profile.webp";
import home from "../assets/Images/Home.webp";

function Header({ isOpen, name }) {
    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'Nanny’s Shop' },
        { key: 'ms', value: 'ms', text: 'My Shop' }
    ]
      
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
            </div>
        </div>
    );
}

export default Header;

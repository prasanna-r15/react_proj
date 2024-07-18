import React from "react";
import style from './scss/dashboard.module.scss';
import { Card, Dropdown } from 'semantic-ui-react'
import icon from "../assets/Images/icon.webp"

function Dashboard({ isOpen }) {
    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'This week' },
        { key: 'ms', value: 'ms', text: 'last week' }
    ]
    return (
        <div className={`${style.dashboardWrapper} ${isOpen ? style.sidebarOpen : ''}`}>
            <div className={style.cardWrapper}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={icon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} />
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>Sales</div>
                                <div>Volume</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>
                                    ₦4,000,000.00
                                </div>
                                <div className={style.cartMetaContent}>
                                    450
                                    <span>+20.00%</span>
                                </div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={icon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} />
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>Sales</div>
                                <div>Volume</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>
                                    ₦4,000,000.00
                                </div>
                                <div className={style.cartMetaContent}>
                                    450
                                    <span>+20.00%</span>
                                </div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={icon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} />
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>Sales</div>
                                <div>Volume</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>
                                    ₦4,000,000.00
                                </div>
                                <div className={style.cartMetaContent}>
                                    450
                                    <span>+20.00%</span>
                                </div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;

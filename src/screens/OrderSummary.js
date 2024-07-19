import React from "react";
import style from './scss/orderSummary.module.scss';
import { Card, Dropdown, GridColumn, Grid, Button, Icon } from 'semantic-ui-react';
import travel from "../assets/Images/travel.webp";
import bagIcon from "../assets/Images/bagIcon.webp";

function OrderSummary({ isOpen }) {

    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'This week' },
        { key: 'ms', value: 'ms', text: 'last week' }
    ]

    return (
        <div className={`${style.orderWrapper} ${isOpen ? style.sidebarOpen : ''}`}>
            <div className={style.orderButtonWrapper}>
                <div>Orders Summary</div>
                <Button>
                    <Icon name='add' /> Create a New Order
                </Button>
            </div>
            <Grid padded className={style.cardWrapper}>
                <GridColumn computer={5}>
                <Card fluid className={style.uiCard}>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={bagIcon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown}/>
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>All Orders</div>
                                <div>Pending</div>
                                <div>Completed</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>450</div>
                                <div className={style.cartMetaContent}>5</div>
                                <div className={style.cartMetaContent}>320</div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
                </GridColumn>
                <GridColumn computer={5}>
                <Card fluid className={style.uiCard}>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={bagIcon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown} />
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>Canceled</div>
                                <div>Returned</div>
                                <div>Damaged</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>30<span className={style.negative}>-20%</span></div>
                                <div className={style.cartMetaContent}>20</div>
                                <div className={style.cartMetaContent}>5</div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
                </GridColumn>
                <GridColumn computer={6}>
                <Card fluid className={`${style.cardCWrapper} ${style.uiCard}`}>               
                    <Card.Header className={style.header}>
                        <div className={style.cardHeader}>
                            <img src={travel} alt="iImg"/>
                            <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown} />
                        </div>
                    </Card.Header>
                    <Card.Meta>
                        <div className={style.cardMeta}>
                            <div className={style.abandonedContent}>Abandoned Cart</div>
                            <div>Customers</div>
                        </div>
                    </Card.Meta>
                    <Card.Description>
                        <div className={style.cardMeta}>
                            <div className={style.cartMetaContent}>20% <span>+0.00%</span></div>
                            <div className={style.cartMetaContent}>30</div>
                        </div>
                    </Card.Description>
                </Card> 
                </GridColumn>
            </Grid>
            <Card>
                <div>Customer Orders</div>
                <div>
                </div>
            </Card>
        </div>
    );
}

export default OrderSummary;

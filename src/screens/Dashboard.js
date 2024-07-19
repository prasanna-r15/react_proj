import React from "react";
import style from './scss/dashboard.module.scss';
import { Card, Dropdown, GridColumn, Grid, GridRow } from 'semantic-ui-react'
import icon from "../assets/Images/icon.webp";
import userIcon from "../assets/Images/usericon.webp";
import bagIcon from "../assets/Images/bagIcon.webp";
import allProdIcon from "../assets/Images/allProdIcon.webp";
import travel from "../assets/Images/travel.webp";
import iphoneGold from "../assets/Images/iphoneGold.webp";
import iphoneBlack from "../assets/Images/iphoneBlack.webp";
import PieChart from './PieChart';
import BarGraph from "./BarGraph";

function Dashboard({ isOpen }) {
    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'This week' },
        { key: 'ms', value: 'ms', text: 'last week' }
    ]

    const salesOptions = [
        { key: 'ns', value: 'ns', text: 'Sales' },
        { key: 'ms', value: 'ms', text: 'Sales' }
    ]

    const weekOption = [
        { key: 'ns', value: 'ns', text: 'Last 7 days' },
        { key: 'ms', value: 'ms', text: 'Last 5 days' }
    ]

    const orderJson = [
        {
            "img":iphoneGold,
            "status":"Pending"
        },
        {
            "img":iphoneBlack,
            "status":"Completed"
        },
        {
            "img":iphoneGold,
            "status":"Pending"
        },
        {
            "img":iphoneBlack,
            "status":"Completed"
        },
        {
            "img":iphoneBlack,
            "status":"Completed"
        },
        {
            "img":iphoneBlack,
            "status":"Completed"
        },
        {
            "img":iphoneGold,
            "status":"Pending"
        },
        {
            "img":iphoneGold,
            "status":"Pending"
        },
        {
            "img":iphoneGold,
            "status":"Pending"
        }
    ]
    const handleRecentOrder = () => {
        return(
            orderJson.map((e) => (
                <div className={style.orderWrapper}>
                    <div className={style.orderImgWrapper}>
                        <img src={e.img} alt="img"/>
                        <div className={style.productWrapper}>
                            <div className={style.productName}>iPhone 13</div>
                            <div className={style.price}>₦730,000.00 x 1</div>
                        </div>
                    </div>
                    <div className={style.dateWrapper}>
                        <div className={style.date}>12 Sept 2022</div>
                        <div className={`${style.status} ${e.status === "Pending" ? style.pending : style.completed}`}>{e.status}</div>
                    </div>
                </div>
            ))
        )
    }

    const renderMarketingCard = () => (
        <>
             <Card fluid className={`${style.pieChartWrapper} ${style.uiCard}`}>               
                    <div className={`${style.cardHeader} ${style.pieChart}`}>
                        <div className={style.markettingText}>Marketing</div>
                        <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown} />
                    </div>
                    <div className={style.pieChartSection}>
                        <PieChart />
                    </div>
                </Card>
        </>
    );

    const renderProductCard = () => (
        <>
            <Grid stretched>
                    <GridRow>
                        <GridColumn stretched className={style.gridColumn}>
                        <Card fluid className={`${style.pieChartWrapper} ${style.allProducts} ${style.uiCard}`}>                                    
                                    <Card.Header>
                                        <div className={style.allProductsHeader}>
                                            <img src={allProdIcon} alt="aIcon"/>
                                        </div>
                                    </Card.Header>
                                    <div className={style.cardMeta}>
                                        <div>All Products</div>                                        
                                        <div>Active</div>
                                    </div>                              
                                    <div className={style.cardMeta}>
                                        <div >45</div>
                                        <div className={style.active}>32<span style={{color:"white"}}>+24%</span></div>                                    
                                    </div>
                                </Card> 
                        </GridColumn>                           
                    </GridRow>
                    <GridRow>
                        <GridColumn className={style.gridColumn}>
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
                    </GridRow>
                </Grid>
        </>
    );

    return (
        <div className={`${style.dashboardWrapper} ${isOpen ? style.sidebarOpen : ''}`}>            
            <Grid padded className={style.cardWrapper}>
                <GridColumn computer={5}>
                <Card fluid className={style.uiCard}>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={icon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown}/>
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
                </GridColumn>
                <GridColumn computer={5}>
                <Card fluid className={style.uiCard}>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={userIcon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown} />
                            </div>
                        </Card.Header>
                        <Card.Meta>
                            <div className={style.cardMeta}>
                                <div>Customers</div>
                                <div>Active</div>
                            </div>
                        </Card.Meta>
                        <Card.Description>
                            <div className={style.cardMeta}>
                                <div className={style.cartMetaContent}>
                                    1,250
                                    <span>+15.80%</span>
                                </div>
                                <div className={style.cartMetaContent}>
                                    1,180
                                    <span>85%</span>
                                </div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
                </GridColumn>
                <GridColumn computer={6}>
                <Card fluid className={style.card}>
                    <Card.Content>
                        <Card.Header>
                            <div className={style.cardHeader}>
                                <img src={bagIcon} alt="iImg"/>
                                <Dropdown value={countryOptions[0].value} options={countryOptions} className={style.dropDown} />
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
                                <div className={style.cartMetaContent}>445</div>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
                </GridColumn>
            </Grid>
            <Grid padded>
                <GridRow>
                    <Grid.Column computer={10}>
                        <Grid padded className={style.cardWrapper}>
                            <GridRow stretched className={style.rowWrapper}>
                                <GridColumn computer={8} className={style.marketColumn}>{renderMarketingCard()}</GridColumn>
                                <GridColumn computer={8}>{renderProductCard()}</GridColumn>
                            </GridRow>
                            <GridRow stretched>
                                <GridColumn className={style.gridColumn}>
                                    <Card fluid>
                                        <Card.Header>
                                            <div className={style.summaryWrapper}>
                                                <div className={style.summary}>
                                                    <div>Summary</div>
                                                    <div className={style.dropdown}>
                                                        <Dropdown value={salesOptions[0].value} options={salesOptions} className={style.dropDownsales} />
                                                    </div>
                                                </div>
                                                <div className={style.dropdown}>
                                                <Dropdown value={weekOption[0].value} options={weekOption} className={style.weekdropDown} />
                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Content>
                                            <BarGraph />
                                        </Card.Content>
                                    </Card>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column computer={6}>
                        <Card fluid className={`${style.pieChartWrapper} ${style.uiCard} ${style.recentWrapper}`}>               
                            <div className={style.reactOrderText}>Recent Orders</div>
                            {handleRecentOrder()}
                        </Card>
                    </Grid.Column>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Dashboard;

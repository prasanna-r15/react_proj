import React, {useState} from "react";
import style from './scss/orderSummary.module.scss';
import { Card, Dropdown, GridColumn, Grid, Button, Icon, Table, Search,Checkbox, Pagination, Popup, Form, FormInput, FormGroup } from 'semantic-ui-react';
import travel from "../assets/Images/travel.webp";
import bagIcon from "../assets/Images/bagIcon.webp";
import send from "../assets/Images/Send.webp";
import calendar from "../assets/Images/Calendar.webp";
import filter from "../assets/Images/filter.webp";
import sort from "../assets/Images/sort.webp";
import './less/orderSummary.scss';
import staticData from '././customer.json';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function OrderSummary({ isOpen }) {

    const countryOptions = [
        { key: 'ns', value: 'ns', text: 'This week' },
        { key: 'ms', value: 'ms', text: 'last week' }
    ]
    
    const statusOptions = [
        { key: 'completed', text: 'Completed', value: 'Completed' },
        { key: 'in-progress', text: 'In-Progress', value: 'In-Progress' },
        { key: 'pending', text: 'Pending', value: 'Pending' },
    ];

    const uniqueCustomerNames = [...new Set(staticData.map(order => order.customerName))];
    
    const customerOptions = uniqueCustomerNames.map(name => ({
        key: name.toLowerCase().replace(/ /g, '-'),
        text: name,
        value: name
    }));

    console.log(customerOptions);


    const [orders, setOrders] = useState(staticData);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isDateRangeChecked, setIsDateRangeChecked] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined });
    const [selectingFrom, setSelectingFrom] = useState(true);

    const handleDateRangeChange = (e) => {
        setIsDateRangeChecked(!isDateRangeChecked);
    };

    const handleItemsPerPageChange = (e, { value }) => {
        setItemsPerPage(value);
      };

    const handleDayClick = (day) => {
        if (selectingFrom) {
        setSelectedRange({ from: day, to: selectedRange.to });
        setSelectingFrom(false);
        } else {
        setSelectedRange({ from: selectedRange.from, to: day });
        }
    };

    const modifiers = {
        selected: (day) => {
        const { from, to } = selectedRange;
        return (from && day >= from && (!to || day <= to));
        },
        start: (day) => {
        return selectedRange.from && day.toDateString() === selectedRange.from.toDateString();
        },
        end: (day) => {
        return selectedRange.to && day.toDateString() === selectedRange.to.toDateString();
        },
        range: (day) => {
        const { from, to } = selectedRange;
        return from && to && day > from && day < to;
        }
    }; 

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleStatusFilter = (event, data) => {
        setStatusFilter(data.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage);
    };

    const sortedOrders = [...orders].sort((a, b) => {
        if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        }
        return 0;
    });

    const filteredOrders = sortedOrders.filter(order => {
        return (
        order.customerName.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter ? order.status === statusFilter : true)
        );
    });
    console.log("selectedRange", selectedRange);
    const paginatedOrders = filteredOrders.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
        key: i + 1,
        text: i + 1,
        value: i + 1,
    }));


    const renderTableContent = () => {
        return(
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                        <Checkbox/>
                        </Table.HeaderCell>
                        <Table.HeaderCell ><div className={style.tableHeader} onClick={() => handleSort('customerName')}>Customer Name <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell ><div className={style.tableHeader} onClick={() => handleSort('orderDate')}>Order Date <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell ><div className={style.tableHeader} onClick={() => handleSort('orderType')}>Order Type <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell ><div className={style.tableHeader} onClick={() => handleSort('trackingId')}>Tracking ID <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell ><div className={style.tableHeader} onClick={() => handleSort('orderTotal')}>Order Total <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell><div className={style.tableHeader}>Action <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                        <Table.HeaderCell><div className={style.tableHeader}>Status <img src={sort} alt="sIcon"/></div></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginatedOrders.map((order, index) => (
                        <Table.Row key={index}>
                        <Table.Cell>
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell>{order.customerName}</Table.Cell>
                        <Table.Cell>{order.orderDate}</Table.Cell>
                        <Table.Cell>{order.orderType}</Table.Cell>
                        <Table.Cell>{order.trackingId}<Icon name="copy outline"/></Table.Cell>
                        <Table.Cell>{order.orderTotal}</Table.Cell>
                        <Table.Cell>
                            <Dropdown
                                placeholder='Select Action'
                                selection
                                options={statusOptions}
                                value={order.action}
                                onChange={(e, data) => {
                                    const updatedOrders = orders.map((o, i) =>
                                    i === index ? { ...o, action: data.value } : o
                                    );
                                    setOrders(updatedOrders);
                                }}
                                className="tableDropDown"
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                            className={`${style.actionBtn} ${order.action === 'Completed' ? style.actionGBtn :
                                order.action === 'In-Progress' ? style.actionBBtn : style.actionOBtn}`}                    
                            >
                                {order.action   }
                            </Button>
                        </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }

    const handleFirstFilter = () => {
        return(
            <div className={style.filter1Wrapper}>
                <div className={style.filterHeader}>Filter</div>
                <div className={style.order}>Order Type</div>
                <div className={style.checkWrapper}>
                    <Checkbox/>
                    <div className={style.checkContent}>Home Delivery</div>
                    <Checkbox/>
                    <div className={style.checkContent}>Pick Up</div>
                </div>
                <div className={style.border}></div>
                <div className={style.border}></div>
                <div className={style.wrapper}>
                    <div className={style.status}>Status</div>
                    <Dropdown
                        placeholder='Select Action'
                        selection
                        options={statusOptions}                                        
                        className="filterDropDown"
                    />
                </div>
                <div className={style.wrapper}>
                    <div className={style.status}>Customer</div>
                    <Dropdown
                        placeholder='Select Action'
                        selection
                        options={customerOptions}                                        
                        className="filterDropDown"
                    />
                </div>
                <div className={style.status}>Amount</div>
                <div className={style.amountBWrapper}>
                <Form>
                    <FormGroup widths='equal'>
                    <FormInput
                        label='From'
                    />
                    <FormInput
                        label='To'                        
                    />
                    </FormGroup>
                </Form>
                </div>
                <Button className={style.filterBtn}>Filter</Button>
            </div>            
        )
    }

    const handleSecondFilter = () =>{
        return(
            <div className={style.filter1Wrapper}>
                <div className={style.filterHeader}>By Date</div>
                <div className={style.checkWrapper}>
                    <Checkbox/>
                    <div className={style.checkContent}>This Week</div>
                    <Checkbox/>
                    <div className={style.checkContent}>Last Week</div>
                </div>
                <div className={style.checkWrapper}>
                    <Checkbox/>
                    <div className={style.checkContent}>This Month</div>
                    <Checkbox/>
                    <div className={style.checkContent}>Last Month</div>
                </div>
                <div className={style.checkWrapper}>
                    <Checkbox/>
                    <div className={style.checkContent}>This Year</div>
                    <Checkbox/>
                    <div className={style.checkContent}>Last Year</div>
                </div>
                <div className={style.checkWrapper}>
                    <Checkbox checked={isDateRangeChecked} onChange={handleDateRangeChange}/>
                    <div className={style.checkContent}>Date Range</div>                    
                </div>
                {isDateRangeChecked && (
                    <div className="datePickerWrapper">
                    <div className="toggleWrapper">
                        <button
                        className={`toggleBtn ${selectingFrom ? 'active' : ''}`}
                        onClick={() => setSelectingFrom(true)}
                        >
                        From
                        </button>
                        <button
                        className={`toggleBtn ${!selectingFrom ? 'active' : ''}`}
                        onClick={() => setSelectingFrom(false)}
                        >
                        To
                        </button>
                    </div>
                    <DayPicker
                        selected={selectedRange}
                        onDayClick={handleDayClick}
                        modifiers={modifiers}
                        modifiersClassNames={{
                        selected: 'selected',
                        start: 'selected-start',
                        end: 'selected-end',
                        range: 'selected-range'
                        }}
                        fromYear={2020}
                        toYear={2025}
                        captionLayout="dropdown"
                    />
                    </div>
                )}
                <Button className={style.filterBtn}>Filter</Button>
            </div>
        )
    }
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
                <Card fluid className={style.card}>
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
                <Card fluid className={`${style.cardCWrapper} ${style.card}`}>               
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
            <div className={style.tableContentWrapper}>
                <div className={style.tableinContent}>
                    <div className={style.tableHeadWrapper}>
                        <div className={style.heading}>Customer Orders</div>
                        <div className={style.filterSection}>
                            <Search
                                className="searchInput"
                                placeholder='Search'
                                input={{ icon: 'search', iconPosition: 'left' }}
                            />
                            <Popup trigger={<Button className={style.filterBtn}>
                                <img src={filter} alt="fIcon" /> Filter
                            </Button>} position="bottom right" on='click'>
                                {handleFirstFilter()}
                            </Popup>
                            <Popup trigger={<Button className={style.filterBtn}>
                                <img src={calendar} alt="cIcon" /> Filter
                            </Button>} position="bottom right" on='click'>
                                {handleSecondFilter()}
                            </Popup>                            
                            <Button className={style.filterBtn}>
                                <img src={send} alt="sIcon" /> Share
                            </Button>
                            <Button className={style.filterBtn}>
                                Bulk Action <Icon name="angle down" size="large"/>
                            </Button>
                        </div>
                    </div>
                    
                    <div className={style.table}>
                        {renderTableContent()}
                        <div className={style.customPagination}>
                            <div className={style.paginationWrapper}>
                                <Dropdown
                                className="custom-dropdown"
                                placeholder='Items per page'
                                selection
                                options={[10, 20, 50].map(number => ({ key: number, text: number, value: number }))}
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                />
                                <div className={style.perPage}>Items per page</div>
                                <div className={style.from}>
                                    {`${(activePage - 1) * itemsPerPage + 1}-${Math.min(activePage * itemsPerPage, filteredOrders.length)} of ${filteredOrders.length} items`}
                                </div>
                            </div>
                            <div className={style.paginationWrapper}>
                                <Dropdown
                                    className="custom-dropdown"
                                    placeholder='Page'
                                    selection
                                    options={pageOptions}
                                    value={activePage}
                                    onChange={handlePaginationChange}
                                />
                                <span>of {totalPages} pages</span>
                                <Pagination
                                    className="paginationWrap"
                                    activePage={activePage}
                                    onPageChange={handlePaginationChange}
                                    totalPages={totalPages}
                                    boundaryRange={0}
                                    siblingRange={0}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;

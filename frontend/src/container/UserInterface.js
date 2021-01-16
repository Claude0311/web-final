import { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Avatar, Tooltip } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeFilled
  } from '@ant-design/icons';
import './UserInterface.css';  
import Map from './Map';
import House_Menu from '../component/House_Menu';
import SearchForm from '../component/House_Search';

const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth, logout, history})=> {
    
    const [collapsed, setCollapsed] = useState(false);
    const [criteria, setCriteria] = useState(null);
    const [myHouses, setMyHouses] = useState([]);
    
    const mapRef = useRef(null);
    // const [userHouses, setUserHouses] = useState([]);
    // const myHouses = [
    //     "1","2","3"
    // ]
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleCriteria = (c) => {
        setCriteria(c);
    }

    const onHome = () => {
        history.push('/');
    }

    // const setCriteria = (c) => {
    //     mapRef.current.setCriteria(c);
    // }

    const searchNeighbor = () => {
        mapRef.current.searchNeighbor();
    }
    
    const onLogout = async() => {
        const result = await logout();
        if (result === 'success') {
            console.log("log out...");
            history.push('/login');
        } else {
            console.log(result);
        }
    }

    const houseProfiles = (myHouses && myHouses.length !== 0)
        ?myHouses.map((ele) => 
            <Menu.Item key={ele}>MY house{ele}</Menu.Item>)
        :<Menu.Item key="Not found" disabled>Not found</Menu.Item>

    useEffect(() => {
        console.log(typeof isAuth);
    },[]);

    return (
    <Layout>
        <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            theme="light"

            >
            <div className="logo" >
                <HomeFilled style={{
                    fontSize: "20px"
                }} />
                <div className="text">
                    <span>House</span>
                    <span>Evaluation</span>
                </div>
            </div>
            
            <House_Menu 
                isAuth={isAuth} 
                logout={logout}
                houseProfiles={houseProfiles}
                collapsed={collapsed}
            />
        </Sider>
        <Layout className="site-layout">
        <Header 
            className="site-layout-background" 
            theme="light"
            style={{ 
                padding: '10px', 
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between"  
            }}
        >
            { (collapsed) ? 
                <MenuUnfoldOutlined 
                    className='trigger'
                    onClick={toggle} />
                    : 
                <MenuFoldOutlined
                    className='trigger'
                    onClick={toggle} />
            }
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    // justifySelf: "center"
                }}>
                <SearchForm
                    name="Search Options"
                    setCriteria={handleCriteria}
                />
            </span>
            <span>
                <Tooltip 
                    title={`User: ${id}`}
                    placement="bottomRight">
                    <Avatar 
                        size="default"
                        style={{ backgroundColor: '#87d068', margin: "0 16px" }} 
                        icon={<UserOutlined />} 
                    />
                </Tooltip>
            </span>
        </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '20px 24px',
                    padding: 0,
                    minHeight: 280,
                    overflow: 'hidden'
                    }}
                >
                    <Map 
                        // id={id} 
                        // isAuth={isAuth}
                        // ref = {mapRef}
                        criteria={criteria}
                    />
                </Content>       
        </Layout>
    </Layout>
    );

}
export default UserInterface;

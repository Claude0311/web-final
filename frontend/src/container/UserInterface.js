import { useState, useEffect } from 'react';
import { Input, Layout, Menu, Avatar, Tooltip, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    ShopOutlined,
    UploadOutlined,
    UserOutlined,
    SearchOutlined,
    HomeOutlined,
    HomeFilled
  } from '@ant-design/icons';
import './UserInterface.css';  
import Map from './Map';
import SubMenu from 'antd/lib/menu/SubMenu';
import SearchForm from '../component/House_Search';

const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth, logout, history})=> {
    
    const [collapsed, setCollapsed] = useState(false);
    const [criteria, setCriteria] = useState(null);
    // const [userHouses, setUserHouses] = useState([]);
    const myHouses = [
        "1","2","3"
    ]
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleCriteria = (c) => {
        setCriteria(c);
    }

    const onHome = () => {
        history.push('/');
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

            <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="search" icon={<SearchOutlined />}>
                    {(collapsed)?
                        "Search":
                        <Input
                            name="Search"
                            placeholder="Search address"
                            style={{ maxWidth: '80%'}}
                        ></Input>
                    }
                </Menu.Item>
                <Menu.Item key="profile" icon={<UserOutlined />}>
                Your profile
                </Menu.Item>
                <SubMenu key="houses" icon={<ShopOutlined />} title="Your Houses">
                    {myHouses.map((ele) => 
                        <Menu.Item key={ele}>MY house{ele}</Menu.Item>)}
                </SubMenu>
                <Menu.Item key="logout" onClick={onLogout} icon={<LogoutOutlined />}>
                Log out
                </Menu.Item>
                <Menu.Item key="n1" icon={<UploadOutlined />}>
                not done yet
                </Menu.Item>
                <Menu.Item key="n2" icon={<UploadOutlined />}>
                not done yet
                </Menu.Item>
            </Menu>
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
                    alignItems: "center"}}>
                <SearchForm
                    name="Search Options"
                    setCriteria={handleCriteria}
                />
                <Input.Search
                    placeholder="Search"
                    style={{ width: 500, margin: '0 20px' }}
                />
            </span>
            <Tooltip title={id} placement="bottomRight">
                <Avatar 
                    size="default"
                    style={{ backgroundColor: '#87d068' }} 
                    icon={<UserOutlined />} 
                />
            </Tooltip>
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
                        criteria={criteria}
                    />
                </Content>       
        </Layout>
    </Layout>
    );

}
export default UserInterface;

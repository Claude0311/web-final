import { useState, useEffect } from 'react';
import { Input, Layout, Menu, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    ShopOutlined,
    UploadOutlined,
    UserOutlined,
    SearchOutlined,
    HomeOutlined
  } from '@ant-design/icons';
import './UserInterface.css';  
import Map from './Map';
import SubMenu from 'antd/lib/menu/SubMenu';
import SearchForm from '../component/House_Search';

const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth})=> {
    
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
    <Layout>
        <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            theme="light"

            >
            <div className="logo" >
                Web final Logo
            </div>

            <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="10" icon={<SearchOutlined />}>
                    {(collapsed)?
                        "Search":
                        <Input
                            name="Search"
                            placeholder="Search address"
                            style={{ maxWidth: '80%'}}
                        ></Input>
                    }
                </Menu.Item>
                <Menu.Item key="1" icon={<UserOutlined />}>
                Your profile
                </Menu.Item>
                <SubMenu key="2" icon={<ShopOutlined />} title="Your Houses">
                    <Menu.Item key="3">House1</Menu.Item>
                    <Menu.Item key="4">House2</Menu.Item>
                    <Menu.Item key="5">House3</Menu.Item>
                </SubMenu>
                <Menu.Item key="3" icon={<LogoutOutlined />}>
                Log out
                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                nav 3
                </Menu.Item>
                <Menu.Item key="5" icon={<UploadOutlined />}>
                Log Out
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
            <Input.Search
                placeholder="Search"
                style={{ width: 500, margin: '0 20px' }}
            />
            <Avatar
                size="default"
                style={{ margin: '0 10px' }}
                icon={<UserOutlined />}
                />
        </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '30px 24px',
                    padding: 0,
                    minHeight: 280,
                    overflow: 'hidden'
                    }}
                >
                    {/* <Map id={id} isAuth={isAuth}></Map> */}
                    <SearchForm />
                </Content>       
        </Layout>
    </Layout>
    );

}
export default UserInterface;

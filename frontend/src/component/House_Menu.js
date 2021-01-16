import { Input, Layout, Menu, Avatar, Tooltip, Button } from 'antd';
import {
    LogoutOutlined,
    ShopOutlined,
    UploadOutlined,
    UserOutlined,
    SearchOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const House_Menu = (props) => {

    const additionalTool = (props.isAuth)?
        (
            <>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Your profile
            </Menu.Item>
            <Menu.Item key="n1" icon={<UploadOutlined />}>
            not done yet
            </Menu.Item>
            <Menu.Item key="n2" icon={<UploadOutlined />}>
            not done yet
            </Menu.Item>
            </>
        ):<></>
    return (
        <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="search" icon={<SearchOutlined />}>
                    {(props.collapsed)?
                        "Search":
                        <Input
                            name="Search"
                            placeholder="Search address"
                            style={{ maxWidth: '80%'}}
                        ></Input>
                    }
                </Menu.Item>              
                <SubMenu key="houses" icon={<ShopOutlined />} title="Your Houses">
                    {props.houseProfiles}
                </SubMenu>
                {additionalTool}
                <Menu.Item key="logout" onClick={props.onLogout} icon={<LogoutOutlined />}>
                Log out
                </Menu.Item>
                
            </Menu>
    )
}
export default House_Menu;
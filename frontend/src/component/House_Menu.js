import {useEffect} from 'react';
import { Input, Menu, Avatar, Tooltip, Button } from 'antd';
import {
    LogoutOutlined,
    ShopOutlined,
    UploadOutlined,
    UserOutlined,
    SearchOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const House_item = (props) => {
    return (
        <Menu.Item 
            key={props.id}
            // onClick={props.showSimilar}
        >
            MY house{props.id}
        </Menu.Item>
    )
}
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
    // const houseProfiles = (props.houses && props.houses.length !== 0)
    //     ?props.houses.map((house) => 
    //         <House_item {...house} />
    //         )
    //     :<Menu.Item key="Not found" disabled>Not found</Menu.Item>

    useEffect(()=>{
        console.log(props.houses);
    })
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
            <Menu.Item 
                key="all houses" 
                icon={<UserOutlined />}
                onClick={props.onMyHouseMode}
            >
                show my houses only
            </Menu.Item>            
            <SubMenu key="houses" icon={<ShopOutlined />} title="House Profile">
                {/* {houseProfiles} */}
            </SubMenu>
            {additionalTool}
            <Menu.Item key="logout" onClick={props.onLogout} icon={<LogoutOutlined />}>
                Log out
            </Menu.Item>
            
        </Menu>
    )
}
export default House_Menu;
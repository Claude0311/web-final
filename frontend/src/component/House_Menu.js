import {useEffect} from 'react';
import { Input, Menu, Avatar, Tooltip, Button } from 'antd';
import {
    ExportOutlined,
    ShopOutlined,
    UserOutlined,
    SearchOutlined,
    HomeOutlined,
    FormOutlined,
    FileDoneOutlined,
    FileSearchOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { priceConvert } from '../util/util';


const House_Menu = (props) => {
    const onSearch = () => {
        console.log("search");
    }
    const additionalTool = (props.isAuth)?
        (
            <>
            <Menu.Item key="search" icon={<SearchOutlined />}>
                {(props.collapsed)?
                    "Search":
                    <Input
                        name="Search"
                        placeholder="Search address"
                        style={{ maxWidth: '80%'}}
                        onPressEnter={onSearch}
                    ></Input>
                }
            </Menu.Item>
            <Menu.Item 
                key="todo" 
                icon={<FormOutlined />}
                onClick={props.onTodoMode}
            >
                Todo List
            </Menu.Item>
            <Menu.Item 
                key="done" 
                icon={<FileDoneOutlined />}>
                Check List
            </Menu.Item>
            </>
        ):<></>

    const houseProfiles = (props.houses && props.houses.length !== 0)
        ?<>{props.houses.map((house) => 
            <Menu.Item 
                key={house._id}
                onClick={()=>props.showSimilar(house._id)}
            >
                NT$ {priceConvert(house.avgPrice)}
            </Menu.Item>
            )}</>
        :<Menu.Item key="Not found" disabled>Not found</Menu.Item>

    // useEffect(()=>{
    //     console.log(props.houses);
    // })

    return (
        <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
            <Menu.Item 
                key="home" 
                icon={<HomeOutlined />}
                onClick={props.onHome}>
                Home
            </Menu.Item>
            {additionalTool}
            <Menu.Item 
                key="all houses" 
                icon={<UserOutlined />}
                onClick={props.onMyHouseMode}
            >
                My Houses
            </Menu.Item>            
            <SubMenu key="houses" icon={<ShopOutlined />} title="House Profiles">
                {houseProfiles}
            </SubMenu>
            <Menu.Item 
                key="score" 
                icon={<FileSearchOutlined />}
                onClick={props.onScore}>
                Score Rules
            </Menu.Item>
            <Menu.Item key="logout" onClick={props.onLogout} icon={<ExportOutlined />}>
                Log out
            </Menu.Item>
            
        </Menu>
    )
}
export default House_Menu;
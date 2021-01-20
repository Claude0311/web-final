// import {useEffect} from 'react';
import { Input, Menu,  } from 'antd';
import {
    ExportOutlined,
    ShopOutlined,
    UserOutlined,
    SearchOutlined,
    FormOutlined,
    FileSearchOutlined,
    SettingOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    SolutionOutlined,
    TableOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { timeConvert } from '../util/util';
import { Link } from 'react-router-dom';

const LoadingIcon = (props) => {
    const {isLoading, icon:Icon, ...rest} = props;
    return (isLoading)
        ? <LoadingOutlined {...rest}/>
        : <Icon {...rest} />
}

const House_Menu = (props) => {
    const onMySearch = (e) => {
        // console.log("search");
        // console.log(e);
        props.onSearch(e.target.value)
    }
    const additionalTool = (props.isAdminMode)?
        (
            <>
            <Menu.Item 
                key="todo" 
                icon={<FormOutlined />}
                onClick={props.onTodoMode}
            ><Link to='/'>
                Todo List
            </Link>
            </Menu.Item>
            <Menu.Item 
                key="score" 
                icon={<FileSearchOutlined />}
                >
                <Link to="/score" >Score Rules</Link>
            </Menu.Item>
            <Menu.Item 
                key="userMode" 
                icon={<LoadingIcon isLoading={props.isLoading} icon={SettingOutlined} />}
                onClick={props.onUserMode}
            >
                User Mode
            </Menu.Item>
            </>
        ):<>
            <Menu.Item 
                key="all houses" 
                icon={<UserOutlined />}
                onClick={props.onMyHouseMode}
            >
                My Houses
            </Menu.Item>
            <Menu.Item 
                key="unread houses" 
                icon={<ExclamationCircleOutlined />}
                onClick={props.onUnReadMode}
            >
                Unread Houses
            </Menu.Item>
            {(props.isAuth)?
            <Menu.Item 
                key="adminMode" 
                icon={<LoadingIcon isLoading={props.isLoading} icon={SettingOutlined} />}
                onClick={props.onAdminMode}
            >
                Admin Mode
            </Menu.Item>
            :<></>}


        </>
    const style = (processed, unRead) => {
        if (unRead) {
            return {
                icon: <ExclamationCircleOutlined 
                    style={{color: '#f50'}}/>
            }
        } else {
            return ((processed)
                ? {icon:<CheckCircleOutlined style={{color: 'gold'}}/>}
                : {icon:<SolutionOutlined style={{color: '#aaa'}}/>}
            )
        }
    }
    const houseProfiles = (props.houses && props.houses.length !== 0)
        ?<>
            {props.houses.map((house) => {
                return(
                <Menu.Item 
                    key={house._id}
                    onClick={()=>props.showSimilar(house._id)}
                    {...style(house.processed,house.unread)}
                >
                    {timeConvert(house.updatedAt)}
                </Menu.Item>
                );
            }
            )}</>
        :<Menu.Item key="Not found" disabled>Not found</Menu.Item>

    // useEffect(()=>{
    //     console.log(props.houses);
    // })

    return (
        <Menu theme="light" mode="inline" defaultSelectedKeys={['home']}>
            <Menu.Item 
                key="home" 
                icon={<TableOutlined />}
                onClick={props.onMap}
            >
                <Link to='/'>Overview</Link>
            </Menu.Item>
            <Menu.Item key="search" icon={<SearchOutlined />}>
                {(props.collapsed)?
                    "Search":
                    <Input
                        name="Search"
                        placeholder="Search address"
                        style={{ maxWidth: '80%'}}
                        onPressEnter={onMySearch}
                    ></Input>
                }
            </Menu.Item> 
            <SubMenu key="houses" icon={<ShopOutlined />} title={<Link to='/'>House Profiles</Link>}
                style={{overflow: 'auto', maxHeight: '50vh', }}>
                {houseProfiles}
            </SubMenu>
            {additionalTool} 
            <Menu.Item 
                key="logout" 
                onClick={props.onLogout} 
                icon={<ExportOutlined />}
            > Log out
            </Menu.Item>
            
        </Menu>
    )
}
export default House_Menu;
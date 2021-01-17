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
import { axiosGetHouses, axiosAdminGetValuate, axiosUserGetValuate } from '../axios/axios';
import { clusterConvert } from '../util/util';
const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth, logout, history})=> {
    
    const [collapsed, setCollapsed] = useState(false);
    const [criteria, setCriteria] = useState(null);
    const [points, setPoints] = useState([]); // others
    const [houses, setHouses] = useState(null); // eval
    const [newlyAddHouses, setNewlyAddHouses] = useState(0)
    
    const mapRef = useRef(null);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleCriteria = (c) => {
        setCriteria(c);
    }

    const onHome = () => {
        history.push('/');
    }

    const getEvalHouses = async () => {
        const evalHouses = await axiosAdminGetValuate();
        if (evalHouses !== null) {
          const evalPoints = evalHouses.map(clusterConvert)
          setHouses(evalPoints);
        }
        // setPoints([]);
        
    }

    const getMyHouses = async ()  => {
        const myHouses = await axiosUserGetValuate();
        console.log("myhouses",myHouses);
        if (myHouses !== null){
          //const evalPoints = myHouses.map(clusterConvert);
          // console.log("eval",evalPoints);
          // setHouses(evalPoints);
          setHouses(myHouses);
        }
        // setPoints([]);
        
    }

    const onAddNewHouses = () => {
        setNewlyAddHouses(newlyAddHouses+1)
    }
    // const checkSimilar = (id) => {
    //   console.log("checksim")
    //   let similarHouses = [];
    //   // console.log(houses);
    //   if (houses !== null) {
    //     houses.forEach(ele => {
    //       similarHouses = [ ...similarHouses, ...ele.properties.similar];
    //     })
    //     // const similarPoints = similarHouses.map(clusterConvert);
    //     // console.log("sim",similarPoints);
    //     // setPoints(clusterConvert);
    //   }
    //   // setHouses(houses)
    // }

    // const setCriteria = (c) => {
    //     mapRef.current.setCriteria(c);
    // }
    // ============ getHouses =============
    const getHouses = async () => {
        console.log("getting houses...")
        const req_houses = await axiosGetHouses(criteria);
        if (req_houses !== null){
          const houses_cluster = req_houses.map(clusterConvert);
          // console.log(houses_cluster);
          setPoints(houses_cluster)
        }
      }

    const searchNeighbor = () => {
        mapRef.current.searchNeighbor();
    }

    const searchhouses = (name) => {
        const houses = houses.filter(ele=>ele.name === name);
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

    

    useEffect( () => {
        getHouses();
    }, [criteria]);

    useEffect( () => {
      // if (!houses) {
        if (isAuth) {
          getEvalHouses();
        } else {
          getMyHouses();
        }
        console.log(newlyAddHouses)
      // }
    }, [newlyAddHouses])

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
                onLogout={onLogout}
                houses={houses}
                // onMyHouseMode={onMyHouseMode}
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
                    points={points}
                    houses={houses}
                    criteria={criteria}
                    onAddNewHouses={onAddNewHouses}
                />
            </Content>       
        </Layout>
    </Layout>
    );

}
export default UserInterface;

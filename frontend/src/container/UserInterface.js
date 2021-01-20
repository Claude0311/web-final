import { useState, useEffect, useRef } from 'react';
import { Layout, message, Avatar, Tooltip } from 'antd';
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
import { axiosGetHouses,
        axiosAdminGetValuate,
        axiosUserGetValuate, 
        axiosGetScoreRule,
        axiosSetManualPrice
    } from '../axios/axios';

import { clusterConvert,
        compareHouses,
        neighborHouse 
    } from '../util/util';
import { useMapApi } from '../Auth/GoogleApi';
import ScoreRule from '../component/House_Score';
import { Route, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth, logout, history,...rest})=> {
    
    const [collapsed, setCollapsed] = useState(false);
    const [criteria, setCriteria] = useState(null);
    const [points, setPoints] = useState([]); // others
    const [houses, setHouses] = useState(null); // eval
    const [myPoints, setMyPoints] = useState(null);
    const [isAdminMode, setAdminMode] = useState(false);
    const { apiKey, searchAddr } = useMapApi();
    const [isModeChanging, setModeLoading] = useState(false);

    // thoses from Map.js
    const [cen,setCen] = useState({lat: 25.007414, lng: 121.51505})

    const mapRef = useRef(null);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleCriteria = (c) => {
        setCriteria({...criteria,...c});
    }

    // ================= MENU functions ===================

    // ==== Noraml Functions =====
    const onHome = () => {
        // console.log("reset...")
        setCriteria(null);
        if (isAdminMode) {
            getEvalHouses();
        } else {
            getMyHouses();
        }
        getHouses();
        // history.push('/');
    }
    // ======= show houses only
    const onMap = () => {
        setMyPoints([]);
        getHouses();
    }

    const setMyHouseOnly = () => {
        setPoints([]);
        setMyPoints(houses);
    }
    // view all houses i have
    const getMyHouses = async ()  => {
        const myHouses = await axiosUserGetValuate();
        // console.log("myhouses",myHouses);
        if (myHouses !== null){
            myHouses.sort(compareHouses)
            setHouses(myHouses);
            setMyPoints(myHouses);
        }        
    }
    const setHouseRead = (id) => {
        const housesinfo = houses.map( 
            house => house._id === id
                ?{...house, unread: false}
                :house
        )
        setHouses(housesinfo);
    }
    // show similar houses given an id
    const showSimilar = (id) => {
        const h = houses.find(ele=>ele._id === id);
        if (!h) {
            return
        }
        // console.log(h.similar);
        const similarPoints = h.similar.map(clusterConvert);
        setPoints(similarPoints);
        setMyPoints([h]);
        if (h.unread) {
            setHouseRead(id);
        }
        setCen(h.coordinate);
      
    }

    const searchHousebyAddr = async (address) => {
        const coor = await searchAddr(address);
        if (coor) {
            const newCri = {neighbor:{center:coor,distance:100} };
            handleCriteria(newCri);
            setCen(coor)
        } else {
            message.error("Invalid address",[1]);
        }
        
    }
    const searchMyHousebyAddr = async (address) => {
        const coor = await searchAddr(address);
        if (coor) {
            const search = houses.filter(neighborHouse(coor));
            // console.log("search",search);
            setCen(coor)
            setMyPoints(search);
            if (!search.length) {
                message.error("houses not found",[1]);
            }
        } else {
            message.error("Invalid Address",[1]);
        }
    }

    const showUnreadHouses = () => {
        const unread = houses.filter(house => house.unread);
        if (unread.length ) {
            setMyPoints(unread);
        } else {
            message.error("All houses are read",[1]);
        }
    }
    // ============= Admin Functions ========

    const getEvalHouses = async () => {
        // console.log("open admin mode...");
        const evalHouses = await axiosAdminGetValuate();
        if (evalHouses !== null) {
            const evalAuth = evalHouses.map(house => (
                { ...house,
                    auth: true,
                }));
            setHouses(evalAuth);
            setMyPoints(evalAuth);
        }        
    }

    const switchToAdmin = async() => {
        setModeLoading(true);
        setAdminMode(true);
        setPoints([]);
        await getEvalHouses();
        message.info("switch to Admin Mode!!",[1]);
        setModeLoading(false);
        
        
    }

    const switchToUser = async () => {
        setModeLoading(true);
        setAdminMode(false);
        await getHouses();
        await getMyHouses();
        message.info("switch to User Mode!!",[1]);
        setModeLoading(false);
    }

    // check not valuated houses
    const viewUnValuate = () => {

        setPoints([]);
        setMyPoints(houses.filter(e=>!e.processed));
    }

    // set manual price
    const setManualPrice = async ({_id, manualPrice}) => {
        const reply = await axiosSetManualPrice({_id, manualPrice});
        if (reply) {
            // console.log("get my houses again...")
            message.success(`set price NT$${manualPrice} successfully`,[1])
            const newhouses = houses.map((house) => (
                (house._id !== _id)? house : {...house,processed:true,manualPrice}
            ));
            newhouses.sort(compareHouses);
            setHouses(newhouses);
            setMyPoints(newhouses);
        }
    }

    // ============ getHouses =============
    const getHouses = async () => {
        // console.log("getting houses...")
        const req_houses = await axiosGetHouses(criteria);
        if (req_houses !== null && req_houses.length){
            message.success("loading houses successfully",[1]);
          const houses_cluster = req_houses.map(clusterConvert);
          setPoints(houses_cluster)
        } else {
            message.error("houses not found",[1]);
        }
    }

    // const searchhouses = (id) => {
    //     console.log("search",id)
    //     const house = houses.filter(ele=>ele._id.includes(id));
    //     setMyPoints(house);
    // }
    // =============== Score ==================
    const onViewScoreRule = async() => {
        const rule = await axiosGetScoreRule();
        // console.log("rule",rule);
    }
    
    const onLogout = async() => {
        const result = await logout();
        if (result === 'success') {
            // console.log("log out...");
            message.info("See you next time!!",[1])
            history.push('/login');
        } else {
            // console.log(result);
            message.error("fail to log out",[1])

        }
    }

    // useEffect( ()=> {
    //     console.log("cur", mapRef.current)
    // },[mapRef])
    

    useEffect( () => {
        getHouses();
    }, [criteria]);

    useEffect( () => {
      if (!houses) {
        if (isAuth) {
          getEvalHouses();
        } else {
          getMyHouses();
        }
      }
    }, [])

    // useEffect( ()=> {
    //     console.log("api",apiKey)
    // },[apiKey]);

    return (
    <Layout>
        <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            theme="light"

            >
            <Link to='/'>
            <div className="logo"
                onClick={onHome} >
                
                <HomeFilled style={{
                    fontSize: "24px"
                }} />
                {collapsed
                    ? null
                    :<div className="text">
                        <span>House</span>
                        <span>Evaluation</span>
                    </div>
                }
            </div>
            </Link>

            <House_Menu 
                isAuth={isAuth} 
                isAdminMode={isAdminMode}
                onLogout={onLogout}
                houses={houses}
                onMap={onMap}
                onMyHouseMode={setMyHouseOnly}
                onUnReadMode={showUnreadHouses}
                onSearch={searchMyHousebyAddr}
                showSimilar={showSimilar}
                collapsed={collapsed}
                onTodoMode={viewUnValuate}
                onScore={onViewScoreRule}
                onAdminMode={switchToAdmin}
                onUserMode={switchToUser}
                isLoading={isModeChanging}
                
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
                  }}>
                  <SearchForm
                      name="Search Options"
                      setCriteria={handleCriteria}
                      onSearch={searchHousebyAddr}
                  />
              </span>
              <span>
                <Tooltip 
                    title={(isAuth)?`Admin: ${id}`:`User: ${id}`}
                    placement="bottomRight"
                >
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
                overflow: 'hidden',
                }}
            >
                <Route path="/" exact render={ (props) => 
                    (<Map {...props} 
                        apiKey={apiKey}
                        ref={mapRef}
                        points={points}
                        houses={myPoints}
                        isAdminMode={isAdminMode}
                        setManualPrice={setManualPrice}
                        getMyHouses={getMyHouses}
                        cen={cen}
                        setCen={setCen}
                    /> )}
                />
                <Route path='/score' render={ (props) => 
                    (<ScoreRule {...props} 
                    /> )}
                />
            </Content>       
        </Layout>
    </Layout>
    );
}                

export default UserInterface

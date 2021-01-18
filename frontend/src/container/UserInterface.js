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
import { axiosGetHouses,
        axiosAdminGetValuate,
        axiosUserGetValuate, 
        axiosGetScoreRule,
        axiosSetManualPrice
    } from '../axios/axios';
import { clusterConvert } from '../util/util';
const { Header, Sider, Content } = Layout;

const UserInterface = ({id,isAuth, logout, history,...rest})=> {
    
    const [collapsed, setCollapsed] = useState(false);
    const [criteria, setCriteria] = useState(null);
    const [points, setPoints] = useState([]); // others
    const [houses, setHouses] = useState(null); // eval
    const [newlyAddHouses, setNewlyAddHouses] = useState(0)
    const [myPoints, setMyPoints] = useState(null);
    const [isAdminMode, setAdminMode] = useState(false);
    
    const mapRef = useRef(null);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleCriteria = (c) => {
        setCriteria(c);
    }

    // ================= MENU functions ===================

    // ==== Noraml Functions =====
    const onHome = () => {
        console.log("reset...")
        setCriteria(null);
        if (isAdminMode) {
            getEvalHouses();
        } else {
            getMyHouses();
        }
        // history.push('/');
    }
    // only view houses that I have
    const setMyHouseOnly = () => {
        setPoints([]);
        setMyPoints(houses);
    }
    // view all houses i have
    const getMyHouses = async ()  => {
        const myHouses = await axiosUserGetValuate();
        // console.log("myhouses",myHouses);
        if (myHouses !== null){
          setHouses(myHouses);
          setMyPoints(myHouses);
        }        
    }

    // show similar houses given an id
    const showSimilar = (id) => {
      const h = houses.find(ele=>ele._id === id);
      if (h) {
        // console.log(h.similar);
        const similarPoints = h.similar.map(clusterConvert);
        setPoints(similarPoints);
        setMyPoints([h]);
        // move to center
      }
    }

    // ============= Admin Functions ========

    const getEvalHouses = async () => {
        console.log("open admin mode...");
        const evalHouses = await axiosAdminGetValuate();
        if (evalHouses !== null) {
            const evalAuth = evalHouses.map(house => (
                { ...house,
                    auth: true,
                }));
            setHouses(evalAuth);
            setMyPoints(evalAuth);
            // console.log("evalAuth",evalAuth);
        }        
    }

    const switchToAdmin = () => {
        setAdminMode(true);
        getEvalHouses();
    }

    const switchToUser = () => {
        setAdminMode(false);
        getMyHouses();
    }

    // check not valuated houses
    const viewUnValuate = () => {
        setMyPoints(houses.filter(e=>!e.processed));
    }

    const viewValuate = () => {
        setMyPoints(houses.filter(e=>e.processed));
    }

    // set manual price
    const setManualPrice = async ({_id, manualPrice}) => {
        const reply = await axiosSetManualPrice({_id, manualPrice});
        console.log(reply);
        if (reply) {
            console.log("get my houses again...")
            const newhouses = houses.map((house) => (
                (house._id !== _id)? house : {...house,processed:true,manualPrice}
            ));
            setHouses(newhouses);
            setMyPoints(newhouses);
        }
    }

    // ============ getHouses =============
    const getHouses = async () => {
        console.log("getting houses...")
        const req_houses = await axiosGetHouses(criteria);
        if (req_houses !== null){
          const houses_cluster = req_houses.map(clusterConvert);
          setPoints(houses_cluster)
        }
    }

    const searchhouses = (id) => {
        console.log("search",id)
        const house = houses.filter(ele=>ele._id.includes(id));
        setMyPoints(house);
    }
    // =============== Score ==================
    const onViewScoreRule = async() => {
        const rule = await axiosGetScoreRule();
        console.log("rule",rule);
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

    useEffect( ()=> {
        console.log("cur", mapRef.current)
    },[mapRef])
    

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
                isAdminMode={isAdminMode}
                onLogout={onLogout}
                houses={houses}
                onHome={onHome}
                onMyHouseMode={setMyHouseOnly}
                showSimilar={showSimilar}
                collapsed={collapsed}
                onTodoMode={viewUnValuate}
                onCheckMode={viewValuate}
                onScore={onViewScoreRule}
                onAdminMode={switchToAdmin}
                onUserMode={switchToUser}
                
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
                      onSearch={searchhouses}
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
                overflow: 'hidden'
                }}
            >
                <Map 
                    // id={id} 
                    // isAuth={isAuth}
                    ref={mapRef}
                    points={points}
                    houses={myPoints}
                    setManualPrice={setManualPrice}
                    getMyHouses={getMyHouses}
                />
            </Content>       
        </Layout>
    </Layout>
    );
}                

export default UserInterface

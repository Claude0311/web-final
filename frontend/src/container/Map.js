import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, Current_Pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { axiosGetHouses, axiosGetDetail } from '../axios/axios';
import Fill_in from './Fill_in';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({criteria}) => {
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [houses, setHouses] = useState([]);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);
    const [clickMap, setClickMap] = useState(false);
    const [hoverKey, setHoverKey] = useState(null);
    const [clickKey, setClickKey] = useState(null);

    // get houses
    const getHouses = async () => {
      console.log("getting houses...")
      try {
        const req_houses = await axiosGetHouses(criteria);
        setHouses(req_houses);
      } catch (e) {
        console.log(e);
      }
      
    }

    const onMarkHover = (key) => {
      setHoverKey(key);
      // console.log(key);
    }


    const onMarkLeave = (key) => {
      // console.log("leave");
      setHoverKey(null);
    }
    const onMarkClick = (key, childprops) => {
      console.log(clickKey);
      const {lat, lng} = childprops;
      // if (Math.hypot(lat-cen.lat, lng-cen.lng) >= 0.6) {
      //   handleMove(key,{lat,lng});
      // } else {
      //   setClickKey(key);
      // }
      setClickKey(key);
        
    }

    const handleMove = async (key,{lat,lng}) => {
      await setClickKey(null);
      window.setTimeout(()=>{
        setClickKey(key);
      }, 800);     
      setCen({lat,lng});          
    }

    const getHouseDetail = async (id) => {
      // console.log(id);
      console.log("getting detail...",id);
      try {
        const detail = await axiosGetDetail(id);
        setDetail(detail);
      } catch (e) {
        console.log(e);
      } 
    } 
    
    //  UNUSED


    const closeDetail = () => {
      setDetail(null);
    }

    const showForm = async () => {
        //window.setTimeOut(()=>setClickMap(true),1000);
        setCen(ptrCoordinate);
        
    }
    
    // useEffect( () => {
    //   if (!houses.length) getHouses();
    // });

    useEffect( () => {
      getHouses();
    }, [criteria]);


    const houseMarkers = houses.map( h => {
      const {id, coordinate, ...props} = h;
        return (
        <House_Pin
          key={id}
          lat={coordinate.lat}
          lng={coordinate.lng}
          {...props}
          id = {id}
          hover={hoverKey === id}
          click={clickKey === id}
          getDetail={getHouseDetail}
        />
      );
      })

    return(
        <div 
          style={{ height: '84vh', maxWidth: '100%', flexDirection: 'row' }}
        >
          {clickMap? <Fill_in lat={ptrCoordinate.lat} lng={ptrCoordinate.lng} />: <></>}
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
            center={cen}
            defaultZoom={zoom}
            // onClick={(e)=>{
            //   setPtrCod({lat:e.lat, lng:e.lng})
            //   setClickMap(false)
            // }}
            onChildMouseEnter={onMarkHover}
            onChildMouseLeave={onMarkLeave}
            onChildClick={onMarkClick}
          >
            { houseMarkers }
            {(ptrCoordinate)?(
              <Current_Pin
                {...ptrCoordinate}
                showForm={showForm}
              />
            ):<></>}
          </GoogleMapReact>
          {(houseDetail)?
            <House_Detail detail={houseDetail} onClose={closeDetail}/>
            : <></>
          }  
        </div>
    )
}

export default Map
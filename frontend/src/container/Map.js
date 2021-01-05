import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, Current_Pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { axiosGetHouses, axiosGetDetail } from '../axios/axios';
import Fill_in from './Fill_in';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({id, isAuth}) => {
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [houses, setHouses] = useState([]);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);
    const [clickMap, setClickMap] = useState(false)

    const getHouses = async () => {
      console.log("getting houses...")
      try {
        const req_houses = await axiosGetHouses();
        setHouses(req_houses);
      } catch (e) {
        console.log(e);
      }
      
    }

    const getHouseDetail = async (id) => {
      // console.log(id);
      console.log("getting detail...");
      try {
        const detail = await axiosGetDetail(id);
        setDetail(detail);
      } catch (e) {
        console.log(e);
      }
      // console.log(detail);
      
    }
    //  UNUSED
    /*
    const moveCen = (lat,lng) => {
      const frameTrans  = 60;
      const delLat = (lat - cen.lat)/frameTrans;
      const delLng = (lng - cen.lng)/frameTrans;
      // let count = 0;
      let timeID = window.setInterval(() => {
        setCen({lat:cen.lat+delLat, lng:cen.lng+delLng});
        console.log("moving cen...")
      }, 50);
      window.setTimeout(()=> {
        window.clearInterval(timeID);
      }, 3000)
    }*/

    const closeDetail = () => {
      setDetail(null);
    }
    
    useEffect( () => {
      if (!houses.length) getHouses();
    })
    return(
        <div style={{ height: '100vh', width: '100%', flexDirection: 'row' }}>
          {clickMap? <Fill_in lat={ptrCoordinate.lat} lng={ptrCoordinate.lng} />: <></>}
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
            center={cen}
            defaultZoom={zoom}
            onClick={(e)=>{
              setPtrCod({lat:e.lat, lng:e.lng})
              setClickMap(true)
            }}
          >
            {houses.map( h => (
              <House_Pin
                key={h.id}
                lat={h.coordinate.lat}
                lng={h.coordinate.lng}
                {...h}
                getDetail={async()=>{        
                  getHouseDetail(h.id);          
                }}
                move={()=>setCen(h.coordinate)}
              />
            ))}
            {(ptrCoordinate)?(
              <Current_Pin
                {...ptrCoordinate}
              />
            ):<></>}
          </GoogleMapReact>
          {(houseDetail)?
            <House_Detail detail={houseDetail} onClose={()=>closeDetail()} visible={true}/>
            : <></>
          }  
        </div>
    )
}

export default Map
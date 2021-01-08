import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, Current_Pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { axiosGetHouses, axiosGetDetail } from '../axios/axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = (id) => {
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [houses, setHouses] = useState([]);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);

    const getHouses = async () => {
      console.log("getting houses...")
      const req_houses = await axiosGetHouses();
      // console.log(req_houses);
      setHouses(req_houses);
    }

    const getHouseDetail = async (id) => {
      // console.log(id);
      console.log("getting detail...");
      const detail = await axiosGetDetail(id);
      // console.log(detail);
      setDetail(detail);
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
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
          center={cen}
          defaultZoom={zoom}
          onClick={(e)=>{
            setPtrCod({lat:e.lat,lng:e.lng});
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
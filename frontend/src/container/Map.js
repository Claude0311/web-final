import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, House_Cluster,Current_Pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { sendHouseInformation, axiosGetHouses, axiosGetDetail } from '../axios/axios';
import useSupercluster from 'use-supercluster';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({criteria}) => {
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [bounds, setBounds] = useState(null);
    // const [houses, setHouses] = useState([]);
    const [points, setPoints] = useState([]);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);
    const [hoverKey, setHoverKey] = useState(null);
    const [clickKey, setClickKey] = useState(null);

    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom,
      options: { maxZoom: 20 }
    });


    // ====== get houses =======
    const getHouses = async () => {
      console.log("getting houses...")
      try {
        const req_houses = await axiosGetHouses(criteria);
        // setHouses(req_houses);
        const houses_cluster = req_houses.map(house => {
          const {coordinate,...rest} = house;
          return {
            type: "Feature",
            properties: {
              cluster: false,
              ...rest
            },
            geometry: {
              type: "Point",
              coordinates: [
                coordinate.lng,
                coordinate.lat
              ]
            }
          }
        })
        // console.log(houses_cluster);
        setPoints(houses_cluster)
      } catch (e) {
        console.log(e);
      }

    }

    const getHouseDetail = async (id) => {
      // console.log(id);
      setClickKey(null);
      console.log("getting detail...",id);
      try {
        const detail = await axiosGetDetail(id);
        setDetail({...detail});
      } catch (e) {
        console.log(e?.response?.data?.msg);
      } 
    } 

    // ============== handle hover and click =======

    const onMarkHover = (key,c) => {
      setHoverKey(key);
      // console.log(key);
      // console.log(c)
    }

    const onMarkLeave = () => {
      // console.log("leave");
      setHoverKey(null);
    }
    const onMarkClick = (key, childprops) => {
      // console.log(clickKey);
      // console.log(childprops);
      const {lat, lng} = childprops;
      //const ratio = Math.hypot(lat-cen.lat, lng-cen.lng)/Math.hypot(bounds[2]-bounds[0],bounds[3]-bounds[1]);
      const ratio = 1.6*Math.abs((lat-cen.lat)/(bounds[3]-bounds[1]))+Math.abs((lng-cen.lng)/(bounds[2]-bounds[0]));
      // console.log(ratio);
      if (
        ratio >= 0.5) {
        handleMove(key,{lat,lng});
      } else {
        setClickKey(key);
      }
      // setClickKey(key);
        
    }

    const handleMove = async (key,{lat,lng}) => {
      await setClickKey(null);
      window.setTimeout(()=>{
        setClickKey(key);
      }, 700);     
      setCen({lat,lng});          
    }

    const onSetMark = (point) => {
      if (clickKey) {
        setClickKey(null);
        return;
      } 
      if (ptrCoordinate) {
        setPtrCod(null);
        return;
      }
      const {lat, lng} = point;
      setPtrCod({lat, lng});
      
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

    const showForm = async () => {
      setClickKey(null);
        // show form ...

        
    }

    const moveCen = (lat, lng) => {
      setCen({lat, lng})
    }

    // ========== set Boundaries ========
    
    const onBoundChange = ({zoom, bounds}) => {
      // console.log("zoom",zoom);
      // console.log("bound",bounds);
      setZoom(zoom);
      setBounds([
        bounds.nw.lng,
        bounds.se.lat,
        bounds.se.lng,
        bounds.nw.lat
      ]);

    }

    // ========== useEffect =============
    // useEffect( () => {
    //   console.log(clickKey)
    // },[clickKey]);

    // useEffect( () => {
    //   console.log(points);
    //   console.log(clusters);
    // },[clusters]);
    useEffect( () => {
      getHouses();
    }, [criteria]);

    
    const clusterMarkers = clusters.map(cluster => {
      const [lng, lat] = cluster.geometry.coordinates;
      const {
        cluster: isCluster, point_count: pointCount, cluster_id, id, ...rest
      } = cluster.properties;
      if (isCluster) {
        // return cluster Marker
        return (
          <House_Cluster 
            id={cluster_id}
            key={cluster_id}
            lat={lat}
            lng={lng}
            size={pointCount}
            pointSize={points.length}
            hover={hoverKey === String(cluster_id)}
            />
        );
      } else {
        // return normal Marker
        return (
          <House_Pin
            key={id}
            lat={lat}
            lng={lng}
            {...rest}
            id = {id}
            hover={hoverKey === id}
            click={clickKey === id}
            getDetail={getHouseDetail}
          />
        );
      }

    })

    return(
        <div style={{ height: '100vh', width: '100%', flexDirection: 'row' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
            center={cen}
            defaultZoom={40}
            zoom={zoom}
            onClick={onSetMark}
            onChildMouseEnter={onMarkHover}
            onChildMouseLeave={onMarkLeave}
            onChildClick={onMarkClick}
            onChange={onBoundChange}
          >
            {/* { houseMarkers } */}
            {clusterMarkers}
            {(ptrCoordinate)?(
              <Current_Pin
                key="myPin"
                {...ptrCoordinate}
                showForm={showForm}
                hover={hoverKey==="myPin"}
                click={clickKey==="myPin"}
                lat={ptrCoordinate.lat} 
                lng={ptrCoordinate.lng}
                moveCen={moveCen}
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
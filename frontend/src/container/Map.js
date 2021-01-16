import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, House_Cluster,Current_Pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { axiosGetHouses, axiosGetDetail } from '../axios/axios';
import useSupercluster from 'use-supercluster';
import Fill_in from './Fill_in';
import buildingType from '../axios/buildingType';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({criteria}) => { //
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [bounds, setBounds] = useState(null);
    // const [houses, setHouses] = useState([]);
    // const [criteria, setCriteria] = useState(null);
    const [points, setPoints] = useState([]);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);
    const [clickMap, setClickMap] = useState(false);
    const [hoverKey, setHoverKey] = useState(null);
    const [clickKey, setClickKey] = useState(null);

    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom,
      options: { 
        radius: 75,
        maxZoom: 20,
        map: (props) => ({
          sum: props.unitPrice,
          // allinfo: [{
          //   id: props.id, 
          //   unitPrice: props.unitPrice, 
          //   buildingType: props.buildingType
          // }]
        }),
        reduce: (acc, props) => {
          acc.sum += props.sum
          // acc.allinfo.concat(props.allinfo)
          // sum: acc.sum + props.sum,
          // allinfo: acc.allinfo.concat(props.allinfo)
        }
       }
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
      // console.log(key);
      // console.log(childprops);
      const {lat, lng} = childprops;
      // compute elipse radius from center
      const dely = 2.6*(lat-cen.lat)/(bounds[3]-bounds[1]);
      const delx = 2.6*(lng-cen.lng)/(bounds[2]-bounds[0]);
      const ratio = Math.hypot(delx,dely);
      // console.log("ration from center", ratio);
      if (ratio >= 1) {
        handleMove(key,{lat,lng});
      } else {
        setClickKey(key);
      }        
    }

    const getClusterClick = (key) => { // key: Number
      // console.log(e);
      // console.log(supercluster.getLeaves(key))
      const zoomInratio = supercluster.getClusterExpansionZoom(key)
      if (zoomInratio >= 20 ) {
        // show all the info
        const leaves = supercluster.getLeaves(key);
        const leaveInfo = leaves.map( leaf => ({
          id: leaf.properties.id,
          buildingType: leaf.properties.buildingType,
          unitPrice: leaf.properties.unitPrice
        }));
        return leaveInfo;
      }
      return null;
      
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
      setClickMap(false)
      
    }

    const closeDetail = () => {
      setDetail(null);
    }

    const showForm = async () => {
      setClickKey(null);
      console.log(supercluster);
        // show form ...
        
    }
    // ========== search ==========

    // const searchNeighbor = () => {
    //   const center = cen;
    //   // const 
    // }

    // const search = (cri) => {
    //   const c = {...cri};
    //   console.log(c)
    //   setCriteria(c);
      
    // }

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

    // ========== render element ===========
    const clusterMarkers = clusters.map(cluster => {
      const [lng, lat] = cluster.geometry.coordinates;
      const {
        cluster: isCluster, point_count: pointCount, cluster_id, id, sum, ...rest
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
            sum={sum}
            click={clickKey === String(cluster_id)}
            pointSize={points.length}
            hover={hoverKey === String(cluster_id)}
            getLeaves={getClusterClick}
            getDetail={getHouseDetail}
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
        <div 
          style={{ height: '84vh', maxWidth: '100%', flexDirection: 'row' }}
        >
          {clickMap? <Fill_in lat={ptrCoordinate.lat} lng={ptrCoordinate.lng} />: <></>}
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
            center={cen}
            defaultZoom={14}
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
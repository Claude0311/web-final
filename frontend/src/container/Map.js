import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { House_Pin, House_Cluster,Current_Pin, House_Eval_Pin, Similar_House_Pin, New_House_pin } from '../component/House_Pin';
import House_Detail from '../component/House_detail';
import { axiosGetDetail } from '../axios/axios';
import useSupercluster from 'use-supercluster';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ points, houses, setManualPrice, apiKey, getMyHouses, ...rest }) => { //
    const [cen,setCen] = useState({lat: 25.007414, lng: 121.51505})// {lat: 25.017, lng: 121.537});
    const [zoom,setZoom] = useState(16.0);
    const [bounds, setBounds] = useState(null);
    const [ptrCoordinate, setPtrCod] = useState(null);
    const [houseDetail, setDetail] = useState(null);
    const [hoverKey, setHoverKey] = useState(null);
    const [clickKey, setClickKey] = useState(null);
    const [newHouse, setNewHouse] = useState(null)
    const [similarHouses, setSimilarHouses] = useState(null)

    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom,
      options: { 
        radius: 75,
        maxZoom: 20,
        map: (props) => ({
          sum: props.unitPrice,
        }),
        reduce: (acc, props) => {
          acc.sum += props.sum
        }
       }
    });

    // ====== get houses =======
    

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
      // console.log("click",key);
      const {lat, lng} = childprops;
      // compute elipse radius from center
      const dely = 2.8*(lat-cen.lat)/(bounds[3]-bounds[1]);
      const delx = 2.8*(lng-cen.lng)/(bounds[2]-bounds[0]);
      const ratio = Math.hypot(delx,dely);
      // console.log("ration from center", ratio);
      if (ratio >= 1) {
        handleMove(key,{lat,lng});
      } else {
        setClickKey(key);
      }        
    }

    const getClusterClick = (key) => { // key: Number
      setHoverKey(null);
      const zoomInratio = supercluster.getClusterExpansionZoom(key)
      console.log(zoomInratio)
      if (zoomInratio >= 20 ) {
        // show all the info
        const leaves = supercluster.getLeaves(key);
        const leaveInfo = leaves.map( leaf => ({
          id: leaf.properties.id,
          buildingType: leaf.properties.buildingType,
          unitPrice: leaf.properties.unitPrice
        }));
        return leaveInfo;
      } else {
        window.setTimeout(()=>{
          setZoom(zoomInratio);
        },500);
        const [leaf, ...rest] = supercluster.getChildren(key);
        const [lng, lat] = leaf.geometry.coordinates;
        setCen({lat,lng})
        return null;
      }

    }

    const handleMove = async (key,{lat,lng}) => {
      await setClickKey(null);
      window.setTimeout(()=>{
        setClickKey(key);
      }, 700);     
      setCen({lat,lng});          
    }

    const onSetMark = (point) => {
      if(similarHouses) {
        setSimilarHouses(null)
      }
      if (clickKey) {
        setClickKey(null);
        return;
      }
      if(newHouse) {
        if(newHouse.showInfor) {
          let tempHouse = newHouse
          tempHouse.showInfor = false
          setNewHouse(tempHouse)
          return
        }
      }
      if (ptrCoordinate) {
        setPtrCod(null);
        return;
      }
      if(newHouse) {
        setNewHouse(null)
        getMyHouses()
      }
      const {lat, lng} = point;
      setPtrCod({lat, lng});
      
    }

    const closeDetail = () => {
      setDetail(null);
    }

    const showForm = async () => {
      setClickKey(null);
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

    const moveCen = (lat, lng) => {
      setCen({lat, lng})
    }

    const showNewHouse = async(similar, avgPrice, buildingType, floor, age) => {
      await setNewHouse({
        lat: ptrCoordinate.lat,
        lng: ptrCoordinate.lng,
        avgPrice,
        buildingType,
        floor,
        age,
        showInfor: true
      })
      setPtrCod(null)
      setSimilarHouses(similar)
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
    
    // useEffect(()=>{
    //   console.log("map",apiKey)
    // },[apiKey]);

    

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

    // ============ render myhouses =======
    const houseMarkers = (houses)? houses.map( house => {
      const {coordinate,similar,_id, ...rest} = house;
      const showSim = () => {
        setSimilarHouses(similar)
      }
      // console.log("housemarker",house);
      return (
      <House_Eval_Pin
        key={_id}
        id={_id}
        lat={coordinate.lat}
        lng={coordinate.lng}
        hover={hoverKey === _id}
        click={clickKey === _id}
        setManualPrice={setManualPrice}
        showSim={showSim}
        {...rest}
      />
    )}
    ):<></>;
    
    // ============= similar houses ===========
    const similarMarkers = (similarHouses)? similarHouses.map( house => {
      const {coordinate, unitPrice, _id, ...rest} = house
      return (
        <Similar_House_Pin 
          key={_id}
          unitPrice={unitPrice}
          lat={coordinate.lat}
          lng={coordinate.lng}
          {...rest}
        />
      )
    }): <></>


    if (!apiKey.length) {
      return <></>
    }

    return(
        <div style={{ height: '86vh', width: '100%', flexDirection: 'row' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            center={cen}
            defaultZoom={12}
            zoom={zoom}
            onClick={onSetMark}
            onChildMouseEnter={onMarkHover}
            onChildMouseLeave={onMarkLeave}
            onChildClick={onMarkClick}
            onChange={onBoundChange}
            {...rest}
          >
            {clusterMarkers}
            {houseMarkers}
            {(ptrCoordinate)? (
              <Current_Pin
                key="myPin"
                {...ptrCoordinate}
                showForm={showForm}
                hover={hoverKey==="myPin"}
                click={clickKey==="myPin"}
                lat={ptrCoordinate.lat} 
                lng={ptrCoordinate.lng}
                moveCen={moveCen}
                showNewHouse={showNewHouse}
              />
            ): newHouse? (
              <New_House_pin 
                lat={newHouse.lat}
                lng={newHouse.lng}
                avgPrice={newHouse.avgPrice}
                buildingType={newHouse.buildingType}
                floor={newHouse.floor}
                age={newHouse.age}
                showInfor={newHouse.showInfor}
              />
            ): <></>}
            {similarMarkers}
          </GoogleMapReact>
          {(houseDetail)?
            <House_Detail detail={houseDetail} onClose={closeDetail}/>
            : <></>
          }  
        </div>
    )
}

export default Map
import react,{Component, useState} from 'react'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
    const [cen,setCen] = useState({lat: 25.017, lng: 121.537})
    const [zoom,setZoom] = useState(16.0)
    return(
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBqlTXRpx8ARKVOHZXDopkEYtsPs0WUHQ0' }}
          defaultCenter={cen}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={cen.lat}
            lng={cen.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    )
}

export default Map
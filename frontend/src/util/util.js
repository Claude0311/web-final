// some useful convert 

export const priceConvert = value => (
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)
export const dateConvert = date => (
    `${date}`.replace(/\B(?=(\d{2})(?!\d))/g, '/')
)

export const clusterConvert = house => {
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
};

export const compareHouses = (a,b) => {
  if ( a.unread || b.unread ) {
    return (a.unread)? -1: 1;
  } else {
    return (a.processed)? -1:1;
  }
}

export const neighborHouse = ({lat,lng},distance = 500 ) => {
  const offset = 0.00001 * distance;
  return house => (
    Math.abs(lat-house.coordinate.lat) <= offset && 
    Math.abs(lng-house.coordinate.lng) <= offset
  )
}

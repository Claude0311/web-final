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
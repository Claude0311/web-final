import {useState} from 'react'

const Fill_in = ({lat, lng}) => {
    const [types, setTypes] = useState([false, false, false])
    const chooseType = (event) => {
        let tempTypes = types
        tempTypes[parseInt(event.target.id)] ^= true
        setTypes(tempTypes)
    }
    return (
        <div  className="form">
            <header>Information About This House</header>

            <div className="position">
                <p>Latitude: {lat}</p>
                <p>Longtitude: {lng}</p>
            </div>

            <div className="buildingType">
                <p>Building Type</p>
                <ul>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="0"
                            onClick={chooseType}
                            checked={types[0]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="0">公寓</label> 
                    </li>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="1"
                            onClick={chooseType}
                            checked={types[1]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="1">電梯大樓</label>
                    </li>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="2"
                            onClick={chooseType}
                            checked={types[2]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="2">華夏</label>
                    </li>
                </ul>
            </div>

            <div className="floor">
                <p>floor</p>
                <input
                    // className="todo-app__input" 
                    placeholder="Which floor?" 
                    // onKeyUp={this.saveInputs}
                />
            </div>

            <div className="age">
                <p>House Age</p>
                <input
                    // className="todo-app__input" 
                    placeholder="How old?" 
                    // onKeyUp={this.saveInputs}
                />
            </div>
        </div>
    )
}

export default Fill_in
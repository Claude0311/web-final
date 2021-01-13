import {useState} from 'react'
import {Button} from 'antd'
import { sendHouseInformation } from '../axios/axios';

const Fill_in = ({lat, lng, handleClickSubmit}) => {
    const [isChosen, setIsChosen] = useState([false, false, false])
    const [type, setType] = useState(null)
    const [floor, setFloor] = useState(null)
    const [houseAge, setHouseAge] = useState(null)

    const chooseType = (event) => {
        const ID = parseInt(event.target.id)
        let tempIsChosen = isChosen
        tempIsChosen[ID] ^= true
        setIsChosen(tempIsChosen)
        setType(ID)
    }

    const inputFloor = (event) => {
        if(event.keyCode === 13 && event.target.value !== " ") {
            setFloor(event.target.value)
        }
    }

    const inputHouseAge = (event) => {
        if(event.keyCode === 13 && event.target.value !== " ") {
            setHouseAge(event.target.value)
        }
    }
    const clickSubmit = async() => {
        setIsChosen([false, false, false])
        await sendHouseInformation({ 
            position: {lat, lng},
            type,
            floor,
            houseAge
        })
        handleClickSubmit()
    }
    return (
        <div  className="form">
            <header id="title">Information About This House</header>

            <div className="position">
                <p>Latitude: {lat}</p>
                <p>Longtitude: {lng}</p>
            </div>

            <div className="buildingType">
                <p className="question">Building Type</p>
                <ul>
                    <li>
                        <input 
                            type="checkbox"
                            // name= {i}
                            id="0"
                            onClick={chooseType}
                            checked={isChosen[0]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="0">公寓</label> 
                    </li>
                    <li>
                        <input 
                            type="checkbox"
                            // name= {i}
                            id="1"
                            onClick={chooseType}
                            checked={isChosen[1]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="1">電梯大樓</label>
                    </li>
                    <li>
                        <input 
                            type="checkbox"
                            // name= {i}
                            id="2"
                            onClick={chooseType}
                            checked={isChosen[2]}
                            onChange={()=>{}}
                        />
                        <label htmlFor="2">華夏</label>
                    </li>
                </ul>
            </div>

            <div className="floor">
                <p className="question">floor</p>
                <input
                    // className="todo-app__input" 
                    placeholder="Which floor?" 
                    onKeyUp={inputFloor}
                />
            </div>

            <div className="age">
                <p className="question">House Age</p>
                <input
                    // className="todo-app__input" 
                    placeholder="How old?" 
                    onKeyUp={inputHouseAge}
                />
            </div>
            
            <Button type="primary" danger onClick={clickSubmit}>
                Submit
            </Button> 
        </div>
    )
}

export default Fill_in
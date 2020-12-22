import react,{Component, useState} from 'react'

const Fill_in = () => {
    return (
        <div >
            <header>Information About This House</header>

            <div className="position">
                <p>Latitude: </p>
                <p>Longtitude: </p>
            </div>

            <div className="buildingType">
                <p>Building Type</p>
                <ul>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="1"
                            // onClick={choose}
                        />
                        <span>公寓</span>
                    </li>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="2"
                            // onClick={choose}
                        />
                        <span>電梯大樓</span>
                    </li>
                    <li>
                        <input 
                            type="radio"
                            // name= {i}
                            id="3"
                            // onClick={choose}
                        />
                        <span>華夏</span>
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
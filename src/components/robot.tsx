import React, {useContext} from "react";
import styles from './Robot.module.css'
import {appContext, appSetStateContext} from "../AppState";


interface RobotProps {
    id: number;
    name: string;
    email: string;
}


const Robot: React.FC<RobotProps> = ({id, name, email}) => {
    const value = useContext(appContext)
    const setState = useContext(appSetStateContext)
    const addToCart=()=>{
        if (setState){
            setState(state=>{
                return{
                    ...state,
                    shoppingCart:{
                        items:[...state.shoppingCart.items,{name,id}]
                    }
                }

            })

        }

    }
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`}/>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者名稱：{value.username}</p>
            <button onClick={addToCart}>加入購物車</button>
        </div>
    );
}

export default Robot;
import React, {useEffect} from 'react';
import logo from './assets/images/logo.svg';
import {useState} from "react";
import styles from './App.module.css';
import ShoppingCart from "./components/ShoppingCart";
import Robot from "./components/robot";

interface Props {
}

interface State {
    robotGallery: any
    count: number
}


const App: React.FC = (props) => {
    const [count, setCount] = useState<number>(0)
    const [robotGallery, setRobotGallery] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>()

    useEffect(() => {
        document.title = `点击${count}次`
    }, [count])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const responses = await fetch("https://jsonplaceholder.typicode.com/users")
                // .then(response => response.json())
                // .then(data => setRobotGallery(data))
                const data = await responses.json()
                setRobotGallery(data)

            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message)
                }

            }
            setLoading(false)
        }
        fetchData()


    }, [])

    return (
        <div className={styles.app}>
            <div className={styles.appHeader}>
                <img src={logo} alt="logo" className={styles.appLogo}/>
                <h1>南无阿弥陀佛 南无观世音菩萨 南无地藏王菩萨 南无文殊师利菩萨</h1>
            </div>
            <button onClick={() => {
                setCount(count + 1)

            }}

            >Click
            </button>
            <span>count: {count}</span>
            <ShoppingCart></ShoppingCart>
            {
                (!error || error!==""&& <div>网站出错:{error}</div>)
            }
            {!loading ? (
                <div className={styles.robotList}>
                    {robotGallery.map(r => <Robot id={r.id} name={r.name} email={r.email}/>)}
                </div>) : (

                <h2> loading 加载中 </h2>
            )
            }
        </div>
    );

}

export default App;

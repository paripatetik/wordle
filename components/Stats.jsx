import { AppContext } from "../App";
import { useContext } from "react";

export default function Stats() {
 const {stats, statsActive, setStatsActive} = useContext(AppContext);

 let percentage = Math.round(stats.wins/stats.games*100);

 if(isNaN(percentage)) percentage = 0;
  return (
    <div className={statsActive ? "modal active": "modal" }>
        <div className={statsActive ? "modal__body active": "modal__body" }>
            <div className="modal__top">
                <h2 className="modal__title">Statistics</h2>
                <button onClick={()=>setStatsActive(false)}>X</button>
            </div>
            <div className="modal__stats">
                <p>Total games: <span>{stats.games}</span></p>
                <p>Guessed words: <span>{stats.wins}</span> </p>
                <p>Percentage of wins: <span>{percentage}%</span></p>
            </div>
        </div>
    </div>
  )
}
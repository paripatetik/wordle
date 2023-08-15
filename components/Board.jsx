import { useContext } from "react";
import Letter from "./Letter";
import { AppContext } from "../App";

export default function Board() {
    const {board} = useContext(AppContext)
  
    return (
    <div className="board__container">
        <div className="board">
            <div className="row">
                {board[0].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={0}/>)}
            </div>
            <div className="row">
                {board[1].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={1}/>)}
            </div>
            <div className="row">
                {board[2].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={2}/>)}
            </div>
            <div className="row">
                {board[3].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={3}/>)}
            </div>
            <div className="row">
                {board[4].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={4}/>)}
            </div>
            <div className="row">
                {board[5].map((elem, i) => <Letter key={i} letterPos={i} attemptVal={5}/>)}
            </div>
        </div>
    </div>

  )
}
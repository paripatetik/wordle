import { AppContext } from "../App";
import { useContext } from "react";

export default function Modal() {
 const { gameOver, correctWord, restart} = useContext(AppContext);

 
  return (
    <div className={gameOver.gameOver ? "modal active": 'modal'}>
        <div className={gameOver.gameOver ? "modal__body active": 'modal__body'}>
            <div className="modal__top">
                <h2 className="modal__title">Wordle</h2>
            </div>
            {!gameOver.guessedWord ? 
                <div className="modal__text">
                    <h3>You lost</h3>
                    <p>The word was <span>{correctWord}</span></p>
                    <button disabled={!gameOver.gameOver} onClick={()=> restart()}>Try Again</button>
                </div>
                : <div className="modal__text">
                <h3>You won</h3>
                <button disabled={!gameOver.gameOver} onClick={()=> restart()}>Play Again</button>
            </div>
            }
        </div>
    </div>
  )
}
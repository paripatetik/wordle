import { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export default function Keyboard() {
    const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

    const {
        disabledLetters,
        currAttempt,
        gameOver,
        onSelectLetter,
        onEnter,
        onDelete,
      } = useContext(AppContext);

      const handleKeyboard = useCallback(
       
        (event) => {
          if (gameOver.gameOver) return;
          if (event.key === "Enter") {
            onEnter();
          } else if (event.key === "Backspace") {
            onDelete();
          } else {
            keys.forEach((key) => {
              if (event.key.toLowerCase() === key.toLowerCase()) {
                onSelectLetter(key);
              }
            });
          }
        },
        [currAttempt]
      );

      useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
    
        return () => {
          document.removeEventListener("keydown", handleKeyboard);
        };
      }, [handleKeyboard]);

  return (
     <div className="keyboard__container">
      <div className="keyboard">
          <div className="line1 line">
            {keys.map((key, i) => {
              return <Key key={i} keyVal={key} disabled={disabledLetters.includes(key)} />;
            })}
          </div>
          <div className="line2 line">
            <Key keyVal={"DELETE"} bigKey />
            <Key keyVal={"ENTER"} bigKey />
          </div>
      
      </div>
    </div>
  )
}
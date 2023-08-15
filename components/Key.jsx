import { useContext } from "react";
import { AppContext } from "../App";

export default function Key({ keyVal, bigKey, disabled }) {
    const { gameOver, onSelectLetter, onDelete, onEnter } =
      useContext(AppContext);
  
    const selectLetter = () => {
      if (gameOver.gameOver) return;
      if (keyVal === "ENTER") {
        onEnter();
      } else if (keyVal === "DELETE") {
        onDelete();
      } else {
        onSelectLetter(keyVal);
      }
    };
    return (
      <button
        className="key"
        id={bigKey ? "big" : disabled && "disabled"}
        onClick={selectLetter}
      >
        {keyVal}
      </button>
    );
  }
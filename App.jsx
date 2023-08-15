import { useEffect, useState } from 'react'
import { boardDefault, generateWord, checkWord } from './Words'
import { createContext } from 'react'
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Modal from './components/Modal';
import Stats from './components/Stats';

export const AppContext = createContext()
const getLocalStorage = () => {
  let stats = localStorage.getItem('stats');
  if (stats) {
    return (stats = JSON.parse(localStorage.getItem('stats')));
  } else {
    return {games: 0, wins: 0};
  }
};

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [stats, setStats] = useState(getLocalStorage());
  const [statsActive, setStatsActive] = useState(false);
  const [msg, setMsg] = useState(false);


  const restart = async ()=>{
    await generateWord().then((generated) => setCorrectWord(generated[0]));
    setGameOver({gameOver: false, guessedWord: false,});
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([])
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
  
  }
  useEffect(()=>{
    generateWord().then((generated) => setCorrectWord(generated[0]));
  },[])
  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);
  
  
  const onEnter = async() => {
    if (currAttempt.letter !== 5) return;
    let currWord = "";
    let valid = false;
    currWord = board[currAttempt.attempt].join('');
    await checkWord(currWord).then((checked) => valid=checked);

    if (valid) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
     const newBoard = [...board];
      newBoard[currAttempt.attempt] = ['', '', '', '', ''];
      setBoard(newBoard);
      setCurrAttempt({ attempt: currAttempt.attempt, letter: 0 });
      setMsg(true)
      const timer = setTimeout(() => {
        setMsg(false);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      setStats({games: ++stats.games, wins: ++stats.wins})
      return;
    }
  
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      setStats({...stats, games: ++stats.games})
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <>
        <header> 
          <div className="header__container">
            <h1 className='title'>Wordle</h1>
            <button onClick={()=>setStatsActive(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </button>
          </div>
        </header>
          {msg && <p className='msg'>There is no such word</p>}
        <AppContext.Provider  value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          onSelectLetter,
          onDelete,
          onEnter,
          restart,
          stats,
          statsActive, 
          setStatsActive
        }}>
          <div className="main">
              <Modal /> 
              <Board/>
              <Keyboard/>
              <Stats /> 
          </div>
        </AppContext.Provider>
    </>
  )
}

export default App

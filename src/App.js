import './App.css';
import { Reset } from 'styled-reset';
// import Board from './components/Board';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <Reset />
      <Game />
    </div>
  );
}

export default App;

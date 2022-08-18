import './App.css';
import { Reset } from 'styled-reset';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Reset />
      <Board />
    </div>
  );
}

export default App;

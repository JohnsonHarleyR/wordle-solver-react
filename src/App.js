import logo from './logo.svg';
import './App.css';
import SolverProvider from './components/wordle-solver/SolverContext';
import WordlesSolver from './components/wordle-solver/WordleSolver';

function App() {
  return (
    <SolverProvider>
    <WordlesSolver />
  </SolverProvider>
  );
}

export default App;

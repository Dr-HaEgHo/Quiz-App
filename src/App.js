import './App.css';
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/quiz-page' element={<QuizPage/>} />
    </Routes>
  );
}

export default App;

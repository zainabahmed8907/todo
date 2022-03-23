import { Routes, BrowserRouter, Route, Router } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import Todos from './components/Todos';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/todo' element={<Todos />} />

        <Route exact path='/' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

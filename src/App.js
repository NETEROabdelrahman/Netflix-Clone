import './index.scss';
import Home from './pages/Home';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Watch from './pages/Watch';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home  />} />
          <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          
            <Route path='/movies' element={<Home type='movie' />} />
            <Route path='/series' element={<Home type='series' />} />
            <Route path='/watch' element={<Watch />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import './App.css'
function App() {  
  return (
    <Routes>
      <Route path ="/login" element={<SignIn/>} />
      <Route path ="/" element={<SignUp/>} />
      <Route path ="/home" element={<Home/>} />
    </Routes>
  );
}

export default App

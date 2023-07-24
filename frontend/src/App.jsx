import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from './components/login/login'
import SignUp from './components/signup/signUp'
import ForgetPassword from './components/forgetpassword/forgetpassword'
import Welcome from './components/welcome/Welcome'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/forgetpassword" element={<ForgetPassword/>} />
        <Route exact path="/welcome" element={<Welcome/>} />
      </Routes>
    </Router>
)}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from './components/login/login'
import SignUp from './components/signup/signUp'
import ForgetPassword from './components/forgetpassword/forgetpassword'
import Welcome from './components/welcome/Welcome'
import NotFound from './components/notfound/notfound'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
)}

export default App

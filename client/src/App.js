import "../src/App.css"
import Home from "./Home";
import Profile from "./Profile"
import Evil from "./Evil"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/evil" element={<Evil/>} />
      </Routes>
    </Router>
  )

}

export default App;

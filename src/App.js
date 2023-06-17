import { Route,BrowserRouter as Router,Link,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from './context/noteState';
import Logup from "./components/Logup";
import Login from "./components/Login";

function App() {

  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
                <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/logup" element={<Logup/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
        <div>
          <Link to='/'></Link>
          <link to="/about"></link>
          <link to="/logup"></link>
          <link to="/login"></link>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

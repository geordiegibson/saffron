import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Trade from './pages/Trade';

function App() {

  return (
    <>
      <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/trade" element={<Trade />}/>
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App

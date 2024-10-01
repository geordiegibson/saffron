import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Trade from './pages/Trade';
import Direct from './pages/Direct';
import Wallet from './pages/Wallet';
import Chat from './pages/Chat';
import NotFound from './pages/Error';

function App() {

  return (
    <>
      <div className="App bg-black">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/trade" element={<Trade />}/>
                    <Route path="/direct" element={<Direct />}/>
                    <Route path="/wallet" element={<Wallet />}/>
                    <Route path="/chat" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App

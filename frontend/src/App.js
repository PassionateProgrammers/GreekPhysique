import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useState } from 'react'

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// components
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';

function App() {
  const { user } = useAuthContext();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Toolbar showSidebar={showSidebar} onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        {showSidebar && <div className="sidebar-overlay fixed top-0 left-0 h-full w-full" onClick={() => setShowSidebar(false)}></div>}
        <Sidebar showSidebar={showSidebar}/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

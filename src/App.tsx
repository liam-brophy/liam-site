import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Work from './pages/Work/Work'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Liam Brophy. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

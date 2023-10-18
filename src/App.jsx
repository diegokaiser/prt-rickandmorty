import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './components/Home'
import Characters from './components/Characters'
import Locations from './components/Locations'
import Episodes from './components/Episodes'
import logo from './assets/images/logo.webp'
import './App.scss'
import Character from './components/Character'
import Location from './components/Location'
import Episode from './components/Episode'

function App() {

  return (
    <>
      <header className='header'>
        <div className="header__content">
          <div className="logo">
            <Link to='/'>
              <img src={logo} alt="Rick and Morty!" />
            </Link>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <NavLink 
                  to='/characters'
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                Characters</NavLink>
              </li>
              <li>
                <NavLink 
                  to='/locations'
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                Locations</NavLink>
              </li>
              <li>
                <NavLink 
                  to='/episodes'
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                Episodes</NavLink>
              </li>
              
            </ul>
          </nav>
        </div>
      </header>
      <div className="main">
        <div className="main__content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/characters' element={<Characters />} />
            <Route path='/characters/:id' element={<Character />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/locations/:id' element={<Location />} />
            <Route path='/episodes' element={<Episodes />} />
            <Route path='/episodes/:id' element={<Episode />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App

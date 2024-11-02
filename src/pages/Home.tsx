import React from 'react'
import '../styles/Home.css'
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

function Home() {
  const { isDarkMode } = useTheme();
  return (
    <div className='home__container' data-theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      
    </div>
  )
}

export default Home
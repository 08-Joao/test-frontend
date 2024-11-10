import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext';

function ProfileRedirect() {
    const navigate = useNavigate()
    const { isDarkMode } = useTheme();

    useEffect(() => {
        navigate(`/profile/${localStorage.getItem("publicId")}`);
    }, [])

  return (
    <div className="home__loadingContainer" data-theme={isDarkMode ? 'dark' : 'light'}>
        <div className="spinner"></div>
    </div>
  )
}

export default ProfileRedirect
import React from 'react'
import LoginPage from '../pages/LoginPage'

function Header() {
  return (
    <div className="header"> Header 
        <ul>
            <li>
                <LoginPage/>
            </li>
        </ul>
    </div>
  )
}

export default Header
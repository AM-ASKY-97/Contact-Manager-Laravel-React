import React from 'react'

import Logo from './images/m-logo.png'

const header = () => {
    return (
        <nav className="navbar pt-2 shadow pb-2 bg-primary bg-gradient">
            <div className="container">
                <a className="navbar-brand">
                    <img src={Logo} alt="Logo" width="45" height="35"
                        className="d-inline-block align-text-top" />
                        <span className="text-light fw-bold font-monospace">E-education</span>
                </a>
            </div>
        </nav>
    )
}

export default header
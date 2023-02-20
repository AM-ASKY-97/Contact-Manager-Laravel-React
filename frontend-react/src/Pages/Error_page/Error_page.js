import React from 'react'
import { Link } from 'react-router-dom'
import Error_logo from './4670233.jpg'

import './style.css'

const Error_page = () => {
    return (
        <div className='w-75 m-auto'>
            <div className='row'>
                <div className='col-6'>
                    <h1 className='mb-5 text-danger'>Oops...</h1>

                    <h5 className='mb-5'>Please check the database connection</h5>
                    <div><Link className="btn btn-primary" onClick={() => window.location.reload(true)}>Try Again</Link></div>
                </div>

                <div className='col-6 text-center'>
                    <img src={Error_logo} className='imgLogo' />
                </div>
            </div>
        </div>
    )
}

export default Error_page
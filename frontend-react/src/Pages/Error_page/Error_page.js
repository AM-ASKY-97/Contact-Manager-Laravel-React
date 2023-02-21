import React from 'react'
import { Link } from 'react-router-dom'
import Err from './err-img.svg';

import './style.css'

const Error_page = () => {
    return (
        <div>
            <div className="card shadow p-1 bg-body-tertiary rounded">
                <div className='text-center'>
                    <img src={Err} className="card-img-top img-fluid err-img " alt="..." />
                </div>
                <div className="card-body">
                    <div className="card-body">
                        <h5 className="card-title">Something went wrong!</h5>
                        <p className="card-text">Please check the database connection.</p>

                        <Link className="btn btn-primary" onClick={() => window.location.reload(true)}>Try again</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error_page
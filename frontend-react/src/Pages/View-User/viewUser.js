import React from 'react'
import { Link } from 'react-router-dom'

import logo from './img-1.jpg'

const viewUser = () => {
    return (
        <div className='container py-3'>

            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">Simple address book with React js and Laravel</p>
                    </div>
                    <div className="col text-end"><Link To="" class="btn btn-success"><i class="fa fa-user" aria-hidden="true"></i> Add New Contact</Link></div>
                </div>
                <hr />
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <img src={logo} width="60px" height="60px" alt='user avatar' className='rounded' />
                        </th>
                        <td>Asky</td>
                        <td>Mohammed</td>
                        <td>0775311974</td>
                        <td>am.asky97@gmail.com</td>
                        <td colSpan={3}>
                            <Link To="" className="btn btn-primary btn-sm" style={{marginRight:'6px'}}><i class="fa fa-search-plus" aria-hidden="true"></i> View</Link>
                            <Link To="" className="btn btn-warning btn-sm" style={{marginRight:'6px'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Link>
                            <Link To="" className="btn btn-danger btn-sm"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default viewUser
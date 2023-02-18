import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const ViewUser = () => {

    const [getValue, setValue] = useState([]);
    const [loding, setLoding] = useState([true]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/index').then(res => {
            if (res.data.status === 200) {
                setValue(res.data.user);
                setLoding(false);
            }
        })
    }, []);

    var student_table = "";

    if (loding) {
        student_table =
            <tr className='text-center'>
                <td colSpan={7}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>;
    }

    else {
        student_table = getValue.map((item) => {
            return (
                <tr key={item.id}>
                    <td>
                        <img src={'http://localhost:8000/upload/students/'+item.Avatar} width="50px" alt='Avatar'/>
                    </td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.contact}</td>
                    <td>{item.email}</td>
                    <td colSpan={3}>
                        <Link to="" className="btn btn-primary btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-search-plus" aria-hidden="true"></i> View</Link>
                        <Link to="" className="btn btn-warning btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Link>
                        <Link to="" className="btn btn-danger btn-sm"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</Link>
                    </td>
                </tr>
            );
        })
    }
    return (
        <div className='container py-3'>
            <div className="container pt-1">
                <div className="row">
                    <div className="col-12 col-md-6 pt-2">
                        <p className="h5 fw-bold">Simple address book with React js and Laravel</p>
                    </div>
                    <div className="col-12 col-md-6 text-end"><Link to="/add-user" className="btn btn-success"><i className="fa fa-user" aria-hidden="true"></i> Add New Contact</Link></div>
                </div>
                <hr />
            </div>

            <div className='table-responsive'>
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
                        {student_table}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewUser
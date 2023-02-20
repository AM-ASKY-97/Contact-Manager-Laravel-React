import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './style.css'

const ViewOneUser = () => {

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        Avatar: "",
        address: ""
    })

    const [loding, setLoding] = useState([true]);

    const { id } = useParams()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/show/' + id).then(res => {
            if (res.data.status === 200) {
                console.log(res.data);
                setInputs({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    contact: res.data.user.contact,
                    email: res.data.user.email,
                    Avatar: res.data.user.Avatar,
                    address: res.data.user.address
                })
                setLoding(false);
            }
        })
    }, []);

    var student_table = "";

    if (loding) {
        student_table =
            <div className='text-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    }

    else {
        student_table =
            <div className='row'>
                <div className="col-xs-12 col-sm-8 col-md-6 mt-2">
                    <form action='' encType="multipart/form-data">
                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type="text" name="firstName" value={inputs.firstName} id="" className="form-control" disabled />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type="text" name="lastName" value={inputs.lastName} id="" className="form-control" disabled />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text" name="email" value={inputs.email} id="" className="form-control" disabled />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Phone Number </label>
                                <input type="text" name="contact" value={inputs.contact} id="" className="form-control" disabled />
                            </div>
                        </div>

                        <div className='row mb-b'>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Phone Number </label>
                                <input type="text" name="contact" value={inputs.contact} id="" className="form-control" disabled />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Address </label>
                                <input type="text" name="contact" value={inputs.address} id="" className="form-control" disabled />
                            </div>
                        </div>
                    </form>
                </div>


                <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
                    <img src={'http://localhost:8000/upload/students/' + inputs.Avatar} loading="lazy" alt="" className="img-fluid logo" />
                </div>

            </div>
    }

    return (
        <div className='container py-3'>

            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">User Details</p>
                    </div>
                    <div className="col text-end"><Link to="/" className="btn btn-success"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                </div>
                <hr />
            </div>

            {student_table}
        </div>
    )
}

export default ViewOneUser
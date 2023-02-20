import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

import Logo from './Forms-pana.svg'
import BASE_URL from '../../App'

const AddUser = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        address: "",
        error_list: [],
    })

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const [photo, setPhoto] = useState([]);

    const handleImage = (event) => {
        setPhoto({ Avatar: event.target.files[0] });
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('Avatar', photo.Avatar);
        formData.append('firstName', inputs.firstName);
        formData.append('lastName', inputs.lastName);
        formData.append('email', inputs.email);
        formData.append('contact', inputs.contact);
        formData.append('address', inputs.address)

        axios.post('http://127.0.0.1:8000/api/store', formData).then(res => {
            if (res.data.status == 200) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                setInputs({
                    firstName: "",
                    lastName: "",
                    contact: "",
                    email: "",
                });

                navigate('/');
            }

            else {
                setInputs({
                    ...inputs, error_list: res.data.validator_error 
                })
            }
        }).catch(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: "Unable to store new user. Please check the database connection"
            })
        })
    }

    return (
        <div className='container py-3'>

            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">Add User</p>
                    </div>
                    <div className="col text-end"><Link to="/" className="btn btn-success"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                </div>
                <hr />
            </div>

            <div className='row'>
                <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                    <form action='' onSubmit={handleFormsubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type="text" name="firstName" value={inputs.firstName} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger mb-3" id="fName">{inputs.error_list.firstName}</span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type="text" name="lastName" value={inputs.lastName} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger" id="lName">{inputs.error_list.lastName}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text" name="email" value={inputs.email} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger" id="email">{inputs.error_list.email}</span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Phone Number </label>
                                <input type="text" name="contact" value={inputs.contact} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger" id="phoneNumber">{inputs.error_list.contact}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Address</label>
                                <input type="text" name="address" value={inputs.address} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger" id="email">{inputs.error_list.address}</span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="formFileMultiple" className="form-label">Select your profile photo</label>
                                <input className="form-control" type="file" id="formFileMultiple" name="Avatar" onChange={handleImage} />
                                <span className="text-danger" id="phoneNumber">{inputs.error_list.Avatar}</span>
                            </div>
                        </div>

                        <button className='btn btn-success'><i className="fa fa-check-circle" aria-hidden="true"></i> Submit</button>

                    </form>
                </div>


                <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
                    <img src={Logo} alt="" className="img-fluid rounded" width="400px" />
                </div>

            </div>
        </div>
    )
}

export default AddUser
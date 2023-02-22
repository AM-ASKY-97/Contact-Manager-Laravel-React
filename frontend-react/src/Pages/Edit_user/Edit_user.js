import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import './style.css'
import { useNavigate } from "react-router-dom";

const Edit_user = () => {



    const navigate = useNavigate();

    const { id } = useParams();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        address: ""
    })

    const [btnBack, setBtnBack] = useState(true);

    const [inputError, setErrorInput] = useState({
        error_list: [],
    })

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const [photo, setPhoto] = useState({
        Avatar: "",
    })

    const handleImage = (event) => {
        setPhoto({ Avatar: event.target.files[0] });
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/edit/' + id).then(res => {
            console.log(res.data);
            if (res.data.status === 200) {
                setInputs({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email,
                    contact: res.data.user.contact,
                    address: res.data.user.address,
                });

                setPhoto({
                    Avatar: res.data.user.Avatar,
                });
            }

            else if (res.data.status === 404) {
                Swal.fire({
                    title: "Warning !",
                    icon: 'warning',
                    text: res.data.message,
                    button: "Ok!"
                });

                navigate('/');
            }
        });
    }, []);

    const handleFormsubmit = (event) => {
        event.preventDefault();

        document.getElementById('update').innerHTML = "Updating....";
        document.getElementById('update').disabled = true;
        let data = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            contact: inputs.contact,
            address: inputs.address,
            Avatar: photo.Avatar,
        }

        axios.put('http://127.0.0.1:8000/api/update/' + id, data).then(res => {
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                setBtnBack(false);
            }

            else {
                setErrorInput({
                    ...inputError, error_list: res.data.validator_error,
                })
            }
            document.getElementById('update').innerHTML = "Update user";
            document.getElementById('update').disabled = false;
        }).catch((e) => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: e
            })
        })
    }


    return (
        <div className='container py-3'>
            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">Edit User</p>
                    </div>
                    <div className="col text-end"><Link to="/" className="btn btn-success"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                </div>
                <hr />
            </div>

            <form action='' onSubmit={handleFormsubmit} encType="multipart/form-data" autoComplete="off">
                <div className='row'>
                    <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input type="text" name="firstName" value={inputs.firstName} id="" className="form-control" onChange={handleChange} />
                                <span className="text-danger mb-3" id="fName">{inputError.error_list.firstName}</span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input type="text" name="lastName" id="" value={inputs.lastName} className="form-control" onChange={handleChange} />
                                <span className="text-danger mb-3" id="fName">{inputError.error_list.lastName}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Email</label>
                                <input type="text" name="email" id="" value={inputs.email} className="form-control" onChange={handleChange} disabled />
                                <span className="text-danger mb-3" id="fName">{inputError.error_list.email}</span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label htmlFor="" className="form-label">Phone Number </label>
                                <input type="text" name="contact" id="" value={inputs.contact} className="form-control" onChange={handleChange} />
                                <span className="text-danger mb-3" id="fName">{inputError.error_list.contact}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className="col">
                                <label htmlFor="" className="form-label">Address </label>
                                <input type="text" name="address" id="" value={inputs.address} className="form-control" onChange={handleChange} />
                                <span className="text-danger mb-3" id="fName">{inputError.error_list.address}</span>
                            </div>
                        </div>

                        {btnBack
                            ? (<button className='btn btn-success' id='update'><i className="fa fa-check-circle" aria-hidden="true"></i> Update user</button>)
                            : (<div id='back'><Link to="/" className="btn btn-primary"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</Link></div>)
                        }
                    </div>


                    <div className="col-sm-12 col-md-6 p-3 d-none d-md-block text-center">



                        <div className="dropdown">
                            <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={'http://localhost:8000/upload/students/' + photo.Avatar} loading="lazy" alt="" className="img-fluid logo" />
                            </a>
                            <ul className="dropdown-menu">
                                <input className="form-control" type="file" id="formFileMultiple" name="Avatar" onChange={handleImage} />
                            </ul>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit_user
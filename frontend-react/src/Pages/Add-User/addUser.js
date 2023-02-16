import React from 'react'
import { Link } from 'react-router-dom'

const addUser = () => {
    return (
        <div className='container py-3'>

            <div className="container pt-1">
                <div className="row">
                    <div className="col pt-2">
                        <p className="h5 fw-bold">Add User</p>
                    </div>
                    <div className="col text-end"><Link to="/" className="btn btn-success"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Back</Link></div>
                </div>
                <hr />
            </div>

            <div className='row'>
                <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                    <form>
                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label for="" className="form-label">First Name</label>
                                <input type="text" name="fName" id="" className="form-control" />
                                <span className="text-danger mb-3" id="fName"></span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label for="" className="form-label">Last Name</label>
                                <input type="text" name="lName" id="" className="form-control" />
                                <span className="text-danger" id="lName"></span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label for="" className="form-label">Email</label>
                                <input type="email" name="email" id="" className="form-control" />
                                <span className="text-danger" id="email"></span>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6">
                                <label for="" className="form-label">Phone Number </label>
                                <input type="text" name="phoneNumber" id="" className="form-control" />
                                <span className="text-danger" id="phoneNumber"></span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label for="formFileMultiple" className="form-label">Select your profile photo</label>
                            <input className="form-control" type="file" id="formFileMultiple" />
                        </div>

                        <input type="submit" value="submit" className="btn btn-success" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default addUser
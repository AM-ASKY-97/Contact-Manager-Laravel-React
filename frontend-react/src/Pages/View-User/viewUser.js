import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import Error_page from '../Error_page/Error_page'

const ViewUser = () => {

    const [getValue, setValue] = useState([]);
    const [loding, setLoding] = useState([true]);
    const [error_loding, seterrorLoding] = useState([true]);
    const [query, setQuery] = useState([]);
    const [filterdata, setFilterData] = useState([]);

    

    const handleSearch = (event) => {
        const getUserData = event.target.value;
        console.log(getUserData);
        setQuery(getUserData);

        if (getUserData.length > 0) {
            //const getUserData = event.target.value.toLowerCase();
            //const searchData = getValue.filter(item => item.firstName.toLowerCase().includes(getUserData));
            axios.get('http://127.0.0.1:8000/api/search/' + getUserData).then(res => {
                if (res.data.user.length > 0) {
                    setValue(res.data.user);
                    document.getElementById('btn').hidden = false;
                    document.getElementById('img').hidden = false;
                    document.getElementById("fName").style.color = "";
                }

                else {
                    setValue([{ "firstName": "No data Record",}])
                    document.getElementById('btn').hidden = true;
                    document.getElementById('img').hidden = true;
                    document.getElementById("fName").style.color = "red";
                }
            })
        }

        else {
            setValue(filterdata);
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/index').then(res => {
            if (res.data.status === 200) {
                setValue(res.data.user);
                setFilterData(res.data.user);
                setLoding(false);
                seterrorLoding(false);
            }
        }).catch(() => {
            setLoding(false)
        })
    }, []);

    var student_table = "";
    var err_loding = "";

    if (error_loding) {
        if (!loding) {
            err_loding = <Error_page />
        }
    }

    const deleteStudent = (e, id) => {
        const clickBtn = e.currentTarget;
        clickBtn.innerText = "Deleting";

        axios.delete('http://127.0.0.1:8000/api/destroy/' + id).then(res => {
            clickBtn.closest("tr").remove();
            if (res.data.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }


    return (
        <div className='container py-3'>
            <div className="container pt-1">
                <div className="row">
                    <div className="col-12 col-md-3 pb-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" value={query} placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)} />
                        </form>
                    </div>
                    <div className="col-12 col-md-9 text-end"><Link to="/add-user" className="btn btn-success"><i className="fa fa-user" aria-hidden="true"></i> Add New Contact</Link></div>
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
                        {loding
                            ? <tr className='text-center'>
                                <td colSpan={7}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            : getValue.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td id='img'>
                                            <img src={'http://localhost:8000/upload/students/' + item.Avatar} width="50px" alt='Avatar' />
                                        </td>
                                        <td id='fName'>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.email}</td>
                                        <td colSpan={3} className="" id='btn'>
                                            <Link to={"ViewOneUser/" + item.id} className="btn btn-primary btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-search-plus" aria-hidden="true"></i> View</Link>
                                            <Link to={"edit_user/" + item.id} className="btn btn-warning btn-sm" style={{ marginRight: '6px' }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Link>
                                            <Link onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</Link>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            {err_loding}
        </div>
    )
}

export default ViewUser
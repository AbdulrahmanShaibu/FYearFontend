import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import { Paper } from '@material-ui/core';


const Welcome = () => {
    const countAPI = 'http://localhost:8080/api/v1/count/department';
    const countCleaners = 'http://localhost:8080/api/v1/count/cleaners';
    const countClaims = 'http://localhost:8080/api/v1/count/claims';
    const countStaffs = 'http://localhost:8080/api/v1/staffs/count';
    const countTools = 'http://localhost:8080/api/v1/count/tools';
    const countSupervisors = 'http://localhost:8080/api/v1/count/supervisors';
    const countTasks = 'http://localhost:8080/api/v1/count/tasks';

    const [count, setCount] = useState(0);
    const [cleanersCount, setCleanersCount] = useState(0);
    const [claimsCount, setClaimsCount] = useState(0);
    const [staffsCount, setStaffsCount] = useState(0);
    const [toolsCount, setToolsCount] = useState(0);
    const [supervisorsCount, setSupervisorsCount] = useState(0);
    const [tasksCount, setTasksCount] = useState(0);

    useEffect(() => {
        axios.get(countAPI).then(response => setCount(response.data)).catch(console.error);
        axios.get(countCleaners).then(response => setCleanersCount(response.data)).catch(console.error);
        axios.get(countClaims).then(response => setClaimsCount(response.data)).catch(console.error);
        axios.get(countStaffs).then(response => setStaffsCount(response.data)).catch(console.error);
        axios.get(countTools).then(response => setToolsCount(response.data)).catch(console.error);
        axios.get(countSupervisors).then(response => setSupervisorsCount(response.data)).catch(console.error);
        axios.get(countTasks).then(response => setTasksCount(response.data)).catch(console.error);
    }, []);

    return (

        <div className="container-fluid mt-5">
            <div className="container-fluid mt-5">
                <Home className="container-fluid mt-5" />
                <div className="row justify-content-center" style={{ marginTop: '150px' }}>
                    <div className="col-md-8">
                        <div className="card mb-4" style={{ marginLeft: '20px' }}>
                            <div className="card-body">
                                <h5 className="card-title">Overview</h5>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="card bg-light shadow-sm">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Cleaners</h6>
                                                <p className="card-text">{cleanersCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-light shadow-sm">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Departments</h6>
                                                <p className="card-text">{count}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-light shadow-sm">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Total Claims</h6>
                                                <p className="card-text">{claimsCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card bg-light shadow-sm">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">Total Staffs</h6>
                                                <p className="card-text">{staffsCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Details List</h5>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Available Cleaners</th>
                                                <th scope="col">Registered Departments</th>
                                                <th scope="col">Submitted Claims</th>
                                                <th scope="col">Assigned Tasks</th>
                                                <th scope="col">All Tools</th>
                                                <th scope="col">Available Supervisors</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{cleanersCount}</td>
                                                <td>{count}</td>
                                                <td>{claimsCount} (reported)</td>
                                                <td>{tasksCount}</td>
                                                <td>{toolsCount}</td>
                                                <td>{supervisorsCount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center mt-4">
                                    <Link to="/generated_report" className="btn btn-primary btn-lg" style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}>Generate Report</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;

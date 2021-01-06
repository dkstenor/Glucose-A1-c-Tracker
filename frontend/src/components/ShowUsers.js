import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import PageHeader from './PageHeader';
import axios from 'axios';

function ShowUsers() {
    
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get('/getusers')
        .then(({data: users}) => {
            setUsers(users);
        });
    }, []);

    return (
        <React.Fragment>
            <PageHeader value="Registered Users" />
            <Table responsive striped size='sm' bordered> 
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                    <tr>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                    </tr>
                    )
                }
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export default ShowUsers;
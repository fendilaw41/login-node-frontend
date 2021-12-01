import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory()

    useEffect(() => {

      refreshToken();
      getUsers();

    }, []);

    const refreshToken = async() => {
        try {
            const res = await axios.get('http://localhost:5000/token');
            setToken(res.data.token);
            const decoded = jwt_decode(res.data.token);
            // console.log(decoded);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.res){
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config)=> {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const res = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${res.data.token}`;
            setToken(res.data.token);
            const decoded = jwt_decode(res.data.token);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async() => {
        const res = await axiosJWT.get("http://localhost:5000/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUsers(res.data.data);
    }

    return (
        <div className="container mt-5">
            <h1>Welcome Back, {name}</h1>
            <button className="button is-info" onClick={getUsers}>Get Users</button>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((v, i) => (
                        <tr key={v.id}>
                            <td>{i+1}</td>
                            <td>{v.name}</td>
                            <td>{v.email}</td>
                        </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default Dashboard

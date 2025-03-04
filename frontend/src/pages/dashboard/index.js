import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [user_email, setUser_email] = useState('');
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id])

    useEffect(() => {

        socket.on('booking_request', data => {
            console.log(data);
            setRequests([...requests, data]);

        })

    }, [requests, socket])

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const email = localStorage.getItem('email');

            const response = await api.get('/dashboard', {
                headers: { user_id, email },

            });
            setSpots(response.data);
            setUser_email(email);
        }

        loadSpots();
    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(req => req._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(req => req._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <div className="user-container">
                <strong>E-mail Logado</strong>
                <span>{user_email}</span>
            </div>

            <Link to="/new">
                <button className="btn">cadastrar novo spot</button>
            </Link>

        </>
    )

}
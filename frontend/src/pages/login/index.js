import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();


        const response = await api.post('/sessions', { email });
        const { _id } = response.data;

        localStorage.setItem('user', _id);
        localStorage.setItem('email', email);
        

        history.push('/dashboard');
    }
    return (
        <>
            <div className="content">
                <p>
                    Ofereça <strong> espaços </strong> para programadores fazerem bootcamp e encontre
                    <strong> talentos </strong> para sua empresa
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail *</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="seu melhor email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    ></input>

                    <button className="btn" type="submit">Entrar</button>
                </form>

            </div>
        </>
    )


}
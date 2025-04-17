import React from 'react'
import Login from '../components/Login'
import RegisterUser from '../components/RegisterUser'

export default function Home() {
    return (
        <div className='main-container'>

            <div className='container'>
                <div className='login-container'>
                    <Login />
                </div>

                <div className='register-container'>
                    <RegisterUser />
                </div>
            </div>
        </div>
    )
}

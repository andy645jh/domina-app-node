import React, { ChangeEvent, useState } from 'react'
import { UserMdl } from '../models/UserMdl';
import { ResponseMdl } from '../models/ResponseMdl';
import UserService from '../services/UserService';

export default function RegisterUser() {

    const defaultUser = { name: "", lastname: "", email: "", password: "" };

    const [user, setUser] = useState<UserMdl>(defaultUser);
    const [error, setError] = useState('');

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [evt.target.name]: evt.target.value });
    };

    const onClickRegister = async () => {
        console.log("onClickRegister");
        let res: ResponseMdl;

        res = await UserService.createUser(user);

        if (res.status === 'success') {
            setUser(defaultUser);
        } else {
            setError(res.message);
        }
    };

    return (
        <div className='register-main'>
            <div className='title'>
                <span>Register</span>
            </div>
            <div className=''>
                <div><input type='text' name='name' placeholder='First Name' value={user.name} onChange={onChange} /></div>
                <div><input type='text' name='lastname' placeholder='Last Name' value={user.lastname} onChange={onChange} /></div>
                <div><input type='text' name='email' placeholder='Email' value={user.email} onChange={onChange} /></div>
                <div><input type='password' name='password' placeholder='Password' value={user.password} onChange={onChange} /></div>

                <div>
                    <button type='button' onClick={onClickRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}

import { ChangeEvent, useEffect, useState } from 'react'
import { LoginMdl } from '../models/LoginMdl';
import { useNavigate } from 'react-router-dom';
import { getId, setId } from '../utils/Store';
import LoginService from '../services/UserService';
import '../App.css';

export default function Login() {

    const [credential, setCredential] = useState<LoginMdl>({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setCredential({ ...credential, [evt.target.name]: evt.target.value });
    };

    async function onClickLogin() {
        const result = await LoginService.makeLogin(credential);
        if (result.status === 'failed') {
            setError(result.message);
        } else {
            setId(result.data.id_user);
            navigate('/task');
        }
    }

    useEffect(() => {
        if (getId() > 0) {
            navigate('/task');
        }
    }, [navigate]);

    return (
        <div className='login-main'>
            <div className='title'>
                <span>Login</span>
            </div>

            <div className='control'>
                <input type='text' name='username' placeholder='Username' value={credential.username} onChange={onChange} />
            </div>
            <div>
                <input type='password' name='password' placeholder='Password' value={credential.password} onChange={onChange} />
            </div>
            <span>{error}</span>
            <div>
                <button onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}

import { useState, useEffect, useRef } from 'react';
import { sha256 } from 'js-sha256';
import axios from "axios";

const LoginForm = () => {

    const [inputs, setInputs] = useState({
        userId: ''
        , password: ''
    })

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInputs({ ...inputs, [name]: value })
    }

    const login = () => {

        const encryptPassword = sha256(inputs.password);

        axios.post('http://localhost:8080/login', {
            userId: inputs.userId
            , password: encryptPassword
        }).then((response) => {


        }).catch((error) => {
            console.error(error);
        })

    }

    return (
        <>
            <div>
                <h1>로그인</h1>
                <div>
                    <input type="text" id="userId" name="userName" placeholder="아이디" onChange={handleChange} />
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="비밀번호" onChange={handleChange} />
                </div>
                <button onClick={login}>로그인</button>
            </div>
        </>
    )
}

export default LoginForm;
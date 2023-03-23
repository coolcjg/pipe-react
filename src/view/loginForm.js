import { useState, useEffect, useRef } from 'react';
import { sha256 } from 'js-sha256';
import axios from "axios";
import { setCookie } from '../common/cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

    const [inputs, setInputs] = useState({
        userId: ''
        , password: ''
    })

    const navigate = useNavigate();

    const login = () => {

        const encryptPassword = sha256(inputs.password);

        console.log("inputs");
        console.log(inputs);

        axios.post('http://localhost:8080/login', {
            userId: inputs.userId
            , password: encryptPassword
        }).then((response) => {

            console.log(response);

            if (response.data.code === 200 && response.data.jwt) {

                /*
                setCookie("token", `${response.data.jwt}`, {
                    path: "/",
                    sameSite: "strict",
                });
                */

                setUser(response.data.user.userId, response.data.jwt);
                navigate('/list');
            } else if (response.data.code === 401) {
                alert('해당되는 ID가 없습니다.');
            } else if (response.data.code === 402) {
                alert('비밀번호가 맞지 않습니다.');
            } else {
                alert('알 수 없는 오류입니다.');
            }

        }).catch((error) => {
            console.error(error);
        })

    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    }

    const dispatch = useDispatch();

    const { value } = useSelector(state => state.value);
    const { count } = useSelector(state => state.count);
    const { userId } = useSelector(state => state.user);

    const addValue = () => {
        dispatch({ type: 'increment' })
    }

    const subValue = () => {
        dispatch({ type: 'decrement' })
    }

    const resetValue = () => {
        dispatch({ type: 'reset' })
    }

    const pushButton = () => {
        dispatch({ type: 'push' })
    }

    const setUser = (userId, jwt) => {
        dispatch({ type: 'login', userId: userId, jwt: jwt })
    }

    function handleChange(e) {

        console.log("Aa");

        const name = e.target.name;
        const value = e.target.value;

        setInputs({ ...inputs, [name]: value })
    }

    return (
        <>
            <div>
                <h1>로그인</h1>
                <div>
                    <input type="text" id="userId" name="userId" placeholder="아이디" onChange={handleChange} />
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="비밀번호" onChange={handleChange} onKeyUp={handleOnKeyPress} />
                </div>
                <button onClick={login}>로그인</button>
            </div>

            <div> userId:{userId}</div>
            <div> value:{value}</div>
            <button onClick={addValue}>+</button>
            <button onClick={subValue}>-</button>
            <button onClick={resetValue}>reset</button>

            <div>count:{count}</div>
            <button onClick={pushButton}>push</button>
        </>
    )
}

export default LoginForm;
import { useState, useEffect, useRef } from 'react';
import { sha256 } from 'js-sha256';
import axios from "axios";
import { setCookie } from '../common/cookie';
import { useSelector, useDispatch } from 'react-redux';


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

        console.log("inputs");
        console.log(inputs);

        axios.post('http://localhost:8080/login', {
            userId: inputs.userId
            , password: encryptPassword
        }).then((response) => {

            console.log(response);

            if (response.data.jwt) {

                setCookie("token", `${response.data.jwt}`, {
                    path: "/",
                    sameSite: "strict",
                });


                setUser(response.data.user.userId);

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

    const setUser = (userId) => {
        dispatch({ type: 'login', payload: userId })
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
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { checkPassword } from "../common/common.js"
import { sha256 } from 'js-sha256';
import "../react-datepicker.css";


import axios from "axios";

const JoinForm = () => {

    const navigate = useNavigate();
    const userNameRefer = useRef(null);
    const passwordRefer = useRef(null);
    const passwordCheckRefer = useRef(null);
    const birthDayRefer = useRef(null);



    const [inputs, setInputs] = useState({
        userId: '',
        userIdCheck: false,
        userName: '',
        birthDay: new Date(),
        password: '',
        passwordCheck: '',
    });

    const [birthDay, setBirthDay] = useState(new Date());

    useEffect(() => {
    }, []);

    async function checkUserId() {

        const userIdReg = /^[a-z]+[a-z0-9]{1,20}$/g;
        if (!userIdReg.test(inputs.userId)) {
            alert('아이디는 소문자로 시작하고, 2자리 이상 소문자 또는 숫자이어야 합니다.');

            const nextInputs = {
                ...inputs,
                userId: '',
            }

            setInputs(nextInputs);

            return;
        }

        await axios.post('http://localhost:8080/checkUserId', {
            userId: inputs.userId
        }).then((response) => {

            if (response.data.count === 0) {
                alert('사용 가능한 아이디입니다.');

                const nextInputs = {
                    ...inputs,
                    userIdCheck: true,
                }

                setInputs(nextInputs);
            } else {
                alert('사용 불가능한 아이디입니다.');

                const nextInputs = {
                    ...inputs,
                    userId: '',
                }

                setInputs(nextInputs);
            }

        }).catch((error) => {
            console.error(error);
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'userId') {
            const nextInputs = {
                ...inputs,
                [name]: value,
                userIdCheck: false,
            }

            setInputs(nextInputs);

        } else {
            const nextInputs = {
                ...inputs,
                [name]: value,
            }
            setInputs(nextInputs);

        }

    }

    const stopEvent = (e) => {
        e.preventDefault();
    }

    async function insertUser() {
        if (inputs.userIdCheck === false) {
            alert('아이디 확인 버튼을 눌러주세요');
            return;
        }

        if (inputs.userName === '') {
            alert('이름을 입력해주세요.');
            userNameRefer.current.focus();
            return;
        }

        if (inputs.password === '') {
            alert('비밀번호를 입력해주세요');
            passwordRefer.current.focus();
            return;
        }

        if (inputs.passwordCheck === '') {
            alert('비밀번호를 다시 입력해주세요.');
            passwordCheckRefer.current.focus();
            return;
        }

        if (inputs.password !== inputs.passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            passwordCheckRefer.current.focus();
            return;
        }

        if (!checkPassword(inputs.password)) {

            const nextInputs = {
                ...inputs,
                password: '',
                passwordCheck: '',
            }

            setInputs(nextInputs);

            alert('비밀번호는 숫자 1개 이상, 특수문자 1개 이상, 8~50자리 입니다.');
            return;
        }

        let form = new FormData();
        form.append("userId", inputs.userId);
        form.append("userName", inputs.userName);
        form.append("password", sha256(inputs.password));

        let year = birthDayRefer.current.props.selected.getFullYear();
        let month = birthDayRefer.current.props.selected.getMonth() + 1;
        month = ('00' + month).slice(-2);
        let day = birthDayRefer.current.props.selected.getDate();
        day = ('00' + day).slice(-2);
        let birthDay = year + "-" + month + "-" + day + " 00:00";
        form.append("birthDayParam", birthDay);

        await axios.post('http://localhost:8080/insertUser', form
        ).then((response) => {
            if (response.data.status === "200") {
                alert("아이디가 등록돼었습니다.");
                navigate('/loginForm');
            } else {
                alert("아이디가 등록 실패했습니다.");
            }
        }).catch((error) => {
            alert("아이디 생성 요청이 실패했습니다.");
        })

    }

    const list = () => {
        navigate('/list');
    }

    return (
        <>
            <h1>사용자 추가</h1>

            <form onSubmit={stopEvent}>
                <div>
                    <div>
                        <label htmlFor="userId">아이디</label>
                        <input type="text" id="userId" name="userId" value={inputs.userId} onChange={handleChange} />
                        <input type="button" id="userIdCheck" value="아이디 확인" onClick={checkUserId} />
                    </div>
                    <div>
                        <label htmlFor="userName">이름</label>
                        <input type="text" id="userName" name="userName" ref={userNameRefer} value={inputs.userName} onChange={handleChange} />
                    </div>

                    <div className="w100 displayFlex">
                        <label htmlFor="birthDay">생일</label>
                        <div>
                            <DatePicker ref={birthDayRefer} selected={birthDay} dateFormat="yyyy-MM-dd" name="birthDay" onChange={(date) => setBirthDay(date)} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" value={inputs.password} ref={passwordRefer} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password2">비밀번호 확인</label>
                        <input type="password" id="passwordCheck" name="passwordCheck" value={inputs.passwordCheck} ref={passwordCheckRefer} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit" onClick={insertUser}>가입</button>
                        <button id="" onClick={list}>목록</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default JoinForm;

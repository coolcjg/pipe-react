import { useState, useEffect, useRef } from 'react';
import axios from "axios";

const Write = () => {

    const userNameRefer = useRef(null);
    const passwordRefer = useRef(null);
    const passwordCheckRefer = useRef(null);

    const [inputs, setInputs] = useState({
        userId: '',
        userIdCheck: false,
        userName: '',
        password: '',
        passwordCheck: '',
    });

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
            console.log(response);
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

    const userInsert = () => {
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
        } else {
            console.log("Aaa");

            if (!checkPassword()) {
                alert('비밀번호는 숫자 1개 이상, 특수문자 1개 이상, 8~50자리 입니다.');
                return;
            }
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
    }

    function checkPassword() {
        const passwordReg = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()\-_+=/\[\{\]\}\\|;:'",<.>?]{1,50})(?=.*[a-zA-Z_]{1,50}).{3,50}/g;

        console.log("input password : " + inputs.password);


        if (!passwordReg.test(inputs.password)) {
            const nextInputs = {
                ...inputs,
                password: '',
            }

            setInputs(nextInputs);

            console.log("1");

            return false;
        } else {

            console.log("2");
            return true;
        }

    }

    return (
        <>
            <h1>사용자 추가</h1>

            <form onSubmit={stopEvent}>
                <div>
                    <label htmlFor="userId">아이디</label>
                    <input type="text" id="userId" name="userId" value={inputs.userId} onChange={handleChange} />
                    <input type="button" id="userIdCheck" value="아이디 확인" onClick={checkUserId} />
                </div>
                <div>
                    <label htmlFor="userName">이름</label>
                    <input type="text" id="userName" name="userName" ref={userNameRefer} value={inputs.userName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" ref={passwordRefer} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password2">비밀번호 확인</label>
                    <input type="password" id="passwordCheck" name="passwordCheck" ref={passwordCheckRefer} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" onClick={userInsert}>가입</button>
                </div>
            </form>
        </>
    )
}

export default Write;

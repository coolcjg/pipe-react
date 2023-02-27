import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPassword } from "../common/common.js"
import DatePicker from "react-datepicker";
import axios from "axios";
import qs from "qs";
export const SERVER_DOMAIN = `${process.env.REACT_APP_SERVER_DOMAIN}`

const Modify = () => {

    const userNameRefer = useRef(null);
    const passwordRefer = useRef(null);
    const passwordCheckRefer = useRef(null);
    const birthDayRefer = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const [inputs, setInputs] = useState({
        userId: '',
        userName: '',
        password: '',
        passwordCheck: '',
    });

    const [birthDay, setBirthDay] = useState('');

    useEffect(() => {
        selectUser();
    }, []);

    const selectUser = () => {
        axios.get(SERVER_DOMAIN + '/selectUser?userId=' + query.userId)
            .then((response) => {
                if (response.data.user != null) {

                    const nextInputs = {
                        userId: response.data.user.userId,
                        userName: response.data.user.userName,
                        password: '',
                        passwordCheck: '',
                    }

                    setInputs(nextInputs);

                    const yourDate = new Date(response.data.user.birthDay);

                    setBirthDay(yourDate);

                } else {
                    alert(query.userId + '에 해당하는 사용자 정보가 없습니다.');
                }
            })
            .catch((error) => {
                alert(error.code);
            })
    }

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const updateUser = () => {

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
        form.append("password", inputs.password);

        let year = birthDayRefer.current.props.selected.getFullYear();
        let month = birthDayRefer.current.props.selected.getMonth() + 1;
        month = ('00' + month).slice(-2);
        let day = birthDayRefer.current.props.selected.getDate();
        day = ('00' + day).slice(-2);
        let birthDay = year + "-" + month + "-" + day + " 00:00";
        form.append("birthDayParam", birthDay);

        axios.post('http://localhost:8080/updateUser', form
        ).then((response) => {
            if (response.data.status === "200") {
                alert("사용자 수정 완료.");
                navigate('/view?userId=' + query.userId);
            } else {
                alert("사용자 수정 실패.");
            }
        }).catch((error) => {
            alert("사용자 수정 오류 발생.");
        })
    }

    const view = () => {
        navigate('/view?userId=' + query.userId);
    }

    return (
        <>
            <h1>수정</h1>

            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="userId">아이디</label></td>
                        <td><input type="text" id="userId" readOnly value={inputs.userId} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userId">이름</label></td>
                        <td><input type="text" id="userName" name="userName" ref={userNameRefer} value={inputs.userName} onChange={handleChange} /></td>
                    </tr>

                    <tr>
                        <td><label>생일</label></td>
                        <td>
                            <div>
                                <DatePicker ref={birthDayRefer} selected={birthDay} dateFormat="yyyy-MM-dd" name="birthDay" onChange={(date) => setBirthDay(date)} />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor="userId">비밀번호</label></td>
                        <td><input type="password" id="password" name="password" value={inputs.password} ref={passwordRefer} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userId">비밀번호확인</label></td>
                        <td><input type="password" id="passwordCheck" name="passwordCheck" value={inputs.passwordCheck} ref={passwordCheckRefer} onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button id="updateUser" onClick={updateUser}>수정</button>
                <button id="" onClick={view}>취소</button>
            </div>
        </>
    )
}


export default Modify;
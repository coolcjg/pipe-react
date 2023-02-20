import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import qs from "qs";
export const SERVER_DOMAIN = `${process.env.REACT_APP_SERVER_DOMAIN}`

const Modify = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const [user, setUser] = useState({
        userId: '',
        userName: ''
    });

    useEffect(() => {
        selectUser();
    }, []);

    const selectUser = () => {
        axios.get(SERVER_DOMAIN + '/selectUser?userId=' + query.userId)
            .then((response) => {
                if (response.data.user != null) {
                    setUser(response.data.user);
                } else {
                    alert(query.userId + '에 해당하는 사용자 정보가 없습니다.');
                }
            })
            .catch((error) => {
                alert(error.code);
            })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUser = () => {
        console.log(user);

        let form = new FormData();
        form.append("userId", user.userId);
        form.append("userName", user.userName);
        form.append("password", user.password);

        axios.post('http://localhost:8080/updateUser', form
        ).then((response) => {
            if (response.data.status === "200") {
                alert("사용자 수정 완료.");
                //navigate('/view?userId=' + query.userId);
                navigate('/list');
            } else {
                alert("사용자 수정 실패.");
            }
        }).catch((error) => {
            alert("사용자 수정 오류 발생.");
        })
    }

    return (
        <>
            <h1>수정</h1>

            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="userId">아이디</label></td>
                        <td><input type="text" id="userId" readOnly value={user.userId} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userId">이름</label></td>
                        <td><input type="text" id="userName" name="userName" value={user.userName} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userId">비밀번호</label></td>
                        <td><input type="password" id="password" name="password" onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button id="updateUser" onClick={updateUser}>수정</button>
            </div>
        </>
    )
}


export default Modify;
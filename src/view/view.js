import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import qs from "qs";
export const SERVER_DOMAIN = `${process.env.REACT_APP_SERVER_DOMAIN}`

const View = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const [user, setUser] = useState({
        userId: '',
        userName: '',
        birthDay: '',
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

    const modify = () => {
        navigate('/modify?userId=' + query.userId);
    }

    const list = () => {
        navigate('/list');
    }

    return (
        <>
            <h1>상세</h1>

            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="userId">아이디</label></td>
                        <td>{user.userId}</td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userId">이름</label></td>
                        <td>{user.userName}</td>
                    </tr>

                    <tr>
                        <td><label htmlFor="birthDay">생일</label></td>
                        <td>{user.birthDay.split("T")[0]}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button id="updateUser" onClick={modify}>수정</button>
                <button id="" onClick={list}>목록</button>
            </div>
        </>
    )
}


export default View;
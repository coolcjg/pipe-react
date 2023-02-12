import axios from "axios";
import { useState, useEffect } from "react";
export const SERVER_DOMAIN = `${process.env.REACT_APP_SERVER_DOMAIN}`

const List = () => {
    const baseUrl = SERVER_DOMAIN + '/userList';

    const [userList, setUserList] = useState([]);
    const [checkItems, setCheckItems] = useState([]);

    useEffect(() => {
        userListSelect();
    }, []);

    async function userListSelect() {
        await axios.get(baseUrl)
            .then((response) => {
                console.log(response);
                setUserList(response.data.list);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const goWriteForm = () => {
        document.location.href = '/write';
    }

    async function deleteUser() {
        await axios.post(SERVER_DOMAIN + '/deleteUser', {
            userIdArray: ''
        })
            .then((response) => {
                console.log(response);
                setUserList(response.data.list);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const checkAll = (checked) => {

        if (checked === true) {
            const userIdArray = [];
            userList.forEach((el) => userIdArray.push(el.userId));
            setCheckItems(userIdArray);
        } else {
            setCheckItems([]);
        }

    }

    const checkSingle = (userId, checked) => {
        if (checked) {
            setCheckItems(prev => [...prev, userId]);

        } else {
            setCheckItems(checkItems.filter((el) => el !== userId));
        }
    };

    return (
        <>
            <h3>리스트</h3>
            <table className="userListTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={(e) => checkAll(e.target.checked)} checked={checkItems.length === userList.length ? true : false} /></th>
                        <th>아이디</th>
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user) =>
                            <tr key={user.userId}>
                                <td><input type="checkbox" name="userCheckBox" checked={checkItems.includes(user.userId)} onChange={(e) => checkSingle(user.userId, e.target.checked)} /></td>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <button onClick={goWriteForm}>등록</button>
                <button onClick={deleteUser}>삭제</button>
            </div>

        </>
    )
}

export default List;
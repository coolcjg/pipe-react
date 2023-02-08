import axios from "axios";
import { useState, useEffect } from "react";
import UserList from './userList';

const List = () => {

    const baseUrl = 'http://localhost:8080/userList';

    const [userList, setUserList] = useState([]);

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

    return (
        <>
            <h3>리스트</h3>
            <table className="userListTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>아이디</th>
                        <th>이름</th>
                    </tr>
                </thead>
                <tbody>
                    <UserList userList={userList} />
                </tbody>
            </table>


        </>
    )
}

export default List;
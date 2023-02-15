import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import qs from "qs";
export const SERVER_DOMAIN = `${process.env.REACT_APP_SERVER_DOMAIN}`

const List = () => {

    const searchTypeRef = useRef('all');
    const searchTextRef = useRef('');

    const location = useLocation();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const [userList, setUserList] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        page: query.page !== undefined ? query.page : 1
        , searchType: query.searchType !== undefined ? query.searchType : ''
        , searchText: query.searchText !== undefined ? query.searchText : ''
    });

    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        userListSelect(pageInfo);
    }, [pageInfo]);

    function userListSelect(pageInfo) {

        axios.get(SERVER_DOMAIN + '/userList?page=' + pageInfo.page + '&searchType=' + pageInfo.searchType + '&searchText=' + pageInfo.searchText)
            .then((response) => {
                setUserList(response.data.list);
                setTotalPage(response.data.pageInfo.totalPage);
            })
            .catch((error) => {
                alert(error.code);
            })
    }

    const goWriteForm = () => {
        document.location.href = '/write';
    }

    async function deleteUser() {
        const formData = new FormData();
        formData.append("checkItems", checkItems);

        await axios.post(SERVER_DOMAIN + '/deleteUser', formData)
            .then((response) => {
                alert(response.data.successCount + "개 삭제 성공");
                setCheckItems([]);
                userListSelect();
            })
            .catch((error) => {
                console.error(error);
            });
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

    function setPage(page) {
        setPageInfo({ ...pageInfo, "page": page });
    }

    function search() {
        setPageInfo({ ...pageInfo, "searchType": searchTypeRef.current.value, "searchText": searchTextRef.current.value });
    }

    const displayPage = () => {
        const result = [];
        for (let i = 1; i <= totalPage; i++) {
            result.push(<a key={i} href="#?" onClick={() => { setPage(i) }}>{i} </a>);
        }

        return result;
    }

    return (
        <>
            <h3>리스트</h3>

            <table className="userListTable">
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={(e) => checkAll(e.target.checked)} checked={checkItems.length !== 0 && checkItems.length === userList.length ? true : false} /></th>
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

            <div>
                {displayPage()}
            </div>

            <div>
                <select ref={searchTypeRef}>
                    <option value="all">전체</option>
                    <option value="userId">아이디</option>
                    <option value="userName">이름</option>
                </select>
                <input type="text" ref={searchTextRef}></input>
                <button type="submit" onClick={search}>검색</button>
            </div>



        </>
    )
}

export default List;
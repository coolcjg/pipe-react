import axios from "axios";
import { useEffect } from "react";

const List = () => {

    const baseUrl = 'http://localhost:8080/userList';


    useEffect(() => {
        userList();
        console.log("실행");
    }, []);


    async function userList() {
        await axios.get(baseUrl)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            <h3>리스트</h3>
        </>
    )
}

export default List;
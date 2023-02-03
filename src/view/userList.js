const UserList = (props) => {

    const userList = props.userList;

    const listItem = userList.map((user) =>
        <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
        </tr>
    );

    return (
        <>
            {listItem}
        </>

    )
}

export default UserList;
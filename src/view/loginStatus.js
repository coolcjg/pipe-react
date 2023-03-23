import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const LoginStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId, jwt } = useSelector(state => state.user);

    const loginForm = () => {
        navigate('/loginForm');
    }

    const logout = () => {
        if (window.confirm('로그아웃하시겠습니까?')) {

            dispatch({ type: 'login' });
            navigate('/loginForm');
        }
    }

    if (userId !== "") {
        return (
            <>
                <div>
                    <div className="inlineBlock">
                        <p>{userId}</p>
                    </div>
                    <div className="inlineBlock">
                        <button onClick={logout}>로그아웃</button>
                    </div>
                </div>
            </>

        )
    } else {

        return (
            <>
                <div>
                    <div>
                        <button onClick={loginForm}>로그인</button>
                    </div>
                </div>
            </>
        )

    }
}

export default LoginStatus;
import { useNavigate } from 'react-router-dom';

const LoginStatus = () => {

    const navigate = useNavigate();
    const loginForm = () => {
        navigate('/loginForm');
    }

    return (
        <>
            <div>
                <div>
                    <button onClick={loginForm}>로그인</button>
                </div>

                <div>
                    <p>아이디</p>
                </div>
            </div>
        </>

    )

}

export default LoginStatus;
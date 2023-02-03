import { useState, useEffect } from 'react';

const Write = () => {

    const [inputs, setInputs] = useState({
        userId: '',
        userName: '',
    });

    useEffect(() => {
        console.log(inputs);
    }, [inputs]);

    const idCheck = () => {

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        }

        setInputs(nextInputs);
    }


    return (
        <>
            <h1>사용자 추가</h1>

            <form>
                <div>
                    <label htmlFor="userId">아이디</label>
                    <input type="text" id="userId" name="userId" value={inputs.userId} onChange={handleChange} />
                    <input type="button" id="userIdCheck" value="아이디 확인" onClick={idCheck} />
                </div>
                <div>
                    <label htmlFor="userName">이름</label>
                    <input type="text" id="userName" name="userName" value={inputs.userName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <label htmlFor="password2">비밀번호 확인</label>
                    <input type="password" id="password2" name="password2" />
                </div>
            </form>
        </>
    )
}

export default Write;

import { useState, useEffect, useRef } from 'react'
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './Login.css'
import { Redirect } from 'react-router-dom';

const Login = ({id, login, history}) => {
    const [form] = Form.useForm();

    // ===== some hooks for validating username and password ==== 
    // in Ant design, there are 3 status
    // status: success, warning, error
    // const history = useHistory();
    const [status, setStatus] = useState(null);
    const [userValid, setUsrVad] = useState(null);
    const [psdValid, setPsdVad] = useState(null);
    const [userMsg, setUsrMsg] = useState(null);
    const [psdMsg, setPsdMsg] = useState(null);
    
    // ==== some ref =======
    const userRef = useRef(null);
    const psdRef = useRef(null);

    // login as a normal user
    const logInNormal = async ({user,password}) => { 
        // console.log(user, password);      
        if (checkUserName(user) && checkPassWord(password)) {
            const result = await login({user,password});
            if (result === 'success') {
                // console.log("log in successfully, redirect to /");
                history.push("/");
            } else {
                setStatus('user');
                setUsrVad('error');
                setPsdVad('error');
                setUsrMsg(result);
                form.resetFields();
                userRef.current.focus();
            }
        }
    }
    // return true if username is not empty
    const checkUserName = (user) => {
        if (!user) {
            setStatus('user')
            setUsrVad('error');
            setUsrMsg('User name should not be blank!!');
            userRef.current.focus(); 
            return false;           
        }
        setUsrVad(null)
        setUsrMsg(null)
        return true;

    }

    const onSignUp = () => {
        history.push("/register");
    }
    // return true if password is not empty
    const checkPassWord = (password) => {
        if (!password) {
            if(status==='psd') {
                setPsdVad('error')
                setPsdMsg('Password  should not be blank!!')
            } else {
                setStatus('psd')
                psdRef.current.focus();
            }
            return false;
        }
        setPsdVad(null)
        setPsdMsg(null)
        return true
    }
    // login as an Administrator

    useEffect(()=>{
        if (userRef !== null) { // && !id
            userRef.current.focus();
        }
    }, []);
    
    // render Container
    if (id) {
        // approach 1
        // console.log("has id, redirect to /")
        return <Redirect to="/" />;
    }
    return(
        <div className="loginContainer">
            <div className="login-title">
                {/* <img src=""/> */}
                <h1>House Price</h1>
                <p> A system that helps you know house price </p>
            </div>
            <div className="login-main">
                <Form 
                    form={form} 
                    name="normallogin" 
                    className="login-form"
                    onFinish={logInNormal} 
                    style={{marginTop: "10px"}}
                >
                    <Form.Item
                        name="user"
                        validateStatus={userValid}
                        help={userMsg}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="user"
                            ref={userRef}
                            onChange={(e)=>{
                                checkUserName(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        validateStatus={psdValid}
                        help={psdMsg}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>} 
                            placeholder="Password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            ref={psdRef} 
                            onChange={(e)=>{
                                checkPassWord(e.target.value)
                            }}
                        />
                    </Form.Item>  
                    <Form.Item >
                        <span className="register"><a 
                            onClick={onSignUp}
                        >Sign up here</a></span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-submit"
                        > Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default Login;
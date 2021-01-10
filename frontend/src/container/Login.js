import { useState, useEffect, useRef} from 'react'
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './Login.css'
import { loginAsAuth, loginAsNormalUser } from '../axios/axios';


const Login = ({setId,setAuth}) => {
    const [form] = Form.useForm();

    // ===== some hooks for validating username and password ==== 
    // in Ant design, there are 3 status
    // status: success, warning, error
    const [status, setStatus] = useState(null);
    const [userValid, setUsrVad] = useState(null);
    const [psdValid, setPsdVad] = useState(null);
    const [userMsg, setUsrMsg] = useState(null);
    const [psdMsg, setPsdMsg] = useState(null);
    
    // ==== some ref =======
    const userRef = useRef(null);
    const psdRef = useRef(null);

    // login as a normal user
    const logInNormal = async ({Username,Password}) => {       
        if (checkUserName(Username) && checkPassWord(Password)) {
            loginAsNormalUser({Username,Password})
                .then( (res) => {
                    // console.log(res)
                    setId(res.data);
                    setAuth(res.isAuth);
                })
                .catch( (e)=> {
                    // console.log(e?.response?.data?.msg);
                    setStatus('user');
                    setUsrVad('error');
                    setPsdVad('error');
                    setUsrMsg(e?.response?.data?.msg);
                    form.resetFields();
                    userRef.current.focus();
                    
                })
        }
    }
    // return true if username is not empty
    const checkUserName = (Username) => {
        if (!Username) {
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
    // return true if password is not empty
    const checkPassWord = (Password) => {
        if (!Password) {
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
    const logInAdmin = async () => {
        loginAsAuth()
            .then( (res) => {
                setId('Admin')
            })
            .catch( (err) => {
                console.log(err)
            })
    }

    useEffect(()=>{
        userRef.current.focus();
    }, []);
    
    // render Container
    return(
        <div className="loginContainer">
            <div className="login-title">
                <h1>House Price</h1>
                <p> a system that helps you know house price </p>
            </div>
            <div className="login-main">
                <Form 
                    form={form} 
                    name="normallogin" 
                    className="login-form"
                    onFinish={logInNormal} 
                >
                    <Form.Item
                        name="Username"
                        validateStatus={userValid}
                        help={userMsg}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Username"
                            ref={userRef}
                            onChange={(e)=>{
                                checkUserName(e.target.value)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
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
                        <span className="login-admin"><a 
                            onClick={logInAdmin}
                        >login as Admin</a></span>
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
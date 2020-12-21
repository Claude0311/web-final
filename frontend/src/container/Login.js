import { useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
const API_ROOT = 'http://localhost:4000'
const instance = axios.create({
  baseURL: API_ROOT
})

const Login = ({setId}) => {
    const [form] = Form.useForm();
    const [status, setStatus] = useState(null);
    const [userValid, setUsrVad] = useState(null);
    const [psdValid, setPsdVad] = useState(null);
    const [userMsg, setUsrMsg] = useState(null);
    const [psdMsg, setPsdMsg] = useState(null);
    // status: success, warning, error
    const userRef = useRef(null);
    const psdRef = useRef(null);


    const logInNormal = async ({Username,Password}) => {       
        if (checkUserName(Username) && checkPassWord(Password)) {
            instance.post('/login',{params: {user: Username}})
                .then( (res) => {
                    setId(res)
                })
                .catch( (err)=> {
                    console.log(err.msg)
                    setStatus('user')
                    setUsrVad('error')
                    setUsrMsg('Unknown User!!')
                    form.resetFields();
                    userRef.current.focus();
                    
                })
        }
    }
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
    const checkPassWord = (Password) => {
        if (!Password) {
            if(status==='psd') {
                setPsdVad('error')
                setPsdMsg('Password  should not be blank!!')
            } else {
                setStatus('psd')
            }
            return false;
        }
        setPsdVad(null)
        setPsdMsg(null)
        return true
    }
    const logInAdmin = async () => {
        instance.post('/loginAuth')
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
                            onPressEnter={()=>psdRef.current.focus()}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        validateStatus={psdValid}
                        help={psdMsg}
                    >
                        <Input 
                            prefix={<LockOutlined className="site-form-item-icon"/>} 
                            placeholder="Password"
                            ref={psdRef} 
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
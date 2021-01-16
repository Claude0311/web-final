import { useState, useEffect, useRef } from 'react'
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './SignUp.css'
import { registerUser } from '../axios/axios';

const SignUp = ({logout, history}) => {
    const [form] = Form.useForm();

    // ===== some hooks for validating username and password ==== 
    // in Ant design, there are 3 status
    // status: success, warning, error
    // const history = useHistory();
    const [status, setStatus] = useState(null);
    const [userValid, setUsrVad] = useState(null);
    const [psdValid, setPsdVad] = useState(null);
    const [conValid, setConVad] = useState(null);
    const [userMsg, setUsrMsg] = useState(null);
    const [psdMsg, setPsdMsg] = useState(null);
    const [conMsg, setConMsg] = useState(null);
    
    // ==== some ref =======
    const userRef = useRef(null);
    const psdRef = useRef(null);
    const confirmRef = useRef(null);

    // login as a normal user
    const RegisterNormal = async ({user,password,confirm}) => { 
        console.log(user, password, confirm);      
        if (checkUserName(user) && checkPassWord(password) && checkConfirm(confirm,password)) {
            registerUser({user,password})
                .then((newuser) => {
                    console.log("create a new user of", newuser);
                    onLogin();
                }).catch(e => {
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

    const onLogin = async() => {
        await logout();
        history.push("/login");
    }

    // return true if password is not empty
    const checkPassWord = (password) => {
        if (!password) {
            if(status==='psd') {
                setPsdVad('error')
                setPsdMsg('Password  should not be blank!!')
            } else {
                setStatus('psd')               
            }
            psdRef.current.focus();
            return false;
        }
        setPsdVad(null)
        setPsdMsg(null)
        return true
    }

    // login as an Administrator
    const checkConfirm = (confirm, password) => {
        if (!confirm || confirm !== password) {
            if (status === 'confirm') {
                setConVad('error')
                setConMsg('Confirmed password is different!!')
                form.setFieldsValue({confirm: null});                
            } else {
                setStatus('confirm');
            }
            confirmRef.current.focus()
            return false;
        } 
        setConVad(null);
        setConMsg(null);
        return true;
    }  

    useEffect(()=>{
        userRef.current.focus();
    }, []);
    
    return(
        <div className="registerContainer">
            <div className="register-main">
                <div className="register-title">
                    <h1>Create a new Account</h1>
                    <p> You have to fill up the form</p>
                </div>
                <Form 
                    form={form} 
                    name="normalregister" 
                    className="register-form"
                    onFinish={RegisterNormal} 
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
                            visibilityToggle={false}
                            ref={psdRef} 
                            onChange={(e)=>{
                                checkPassWord(e.target.value)
                            }}
                        />
                    </Form.Item>  
                    <Form.Item
                        name="confirm"
                        validateStatus={conValid}
                        help={conMsg}
                    >
                        <Input.Password
                            prefix={<CheckCircleOutlined className="site-form-item-icon"/>} 
                            placeholder="Confirm"
                            visibilityToggle={false}
                            
                            ref={confirmRef} 
                        />
                    </Form.Item>
                    <Form.Item >
                        <span className="register"><a 
                            onClick={onLogin}
                        >Back to Login</a></span>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-submit"
                        > Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}


export default SignUp;
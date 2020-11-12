import React ,{Component} from 'react';
import axios from 'axios';
import { Redirect , Link} from "react-router-dom";
import '../style/Login.css';
import logo from '../image/logo.svg.png';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, message , Spin } from 'antd';
import { UserOutlined, LockOutlined , LoadingOutlined } from '@ant-design/icons';

class Login extends Component{
    constructor(){
        super();
        const token = localStorage.getItem('token');
        let isLogin = true;
        if(token === null){
          isLogin = false
        } 
        this.state={
            userName : '',
            passWord : '',
            isLogin : isLogin,
            isLoading : false
        }
        this.onFinish = this.onFinish.bind(this);
    }
    onFinish = values => {
        let isLogin = this.state.isLogin;
        const url = '/api/auth/login';
        axios.post(url,values)
        .then((res) => {
            if(res.data.errors){
                return message.error(res.data.errors.msg);
            }else{
                localStorage.setItem('token',JSON.stringify(res.data.success.username));
                this.setState({
                    isLogin : !isLogin,
                    isLoading: true
                })
                return message.success(res.data.success.msg);
            }
        })
        .catch((error)=> {
            console.log(error);
        });
    };
    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        if(this.state.isLogin ){
          return  <Redirect to="/" />;
        }
            return (
                <div className="Login">
                    <div className="form">
                        <div className="logo-lg">
                            <img src={logo} alt="Logo - Instagram"/>
                        </div>
                        <div className="form-control">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                            remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                            name="username"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your Username!',
                                },
                            ]}
                            >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Username" 
                                value={this.state.userName}
                                onChange={this.onChange} />
                            </Form.Item>
                            <Form.Item
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your Password!',
                                },
                            ]}
                            >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                value={this.state.passWord}
                                onChange={this.onChange}
                            />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Link className="login-form-forgot" to="/forgot">Forgot password</Link>
                            </Form.Item>
                            <Form.Item>
                                {
                                    this.state.isLoading === true ? (
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            <Spin indicator={antIcon} />
                                            Log in
                                        </Button>
                                    ) : (
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button> 
                                    )
                                }
                                
                            </Form.Item>
                        </Form>
                        </div>
                        <div className="register">
                            <p>Don't have an account?<Link to="/register">Sign up</Link></p>
                        </div>
                    </div>
                    
                </div>
                ); 
            }
}




export default Login;
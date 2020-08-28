import React ,{Component} from 'react';
import { Redirect , Link} from "react-router-dom";
import '../style/Login.css';
import logo from '../image/logo.svg.png';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component{
    constructor(props){
        super(props);
        const token = localStorage.getItem('username');
        let isLogin = true;
        if(token === null){
          isLogin = false
        } 
        this.state={
            userName : '',
            passWord : '',
            isLogin : isLogin   
        }
        this.onFinish = this.onFinish.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFinish = values => {
        let isLogin = this.state.isLogin;
        const userReg = JSON.parse(localStorage.getItem('userReg'));
        console.log(values.password === userReg.password);
        if(values.username === userReg.username && values.password === userReg.password){
            localStorage.setItem('username',JSON.stringify(values.username) );
            this.setState({
                userName : values.username,
                passWord : values.password,
                isLogin : !isLogin
            })
            
        }
    };
    onChange(){
        // this.setState({
        //     userName : '',
        //     passWord : ''
        // })
    }
    render() {
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
                        
                                <a className="login-form-forgot" href="##">
                                    Forgot password
                                </a>
                            </Form.Item>
                    
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                                </Button>
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
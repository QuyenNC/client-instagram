import React ,{Component} from 'react';
import { Redirect , Link} from "react-router-dom";
import logo from '../image/logo.svg.png'
import '../style/Register.css';
import 'antd/dist/antd.css';
import {Form, Input, Button} from 'antd';

class Register extends Component{
    constructor(){
        super();
        const token = localStorage.getItem('username');
        let isLogin = true;
        if(token === null){
          isLogin = false
        } 
        this.state={
            isRegister : false,
            isLogin : isLogin  
        }
    this.onFinish = this.onFinish.bind(this);
    }
    onFinish(values){
        const isRegister = this.state.isRegister;
        localStorage.setItem('userReg', JSON.stringify(values));
        this.setState({
            isRegister : !isRegister
        })
        console.log('Received values of form: ', JSON.stringify(values));
    }
   render(){
       if(this.state.isLogin){
           return <Redirect to="/"/>
       }
       if(this.state.isRegister){
            return <Redirect to="/login"/>
       }
       return(
           <div className="Register">
               <div className="form">
                    <div className="logo-re">
                        <img src={logo} alt="Logo - Instagram"/>
                    </div>
                    <div className="form-control">
                        <Form
                            name="register"
                            onFinish={this.onFinish}
                            scrollToFirstError
                            >
                                <Form.Item
                                    className="input-control"
                                    name="email"
                                    rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                    ]}
                                    
                                >
                                <Input placeholder="Email"  />
                                </Form.Item>
                            
                                <Form.Item
                                    name="fullname"
                                    className="input-control"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your nickname!',
                                        whitespace: true,
                                    },
                                    ]}
                                >
                                    <Input  placeholder="Full Name" />
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    className="input-control"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your nickname!',
                                        whitespace: true,
                                    },
                                    ]}
                                >
                                    <Input  placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    className="input-control"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            
                                <Form.Item  className="input-control">
                                    <Button type="primary" htmlType="submit" className="btn ">
                                        Register
                                    </Button>
                                </Form.Item>
                        </Form>
                    </div>
                    <div className="login">
                        <p>Have an account?<Link to="/login">Sign in</Link></p>
                    </div>
               </div>
                
        </div>
      );
   }
}

export default Register;
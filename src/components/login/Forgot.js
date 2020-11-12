import React ,{Component} from 'react';
import axios from 'axios';
import { Redirect , Link} from "react-router-dom";
import logo from '../image/logo.svg.png'
import '../style/Forgot.css';
import 'antd/dist/antd.css';
import {Form, Input, Button,message} from 'antd';

class Forgot extends Component{
    constructor(){
        super();
        const token = localStorage.getItem('token');
        let isLogin = true;
        if(token === null){
          isLogin = false
        } 
        this.state={
            isForgot : false,
            isLogin : isLogin  
        }
    this.onFinish = this.onFinish.bind(this);
    }
    onFinish(values){
        const url = '/api/auth/forgot';
        axios.post(url,values)
        .then((res) => {
            if(res.data.errors){
                return message.error(res.data.errors.msg);
            }
            else{
                this.setState({
                    isForgot : !this.state.isForgot
                })
                return message.success(res.data.success.msg);
            }
        })
        .catch((error)=> {
            console.log(error);
        });
    }
   render(){
       if(this.state.isLogin){
           return <Redirect to="/"/>
       }
       if(this.state.isForgot){
            return <Redirect to="/login"/>
       }
       return(
           <div className="Forgot">
               <div className="form-fogot">
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
                
                                <Form.Item  className="input-control">
                                    <Button type="primary" htmlType="submit" className="btn ">
                                        Send 
                                    </Button>
                                </Form.Item>
                        </Form>
                    </div>
                    <div className="register-fogot">
                            <p><Link to="/register">Create account</Link></p>
                        </div>
                    <div className="login-fogot">
                        <p><Link to="/login">Back to login</Link></p>
                    </div>
               </div>
                
        </div>
      );
   }
}

export default Forgot;
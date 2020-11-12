import React,{Component} from 'react';
import { Redirect , Link} from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu, Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined , SettingOutlined , SaveOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import './style/Header.css';
import logo from './image/logo.svg.png';
import compass from './image/compass.svg';
import heart from './image/heart.svg';
import internet from './image/internet.svg';
import send from './image/send.svg';

class Header extends Component{
    constructor(){
        super();
        this.state={
            isLogout : false
        }
        this.logOut = this.logOut.bind(this);
    }
    logOut(){
        const logout = this.state.isLogout;
        localStorage.removeItem('token');
        this.setState({
            isLogout : !logout
        })
    }
    render(){
        const menu = (
            <Menu>
              <Menu.Item key="0">
                    <Link  to="/profile" > <UserOutlined />Profile</Link>
              </Menu.Item>
              <Menu.Item key="1">
                    <Link  to="/profile" > <AppstoreAddOutlined />Post</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/saved"><SaveOutlined />Saved</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/setting"><SettingOutlined />Setting</Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4" onClick={this.logOut}>
                  Log Out
                </Menu.Item>
            </Menu>
          );
          if(this.state.isLogout === true){
              return <Redirect to="/login" />
          }
        return (
            <div className="Header">
                <div className="wrapper">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Logo - Instagram"/>
                        </Link>
                        
                    </div>
                    <div className="input">
                        <input type="text" name="search" placeholder="Search.." />
                    </div>
                    <div className="action-icon">   
                            <img src={internet} alt="Internet - Instagram"/>
                            <img src={send} alt="Send - Instagram"/>
                            <img src={compass} alt="Compass - Instagram"/>
                            <Badge count={1}>
                                <img src={heart} alt="Heart - Instagram"/>
                            </Badge>
                        <Dropdown overlay={menu} trigger={['click']}  placement="bottomRight">   
                            <Avatar size={28} icon={<UserOutlined />} className="ant-dropdown-link" onClick={e => e.preventDefault()} />
                        </Dropdown>
                    </div>
                </div>
                
            </div>
        )
    }
}


export default Header;

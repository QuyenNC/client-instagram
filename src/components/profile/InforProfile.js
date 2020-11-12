import React,{Component} from 'react';

import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col, Avatar, Modal, Tabs, message} from 'antd';

import EditProfile from './EditProfile';
import EditPassword from './EditPassword';
import '../style/InforProfile.css';

class InforProfile extends Component {
    constructor(){
        super();
        this.state={
            user : {},//state infor user
            visible : false, //state open modal
            fullName : '',//state input fullname of edit profile
            inputFileSelect : null,//state input file of edit profile
            inputOldPass : '',//state input oldpass of change password
            inputNewPass : '',//state input newpass of change password
            inputConPass : '',//state input confirmpass of change password
            failUpload : true,//state upload image of edit profile
            isEdit : false,//state loading button of edit profile and change password
            isChangePass : false//state if newpass and confirm pass wrong 
        }
        this.inputFile =  React.createRef();
        this.onEditProfile = this.onEditProfile.bind(this);
        this.onEditPassword = this.onEditPassword.bind(this);
        this.onChangeInputFullname = this.onChangeInputFullname.bind(this);
        this.onChangeInputFile = this.onChangeInputFile.bind(this);
        this.onChangeInputChangePass = this.onChangeInputChangePass.bind(this);
        
    }
    componentDidMount(){
        const url = "/api/auth/profile/";
        const username = JSON.parse(localStorage.getItem('token'));
        axios.get(url+username)
        .then(res => {
            if(res.data.errors){
                localStorage.removeItem('token');
            }
          this.setState({
              user : res.data.success.user,
              fullName : res.data.success.user.fullname
          })
        })
      }
    onEditProfile(e){
        this.setState({
            isEdit : true
        })
        const username = JSON.parse(localStorage.getItem('token'));
        const url = `/api/auth/profile/edit/${username }`;
        const formData = new FormData();
        if(this.state.inputFileSelect === null  ){
            formData.append("img", this.state.user.avatar);
            formData.append("fullname",this.state.fullName);
        }else{
            formData.append("img", this.state.inputFileSelect);
            formData.append("fullname",this.state.fullName);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url,formData,config)
        .then(res => {
           this.setState({
               fullname : "",
               user : {
                   ...this.state.user,fullname : res.data.success.newFullname,
                   avatar :  res.data.success.avatar
               },
               visible : false,
               isEdit : false
           })
        })
        e.preventDefault();
    }
    onEditPassword(event){
        event.preventDefault();
        const newPass = this.state.inputNewPass;
        const conPass = this.state.inputConPass;
        const oldPass = this.state.inputOldPass;
        if(newPass !== conPass){
            this.setState({
                isChangePass : true
            })
            return;
        }else{
            this.setState({
                isEdit : true
            })
            const username = JSON.parse(localStorage.getItem('token'));
            const url = `/api/auth/profile/password/${username }`;
            const password = {
                oldPass ,
                newPass 
            } 
            axios.post(url,password)
            .then(res => {
                if(res.data.errors){
                    this.setState({
                        isEdit : false
                    })
                    return  message.error(res.data.errors.msg);
                }else{
                    this.setState({
                        isEdit : false,
                        inputOldPass : '',
                        inputNewPass : '',
                        inputConPass : '',
                        visible : false,
                        isChangePass : false  
                    })
                    return  message.success(res.data.success.msg);
                }
            })
        }
        
    }
    onChangeInputFullname(event){
        const {name , value} = event.target;
        this.setState({
            [name] : value
        })
    }
    onChangeInputChangePass(event){
        const {name , value} = event.target;
        this.setState({
            [name] : value
        })
    }
    onChangeInputFile(event){
        const fileType = event.target.files[0].type;
        if(fileType !== "image/jpeg" && fileType !== "image/png"){
            this.setState({
                failUpload : false
            })
        }else{
            this.setState({
                inputFileSelect : event.target.files[0]
            })
        }
    }
    render(){
        const { TabPane } = Tabs;
        return (
            <Row className="h-infor">
                <Col span={8}  className="h-infor-col_8" >
                    <Avatar
                        size={200}
                        icon={<img src={this.state.user.avatar} alt="infor - avatar"/>}
                    />
                </Col>
                <Col span={16} className="h-infor-col_16" >
                    <div className="infor">
                        <h2 className="i-name">{this.state.user.username}</h2>
                        <div className="i-edit">
                            <span onClick={() => (this.setState({visible : true}))}>Edit Profile</span>
                            <Modal
                                title="Edit Profile"
                                centered
                                visible={this.state.visible}
                                onCancel={() => (this.setState({visible : false}))}
                                footer={null}
                                width={800}
                            >
                                <Tabs tabPosition={"left"}>
                                    <TabPane tab="Edit Profile" key="1">
                                        <EditProfile
                                            user={this.state.user}
                                            inputFullname = {this.state.fullName}
                                            onChange={this.onChangeInputFullname}
                                            onEdit={this.onEditProfile}
                                            onChangeFile = {this.onChangeInputFile}
                                            inputSelectFile = {this.state.inputFileSelect}
                                            isEdit={this.state.isEdit}
                                        />
                                    </TabPane>
                                    <TabPane tab="Change Password" key="2">
                                        <EditPassword
                                            user={this.state.user}
                                            onChange={this.onChangeInputChangePass}
                                            onEdit={this.onEditPassword}
                                            isEdit={this.state.isEdit}
                                            isChangePass={this.state.isChangePass}
                                            inputVal = {this.state}
                                        />
                                    </TabPane>
                                </Tabs>
                            </Modal>
                            
                        </div>
                    </div>
                    <ul className="follow">
                        <li><span>0</span>posts</li>
                        <li><span>0</span>followers</li>
                        <li><span>0</span>following</li>
                    </ul>
                    <h1 className="f-name">{this.state.user.fullname}</h1>
                </Col>
            </Row>
        );
    }
}

export default InforProfile;
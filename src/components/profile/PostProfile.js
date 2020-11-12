import React,{Component} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col, Tabs, Button, Alert } from 'antd';
import imgDefault from '../image/imgdefault.jpg';
import appStore from '../image/appStore.png';
import chPlay from '../image/chPlay.png';
import { AppstoreOutlined, AppstoreAddOutlined, PlusOutlined } from '@ant-design/icons';
import '../style/PostProfile.css';

class PostProfile extends Component {
    constructor(){
        super();
        this.state = {
            inputFile : null,
            inputTitle : '',
            inputDes : '',
            failUpload : true,
            postSuccess : false
        }
        this.inputFile =  React.createRef();
        this.inputSubmit =  React.createRef();
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }
    //file upload
    onChangeFile(e){
        const fileType = e.target.files[0].type;
        if(fileType !== "image/jpeg" && fileType !== "image/png"){
            this.setState({
                failUpload : false
            })
        }else{
            this.setState({
                inputFile : e.target.files[0],
                failUpload : true
            })
        }
    }
    onChange(event){
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
      };
    onFinish(e){
        e.preventDefault();
        if(this.state.inputFile === null  ){
            this.setState({
                failUpload : false
            })
        }else{
            this.setState({
                postSuccess : true
            })
            const username = JSON.parse(localStorage.getItem('token'));
            const formData = new FormData();
            formData.append("img", this.state.inputFile);
            formData.append("title", this.state.inputTitle);
            formData.append("desciption", this.state.inputDes);
            formData.append("username", username);
            const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
            }
            const url = '/api/post/create';
            axios.post(url,formData,config)
            .then(res => {
                this.setState({
                    inputFile : null,
                    inputTitle : '',
                    inputDes : '',
                    failUpload : true,
                    postSuccess : false
                })
            })
        }
        
    };
    render(){
        const { TabPane } = Tabs;
        return (
            <Row className="f-infor">
                <Tabs defaultActiveKey="2" tabPosition={"bottom"}>
                    <TabPane
                        tab={
                            <span>
                            <AppstoreOutlined />
                            POSTS
                            </span>
                        }
                        key="1"
                    >
                        <Row className="f-infor-tab">
                            <Col span={10}  className="f-infor-col_10" >
                                <img src={imgDefault} alt="Default Posts"/>
                            </Col>
                            <Col span={14} className="f-infor-col_14" >
                                <h3>Start capturing and sharing your moments.</h3>
                                <p>Get the app to share your first photo or video.</p>
                                <div className="f-infor-col_16--img">
                                    <img src={appStore} alt="Download on the App Store"/>
                                    <img src={chPlay} alt="Download on the CH Play"/>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                            <AppstoreAddOutlined />
                            CREATE POST
                            </span>
                        }
                        key="2"
                    >
                        <form onSubmit={this.onFinish}>
                            <Row className="f-infor-tab">
                                <Col span={10} className="f-infor-upload">
                                    <input 
                                        style={{
                                            display:"none"
                                        }} 
                                        type="file" 
                                        onChange={this.onChangeFile}
                                        ref={this.inputFile} />
                                    <div className="input-upload" onClick={() => this.inputFile.current.click()} >
                                        <PlusOutlined style={{fontSize:'30px'}} />
                                        { this.state.inputFile !== null ? <p className="test">{this.state.inputFile.name}</p> : <p className="test">Upload</p>}
                                    </div>
                                </Col>
                                <Col span={14}className="f-infor-input">
                                {this.state.failUpload === false ? <Alert
                                    message="Vui lòng upload file ảnh jpg hoặc png"
                                    type="error"
                                    showIcon
                                /> : '' }
                                    <label>Details : </label>
                                    <input type="text" value={this.state.inputTitle} onChange={this.onChange} name="inputTitle" placeholder="Title"/>
                                    <textarea placeholder="Description" value={this.state.inputDes} name="inputDes"  onChange={this.onChange}  ></textarea>
                                    <input style={{
                                            display:"none"
                                        }} 
                                        type="submit" 
                                        ref={this.inputSubmit} />
                                    <Button type="primary" style={{width:"30%"}} loading={this.state.postSuccess}  onClick={() => this.inputSubmit.current.click()}>Post</Button>
                                </Col>
                            </Row>
                        </form>
                    </TabPane>
                </Tabs>
            </Row>
        );
    }
}

export default PostProfile;
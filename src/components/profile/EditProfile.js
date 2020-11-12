import React,{Component} from 'react';

import 'antd/dist/antd.css';
import { Avatar, Button} from 'antd';

class EditProfile extends Component {
    constructor(){
        super();
        this.inputSubmit =  React.createRef();
        this.inputFile =  React.createRef();
    }
    render(){
        const {user, inputFullname, onChange, onEdit, onChangeFile, inputSelectFile, isEdit} = this.props;
        return (
            <>
            <form onSubmit={onEdit}>
                <table  style={{width : 500}}>
                        <tbody>
                            <tr>
                                <td style={{width : 150}} className="t-label_avartar"> <Avatar src={user.avatar} size={100} /></td>
                                <td  style={{width : 350}} className="t-input_file">
                                    <h2>{user.username}</h2>
                                    <input 
                                        style={{
                                            display:"none"
                                        }} 
                                        type="file" 
                                        ref={this.inputFile}
                                        onChange={onChangeFile} />
                                    <h3 onClick={() => this.inputFile.current.click()} >
                                    Change Profile Photo <span>{inputSelectFile !== null ? inputSelectFile.name : ""}</span>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 150}}  className="t-label">Name</td>
                                <td  style={{width : 350}} className="t-input">
                                    <input type="text" value={inputFullname} name="fullName" onChange={onChange} placeholder={user.fullname} required />
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 150}} className="t-label">Username</td>
                                <td  style={{width : 350}} className="t-input ">
                                    <input type="text"  className="readonly" placeholder={user.username}  readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 150}} className="t-label">Email</td>
                                <td  style={{width : 350}} className="t-input ">
                                    <input className="readonly" type="text"  placeholder={user.email} readOnly />
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 150}}></td>
                                <td  style={{width : 350}} >
                                    <input type="submit"
                                    style={{
                                        display:"none"
                                        }}  ref={this.inputSubmit}  />
                                    <Button type="primary" loading={isEdit} onClick={() => this.inputSubmit.current.click()}>Edit Profile</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>
        );
    }
}

export default EditProfile;
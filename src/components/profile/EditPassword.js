import React,{Component} from 'react';

import 'antd/dist/antd.css';
import {  Button, Alert } from 'antd';

class EditPassword extends Component {
    constructor(){
        super();
        this.inputSubmit =  React.createRef();
    }
    render(){
        const {onChange, onEdit, isEdit, isChangePass, inputVal} = this.props;
        return (
            <>
            <form onSubmit={onEdit}>
                <table  style={{width : 500}}>
                        <tbody>
                            <tr>
                                {isChangePass ? <td  colSpan={2}><Alert message="Mật khẩu không khớp nhau " type="error" /></td > : <td  colSpan={2}></td> }
                            </tr>
                            <tr>
                                <td style={{width : 200}}  className="t-label">Old Password</td>
                                <td  style={{width : 300}} className="t-input">
                                    <input type="password" name="inputOldPass" value={inputVal.inputOldPass}  onChange={onChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 200}} className="t-label">New Password</td>
                                <td  style={{width : 300}} className="t-input ">
                                    <input type="password" name="inputNewPass" value={inputVal.inputNewPass}   onChange={onChange} required />
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 200}} className="t-label">Confirm password</td>
                                <td  style={{width : 300}} className="t-input ">
                                    <input type="password" name="inputConPass" value={inputVal.inputConPass}   onChange={onChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width : 200}}></td>
                                <td  style={{width : 300}} >
                                    <input type="submit"
                                    style={{
                                        display:"none"
                                        }}  ref={this.inputSubmit}  />
                                    <Button type="primary" loading={isEdit} onClick={() => this.inputSubmit.current.click()}>Change Password</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>
        );
    }
}

export default EditPassword;
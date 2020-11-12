import React,{Component} from 'react';

import InforProfile from './InforProfile';
import PostProfile from './PostProfile';
class Profile extends Component {
    render(){
        return (
            <div className="Profile">
                <InforProfile />
                <PostProfile />
            </div>
        );
    }
}

export default Profile;
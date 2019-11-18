import React from "react";
import StudentProfilePage from "./StudentProfilePage";

const ProfilePage = () => {
    let user = JSON.parse(sessionStorage.getItem('User')).hasOwnProperty('firstname');
    return user ? <StudentProfilePage/> : <div>Not Implemented Yet</div>
};
export default ProfilePage;

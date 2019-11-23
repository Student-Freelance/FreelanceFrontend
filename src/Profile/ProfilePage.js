import React from "react";
import StudentProfilePage from "./StudentProfilePage";
import CompanyProfilePage from "./CompanyProfilePage";

const ProfilePage = () => {
    let user = JSON.parse(sessionStorage.getItem('User')).hasOwnProperty('firstname');
    return user ? <StudentProfilePage/> : <CompanyProfilePage/>
};
export default ProfilePage;

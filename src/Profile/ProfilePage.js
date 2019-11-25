import React from "react";
import StudentProfilePage from "./StudentProfilePage";
import CompanyProfilePage from "./CompanyProfilePage";
import {observer} from "mobx-react";
import {useStores} from "../index";

const ProfilePage = () => {
    const {userStore} = useStores();
    return userStore.isStudent ? <StudentProfilePage/> : <CompanyProfilePage/>
};
export default observer(ProfilePage);

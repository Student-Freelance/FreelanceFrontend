
import {withAuth} from "react-auth-guard";

const ProfilePage = ({auth}) => {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user.hasOwnProperty('firstname')){
        let freelancer = true;
    }
    if (user.hasOwnProperty('companyname')){
        let company = true;
    }
};

export default withAuth(ProfilePage);

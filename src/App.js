import React from 'react'
import Loading from "./Shared/Loading";
import Provider, {withAuth} from 'react-auth-guard'
import Authenticated from "./Authenticated/Authenticated";
import {useHistory} from "react-router-dom"
import {AxiosAgent} from "./Shared/Web/AxiosAgent";
import NotAuthenticated from "./NotAuthenticated/NotAuthenticated";

//Function used by react-auth-guard to fetch a user, and log in if successful.
const fetchUser = ({token}) => new Promise((resolve, reject) => {
    if (token.isUndefined) {
        token = localStorage.getItem("token")
    }
    if (token == null) {
        return reject()
    }
    AxiosAgent.SetConfig(token);
    AxiosAgent.GetMany('Account')
        .then(result => {
            sessionStorage.setItem('User', JSON.stringify(result.data));
            return resolve()
        })
        .catch(error => {
            console.log(error);
            return reject()
        });
});


const App = () => {
    //Handle DTU inside login, when getting callback from backend, find the token, extract it and set it to localstorage
    let history = useHistory();
    const token = new URLSearchParams(window.location.search).get('token');
    if (token != null && token.length > 0) {
        localStorage.setItem("token", token);
        history.push("/")
    }
    return (
        <Provider
            fetchUser={fetchUser}
            onLogin={() => {
                history.push("/");
            }}
            onLogout={() => {
                history.push("/");
                localStorage.clear();
                console.log("Logged out")
            }}
            onLoginFail={() => console.log("Failed to log in")}
        >
            {({authenticating, authenticated}) => (
                <Loading isLoading={authenticating}>
                    {
                        authenticated
                            ? <Authenticated/>
                            : <NotAuthenticated/>
                    }
                </Loading>
            )}
        </Provider>
    );
};
export default withAuth(App)

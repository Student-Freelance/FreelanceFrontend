import React from 'react'
import LoginPage from "./NotAuthenticated/LoginPage";
import Loading from "./Shared/Loading";
import Provider from 'react-auth-guard'
import Authenticated from "./Authenticated/Authenticated";
import {AxiosAgent} from "./Shared/Web/AxiosAgent";
import {useHistory} from "react-router-dom"


const fetchUser = ({token}) => new Promise((resolve, reject) => {
    new AxiosAgent(token).GetMany('Account')
        .then(result => {
            localStorage.setItem('User', JSON.stringify(result.data));
            return resolve()
        })
        .catch(error => {
            console.log(error);
            return reject()
        });
});

const App = () => {
    let history = useHistory();
    return (
        <Provider
            fetchUser={fetchUser}
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
                            : <LoginPage/>
                    }
                </Loading>
            )}
        </Provider>
    );
};
export default App

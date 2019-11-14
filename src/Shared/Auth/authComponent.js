import React  from 'react';
import { withRouter } from 'react-router';

export default function requireAuth(Component) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                auth: localStorage.get('token').isValid()
            }
        }
        componentDidMount() {
            this.checkAuth();
        }
        checkAuth() {
            const location = this.props.location;
            const redirect = location.pathname + location.search;
            if ( ! localStorage.get('token').isValid()) {
                this.props.history.push(`/login?redirect=${redirect}`);
            }
        }
        render() {
            return localStorage.get('token')
                ? <Component { ...this.props } />
                : null;
        }
    }
    return  withRouter(AuthenticatedComponent)
}
import * as React from "react";
import {connect} from "react-redux";

import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';


class UsersContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Users users={this.props.users} />
        );
    }
}

class Users extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let usersCards = this.props.users.map((user) =>
            <Card className={"users-card"} key={user.id}>
                <CardHeader
                    title={user.username}
                    subtitle={"#" + user.id}
                />
                <CardActions>
                    <Link to={'/tweets/' + user.id}>
                        <RaisedButton primary={true} label="See the tweets"/>
                    </Link>
                </CardActions>
            </Card>
        );

        return (
            <div>
                {usersCards ? usersCards : "Sorry, no users. Try to register one"}
            </div>
        );
    }
}



let mapStateToProps = (store) => ({
    users: store.users
});

export const UsersContainerCon = connect(mapStateToProps)(UsersContainer);

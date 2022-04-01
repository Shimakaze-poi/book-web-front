import React, {Component} from 'react';
import store from "./store";
import './styles/user.css'

class UserAchievement extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }

    componentWillUnmount = () =>
    {
        this.setState = (state, callback) =>
        {
        };
    }

    render()
    {
        return (
            <div id={'userAchievement'}>
                <h1>用户成就</h1>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserAchievement;
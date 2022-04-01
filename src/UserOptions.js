import React, {Component} from 'react';
import store from "./store";

class UserOptions extends Component
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
            <div>
                <h1>用户内容导航栏</h1>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserOptions;
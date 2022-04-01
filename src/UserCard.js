import React, {Component} from 'react';
import store from "./store";
import './styles/user.css'
import './styles/img.css'
import './styles/words.css'
import './styles/buttons.css'
import {Button} from "antd";

class UserCard extends Component
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
            <div id={'userCard'}>
                <img
                    id={'userBackImg'}
                    alt="userBackgroundImage"
                    src="https://s2.loli.net/2022/04/01/l9oUzdZEONiDufB.png"
                />
                <div id={'userCardBox'}>
                    <img
                        id={'userImg'}
                        alt="userImg"
                        src="https://s2.loli.net/2022/04/01/n69GlEBKJIQUz4R.png"
                    />
                    <p id={'userName'}>{this.state.currentAccount.accountname}</p>
                    <p id={'userUid'}>(uid={this.state.currentAccount.id})</p>
                    <p id={'userSignature'}>个性签名</p>
                    <Button id={'editAccountDataBut'} type="default" shape={'round'} disabled
                            onClick={() => {}}>
                        编辑个人资料
                    </Button>
                </div>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserCard;
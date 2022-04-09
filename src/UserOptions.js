import React, {Component} from 'react';
import store from "./store";
import {Menu} from "antd";
import './styles/informationleft.css'
import {actionChangeUserCentreTypes, actionUpdateArticles} from "./store/actionCreators";
import axios from "axios";

class UserOptions extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.updateArticles = this.updateArticles.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
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
            <div className={'secondOptions'}>
                <div className={'secondOptionsBox'}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.currentSecondOption]} mode="horizontal">
                        <Menu.Item key="动态">
                            动态
                        </Menu.Item>
                        <Menu.Item key="文章">
                            文章
                        </Menu.Item>
                        <Menu.Item key="评论">
                            评论
                        </Menu.Item>
                        <Menu.Item key="收藏">
                            收藏
                        </Menu.Item>
                        <Menu.Item key="交流">
                            交流
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }

    handleClick = e =>
    {
        const action = actionChangeUserCentreTypes(e.key);
        store.dispatch(action);
        if (e.key === "文章")
        {
            this.updateArticles();
        }
    };

    storeChange()
    {
        this.setState(store.getState());
    }

    updateArticles()
    {
        let searchMethod = ({
            id: this.state.currentAccount.id
        });
        axios.post(this.address + '/article/user', searchMethod).then((res) =>
        {
            const action = actionUpdateArticles(res.data);
            store.dispatch(action);
        });
    }
}

export default UserOptions;
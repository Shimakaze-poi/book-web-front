import React, {Component} from 'react';
import store from "./store";
import {Menu} from "antd";
import './styles/informationleft.css'
import {actionChangeUserCentreTypes, actionUpdateArticles, actionUpdateUserComments} from "./store/actionCreators";
import axios from "axios";

class UserOptions extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
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

    //个人中心二级导航栏选择
    handleClick = e =>
    {
        const action = actionChangeUserCentreTypes(e.key);
        store.dispatch(action);
        if (e.key === "文章")
        {
            this.updateArticles();
        }
        else if (e.key === "评论")
        {
            this.updateComments();
        }
    };

    //更新个人文章
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

    //更新评论
    updateComments()
    {
        let findSpecialInformation = ({
            userid: this.state.currentAccount.id
        });
        axios.post(this.address + '/comment/finduser', findSpecialInformation).then((res) => {
            const action = actionUpdateUserComments(res.data);
            store.dispatch(action);
        });
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserOptions;
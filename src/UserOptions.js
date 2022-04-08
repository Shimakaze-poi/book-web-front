import React, {Component} from 'react';
import store from "./store";
import {Menu} from "antd";
import './styles/informationleft.css'

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

    };

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserOptions;
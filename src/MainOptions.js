import React, {Component} from 'react';
import './styles/buttons.css'
import './styles/navigationbar.css'
import 'antd/dist/antd.css'
import {Menu} from "antd";
import store from "./store";
import {
    actionChangeInformationLeft,
    actionUpdateArticles,
    actionUpdateAuthors,
    actionUpdateBooks
} from "./store/actionCreators";
import axios from "axios";

class MainOptions extends Component
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
            <div id={'mainOptions'}>
                <div id={'mainOptionsBox'}>
                    <Menu onClick={(e) => {this.handleClick(e); window.scrollTo(0, 0)}} selectedKeys={[this.state.currentMainOption]} mode="horizontal">
                        <Menu.Item key="综合">
                            综合
                        </Menu.Item>
                        <Menu.Item key="书单">
                            书单
                        </Menu.Item>
                        <Menu.Item key="作家">
                            作家
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }

    //选择一级导航栏
    handleClick = e =>
    {
        const action = actionChangeInformationLeft(e.key);
        store.dispatch(action);
        if (e.key === "综合")
        {
            axios.get(this.address + '/article/findall').then((res) =>
            {
                const action = actionUpdateArticles(res.data);
                store.dispatch(action);
            });
        }
        else if (e.key === "书单")
        {
            axios.get(this.address + '/book/findall').then((res) =>
            {
                const action = actionUpdateBooks(res.data);
                store.dispatch(action);
            });
        }
        else if (e.key === "作家")
        {
            axios.get(this.address + '/author/findall').then((res) => {
                const action = actionUpdateAuthors(res.data);
                store.dispatch(action);
            });
        }
    };

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default MainOptions;
import React, {Component} from 'react';
import './styles/informationleft.css'
import {Input} from "antd";
import store from "./store";
import axios from "axios";
import {actionUpdateArticles} from "./store/actionCreators";

class ArticleOptions extends Component
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
                    <Input.Search allowClear shape={'round'} placeholder={"邂逅新感想..."}
                                  onSearch={this.onSearch}
                                  style={{width: 400}} enterButton/>
                </div>
            </div>
        );
    }

    //检索文章
    onSearch = value =>
    {
        let searchMethod = ({
            id: this.state.currentAccount.id,
            title: value
        });
        if (this.state.isShowUserCentre)
        {
            axios.post(this.address + '/article/searchuser', searchMethod).then((res) =>
            {
                const action = actionUpdateArticles(res.data);
                store.dispatch(action);
            });
        }
        else
        {
            axios.post(this.address + '/article/search', searchMethod).then((res) =>
            {
                const action = actionUpdateArticles(res.data);
                store.dispatch(action);
            });
        }
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default ArticleOptions;
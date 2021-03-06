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
        this.onSearch = this.onSearch.bind(this);
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

    storeChange()
    {
        this.setState(store.getState());
    }

    onSearch = value =>
    {
        let searchMethod = ({
            title: value
        });
        axios.post(this.address + '/article/search', searchMethod).then((res) =>
        {
            const action = actionUpdateArticles(res.data);
            store.dispatch(action);
        });
    }
}

export default ArticleOptions;
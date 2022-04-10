import React, {Component} from 'react';
import store from "./store";
import './styles/bookdetails.css'
import './styles/buttons.css'
import {Button, Descriptions, message, Rate} from "antd";
import {CloseOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {actionOpenComments, actionUnselectContent, actionUpdateBooks} from "./store/actionCreators";
import axios from "axios";

class BookDetails extends Component
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
            <div id={'bookDetails'}>
                <div id={'bookTopInformation'}>
                    <b id={'bookTitleDisplay'}>{this.state.selectedContent.name + "————" + this.state.selectedContent.shortintro}</b>
                    <Button className={'closeDetailsBut'} icon={<CloseOutlined/>} shape={'round'}
                            onClick={() => this.closeBookDetails()}>关闭</Button>
                </div>
                <div id={'bookContent'}>
                    <div id={'bookContentBox'}>
                        <Descriptions layout="vertical" bordered>
                            <Descriptions.Item label="作者">{this.state.selectedContent.author}</Descriptions.Item>
                            <Descriptions.Item label="作者国籍">{this.state.selectedContent.authornationality}</Descriptions.Item>
                            <Descriptions.Item label="出版日期">{this.state.selectedContent.publishdate}</Descriptions.Item>
                            <Descriptions.Item label="类别">{this.state.selectedContent.contenttype}</Descriptions.Item>
                            <Descriptions.Item label="文学体裁">{this.state.selectedContent.genre}</Descriptions.Item>
                            <Descriptions.Item label="字数">{this.state.selectedContent.wordnumber}</Descriptions.Item>
                            <Descriptions.Item label="所获荣誉" span={3}>{this.state.selectedContent.honor}</Descriptions.Item>
                            <Descriptions.Item label="简介" style={{whiteSpace: 'pre-wrap'}} span={3}>{this.state.selectedContent.introduction}</Descriptions.Item>
                            <Descriptions.Item label="段落摘抄" style={{whiteSpace: 'pre-wrap'}} span={3}>{this.state.selectedContent.extract}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div id={'bookRoot'}>
                    <div id={'bookRootLeft'}>
                        给本书评分：<Rate onChange={this.handleRateChange} allowHalf defaultValue={0} />
                    </div>
                    <div id={'bookRootRight'}>
                        <Button icon={<MenuUnfoldOutlined/>} type={'primary'} shape={'round'}
                                onClick={() => this.openComments()}>
                            展开/收起评论
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    //更改书籍评分
    handleRateChange = value =>
    {
        this.rateInfo();
        let changeScoreInformation = ({
            id: this.state.selectedContent.id,
            score: value
        });
        axios.post(this.address + '/book/rate', changeScoreInformation);
    };

    //关闭书籍详情页面
    closeBookDetails()
    {
        const action = actionUnselectContent();
        store.dispatch(action);
        if (this.state.currentSecondOption === '全部')
        {
            axios.get(this.address + '/book/findall').then((res) =>
            {
                const action = actionUpdateBooks(res.data);
                store.dispatch(action);
            });
        }
        else
        {
            let listBooks = ({
                contenttype: this.state.currentSecondOption
            });
            axios.post(this.address + '/book/find', listBooks).then((res) =>
            {
                const action = actionUpdateBooks(res.data);
                store.dispatch(action);
            });
        }
    }

    //展开/收起评论
    openComments()
    {
        const action = actionOpenComments();
        store.dispatch(action);
    }

    //评分后页面上方提示信息
    rateInfo()
    {
        message.info({
            content: "感谢您为其他读者作出的参考！",
            className: 'custom-class',
            style: {
                marginTop: '10vh',
            },
        });
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default BookDetails;
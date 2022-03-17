import React, {Component} from 'react';
import './styles/articledetails.css'
import './styles/buttons.css'
import './styles/words.css'
import store from "./store";
import {CloseOutlined, CaretUpOutlined, CaretDownOutlined, MenuUnfoldOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Avatar} from "antd";
import {
    actionChangeArticle, actionChangeToWrite,
    actionOpenComments,
    actionUnselectContent,
    actionUpdateArticles
} from "./store/actionCreators";
import axios from "axios";
import {CSSTransition} from "react-transition-group";

class ArticleDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        // 订阅store更改
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.closeArticleDetails = this.closeArticleDetails.bind(this);
        this.changeApproval = this.changeApproval.bind(this);
        this.approvalInfo = this.approvalInfo.bind(this);
        this.disApprovalInfo = this.disApprovalInfo.bind(this);
        this.openComments = this.openComments.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.changeArticle = this.changeArticle.bind(this);
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
            <div id={'articleDetails'}>
                <div id={'articleAuthorInformation'}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" size={'large'} style={{marginLeft: 15, marginTop: 15}} />
                    <b id={'articleAuthorDisplay'}>{this.state.selectedContent.author + " " + (this.state.selectedContent.authorid === 0 ? '' : (this.state.selectedContent.author === '四月鱼' ? '' : "(uid=" + this.state.selectedContent.authorid + ")"))}</b>
                    <CSSTransition in={this.state.selectedContent.authorid === this.state.currentAccount.id} timeout={0} classNames="dom" unmountOnExit>
                        <Button icon={<EditOutlined/>} shape={'round'} style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 0, marginLeft: 'auto'}}
                                onClick={this.changeArticle}>
                            修改
                        </Button>
                    </CSSTransition>
                    <CSSTransition in={this.state.selectedContent.authorid === this.state.currentAccount.id} timeout={0} classNames="dom" unmountOnExit>
                        <Button icon={<CloseOutlined/>} shape={'round'} style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 0, marginLeft: 'auto'}}
                                onClick={this.deleteArticle}>
                            删除
                        </Button>
                    </CSSTransition>
                    <Button className={'closeDetailsBut'} icon={<CloseOutlined/>} shape={'round'}
                            onClick={this.closeArticleDetails}>关闭</Button>
                </div>
                <div id={'articleContent'}>
                    <div id={'articleContentHeadBox'}>
                        <p id={'contentTitle'}>{this.state.selectedContent.title}</p><br/>
                        <b id={'contentType'}>{this.state.selectedContent.contenttype + " " + this.state.selectedContent.contentcategory}</b>
                        <b id={'declaration'}>{this.state.selectedContent.contentdeclaration}</b>
                    </div>
                    <div id={'articleContentBox'}>
                        <br/>
                        <b id={'content'}>{this.state.selectedContent.content}</b>
                        <br/><br/>
                    </div>
                </div>
                <div id={'articleRoot'}>
                    <div id={'articleRootLeft'}>
                        <Button icon={<CaretUpOutlined/>} shape={'round'}
                                onClick={() => {this.changeApproval(1); this.approvalInfo(this.state.selectedContent.author);}}>
                            赞同
                        </Button>
                        <Button icon={<CaretDownOutlined/>} shape={'round'} style={{marginLeft: 15}}
                                onClick={() => {this.changeApproval(-1); this.disApprovalInfo(this.state.selectedContent.author);}}>
                            反对
                        </Button>
                    </div>
                    <div id={'articleRootRight'}>
                        <b>{this.state.selectedContent.publishdate}</b>
                        <Button icon={<MenuUnfoldOutlined/>} type={'primary'} shape={'round'} style={{marginLeft: 15}}
                                onClick={this.openComments}>
                            展开/收起评论
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    changeArticle()
    {
        const action = actionChangeArticle();
        store.dispatch(action);
        const action2 = actionChangeToWrite();
        store.dispatch(action2);
    }

    deleteArticle()
    {
        let deleteMethod = ({
            id: this.state.selectedContent.id
        });
        axios.post(this.address + '/article/delete', deleteMethod);
        message.info({
            content: '正在删除...',
            style: {marginTop: '10vh'}
        });
        setTimeout(() => {
            this.closeArticleDetails();
        }, 1000)
    }

    storeChange()
    {
        this.setState(store.getState());
    }

    closeArticleDetails()
    {
        const action = actionUnselectContent();
        store.dispatch(action);
        axios.get(this.address + '/article/findall').then((res) =>
        {
            const action = actionUpdateArticles(res.data);
            store.dispatch(action);
        });
    }

    changeApproval(num)
    {
        let changeApprovalInformation = ({
            id: this.state.selectedContent.id,
            num: num
        });
        axios.post(this.address + '/article/changeapproval', changeApprovalInformation);
    }

    approvalInfo(author)
    {
        message.info({
            content: author + ": 感谢您的赞同！",
            className: 'custom-class',
            style: {
                marginTop: '10vh',
            },
        });
    }

    disApprovalInfo(author)
    {
        message.info({
            content: author + ": 谢谢，已经裂开了...",
            className: 'custom-class',
            style: {
                marginTop: '10vh',
            },
        });
    }

    openComments()
    {
        const action = actionOpenComments();
        store.dispatch(action);
    }
}

export default ArticleDetails;
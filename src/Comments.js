import React, {Component} from 'react';
import './styles/comments.css'
import {Button, Comment, Input, List, message} from 'antd';
import store from "./store";
import axios from "axios";
import {CloseOutlined, SendOutlined} from "@ant-design/icons";
import {actionUpdateComments} from "./store/actionCreators";
import {CSSTransition} from "react-transition-group";

const { TextArea } = Input;

class Comments extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.changeAuthor = this.changeAuthor.bind(this);
        this.changeComments = this.changeComments.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.releaseComments = this.releaseComments.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.author = '';
        this.comment = '';
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    componentDidMount()
    {
        this.updateComments();
    }

    updateComments()
    {
        let findSpecialInformation = ({
            contenttype: this.state.selectedContent.contenttype,
            contentid: this.state.selectedContent.id
        });
        axios.post(this.address + '/comment/findspecial', findSpecialInformation).then((res) => {
            const action = actionUpdateComments(res.data);
            store.dispatch(action);
        });
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
            <div id={'comments'}>
                <div id={'commentsbox'}>
                    <Input onChange={this.changeAuthor} placeholder="作者" disabled={!this.state.canEditAuthorName} allowClear style={{ height: 32, width: 200, marginTop: 15 }} />
                    <TextArea onChange={this.changeComments} id={'editTextArea'} showCount maxLength={100}
                              placeholder="友善的评论是交流的起点" style={{ height: 64, marginTop: 15, marginBottom: 15 }} />
                    <Button icon={<SendOutlined/>} block type={'primary'} shape={'round'}
                            onClick={this.releaseComments} style={{marginBottom: 15}}>发布</Button>
                    <List
                        className="comment-list"
                        header={`共有${this.state.commentList.length}条评论`}
                        itemLayout="horizontal"
                        dataSource={this.state.commentList}
                        renderItem={item => (
                            <li style={{display: 'flex'}}>
                                <Comment
                                    style={{whiteSpace: 'pre-wrap'}}
                                    author={item.author}
                                    avatar='https://joeschmoe.io/api/v1/random'
                                    content={item.comment}
                                    datetime={(item.authorid === 0 ? '' : "(uid=" + item.authorid + ") ") + item.publishdate}
                                />
                                <CSSTransition in={item.authorid === this.state.currentAccount.id} timeout={0} classNames="dom" unmountOnExit>
                                    <Button icon={<CloseOutlined/>} shape={'round'} style={{marginTop: 15, marginRight: 0, marginLeft: 'auto'}}
                                            onClick={() => this.deleteComment(item.id)}>
                                        删除
                                    </Button>
                                </CSSTransition>
                            </li>
                        )}
                    />
                </div>
            </div>
        );
    }

    deleteComment(id)
    {
        let deleteMethod = ({
            id: id
        });
        axios.post(this.address + '/comment/delete', deleteMethod);
        message.info({
            content: '正在删除...',
            style: {marginTop: '10vh'}
        });
        setTimeout(() => {
            this.updateComments();
        }, 1000)
    }

    storeChange()
    {
        this.setState(store.getState());
    }

    changeAuthor = e =>
    {
        this.author = e.target.value;
    }

    changeComments = e =>
    {
        this.comment = e.target.value;
    }

    releaseComments()
    {
        if (!this.state.canEditAuthorName)
        {
            this.author = this.state.currentAccount.accountname;
        }
        if (this.author === '' || this.comment === '')
        {
            if (this.author === '')
            {
                message.error({
                    content: '作者不能为空',
                    style: {marginTop: '10vh'}
                });
            }
            if (this.comment === '')
            {
                message.error({
                    content: '评论内容不能为空',
                    style: {marginTop: '10vh'}
                });
            }
        }
        else
        {
            let date = new Date();
            let newComment = ({
                id: null,
                author: this.author,
                contenttype: this.state.selectedContent.contenttype,
                contentid: this.state.selectedContent.id,
                comment: this.comment,
                publishdate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                authorid: this.state.canEditAuthorName ? 0 : this.state.currentAccount.id
            });
            message.info({
                content: '正在发送...',
                style: {marginTop: '10vh'}
            });
            axios.post(this.address + '/comment/add', newComment);
            setTimeout(() => {
                this.updateComments();
            }, 1000)
        }
    }
}

export default Comments;
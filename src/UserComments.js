import React, {Component} from 'react';
import store from "./store";
import axios from "axios";
import {Button, List, message} from "antd";
import './styles/words.css'
import {CloseOutlined} from "@ant-design/icons";
import {actionSelectContent, actionUpdateComments, actionUpdateUserComments} from "./store/actionCreators";

class UserComments extends Component
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
            <div>
                <List
                    style={{paddingBottom: 15, paddingLeft: 15, paddingRight: 15}}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page =>
                        {
                            /*console.log('切换到第' + page + '页');*/
                        },
                        pageSize: 10,
                    }}
                    dataSource={this.state.userCommentList}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            style={{whiteSpace: 'pre-wrap'}}
                        >
                            <div style={{display: 'flex'}}>
                                <List.Item.Meta
                                    title={<Button id={'contentTitleOnOverview'} type={'text'} style={{padding: 0}} onClick={() => {this.selectContent(item); window.scrollTo(0, 0)}}>
                                        <span style={{color: "gray"}}>{"「" + item.contenttype + "」"}</span>{item.contentname}</Button>}
                                    description={item.publishdate}
                                />
                                <Button icon={<CloseOutlined/>} shape={'round'} style={{marginTop: 0, marginRight: 0}}
                                        onClick={() => this.deleteComment(item.id)}>
                                    删除
                                </Button>
                            </div>
                            {item.comment}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    //选中文章/书籍跳转到详情界面
    selectContent(content)
    {
        if (content.contenttype === "书籍")
        {
            let findBook = ({
                id: content.contentid
            });
            axios.post(this.address + '/book/findid', findBook).then((res) => {
                const action = actionSelectContent(res.data, 'book');
                store.dispatch(action);
            });
        }
        else if (content.contenttype === "文章")
        {
            let findArticle = ({
                id: content.contentid
            });
            axios.post(this.address + '/article/findid', findArticle).then((res) => {
                const action = actionSelectContent(res.data, 'article');
                store.dispatch(action);
            });
        }
    }

    //更新用户评论
    updateUserComments()
    {
        let findSpecialInformation = ({
            userid: this.state.currentAccount.id
        });
        axios.post(this.address + '/comment/finduser', findSpecialInformation).then((res) => {
            const action = actionUpdateUserComments(res.data);
            store.dispatch(action);
        });
    }

    //更新评论
    updateComments()
    {
        let findSpecialInformation = ({
            contenttype: this.state.isShowBookDetails ? "书籍" : "文章",
            contentid: this.state.selectedContent.id
        });
        axios.post(this.address + '/comment/findspecial', findSpecialInformation).then((res) => {
            const action = actionUpdateComments(res.data);
            store.dispatch(action);
        });
    }

    //删除评论
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
            this.updateUserComments();
            if (this.state.isShowComments)
            {
                this.updateComments();
            }
        }, 1000)
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserComments;
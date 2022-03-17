import React, {Component} from 'react';
import {QuestionOutlined, RollbackOutlined, SendOutlined, ReloadOutlined} from "@ant-design/icons";
import store from "./store";
import {actionChangeToSyn, actionNoChangeArticle} from "./store/actionCreators"
import './styles/editarticle.css'
import {Input, Cascader, Switch, Select, Popover, Button, message} from 'antd';
import axios from "axios";
import {CSSTransition} from "react-transition-group";

const options = [
    {
        value: '随想',
        label: '随想'
    },
    {
        value: '书评',
        label: '书评',
        children: [
            {
                value: '哲学',
                label: '哲学'
            },
            {
                value: '自然应用科学',
                label: '自然应用科学'
            },
            {
                value: '人文社会科学',
                label: '人文社会科学'
            },
            {
                value: '文学',
                label: '文学'
            },
            {
                value: '历史',
                label: '历史'
            },
        ]
    }
];
const content = (
    <div>
        <p>「创作声明」是为自己创作的内容添加个人声明的工具。创作声明表达的是创作者对内容负责的态度。</p>
        <p>当你在创作特定内容（如内容存在虚构或剧透等情节）时，可设置创作声明，该声明将会展示在文章预览与文章开头。</p>
        <p>创作声明可以方便其他用户更好地辨识和理解内容信息。</p>
    </div>
);
const { TextArea } = Input;
const { Option } = Select;

class EditArticle extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.author = '';
        this.title = this.state.isChangeArticle ? this.state.selectedContent.title : '';
        this.type = '';
        this.content = this.state.isChangeArticle ? this.state.selectedContent.content : '';
        this.declaration = '';
        this.isAnonymous = false;
        this.changeToSyn = this.changeToSyn.bind(this);
        this.releaseArticle = this.releaseArticle.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.changeDeclaration = this.changeDeclaration.bind(this);
        this.changeSwitch = this.changeSwitch.bind(this);
        this.changeAuthor = this.changeAuthor.bind(this);
        this.changeArticle = this.changeArticle.bind(this);
        this.verifyArticle = this.verifyArticle.bind(this);
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
            <div id={'editArticle'}>
                <div id={'authorEditInformation'}>
                    <Input onChange={this.changeAuthor} placeholder="作者" disabled={!this.state.canEditAuthorName} allowClear style={{ height: 32, width: 400, marginLeft: 15, marginTop: 19 }} />
                </div>
                <div id={'editInformation'}>
                    <Input onChange={this.changeTitle} defaultValue={this.state.isChangeArticle ? this.state.selectedContent.title : ''} placeholder="起个标题吧" allowClear style={{ height: 32, width: 400, margin: 15 }} />
                    <br />
                    <Cascader onChange={this.changeType} placeholder="请选择文章类别" options={options} changeOnSelect style={{ height: 32, width: 400, marginLeft: 15, marginRight: 15, marginBottom: 15 }} />
                    <TextArea onChange={this.changeContent} defaultValue={this.state.isChangeArticle ? this.state.selectedContent.content : ''} id={'editTextArea'} showCount placeholder="写文章..." style={{ height: 550, marginLeft: 15, marginRight: 15, marginBottom: 15 }} />
                </div>
                <div id={'editOptions'}>
                    <div className={'editOptionsBox'}>
                        <Select onChange={this.changeDeclaration} placeholder="创作声明" allowClear style={{ width: 120, marginRight: 5 }}>
                            <Option value="包含剧透">包含剧透</Option>
                            <Option value="虚构创作">虚构创作</Option>
                        </Select>
                        <Popover content={content} title="什么是「创作声明」？" trigger="hover">
                            <QuestionOutlined />
                        </Popover>
                        <Switch onClick={this.changeSwitch} checkedChildren="匿名" unCheckedChildren="不匿名" style={{ width: 70, marginLeft: 30 }} />
                    </div>
                    <div className={'editOptionsBox'}>
                        <Button icon={<RollbackOutlined/>} shape={'round'} onClick={this.changeToSyn}>取消</Button>
                        <CSSTransition in={this.state.isChangeArticle} timeout={0} classNames="dom" unmountOnExit>
                            <Button icon={<ReloadOutlined/>} type={'primary'} shape={'round'} style={{marginLeft: 15}}
                                    onClick={this.changeArticle}>
                                更新
                            </Button>
                        </CSSTransition>
                        <CSSTransition in={!this.state.isChangeArticle} timeout={0} classNames="dom" unmountOnExit>
                            <Button icon={<SendOutlined/>} type={'primary'} shape={'round'} style={{marginLeft: 15}}
                                    onClick={this.releaseArticle}>
                                发布
                            </Button>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        );
    }

    verifyArticle()
    {
        if (!this.state.canEditAuthorName)
        {
            this.author = this.state.currentAccount.accountname;
        }
        if ((this.author === '' && !this.isAnonymous) || this.title === '' || this.type === '' || this.type.length === 0 || this.content === '')
        {
            if (this.author === '' && !this.isAnonymous)
            {
                message.error({
                    content: '请填写文章作者或匿名',
                    style: {marginTop: '10vh'}
                });
            }
            if (this.title === '')
            {
                message.error({
                    content: '文章标题不能为空',
                    style: {marginTop: '10vh'}
                });
            }
            if (this.type === '' || this.type.length === 0)
            {
                message.error({
                    content: '请选择文章类别',
                    style: {marginTop: '10vh'}
                });
            }
            if (this.content === '')
            {
                message.error({
                    content: '文章内容不能为空',
                    style: {marginTop: '10vh'}
                });
            }
            return false;
        }
        return true;
    }

    changeArticle()
    {
        if (this.verifyArticle())
        {
            let date = new Date();
            let newArticle = ({
                id: this.state.selectedContent.id,
                author: this.isAnonymous? '四月鱼' : this.author,
                title: this.title,
                contenttype: this.type[0],
                contentcategory: this.type.length === 2 ? this.type[1] : '',
                contentdeclaration: this.declaration,
                content: this.content,
                publishdate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                approval: 0,
                comment: 0,
                authorid: this.state.canEditAuthorName ? 0 : this.state.currentAccount.id
            });
            message.info({
                content: '正在更新...',
                style: {marginTop: '10vh'}
            });
            axios.post(this.address + '/article/add', newArticle);
            setTimeout(() => {
                this.changeToSyn();
            }, 1000)
        }
    }

    storeChange()
    {
        this.setState(store.getState());
    }

    changeAuthor = e =>
    {
        this.author = e.target.value;
    }

    changeTitle = e =>
    {
        this.title = e.target.value;
    }

    changeType(value)
    {
        this.type = value;
    }

    changeContent = e =>
    {
        this.content = e.target.value;
    }

    changeDeclaration(value)
    {
        this.declaration = value;
    }

    changeSwitch = () =>
    {
        this.isAnonymous = !this.isAnonymous;
    }

    // 进行文章发布相关校验
    releaseArticle()
    {
        if (this.verifyArticle())
        {
            let date = new Date();
            let newArticle = ({
                id: null,
                author: this.isAnonymous? '四月鱼' : this.author,
                title: this.title,
                contenttype: this.type[0],
                contentcategory: this.type.length === 2 ? this.type[1] : '',
                contentdeclaration: this.declaration,
                content: this.content,
                publishdate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                approval: 0,
                comment: 0,
                authorid: this.state.canEditAuthorName ? 0 : this.state.currentAccount.id
            });
            message.info({
                content: '正在发送...',
                style: {marginTop: '10vh'}
            });
            window.scrollTo(0, 0);
            axios.post(this.address + '/article/add', newArticle);
            setTimeout(() => {
                this.changeToSyn();
            }, 1000)
        }
    }

    // 进行返回到主界面的组件切换
    changeToSyn()
    {
        const action = actionNoChangeArticle();
        store.dispatch(action);
        const action2 = actionChangeToSyn();
        store.dispatch(action2);
    }
}

export default EditArticle;
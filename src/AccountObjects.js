import React, {Component} from 'react';
import './styles/navigationbar.css'
import './styles/buttons.css'
import {Button, Modal, Input, Space, message} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import store from "./store";
import {
    actionChangeInformationLeft,
    actionChangeLoginPage,
    actionChangeToUserCentre,
    actionLoginIn,
    actionLoginOut
} from "./store/actionCreators";
import axios from "axios";
import {CSSTransition} from "react-transition-group";
import { JSEncrypt } from 'jsencrypt'

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

class AccountObjects extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.accountName = '';
        this.accountPwd = '';
        this.changeAccountName = this.changeAccountName.bind(this);
        this.changeAccountPwd = this.changeAccountPwd.bind(this);
        this.verifyRegister = this.verifyRegister.bind(this);
        this.searchAccount = this.searchAccount.bind(this);
        this.addAccount = this.addAccount.bind(this);
        this.searchAccountName = this.searchAccountName.bind(this);
        this.verifyLogin = this.verifyLogin.bind(this);
        this.loginOut = this.loginOut.bind(this);
        this.openAccountDetails = this.openAccountDetails.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
        this.publicKey = this.$config.publicKey;
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
            <div id={'accountObjects'}>
                <div id={'accountOptionsBox'}>
                    <CSSTransition in={this.state.isShowAfterLogin} timeout={500} classNames="dom" unmountOnExit>
                        <b>欢迎，{this.state.currentAccount.accountname}</b>
                    </CSSTransition>
                    <CSSTransition in={this.state.isShowAfterLogin} timeout={500} classNames="dom" unmountOnExit>
                        <Button className={'accountOptionBut'} shape={'round'}
                                onClick={this.openAccountDetails}>
                            个人中心
                        </Button>
                    </CSSTransition>
                    <CSSTransition in={this.state.isShowAfterLogin} timeout={500} classNames="dom" unmountOnExit>
                        <Button className={'accountOptionBut'} type="dashed" shape={'round'}
                                onClick={this.loginOut}>
                            登出
                        </Button>
                    </CSSTransition>
                    <CSSTransition in={this.state.isShowBeforeLogin} timeout={0} classNames="dom" unmountOnExit>
                        <Button className={'accountOptionBut'} type="dashed" shape={'round'}
                                onClick={() => this.setModalVisible(true)}>
                            登录/注册
                        </Button>
                    </CSSTransition>
                    <Modal
                        title="登录/注册"
                        centered
                        visible={this.state.isShowLoginPage}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                        footer={[
                            <Button key="login" type="primary" onClick={() =>
                            {
                                this.verifyLogin();
                            }}>
                                登录
                            </Button>,
                            <Button key="register" onClick={() =>
                            {
                                this.verifyRegister();
                            }}>
                                注册
                            </Button>
                        ]}
                    >
                        <Space direction="vertical">
                            <Input placeholder="用户名" onChange={this.changeAccountName} allowClear />
                            <Input.Password
                                placeholder="密码"
                                onChange={this.changeAccountPwd}
                                allowClear
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Space>
                    </Modal>
                </div>
            </div>
        );
    }

    async verifyRegister()
    {
        let accountNamePattern = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{2,16}$/;
        let accountPwdPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?.]).*$/;

        if ((!accountNamePattern.test(this.accountName)) || (!accountPwdPattern.test(this.accountPwd)) || (this.accountName === '四月鱼'))
        {
            if (!accountNamePattern.test(this.accountName))
            {
                message.error({
                    content: '用户名2到16位（汉字，字母，数字，下划线，减号）',
                    style: {marginTop: '9vh'}
                });
            }
            if (!accountPwdPattern.test(this.accountPwd))
            {
                message.error({
                    content: '密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
                    style: {marginTop: '9vh'}
                });
            }
            if (this.accountName === '四月鱼')
            {
                message.error({
                    content: '所选用户名为本网站匿名用户专用',
                    style: {marginTop: '9vh'}
                });
            }
        }
        else
        {
            if (await this.searchAccountName())
            {
                message.error({
                    content: '该用户已存在',
                    style: {marginTop: '9vh'}
                });
            }
            else
            {
                this.addAccount();
                message.success({
                    content: '注册成功',
                    style: {marginTop: '9vh'}
                });
            }
        }
    }

    async verifyLogin()
    {
        let account = ({
            accountname: this.accountName,
            accountpwd: this.accountPwd
        });

        let returnAccount = await this.searchAccount(account);
        if (returnAccount !== '')
        {
            message.success({
                content: '登录成功',
                style: {marginTop: '9vh'}
            });
            this.setModalVisible(false);
            const action = actionLoginIn(returnAccount);
            store.dispatch(action);
        }
        else
        {
            message.error({
                content: '用户名或密码错误',
                style: {marginTop: '9vh'}
            });
        }
    }

    async searchAccount(account)
    {
        let result = null;
        axios.post(this.address + '/account/findaccount', account).then(async (res) =>
        {
            result = res.data;
        });
        await sleep(1000);
        return result;
    }

    async searchAccountName()
    {
        let result = false;
        let account = ({
            accountname: this.accountName
        });
        axios.post(this.address + '/account/findaccountname', account).then(async (res) =>
        {
            result = res.data;
        });
        await sleep(1000);
        return result;
    }

    addAccount()
    {
        let encryptor = new JSEncrypt();
        encryptor.setPublicKey(this.publicKey);
        let password = encryptor.encrypt(this.accountPwd);
        let account = ({
            id: null,
            accountname: this.accountName,
            accountpwd: password
        });
        axios.post(this.address + '/account/add', account);
    }

    changeAccountName = e =>
    {
        this.accountName = e.target.value;
    }

    changeAccountPwd = e =>
    {
        this.accountPwd = e.target.value;
    }

    setModalVisible(modalVisible)
    {
        const action = actionChangeLoginPage(modalVisible);
        store.dispatch(action);
    }

    loginOut()
    {
        const action = actionLoginOut();
        store.dispatch(action);
        if (this.state.isShowUserCentre === true)
        {
            const action = actionChangeInformationLeft("综合");
            store.dispatch(action);
        }
        message.info({
            content: '已登出',
            style: {marginTop: '9vh'}
        });
    }

    openAccountDetails()
    {
        const action = actionChangeToUserCentre();
        store.dispatch(action);
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default AccountObjects;
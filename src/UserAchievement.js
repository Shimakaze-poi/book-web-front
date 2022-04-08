import React, {Component} from 'react';
import store from "./store";
import './styles/user.css'
import './styles/words.css'
import './styles/divider.css'
import {Divider, Popover} from 'antd';
import {LikeOutlined, HeartOutlined, StarOutlined, UsergroupAddOutlined, QuestionOutlined} from "@ant-design/icons";

const content = (
    <div>
        <p>「公共编辑」是与其他用户共同编辑书籍/作家信息的功能。</p>
        <p>当你发现某条资料没有被网站收录，或目前信息不完整时，</p>
        <p>可参与「公共编辑」，编辑结果经审核后会展示在网站中。</p>
    </div>
);

class UserAchievement extends Component
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
            <div id={'userAchievement'}>
                <p id={'userAchievementTitle'}>个人成就</p>
                <Divider className={'divider'}/>
                <div id={'userAchievementBox'}>
                    <LikeOutlined style={{ fontSize: '32px', marginBottom: '15px', marginRight: '15px', float: 'left' }}/>
                    <p className={'userAchievementContent'}>获得 {0} 次赞同</p><br/>
                    <HeartOutlined style={{ fontSize: '32px', marginBottom: '15px', marginRight: '15px', float: 'left' }}/>
                    <p className={'userAchievementContent'}>收到 {0} 次感谢</p><br/>
                    <StarOutlined style={{ fontSize: '32px', marginBottom: '15px', marginRight: '15px', float: 'left' }}/>
                    <p className={'userAchievementContent'}>作品被收藏 {0} 次</p><br/>
                    <UsergroupAddOutlined style={{ fontSize: '32px', marginBottom: '15px', marginRight: '15px', float: 'left' }}/>
                    <p className={'userAchievementContent'} style={{float: 'left', marginRight: '15px'}}>参与 {0} 次公共编辑</p>
                    <Popover content={content} placement='bottom' title="什么是「公共编辑」？" trigger="hover">
                        <QuestionOutlined style={{ fontSize: '32px', opacity: '0.1' }}/>
                    </Popover><br/>
                </div>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserAchievement;
import React, {Component} from 'react';
import './styles/informationleft.css'
import './styles/words.css'
import {List, Space, Button} from 'antd';
import {MessageOutlined, LikeOutlined} from '@ant-design/icons';
import store from "./store";
import {actionSelectContent, actionUpdateArticles} from "./store/actionCreators";
import axios from "axios";

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class ArticleOverview extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.selectContent = this.selectContent.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    componentDidMount()
    {
        axios.get(this.address + '/article/findall').then((res) =>
        {
            const action = actionUpdateArticles(res.data);
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
            <div className={'overview'}>
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
                    dataSource={this.state.articleList}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText icon={LikeOutlined} text={item.approval} key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text={item.comment} key="list-vertical-message"/>,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    // src="https://s2.loli.net/2021/12/23/X9JdjKG2urvbx5W.jpg"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<Button id={'contentTitleOnOverview'} type={'text'} style={{padding: 0}} onClick={() => {this.selectContent(item); window.scrollTo(0, 0)}}>{item.title.length > 30 ? (item.title.substring(0, 30) + "...") : item.title}</Button>}
                                description={item.contenttype + " " + item.contentcategory + " " + item.contentdeclaration}
                            />
                            {item.content.length > 100 ? (item.content.substring(0, 100) + '...') : item.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }

    // 选中文章跳转到详情界面
    selectContent(content)
    {
        const action = actionSelectContent(content, 'article');
        store.dispatch(action);
    }
}

export default ArticleOverview;
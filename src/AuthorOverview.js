import React, {Component} from 'react';
import './styles/informationleft.css'
import {Card, List, Drawer, Descriptions} from "antd";
import store from "./store";
import axios from "axios";
import {actionChangeDrawer, actionUpdateAuthors} from "./store/actionCreators";

const { Meta } = Card;

class AuthorOverview extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.updateAuthors = this.updateAuthors.bind(this);
        this.onChangeDrawer = this.onChangeDrawer.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    componentDidMount()
    {
        this.updateAuthors();
    }

    updateAuthors()
    {
        axios.get(this.address + '/author/findall').then((res) => {
            const action = actionUpdateAuthors(res.data);
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
                    style={{margin: 15}}
                    grid={{ gutter: 15, column: 3 }}
                    pagination={{
                        onChange: page =>
                        {
                            console.log('切换到第' + page + '页');
                        },
                        pageSize: 15,
                    }}
                    dataSource={this.state.authorList}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                // style={{ width: 227 }}
                                onClick={() => {this.onChangeDrawer(item)}}
                                hoverable
                                // cover={<img alt="封面" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                cover={<img alt="封面" src={item.imageurl === '' ? 'https://s2.loli.net/2021/12/23/X9JdjKG2urvbx5W.jpg' : item.imageurl} />}
                            >
                                <Meta title={item.name} description={item.shortintro} />
                            </Card>
                        </List.Item>
                    )}
                />
                <Drawer id={'drawer'} size={'large'} title="作家详细信息" placement="right" onClose={this.onChangeDrawer} visible={this.state.isShowDrawer}>
                    <Descriptions title={this.state.selectedAuthor.name} layout="vertical" bordered>
                        <Descriptions.Item label="国籍">{this.state.selectedAuthor.nationality}</Descriptions.Item>
                        <Descriptions.Item label="生平" span={2}>{this.state.selectedAuthor.lifetime}</Descriptions.Item>
                        <Descriptions.Item label="代表作" span={3}>{this.state.selectedAuthor.masterwork}</Descriptions.Item>
                        <Descriptions.Item label="所获荣誉" span={3}>{this.state.selectedAuthor.honor}</Descriptions.Item>
                        <Descriptions.Item style={{whiteSpace: 'pre-wrap'}} label="详细介绍" span={3}>{this.state.selectedAuthor.introduction}</Descriptions.Item>
                    </Descriptions>
                </Drawer>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }

    onChangeDrawer(author)
    {
        const action = actionChangeDrawer(author);
        store.dispatch(action);
    }
}

export default AuthorOverview;
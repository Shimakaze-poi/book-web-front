import React, {Component} from 'react';
import './styles/informationleft.css'
import {Card, List, Rate} from 'antd';
import store from "./store";
import axios from "axios";
import {actionSelectContent, actionUpdateBooks} from "./store/actionCreators";

const { Meta } = Card;

class BookOverview extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    componentDidMount = () =>
    {
        this.updateBooks();
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
                    dataSource={this.state.bookList}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={<img alt="封面" src={item.imageurl === '' ? 'https://s2.loli.net/2021/12/23/X9JdjKG2urvbx5W.jpg' : item.imageurl} />}
                                onClick={() => {this.selectContent(item); window.scrollTo(0, 0)}}
                            >
                                <Meta title={item.name} description={item.shortintro} />
                                <br/>
                                <Rate allowHalf disabled value={item.score} />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    //更新书籍
    updateBooks()
    {
        axios.get(this.address + '/book/findall').then((res) =>
        {
            const action = actionUpdateBooks(res.data);
            store.dispatch(action);
        });
    }

    // 选中书籍跳转到详情界面
    selectContent(content)
    {
        const action = actionSelectContent(content, 'book');
        store.dispatch(action);
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default BookOverview;
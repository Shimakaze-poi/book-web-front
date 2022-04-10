import React, {Component} from 'react';
import './styles/informationleft.css'
import store from "./store";
import {Menu} from "antd";
import {actionChangeBookTypes, actionUpdateBooks} from "./store/actionCreators";
import axios from "axios";

class BookOptions extends Component
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
            <div className={'secondOptions'}>
                <div className={'secondOptionsBox'}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.currentSecondOption]} mode="horizontal">
                        <Menu.Item key="全部">
                            全部
                        </Menu.Item>
                        <Menu.Item key="哲学">
                            哲学
                        </Menu.Item>
                        <Menu.Item key="自然应用科学">
                            自然应用科学
                        </Menu.Item>
                        <Menu.Item key="人文社会科学">
                            人文社会科学
                        </Menu.Item>
                        <Menu.Item key="文学">
                            文学
                        </Menu.Item>
                        <Menu.Item key="历史">
                            历史
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }

    //修改显示的书籍类别
    handleClick = e =>
    {
        const action = actionChangeBookTypes(e.key);
        store.dispatch(action);
        setTimeout(() => {
            this.updateBooks();
        });
    };

    //更新书籍
    updateBooks()
    {
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

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default BookOptions;
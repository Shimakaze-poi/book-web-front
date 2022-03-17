import React, {Component} from 'react';
import './styles/informationleft.css'
import {Menu} from "antd";
import store from "./store";
import {actionChangeAuthorTypes, actionUpdateAuthors} from "./store/actionCreators";
import axios from "axios";

class AuthorOptions extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.updateAuthors = this.updateAuthors.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    handleClick = e =>
    {
        const action = actionChangeAuthorTypes(e.key);
        store.dispatch(action);
        setTimeout(() => {
            this.updateAuthors();
        });
    };

    updateAuthors()
    {
        if (this.state.currentSecondOption === '全部')
        {
            axios.get(this.address + '/author/findall').then((res) =>
            {
                const action = actionUpdateAuthors(res.data);
                store.dispatch(action);
            });
        }
        else
        {
            let listAuthors = ({
                authortype: this.state.currentSecondOption
            });
            axios.post(this.address + '/author/find', listAuthors).then((res) =>
            {
                const action = actionUpdateAuthors(res.data);
                store.dispatch(action);
            });

        }
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
                        <Menu.Item key="中国作家">
                            中国作家
                        </Menu.Item>
                        <Menu.Item key="外国作家">
                            外国作家
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default AuthorOptions;
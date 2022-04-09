import React, {Component} from 'react';
import './styles/buttons.css'
import './styles/navigationbar.css'
import 'antd/dist/antd.css'
import {Menu} from "antd";
import store from "./store";
import {actionChangeInformationLeft, actionUpdateArticles} from "./store/actionCreators";
import axios from "axios";

class MainOptions extends Component
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

    handleClick = e =>
    {
        const action = actionChangeInformationLeft(e.key);
        store.dispatch(action);
        if (e.key === "综合")
        {
            axios.get(this.address + '/article/findall').then((res) =>
            {
                const action = actionUpdateArticles(res.data);
                store.dispatch(action);
            });
        }
    };

    render()
    {
        return (
            <div id={'mainOptions'}>
                <div id={'mainOptionsBox'}>
                    <Menu onClick={(e) => {this.handleClick(e); window.scrollTo(0, 0)}} selectedKeys={[this.state.currentMainOption]} mode="horizontal">
                        <Menu.Item key="综合">
                            综合
                        </Menu.Item>
                        <Menu.Item key="书单">
                            书单
                        </Menu.Item>
                        <Menu.Item key="作家">
                            作家
                        </Menu.Item>
                        {/*<SubMenu key="书单" title="书单">*/}
                        {/*    <Menu.Item key="全部书单">全部</Menu.Item>*/}
                        {/*    <Menu.Item key="哲学">哲学</Menu.Item>*/}
                        {/*    <Menu.Item key="自然应用科学">自然应用科学</Menu.Item>*/}
                        {/*    <Menu.Item key="人文社会科学">人文社会科学</Menu.Item>*/}
                        {/*    <Menu.Item key="文学">文学</Menu.Item>*/}
                        {/*    <Menu.Item key="历史">历史</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu key="作家" title="作家">*/}
                        {/*    <Menu.Item key="全部作家">全部</Menu.Item>*/}
                        {/*    <Menu.Item key="中国作家">中国作家</Menu.Item>*/}
                        {/*    <Menu.Item key="外国作家">外国作家</Menu.Item>*/}
                        {/*</SubMenu>*/}
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

export default MainOptions;
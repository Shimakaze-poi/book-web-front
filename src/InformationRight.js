import React, {Component} from 'react';
import './styles/contentinformation.css'
import './styles/animation.css'
import Recommend from "./Recommend";
import MainFoot from "./MainFoot";
import {CSSTransition} from "react-transition-group";
import store from "./store";

class InformationRight extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        // 订阅store更改
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
            <div id={'informationRight'}>
                {/* Recommend 推荐内容
                    MainFoot 页脚信息 */}
                <CSSTransition in={this.state.isShowRecommend} timeout={500} classNames="dom" unmountOnExit>
                    <Recommend/>
                </CSSTransition>
                <MainFoot/>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default InformationRight;
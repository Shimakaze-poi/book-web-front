import React, {Component} from 'react';
import './styles/contentinformation.css'
import InformationLeft from "./InformationLeft";
import InformationRight from "./InformationRight";
import UserCard from "./UserCard";
import {CSSTransition} from "react-transition-group";
import store from "./store";

class ContentInformation extends Component
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
            <div id={'information'}>
                {/* InformationLeft 内容页左侧
                    InformationRight 内容页右侧 */}
                <CSSTransition in={this.state.isShowUserCentre} timeout={0} classNames="dom" unmountOnExit>
                    <UserCard />
                </CSSTransition>
                <div id={'informationBox'}>
                    <InformationLeft/>
                    <InformationRight/>
                </div>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default ContentInformation;
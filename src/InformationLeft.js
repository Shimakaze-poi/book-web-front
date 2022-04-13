import React, {Component} from 'react';
import './styles/contentinformation.css'
import './styles/animation.css'
import ArticleOverview from "./ArticleOverview";
import ArticleOptions from "./ArticleOptions";
import BookOptions from "./BookOptions";
import BookOverview from "./BookOverview";
import AuthorOptions from "./AuthorOptions";
import AuthorOverview from "./AuthorOverview";
import {CSSTransition} from "react-transition-group";
import store from "./store";
import UserOptions from "./UserOptions";
import UserComments from "./UserComments";

class InformationLeft extends Component
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
            <div id={'informationLeft'}>
                {/* UserOptions 个人中心二级导航
                    UserComments 个人中心用户评论
                    ArticleOptions 文章二级导航
                    ArticleOverview 文章总览
                    BookOptions 书单二级导航
                    BookOverview 书单总览
                    AuthorOptions 作家二级导航
                    AuthorOverview 作家总览 */}
                <CSSTransition in={this.state.isShowUserCentre} timeout={0} classNames="dom" unmountOnExit>
                    <UserOptions />
                </CSSTransition>
                <CSSTransition in={this.state.isShowUserComments} timeout={0} classNames="dom" unmountOnExit>
                    <UserComments />
                </CSSTransition>

                <CSSTransition in={this.state.isShowArticle} timeout={0} classNames="dom" unmountOnExit>
                    <ArticleOptions />
                </CSSTransition>
                <CSSTransition in={this.state.isShowArticle} timeout={0} classNames="dom" unmountOnExit>
                    <ArticleOverview />
                </CSSTransition>

                <CSSTransition in={this.state.isShowBook} timeout={0} classNames="dom" unmountOnExit>
                    <BookOptions />
                </CSSTransition>
                <CSSTransition in={this.state.isShowBook} timeout={0} classNames="dom" unmountOnExit>
                    <BookOverview />
                </CSSTransition>

                <CSSTransition in={this.state.isShowAuthor} timeout={0} classNames="dom" unmountOnExit>
                    <AuthorOptions />
                </CSSTransition>
                <CSSTransition in={this.state.isShowAuthor} timeout={0} classNames="dom" unmountOnExit>
                    <AuthorOverview />
                </CSSTransition>
            </div>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default InformationLeft;

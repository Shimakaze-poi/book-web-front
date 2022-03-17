import React, {Component, Fragment} from 'react';
import './styles/animation.css'
import NavigationBar from "./NavigationBar";
import ContentInformation from "./ContentInformation";
import {CSSTransition} from "react-transition-group";
import { BackTop } from 'antd';
import EditArticle from "./EditArticle";
import store from "./store";
import ArticleDetails from "./ArticleDetails";
import Comments from "./Comments";
import BookDetails from "./BookDetails";

const style = {
    height: 40,
    width: 80,
    lineHeight: '40px',
    borderRadius: 20,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

class Homepage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        // 订阅store更改
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
    }

    render()
    {
        return (
            <Fragment>
                {/* NavigationBar 导航栏
                    ArticleDetails 文章详情
                    Comments 评论
                    ContentInformation 主要内容
                    EditArticle 撰文 */}
                <NavigationBar />
                <CSSTransition in={this.state.isShowArticleDetails} timeout={0} classNames="dom" unmountOnExit>
                    <ArticleDetails />
                </CSSTransition>
                <CSSTransition in={this.state.isShowBookDetails} timeout={0} classNames="dom" unmountOnExit>
                    <BookDetails />
                </CSSTransition>
                <CSSTransition in={this.state.isShowComments} timeout={0} classNames="dom" unmountOnExit>
                    <Comments />
                </CSSTransition>
                <CSSTransition in={this.state.isShowInformation} timeout={500} classNames="dom" unmountOnExit>
                    <ContentInformation />
                </CSSTransition>
                <CSSTransition in={this.state.isShowEditArticlePage} timeout={500} classNames="dom" unmountOnExit>
                    <EditArticle />
                </CSSTransition>
                <BackTop>
                    <div style={style}>返回顶部</div>
                </BackTop>
            </Fragment>
        );
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default Homepage;
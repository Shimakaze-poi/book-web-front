import {
    CHANGE_TO_WRITE,
    CHANGE_TO_SYN,
    CLOSE_RECOMMEND,
    UPDATE_ARTICLES,
    CHANGE_INFORMATION_LEFT,
    SELECT_CONTENT,
    UNSELECT_CONTENT,
    OPEN_COMMENTS,
    UPDATE_COMMENTS,
    UPDATE_BOOKS,
    CHANGE_BOOK_TYPES,
    UPDATE_AUTHORS,
    CHANGE_AUTHOR_TYPES,
    CHANGE_DRAWER,
    CHANGE_LOGIN_PAGE,
    LOGIN_IN,
    LOGIN_OUT,
    CHANGE_ARTICLE,
    NO_CHANGE_ARTICLE,
    CHANGE_TO_USER_CENTRE, CHANGE_USER_CENTRE_TYPES, UPDATE_USER_COMMENTS
} from './actionTypes'

const defaultState = {
    isFirstUpdateArticle: true,
    isShowInformation: true,
    isShowEditArticlePage: false,
    isShowRecommend: true,
    isShowArticle: true,
    isShowBook: false,
    isShowAuthor: false,
    isShowArticleDetails: false,
    isShowBookDetails: false,
    isShowAuthorDetails: false,
    isShowComments: false,
    isChangeArticle: false,
    isShowUserCentre: false,
    isShowUserComments: false,
    articleList: [],
    bookList: [],
    commentList: [],
    userCommentList: [],
    selectedContent: '',
    currentMainOption: '综合',
    currentSecondOption: '',
    isShowDrawer: false,
    selectedAuthor: '',
    isShowLoginPage: false,
    isShowBeforeLogin: true,
    isShowAfterLogin: false,
    currentAccount: '',
    canEditAuthorName: true
};

// eslint-disable-next-line
export default (state = defaultState, action) =>
{
    //撰写文章
    if (action.type === CHANGE_TO_WRITE)
    {
        //浅拷贝
        let newState = Object.assign({}, state);
        newState.isShowInformation = false;
        newState.isShowEditArticlePage = true;
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        return newState;
    }
    //返回到主页
    if (action.type === CHANGE_TO_SYN)
    {
        let newState = Object.assign({}, state);
        newState.isShowInformation = true;
        newState.isShowEditArticlePage = false;
        return newState;
    }
    //关闭"每日推荐"模块
    if (action.type === CLOSE_RECOMMEND)
    {
        let newState = Object.assign({}, state);
        newState.isShowRecommend = false;
        return newState;
    }
    //更新文章
    if (action.type === UPDATE_ARTICLES)
    {
        let newState = Object.assign({}, state);
        newState.articleList = action.articleList;
        if (state.isFirstUpdateArticle)
        {
            newState.isFirstUpdateArticle = false;
        }
        return newState;
    }
    //更改主页显示内容(综合/书籍/作家)
    if (action.type === CHANGE_INFORMATION_LEFT)
    {
        let newState = Object.assign({}, state);
        newState.currentMainOption = action.key;
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        newState.isShowUserCentre = false;
        newState.isShowUserComments = false;
        switch (action.key)
        {
            case '综合':
                newState.isShowArticle = true;
                newState.isShowBook = false;
                newState.isShowAuthor = false;
                break;
            case '作家':
                newState.isShowArticle = false;
                newState.isShowBook = false;
                newState.isShowAuthor = true;
                newState.currentSecondOption = '全部';
                break;
            case '书单':
                newState.isShowArticle = false;
                newState.isShowBook = true;
                newState.isShowAuthor = false;
                newState.currentSecondOption = '全部';
                break;
            default:
        }
        return newState;
    }
    //选中文章/书籍/作家以查看详细内容
    if (action.type === SELECT_CONTENT)
    {
        let newState = Object.assign({}, state);
        newState.selectedContent = action.content;
        switch (action.option)
        {
            case 'article':
                newState.isShowArticleDetails = true;
                newState.isShowBookDetails = false;
                newState.isShowAuthorDetails = false;
                break;
            case 'book':
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = true;
                newState.isShowAuthorDetails = false;
                break;
            case 'author':
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowAuthorDetails = true;
                break;
            default:
        }
        return newState;
    }
    //关闭文章/书籍/作家/评论的详细内容
    if (action.type === UNSELECT_CONTENT)
    {
        let newState = Object.assign({}, state);
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        return newState;
    }
    //展开/收起评论
    if (action.type === OPEN_COMMENTS)
    {
        let newState = Object.assign({}, state);
        newState.isShowComments = !newState.isShowComments;
        return newState;
    }
    //更新评论
    if (action.type === UPDATE_COMMENTS)
    {
        let newState = Object.assign({}, state);
        newState.commentList = action.commentList;
        return newState;
    }
    //更新用户评论
    if (action.type === UPDATE_USER_COMMENTS)
    {
        let newState = Object.assign({}, state);
        newState.userCommentList = action.commentList;
        return newState;
    }
    //更新书籍
    if (action.type === UPDATE_BOOKS)
    {
        let newState = Object.assign({}, state);
        newState.bookList = action.bookList;
        return newState;
    }
    //更改书籍二级导航栏的书籍类别
    if (action.type === CHANGE_BOOK_TYPES)
    {
        let newState = Object.assign({}, state);
        newState.currentSecondOption = action.key;
        return newState;
    }
    //更新作家
    if (action.type === UPDATE_AUTHORS)
    {
        let newState = Object.assign({}, state);
        newState.authorList = action.authorList;
        return newState;
    }
    //更改作家二级导航栏的作家类别
    if (action.type === CHANGE_AUTHOR_TYPES)
    {
        let newState = Object.assign({}, state);
        newState.currentSecondOption = action.key;
        return newState;
    }
    //打开/关闭作家详细信息卡片
    if (action.type === CHANGE_DRAWER)
    {
        let newState = Object.assign({}, state);
        newState.isShowDrawer = !newState.isShowDrawer;
        newState.selectedAuthor = action.author;
        return newState;
    }
    //打开/关闭登录注册弹出框
    if (action.type === CHANGE_LOGIN_PAGE)
    {
        let newState = Object.assign({}, state);
        newState.isShowLoginPage = action.option;
        return newState;
    }
    //登录
    if (action.type === LOGIN_IN)
    {
        let newState = Object.assign({}, state);
        newState.currentAccount = action.account;
        newState.isShowBeforeLogin = false;
        newState.isShowAfterLogin = true;
        newState.canEditAuthorName = false;
        return newState;
    }
    //登出
    if (action.type === LOGIN_OUT)
    {
        let newState = Object.assign({}, state);
        newState.currentAccount = '';
        newState.isShowBeforeLogin = true;
        newState.isShowAfterLogin = false;
        newState.canEditAuthorName = true;
        return newState;
    }
    //打开修改文章界面
    if (action.type === CHANGE_ARTICLE)
    {
        let newState = Object.assign({}, state);
        newState.isChangeArticle = true;
        return newState;
    }
    //取消修改文章
    if (action.type === NO_CHANGE_ARTICLE)
    {
        let newState = Object.assign({}, state);
        newState.isChangeArticle = false;
        return newState;
    }
    //打开用户中心界面
    if (action.type === CHANGE_TO_USER_CENTRE)
    {
        let newState = Object.assign({}, state);
        newState.isShowUserCentre = true;
        newState.isShowEditArticlePage = false;
        newState.isShowInformation = true;
        newState.isShowArticle = false;
        newState.isShowBook = false;
        newState.isShowAuthor = false;
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        newState.isChangeArticle = false;
        newState.isShowUserComments = false;
        newState.currentSecondOption = "动态";
        return newState;
    }
    //更改用户中心二级导航栏的展示内容
    if (action.type === CHANGE_USER_CENTRE_TYPES)
    {
        let newState = Object.assign({}, state);
        newState.currentSecondOption = action.key;
        newState.isShowComments = false;
        switch (action.key)
        {
            case '文章':
                newState.isShowArticle = true;
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowUserComments = false;
                break;
            case '评论':
                newState.isShowArticle = false;
                newState.isShowArticleDetails = false;
                newState.isShowUserComments = true;
                break;
            case '动态':
                newState.isShowArticle = false;
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowUserComments = false;
                break;
            default:
        }
        return newState;
    }
    return state;
}
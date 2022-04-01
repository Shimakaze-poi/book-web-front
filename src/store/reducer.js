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
    CHANGE_TO_USER_CENTRE
} from './actionTypes'

const defaultState = {
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
    articleList: [],
    bookList: [],
    commentList: [],
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
    if (action.type === CHANGE_TO_WRITE)
    {
        // 浅拷贝
        let newState = Object.assign({}, state);
        newState.isShowInformation = false;
        newState.isShowEditArticlePage = true;
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        return newState;
    }
    if (action.type === CHANGE_TO_SYN)
    {
        let newState = Object.assign({}, state);
        newState.isShowInformation = true;
        newState.isShowEditArticlePage = false;
        return newState;
    }
    if (action.type === CLOSE_RECOMMEND)
    {
        let newState = Object.assign({}, state);
        newState.isShowRecommend = false;
        return newState;
    }
    if (action.type === UPDATE_ARTICLES)
    {
        let newState = Object.assign({}, state);
        newState.articleList = action.articleList;
        return newState;
    }
    if (action.type === CHANGE_INFORMATION_LEFT)
    {
        let newState = Object.assign({}, state);
        newState.currentMainOption = action.key;
        newState.isShowUserCentre = false;
        switch (action.key)
        {
            case '综合':
                newState.isShowArticle = true;
                newState.isShowBook = false;
                newState.isShowAuthor = false;
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowAuthorDetails = false;
                newState.isShowComments = false;
                break;
            case '作家':
                newState.isShowArticle = false;
                newState.isShowBook = false;
                newState.isShowAuthor = true;
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowAuthorDetails = false;
                newState.isShowComments = false;
                newState.currentSecondOption = '全部';
                break;
            case '书单':
                newState.isShowArticle = false;
                newState.isShowBook = true;
                newState.isShowAuthor = false;
                newState.isShowArticleDetails = false;
                newState.isShowBookDetails = false;
                newState.isShowAuthorDetails = false;
                newState.isShowComments = false;
                newState.currentSecondOption = '全部';
                break;
            default:
        }
        return newState;
    }
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
    if (action.type === UNSELECT_CONTENT)
    {
        let newState = Object.assign({}, state);
        newState.isShowArticleDetails = false;
        newState.isShowBookDetails = false;
        newState.isShowAuthorDetails = false;
        newState.isShowComments = false;
        return newState;
    }
    if (action.type === OPEN_COMMENTS)
    {
        let newState = Object.assign({}, state);
        newState.isShowComments = !newState.isShowComments;
        return newState;
    }
    if (action.type === UPDATE_COMMENTS)
    {
        let newState = Object.assign({}, state);
        newState.commentList = action.commentList;
        return newState;
    }
    if (action.type === UPDATE_BOOKS)
    {
        let newState = Object.assign({}, state);
        newState.bookList = action.bookList;
        return newState;
    }
    if (action.type === CHANGE_BOOK_TYPES)
    {
        let newState = Object.assign({}, state);
        newState.currentSecondOption = action.key;
        return newState;
    }
    if (action.type === UPDATE_AUTHORS)
    {
        let newState = Object.assign({}, state);
        newState.authorList = action.authorList;
        return newState;
    }
    if (action.type === CHANGE_AUTHOR_TYPES)
    {
        let newState = Object.assign({}, state);
        newState.currentSecondOption = action.key;
        return newState;
    }
    if (action.type === CHANGE_DRAWER)
    {
        let newState = Object.assign({}, state);
        newState.isShowDrawer = !newState.isShowDrawer;
        newState.selectedAuthor = action.author;
        return newState;
    }
    if (action.type === CHANGE_LOGIN_PAGE)
    {
        let newState = Object.assign({}, state);
        newState.isShowLoginPage = action.option;
        return newState;
    }
    if (action.type === LOGIN_IN)
    {
        let newState = Object.assign({}, state);
        newState.currentAccount = action.account;
        newState.isShowBeforeLogin = false;
        newState.isShowAfterLogin = true;
        newState.canEditAuthorName = false;
        return newState;
    }
    if (action.type === LOGIN_OUT)
    {
        let newState = Object.assign({}, state);
        newState.currentAccount = '';
        newState.isShowBeforeLogin = true;
        newState.isShowAfterLogin = false;
        newState.canEditAuthorName = true;
        return newState;
    }
    if (action.type === CHANGE_ARTICLE)
    {
        let newState = Object.assign({}, state);
        newState.isChangeArticle = true;
        return newState;
    }
    if (action.type === NO_CHANGE_ARTICLE)
    {
        let newState = Object.assign({}, state);
        newState.isChangeArticle = false;
        return newState;
    }
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
        return newState;
    }
    return state;
}
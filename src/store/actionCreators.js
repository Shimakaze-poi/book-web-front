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
    NO_CHANGE_ARTICLE
} from './actionTypes'

export const actionChangeToWrite = () => ({
   type: CHANGE_TO_WRITE
});

export const actionChangeToSyn = () => ({
    type: CHANGE_TO_SYN
});

export const actionCloseRecommend = () => ({
    type: CLOSE_RECOMMEND
});

export const actionUpdateArticles = (articleList) => ({
    type: UPDATE_ARTICLES,
    articleList
});

export const actionChangeInformationLeft = (key) => ({
    type: CHANGE_INFORMATION_LEFT,
    key
});

export const actionSelectContent = (content, option) => ({
    type: SELECT_CONTENT,
    content,
    option
});

export const actionUnselectContent = () => ({
    type: UNSELECT_CONTENT
});

export const actionOpenComments = () => ({
    type: OPEN_COMMENTS
});

export const actionUpdateComments = (commentList) => ({
    type: UPDATE_COMMENTS,
    commentList
});

export const actionUpdateBooks = (bookList) => ({
    type: UPDATE_BOOKS,
    bookList
});

export const actionChangeBookTypes = (key) => ({
    type: CHANGE_BOOK_TYPES,
    key
});

export const actionUpdateAuthors = (authorList) => ({
    type: UPDATE_AUTHORS,
    authorList
});

export const actionChangeAuthorTypes = (key) => ({
    type: CHANGE_AUTHOR_TYPES,
    key
});

export const actionChangeDrawer = (author) => ({
    type: CHANGE_DRAWER,
    author
});

export const actionChangeLoginPage = (option) => ({
    type: CHANGE_LOGIN_PAGE,
    option
});

export const actionLoginIn = (account) => ({
    type: LOGIN_IN,
    account
});

export const actionLoginOut = () => ({
    type: LOGIN_OUT
});

export const actionChangeArticle = () => ({
    type: CHANGE_ARTICLE
});

export const actionNoChangeArticle = () => ({
    type: NO_CHANGE_ARTICLE
});
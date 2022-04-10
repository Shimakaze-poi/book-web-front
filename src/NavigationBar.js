import React, {Component} from 'react';
import './styles/navigationbar.css'
import MainOptions from "./MainOptions";
import MainSearchAndEdit from "./MainSearchAndEdit";
import AccountObjects from "./AccountObjects";

class NavigationBar extends Component
{
    render()
    {
        return (
            <div id={'bar'}>
                {/* WebsiteIcon 网站小图标
                    MainOptions 导航分类
                    MainSearchAndEdit 搜索、写文章
                    AccountObjects 用户相关 */}
                <div id={'websiteIcon'}>
                    <img id={'icon'} src={require('./imgs/logo192.png').default} onClick={() => this.refresh()} alt={'四月鱼'} />
                </div>
                <MainOptions />
                <MainSearchAndEdit />
                <AccountObjects />
            </div>
        );
    }

    refresh()
    {
        window.location.reload();
    }
}

export default NavigationBar;
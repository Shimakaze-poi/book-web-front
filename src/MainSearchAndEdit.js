import React, {Component} from 'react';
import './styles/navigationbar.css';
import './styles/buttons.css'
import 'antd/dist/antd.css';
import {Button} from 'antd';
import store from "./store";
import {EditOutlined} from "@ant-design/icons";
import { actionChangeToWrite } from "./store/actionCreators"

class MainSearchAndEdit extends Component
{
    constructor(props)
    {
        super(props);
        this.changeToWrite = this.changeToWrite.bind(this);
    }

    render()
    {
        return (
            <div id={'mainSearchAndEdit'}>
                <div id={'searchAndEditBox'}>
                    <img alt={'导航栏图片'} width={100} height={60} src={"https://s2.loli.net/2021/12/27/TBv3DS2IVzHdOsc.gif"}/>
                    <Button id={'writeContentBut'} type={'primary'} icon={<EditOutlined/>} shape={'round'}
                            onClick={this.changeToWrite}>撰文</Button>
                </div>
            </div>
        );
    }

    // 进行写文章相关的组件切换
    changeToWrite()
    {
        window.scrollTo(0, 0);
        const action = actionChangeToWrite();
        store.dispatch(action);
    }
}

export default MainSearchAndEdit;
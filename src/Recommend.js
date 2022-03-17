import React, {Component} from 'react';
import './styles/buttons.css'
import './styles/words.css'
import './styles/informationright.css'
import 'antd/dist/antd.css'
import {Button} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import store from "./store";
import { actionCloseRecommend } from "./store/actionCreators"
import axios from "axios";

class Recommend extends Component
{
    constructor(props)
    {
        super(props);
        this.state = ({
            recommendBookName: '',
            recommendBookAuthor: '',
            recommendBookIntro: '',
            recommendBookImgUrl: ''
        });
        this.closeRecommend = this.closeRecommend.bind(this);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
    }

    componentDidMount()
    {
        axios.get(this.address + '/recommend/find').then((res) => {
           this.setState({
               recommendBookName: res.data.title,
               recommendBookAuthor: res.data.author,
               recommendBookIntro: res.data.shortintro,
               recommendBookImgUrl: res.data.imageurl
           });
        });
    }

    render()
    {
        return (
            <div id={'recommend'}>
                <Button id={'closeRecommendBut'} icon={<CloseOutlined/>} shape={'round'}
                        onClick={this.closeRecommend}>关闭</Button>
                <div id={'recommendBox'}>
                    <p id={'recommendTitle'}>本周推荐书籍</p>
                    <img alt={'每周推荐'} width={200} src={this.state.recommendBookImgUrl}/>
                    <p id={'recommendBookInfo'}>{this.state.recommendBookName + '——' + this.state.recommendBookAuthor}</p>
                </div>
                <p id={'recommendBookIntro'}>{this.state.recommendBookIntro}</p>
            </div>
        );
    }

    // 卸载“本周推荐书籍”组件
    closeRecommend()
    {
        const action = actionCloseRecommend();
        store.dispatch(action);
    }
}

export default Recommend;
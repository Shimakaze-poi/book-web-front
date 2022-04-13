import React, {Component} from 'react';
import store from "./store";
import axios from "axios";

class UserComments extends Component
{
    constructor(props)
    {
        super(props);
        this.state = store.getState();
        this.storeChange = this.storeChange.bind(this);
        store.subscribe(this.storeChange);
        this.address = this.$config.backIp + ":" + this.$config.backPort;
        this.userComments = [];
    }

    componentDidMount = () =>
    {
        this.updateComments();
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
            <div>
                <p>个人中心-用户评论占位</p>
                {/*{this.userComments}*/}
            </div>
        );
    }

    //更新评论
    updateComments()
    {
        let findSpecialInformation = ({
            userid: this.state.currentAccount.id
        });
        axios.post(this.address + '/comment/finduser', findSpecialInformation).then((res) => {
            this.userComments = res.data;
            console.log(this.userComments);
        });
    }

    storeChange()
    {
        this.setState(store.getState());
    }
}

export default UserComments;
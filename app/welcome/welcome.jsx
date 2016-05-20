import React from 'react';
import '../animate.css';
import './welcome.css';

/*彩色标题组件*/
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            col:'#666'
        }        
    }

    // 随机生成16进制颜色值，并改变状态
    getRandomColor = () => {
        this.setState({ 
            col: '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6)
        });
    }

    // 组件渲染后，500毫秒改变一次组件颜色
    componentDidMount() {
        this.interval = setInterval(this.getRandomColor, 500);
    }

    // 组件将要死亡时清除计时器，不清除也可以
    componentWillUnmount() {
        clearInterval(this.interval);  
    }

    render() {
        let colorStyle = {
            color:this.state.col
        }
        return (
            <h1 className="animated rotateIn" id="welcome" style={colorStyle}>你&nbsp;好</h1>
        )
    }       
}
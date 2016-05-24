import React from 'react';
import {Button,Checkbox,DatePicker,Select,Switch,Form,Row,Col,Table} from 'antd';
import { Link } from 'react-router'

// 引入Fetch
import 'whatwg-fetch';

// 引入表格数据
import {data, columns} from '../data/tableData.jsx';

import './antdes.css';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class Antdes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selV: [''],
            ischecked: false,
            visible: false,
            route: '/message'
        }        
    }
    
    // 选择广告系列
    selChange = (value) => {        
        console.log(value);
    }

    // 打印所选日期
    dateChange = (value) => {
        console.log('From: ', value[0], ', to: ', value[1]);
    }

    // 是否过滤无数据广告
    checkChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ischecked: e.target.checked});
    }

    // 查询提示框
    confirmMsg = () => {
        confirm(`是否过滤无数据广告：${this.state.ischecked}`);
    }    

    // 切换子视图
    toggleSub = () => {
        let routeURL = (this.state.route === '/message' ? '/antdes' : '/message');
        this.setState({route:routeURL});
    }

    // 组件渲染后获取外界数据(GET)
    componentDidMount() {
        console.log(this.state);

        fetch('data/selectData.json')
            .then((response) => {
                console.log(response);
                return response.json();  //解析JSON数据并返回，相当于JSON.parse(jsonText)
            })
            .then((data) => {
                this.setState({selV:data.obj});         
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    
    render() {
        const rowSelection = {
            //配置项
        };
        return (
            <div id="wrap">
                <div id="header">
                    <Form inline>
                        <Row type="flex" justify="start" gutter={16} align="middle">
                            <Col span="5">
                                <Select onChange={this.selChange} placeholder="请选择广告系列" size="large">                                   
                                    {
                                        this.state.selV.map((v,i) => {
                                            return <Option key={i} value={v}>{v}</Option>                                                    
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col span="5">
                                <FormItem>
                                    <RangePicker onChange={this.dateChange} />
                                </FormItem>
                            </Col>
                            <Col span="3">
                                <FormItem>
                                    <Checkbox defaultChecked={false} onChange={this.checkChange}>过滤无数据广告</Checkbox>
                                </FormItem>
                            </Col>
                            <Col span="2">
                                <FormItem>
                                    <Button onClick={this.confirmMsg}>查询</Button>
                                </FormItem>
                            </Col>
                            <Col span="3" push="5">
                                <FormItem>
                                    <Button type="primary" size="large">新建广告系列</Button>
                                </FormItem>
                            </Col>

                        </Row>
                    </Form>
                </div>
                <div id="table">
                    <Table rowSelection={rowSelection} dataSource={data} columns={columns} size="middle"/>                    
                </div>
                <div id="nest">
                    <Row type="flex" align="middle">
                        <Col span="3">
                            <span>是否开启穿梭框？</span>
                        </Col>
                        <Col span="2">
                            <Link to={this.state.route} ><Switch checkedChildren="开" unCheckedChildren="关" onChange={this.toggleSub} /></Link>
                        </Col>
                    </Row>
                    {this.props.children}
                </div>               
            </div>
        )
  }
}

export default Antdes;
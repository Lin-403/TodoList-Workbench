import { getLocal, saveLocal } from '@/utils';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd'
import { useEffect, useState } from 'react';
import './index.less'

interface IProps{
    settings:Record<string,string>
    onSubmit:(newSettings:Record<string,string>)=>void
}



export default function Settings(props:IProps) {

    const {settings,onSubmit}=props

    const onFinish = (values: any) => {
        onSubmit(values)
       
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='setting-container'>
            <Form
                name="basic"
                initialValues={settings}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="主题色"
                    name="mainColor"
                    rules={[{ required: true, message: '不可为空！！' }]}
                >
                    <Input type="color" placeholder='请输入十六进制颜色'  />
                </Form.Item>

                <Form.Item
                    label="主题色(激活状态)"
                    name="mainActiveColor"
                    rules={[{ required: true, message: '不可为空！！' }]}
                >
                    <Input type="color"  placeholder='请输入十六进制颜色' />
                </Form.Item>

                <Form.Item
                    label="圆角"
                    name="radius"
                    rules={[{ required: true, message: '不可为空！！' }]}
                >
                    <Input placeholder='请输入如6px格式的样式'/>
                </Form.Item>
                <Form.Item>
                    <button className='settings-btn' 
                    type="submit" 
                    style={{width:'100%'}} >
                        确认
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}
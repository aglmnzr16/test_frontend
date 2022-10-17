import React, { useState } from 'react'
import { Button, Form, Input, Modal, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { userCreate } from '../../api/user_api';
import { Link } from 'react-router-dom';

const HomeScreen = () => {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    // * handle api
    const handleCreate = () => {

        let data = {
            name: name,
            job: job
        }


        setLoading(true)
        userCreate(data).then((res) => {
            setLoading(false)
            if (res.status === 201) {
                Modal.success({
                    content: "Berhasil memasukan data"
                })
            }
        }).catch((err) => {
            setLoading(false)
            Modal.error({
                content: "Gagal memasukan data"
            })
        })
    }

    return (
        <div className='w-screen min-h-screen flex justify-center items-center flex-col'>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleCreate}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item

                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setName(e.target.value)} value={name} />
                </Form.Item>

                <Form.Item
                    label="job"
                    name="job"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your job!',
                        },
                    ]}
                >
                    <Input onChange={(e) => setJob(e.target.value)} value={job} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Divider dashed />
            <div className='flex gap-3'>
                <h3>Goto List Screen?</h3>
                <Link to={'/list'}>
                    <span className='uppercase'>List</span>
                </Link>
            </div>
        </div>
    )
}

export default HomeScreen
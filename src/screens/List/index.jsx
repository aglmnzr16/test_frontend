import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Divider, Modal } from 'antd';
import { userDelete, userGet } from '../../api/user_api';

import { EditFilled, DeleteFilled } from '@ant-design/icons'
import ModalEdit from '../../components/ModalEdit';


const ListScreen = () => {

    const [modalUpdate, setModalUpdate] = useState({
        show: false,
        data: {},
    });

    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        userGet(page).then((res) => {
            console.log("RES", res)
            setInitLoading(false)

            if (page === 1) {
                setData(res.data.data)
                setList(res.data.data)
                setLoading(false)
            } else {
                const newData = data.concat(res.data.data)
                setData(newData)
                setList(newData)
                setLoading(false)
            }

        })
    }, [page])


    // * onloads data
    const onLoadMore = () => {
        setLoading(true)
        setPage(page + 1)
        setLoading(false)
    }

    // * DELETE USER
    const handleDelete = id => {
        setLoading(true)
        userDelete(id).then((res) => {
            if (res.status > 200 && res.status < 300) {
                setLoading(false)
                Modal.success({
                    content: "Berhasil delete user"
                })
            }

        }).catch((err) => {
            setLoading(false)
            Modal.error({
                content: 'Error',
                title: "Error"
            })
        })
    }

    const loadMore = !initLoading && !loading ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null;

    return (
        <>
            {modalUpdate.show && (
                <ModalEdit action={[modalUpdate, setModalUpdate]} />
            )}
            <div className='flex justify-center items-center p-5 flex-col'>
                <h1 className='text-4xl text-red-400 uppercase'>List people</h1>
                <Divider />
                <div className='flex flex-row w-screen h-auto p-10'>
                    <List
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        style={{ width: '100%' }}
                        renderItem={(item) => (
                            <List.Item
                                actions={
                                    [<Button onClick={() => setModalUpdate({
                                        show: true,
                                        id: item.id
                                    })} >
                                        <EditFilled />
                                    </Button>,
                                    <Button
                                        danger
                                        onClick={() => {
                                            Modal.confirm({
                                                content: `Yakin delete user ${item.id}`,
                                                title: "Delete User",
                                                onOk: () => {
                                                    handleDelete(item.id)
                                                    return
                                                }
                                            })
                                        }}>
                                        <DeleteFilled />
                                    </Button>
                                    ]
                                }
                            >
                                <Skeleton avatar title={false} loading={loading} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href="https://ant.design">{item.first_name + ' ' + item.last_name}</a>}
                                        description={item.email}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </div>

        </>
    )
}

export default ListScreen
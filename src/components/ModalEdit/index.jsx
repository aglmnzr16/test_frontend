import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import { getSingleData, userUpdate } from '../../api/user_api'

const ModalEdit = ({ action }) => {

    const [modalUpdate, setModalUpdate] = action

    const [contentData, setContentData] = useState({
        id: modalUpdate.id,
        email: '',
        first_name: '',
        last_name: ''
    })
    const [loading, setLoading] = useState(false)

    console.log("MODAL", contentData)

    // * GET DATA
    useEffect(() => {
        setLoading(true)
        getSingleData(modalUpdate.id).then((res) => {
            setContentData({
                id: res.data.data.id,
                email: res.data.data.email,
                first_name: res.data.data.first_name,
                last_name: res.data.data.last_name,
            })
            setLoading(false)
        }).catch(() => {
            Modal.error({
                content: "Terjadi kesalahan!"
            })
            setLoading(false)
        })
    }, [])

    const handleEdit = e => {
        e.preventDefault()
        setLoading(true)
        userUpdate(contentData).then((res) => {
            console.log("UPDATE ", res)
            if (res.status === 200) {
                setLoading(false)
                Modal.success({
                    content: "Berhasil update",
                    onOk: () => {
                        window.location.reload()
                    }
                })

            }
        }).catch(() => {
            setLoading(false)
            Modal.error({
                content: "Terjadi kesalahan!"
            })
        })
    }

    return (
        <div className="absolute bg-black/80 z-[100] top-0 left-0 flex justify-center items-center w-full h-full">
            <form
                className="w-[400px] bg-white p-4 flex flex-col gap-4 rounded-md"
                onSubmit={handleEdit}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">email</label>
                    <input
                        defaultValue={contentData.email}
                        type="text"
                        className="h-10 px-2 outline-none w-full border-[1px] border-gray-300"
                        id="email"
                        name="email"
                        onChange={(e) => {
                            setContentData({
                                ...contentData,
                                email: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="first_name">First Namae</label>
                    <input
                        defaultValue={contentData.first_name}
                        type="text"
                        className="h-10 px-2 outline-none w-full border-[1px] border-gray-300"
                        id="first_name"
                        name="first_name"
                        onChange={(e) => {
                            setContentData({
                                ...contentData,
                                first_name: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        defaultValue={contentData.last_name}
                        type="text"
                        className="h-10 px-2 outline-none w-full border-[1px] border-gray-300"
                        id="last_name"
                        name="last_name"
                        onChange={(e) => {
                            setContentData({
                                ...contentData,
                                last_name: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        onClick={() => {
                            setModalUpdate({
                                ...modalUpdate,
                                show: false,
                            });
                        }}
                        type={'ghost'} htmlType="reset">
                        Cancel
                    </Button>

                    <Button type={'primary'} htmlType="submit" loading={loading}>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ModalEdit
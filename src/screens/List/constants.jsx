export const columns = [
    {
        title: "No",
        dataIndex: "id",
        key: "id",
        render: (t, r, i) => <p>{i + 1}</p>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
    },
    {
        title: "Last Name",
        dataIndex: "last_name",
        key: "last_name",
    },
    {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
    },
]
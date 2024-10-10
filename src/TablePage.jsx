import { Space, Table, Tag } from "antd"
import { Controller, useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";

const data = [
    {
        key:1,
        userid:'userId1',
        title:'something1',
        tags:['done'],
    },
    {
        key:2,
        userid:'userId2',
        title:'something2',
        tags:['uncompleted', 'in proccess'],
    },
    {
        key:3,
        userid:'userId3',
        title:'something3',
        tags:['done'],
    },
  ];

const columns = [
    {
        title: 'Users',
        dataIndex: 'userid',
        key: 'userid',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'uncompleted') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
    }
    
]

function TablePage(){
    const {control, handleSubmit} = useForm();
    return(
    <>
    <Table columns={columns} dataSource={data}/>
    </>
    )
}

export default TablePage
import { Space, Table, Tag } from "antd"
import { Controller, useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
const columns = [
    {
        title: 'Users',
        dataIndex: 'userid',
        key: 'userid',
        render: (text) => <a>{text}</a>,
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
                if (tag === 'loser') {
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
        tags:['done'],
    },
    {
        key:3,
        userid:'userId3',
        title:'something3',
        tags:['done'],
    },
  ];
function TablePage(){
    const {control, handleSubmit} = useForm();
    return(
    <>
    <h1>hi</h1>
        <Controller
        name="table"
         control={control}
         render={({field}) =>{
             <Table columns={columns} dataSource={data} {...field}/>
         }}
        />
    </>
    )
}

export default TablePage
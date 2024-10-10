import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Button, Modal, Form, Input } from "antd"
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";


function TablePage(){
    const {control, handleSubmit} = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleExit = () =>{
        setIsModalOpen(false)
    }

      async function getData() {
        return await axios.get("https://jsonplaceholder.typicode.com/todos")
      }
      const onSuccess = () =>{
        console.log("worked successfully");
    }
    const onError = () =>{
        console.log("encountered error");
        
    }
      const {data, error} = useQuery({
        queryKey: ['todoData'],
        queryFn: getData,
        onError,
        onSuccess
      })
    //   console.log(data);
     if (error) return <h1>{error.message}</h1>

     const dataSource = data?.data?.map((el) => {
        
        return(
        {
            key: el.id,
            userid: el.userId,
            title: el.title,
            tags: [el.completed]
        })
      })

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
                    let status = ''
                    if (tag === false) {
                      color = 'volcano';
                      status = 'uncompleted'
                    } else{
                        status = 'completed'
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {status}
                      </Tag>
                    );
                  })}
                </>
              ),
        }
        
    ]

    return(
    <>
    <Button type="primary" onClick={showModal} 
    style={{margin: '30px', fontSize:'1.2rem', padding:'20px'}}
    >Create</Button>
    <Modal title="Basic Modal" open={isModalOpen} footer={null}>
        <Form>
            <h1>work</h1>
            <Controller
            name="firstName"
            // label = "First Name"
            control={control}
            render={({field}) => {
                <Input {...field}/>
            }}/>
        </Form>
        <Button onClick={handleExit}>Ok</Button>
        <Button onClick={handleExit}>Cancel</Button>
    </Modal>
    <Table columns={columns} dataSource={dataSource}/>
    </>
    )
}

export default TablePage
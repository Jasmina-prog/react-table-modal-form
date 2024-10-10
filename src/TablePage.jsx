import { useQuery, useMutation } from "@tanstack/react-query";
import { Table, Tag, Button, Modal, Form, Input, Select } from "antd"
import axios from "axios";
import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const regions = [
    {
        value: 1,
        label: 'Tashkent'
    },
    {
        value: 2,
        label: 'Buxoro'
    },
    {
        value: 3,
        label: 'Andijon'
    },
    {
        value: 4,
        label: 'Navoi'
    },
]

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

function TablePage(){
    const {control, handleSubmit} = useForm();
    const {fields, append, remove} = useFieldArray({
        name: 'phone',
        control
    })
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
     if (error) return <h1>{error.message}</h1>

     async function postData(data) {
        return await axios.post("https://jsonplaceholder.typicode.com/todos", data)
     }
    const {data: dataPost, mutate} = useMutation({
        mutationFn: postData
    })

     const dataSource = data?.data?.map((el) => {
        return(
        {
            key: el.id,
            userid: el.userId,
            title: el.title,
            tags: [el.completed]
        })
      })


    const submitFn = (data) =>{
       mutate(data)
       setIsModalOpen(false)
    }

    return(
    <>
    <Button type="primary" onClick={showModal} 
    style={{margin: '30px', fontSize:'1.2rem', padding:'20px'}}
    >Create</Button>
    <Modal title="Basic Modal" open={isModalOpen} footer={null}>
        <Form style={{display:'flex', flexDirection:'column', gap:'20px'}}> 
            <Controller
            name="firstName"
            control={control}
            render={({field}) => 
                <Input {...field} placeholder="Firstname"/>
        }/>
        <Controller
        name="address"
        control={control}
        render={({field}) => 
            <Select options={regions} placeholder="Regions" {...field}/>
        }/>
        <div style={{display:'flex', flexDirection:'column',alignItems:'center', gap:"10px"}}>
            {
                fields.map((field, index) =>{
                    return(
                        <div key={field.id} style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                            <Controller
                            name={`phone.${index}.number`}
                            control={control}
                            render={({field}) =>(
                                <Input {...field} />
                            )}
                            />
                            {
                                index > 0 && (
                                    <Button onClick={()=>remove(index)} 
                                    style={{backgroundColor:'rgb(246, 107, 107)', margin:'10px 0'}}>
                                        Remove 
                                    </Button>
                                )
                            }
                        </div>
                        
                    )
                })
            }
            <Button onClick={()=> append({})} style={{backgroundColor:'rgb(189, 233, 122)'}}>Add</Button>
        </div>
        </Form >
        <Button onClick={handleSubmit(submitFn)} type="primary" style={{margin:'30px'}}>Ok</Button>
        <Button onClick={handleExit}>Cancel</Button>
    </Modal>
    <Table columns={columns} dataSource={dataSource}/>
    </>
    )
}

export default TablePage
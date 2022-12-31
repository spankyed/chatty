import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import SlidingPane from "react-sliding-pane";
import { CloseCircleOutlined } from '@ant-design/icons';
import PreviewTune from './preview-tune';
import { loadEditModule, Module, PageModel, updateModule } from '../../api/mock-api';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useFormAction, useLoaderData, useSubmit } from 'react-router-dom';

export default SystemEdit;

const onMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};

const items = [
  {
    key: '1',
    label: 'Import Dataset',
  },
  {
    key: '2',
    label: 'Generate with AI',
  },
];

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.moduleId
  if (!id) throw new Response("", { status: 404 });
  const pageModel = await loadEditModule(id);
  if (!pageModel) throw new Response("", { status: 404 });
  return pageModel;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('request: ', request);
  const formData = await request.formData();
  const moduleData = Object.fromEntries(formData) as Module;
  console.log('data: ', {moduleData, formData: [...formData]});
  const module = await updateModule(moduleData.id, {
    id: moduleData.id,
    title: moduleData.title,
  }); // todo have some default values

  // todo combine delete action with this
  return redirect(`/system`);
}

function SystemEdit() {
  // const methods = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: ''
  //   }
  // });
  let action = useFormAction();
  let submit = useSubmit();
  const pageModel = useLoaderData() as PageModel;
  const [paneOpen, togglePane] = useState(false);
  
  const { Option } = Select;
  const { modules, module } = pageModel;
  const otherModules = modules.filter((m: any) => m.id !== module.id);
  
  return (
    <>
      <Form {...layout} onFinish={(values: any) => {
        
        const formData = new FormData();

        console.log('values: ', values);
        Object.keys(values).forEach(key => { formData.append(key, values[key] || '') });

        submit(formData, { method: 'post',  action });
      }}>

        <Form.Item label="Prompt" name='id' hidden={true} initialValue={module.id}>
          <Input hidden={true} value={module.id} />
        </Form.Item>

        <Form.Item 
          label="Title"
          name="title"
          rules={[
            { required: true, message: 'Please input a title' },
            // {
            //   pattern: /^[a-zA-Z0-9]+$/,
            //   message: 'Name can only include letters and numbers.',
            // },
          ]}
        >
          <Input placeholder="Natural Language Processor" name='title'/>
        </Form.Item>

        <Form.Item label="Task Type" name='taskType'>
          {/* <Radio.Group value={'twoWayBind?'}> */}
          <Radio.Group defaultValue='prompt'>
            <Radio.Button value="prompt">Prompt</Radio.Button>
            <Radio.Button value="Search">Search</Radio.Button>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item label="Prompt" name='prompt'>
          <Input.TextArea style={{  resize: 'none', height: '7rem' }}/>
        </Form.Item>

        <Form.Item label="Inputs (Responses)" name='inputs'>
          <Select mode="multiple">
            {
              otherModules.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item label="Template" name='template'>
          <Input.TextArea style={{  resize: 'none', height: '15rem' }}/>
        </Form.Item>

        <Form.Item label="Go To" name='goTo'>
          <Select>
            {
              otherModules.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
            }
          </Select>
        </Form.Item>

        {/* <Form.Item>
          <Button type="primary" icon={<SaveOutlined />} size='large' />
          <SaveOutlined />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            type="submit"
          >
            Save
          </button>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-2 bg-blue-700 hover:bg-blue-100">
            Done
          </Button>
          {/* <Button htmlType="button" onClick={()=>{}}>
            Fine-Tune
          </Button> */}
          <Dropdown.Button disabled={true} menu={{ items, onClick: onMenuClick }} className="inline mr-2">
            Fine-Tune
          </Dropdown.Button>
          <Button type="link" htmlType="button" onClick={() => togglePane(!paneOpen)} className="mr-2">
            Preview & Tune
          </Button>
          <Button disabled={true} type="primary" htmlType="submit" className="mr-2 bg-red-700 hover:bg-red-100 float-right">
            Delete
          </Button>
        </Form.Item>

      </Form>

      <SlidingPane
        closeIcon={<CloseCircleOutlined size={20}/>}
        isOpen={paneOpen}
        title="Preview & Tune"
        from="right"
        // width="700px"
        width="50%"
        className='p-0'
        onRequestClose={() => togglePane(false)}
        >
        <PreviewTune/>
      </SlidingPane>

    </>
    
  );
};


import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import SlidingPane from "react-sliding-pane";
import { CloseCircleOutlined } from '@ant-design/icons';
import PreviewTune from './preview-tune';
import { loadEditModule, Module, ModulePageModel, updateModule } from './api';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useFormAction, useLoaderData, useSubmit } from 'react-router-dom';
import MultiInput from './multi-input';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

const fineTuneClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};

const fineTuneOptions = [
  {
    key: '1',
    label: 'Import Dataset',
  },
  {
    key: '2',
    label: 'Generate with AI',
  },
];

export default function ModuleEdit() {
  // const methods = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: ''
  //   }
  // });
  let action = useFormAction();
  let submit = useSubmit();
  const pageModel = useLoaderData() as ModulePageModel;
  const [paneOpen, togglePane] = useState(false);
  
  const { Option } = Select;
  const { modules, module } = pageModel;
  const otherModules = modules.filter((m: any) => m.id !== module.id);

  const fin = (values: any) => {
    const formData = new FormData();

    console.log('module values: ', values);
    Object.keys(values).forEach(key => { formData.append(key, values[key] || '') });

    submit(formData, { method: 'post',  action });
  }
  
  return (
    <>
      <Form {...layout} onFinish={fin}>

        {/* <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-2 bg-blue-700 hover:bg-blue-100">
            Done
          </Button>
          <Dropdown.Button disabled={true} menu={{ items: fineTuneOptions, onClick: fineTuneClick }} className="inline mr-2">
            Fine-Tune
          </Dropdown.Button>
          <Button type="link" htmlType="button" onClick={() => togglePane(!paneOpen)} className="mr-2">
            Preview & Tune
          </Button>
          <Button disabled={true} type="primary" htmlType="submit" className="mr-2 bg-red-700 hover:bg-red-100 float-right">
            Delete
          </Button>
        </Form.Item> */}

        <Form.Item label="hiddenId" name='id' hidden={true} initialValue={module.id}>
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
          initialValue={module.title}
        >
          <Input placeholder="Natural Language Processor" name='title' value={module.title}/>
        </Form.Item>

        <Form.Item label="Task Type" name='taskType'>
          {/* <Radio.Group value={'twoWayBind?'}> */}
          <Radio.Group defaultValue='prompt'>
            <Radio.Button value="prompt">Prompt</Radio.Button>
            <Radio.Button value="dialogue">Dialogue</Radio.Button>
            <Radio.Button value="search">Search</Radio.Button>
            <Radio.Button value="code">Database</Radio.Button>
            <Radio.Button value="code">Code</Radio.Button>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item label="Prompt" name='prompt' initialValue={module.prompt}>
          <Input.TextArea style={{  resize: 'none', height: '7rem' }} value={module.prompt}/>
        </Form.Item>

        <Form.Item label="Expected Inputs" name='inputs'>
          {/* <Select mode="multiple" disabled={true} defaultValue={['test','test2']}>
            {
              otherModules.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
            }
          </Select> */}
          <MultiInput />
        </Form.Item>

        <Form.Item label="Template" name='template'>
          <Input.TextArea style={{  resize: 'none', height: '15rem' }}/>
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
          <Dropdown.Button disabled={true} menu={{ items: fineTuneOptions, onClick: fineTuneClick }} className="inline mr-2">
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

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.moduleId
  if (!id) throw new Response("", { status: 404 });
  const pageModel = await loadEditModule(id);
  if (!pageModel) throw new Response("", { status: 404 });
  return pageModel;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const moduleData = Object.fromEntries(formData) as unknown as Module;
  console.log('module edit formdata: ', {moduleData, formData: [...formData]});
  const module = await updateModule(moduleData.id, {
    id: moduleData.id,
    title: moduleData.title,
    prompt: moduleData.prompt,
  }); // todo have some default values

  // todo combine delete action with this
  return redirect(`/system/modules`);
}

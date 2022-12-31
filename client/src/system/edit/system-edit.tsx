import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import SlidingPane from "react-sliding-pane";
import { CloseCircleOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import PreviewTune from './preview-tune';
import { getNote } from '../../api/mock-api';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

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
  const note = await getNote(id);
  if (!note) throw new Response("", { status: 404 });
  return note;
}

function SystemEdit() {
  
  const { Option } = Select;
  const [paneOpen, togglePane] = useState(false);
  const note = useLoaderData();
  console.log('note: ', note);
  
  return (
    <>
      <Form {...layout} >
        <Form.Item label="Title">
          <Input placeholder="Natural Language Processor" />
        </Form.Item>

        <Form.Item label="Task Type" name="layout">
          {/* <Radio.Group value={'twoWayBind?'}> */}
          <Radio.Group defaultValue='prompt' >
            <Radio.Button value="prompt">Prompt</Radio.Button>
            <Radio.Button value="Search">Search</Radio.Button>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item label="Prompt">
          <Input.TextArea style={{  resize: 'none', height: '7rem' }} />
        </Form.Item>
        <Form.Item label="Inputs (Responses)">
          <Select mode="multiple">
            <Option value="module1">Module 1</Option>
            <Option value="module2">Module 2</Option>
            <Option value="module3">Module 3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Template">
          <Input.TextArea style={{  resize: 'none', height: '15rem' }}/>
        </Form.Item>

        <Form.Item label="Go To">
          <Select>
            <Option value="module1">Module 1</Option>
            <Option value="module2">Module 2</Option>
            <Option value="module3">Module 3</Option>
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


import React from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Select } from 'antd';

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

function SystemEdit() {

  const { Option } = Select;

  return (
    <Form {...layout} >
      <Form.Item label="Title">
        <Input placeholder="Natural Language Processor" />
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
        <Button type="primary" htmlType="submit">
          Done
        </Button>
        {/* <Button htmlType="button" onClick={()=>{}}>
          Fine-Tune
        </Button> */}
        <Dropdown.Button menu={{ items, onClick: onMenuClick }} className="inline">Fine-Tune</Dropdown.Button>

        <Button type="link" htmlType="button" onClick={()=>{}}>
          Preview & Tune
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SystemEdit;


function TopGPTChatInput() {
  // let navigate = useNavigate();
  return (
    <div className="text-base gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
      <div className="w-[30px] flex flex-col relative items-end">
        <div className="relative flex">
          {/* <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
            <span style={{boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
              <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2730%27/%3e" style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
            </span>
            <img alt="angel.santiago@tutanota.com" src="/_next/image?url=https%3A%2F%2Fs.gravatar.com%2Favatar%2F7c4f38b7e1938427795f79608c0b91f4%3Fs%3D480%26r%3Dpg%26d%3Dhttps%253A%252F%252Fcdn.auth0.com%252Favatars%252Fan.png&w=64&q=75" decoding="async" data-nimg="intrinsic" classname="rounded-sm" style={{position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
          </span> */}
        </div>
      </div>
      <div className="relative lg:w-[calc(100%-115px)] w-full flex flex-col">
        <textarea 
          className="resize-none focus:ring-0 focus-visible:ring-0 p-0 m-0 border-0 bg-transparent" 
          style={{ height: "72px", overflowY: "hidden" }}>
          empty
        </textarea>
        <div className="text-center mt-2 flex justify-center">
          <button className="btn flex gap-2 justify-center btn-primary mr-2"> Save &amp; Submit</button>
          <button className="btn flex gap-2 justify-center btn-neutral">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function BottomGPTChatInput() {
  return (

    <div className="absolute bottom-0 left-0 w-full dark:border-transparent bg-vert-light-gradient dark:bg-vert-dark-gradient">
      <form className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
        <div className="relative flex h-full flex-1 flex-col">
          <div className="w-full flex gap-2 justify-center mb-3">
            <button className="btn flex justify-center gap-2 btn-neutral">
              Regenerate response
            </button>
          </div>
          <div className="flex flex-col w-full py-2 pl-3 md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
            <textarea tabIndex={0} data-id="request-:r0:-1" rows={1} className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent" style={{maxHeight: '200px', height: '24px', overflowY: 'hidden'}} defaultValue={""} />
            <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
              Send
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6"><a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" rel="noreferrer" className="underline">ChatGPT Dec 15 Version</a>. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.</div>
    </div>
  );
}
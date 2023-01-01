import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider, Layout } from 'antd';
import './preview-tune.scss'


function PreviewTune() {
  const { Option } = Select;
  const [paneOpen, togglePane] = useState(false);

  return (
    <div className='flex flex-row p-0 previewTune  h-full'>
      <ParameterForm />
      <PreviewForm />
      {/* <div className='flex grow'>
        <TopGPTChatInput />
      </div> */}
    </div>
  );
};

function ParameterForm() {
  
  const { Option } = Select;
  const [paneOpen, togglePane] = useState(false);

  return (
    <Form layout="vertical" className='p-6 pb-2 h-full w-64' style={{backgroundColor: 'rgb(51,51,51)'}}>
      <Form.Item label="Model Name">
        <Select value='text-davinci-003'>
          <Select.Option value="text-davinci-003">text-davinci-003</Select.Option>
          <Select.Option value="text-curie-001">text-curie-001</Select.Option>
          <Select.Option value="text-babbage-001">text-babbage-001</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Temperature">
        <Slider defaultValue={0.5} min={0} max={1} step={0.01} className='parameterSlider'/>
      </Form.Item>
      <Form.Item label="Response Length">
        <Slider defaultValue={30} min={1} max={512} step={1} className='parameterSlider' />
      </Form.Item>
      <Form.Item label="Stop Sequences">
        <Input />
      </Form.Item>
      <Form.Item label="Top P">
        <Slider defaultValue={1} min={0} max={1} step={0.01} className='parameterSlider' />
      </Form.Item>
      <Form.Item label="Frequency Penalty">
        <Slider defaultValue={0} min={0} max={1} step={0.01} className='parameterSlider' />
      </Form.Item>
      <Form.Item label="Presence Penalty">
        <Slider defaultValue={0} min={0} max={1} step={0.01} className='parameterSlider' />
      </Form.Item>
      <Form.Item label="Best of">
        <Slider defaultValue={1} min={1} max={20} step={1} className='parameterSlider' />
      </Form.Item>
    </Form>
  );
};


function PreviewForm() {
  
  const { Option } = Select;
  const [paneOpen, togglePane] = useState(false);

  return (
    <Form layout="vertical" className="grow p-6">

      <Form.Item label="Input">
        <MessageInput/>
      </Form.Item>

      <Form.Item label="Prompt">
        <Input.TextArea style={{  resize: 'none', height: '7rem' }} />
      </Form.Item>
      <Form.Item label="Completion">
        <Input.TextArea style={{  resize: 'none', height: '15rem' }} />
      </Form.Item>
    </Form>
  );
}

function MessageInput() {

  const [message, setMessage] = React.useState('');

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Message:', message);
  };

  return (
    <div className="relative rounded-md shadow-sm">
      <textarea
        className=" resize-none form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        rows={3}
        value={message}
        onChange={handleChange}
      />
      {/* <div className="absolute right-0 top-0 mt-3 mr-4">
        <button
          type="button"
          className="p-2 rounded-full bg-blue-300 hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          onClick={handleSubmit}
        >
          <SendOutlined />
        </button>
      </div> */}

      <SendButton />

    </div>
  );
  function SendButton() {
    return (
      <button className="absolute p-1 rounded-md text-gray-500 bottom right-1 md:bottom-2.5 md:right-4 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 20 20" className="h-4 w-4 rotate-90" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" 
        style={{}}>
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    )
  }
};

export default PreviewTune;

// function TopGPTChatInput() {
//   // let navigate = useNavigate();
//   return (
//     <div className="text-base gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
//       <div className="w-[30px] flex flex-col relative items-end">
//         <div className="relative flex">
//           {/* <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
//             <span style={{boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
//               <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2730%27/%3e" style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
//             </span>
//             <img alt="angel.santiago@tutanota.com" src="/_next/image?url=https%3A%2F%2Fs.gravatar.com%2Favatar%2F7c4f38b7e1938427795f79608c0b91f4%3Fs%3D480%26r%3Dpg%26d%3Dhttps%253A%252F%252Fcdn.auth0.com%252Favatars%252Fan.png&w=64&q=75" decoding="async" data-nimg="intrinsic" classname="rounded-sm" style={{position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
//           </span> */}
//         </div>
//       </div>
//       <div className="relative lg:w-[calc(100%-115px)] w-full flex flex-col">
//         <textarea 
//           className="resize-none focus:ring-0 focus-visible:ring-0 p-0 m-0 border-0 bg-transparent" 
//           style={{ height: "72px", overflowY: "hidden" }}>
//           empty
//         </textarea>
//         <div className="text-center mt-2 flex justify-center">
//           <button className="btn flex gap-2 justify-center btn-primary mr-2"> Save &amp; Submit</button>
//           <button className="btn flex gap-2 justify-center btn-neutral">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BottomGPTChatInput() {
//   return (

//     <div className="absolute bottom-0 left-0 w-full dark:border-transparent bg-vert-light-gradient dark:bg-vert-dark-gradient">
//       <form className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
//         <div className="relative flex h-full flex-1 flex-col">
//           <div className="w-full flex gap-2 justify-center mb-3">
//             <button className="btn flex justify-center gap-2 btn-neutral">
//               Regenerate response
//             </button>
//           </div>
//           <div className="flex flex-col w-full py-2 pl-3 md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
//             <textarea tabIndex={0} data-id="request-:r0:-1" rows={1} className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent" style={{maxHeight: '200px', height: '24px', overflowY: 'hidden'}} defaultValue={""} />
//             <button className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
//               Send
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6"><a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" rel="noreferrer" className="underline">ChatGPT Dec 15 Version</a>. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.</div>
//     </div>
//   );
// }
import React from 'react';
import { useNavigate } from "react-router-dom";
  
function Login() {
  let navigate = useNavigate();
  return (
    <div className="text-base gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
      <div className="w-[30px] flex flex-col relative items-end">
        <div className="relative flex">
          <span style={{boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', position: 'relative', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
            <span style={{boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}}>
              <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2730%27/%3e" style={{display: 'block', maxWidth: '100%', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: '0px', margin: '0px', padding: '0px', InlineBgimage: 'none', InlineBgcolor: 'initial', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
            </span>
            <img alt="angel.santiago@tutanota.com" src="/_next/image?url=https%3A%2F%2Fs.gravatar.com%2Favatar%2F7c4f38b7e1938427795f79608c0b91f4%3Fs%3D480%26r%3Dpg%26d%3Dhttps%253A%252F%252Fcdn.auth0.com%252Favatars%252Fan.png&w=64&q=75" decoding="async" data-nimg="intrinsic" classname="rounded-sm" style={{position: 'absolute', inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: 'auto', display: 'block', width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%', InlineBorderTop: 'initial', InlineBorderRight: 'initial', InlineBorderBottom: 'initial', InlineBorderLeft: 'initial'}} />
          </span>
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

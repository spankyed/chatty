import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import {  ModulePageModel, updateModule } from '../api';
import { useFormAction, useLoaderData, useSubmit } from 'react-router-dom';

// export default function MultiInput2() {
//   // const methods = useForm({
//   //   defaultValues: {
//   //     firstName: '',
//   //     lastName: ''
//   //   }
//   // });
  
//   const { Option } = Select;

//   const addInput = (values: any) => {
//     console.log('exp input')

//     // submit(formData, { method: 'post',  action });
//   }
//   return (
//     <>
//       <Form.Item label="Expected Inputs" name='inputs'>
//         {/* <Input value={cond} onSubmitCapture={}></Input> */}
//         <Input onSubmit={addInput}></Input>
//         <Select mode="multiple" disabled={true} defaultValue={['test','test2']}>
//           {/* {
//             otherModules.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
//           } */}
//         </Select>
//       </Form.Item>
//     </>
//   );
// };

export default function MultiInput() {
  return (
    <>
      <div className="ant-col ant-col-16 ant-form-item-control css-dev-only-do-not-override-1s3dcof">
        <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content">
              {/* <div className="ant-select ant-select-in-form-item css-dev-only-do-not-override-1s3dcof ant-select-multiple ant-select-disabled ant-select-show-search"> */}
              <div className="ant-select ant-select-in-form-item css-dev-only-do-not-override-1s3dcof ant-select-multiple ant-select-show-search">
                  <div className="ant-select-selector">
                    <div className="ant-select-selection-overflow">

                        <div className="ant-select-selection-overflow-item" style={{ opacity: 1 }}>
                          <span className="ant-select-selection-item" title="test">
                            <span className="ant-select-selection-item-content">
                              input 1
                            </span>
                          </span>
                        </div>
                        
                        <div className="ant-select-selection-overflow-item" style={{ opacity: 1 }}>
                          <span className="ant-select-selection-item" title="test">
                            <span className="ant-select-selection-item-content">
                              input 2
                            </span>
                          </span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};


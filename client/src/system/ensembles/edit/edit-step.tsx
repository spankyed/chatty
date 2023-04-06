import React, { useState } from 'react';
import { Select, Button, Divider, Form, Input } from 'antd';
import { action } from '..';
import { EnsemblePageModel, Step } from '../api';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

const compactLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};


const EditStep = ({ step }: { step: Step}) => {
  console.log('editting step: ', step);
  // if (!step) {
  //   return null;
  // }

  
  const { Option } = Select;
  // const { modules, module } = pageModel;

  // todo remove unneccesary state
  const [showConditions, toggleConditions] = useState(false);

  const mockMods = [
    {id: 'module', title: 'Module 1'},
    {id: 'module2', title: 'Module 2'},
    {id: 'module3', title: 'Module 3'},
  ];


  const addCondition = () => {
    let newConditions = [...step.conditionPaths, {id: 'condition', condition: 'Condition 1', goto: 'module'}];
    step.conditionPaths = newConditions;
  }

  return (
    <>

      <Form {...layout} onFinish={(values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => { formData.append(key, values[key] || '') });
        console.log('formData: ', formData);
        // submit(formData, { method: 'post',  action });
      }}>

        <Form.Item label="Module" name='module'>
          <Select
            defaultValue={step.module}
          >
            {
              mockMods.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
            }
          </Select>
        </Form.Item>

        <Form.Item label="Inputs From" name='inputs'>
          <Select
            defaultValue={step.module}
          >
            {
              mockMods.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
            }
          </Select>
        </Form.Item>
        {/* <Input.Group compact>
          <Form.Item name='inputs' {...compactLayout}>
            <Select
              defaultValue={step.hasConditions}
              onChange={onConditionsChange}
            >
              <Select.Option value={false}>without conditions</Select.Option>
              <Select.Option value={true}>with conditions</Select.Option>
            </Select>
          </Form.Item>
        </Input.Group> */}


        <div style={ {"outlineStyle": "dotted" }}>
          {/* {step.hasConditions && ( */}
          <div style={{display: 'flex', flexFlow: 'row wrap', minWidth: 0}}>   
          <div 
            className="ant-col ant-col-5 ant-form-item-label" 
            style={{ flex: '0 0 20.833333333333336%' }}
            onClick={() => toggleConditions(!showConditions)}>
            <div style={{textAlign: 'end'}}>
              Conditions
            </div>
          </div>  
          </div>

          {showConditions && (
              <>
                <Form.Item label="condition" name='inputs'>

                    {step.conditionPaths.map((path, index) => (
                      <Input value={path.condition}></Input>
                    ))}

                    <Button onClick={addCondition}>Add Condition</Button>
                </Form.Item>
              </>
          )}

          <Form.Item label="Else" name='inputs'>
            <Select
              defaultValue={step.nextAction}
            >
              {/* cant hardcode value */}
              <Select.Option value="continue">Continue to Next Step</Select.Option>
              <Select.Option value="rerun">Rerun Step</Select.Option>
              <Select.Option value="ensemble">Go to Another Ensemble</Select.Option>
              <Select.Option value="end">End the Ensemble</Select.Option>
            </Select>
          </Form.Item>
        </div>


      </Form>
        
    </>
  );
};

export default EditStep;

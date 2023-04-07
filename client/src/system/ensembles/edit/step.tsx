import React, { useEffect, useState } from 'react';
import { Select, Button, Divider, Form, Input } from 'antd';
import { action } from '..';
import { EnsemblePageModel, Path, Step } from '../api';
import { useStepContext } from './ctx';


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
  const { steps, addStep, updateStep, remove } = useStepContext();
  console.log('addStep: ', addStep);
  
  // console.log('val2: ', val);
  
  const { Option } = Select;
  // const { modules, module } = pageModel;

  const [conditions, updateConditions] = useState([] as Path[]);

  useEffect(() => {
    if (step.conditionPaths.length > 0) {
      updateConditions(step.conditionPaths);
    }
  }, []);

  const mockMods = [
    {id: 'module', title: 'Module 1'},
    {id: 'module2', title: 'Module 2'},
    {id: 'module3', title: 'Module 3'},
  ];

  const addCondition = () => {
    let newConditions = [...step.conditionPaths, {id: 'condition', condition: 'Condition 1', goto: 'module'}];
    step.conditionPaths = newConditions;
    updateConditions(step.conditionPaths);
  }

  const onConditionsChange = (idx: number, prop: Path['condition'] | Path['goto']) => (value: string) => {
    console.log('value: ', value);
    console.log('change')
    // step.conditionPaths[idx][prop] = value;
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

        <fieldset className="arh-fieldset">
          <legend style={{ all: 'unset' }}>Inputs From</legend>
          <Form.Item label="Input 1" name='inputs'>
            <Select
              defaultValue={step.module}
            >
              {
                mockMods.map((module: any) => <Option key={module.id} value={module.id}>{module.title}</Option>)
              }
            </Select>
          </Form.Item>
        </fieldset>

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

        <fieldset className="mb-4">
          <legend style={{ all: 'unset' }}>Conditions</legend>
          <Button onClick={addCondition} className='ml-2'>Add Condition</Button>
          {
            conditions.map((path, index) => {
              return (
                <>
                  <div style={ {"outlineStyle": "dotted" }}  className='m-4 py-2'>
                    <Form.Item label="condition" name={`condition${index}`}>
                      <Input 
                      key={index} 
                      value={path.condition}
                      onChange={onConditionsChange(index, 'goto')}>

                      </Input>
                    </Form.Item>
                    <Form.Item label="Then" name={`goto${index}`}>
                      <Select
                        onChange={onConditionsChange(index, 'goto')}
                        // defaultValue={step.conditionPaths[0]?.goto}
                      >
                        {/* cant hardcode value */}
                        <Select.Option value="continue">Continue to Next Step</Select.Option>
                        <Select.Option value="rerun">Rerun Step</Select.Option>
                        <Select.Option value="ensemble">Go to Another Ensemble</Select.Option>
                        <Select.Option value="end">End the Ensemble</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </>
              )
            })
          }
        </fieldset>

        <Form.Item label="Default Action" name='defaultAction'>
          <Select
            defaultValue={step.defaultAction}
          >
            {/* cant hardcode value */}
            <Select.Option value="continue">Continue to Next Step</Select.Option>
            <Select.Option value="rerun">Rerun Step</Select.Option>
            <Select.Option value="ensemble">Go to Another Ensemble</Select.Option>
            <Select.Option value="end">End the Ensemble</Select.Option>
          </Select>
        </Form.Item>

      </Form>
        
    </>
  );
};

export default EditStep;

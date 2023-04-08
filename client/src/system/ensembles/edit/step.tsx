import React, { useEffect, useState } from 'react';
import { Select, Button, Divider, Form, Input } from 'antd';
import { action } from '..';
import { EnsemblePageModel, Path, Step } from '../api';
import { useStepContext } from './ctx';

// const compactLayout = {
//   labelCol: { span: 10 },
//   wrapperCol: { span: 16 },
// };

const EditStep = () => {
  // if (!step) {
  //   return null;
  // }
  const { steps, selectedStep, addStep, updateStep, remove } = useStepContext();
  const step = steps.find(s => s.id === selectedStep);
  console.log('editing step: ', step);
  
  // console.log('val2: ', val);
  
  const { Option } = Select;
  // const { modules, module } = pageModel;

  const [conditions, updateConditions] = useState([] as Path[]);

  useEffect(() => {
    if (step && step.conditionPaths.length > 0) {
      updateConditions(step.conditionPaths);
    }
  }, []);

  const mockMods = [
    {id: 'module', title: 'Module 1'},
    {id: 'module2', title: 'Module 2'},
    {id: 'module3', title: 'Module 3'},
  ];

  const addCondition = () => {
    if (!step) return;
    let newConditions = [...step.conditionPaths, {id: 'condition', condition: 'Condition 1', goto: 'module'}];
    step.conditionPaths = newConditions;
    updateConditions(step.conditionPaths);
  }

  const onConditionsChange = (idx: number, prop: Path['condition'] | Path['goto']) => (value: string) => {
    // console.log('value change: ', value);
    // step.conditionPaths[idx][prop] = value;
  }

  return (
    <>
        <Form.Item label="Module" name='module'>
          <Select
            defaultValue={step?.module}
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
              defaultValue={step?.module}
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
                  <div style={ {"outlineStyle": "dotted" }}  className='m-4 py-2' key={index}>
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
            defaultValue={step?.defaultAction}
          >
            {/* cant hardcode value */}
            <Select.Option value="continue">Continue to Next Step</Select.Option>
            <Select.Option value="rerun">Rerun Step</Select.Option>
            <Select.Option value="ensemble">Go to Another Ensemble</Select.Option>
            <Select.Option value="end">End the Ensemble</Select.Option>
          </Select>
        </Form.Item>
    </>
  );
};

export default EditStep;

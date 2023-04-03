import React from 'react';
import { Select, Button, Divider, Form, Input } from 'antd';
import { action } from '..';


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


const EditStep = ({ step, conditions, onModuleChange, onConditionsChange, onConditionChange, onAddConditionClick, onNextActionChange }) => {
  // if (!step) {
  //   return null;
  // }

  return (
    <>

      <Form {...layout} onFinish={(values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => { formData.append(key, values[key] || '') });
        console.log('formData: ', formData);
        // submit(formData, { method: 'post',  action });
      }}>

        <Form.Item label="Module" name='inputs'>
          <Select
            defaultValue={step.module}
            onChange={onModuleChange}
          >
            <Select.Option value="module">Module 1</Select.Option>
            <Select.Option value="module2">Module2</Select.Option>
            <Select.Option value="module3">Modul3</Select.Option>
            {/* Add more options as needed */}
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


          
        {/* {step.hasConditions && ( */}
        {true && (
            <>
              <Form.Item label="Condtions" name='inputs'>
                  {conditions.map((condition, index) => (
                    <Select
                      key={index}
                      defaultValue={condition}
                      onChange={(value) => onConditionChange(index, value)}
                    >
                      <Select.Option value="option1">Option 1</Select.Option>
                      <Select.Option value="option2">Option 2</Select.Option>
                      <Select.Option value="option3">Option 3</Select.Option>
                      {/* Add more options as needed */}
                    </Select>
                  ))}

                  <Input.Group compact>
                  <Select
                    >
                      <Select.Option value="option1">Option 1</Select.Option>
                      <Select.Option value="option2">Option 2</Select.Option>
                      <Select.Option value="option3">Option 3</Select.Option>
                      {/* Add more options as needed */}
                    </Select>
                    <Select
                    >
                      <Select.Option value="option1">Option 1</Select.Option>
                      <Select.Option value="option2">Option 2</Select.Option>
                      <Select.Option value="option3">Option 3</Select.Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Input.Group>

                  <Button onClick={onAddConditionClick}>Add Condition</Button>
              </Form.Item>
            </>
        )}

        <Form.Item label="Then" name='inputs'>
          <Select
            defaultValue={step.nextAction}
            onChange={onNextActionChange}
          >
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

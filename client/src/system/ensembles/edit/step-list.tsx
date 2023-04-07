import React, { useState } from 'react';
import { Card, List, Divider, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useStepContext } from './ctx';

const StepList = ({ selectStep }: any) => {
  const { steps, addStep, updateStep, remove } = useStepContext();
  console.log('steps list: ', steps);

  const addNewStep = () => {
    console.log('adding new step: ', addStep);
    // let newSteps = [...ensemble.steps, { id: `${ensemble.steps.length}`, conditionPaths: [], defaultAction: 'continue'}];
    // ensemble.steps = newSteps;
    addStep({ id: `${steps.length}`, conditionPaths: [], defaultAction: 'continue'})
    // updateConditions(step.conditionPaths);
  }

  const renderStep = (step: any) => {
    return (
      <Card key={step.id} onClick={() => selectStep(step)} className=' rounded-none'>
        <div className="flex flex-row align-middle">
          <h3 className="mr-2 w-8 bg-gray-500 text-center items-center">{step.id}</h3>

          <div className="flex flex-col items-center justify-center flex-grow">
            <h3 className="ml-2">{step.description}</h3>
            <Divider/>
            <h3 className="ml-2">Continue to next step</h3>
          </div>
        </div>
      </Card>

    );
  };

  return (
    <>
      <div className="flex self-center justify-center sticky left-0 top-0 bg-gray-50 z-10 border-b-2">
        <Button 
          type="primary" 
          onClick={addNewStep}
          className="flex self-center justify-center"
          icon={ <PlusCircleOutlined style={{ marginTop: '5px' }} /> } 
          size='large'>
          New Step
        </Button>
      </div>


      {/* <Dropdown.Button disabled={true} menu={{ items: fineTuneOptions, onClick: fineTuneClick }} className="inline mr-2">
        Fine-Tune
      </Dropdown.Button> */}
      <List
       style={{ maxHeight: 'calc(100% - 42px)'}}
       className='overflow-auto p-0'
        dataSource={steps}
        renderItem={renderStep}
      />
    </>
  );
};

export default StepList;
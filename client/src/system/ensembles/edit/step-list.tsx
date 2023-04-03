import React, { useState } from 'react';
import { Card, List, Divider } from 'antd';

const StepList = ({ dialogueSteps, onStepClick }) => {
  const renderStep = (step) => {
    return (
      <Card key={step.id} onClick={() => onStepClick(step)}>
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
    <List
      dataSource={dialogueSteps}
      renderItem={renderStep}
    />
  );
};

export default StepList;
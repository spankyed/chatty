import React, { useState } from 'react';
import { Card, List, Divider, Row, Col, Input } from 'antd';
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from 'react-router-dom';
import { loadEditEnsemble, Ensemble, updateEnsemble } from '../api';
import StepList from './step-list';
import EditStep from './edit-step';
export default DialogueEnsembleEditor;

const testData = [
  {
    id: 1,
    description: 'Greet the user',
    module: 'greeting',
    hasConditions: false,
    conditions: [],
    nextAction: 'continue'
  },
  {
    id: 2,
    description: 'Ask the user for their name',
    module: 'input',
    hasConditions: false,
    conditions: [],
    nextAction: 'continue'
  },
  {
    id: 3,
    description: 'Say goodbye to the user',
    module: 'goodbye',
    hasConditions: false,
    conditions: [],
    nextAction: 'end'
  }
];


function DialogueEnsembleEditor(){
  const [selectedStep, setSelectedStep] = useState(null);
  const [dialogueSteps, setDialogueSteps] = useState([]);
  const [conditions, setConditions] = useState([]);

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  const handleModuleChange = (value) => {
    // Update the selected step's module
  };

  const handleConditionsChange = (value) => {
    // Update the selected step's hasConditions flag
  };

  const handleConditionChange = (index, value) => {
    // Update the condition at the given index
  };

  const handleAddConditionClick = () => {
    // Add a new condition to the list
  };

  const handleNextActionChange = (value) => {
    // Update the selected step's nextAction
  };

  return (
    <>
      <Input placeholder="Natural Language Processor" name='title' className='w-1/3 mb-4'/>
      <Row gutter={16}>

        <Col span={8}>
          <StepList
            dialogueSteps={testData}
            onStepClick={handleStepClick}
          />
        </Col>

        <Col span={16}>
          <EditStep
            step={testData[0]}
            conditions={conditions}
            onModuleChange={handleModuleChange}
            onConditionsChange={handleConditionsChange}
            onConditionChange={handleConditionChange}
            onAddConditionClick={handleAddConditionClick}
            onNextActionChange={handleNextActionChange}
          />
        </Col>


      </Row>
    </>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.ensembleId
  console.log('id: ', id);
  if (!id) throw new Response("", { status: 404 });
  const pageModel = await loadEditEnsemble(id);
  console.log('pageModel: ', pageModel);
  if (!pageModel) throw new Response("", { status: 404 });
  return pageModel;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('request: ', request);
  const formData = await request.formData();
  const ensembleData = Object.fromEntries(formData) as unknown as Ensemble;
  console.log('data: ', {ensembleData, formData: [...formData]});
  const ensemble = await updateEnsemble(ensembleData.id, {
    id: ensembleData.id,
    title: ensembleData.title,
  }); // todo have some default values

  // todo combine delete action with this
  return redirect(`/system`);
}

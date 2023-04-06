import React, { useState } from 'react';
import { Card, List, Divider, Row, Col, Input, Button } from 'antd';
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from 'react-router-dom';
import { loadEditEnsemble, Ensemble, updateEnsemble, EnsemblePageModel } from '../api';
import StepList from './step-list';
import EditStep from './edit-step';
import { useFormAction, useSubmit, useLoaderData } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';


export default function EnsembleEditor(){
  const [selectedStep, setSelectedStep] = useState(null);
  // const [dialogueSteps, setDialogueSteps] = useState([]);
  const [conditions, setConditions] = useState([]);

  const handleStepClick = (step: any) => {
    setSelectedStep(step);
  };

  // let action = useFormAction();
  // let submit = useSubmit();
  // const ensembleModel = useLoaderData() as EnsemblePageModel;
  const { ensemble } = useLoaderData() as EnsemblePageModel;

  return (
    <>
      <Input placeholder="Natural Language Processor" name='title' className='w-1/3 mb-4' value={ensemble.title}/>
      <Row gutter={16}>

        <Col span={8}>
          <StepList
            steps={ensemble.steps}
            selectStep={handleStepClick}
          />
          <Button 
            type="primary" 
            // htmlType="submit"
            onClick={() => {console.log('add new step')}}
            className="flex self-center justify-center"
            icon={
              <PlusCircleOutlined 
              style={{ marginTop: '5px' }}
              />
            } 
            size='large'
          >
            {/* <SaveOutlined /> */}
            {/* <Text style={{ fontSize: 12 }}>Add a New Module</Text> */}
            New Step
          </Button>
        </Col>

        <Col span={16}>
          <EditStep
            step={selectedStep ? selectedStep : ensemble.steps[0]}
          />
        </Col>

      </Row>
    </>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.ensembleId
  console.log('ensemble id: ', id);
  if (!id) throw new Response("", { status: 404 });
  const ensemble = await loadEditEnsemble(id);
  console.log('ensemble: ', ensemble);
  if (!ensemble) throw new Response("", { status: 404 });
  return ensemble;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('update ensemble: ', {request});
  const formData = await request.formData();
  const ensembleData = Object.fromEntries(formData) as unknown as Ensemble;
  console.log('data: ', {ensembleData, formData: [...formData]});
  const ensemble = await updateEnsemble(ensembleData.id, {
    id: ensembleData.id,
    title: ensembleData.title,
    steps: []
  });

  // todo combine delete action with this
  return redirect(`/system/ensembles`);
}

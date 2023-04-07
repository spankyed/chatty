import React, { createContext, useContext, useState } from 'react';
import { Card, List, Divider, Row, Col, Input, Button, Form, Space } from 'antd';
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from 'react-router-dom';
import { loadEditEnsemble, Ensemble, updateEnsemble, EnsemblePageModel, Path, Step } from '../api';
import StepList from './step-list';
import EditStep from './step';
import { useFormAction, useSubmit, useLoaderData } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';
import { StepProvider } from './ctx';
// import { EnsembleContext } from './ctx';
import './edit.css'


const tailLayout = {
  wrapperCol: {    span: 16 },
};

export default function EnsembleEditor(){
  const [selectedStep, setSelectedStep] = useState(null);
  // const [dialogueSteps, setDialogueSteps] = useState([]);
  // const [conditions, setConditions] = useState([]);
  let action = useFormAction();
  let submit = useSubmit();

  // const { steps, addStep, updateStep, remove } = useStepContext();
  const { ensemble } = useLoaderData() as EnsemblePageModel;

  const handleStepClick = (step: any) => {
    setSelectedStep(step);
  };

  const fin = (values: any) => {
    const formData = new FormData();

    console.log('values: ', values);
    Object.keys(values).forEach(key => { formData.append(key, values[key] || '') });

    submit(formData, { method: 'post',  action });
  }

  return (
    <>
      <StepProvider>
        <Form>

          <section className='ensemble-header-wrap'>
            <div className="ensemble-title">
              <label for="new-title-text" className="hidden">Ensemble name</label>
              <Input placeholder="Natural Language Processor" name='title' className='w-full h-8' value={ensemble.title} />
            </div>


            <Form.Item className='w-full '>
              <Space  className='float-right'>
                <Button type="primary" htmlType="submit" className="mr-2 bg-blue-700 hover:bg-blue-100">
                  Done
                </Button>

                <Button type="link" htmlType="button" onClick={() => {}} className="mr-2">
                  Preview
                </Button>
                <Button disabled={true} type="primary" htmlType="submit" className="mr-2 bg-red-700 hover:bg-red-100">
                  Delete
                </Button>

              </Space>
            </Form.Item>
          </section>

          <div className='flex flex-row'>
            <div style={{ width: '20vw', maxHeight: '70vh' }} className='border-2 border-r-0 overflow-hidden'>
              <StepList selectStep={handleStepClick}/>
            </div>

            <div className='flex-grow border-2 p-4 overflow-auto'  style={{ maxHeight: '70vh' }}>
              <EditStep step={selectedStep ? selectedStep : ensemble.steps[0]}/>
            </div>
          </div>

        </Form>

      </StepProvider>
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

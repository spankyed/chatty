
import { Dialogue, DialoguePageModel, loadEditDialogue, updateDialogue } from '../api';
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import { ModulePageModel } from '../../modules/api';
import { useEffect, useState } from 'react';
import { DialogueProvider, useDialogueContext } from './ctx';
import DialogueTreeWrapper from './dialogueTree';
import InputsWrapper from './inputs';

// must be indented
const mockDialogue = `
Where are you?
-> Home
  Nice.
  <<doSomething home>>
-> Work
  Rough.
  <<doSomething work>>
That's it!
`

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};



function Dialogues({}: any) {
  // console.log('ensemble: ', ensemble);
  // let navigate = useNavigate();

  // preview open state
  const [previewOpen, setPreviewOpen] = useState(false);
  // const { dialogue, updateDialogue } = useDialogueContext();
  

  const fin = (values: any) => {
    console.log('fin')
    // console.log('dialoguetext: ', dialogue.text);
  }

  return (
    <>
      <DialogueProvider>
        <Form {...layout} onFinish={fin}>

          <InputsWrapper/>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="mr-2 bg-blue-700 hover:bg-blue-100">
              Done
            </Button>
            <Button type="primary" htmlType="button" onClick={() => setPreviewOpen(!previewOpen)} className="mr-2">
              Preview
            </Button>
            <Button disabled={true} type="primary" htmlType="submit" className="mr-2 bg-red-700 hover:bg-red-100 float-right">
              Delete
            </Button>
          </Form.Item>

        </Form>
        { previewOpen && (
            <DialogueTreeWrapper/>
        )}
      </DialogueProvider>
    </>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.dialogueId
  if (!id) throw new Response("", { status: 404 });
  const pageModel = await loadEditDialogue(id);
  if (!pageModel) throw new Response("", { status: 404 });
  return pageModel;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dialogueData = Object.fromEntries(formData) as unknown as Dialogue;
  console.log('dialogue edit formdata: ', {dialogueData, formData: [...formData]});
  const dialogue = await updateDialogue(dialogueData.id, {
    id: dialogueData.id,
    title: dialogueData.title,
    text: dialogueData.text,
  }); // todo have some default values
}

export default Dialogues


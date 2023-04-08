// @ts-ignore
import DialogueTree from 'react-dialogue-tree' // ! no typings
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

import { Dialogue, DialoguePageModel, loadEditDialogue, updateDialogue } from '../api';
import { LoaderFunctionArgs, ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { Button, Dropdown, Form, Input, MenuProps, Radio, Select, Slider } from 'antd';
import { ModulePageModel } from '../../modules/api';

// yarnspinner mock dialogue
const mockDialogue = `
title: Start
---
Ship: Hey, friend.
Player: Hi, Ship.
===
`

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

function Dialogues({}: any) {
  // console.log('ensemble: ', ensemble);
  // let navigate = useNavigate();
  const pageModel = useLoaderData() as DialoguePageModel;
  console.log('dailogue pageModel: ', pageModel);

  const { dialogue } = pageModel;


  const fin = (values: any) => {
    console.log('fin')
  }
  
  return (
    <>
      <Form {...layout} onFinish={fin}>

        <Form.Item label="Text" name='text' initialValue={dialogue.text}>
          <Input.TextArea style={{  resize: 'none', height: '7rem' }} value={dialogue.text}/>
        </Form.Item>

      </Form>
      <DialogueTree dialogue={mockDialogue} />
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


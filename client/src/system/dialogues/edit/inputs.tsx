import { Form, Input } from "antd";
import { useDialogueContext } from "./ctx";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { DialoguePageModel } from "../api";


export default function InputsWrapper ({ children }: any) {
  const { dialogue, updateDialogue } = useDialogueContext();
  
  const pageModel = useLoaderData() as DialoguePageModel;
  const dialogueModel = pageModel;

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDialogue({ ...dialogue, text: e.target.value });
    console.log('e.target.value: ', e.target.value);
    console.log('dialogue: ', dialogue);
  }


  useEffect(() => {
    if (dialogueModel) {
      console.log('dialogueModel.dialogue): ', dialogueModel.dialogue);
      updateDialogue(dialogueModel.dialogue);
    }
  }, []);
  
  return (
    <>
      <Form.Item 
        label="Title"
        name="title"
        rules={[
          { required: true, message: 'Please input a title' },
          // {
          //   pattern: /^[a-zA-Z0-9]+$/,
          //   message: 'Name can only include letters and numbers.',
          // },
        ]}
        initialValue={dialogue.title}
      >
        <Input placeholder="Default dialogue title" name='title' value={dialogue.title}/>
      </Form.Item>

      <Form.Item label="Text" name='text' initialValue={dialogue.text}>
        <Input.TextArea style={{  resize: 'none', height: '20rem' }} value={dialogue.text} onChange={updateText}/>
      </Form.Item>
    </>
  )
}
    
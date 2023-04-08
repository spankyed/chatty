import { useNavigate, Form as RouterForm, redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
import { createDialogue, getDialogues } from './api';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Dialogue } from '../dialogues/api';

function Dialogues({}: any) {
  const dialogues = useLoaderData() as Dialogue[];
  console.log('dialogues: ', dialogues);


  return (
    <>
    <div className="flex flex-col w-full h-full justify-start">

      <RouterForm 
        method="post"
        className="absolute top-0 right-0 mr-24" 
        style={{ marginTop: '8px' }}
      >
        <Button 
          type="primary" 
          htmlType="submit"
          className="flex self-center justify-center"
          icon={
            <PlusCircleOutlined 
            style={{ marginTop: '5px' }}
            />
          } 
          size='large'
        >
          {/* <SaveOutlined /> */}
          {/* <Text style={{ fontSize: 12 }}>Add a New Dialogue</Text> */}
          Add a New Dialogue
        </Button>
      </RouterForm>

      <div className="w-full flex-grow flex flex-row flex-wrap mb-6 justify-start">

        {
          dialogues.map((dialogue, index) => {
            return (
              <DialogueItem key={index} dialogue={dialogue} index={index}/>
            )
          })
          // (new Array(9)).fill(null).map((item, index) => {
          //   return (
          //     <DialogueItem key={index} />
          //   )
          // })

        }
      </div>

    </div>
    </>
  );
}

function DialogueItem({ dialogue, index }: { dialogue: Dialogue, index: number }) {
  // console.log('dialogue: ', dialogue);
  let navigate = useNavigate();
  return (
    <Link to={`/system/dialogues/${dialogue.id}`} style={{ textTransform: 'capitalize' }}>
      Test dialogue
    </Link>
  );
}


export async function loader(args: LoaderFunctionArgs) {
  console.log('dialogue loader args: ', args);
  const dialogues = await getDialogues();
  if (!dialogues) throw new Response("", { status: 404 });
  return dialogues;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log('create dialogue formdata: ', formData);
  const dialogue = await createDialogue({
    id: '',
    title: 'default title',
    text: '',
    isNew: true,
  });
  return redirect(`/system/dialogues/${dialogue.id}`);
}

export default Dialogues


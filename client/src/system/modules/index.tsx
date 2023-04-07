import { useNavigate, Form as RouterForm, redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
// import { Link } from '@types/react-router-dom';
import React from 'react';
import { Button, Card, Input, Space, Typography, Form  } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import { createModule, getModules, Module } from "./api";
// import { useForm } from "react-hook-form";

const { Meta } = Card;
const { Text } = Typography;

// const App: React.FC = () => (
//   <div className="site-card-wrapper">
//     <Row gutter={16}>
//       <Col span={8}>
//         <Card title="Card title" bordered={false}>
//           Card content
//         </Card>
//       </Col>
//       <Col span={8}>
//         <Card title="Card title" bordered={false}>
//           Card content
//         </Card>
//       </Col>
//       <Col span={8}>
//         <Card title="Card title" bordered={false}>
//           Card content
//         </Card>
//       </Col>
//     </Row>
//   </div>
// );

function Modules() {
  const modules = useLoaderData() as Module[];
  console.log('modules: ', modules);

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
          {/* <Text style={{ fontSize: 12 }}>Add a New Module</Text> */}
          Add a New Module
        </Button>
      </RouterForm>



      <div className="w-full flex-grow flex flex-row flex-wrap mb-6 justify-start">

        {
          modules.map((module, index) => {
            return (
              <ModuleItem key={index} module={module} index={index}/>
            )
          })
          // (new Array(9)).fill(null).map((item, index) => {
          //   return (
          //     <ModuleItem key={index} />
          //   )
          // })

        }
      </div>

    </div>
    </>
  );
}

function ModuleItem({ module, index }: { module: Module, index: number }) {
  // console.log('module: ', module);
  let navigate = useNavigate();
  return (
    <Link to={`/system/modules/${module.id}`} style={{ textTransform: 'capitalize' }}>
      <Card 
        className="m-2 p-2"
        title={module.title} style={{ width: 300 }}  
        extra={<Text style={{ fontSize: 24 }}>{index + 1}</Text>}>
        <div style={{ marginTop: 16 }}>
          <Text style={{ marginBottom: 16 }}>{module.prompt}</Text>
          {/* <Form
            <Form.Item label="Condition">
              <Input />
            </Form.Item>
            <Form.Item label="Go to">
              <Input />
            </Form.Item>
          </Form> */}
        </div>
      </Card>
    </Link>
  );
}

export async function loader(args: LoaderFunctionArgs) {
  console.log('module loader args: ', args);
  const modules = await getModules();
  if (!modules) throw new Response("", { status: 404 });
  return modules;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log('create module formdata: ', formData);
  const module = await createModule({
    id: '',
    title: 'default title',
    // title: formData.get<("title"),
    prompt: '',
    isNew: true,
    // content: formData.get("content"),
  }); // todo have some default values
  return redirect(`/system/modules/${module.id}`);
}

export default Modules

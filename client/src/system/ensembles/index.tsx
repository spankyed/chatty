import { useNavigate, Form as RouterForm, redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
// import { Link } from '@types/react-router-dom';
import React from 'react';
import { Button, Card, Input, Space, Typography, Form  } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import { createEnsemble, getEnsembles, Ensemble } from "./api";
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

export async function loader(args: LoaderFunctionArgs) {
  const ensembles = await getEnsembles();
  console.log('all ensembles: ', ensembles);
  if (!ensembles) throw new Response("", { status: 404 });
  return ensembles;
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('request: ', request);
  const formData = await request.formData();
  const ensemble = await createEnsemble({
    id: '',
    title: 'default ensemble title',
    // title: formData.get<("title"),
    isNew: true,
    steps: [{ id: '', paths: [], inputFrom: '' }]
    // content: formData.get("content"),
  });
  return redirect(`/system/ensembles/${ensemble.id}`);
}

function Ensembles() {
  const ensembles = useLoaderData() as Ensemble[];
  console.log('ensembles: ', ensembles);

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
          {/* <Text style={{ fontSize: 12 }}>Add a New Ensemble</Text> */}
          Add a New Ensemble
        </Button>
      </RouterForm>

      <div className="w-full flex-grow flex flex-row flex-wrap mb-6 justify-start">
        {
          ensembles.map((ensemble, index) => {
            return (
              <EnsembleItem key={index} ensemble={ensemble} index={index}/>
            )
          })
          // (new Array(9)).fill(null).map((item, index) => {
          //   return (
          //     <EnsembleItem key={index} />
          //   )
          // })

        }
      </div>

    </div>
    </>
  );
}

function EnsembleItem({ ensemble, index }: { ensemble: Ensemble, index: number }) {
  // console.log('ensemble: ', ensemble);
  // let navigate = useNavigate();
  return (
    <Link to={`/system/ensembles/${ensemble.id}`} style={{ textTransform: 'capitalize' }}>
      <Card 
        className="m-2 p-2"
        // title={ensemble.title} style={{ width: 300 }}  
        // extra={<Text style={{ fontSize: 24 }}>{index + 1}</Text>}
        >
        <div style={{ marginTop: 16 }}>

          <Text style={{ marginBottom: 16 }}>{ensemble.title}</Text>

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


export default Ensembles

import { useNavigate } from "react-router-dom";
  
function Login() {
  let navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={() => {
          navigate('/user/dashboard');
        }}
      />
    </div>
  );
}

function App() {
  const navs = [
    {id: 1, name: 'Home', path: '/', element: <Home/>},
    {id: 2, name: 'About', path: '/about', element: <About/>},
    {id: 3, name: 'Clock', path: '/clock', element: <Clock/>},
  ];
  return (
    <>
      <Routes>
        {
          navs.map((nav) => {
            return (
                <Route key={nav.id} path={nav.path} element={nav.element}/>
            );
          })
        }
      </Routes>
    </>
  );
}


/**
 * Using React and the Ant design framework write an app that allows you to design the flow of a chatbot. 
 * Make it in similar fashion to IBM Watson conversation, where action nodes recognize intents/entities and trigger child nodes. 
 * Should be a single page. The page should have be a list of Ant cards which are the nodes of the dialogue.
 */
import React, { useState } from 'react';
import { Card, Col, Row, Input, Button, message } from 'antd';

const ChatbotDesigner = () => {
  const [nodes, setNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);

  const addNode = () => {
    // create a new node with a unique id and an empty label
    const newNode = {
      id: nodes.length + 1,
      label: '',
    };
    setNodes([...nodes, newNode]);
    setCurrentNode(newNode);
  };

  const updateNodeLabel = (e) => {
    // update the label of the current node
    const newLabel = e.target.value;
    setCurrentNode((currentNode) => ({
      ...currentNode,
      label: newLabel,
    }));
  };

  const saveNode = () => {
    if (!currentNode || !currentNode.label) {
      // show an error message if the node has no label
      message.error('Please enter a label for the node.');
      return;
    }
    // update the node in the list of nodes
    setNodes(
      nodes.map((node) => (node.id === currentNode.id ? currentNode : node))
    );
    // clear the current node
    setCurrentNode(null);
  };

  const deleteNode = (nodeId) => {
    // remove the node with the specified id from the list of nodes
    setNodes(nodes.filter((node) => node.id !== nodeId));
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={addNode}>
            Add Node
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        {nodes.map((node) => (
          <Col span={8} key={node.id}>
            <Card
              title={
                <Input
                  value={node.label}
                  onChange={updateNodeLabel}
                  onPressEnter={saveNode}
                />
              }
              actions={[
                <Button type="link" onClick={saveNode}>
                  Save
                </Button>,
                <Button type="link" onClick={() => deleteNode(node.id)}>
                  Delete
                </Button>,
              ]}
            >
              Node actions and child nodes go here
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

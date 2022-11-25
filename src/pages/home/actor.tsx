import { useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import SlidingPane from "react-sliding-pane";

const defaultNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
];

const defaultEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const proOptions = { hideAttribution: true, account: 'thisDick'};
const DialogFlow = () => {

  const [paneOpen, togglePane] = useState(false);

  return (
    <>
      <ReactFlow 
        defaultNodes={defaultNodes} 
        defaultEdges={defaultEdges} 
        onNodeClick={() => togglePane(!paneOpen)}
        proOptions={proOptions}
      />

      {/* <SlidingPane
        closeIcon={<div>x</div>}
        isOpen={paneOpen}
        title="Hey, it is optional pane title.  I can be React component too."
        from="left"
        width="200px"
        onRequestClose={() => togglePane(false)}
        >
        <div>And I am pane content on left.</div>
      </SlidingPane> */}
    </>
  );
};

export default DialogFlow;




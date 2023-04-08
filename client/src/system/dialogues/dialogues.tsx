import DialogueTree from 'react-dialogue-tree'
import 'react-dialogue-tree/dist/react-dialogue-tree.css'

// yarnspinner mock dialogue
const mockDialogue = `
title: Start
---
Ship: Hey, friend.
Player: Hi, Ship.
===
`


function Dialogues({}: any) {
  // console.log('ensemble: ', ensemble);
  // let navigate = useNavigate();
  return (
    <DialogueTree dialogue={mockDialogue} />
  );
}

export default Dialogues


import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Dialogue } from "../api";

type DialogueContextType = {
  dialogue: Dialogue;
  updateDialogue: (item: Dialogue) => void;
};

const initialDialogue = {
  id: '1',
  title: '',
  text: ''
}

export const DialogueContext = createContext<DialogueContextType>({
  dialogue: {
    id: '1',
    title: '',
    text: ''
  },
  updateDialogue: (item: Dialogue) => {}, // ! limitations when passing update fns as context
})

function DialogueProvider(props: any) {
  const [dialogue, setDialogue] = useState({
    id: '1',
    title: '',
    text: ''
  });

  function updateDialogue(item: Dialogue) {
    console.log('item: ', item);
    setDialogue({...dialogue, ...item});
  }

  const dialogueData = { dialogue, updateDialogue };

  return <DialogueContext.Provider value={dialogueData} {...props} />;
}

function useDialogueContext() {
  return useContext(DialogueContext);
}

export { DialogueProvider, useDialogueContext };

// @ts-ignore
import DialogueTree from 'react-dialogue-tree' // ! no typings
import 'react-dialogue-tree/dist/react-dialogue-tree.css'
import { useDialogueContext } from "./ctx";

const indentString = (str: string, count: number, indent = ' ') => str.replace(/^/gm, indent.repeat(count));

const wrapDialogue = (dialogue: string) => {
  console.log('dialogue: ', dialogue);
  return `
  title: Start
  ---
  ${indentString(dialogue, 2)}
  ===
`
}

export default function DialogueTreeWrapper() {
  const { dialogue } = useDialogueContext();
  return (
    <DialogueTree dialogue={wrapDialogue(dialogue.text)} />
  )
}
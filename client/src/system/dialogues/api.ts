import localforage from "localforage";

// localforage.clear();

export type Dialogue = {
  id: string;
  title: string;
  text?: string;
  isNew?: boolean;
}

export type DialoguePageModel = {
  dialogue: Dialogue;
}

function set(dialogues: Dialogue[]) {
  return localforage.setItem("dialogues", dialogues);
}

async function get(): Promise<Dialogue[]> {
  let dialogues = await localforage.getItem<Dialogue[]>("dialogues");
  if (!dialogues) dialogues = [];
  return dialogues;
}


export async function loadEditDialogue(id: string): Promise<DialoguePageModel | false> { // todo type
  let dialogues = await get();
  let dialogue = dialogues.find((dialogue) => dialogue.id === id)
  if (!dialogues.length || !dialogue) return false; // iffy
  // todo retrieve models for model-dropdown as well
  return { dialogue };
}

export async function getDialogues(): Promise<Dialogue[]> {
  return await get();
}

export async function getDialogue(id: string) {
  let dialogues = await get();
  if (!dialogues.length) return false;
  let dialogue = dialogues.find((dialogue) => dialogue.id === id);
  return dialogue ?? null;
}

export async function createDialogue({ title, text }: Dialogue) {
  console.log('createDialogue: ',  { title, text });
  let id = Math.random().toString(36).substring(2, 9);
  let dialogue = { id, title, text } as Dialogue;
  // let dialogue = { id, title: '', content: '' };
  let dialogues = await getDialogues();
  // dialogues.unshift(dialogue);
  dialogues.push(dialogue);
  await set(dialogues);
  return dialogue;
}

export async function updateDialogue(id: string, dialogue: Dialogue) {
  let dialogues = await get();
  if (!dialogues.length) return false;
  let index = dialogues?.findIndex((dialogue) => dialogue.id === id);
  if (index > -1) {
    dialogues[index] = dialogue;                                                                                                                             
    await set(dialogues);
    return true;
  }
  return false;
}

export async function deleteDialogue(id: string) {
  let dialogues = await get();
  if (!dialogues.length) return false;
  let index = dialogues?.findIndex((dialogue) => dialogue.id === id);
  if (index > -1) {
    dialogues.splice(index, 1);
    await set(dialogues);
    return true;
  }
  return false;
}



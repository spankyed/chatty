import localforage from "localforage";

// localforage.clear();

export type Ensemble = {
  id: string;
  title: string;
  prompt?: string;
  isNew?: boolean;
}

export type PageModel = {
  ensembles: Ensemble[];
  ensemble: Ensemble;
}

function set(ensembles: Ensemble[]) {
  return localforage.setItem("ensembles", ensembles);
}

async function get(): Promise<Ensemble[]> {
  let ensembles = await localforage.getItem<Ensemble[]>("ensembles");
  if (!ensembles) ensembles = [];
  return ensembles;
}


export async function loadEditEnsemble(id: string): Promise<PageModel | false> { // todo type
  let ensembles = await get();
  let ensemble = ensembles.find((ensemble) => ensemble.id === id)
  if (!ensembles.length || !ensemble) return false; // iffy
  // todo retrieve models for model-dropdown as well
  return { ensembles, ensemble };
}

export async function getEnsembles(): Promise<Ensemble[]> {
  return await get();
}

export async function getEnsemble(id: string) {
  let ensembles = await get();
  if (!ensembles.length) return false;
  let ensemble = ensembles.find((ensemble) => ensemble.id === id);
  return ensemble ?? null;
}

export async function createEnsemble({ title, prompt }: Ensemble) {
  let id = Math.random().toString(36).substring(2, 9);
  let ensemble = { id, title, prompt };
  // let ensemble = { id, title: '', content: '' };
  let ensembles = await getEnsembles();
  // ensembles.unshift(ensemble);
  ensembles.push(ensemble);
  await set(ensembles);
  return ensemble;
}

export async function updateEnsemble(id: string, ensemble: Ensemble) {
  let ensembles = await get();
  if (!ensembles.length) return false;
  let index = ensembles?.findIndex((ensemble) => ensemble.id === id);
  if (index > -1) {
    ensembles[index] = ensemble;                                                                                                                             
    await set(ensembles);
    return true;
  }
  return false;
}

export async function deleteEnsemble(id: string) {
  let ensembles = await get();
  if (!ensembles.length) return false;
  let index = ensembles?.findIndex((ensemble) => ensemble.id === id);
  if (index > -1) {
    ensembles.splice(index, 1);
    await set(ensembles);
    return true;
  }
  return false;
}



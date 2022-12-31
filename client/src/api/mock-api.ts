import localforage from "localforage";

// localforage.clear();

export type Module = {
  id: string;
  title: string;
  content?: string;
}

export type PageModel = {
  modules: Module[];
  module: Module;
}

function set(modules: Module[]) {
  return localforage.setItem("modules", modules);
}

async function get(): Promise<Module[]> {
  let modules = await localforage.getItem<Module[]>("modules");
  if (!modules) modules = [];
  return modules;
}


export async function loadEditModule(id: string): Promise<PageModel | false> { // todo type
  let modules = await get();
  let module = modules.find((module) => module.id === id)
  if (!modules.length || !module) return false; // iffy
  // todo retrieve models for model-dropdown as well
  return { modules, module };
}

export async function getModules(): Promise<Module[]> {
  return await get();
}

export async function getModule(id: string) {
  let modules = await get();
  if (!modules.length) return false;
  let module = modules.find((module) => module.id === id);
  return module ?? null;
}

export async function createModule({ title, content }: Module) {
  let id = Math.random().toString(36).substring(2, 9);
  let module = { id, title, content };
  // let module = { id, title: '', content: '' };
  let modules = await getModules();
  modules.unshift(module);
  await set(modules);
  return module;
}

export async function updateModule(id: string, module: Module) {
  let modules = await get();
  if (!modules.length) return false;
  let index = modules?.findIndex((module) => module.id === id);
  if (index > -1) {
    modules[index] = module;                                                                                                                             
    await set(modules);
    return true;
  }
  return false;
}

export async function deleteModule(id: string) {
  let modules = await get();
  if (!modules.length) return false;
  let index = modules?.findIndex((module) => module.id === id);
  if (index > -1) {
    modules.splice(index, 1);
    await set(modules);
    return true;
  }
  return false;
}



import Layout from "./layout";
import { LaptopOutlined, NotificationOutlined, PartitionOutlined, UserOutlined, WechatOutlined, TableOutlined, DatabaseOutlined} from '@ant-design/icons';
import System from "../system";
import Modules, { action as newModule, loader as modulesLoader} from "../system/modules/modules";
import ModuleEdit, { action as moduleAction, loader as moduleLoader } from "../system/modules/edit/module-edit";
import Ensembles, { action as newEnsemble, loader as ensemblesLoader} from "../system/ensembles/ensembles";
import EnsembleEdit, { action as ensembleAction, loader as ensembleLoader } from "../system/ensembles/edit/edit";
import Dialogues from "../system/dialogues/dialogues";
// import Dialogues, { action as newDialogue, loader as dialoguesLoader} from "../system/dialogues";
// import DialogueEdit, { action as dialogueAction, loader as dialogueLoader } from "../system/dialogues/edit/edit";

const routes = [
  {
    name: 'agents',
    element: <div>empty</div>,
    icon: UserOutlined,
  },
  {
    name: 'database',
    element: <div>empty</div>,
    icon: DatabaseOutlined,
  },
  {
    name: 'system',
    element: <System/>,
    icon: PartitionOutlined,
    // todo going to /system should redirect to /system/modules
    children: [
      {
        path: 'modules',
        element: <Modules/>,
        loader: modulesLoader,
        action: newModule,
      },
      {
        path: 'ensembles',
        element: <Ensembles/>,
        loader: ensemblesLoader,
        action: newEnsemble,
      },
      {
        path: 'dialogues',
        element: <Dialogues/>,
        // icon: WechatOutlined,
        // loader: ensemblesLoader,
        // action: newEnsemble,
      },
    ]
  },
  {
    name: 'catalog',
    element: <div>empty</div>,
    icon: TableOutlined,
    // loader: ()=>{},
    // action: ()=>{},
  },
  ]

const dynamicRoutes = [
  {
    path: 'system/modules/:moduleId',
    dynamic: true,
    element: <ModuleEdit/>,
    loader: moduleLoader,
    action: moduleAction,
    // errorElement: <h2>Note not found</h2>,
  },
  {
    path: 'system/ensembles/:ensembleId',
    dynamic: true,
    element: <EnsembleEdit/>,
    loader: ensembleLoader,
    action: ensembleAction,
    // errorElement: <h2>Note not found</h2>,
  },
  {
    path: 'system/dialogues/:dialogueId',
    dynamic: true,
    element: <div>empty</div>,
    // element: <DialogueEdit/>,
    // loader: dialogueLoader,
    // action: dialogueAction,
    // errorElement: <h2>Note not found</h2>,
  } 
]

const router = [
  {
    path: "/",
    element: <Layout />,
    // loader: rootLoader,
    children: [
      ...routes.map((route, idx) => ({
        path: route.name,
        element: route.element,
        ...(route.children && { children: route.children }),
        ...(route.action && { action: route.action }),
        ...(route.loader && { loader: route.loader }),
      })),
      ...dynamicRoutes
    ],
  },
]
console.log('router: ', router);

export {
  router,
  routes
};

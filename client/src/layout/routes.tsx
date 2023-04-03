import Layout from "./layout";
import { LaptopOutlined, NotificationOutlined, PartitionOutlined, UserOutlined, WechatOutlined, TableOutlined} from '@ant-design/icons';
import System from "../system";
import Modules, { action as newModule, loader as modulesLoader} from "../system/modules";
import ModuleEdit, { action as moduleAction, loader as moduleLoader } from "../system/modules/module-edit";
import Ensembles, { action as newEnsemble, loader as ensemblesLoader} from "../system/ensembles";
import EnsembleEdit, { action as ensembleAction, loader as ensembleLoader } from "../system/ensembles/edit";

const routes = [
  {
    name: 'agents',
    element: <div>empty</div>,
    icon: UserOutlined,
  },
  {
    name: 'system',
    element: <System/>,
    icon: PartitionOutlined,
    // going to /system should redirect to /system/ensembles
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
        path: 'bots',
        element: <div>empty</div>,
        // element: <Ensembles/>,
        // loader: systemLoader,
        // action: newModule,
      },
    ]
  },
  {
    name: 'dialogue',
    element: <div>empty</div>,
    icon: WechatOutlined,
  },
  {
    name: 'catalog',
    element: <div>empty</div>,
    icon: TableOutlined,
    // loader: ()=>{},
    // action: ()=>{},
  }
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

export {
  router,
  routes
};

import Layout from "./layout";
import { LaptopOutlined, NotificationOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import System from "../system";
import ModuleEdit, { action as moduleAction, loader as moduleLoader } from "../system/modules/module-edit";
import Modules, { action as newModule, loader as modulesLoader} from "../system/modules";

const routes = [
  {
    name: 'system',
    element: <System/>,
    icon: UserOutlined,
    // going to /system should redirect to /system/flows
    children: [
      {
        path: 'modules',
        element: <Modules/>,
        loader: modulesLoader,
        action: newModule,
      },
      {
        path: 'flows',
        element: <div>empty</div>,
        // element: <Flows/>,
        // loader: systemLoader,
        // action: newModule,
      },
    ]
  },
  {
    name: 'dialogue',
    element: <div>empty</div>,
    icon: LaptopOutlined,
  },
  {
    name: 'catalog',
    element: <div>empty</div>,
    icon: NotificationOutlined,
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
    path: 'system/flows/:flowId',
    dynamic: true,
    element: <div>empty</div>,
    // element: <FlowEdit/>,
    // loader: flowLoader,
    // action: flowAction,
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

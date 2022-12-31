import System, { action as newModule, loader as systemLoader} from "../system/system";
import Layout from "./Layout";
import { LaptopOutlined, NotificationOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import SystemEdit, { action as moduleAction, loader as moduleLoader } from "../system/edit/system-edit";

const routes = [
  {
    name: 'system',
    element: <System/>,
    icon: UserOutlined,
    loader: systemLoader,
    action: newModule,
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
  }
]

const dynamicRoutes = [
  {
    path: 'system/:moduleId',
    dynamic: true,
    element: <SystemEdit/>,
    loader: moduleLoader,
    action: moduleAction,
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
        // ...(route.children && { children: route.children }),
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

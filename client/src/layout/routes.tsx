import { System } from "../system/system";
import Layout from "./Layout";
import { LaptopOutlined, NotificationOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';

const routes = [
  {
    name: 'system',
    element: <System/>,
    icon: UserOutlined,
    // children: [
    //   {
    //     name: 'Module',
    //     dynamic: true,
    //     element: <System/>
    //   }
    // ]
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

const router = [
  {
    path: "/",
    element: <Layout />,
    // loader: rootLoader,
    children: routes.map((route, idx) => ({
      path: route.name,
      element: route.element,
    })),
  },
]

// const router = [
//   {
//     path: "/",
//     element: <Layout />,
//     // loader: rootLoader,
//     children: [
//       {
//         path: "system",
//         element: <System/>,
//         // children: [
//         //   {
//         //     path: ":moduleId",
//         //     element: <Module />,
//         //     // loader: noteLoader,
//         //     // action: noteAction,
//         //     // errorElement: <h2>Note not found</h2>,
//         //   },
//         // ],
//         // action: newNoteAction,
//       },
//       // {
//       //   path: "system/:moduleId",
//       //   element: <Module />,
//       //   // loader: noteLoader,
//       //   // action: noteAction,
//       //   // errorElement: <h2>Note not found</h2>,
//       // },
//     ],
//   },
// ];

export {
  router,
  routes
};
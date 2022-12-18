import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './layout/Layout'
import './index.css'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { System } from './system/system'
import { router } from './layout/routes'
// import { ReduceStress } from "react-reduce-stress";
// import reactLogo from './assets/react.svg'

let routers = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={routers} />
    </RecoilRoot>
  </React.StrictMode>
)

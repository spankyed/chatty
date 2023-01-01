import { useNavigate, Form as RouterForm, redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, Link, Outlet } from "react-router-dom";
// import { Link } from '@types/react-router-dom';
import React from 'react';
import { Button, Card, Input, Space, Typography, Form  } from 'antd';
import { PlusCircleOutlined } from "@ant-design/icons";
import { createModule, getModules, Module } from "./modules/api";
// import { useForm } from "react-hook-form";

function System() {

  return (
    <>
      <Outlet />
    </>
  );
}



export default System

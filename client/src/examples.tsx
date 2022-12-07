import { useNavigate } from "react-router-dom";
  
function Login() {
  let navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={() => {
          navigate('/user/dashboard');
        }}
      />
    </div>
  );
}

function App() {
  const navs = [
    {id: 1, name: 'Home', path: '/', element: <Home/>},
    {id: 2, name: 'About', path: '/about', element: <About/>},
    {id: 3, name: 'Clock', path: '/clock', element: <Clock/>},
  ];
  return (
    <>
      <Routes>
        {
          navs.map((nav) => {
            return (
                <Route key={nav.id} path={nav.path} element={nav.element}/>
            );
          })
        }
      </Routes>
    </>
  );
}

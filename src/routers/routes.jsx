import {Routes, Route} from "react-router-dom";
import {Home, Login, ProtectedRoute, UserAuth, useUsuariosStore} from "../index";
import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
export function MyRoutes(){
    const { user } = UserAuth();
    const {mostrarUsuarios}=useUsuariosStore();
    const {data,isLoading,error}=useQuery({
      queryKey:["mostrar usuarios"],
      queryFn:mostrarUsuarios,
    });
    if (isLoading){
      return <SpinnerLoader/>
    }
    if (error){
      return <ErrorMolecula mensaje={error.message}/>
    }
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    );
  }
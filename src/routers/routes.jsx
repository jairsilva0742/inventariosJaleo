import { Routes, Route } from "react-router-dom";
import {
  Categorias,
  Configuracion,
  Home,
  Login,
  Marca,
  Usuarios,
  Productos,
  ProtectedRoute,
  UserAuth,
  useUsuariosStore,
  Kardex,
  Reportes,
} from "../index";
import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
import { useEmpresaStore } from "../store/EmpresaStore";
export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUsuarios, idusuario, mostrarpermisos } = useUsuariosStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const {
    data: datausuarios,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
  });
  const { data: dataempresa } = useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => mostrarEmpresa({ idusuario: idusuario }),
    enabled: !!datausuarios,
  });
  const { data: datapermisos } = useQuery({
    queryKey: ["mostrar permisos", { id_usuario: idusuario }],
    queryFn: () => mostrarpermisos({ id_usuario: idusuario }),
    enabled: !!datausuarios,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <ErrorMolecula mensaje={error.message} />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/configurar/productos" element={<Productos />} />
        <Route path="/configurar/personal" element={<Usuarios />} />
        <Route path="/kardex" element={<Kardex />}></Route>
        <Route path="/reportes" element={<Reportes />}></Route>
      </Route>
    </Routes>
  );
}

import Swal from "sweetalert2";
import { ObtenerIdAuthSupabase, supabase } from "../index";

export const MostrarEmpresa = async (p) => {
  const { error, data } = await supabase
    .from("asignarempresa")
    .select(`empresa(id,nombre,simbolomoneda)`)
    .eq("id_usuario", p.idusuario)
    .maybeSingle();
  if (data) {
    return data;
  }
};

export const ContarUsuariosXempresa = async (p) => {
  const { data, error } = await supabase.rpc("contar_usuarios_por_empresa", {
    _id_empresa: p.id_empresa,
  });
  if (data) {
    return data;
  }
};

export const ContarProductosXempresa = async (p) => {
  const { data, error } = await supabase.rpc("contar_productos_por_empresa", {
    _id_empresa: p.id_empresa,
  });
  if (data) {
    return data;
  }
};

export const CalcularInventarioXempresa = async (p) => {
  const { data, error } = await supabase.rpc("calcular_valor_inventario", {
    _id_empresa: p.id_empresa,
  });
  if (data) {
    return data;
  }
};

export const CostoInventarioXempresa = async (p) => {
  const { data, error } = await supabase.rpc("calcular_costo_inventario", {
    _id_empresa: p.id_empresa,
  });
  if (data) {
    return data;
  }
};

export const ContarStockBajoXempresa = async (p) => {
  const { data, error } = await supabase.rpc("contar_productos_stock_bajo", {
    _id_empresa: p.id_empresa,
  });
  if (data) {
    return data;
  }
};

import { create } from "zustand";
import { ContarUsuariosXempresa, ContarStockBajoXempresa, MostrarEmpresa, ContarProductosXempresa, CalcularInventarioXempresa, CostoInventarioXempresa, supabase } from "../index";

export const useEmpresaStore = create((set, get) => ({
  contadorusuarios: 0,
  contadorproductos: 0,
  contadordinero: 0,
  contadorcosto: 0,
  contadorstockbajo: 0,
  dataempresa: [],
  mostrarEmpresa: async (p) => {
    const response = await MostrarEmpresa(p);
    set({ dataempresa: response.empresa });
    return response.empresa;
  },
  contarusuariosXempresa: async (p) => {
    const response = await ContarUsuariosXempresa(p);
    set({ contadorusuarios: response });
    return response;
  },
  calcularinventarioXempresa: async (p) => {
    const response = await CalcularInventarioXempresa(p);
    set({ contadordinero: response });
    return response;
  },

  contarproductosXempresa: async (p) => {
    const response = await ContarProductosXempresa(p);
    set({ contadorproductos: response });
    return response;
  },

  costoinventarioXempresa:async (p) => {
    const response = await CostoInventarioXempresa(p);
    set({ contadorcosto: response });
    return response;
  },

  contarstockbajoXempresa:async (p) => {
    const response = await ContarStockBajoXempresa(p);
    set({ contadorstockbajo: response });
    return response;
  },
}));

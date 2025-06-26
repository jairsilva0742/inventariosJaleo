import styled from "styled-components";
import { useState } from "react";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, useUsuariosStore, ContainerSelector, ListaGenerica,TipoDocData, Selector } from "../../../index";
import { useForm } from "react-hook-form";
import { MdAlternateEmail,MdAccountCircle,MdLocalPhone } from "react-icons/md";
import { RiLockPasswordLine, RiFingerprintFill } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export function RegistrarAdmin({ setState }) {
  const { insertarUsuarioAdmin } = useUsuariosStore();
  const [tipodoc, setTipodoc] = useState({ icono: "", descripcion: "otros" });
  const [stateTipodoc, setStateTipodoc] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const p = {

        nombres: data.nombre,
        telefono: data.telefono,
        correo: data.correo,
        pass: data.pass,
        nrodoc: data.nrodoc,
        tipouser: "superadmin",
      };
      const dt = await insertarUsuarioAdmin(p);
      if (dt) {
        navigate("/");
      } else {
        setStateInicio(!stateInicio);
      }
    },
  });
  return (
    <Container>
      <ContentClose>
        <span onClick={setState}>Volver</span>
      </ContentClose>
      <section className="subcontainer">
        <div className="headers">
          <section>
            <h1>Registrar usuario</h1>
          </section>
        </div>

        <form
          className="formulario"
          onSubmit={handleSubmit(mutation.mutateAsync)}
        >
          <section>
            <article>
              <InputText icono={<MdAlternateEmail />}>
                <input
                  className="form__field"
                  style={{ textTransform: "lowercase" }}
                  type="text"
                  placeholder="correo"
                  {...register("correo", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                  })}
                />
                <label className="form__label">Correo electrónico</label>
                {errors.correo?.type === "pattern" && (
                  <p>El formato del email es incorrecto</p>
                )}
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<RiLockPasswordLine />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="pass"
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">Contraseña</label>
                {errors.pass?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<MdAccountCircle />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="nombre"
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre completo</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
                          <label>Tipo doc: </label>
                          <Selector
                            color="#406281"
                            texto1="🎴"
                            texto2={tipodoc.descripcion}
                            funcion={() => setStateTipodoc(!stateTipodoc)}
                          />
                          {stateTipodoc && (
                            <ListaGenerica
                              data={TipoDocData}
                              bottom="-260px"
                              scroll="scroll"
                              setState={() => setStateTipodoc(!stateTipodoc)}
                              funcion={(p) => setTipodoc(p)}
                            />
                          )}
                        </ContainerSelector>

            <article>
              <InputText icono={<RiFingerprintFill />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="nrodoc"
                  {...register("nrodoc", {
                    required: true,
                  })}
                />
                <label className="form__label">Número identificación</label>
                {errors.nrodoc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <article>
              <InputText icono={<MdLocalPhone />}>
                <input
                  className="form__field"
                  type="text"
                  placeholder="telefono"
                  {...register("telefono", {
                    required: true,
                  })}
                />
                <label className="form__label">Número telefónico</label>
                {errors.telefono?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#406281"
              />
            </div>
          </section>
        </form>
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
  padding: 13px 36px 20px 36px;
  z-index: 100;
  display: flex;

  align-items: center;
  .subcontainer {
    width: 100%;
  }

  .headers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 20px;
      font-weight: 500;
    }
    span {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .formulario {
    section {
      gap: 12px;
      display: flex;
      flex-direction: column;
      .colorContainer {
        .colorPickerContent {
          padding-top: 10px;
          min-height: 30px;
        }
      }
    }
  }
`;

const ContentClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 33px;
  margin: 30px;
  cursor: pointer;
`;

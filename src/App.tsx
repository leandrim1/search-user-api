import { useState } from "react";
import "./styles/App.css";
import axiosConfig from "./utils/API/constants/axiosConfig";

interface userData {
  idUsuario: number;
  descricao: string;
  login: string;
  senha: string;
  ativo: boolean;
  dataExpiracao: string;
  dataCadastro: string;
  dataAlteracao: string;
  caminhoImagem: string;
}

function App() {
  const [userLogin, setUserLogin] = useState<userData | null>(null);
  const [id, setID] = useState("");
  const [error, setError] = useState("");
  const [responseCreate, setResponseCreate] = useState("");
  const [currentAction, setCurrentAction] = useState<"cadastrar" | "editar" | "deletar" | null>(null);
  const [idUsuario, setIdUsuario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [dataExpiracao, setDataExpiracao] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [dataAlteracao, setDataAlteracao] = useState("");
  const [caminhoImagem, setCaminhoImagem] = useState("");
  const [responseDelete, setResponseDelete] = useState("");
  const [responseEdit, setResponseEdit] = useState("");

  async function loadUser() {
    try {
      const response = await axiosConfig.get(
        `/api/v1/Usuario/BuscarUsuarioPorId/${id}`
      );
      setUserLogin(response.data);
      setError("");
    } catch {
      setError("Usuario não encontrado");
    }
  }

  const handleLogin = () => {
    loadUser();
  };

  const resetResponse = () => {
    setID("");
    setError("");
    setResponseCreate("");
    setResponseDelete("");
    setCurrentAction(null);
    setIdUsuario("");
    setDescricao("");
    setLogin("");
    setSenha("");
    setDataExpiracao("");
    setDataCadastro("");
    setDataAlteracao("");
    setCaminhoImagem("");
    setResponseEdit("");
  };

  async function cadastrarUser() {
    try {
      const userToRegister = {
        idUsuario: Number(idUsuario),
        descricao,
        login,
        senha,
        ativo: Boolean,
        dataExpiracao,
        dataCadastro,
        dataAlteracao,
        caminhoImagem,
      };
      const response = await axiosConfig.post(
        "/api/v1/Usuario/CadastrarUsuario",
        userToRegister
      );
      setCurrentAction(response.data)
      setResponseCreate("Usuario cadastrado");
    } catch (error) {
      setResponseCreate("Usuario nao cadastrado: " + error);
    }
  }

  const handleUser = () => {
    cadastrarUser();
  };

  async function deletarUser() {
    try {
      const response = await axiosConfig.delete(
        `/api/v1/Usuario/RemoverUsuario/${id}`,
      );
      setCurrentAction(response.data);
      setResponseDelete("Usuario deletado");
    } catch (error) {
      setResponseDelete("Usuario nao deletado: " + error);
    }
  }

  const handleDelUser = () => {
    deletarUser();
  }

  async function editarUser() {
    try {
      const userToEdit = {
        idUsuario: Number(id),
        descricao,
        login,
        senha,
        ativo: Boolean,
        dataExpiracao,
        dataCadastro,
        dataAlteracao,
        caminhoImagem,
      };
      const response = await axiosConfig.put(
        `/api/v1/Usuario/EditarUsuario/${id}`,
        userToEdit
      );
      setCurrentAction(response.data);
      setResponseEdit("Usuario editado com sucesso!");
    } catch (error) {
      setResponseEdit("Usuario nao editado: " + error);
    }
  }

  const handleEditUser = () => {
    editarUser();
  }

  return (
    <section className="h-full lg:h-screen bg-blue-800 lg:content-center">
      <div className="flex flex-col justify-center pt-10 gap-10 lg:gap-20 lg:ml-70 lg:mt-0 lg:flex-row">
        <div className="flex flex-col items-center gap-12">
          <div className="flex w-20 lg:w-30">
            <img src="./Group.png" alt="" />
          </div>
          <div className="flex flex-col gap-6 font-semibold">
            <div className="flex flex-row items-center border-1 border-white rounded-md">
              <img src="./user.png" alt="" className="pl-3" />
              <input
                type="text"
                placeholder="ID"
                className="w-70 h-12 text-white pl-4 outline-none "
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </div>
            <div className="items-center bg-white rounded-md font-semibold">
              <button
                className="w-78 h-12 text-blue-800 outline-none"
                onClick={handleLogin}
              >
                BUSCAR USUARIO
              </button>
            </div>
            <div className="items-center bg-white rounded-md font-semibold">
              <button
                className="w-78 h-12 text-blue-800 outline-none"
                onClick={resetResponse}
              >
                RESETAR
              </button>
            </div>
            {error && <div className="text-white text-center">{error}</div>}
            <div className="items-center bg-white rounded-md font-semibold">
              <button
                className="w-78 h-12 text-blue-800 outline-none"
                onClick={() => setCurrentAction("cadastrar")}
              >
                CRIAR USUARIO
              </button>
            </div>
            <div className="items-center bg-white rounded-md font-semibold">
              <button
                className="w-78 h-12 text-blue-800 outline-none"
                onClick={() => setCurrentAction("editar")}
              >
                EDITAR USUARIO
              </button>
            </div>
            <div className="items-center bg-white rounded-md font-semibold">
              <button
                className="w-78 h-12 text-blue-800 outline-none"
                onClick={() => setCurrentAction("deletar")}
              >
                DELETAR USUARIO
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0 lg:gap-15">
          {userLogin && (
            <div className="flex flex-col gap-6 font-semibold">
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.idUsuario}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.descricao}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.senha}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.dataExpiracao}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.dataCadastro}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.dataAlteracao}
                </div>
              </div>
              <div className="flex flex-row items-center border-1 border-white rounded-md">
                <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center">
                  {userLogin?.caminhoImagem}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {currentAction === "cadastrar" && (
            <div className="flex flex-col lg:flex-col gap-6 font-semibold">
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="ID"
                  value={idUsuario}
                  onChange={(e) => setIdUsuario(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="DESCRICAO"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="LOGIN"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="password"
                  placeholder="SENHA"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataExpiracao"
                  value={dataExpiracao}
                  onChange={(e) => setDataExpiracao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataCadastro"
                  value={dataCadastro}
                  onChange={(e) => setDataCadastro(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataAlteracao"
                  value={dataAlteracao}
                  onChange={(e) => setDataAlteracao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="Caminho Imagem"
                  value={caminhoImagem}
                  onChange={(e) => setCaminhoImagem(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="items-center bg-white rounded-md font-semibold mb-10">
                <button
                  className="w-70 h-12 text-blue-800 outline-none"
                  onClick={handleUser}
                >
                  CRIAR
                </button>
              </div>
              {responseCreate && (
                <div className="w-70 text-white text-center">{responseCreate}</div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {currentAction === "editar" && (
            <div className="flex flex-col lg:flex-col gap-6 font-semibold">
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="DESCRICAO"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="LOGIN"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="password"
                  placeholder="SENHA"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataExpiracao"
                  value={dataExpiracao}
                  onChange={(e) => setDataExpiracao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataCadastro"
                  value={dataCadastro}
                  onChange={(e) => setDataCadastro(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="dataAlteracao"
                  value={dataAlteracao}
                  onChange={(e) => setDataAlteracao(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="Caminho Imagem"
                  value={caminhoImagem}
                  onChange={(e) => setCaminhoImagem(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="items-center bg-white rounded-md font-semibold mb-10">
                <button
                  className="w-70 h-12 text-blue-800 outline-none"
                  onClick={handleEditUser}
                >
                  EDITAR
                </button>
              </div>
              {responseEdit && (
                <div className="w-70 text-white text-center">{responseEdit}</div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          {currentAction === "deletar" && (
            <div className="flex flex-col lg:flex-col gap-6 font-semibold">
              <div className="w-70 h-12 text-white pl-4 outline-none text-center content-center border-1 rounded-md">
                <input
                  type="text"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  className="outline-none"
                />
              </div>
              <div className="items-center bg-white rounded-md font-semibold mb-10">
                <button
                  className="w-70 h-12 text-blue-800 outline-none"
                  onClick={handleDelUser}
                >
                  DELETAR
                </button>
              </div>
              {responseDelete && (
                <div className="w-70 text-white text-center">{responseDelete}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;

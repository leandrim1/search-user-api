import { useState } from "react";
import "./styles/App.css";
import api from "./services/api";

interface userData {
  idUsuario: number;
  descricao: string;
  login: string;
  senha: string;
  ativo: boolean;
  dataExpiracao: number;
  dataCadastro: number;
  dataAlteracao: number;
  caminhoImagem: string;
}

function App() {
  const [userLogin, setUserLogin] = useState<userData | null>(null);
  const [id, setID] = useState("");
  const [error, setError] = useState("");

  async function loadUser() {
    try {
      const response = await api.get(`${id}`);
      setUserLogin(response.data);
      setError("");
    } catch {
      setError("Usuario não encontrado")
    }
  }

  const handleLogin = () => {
    loadUser();
  };

  const resetResponse = () => {
    setID("");
    setUserLogin(null);
    setError("");
  };

  return (
    <div className="h-screen bg-blue-800 content-center">
      <div className="flex flex-col justify-center gap-10 lg:gap-20 lg:flex-row">
        <div className="flex flex-col items-center gap-12">
          <div className="flex">
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
          {error && (
              <div className="text-white text-center">{error}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-15">
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
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const defaults = {
      nome: "Andrés Almeida",
      telefone: "(11) 99999-8888",
      cpf: "123.456.789-00",
      usuario: "andres.almeida",
      email: "andres@email.com",
      rua: "Rua das Flores",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "São Paulo",
      cep: "01234-567",
      senha: "",
      confirmar: "",
    };
    try {
      const stored = localStorage.getItem("profile_form");
      return stored ? JSON.parse(stored) : defaults;
    } catch (_) {
      return defaults;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("profile_form", JSON.stringify(formData));
    } catch (_) {}
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Dados salvos com sucesso!");
    navigate("/perfil");
  };

  const handleReset = () => {
    try {
      localStorage.removeItem("profile_form");
    } catch (_) {}
    setFormData({
      nome: "Andrés Almeida",
      telefone: "(11) 99999-8888",
      cpf: "123.456.789-00",
      usuario: "andres.almeida",
      email: "andres@email.com",
      rua: "Rua das Flores",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "São Paulo",
      cep: "01234-567",
      senha: "",
      confirmar: "",
    });
  };

  const handleCancel = () => {
    navigate("/perfil");
  };

  return (
    <div className="editar-perfil">
      <div className="header-editar">
        <h1>Editar Perfil</h1>
        <div className="security-info">
          <i className="fas fa-shield-alt"></i>
          <span>
            Seus dados são protegidos com criptografia de ponta a ponta.
            Mantenha suas informações atualizadas.
          </span>
        </div>
        <form id="form-edicao" onSubmit={handleSubmit}>
          <div className="section-card">
            <h2>Informações Pessoais</h2>
            <div className="info-block">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                id="telefone"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="CPF"
                value={formData.cpf}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-user-tag"></i>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Nome de usuário"
                value={formData.usuario}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="section-card">
            <h2>Endereço</h2>
            <div className="info-block">
              <i className="fas fa-road"></i>
              <input
                type="text"
                id="rua"
                name="rua"
                placeholder="Rua"
                value={formData.rua}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-home"></i>
              <input
                type="text"
                id="numero"
                name="numero"
                placeholder="Número"
                value={formData.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                id="bairro"
                name="bairro"
                placeholder="Bairro"
                value={formData.bairro}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-city"></i>
              <input
                type="text"
                id="cidade"
                name="cidade"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-flag"></i>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
              >
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Minas Gerais">Minas Gerais</option>
              </select>
            </div>
            <div className="info-block">
              <i className="fas fa-mail-bulk"></i>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="CEP"
                value={formData.cep}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="section-card">
            <h2>Segurança</h2>
            <div className="info-block">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite nova senha"
                value={formData.senha}
                onChange={handleInputChange}
              />
            </div>
            <div className="info-block">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirmar"
                name="confirmar"
                placeholder="Confirme nova senha"
                value={formData.confirmar}
                onChange={handleInputChange}
              />
            </div>
            <div className="warning">
              Deixe em branco se não deseja alterar a senha atual.
            </div>
            <div className="button-group">
              <button type="submit" className="save-btn">
                Salvar Alterações
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleReset}
              >
                Restaurar padrão
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

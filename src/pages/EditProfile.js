import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    usuario: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    senha: "",
    confirmar: "",
  });

  useEffect(() => {
    // Limpa localStorage existente ao montar o componente
    try {
      localStorage.removeItem("profile_form");
    } catch (_) {}
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload mapeado para o backend
    const payload = {
      name: formData.nome,
      email: formData.email,
      phone: formData.telefone,
      cpf: formData.cpf,
      username: formData.usuario,
      address: {
        street: formData.rua,
        number: formData.numero,
        neighborhood: formData.bairro,
        city: formData.cidade,
        state: formData.estado,
        zip: formData.cep,
      },
      password: formData.senha || undefined, // se vazio, não altera
    };

    try {
      // Persistir o perfil localmente, eliminando dependência de backend
      const profileToSave = {
        id: 1,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        cpf: payload.cpf,
        username: payload.username,
        address: payload.address,
      };

      localStorage.setItem("profile", JSON.stringify(profileToSave));

      // Opcionalmente, limpar o rascunho do formulário
      try {
        localStorage.removeItem("profile_form");
      } catch (_) {}

      alert("Dados salvos com sucesso!");
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao salvar dados localmente:", error);
      alert("Falha ao salvar dados");
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem("profile_form");
    } catch (_) {}
    setFormData({
      nome: "",
      telefone: "",
      cpf: "",
      usuario: "",
      email: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
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
                <option value="">Selecione o estado</option>
                <option value="AC">AC - Acre</option>
                <option value="AL">AL - Alagoas</option>
                <option value="AP">AP - Amapá</option>
                <option value="AM">AM - Amazonas</option>
                <option value="BA">BA - Bahia</option>
                <option value="CE">CE - Ceará</option>
                <option value="DF">DF - Distrito Federal</option>
                <option value="ES">ES - Espírito Santo</option>
                <option value="GO">GO - Goiás</option>
                <option value="MA">MA - Maranhão</option>
                <option value="MT">MT - Mato Grosso</option>
                <option value="MS">MS - Mato Grosso do Sul</option>
                <option value="MG">MG - Minas Gerais</option>
                <option value="PA">PA - Pará</option>
                <option value="PB">PB - Paraíba</option>
                <option value="PR">PR - Paraná</option>
                <option value="PE">PE - Pernambuco</option>
                <option value="PI">PI - Piauí</option>
                <option value="RJ">RJ - Rio de Janeiro</option>
                <option value="RN">RN - Rio Grande do Norte</option>
                <option value="RS">RS - Rio Grande do Sul</option>
                <option value="RO">RO - Rondônia</option>
                <option value="RR">RR - Roraima</option>
                <option value="SC">SC - Santa Catarina</option>
                <option value="SP">SP - São Paulo</option>
                <option value="SE">SE - Sergipe</option>
                <option value="TO">TO - Tocantins</option>
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

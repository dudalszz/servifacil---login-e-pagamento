import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editar-perfil");
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    alert("Logout realizado com sucesso!");
  };

  return (
    <div className="card profile-card">
      <img src="/images/img.png" alt="Foto de perfil" />
      <h2>Andrés Almeida</h2>
      <div className="status">
        <i className="fas fa-circle-check"></i> Usuário ativo
      </div>

      <div className="profile-info">
        <div className="info-block">
          <i className="fas fa-user"></i>
          <input type="text" value="Andrés Almeida" readOnly />
        </div>
        <div className="info-block">
          <i className="fas fa-phone"></i>
          <input type="text" value="(11) 99999-8888" readOnly />
        </div>
        <div className="info-block">
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            value="Rua das Flores, 123, São Paulo - SP"
            readOnly
          />
        </div>
      </div>

      <div className="button-group">
        <button className="edit-btn" onClick={handleEditProfile}>
          <i className="fas fa-edit"></i> Editar Perfil
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;

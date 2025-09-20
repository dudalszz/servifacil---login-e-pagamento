import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const handleEditProfile = () => {
    navigate("/editar-perfil");
  };

  const handleLogout = () => {
    // Mock de logout
    alert("Logout realizado com sucesso!");
  };

  return (
    <div className="card profile-card">
      <img src="/images/img.png" alt="Foto de perfil" />
      <h2>{profile?.name || "Nome do Usuário"}</h2>
      <div className="status">
        <i className="fas fa-circle-check"></i> Usuário ativo
      </div>

      <div className="profile-info">
        <div className="info-block">
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={profile?.name || ""}
            readOnly
            placeholder="Nome completo"
          />
        </div>
        <div className="info-block">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            value={profile?.phone || ""}
            readOnly
            placeholder="Telefone"
          />
        </div>
        <div className="info-block">
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            value={
              profile?.address
                ? `${profile.address.street || ""}, ${profile.address.number || ""} - ${profile.address.neighborhood || ""}, ${profile.address.city || ""}/${profile.address.state || ""} - ${profile.address.zip || ""}`.trim()
                : ""
            }
            readOnly
            placeholder="Endereço completo"
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

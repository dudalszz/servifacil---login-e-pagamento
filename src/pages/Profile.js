import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnterNavigation } from "../hooks/useEnterNavigation";

const Profile = () => {
  const navigate = useNavigate();
  const handleKeyPress = useEnterNavigation();
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    // Limpar dados corrompidos na primeira carga
    localStorage.removeItem("profile");
    localStorage.removeItem("profile_form");
    
    // Carregar dados salvos da sessão atual
    try {
      const savedData = localStorage.getItem("profile_data");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProfile(parsedData);
      }
    } catch (_) {}
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let v = value;
    
    // Aplicar as mesmas validações das outras páginas
    if (name === "name") {
      // Apenas letras e espaços
      v = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "").slice(0, 50);
    } else if (name === "phone") {
      // Apenas números com formatação
      v = value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      }
    } else if (name === "address") {
      // Letras, números e caracteres especiais básicos
      v = value.replace(/[^a-zA-ZÀ-ÿ0-9\s,.-]/g, "").slice(0, 100);
    }
    
    const updatedProfile = {
      ...profile,
      [name]: v
    };
    
    setProfile(updatedProfile);
    
    // Salvar automaticamente no localStorage para sincronizar com EditProfile
    try {
      localStorage.setItem("profile_data", JSON.stringify(updatedProfile));
    } catch (_) {}
  };


  const handleEditProfile = () => {
    navigate("/editar-perfil");
  };

  const handleLogout = () => {
    // Limpar dados salvos
    localStorage.removeItem("profile");
    localStorage.removeItem("profile_form");
    setProfile({
      name: "",
      phone: "",
      address: ""
    });
    alert("Logout realizado com sucesso!");
  };

  return (
    <div className="card profile-card">
      <img
        src={profile?.avatar || "/images/img.png"}
        alt="Foto de perfil"
        onError={(e) => {
          e.currentTarget.src = "/images/img.png";
        }}
      />
      <h2>{profile?.name || "Usuário"}</h2>
      <div className="status">
        <i className="fas fa-circle-check"></i> Usuário ativo
      </div>

      <form className="profile-info">
        <div className="info-block">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="name"
            value={profile?.name || ""}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Nome completo"
          />
        </div>
        <div className="info-block">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            name="phone"
            value={profile?.phone || ""}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Telefone"
          />
        </div>
        <div className="info-block">
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            name="address"
            value={profile?.address || ""}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Endereço completo"
          />
        </div>
      </form>

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

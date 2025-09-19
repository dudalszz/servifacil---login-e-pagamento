import React, { useEffect, useMemo, useState } from "react";

const defaultState = {
  visibility: "public", // public | clients | private
  online: true,
  blockedSearch: "",
  blocked: ["maria.silva", "joao.souza"],
};

const Privacy = () => {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem("privacy_settings");
      return stored ? JSON.parse(stored) : defaultState;
    } catch (_) {
      return defaultState;
    }
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("privacy_settings", JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  const filteredBlocked = useMemo(() => {
    const q = state.blockedSearch.trim().toLowerCase();
    if (!q) return state.blocked;
    return state.blocked.filter((u) => u.toLowerCase().includes(q));
  }, [state.blocked, state.blockedSearch]);

  const handleUnblock = (user) => {
    setState((prev) => ({
      ...prev,
      blocked: prev.blocked.filter((u) => u !== user),
    }));
  };

  const handleDownloadData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meus-dados.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const canConfirmDelete = confirmName.trim().length > 0;

  return (
    <div className="editar-perfil" style={{ width: "100%", maxWidth: 900 }}>
      <div className="header-editar" style={{ width: "100%", gap: 12 }}>
        <h1>Privacidade</h1>
        <div
          className="security-info"
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <i className="fas fa-shield-alt"></i>
            <span>
              Controle quem vê seu perfil e como seus dados são usados.
            </span>
          </div>
        </div>

        <div className="section-card">
          <h2>Visibilidade do Perfil</h2>
          <div className="info-block" style={{ gap: 16, flexWrap: "wrap" }}>
            <label title="Público: qualquer pessoa pode ver seu portfólio e avaliações.">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={state.visibility === "public"}
                onChange={(e) =>
                  setState((p) => ({ ...p, visibility: e.target.value }))
                }
              />
              Público
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="clients"
                checked={state.visibility === "clients"}
                onChange={(e) =>
                  setState((p) => ({ ...p, visibility: e.target.value }))
                }
              />
              Somente clientes
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={state.visibility === "private"}
                onChange={(e) =>
                  setState((p) => ({ ...p, visibility: e.target.value }))
                }
              />
              Privado
            </label>
          </div>
          <div className="warning" style={{ textAlign: "left" }}>
            "Público: qualquer pessoa pode ver seu portfólio e avaliações."
          </div>
        </div>

        <div className="section-card">
          <h2>Status Online</h2>
          <div
            className="info-block"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <span>Mostrar "Disponível"</span>
            <label className="switch">
              <input
                type="checkbox"
                aria-label="Exibir status online Disponível"
                checked={state.online}
                onChange={() => setState((p) => ({ ...p, online: !p.online }))}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="section-card">
          <h2>Controle de Dados</h2>
          <div
            className="button-group"
            style={{ justifyContent: "flex-start", gap: 12 }}
          >
            <button className="save-btn" onClick={handleDownloadData}>
              Baixar meus dados
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              Excluir conta
            </button>
          </div>
        </div>

        <div className="section-card">
          <h2>Bloqueio e Denúncia</h2>
          <div className="info-block" style={{ gap: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Buscar usuário para bloquear"
              value={state.blockedSearch}
              onChange={(e) =>
                setState((p) => ({ ...p, blockedSearch: e.target.value }))
              }
            />
          </div>
          <div
            className="info-block"
            style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}
          >
            {filteredBlocked.length === 0 && (
              <span style={{ color: "#6b7280" }}>Nenhum usuário bloqueado</span>
            )}
            {filteredBlocked.map((user) => (
              <div
                key={user}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>@{user}</span>
                <button
                  className="cancel-btn"
                  onClick={() => handleUnblock(user)}
                >
                  Desbloquear
                </button>
              </div>
            ))}
          </div>
        </div>

        {showDeleteModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="section-card"
            style={{ border: "2px solid #ef4444" }}
          >
            <h2>Confirmar exclusão da conta</h2>
            <ul style={{ marginLeft: 16, color: "#374151" }}>
              <li>Seus dados e histórico serão removidos permanentemente.</li>
              <li>Seus anúncios e propostas serão encerrados.</li>
              <li>Esta ação não pode ser desfeita.</li>
            </ul>
            <div className="info-block" style={{ marginTop: 12 }}>
              <input
                type="text"
                placeholder="Digite seu nome para confirmar"
                aria-label="Digite seu nome para confirmar exclusão"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
              />
            </div>
            <div
              className="button-group"
              style={{ justifyContent: "flex-end" }}
            >
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button className="logout-btn" disabled={!canConfirmDelete}>
                Excluir conta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Privacy;

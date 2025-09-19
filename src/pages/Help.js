import React, { useMemo, useState } from "react";

const ALL_FAQ = [
  {
    q: "Como enviar uma proposta?",
    a: "Acesse o projeto, clique em Enviar Proposta e preencha os campos.",
  },
  {
    q: "Como cancelar um contrato?",
    a: "Verifique prazos no contrato e solicite cancelamento na aba Projetos.",
  },
  {
    q: "Como funciona a disputa de pagamento?",
    a: "Abra disputa em Pagamentos > Disputas. Análise em até 7 dias.",
  },
  {
    q: "Como solicitar suporte financeiro?",
    a: "Envie documentos na central financeira e abra um ticket.",
  },
  {
    q: "Como alterar método de saque?",
    a: "Em Configurações > Financeiro, escolha o método e confirme.",
  },
  {
    q: "Como editar meu perfil?",
    a: "Vá em Perfil > Editar e atualize seus dados.",
  },
  {
    q: "Como redefinir senha?",
    a: "Use Esqueci minha senha na tela de login.",
  },
  {
    q: "Como ativar notificações?",
    a: "Em Notificações, selecione categorias, canais e frequência.",
  },
];

const Help = () => {
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(-1);
  const [ticket, setTicket] = useState({
    subject: "",
    description: "",
    priority: "normal",
    file: null,
  });
  const [toast, setToast] = useState("");

  const filteredFAQ = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_FAQ;
    return ALL_FAQ.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query]);

  const toggleAccordion = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    setToast(
      `Seu ticket #${ticketNumber} foi criado. Responderemos em até 48h úteis.`
    );
    setTicket({ subject: "", description: "", priority: "normal", file: null });
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div
      className="editar-perfil help-page"
      style={{ width: "100%", maxWidth: 900 }}
    >
      <div className="header-editar" style={{ width: "100%" }}>
        <h1>Ajuda & Suporte</h1>
        <div className="security-info">
          <i className="fas fa-life-ring"></i>
          <span>Encontre respostas rápidas ou abra um chamado.</span>
        </div>

        {/* FAQ Section */}
        <div className="section-card help-faq">
          <h2>Perguntas Frequentes</h2>
          <div className="help-search">
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar perguntas frequentes"
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="help-accordion">
            {filteredFAQ.map((item, idx) => (
              <div key={idx} className="help-accordion-item">
                <button
                  className="help-accordion-trigger"
                  aria-expanded={openIdx === idx}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(idx);
                    }
                  }}
                  onClick={() => toggleAccordion(idx)}
                >
                  <span>{item.q}</span>
                  <i
                    className={`fas fa-chevron-${
                      openIdx === idx ? "up" : "down"
                    }`}
                  ></i>
                </button>
                {openIdx === idx && (
                  <div className="help-accordion-panel">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Section */}
        <div className="section-card help-ticket">
          <h2>Abrir chamado</h2>
          <form onSubmit={handleSubmitTicket} className="help-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Assunto"
                value={ticket.subject}
                onChange={(e) =>
                  setTicket((p) => ({ ...p, subject: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Descreva o problema"
                value={ticket.description}
                onChange={(e) =>
                  setTicket((p) => ({ ...p, description: e.target.value }))
                }
                rows={4}
                required
              />
            </div>
            <div className="form-row">
              <label className="file-label">
                <i className="fas fa-paperclip"></i>
                Anexar arquivo
                <input
                  type="file"
                  onChange={(e) =>
                    setTicket((p) => ({
                      ...p,
                      file: e.target.files?.[0] || null,
                    }))
                  }
                />
              </label>
              <label className="select-label">
                Prioridade:
                <select
                  value={ticket.priority}
                  onChange={(e) =>
                    setTicket((p) => ({ ...p, priority: e.target.value }))
                  }
                >
                  <option value="low">Baixa</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                </select>
              </label>
            </div>
            <div className="form-actions">
              <button className="save-btn" type="submit">
                Enviar
              </button>
            </div>
          </form>
          {toast && (
            <div className="toast" role="status" aria-live="polite">
              {toast}
            </div>
          )}
        </div>

        {/* Quick Tutorials */}
        <div className="section-card help-tutorials">
          <h2>Tutoriais rápidos</h2>
          <div className="tutorial-grid">
            <a href="#" className="tutorial-card">
              <i className="fas fa-paper-plane"></i>
              <span>Como enviar proposta</span>
            </a>
            <a href="#" className="tutorial-card">
              <i className="fas fa-file-invoice"></i>
              <span>Como emitir nota fiscal</span>
            </a>
            <a href="#" className="tutorial-card">
              <i className="fas fa-money-bill-wave"></i>
              <span>Como solicitar saque</span>
            </a>
          </div>
        </div>

        {/* Community */}
        <div className="section-card help-community">
          <div className="community-content">
            <div className="community-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="community-text">
              <h3>Comunidade</h3>
              <p>Conecte-se com outros freelancers e tire suas dúvidas</p>
              <a href="#" className="community-btn">
                Acessar fórum
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

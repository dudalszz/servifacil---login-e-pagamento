import React, { useEffect, useState } from "react";
import "./Payments.css";

const Payments = () => {
  const [paymentData, setPaymentData] = useState(() => {
    const defaults = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      address: "",
      city: "",
      state: "",
      cep: "",
    };
    try {
      const stored = localStorage.getItem("payment_form");
      return stored ? JSON.parse(stored) : defaults;
    } catch (_) {
      return defaults;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("payment_form", JSON.stringify(paymentData));
    } catch (_) {}
  }, [paymentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    alert("Pagamento processado com sucesso!");
  };

  return (
    <div className="pagamento-main">
      <h2>Finalizar Pagamento</h2>

      <div className="payment-wrapper">
        <section className="payment-details">
          <h3 className="titulo-pagamento">Dados de Pagamento</h3>

          <div className="section">
            <h4 className="info-cartao">Informações do Cartão</h4>
            <label>Número do Cartão</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
            />

            <div className="row">
              <div>
                <label>Validade</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label>Nome no Cartão</label>
            <input
              type="text"
              placeholder="Como está impresso no cartão"
              name="cardName"
              value={paymentData.cardName}
              onChange={handleInputChange}
            />
          </div>

          <div className="section">
            <h4>Endereço de Cobrança</h4>
            <label>Rua, número e bairro</label>
            <input
              type="text"
              placeholder="Av. Brasil, 123 - Centro"
              name="address"
              value={paymentData.address}
              onChange={handleInputChange}
            />
            <div className="row">
              <div>
                <label>Cidade</label>
                <input
                  type="text"
                  placeholder="São Paulo"
                  name="city"
                  value={paymentData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Estado</label>
                <select
                  name="state"
                  value={paymentData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                </select>
              </div>
            </div>

            <label>CEP</label>
            <input
              type="text"
              placeholder="00000-000"
              name="cep"
              value={paymentData.cep}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <aside className="order-summary">
          <h3>Resumo do Pedido</h3>

          <div className="service">
            <p className="service-title">
              <img
                src="/images/icone-limpeza.png"
                alt="Ícone de limpeza"
                className="icone-limpeza"
              />
              Serviço de Limpeza
            </p>
            <p className="service-desc">Limpeza completa - 4 horas</p>

            <div className="provider">
              <img src="/images/images.jpg" alt="Maria Silva" />
              <div>
                <p className="provider-name">Maria Silva</p>
                <span className="provider-rating">⭐ 4.8 (56 avaliações)</span>
              </div>
            </div>
          </div>

          <div className="totals">
            <div>
              <span>Subtotal</span>
              <span>R$ 150,00</span>
            </div>
            <div>
              <span>Taxa de serviço</span>
              <span>R$ 15,00</span>
            </div>
            <div className="total">
              <strong>Total</strong>
              <strong>R$ 165,00</strong>
            </div>
          </div>

          <div className="ssl-note">
            <i className="fas fa-lock"></i> Seus dados estão protegidos com
            criptografia SSL
          </div>

          <button className="btn-confirm green" onClick={handlePayment}>
            Confirmar Pagamento
          </button>
          <p className="terms-note">
            Ao confirmar, você concorda com nossos{" "}
            <a href="/" onClick={(e) => e.preventDefault()}>
              Termos de Serviço
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Payments;

function irParaEdicao() {
  window.location.href = "editar.html";
}

function voltarParaPerfil() {
  window.location.href = "perfil.html";
}

document.getElementById("form-edicao")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Dados salvos com sucesso!");
  voltarParaPerfil();
});

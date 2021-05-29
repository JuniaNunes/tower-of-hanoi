//Criando textos para melhorar UX
let clickDisc = document.createElement("h3");
clickDisc.innerHTML = "CLIQUE NO DISCO ABAIXO";
clickDisc.classList.add("ux");

let selectDisc = document.createElement("h3");
selectDisc.innerHTML = "SELECIONE UMA TORRE";
selectDisc.classList.add("ux2");

//Criando botão para voltar às regras
let backToRegras = document.createElement("button");
backToRegras.innerText = "VOLTAR ÀS REGRAS";
backToRegras.classList.add("regras-button");

// Criando as torres
const body = document.body;

const sectionTorre = document.createElement("section");
sectionTorre.id = "game";
body.appendChild(sectionTorre);
sectionTorre.appendChild(clickDisc);
sectionTorre.appendChild(backToRegras);

const divPrimeiraTorre = document.createElement("div");
divPrimeiraTorre.id = "start";
divPrimeiraTorre.classList.add("torre");
sectionTorre.appendChild(divPrimeiraTorre);

const divSegundaTorre = document.createElement("div");
divSegundaTorre.id = "offset";
divSegundaTorre.classList.add("torre");
sectionTorre.appendChild(divSegundaTorre);

const divTerceiraTorre = document.createElement("div");
divTerceiraTorre.id = "end";
divTerceiraTorre.classList.add("torre");
sectionTorre.appendChild(divTerceiraTorre);

//Criando variáveis para representar os discos
const disco1 = document.createElement("div");
disco1.id = "disco1";
disco1.style.width = "500%";
disco1.style.height = "15%";
disco1.style.backgroundColor = "green";
disco1.classList.add("disc");

const disco2 = document.createElement("div");
disco2.id = "disco2";
disco2.style.width = "400%";
disco2.style.height = "15%";
disco2.style.backgroundColor = "blue";
disco2.classList.add("disc");

const disco3 = document.createElement("div");
disco3.id = "disco3";
disco3.style.width = "300%";
disco3.style.height = "15%";
disco3.style.backgroundColor = "red";
disco3.classList.add("disc");

const disco4 = document.createElement("div");
disco4.id = "disco4";
disco4.style.width = "200%";
disco4.style.height = "15%";
disco4.style.backgroundColor = "yellow";
disco4.classList.add("disc");

//Colocando os discos na primeira torre
divPrimeiraTorre.appendChild(disco1);
divPrimeiraTorre.appendChild(disco2);
divPrimeiraTorre.appendChild(disco3);
divPrimeiraTorre.appendChild(disco4);

//Regras recebe display none e Game recebe display flex
let button = document.getElementById("regras-button");
button.addEventListener("click", regrasOff);

function regrasOff() {
  document.getElementById("regras").style.display = "none";

  sectionTorre.style.display = "flex";
}

//Adicionar click handler em cada disco
disco1.addEventListener("click", discUp);
disco2.addEventListener("click", discUp);
disco3.addEventListener("click", discUp);
disco4.addEventListener("click", discUp);

//Função para subir o disco
let currentDisc = "";
function discUp(x) {
  x.stopPropagation();
  let parent = x.currentTarget.parentElement;
  clickDisc.style.display = "none";
  sectionTorre.appendChild(selectDisc);

  if (x.currentTarget === parent.lastElementChild) {
    if (currentDisc) {
      currentDisc.classList.remove("discoUp");
    }
    currentDisc = x.currentTarget;
  }

  if (currentDisc === parent.lastElementChild) {
    currentDisc.classList.add("discoUp");
  }
}

//Adicionar click handler em cada torre
divPrimeiraTorre.addEventListener("click", discDown);
divSegundaTorre.addEventListener("click", discDown);
divTerceiraTorre.addEventListener("click", discDown);

let selectedTower = "";
//Função para selecionar o último disco e passar para a torre escolhida
// Junto com a condição dos tamanhos dos discos e vitória
function discDown(z) {
  z.stopPropagation();
  selectDisc.style.display = "none";
  if (z.currentTarget.lastElementChild) {
    if (condicional(z.currentTarget.lastElementChild)) {
      selectedTower = z.currentTarget;
      selectedTower.appendChild(currentDisc);
      currentDisc.classList.remove("discoUp");
      currentDisc = "";
    }
  } else {
    selectedTower = z.currentTarget;
    selectedTower.appendChild(currentDisc);
    currentDisc.classList.remove("discoUp");
    currentDisc = "";
  }
  victory();
}

//Condição que os discos maiores não podem ficar em cima dos menores
let container_alert = document.createElement("div");

function condicional(lastdisc) {
  if (currentDisc.clientWidth > lastdisc.clientWidth) {
    container_alert.classList.add("container_alert");
    container_alert.innerHTML =
      "<span>&times;</span><p>Você não pode fazer isso. Tente outra jogada!</p>";
    body.appendChild(container_alert);

    let exit = document.querySelector("div.container_alert span");

    exit.onclick = function exit() {
      container_alert.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == container_alert) {
        container_alert.style.display = "none";
      }
    };
    // alert("Você não pode fazer isso. Tente outra jogada.");
    return false;
  } else {
    return true;
  }
}

//Condição de vitória
function victory() {
  if (divTerceiraTorre.childElementCount >= 4) {
    let vitoria = document.createElement("div");
    vitoria.classList.add("vitoria");
    vitoria.innerHTML =
      "<p>Parabéns. Você<br><span>Venceu!</span></p><br><button>JOGAR NOVAMENTE</button>";
    body.appendChild(vitoria);
    let buttonVitoria = document.querySelector("div.vitoria button");
    buttonVitoria.onclick = function newGame() {
      location.reload();
    };
  }
}

//Função para voltar às regras
backToRegras.addEventListener("click", menuPrincipal);
function menuPrincipal() {
  document.getElementById("regras").style.display = "flex";

  sectionTorre.style.display = "none";
}

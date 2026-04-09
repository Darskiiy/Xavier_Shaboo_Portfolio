const projetos = [
    {
        nome: "Twins Adventure",
        imagem: "Img/Twins_Adventure.jpg",
        status: "incompleto",
        descricao: "Pequeno jogo onde controlasse um slime que dá parry",
        link: null
    },
    {
        nome: "Slug Shot",
        imagem: "Img/Slugshot.png",
        status: "completo",
        descricao: "Tower climber onde controlas uma Slug e deve matar os robos",
        link: "https://bpgodinho.itch.io/slugshot"
    }
];

const lista = document.getElementById("listaProjetos");

function mostrarProjetos(filtro = "todos") {
    lista.innerHTML = "";

    let count = 0;

    projetos.forEach(p => {
        if (filtro === "completo" && p.status !== "completo") return;

        count++;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${p.imagem}">
            <div class="card-content">
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <p>Status: ${p.status}</p>
                ${p.link ? '<button class="play-btn">Jogar</button>' : ''}
            </div>
        `;

        card.onclick = () => {
            if (p.link) window.open(p.link, "_blank");
        };

        lista.appendChild(card);
    });

    if (count === 0) {
        lista.innerHTML = "<p>Sem projetos 😢</p>";
    }
}

mostrarProjetos();


document.getElementById("todos").onclick = () => mostrarProjetos("todos");
document.getElementById("completos").onclick = () => mostrarProjetos("completo");


document.getElementById("btnTema").onclick = () => {
    document.body.classList.toggle("light");
};

document.getElementById("btnAPI").onclick = async () => {
    const resultado = document.getElementById("resultado");
    const spinner = document.getElementById("spinner");

    resultado.innerText = "";
    spinner.classList.remove("hidden");

    try {
        const res = await fetch("https://api.adviceslip.com/advice?t=" + Date.now());
        const data = await res.json();

        resultado.innerText = `"${data.slip.advice}"`;
    } catch {
        resultado.innerText = "Erro 😢";
    }

    spinner.classList.add("hidden");
};
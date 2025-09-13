const btn = document.querySelector("button#btn-add");


btn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputText = document.querySelector('#input-text').value.trim();
    const datauser = document.querySelector("input#dataDoUser").value;
    const descriptionUser = document.getElementById("DescriptionId").value.trim();
    const taskMenssagem = document.getElementById("task-menssagem");

   taskMenssagem.innerText = "Task added successfully! Add another task!";
    
     
    // ===== Validação =====
    if (!inputText) { alert("Digite o nome do produto!"); return; }
    if (!datauser) { alert("Escolha uma data!"); return; }

    const userDate = new Date(datauser);
    if (isNaN(userDate.getTime())) { alert("Data inválida!"); return; }

    // ===== Comparação de datas =====
    let hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    userDate.setHours(0, 0, 0, 0);

    // ===== Criar novo item =====
    const newItem = document.createElement('li');

   

    // Cria objeto Tarefa
    const Tarefa = {
        id: Math.floor(Math.random() * 10000000),
        task: inputText,
        dataAtual: new Date(),
        dataUser: userDate,
        description: descriptionUser
    };

   

    if(descriptionUser) {
       
        
    }

    // Adiciona conteúdo HTML do item
    newItem.innerHTML = `
        <label class="container">
            <input class="input-checkbox" type="checkbox">
            <div class="checkmark"></div>
        </label>
        <p>${Tarefa.task}</p>
        <p>${Tarefa.dataUser.toLocaleDateString()}</p>
        <button class="btn-delete">
            <img src="./src/icons/delete-svgrepo.svg" alt="Deletar">
        </button>
        <button class="btn-salvar-descricao"><img src="./src/icons/chat-svgrepo-com.svg" alt=""></button>
    `;

     // Cria a descrição
    const descriptionItem = document.createElement('p');
    descriptionItem.textContent = descriptionUser || "No description added..";
    descriptionItem.classList.add("description-of-task");
    


    


    // ===== Status da tarefa como imagem =====
    const status = document.createElement("img");
    status.classList.add("status-img");
    status.alt = "Status da tarefa";
    status.width = 40;
    status.height = 40;
    // Define imagem original de acordo com a data
let originalStatusSrc = "";

if (hoje.getTime() === userDate.getTime()) {
    newItem.classList.add("yellow-task");
    originalStatusSrc = "./src/icons/Asset 10@2000x.png";
      descriptionItem.classList.add("yellow-task")
} else if (hoje < userDate) {
    newItem.classList.add("green-task");
    originalStatusSrc = "./src/icons/Asset 9@2000x.png";
     descriptionItem.classList.add("green-task")
} else {
    newItem.classList.add("red-task");
    originalStatusSrc = "./src/icons/Asset 2@2000x.png";
     descriptionItem.classList.add("red-task")
}
status.src = originalStatusSrc;

     newItem.appendChild(status);
     list.appendChild(newItem);
      list.appendChild(descriptionItem);

    // ===== Checkbox =====
    const checkbox = newItem.querySelector("input.input-checkbox");
    checkbox.addEventListener("change", () => {
        newItem.classList.toggle("checkbox-background", checkbox.checked);

        // Alterna imagem do status usando ternário
        status.src = checkbox.checked
            ? "./src/icons/Asset 4@2000x.png"  // imagem de concluído
            : originalStatusSrc; // volta à imagem original

             descriptionItem.classList.toggle("checkbox-background")
    });

    // ===== Botão deletar =====
    const btnDelete = newItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Tem certeza que deseja apagar esta tarefa?")) {
            newItem.remove();
            descriptionItem.remove();
        }
    });

    // ===== Botão descrição =====
    const btnDescription = newItem.querySelector(".btn-salvar-descricao");
    btnDescription.addEventListener("click", (e) => {
        e.preventDefault();
        descriptionItem.classList.toggle("active");
    });

    console.log(Tarefa);

   




});

let btnVerTarefasConcluidas = document.getElementById("btn-ver-tarefas")
btnVerTarefasConcluidas.addEventListener("click", (e)=>{
    e.preventDefault();
    let listaDeTarefas = document.getElementById("list");
    listaDeTarefas.classList.toggle("active");


});

let btnVerTarefas = document.getElementById("btn-ver-excluidas")
btnVerTarefas.addEventListener("click", (e)=>{
    e.preventDefault();
})






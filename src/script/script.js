const btn = document.querySelector("button#btn-add");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const user_task_input_to_insert_task = document.getElementById('user-task-input-to-insert-task').value.trim();
    const user_date_value = document.getElementById("user-date").value.trim();
    const description_user = document.getElementById("user-description").value.trim();
    const taskMenssagem = document.getElementById("task-menssagem");

    taskMenssagem.innerText = "Task added successfully! Add another task!";
    
    // ===== Validação =====
    if (!user_task_input_to_insert_task) { alert("Digite o nome do produto!"); return; }
    if (!user_date_value) { alert("Escolha uma data!"); return; }

    const user_date = new Date(user_date_value);
    if (isNaN(user_date.getTime())) { alert("Data inválida!"); return; }

    // ===== Comparação de datas =====
    let hoje = new Date(); 
    hoje.setHours(0, 0, 0, 0);
    user_date.setHours(0, 0, 0, 0);

    // ===== Criar novo item =====
    const newItem = document.createElement('li');

    // Cria objeto Tarefa
    const Tarefa = {
        id: Math.floor(Math.random() * 10000000),
        task: user_task_input_to_insert_task,
        live_data: new Date(),
        user_Date: user_date,
        description: description_user
    };

    if(description_user) {
        // (mantido sem alteração)
    }

    // Adiciona conteúdo HTML do item
    newItem.innerHTML = `
        <label class="container">
            <input class="input-checkbox" type="checkbox">
            <div class="checkmark"></div>
        </label>
        <p>${Tarefa.task}</p>
        <p>${Tarefa.user_Date.toLocaleDateString()}</p>
        <button class="btn-delete">
            <img src="./src/icons/delete-svgrepo.svg" alt="Deletar">
        </button>
        <button class="btn-salvar-descricao">
        <img src="./src/icons/chat-svgrepo-com.svg" alt="">
        </button>
    `;

    // Cria a descrição
    const description_item = document.createElement('p');
    description_item.textContent = description_user || "No description added..";
    description_item.classList.add("description-of-task");

    // ===== Status da tarefa como imagem =====
    const status = document.createElement("img");
    status.classList.add("status-img");
    status.alt = "Status da tarefa";
    status.width = 40;
    status.height = 40;
    
    // Define imagem original de acordo com a data
    let originalStatusSrc = "";

    // Calcula diferença em dias
    const diffTime = user_date.getTime() - hoje.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
        // já passou do prazo
        newItem.classList.add("red-task");
        originalStatusSrc = "./src/icons/Asset 2@2000x.png";
        description_item.classList.add("red-task");
    } else if (diffDays <= 3) {
        // faltam 3 dias ou menos
        newItem.classList.add("yellow-task");
        originalStatusSrc = "./src/icons/Asset 10@2000x.png";
        description_item.classList.add("yellow-task");
    } else {
        // prazo tranquilo
        newItem.classList.add("green-task");
        originalStatusSrc = "./src/icons/Asset 9@2000x.png";
        description_item.classList.add("green-task");
    }

    status.src = originalStatusSrc;

    newItem.appendChild(status);
    list.appendChild(newItem);
    list.appendChild(description_item);

    // ===== Checkbox =====
    const checkbox = newItem.querySelector("input.input-checkbox");
    checkbox.addEventListener("change", () => {
        newItem.classList.toggle("checkbox-background", checkbox.checked);

        // Alterna imagem do status usando ternário
        status.src = checkbox.checked
            ? "./src/icons/Asset 4@2000x.png"  // imagem de concluído
            : originalStatusSrc; // volta à imagem original

        description_item.classList.toggle("checkbox-background")
    });

    // ===== Botão deletar =====
    const btnDelete = newItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Tem certeza que deseja apagar esta tarefa?")) {
            newItem.remove();
            description_item.remove();
        }
    });

    // ===== Botão descrição =====
    const btnDescription = newItem.querySelector(".btn-salvar-descricao");
    btnDescription.addEventListener("click", (e) => {
        e.preventDefault();
        description_item.classList.toggle("active");
    });

    console.log(Tarefa);
});

let btnVerTarefasConcluidas = document.getElementById("btn-show-task")
btnVerTarefasConcluidas.addEventListener("click", (e)=>{
    e.preventDefault();
    let listaDeTarefas = document.getElementById("list");
    listaDeTarefas.classList.toggle("active");
});

let btnVerTarefas = document.getElementById("btn-ver-excluidas")
btnVerTarefas.addEventListener("click", (e)=>{
    e.preventDefault();
});

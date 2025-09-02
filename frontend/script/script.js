const btn = document.querySelector("button#btn-add");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputText = document.querySelector('#input-text').value;
    const datauser = document.querySelector("input#dataDoUser").value;

    // Cria objeto Tarefa
    const Tarefa = {
        id: Math.floor(Math.random() * 10000000),
        task: inputText,
        dataAtual: new Date(),
        dataUser: new Date(datauser)
    };

    // Comparação de datas
    let hoje = new Date(Tarefa.dataAtual);
    hoje.setHours(0,0,0,0);

    let userDate = new Date(Tarefa.dataUser);
    userDate.setHours(0,0,0,0);


    // Adiciona na lista
    const list = document.querySelector('#list');
    const newItem = document.createElement('li');

    newItem.innerHTML = `
        <input type="checkbox" class="input-checkbox">
        <p>${Tarefa.task}</p>
        <p>${Tarefa.dataUser.toLocaleDateString()}</p>
        <button class="btn-delete">
            <img src="./frontend/icons/delete-icon.svg" alt="Deletar">
        </button>
        
    `;


    list.appendChild(newItem);


        if (hoje.getTime() === userDate.getTime()) {
        console.log("Datas iguais");
            newItem.classList.add("yellow-task");
              
         const status = document.createElement("p")
         status.textContent = "vencendo"
         newItem.appendChild(status)
         
    } else if (hoje < userDate) {
        console.log("Ainda falta tempo");
            
          const status = document.createElement("p")
         status.textContent = "Tranquilo"
         newItem.appendChild(status)
        newItem.classList.add("green-task");
    } else {
        console.log("Tarefa vencida");
             
           const status = document.createElement("p")
         status.textContent = "Venceu"
         newItem.appendChild(status)
          newItem.classList.add("red-task");
    }

let checkbox = newItem.querySelector("input.input-checkbox");



checkbox.addEventListener("change",()=>{
    console.log("click")

      if (checkbox.checked) {
      newItem.classList.add("checkbox-background")
     } else {
          newItem.classList.remove("checkbox-background")

     }

})

    console.log(Tarefa)

 // adiciona/remove classe de acordo com o estado da checkbox
 

  // muda cor de fundo apenas se estiver marcada



});

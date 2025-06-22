const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = document.querySelector('#input-text').value.trim();

    if (inputText === "") {
        alert('Por favor adicione uma tarefa');
        return;
    }

    const list = document.querySelector('#list');
    const newItem = document.createElement('li');

    newItem.innerHTML = `
       
            <input type="checkbox" class="input-checkbox">
            <p>${inputText}</p>
         <button class="btn-delete">
                <img src="./frontend/icons/delete-icon.svg" alt="Deletar">
            </button>
      
    `;

    newItem.classList.add("backgroundStandardList")

    list.appendChild(newItem);

    // ✔️ Seleciona os elementos de dentro do newItem
    const btnDelete = newItem.querySelector('.btn-delete');
    const checkbox = newItem.querySelector('.input-checkbox');

 btnDelete.addEventListener('click', () => {
    const confirmacao = confirm("Tem certeza que quer apagar esse item da lista?");
    
    if (confirmacao) {
        newItem.remove();
    }
});

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        newItem.classList.remove("backgroundStandardList");
        newItem.classList.add("completed");
    } else {
        newItem.classList.remove("completed");
        newItem.classList.add("backgroundStandardList");
    }

    console.log('chequei');
});


    form.reset(); // limpa o campo de texto
});



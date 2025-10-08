// ------------------------------
// To-Do List - Logica con DOM
// ------------------------------
// In questo file realizzo tutta la logica della to-do list sfruttando il DOM.
// REQUISITI coperti:
// - Aggiungere una nuova task con bottone o tasto Invio
// - Contrassegnare una task come completata con un click (line-through)
// - Eliminare singolarmente una task con un apposito bottone
// - Un minimo di UX: prevenire inserimenti vuoti, riposizionare il focus, ecc.

// 1) Seleziono gli elementi base dell'interfaccia (input, bottone, lista)
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Piccolo test per verificare che lo script sia correttamente caricato
console.log("JS collegato correttamente! 🎯");

// 2) Funzione di utilità: crea un elemento <li> completo di testo e bottone elimina
//    RITORNA: l'elemento <li> già pronto da appendere alla lista
function createTaskElement(taskText) {
  // Creo il <li> che rappresenta UNA singola task
  const li = document.createElement("li");

  // Creo uno span per il testo della task (uso textContent per evitare HTML injection)
  const textSpan = document.createElement("span");
  textSpan.textContent = taskText; // assegno il testo

  // Creo il bottone di eliminazione e gli applico la classe per lo stile
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn"; // classe definita nel CSS
  deleteBtn.textContent = "Elimina"; // testo del bottone
  deleteBtn.setAttribute("aria-label", `Elimina la task: ${taskText}`);

  // Aggiungo gli elementi appena creati dentro al <li>
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  // Evento 1: click sul <li> per segnare la task come COMPLETATA / NON COMPLETATA
  // - toggle aggiunge/rimuove la classe "completed" (gestita nel CSS con line-through)
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Evento 2: click sul bottone "Elimina" per rimuovere SOLO quella task
  // ATTENZIONE: stopPropagation impedisce che il click sul bottone
  // venga "captato" anche dal listener del <li> (evitando il toggle involontario)
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // blocco il bubbling del click
    li.remove(); // rimuovo l'elemento dalla lista
  });

  return li;
}

// 3) Funzione per leggere l'input e aggiungere una nuova task alla lista
function addTaskFromInput() {
  // trim() rimuove spazi all'inizio/fine per evitare task "vuote" o fatte solo di spazi
  const rawValue = input.value.trim();

  // Se l'utente non ha scritto nulla, non faccio nulla (piccola UX improvement)
  if (!rawValue) {
    // Qui mi limito a evidenziare l'input temporaneamente
    input.focus();
    return; // esco dalla funzione senza aggiungere
  }

  // Creo il <li> pronto con testo + bottone elimina
  const li = createTaskElement(rawValue);

  // Inserisco il <li> dentro la <ul> (in coda)
  taskList.appendChild(li);

  // Pulisco l'input e riporto il focus per permettere inserimenti rapidi
  input.value = "";
  input.focus();
}

// 4) Collego gli eventi principali:
// - Click sul bottone "Aggiungi"
addBtn.addEventListener("click", addTaskFromInput);

// - Tasto INVIO mentre scrivo nell'input (per aggiungere più velocemente)
input.addEventListener("keydown", (event) => {
  // Verifico che il tasto premuto sia proprio Enter
  if (event.key === "Enter") {
    addTaskFromInput();
  }
});



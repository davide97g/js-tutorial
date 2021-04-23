/**
 * Riferimento per uno schema della struttura logica di una todo list
 */

const database = {
  "2021-4-22": {
    tasks: [
      { description: "task 1", completed: false },
      { description: "task 2", completed: false },
    ],
  },
  "2021-4-23": {
    tasks: [
      { description: "task 3", completed: false },
      { description: "task 4", completed: false },
      { description: "task 5", completed: false },
      { description: "task 6", completed: false },
    ],
  },
};

/**
 * Aggiungere un nuovo giorno al database
 * @param {string} date
 */
function newDay(date) {
  database[date] = {
    tasks: [],
  };
}

/**
 * deve inserire una nuova task data una certa data
 * @param {Date} date
 * @param {string} task_description
 */
function newTask(date, task_description) {
  let datestring = date.toLocaleDateString();
  // controllo se esiste il giorno ed eventualmente lo inserisco
  if (!database[datestring]) newDay(datestring);
  // aggiungo effettivamente la task
  let task = {
    description: task_description, // input utente
    completed: false,
  };
  database[datestring].tasks.push(task);
}

/**
 * Rimuovere una certa task da un giorno specificato
 * @param {Date} date
 * @param {number} x indice del task da rimuovere
 */
function removeTask(date, x) {
  let datestring = date.toLocaleDateString();
  // controllo se esiste il giorno ed eventualmente lo inserisco
  if (database[datestring]) {
    if (x < database[datestring].tasks.length) {
      // allora la posso eliminare
      database[datestring].tasks.splice(x, 1);
    } else {
      console.error("Non esiste il task scelto");
    }
  } else {
    // se altrimenti non esiste, sono fregato e avviso l'utente
    console.error("Non esiste il giorno specificato");
  }
}

let today = new Date("2021-4-23");
let my_task = "nuova task";

newTask(today, my_task);
removeTask(today, 1);

/**
 * Segna una certa task di un giorno specificato come completata
 * @param {Date} date
 * @param {number} x indice del task da segnare come completato
 */
function completeTask(date, x) {
  let datestring = date.toLocaleDateString();
  // controllo se esiste il giorno ed eventualmente lo inserisco
  if (database[datestring]) {
    if (x < database[datestring].tasks.length) {
      // allora la posso eliminare
      database[datestring].tasks[x].completed = true;
    } else {
      console.error("Non esiste il task scelto");
    }
  } else {
    // se altrimenti non esiste, sono fregato e avviso l'utente
    console.error("Non esiste il giorno specificato");
  }
}

completeTask(today, 3);

console.info(database["2021-4-23"].tasks);

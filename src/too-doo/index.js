let database = {
  "01-05-2021": [
    {
      description: "Task 1",
      from: "9:00",
      to: "11:00",
      completed: false,
    },
    {
      description: "Task 2",
      from: "11:30",
      to: "12:30",
      completed: false,
    },
  ],
};

// * get UI components

const container = document.getElementById("container");

function sortDatabase() {
  for (let date in database)
    database[date].sort((task1, task2) => (task1.from > task2.from ? 1 : -1)); // sort using from property
}

function addDate(date) {
  if (database[date]) console.warn(date, "already present in db.");
  else database[date] = [];
}

function addTask(date, description, from, to) {
  if (!database[date]) addDate(date);
  else {
    let new_task = {
      description,
      from,
      to,
      completed: false,
    };
    database[date].push(new_task);
    sortDatabase(); // keep all clean and organized
    renderAll(); // render all the UI
  }
}

function renderAll() {
  container.innerHTML = "";
  for (let date in database) createCard(date);
}

function createCard(date) {
  let card = document.createElement("div");
  card.classList.add("mdc-card", "date-card", "mdc-card--outlined");
  let title = document.createElement("div");
  title.classList.add("card-title");
  title.innerHTML = "<h4>Day " + date + "</h4>";
  // append title to card
  card.appendChild(title);
  // loop over all the tasks
  for (let i = 0; i < database[date].length; i++) {
    let task = database[date][i];
    let description = document.createElement("div");
    description.classList.add("card-description");
    description.innerHTML = "<span>" + task.description + "</span>";
    let extra = document.createElement("div");
    extra.classList.add("card-extra");
    extra.innerHTML = "<span>" + task.from + " - " + task.to + "</span>";
    let actions = document.createElement("div");
    actions.classList.add("mdc-card__actions", "card-actions");
    actions.innerHTML = `
    <button id="complete_${date}_${i}"
        class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        title="Done"
        onclick="complete(this.id)"
    >
        done
    </button>
    <button
        id="remove_${date}_${i}"
        class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        title="Remove"
        onclick="remove(this.id)"
    >
        clear
    </button>`;
    let divider = document.createElement("span");
    divider.classList.add("divider");
    // appending to card
    card.appendChild(description);
    card.appendChild(extra);
    card.appendChild(actions);
    card.appendChild(divider);
  }
  // append card to container
  container.appendChild(card);
}

function removeTask(date, index) {
  if (!database[date]) console.error(date, "not present");
  else {
    if (index < database[date].length) {
      database[date].splice(index, 1);
      renderAll();
    } else console.error(index, "is out of bounds on", date, "tasks");
  }
}

function completeTask(date, index) {
  if (!database[date]) console.error(date, "not present");
  else {
    if (index < database[date].length) {
      database[date][index].completed = true;
      renderAll();
    } else console.error(index, "is out of bounds on", date, "tasks");
  }
}

function remove(id) {
  let [_, date, index] = id.split("_"); // ? unzip the data
  console.info(date, index);
  removeTask(date, index);
}

function complete(id) {
  let [_, date, index] = id.split("_"); // ? unzip the data
  console.info(date, index);
  completeTask(date, index);
}

renderAll();

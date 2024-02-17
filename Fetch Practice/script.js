const mainContainer = document.getElementById("container");

let userId = 1;

document.getElementById("data-table-btn").addEventListener("click", () => {
  showLoading();
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => showTodosInTable(data));
});

document.getElementById("data-card-btn").addEventListener("click", () => {
  showLoading();
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => showCardsInTable(data));
});

document
  .getElementById("data-user-btn")
  .addEventListener("click", () => fetchUserAndShow(userId));

function fetchUserAndShow(uid) {
  showLoading();
  fetch(`https://jsonplaceholder.typicode.com/users/${uid}`)
    .then((res) => res.json())
    .then((data) => {
      showUser(data);
    });
}

function showTodosInTable(data) {
  const table = document.createElement("table");
  for (let todo of data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${todo.id}</td>
        <td>${todo.title}</td><td>${todo.completed}</td>`;
    table.appendChild(tr);
  }
  removeLoading();
  mainContainer.append(table);
}

function showCardsInTable(data) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  for (let cardData of data) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h3 class="card-header">${cardData.title}</h3>
        <div class="card-body">
          ${cardData.body}
        </div>`;
    cardContainer.appendChild(card);
  }
  removeLoading();
  mainContainer.append(cardContainer);
}

function showPrevUser() {
  if (userId == 1) return;
  userId--;
  fetchUserAndShow(userId);
}

function showNextUser() {
  if (userId == 10) return;
  userId++;
  fetchUserAndShow(userId);
}

function showUser(user) {
  const container = document.createElement("div");
  container.classList.add("user-container");
  const userBUttons = document.createElement("div");
  userBUttons.classList.add("user-change-buttons");
  userBUttons.innerHTML = `<button class="prev-user" onclick="showPrevUser()">Prev</button>
    <button class="next-user" onclick="showNextUser()">Next</button>`;
  container.appendChild(userBUttons);
  const userWrapper = document.createElement("div");
  userWrapper.innerHTML = `<h1>${user.name}</h1>
    <p>username : ${user.username}</p>
    <p>email : ${user.email}</p>
    <p>Phone number : ${user.phone}</p>
    <p>website : ${user.website}</p>
    <fieldset>
      <legend>Address</legend>
      <p>street : ${user.street}</p>
      <p>suite : ${user.suite}</p>
      <p>city : ${user.city}</p>
      <p>zipcode : ${user.zipcode}</p>
    </fieldset>`;
  container.appendChild(userWrapper);
  removeLoading();
  mainContainer.appendChild(container);
}

function showLoading() {
  mainContainer.innerHTML = `<div class="loader-wrapper">
    <div class="loader-outer">
      <div class="loader-inner"></div>
    </div>
  </div>`;
}

function removeLoading() {
  mainContainer.innerHTML = "";
}

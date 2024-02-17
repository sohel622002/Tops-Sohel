const addedUsers = new Set([]);

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", handleSearchInput);

function handleSuggestionsClick(e) {
  const id = e.currentTarget.getAttribute("data-userId");
  console.log(id);
  fetch(`https://dummyjson.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      addedUsers.add(data);
      updatePills();
    });
}

function updatePills() {
  document.querySelectorAll(".pills").forEach(pill => pill.remove());
  addedUsers.forEach((user) => {
    const parent = document.createElement("div");
    parent.classList.add("pills");
    parent.addEventListener("click", handlePillClick);
    parent.innerHTML = `<div>
        <img
          src=${user.image}
          alt=${user.firstName + user.lastName}
        />
        <span>${user.firstName + user.lastName}</span>
      </div>
      <span class="cross">&times;</span>`;
    document.querySelector(".search-wrapper").insertBefore(parent, searchInput);
  });
  searchInput.value = "";
}

function handlePillClick() {
  console.log(e.currentTarget, getAttribute("data-userId"));
}

// console.log(addedUsers);

function handleSearchInput(e) {
  fetch(`https://dummyjson.com/users/search?q=${e.target.value}`)
    .then((res) => res.json())
    .then((data) => showUserInSuggestions(data.users));
}

function showUserInSuggestions(data) {
  const container = document.querySelector(".suggestions");
  container.innerHTML = "";
  console.log(data);
  data.forEach((d) => {
    const suggestionWrapper = document.createElement("div");
    suggestionWrapper.addEventListener("click", handleSuggestionsClick);
    suggestionWrapper.classList.add("suggestion-wrapper");
    suggestionWrapper.setAttribute("data-userId", d.id);
    const innerContent = `<img src=${d.image} alt=${d.email} />
          <span>${d.firstName + d.lastName}</span>`;
    suggestionWrapper.innerHTML = innerContent;
    container.appendChild(suggestionWrapper);
  });
}

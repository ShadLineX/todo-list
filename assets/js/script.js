const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const erase = document.querySelector(".erase");
const GitHub = document.querySelector(".button-icon");
const clean = document.querySelector(".clean");

let inputValue = "";

function addTask(value) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <i class="fa-solid fa-list-ul"></i>
    
    <p>${value}</p>
    <div class="content">
      <label class="checkBox">
        <input type="checkbox">
        <div class="transition"></div>
      </label>
    </div>
    <button type="button" class="erase">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  list.appendChild(li);
}

function showNotification(message) {
  const existingNotification = document.querySelector(
    ".notification-container"
  );
  if (existingNotification) return;

  const notification = document.createElement("ul");
  notification.className = "notification-container";
  notification.innerHTML = `
    <li class="notification-item error">
      <div class="notification-content">
        <div class="notification-icon">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>
        </div>
        <div class="notification-text">${message}</div>
      </div>
      <div class="notification-progress-bar"></div>
    </li>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

input.addEventListener("keyup", (e) => {
  inputValue = e.target.value;
  if (e.key === "Enter") {
    if (inputValue.trim() === "") {
      showNotification("An input is empty!");
    } else {
      addTask(inputValue);
      input.value = "";
      inputValue = "";
    }
  }
});

button.addEventListener("click", () => {
  inputValue = input.value;
  if (inputValue.trim() === "") {
    showNotification("An input is empty!");
  } else {
    addTask(inputValue);
    input.value = "";
    inputValue = "";
  }
});

list.addEventListener("click", (e) => {
  if (e.target.closest(".erase")) {
    const taskItem = e.target.closest(".task");
    if (taskItem) {
      taskItem.remove();
    }
  }
});

GitHub.addEventListener("click", () => {
  window.open("https://github.com/ShadLineX", "_blank");
});

clean.addEventListener("click", () => {
  document.querySelectorAll(".task").forEach((task) => task.remove());
});

new Sortable(list, {
  animation: 150,
});
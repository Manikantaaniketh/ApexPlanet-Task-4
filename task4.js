const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="deleteTask(${index})">✕</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", renderTasks);

// === PRODUCT PAGE ===
const products = [
  { name: "T-Shirt", category: "clothing", price: 20, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 800, rating: 4.8 },
  { name: "Shoes", category: "clothing", price: 50, rating: 4.2 },
  { name: "Headphones", category: "electronics", price: 100, rating: 4.6 },
  { name: "Book", category: "books", price: 15, rating: 4.9 },
];

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productList = document.getElementById("productList");

function renderProducts() {
  let filtered = products.filter(
    (p) => categoryFilter.value === "all" || p.category === categoryFilter.value
  );

  if (sortFilter.value === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sortFilter.value === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sortFilter.value === "priceHigh") filtered.sort((a, b) => b.price - a.price);

  productList.innerHTML = filtered
    .map(
      (p) => `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>$${p.price}</p>
        <p>⭐ ${p.rating}</p>
      </div>
    `
    )
    .join("");
}

categoryFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);
window.addEventListener("load", renderProducts);

// === CONTACT FORM (mock) ===
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent successfully!");
  e.target.reset();
});
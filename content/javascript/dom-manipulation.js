/* ============================================================
 * File    : dom-manipulation.js
 * Topic   : JavaScript DOM Manipulation
 * Author  : Pabitra Chakrabortty
 * Created : 2026-05-14
 * Purpose : Core DOM skills: selecting elements, changing
 *           content/styles, handling events and creating new
 *           elements dynamically. Built as a tiny todo-list so
 *           every technique is used in a real way.
 * Usage   : Include with <script src="dom-manipulation.js">
 *           after the <body> content of any page.
 * ============================================================ */

"use strict";

/* 1. Selecting elements --------------------------------------
 * Modern way: querySelector / querySelectorAll (CSS syntax).
 *   document.getElementById("page-title")
 *   document.querySelectorAll(".item")
 */

/* Demo setup: build a tiny page in memory so this file is
   self-contained. On a real page these elements would already
   exist in your HTML. */
const heading = document.createElement("h2");
heading.textContent = "My Todo List";        // safe: plain text
// heading.innerHTML = "<b>...</b>";         // only for trusted HTML!
document.body.appendChild(heading);

const input = document.createElement("input");
input.placeholder = "Type a task and press Enter";
document.body.appendChild(input);

const demoList = document.createElement("ul");
demoList.id = "todo-list";
document.body.appendChild(demoList);

const button = document.createElement("button");
button.textContent = "Add a task";
document.body.appendChild(button);

/* 2. Creating + appending elements ------------------------------ */
function addTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("todo-item");
  demoList.appendChild(li);
  return li;
}

addTodo("Learn DOM selection");
addTodo("Practice events");
addTodo("Build something real");

/* 3. Styling with classes (prefer classes over inline styles) ---- */
const firstTodo = demoList.querySelector(".todo-item");
firstTodo.classList.add("done");
firstTodo.classList.toggle("done");  // adds if missing, removes if present

/* 4. Events ------------------------------------------------------- */
button.addEventListener("click", () => {
  addTodo("New task added on click!");
});

/* Event delegation: ONE listener on the parent handles every item.
 * Far better than attaching hundreds of listeners. */
demoList.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (item) {
    item.classList.toggle("done");   // click a task to toggle it
  }
});

/* 5. Reading data from inputs -------------------------------------- */
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
    addTodo(input.value.trim());
    input.value = "";
  }
});

/* 6. Updating many elements at once --------------------------------- */
function markAllDone() {
  document.querySelectorAll(".todo-item").forEach((el) => {
    el.classList.add("done");
  });
}

/* Key takeaways I keep in mind:
 * - querySelector for anything CSS can describe
 * - textContent for text (safe), innerHTML only for trusted markup
 * - prefer classList + CSS over element.style
 * - event delegation > one listener per element
 */

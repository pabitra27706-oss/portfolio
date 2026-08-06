/* ============================================================
 * File    : arrays.js
 * Topic   : JavaScript Arrays in Depth
 * Author  : Pabitra Chakrabortty
 * Created : 2026-06-20
 * Purpose : map / filter / reduce, searching, sorting pitfalls,
 *           destructuring, spread, and arrays of objects.
 * Usage   : node arrays.js   (or open in a browser console)
 * ============================================================ */

"use strict";

const marks = [78, 92, 65, 88, 95, 71];

/* 1. The big three: map, filter, reduce ------------------------ */
const grace = marks.map((m) => m + 5);            // transform every item
const passed = marks.filter((m) => m >= 70);      // keep matching items
const total = marks.reduce((sum, m) => sum + m, 0);

console.log("grace :", grace);
console.log("passed:", passed);
console.log("total :", total, "| average:", (total / marks.length).toFixed(2));

/* 2. Searching --------------------------------------------------- */
console.log("\nincludes(92):", marks.includes(92));
console.log("indexOf(65)  :", marks.indexOf(65));
console.log("find(>90)    :", marks.find((m) => m > 90));
console.log("findIndex    :", marks.findIndex((m) => m > 90));

/* 3. Sorting (watch out: default sort is string-based!) ----------- */
console.log("\nbuggy default sort:", [100, 25, 7, 90].sort());
console.log("numeric ascending :", [...marks].sort((a, b) => a - b));
console.log("numeric descending:", [...marks].sort((a, b) => b - a));

/* 4. Destructuring + spread ---------------------------------------- */
const [first, second, ...rest] = marks;
console.log("\nfirst:", first, "second:", second, "rest:", rest);

const combined = [...marks, 99, 100];
console.log("combined:", combined);

/* 5. Handy utilities -------------------------------------------------- */
const names = ["arya", "bilal", "chetan"];
console.log("\njoin:", names.join(" | "));
console.log("slice(1,3):", marks.slice(1, 3));   // does not mutate
console.log("every >= 60:", marks.every((m) => m >= 60));
console.log("some >= 95 :", marks.some((m) => m >= 95));
console.log("flat:", [[1, 2], [3, [4]]].flat(Infinity));

/* 6. Array of objects - the shape real data usually has ---------------- */
const students = [
  { name: "Pabitra",  marks: 85 },
  { name: "Riya",  marks: 92 },
  { name: "Kabir", marks: 68 },
];

const toppers = students
  .filter((s) => s.marks >= 80)
  .map((s) => s.name);
console.log("\ntoppers:", toppers);

/* Takeaways:
 * - map / filter / reduce never modify the original array
 * - always pass a comparator to sort() for numbers
 * - spread (...) is the cleanest way to copy or merge arrays
 */

/* ============================================
   JSON Creator v2.0 - Main Logic
   ============================================ */

(function () {
  "use strict";

  /* ============================================
     LANG_CONFIG - Master Data Library
     ============================================ */

  const LANG_CONFIG = {
    C: {
      folder: "c",
      extension: ".c",
      categories: [
        "Basics",
        "Control Flow",
        "Data Structures",
        "Memory Management",
        "File I/O",
        "Algorithms",
        "String Operations",
        "Pointers & References",
        "Functions",
        "Custom"
      ],
      tags: [
        "hello-world", "variables", "data-types", "operators", "input", "output",
        "printf", "scanf", "comments", "if-else", "switch", "for-loop",
        "while-loop", "do-while", "break", "continue", "nested-loops",
        "conditional", "ternary", "functions", "parameters", "return",
        "recursion", "function-pointers", "inline", "static", "arrays",
        "strings", "structs", "typedef", "linked-list", "stack", "queue",
        "trees", "graphs", "hash-tables", "pointers", "memory", "malloc",
        "calloc", "free", "dynamic-memory", "memory-leak", "address",
        "dereferencing", "file-io", "fopen", "fclose", "fread", "fwrite",
        "fprintf", "fscanf", "sorting", "searching", "binary-search",
        "bubble-sort", "quick-sort", "merge-sort", "macros", "preprocessor",
        "header-files", "multi-file", "compilation", "debugging"
      ],
      topicTemplates: [
        {
          name: "Hello World",
          category: "Basics",
          difficulty: "beginner",
          tags: ["hello-world", "printf", "basics"],
          descStarter: "First C program that prints Hello World to the console. Introduction to basic program structure and output."
        },
        {
          name: "Variables & Data Types",
          category: "Basics",
          difficulty: "beginner",
          tags: ["variables", "data-types", "int", "float", "char"],
          descStarter: "Understanding variables, data types (int, float, char, double), and variable declarations in C."
        },
        {
          name: "Input & Output",
          category: "Basics",
          difficulty: "beginner",
          tags: ["input", "output", "printf", "scanf"],
          descStarter: "Taking user input using scanf() and displaying output using printf(). Format specifiers and basic I/O operations."
        },
        {
          name: "If-Else Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["if-else", "conditional", "control-flow"],
          descStarter: "Conditional execution using if-else statements. Decision making and branching logic in C programs."
        },
        {
          name: "Switch Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["switch", "case", "conditional"],
          descStarter: "Multi-way branching using switch-case statements. Efficient alternative to multiple if-else conditions."
        },
        {
          name: "For Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["for-loop", "loops", "iteration"],
          descStarter: "Iteration using for loops. Understanding loop initialization, condition, and increment/decrement."
        },
        {
          name: "While Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["while-loop", "loops", "iteration"],
          descStarter: "Iteration using while loops. Entry-controlled loop for repeated execution based on condition."
        },
        {
          name: "Do-While Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["do-while", "loops", "iteration"],
          descStarter: "Exit-controlled loop using do-while. Guarantees at least one execution of the loop body."
        },
        {
          name: "Nested Loops",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["nested-loops", "loops", "patterns"],
          descStarter: "Using loops inside loops for complex patterns, matrices, and multi-dimensional iteration."
        },
        {
          name: "Arrays Basics",
          category: "Data Structures",
          difficulty: "beginner",
          tags: ["arrays", "indexing", "loops"],
          descStarter: "Declaring, initializing, and accessing array elements. Single-dimensional arrays and basic operations."
        },
        {
          name: "Multi-Dimensional Arrays",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["arrays", "2d-arrays", "matrices"],
          descStarter: "Working with 2D and multi-dimensional arrays. Matrix operations and nested array access."
        },
        {
          name: "String Handling",
          category: "String Operations",
          difficulty: "beginner",
          tags: ["strings", "char", "arrays"],
          descStarter: "Working with strings as character arrays. String input/output and basic string operations."
        },
        {
          name: "String Functions",
          category: "String Operations",
          difficulty: "intermediate",
          tags: ["strings", "strlen", "strcpy", "strcmp"],
          descStarter: "Using built-in string functions like strlen, strcpy, strcmp, strcat for string manipulation."
        },
        {
          name: "Functions Basics",
          category: "Functions",
          difficulty: "beginner",
          tags: ["functions", "parameters", "return"],
          descStarter: "Creating and calling functions with parameters and return values. Function declaration and definition."
        },
        {
          name: "Recursion",
          category: "Functions",
          difficulty: "intermediate",
          tags: ["recursion", "functions", "algorithms"],
          descStarter: "Understanding recursive function calls. Base case and recursive case in problem solving."
        },
        {
          name: "Pointers Basics",
          category: "Pointers & References",
          difficulty: "intermediate",
          tags: ["pointers", "address", "dereferencing"],
          descStarter: "Introduction to pointers, memory addresses, pointer declaration, and dereferencing operators."
        },
        {
          name: "Pointers & Arrays",
          category: "Pointers & References",
          difficulty: "intermediate",
          tags: ["pointers", "arrays", "pointer-arithmetic"],
          descStarter: "Relationship between pointers and arrays. Pointer arithmetic and array traversal using pointers."
        },
        {
          name: "Pointers to Pointers",
          category: "Pointers & References",
          difficulty: "advanced",
          tags: ["pointers", "double-pointers", "advanced"],
          descStarter: "Understanding multi-level pointers. Pointer to pointer concepts and applications."
        },
        {
          name: "Dynamic Memory Allocation",
          category: "Memory Management",
          difficulty: "intermediate",
          tags: ["malloc", "free", "dynamic-memory"],
          descStarter: "Allocating and freeing memory dynamically using malloc, calloc, realloc, and free."
        },
        {
          name: "Structures (struct)",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["structs", "typedef", "user-defined"],
          descStarter: "Creating custom data structures using struct. Grouping related data together."
        },
        {
          name: "Linked List",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["linked-list", "pointers", "dynamic"],
          descStarter: "Implementation of singly linked list. Dynamic data structure with node creation and traversal."
        },
        {
          name: "Stack Implementation",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["stack", "push", "pop", "lifo"],
          descStarter: "Stack data structure using arrays or linked list. LIFO operations: push, pop, peek."
        },
        {
          name: "Queue Implementation",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["queue", "enqueue", "dequeue", "fifo"],
          descStarter: "Queue data structure implementation. FIFO operations: enqueue, dequeue, front, rear."
        },
        {
          name: "File Reading",
          category: "File I/O",
          difficulty: "intermediate",
          tags: ["file-io", "fopen", "fread", "fscanf"],
          descStarter: "Reading data from files using fopen, fread, fscanf, and fclose. File handling basics."
        },
        {
          name: "File Writing",
          category: "File I/O",
          difficulty: "intermediate",
          tags: ["file-io", "fopen", "fwrite", "fprintf"],
          descStarter: "Writing data to files using fopen, fwrite, fprintf. Creating and modifying files."
        },
        {
          name: "Bubble Sort",
          category: "Algorithms",
          difficulty: "beginner",
          tags: ["sorting", "bubble-sort", "arrays"],
          descStarter: "Simple sorting algorithm using bubble sort. Comparing adjacent elements and swapping."
        },
        {
          name: "Selection Sort",
          category: "Algorithms",
          difficulty: "beginner",
          tags: ["sorting", "selection-sort", "arrays"],
          descStarter: "Sorting algorithm that selects minimum element and places it at the beginning."
        },
        {
          name: "Binary Search",
          category: "Algorithms",
          difficulty: "intermediate",
          tags: ["searching", "binary-search", "arrays"],
          descStarter: "Efficient searching algorithm for sorted arrays. Divide and conquer approach."
        },
        {
          name: "Linear Search",
          category: "Algorithms",
          difficulty: "beginner",
          tags: ["searching", "linear-search", "arrays"],
          descStarter: "Simple searching algorithm that checks each element sequentially."
        }
      ],
      defaultDifficulty: "beginner"
    },

    Python: {
      folder: "python",
      extension: ".py",
      categories: [
        "Basics",
        "Control Flow",
        "Data Structures",
        "Functions",
        "OOP",
        "File Handling",
        "Modules & Packages",
        "Error Handling",
        "Advanced",
        "Web",
        "Data Science",
        "Custom"
      ],
      tags: [
        "hello-world", "variables", "data-types", "operators", "input", "print",
        "comments", "indentation", "if-else", "elif", "for-loop", "while-loop",
        "break", "continue", "pass", "range", "lists", "tuples", "dictionaries",
        "sets", "list-comprehension", "dict-comprehension", "slicing", "indexing",
        "functions", "parameters", "return", "lambda", "args", "kwargs",
        "decorators", "generators", "recursion", "classes", "objects",
        "inheritance", "polymorphism", "encapsulation", "methods", "self",
        "constructor", "dunder-methods", "file-io", "with-statement",
        "context-manager", "try-except", "exceptions", "raise", "finally",
        "regex", "iterators", "comprehensions", "modules", "packages",
        "virtual-env", "pip", "numpy", "pandas", "matplotlib", "requests",
        "flask", "django", "beautifulsoup"
      ],
      topicTemplates: [
        {
          name: "Hello World",
          category: "Basics",
          difficulty: "beginner",
          tags: ["hello-world", "print"],
          descStarter: "First Python program using the print() function. Introduction to Python syntax and basic output."
        },
        {
          name: "Variables & Types",
          category: "Basics",
          difficulty: "beginner",
          tags: ["variables", "data-types"],
          descStarter: "Understanding variables and data types (int, float, str, bool) in Python. Dynamic typing and type conversion."
        },
        {
          name: "User Input",
          category: "Basics",
          difficulty: "beginner",
          tags: ["input", "print"],
          descStarter: "Taking user input using input() function and displaying output. Basic interactive programs."
        },
        {
          name: "If-Else Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["if-else", "elif", "conditional"],
          descStarter: "Conditional statements in Python using if, elif, and else. Decision making and boolean logic."
        },
        {
          name: "For Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["for-loop", "range", "iteration"],
          descStarter: "Iterating using for loops with range() and sequences. Looping through lists, strings, and ranges."
        },
        {
          name: "While Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["while-loop", "iteration"],
          descStarter: "Using while loops for repeated execution based on conditions. Loop control with break and continue."
        },
        {
          name: "Lists Basics",
          category: "Data Structures",
          difficulty: "beginner",
          tags: ["lists", "indexing", "slicing"],
          descStarter: "Working with Python lists. Creating, accessing, modifying, and slicing list elements."
        },
        {
          name: "List Methods",
          category: "Data Structures",
          difficulty: "beginner",
          tags: ["lists", "append", "remove", "methods"],
          descStarter: "Common list methods: append, extend, insert, remove, pop, sort, reverse."
        },
        {
          name: "Dictionaries",
          category: "Data Structures",
          difficulty: "beginner",
          tags: ["dictionaries", "key-value"],
          descStarter: "Key-value pairs using dictionaries. Creating, accessing, and modifying dictionary data."
        },
        {
          name: "Tuples & Sets",
          category: "Data Structures",
          difficulty: "beginner",
          tags: ["tuples", "sets", "immutable"],
          descStarter: "Understanding tuples (immutable) and sets (unique elements). When to use each data structure."
        },
        {
          name: "List Comprehension",
          category: "Data Structures",
          difficulty: "intermediate",
          tags: ["list-comprehension", "pythonic"],
          descStarter: "Elegant list creation using comprehensions. Concise syntax for filtering and transforming data."
        },
        {
          name: "Functions Basics",
          category: "Functions",
          difficulty: "beginner",
          tags: ["functions", "parameters", "return"],
          descStarter: "Defining and calling functions in Python. Parameters, arguments, and return values."
        },
        {
          name: "Function Arguments",
          category: "Functions",
          difficulty: "intermediate",
          tags: ["args", "kwargs", "parameters"],
          descStarter: "Understanding *args and **kwargs. Default arguments, keyword arguments, and variable-length arguments."
        },
        {
          name: "Lambda Functions",
          category: "Functions",
          difficulty: "intermediate",
          tags: ["lambda", "anonymous", "functional"],
          descStarter: "Anonymous functions using lambda. Single-line functions for simple operations."
        },
        {
          name: "Decorators",
          category: "Advanced",
          difficulty: "advanced",
          tags: ["decorators", "functions", "wrapper"],
          descStarter: "Function decorators for code reuse and modification. Wrapping functions with additional functionality."
        },
        {
          name: "Generators",
          category: "Advanced",
          difficulty: "advanced",
          tags: ["generators", "yield", "iteration"],
          descStarter: "Memory-efficient iteration with generators. Using yield for lazy evaluation."
        },
        {
          name: "Classes & Objects",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["classes", "objects", "oop"],
          descStarter: "Object-oriented programming basics. Creating classes, objects, and understanding self."
        },
        {
          name: "Inheritance",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["inheritance", "parent", "child"],
          descStarter: "Class inheritance in Python. Parent and child classes, method overriding, and super()."
        },
        {
          name: "Encapsulation & Abstraction",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["encapsulation", "abstraction", "private"],
          descStarter: "Data hiding using encapsulation. Public, private, and protected members."
        },
        {
          name: "File Reading",
          category: "File Handling",
          difficulty: "beginner",
          tags: ["file-io", "read", "with-statement"],
          descStarter: "Reading files in Python using open() and with statement. Reading text and handling file objects."
        },
        {
          name: "File Writing",
          category: "File Handling",
          difficulty: "beginner",
          tags: ["file-io", "write"],
          descStarter: "Writing data to files. Creating, writing, and appending to files."
        },
        {
          name: "Try-Except",
          category: "Error Handling",
          difficulty: "beginner",
          tags: ["try-except", "exceptions"],
          descStarter: "Handling errors gracefully using try-except blocks. Exception handling and error recovery."
        },
        {
          name: "Regular Expressions",
          category: "Advanced",
          difficulty: "intermediate",
          tags: ["regex", "pattern-matching"],
          descStarter: "Pattern matching using regex module. Searching, matching, and replacing text patterns."
        },
        {
          name: "Working with Modules",
          category: "Modules & Packages",
          difficulty: "beginner",
          tags: ["modules", "import"],
          descStarter: "Importing and using modules. Creating custom modules and understanding Python's module system."
        }
      ],
      defaultDifficulty: "beginner"
    },

    JavaScript: {
      folder: "javascript",
      extension: ".js",
      categories: [
        "Basics",
        "Control Flow",
        "Functions",
        "Arrays & Objects",
        "DOM Manipulation",
        "Events",
        "Async Programming",
        "APIs",
        "ES6+",
        "Node.js",
        "Custom"
      ],
      tags: [
        "hello-world", "variables", "let", "const", "var", "data-types",
        "operators", "console-log", "if-else", "switch", "for-loop",
        "while-loop", "ternary", "conditional", "functions", "arrow-functions",
        "parameters", "return", "callbacks", "closures", "iife", "arrays",
        "objects", "map", "filter", "reduce", "forEach", "destructuring",
        "spread", "rest", "dom", "querySelector", "getElementById",
        "createElement", "appendChild", "innerHTML", "events", "addEventListener",
        "click", "submit", "event-bubbling", "event-delegation", "callbacks",
        "promises", "async-await", "fetch", "then", "catch", "es6",
        "template-literals", "classes", "modules", "import", "export",
        "rest-api", "json", "http", "ajax"
      ],
      topicTemplates: [
        {
          name: "Hello World",
          category: "Basics",
          difficulty: "beginner",
          tags: ["hello-world", "console-log"],
          descStarter: "First JavaScript program using console.log(). Introduction to browser console and basic output."
        },
        {
          name: "Variables (let, const, var)",
          category: "Basics",
          difficulty: "beginner",
          tags: ["variables", "let", "const", "var"],
          descStarter: "Variable declarations in JavaScript. Differences between let, const, and var. Block scope vs function scope."
        },
        {
          name: "Data Types",
          category: "Basics",
          difficulty: "beginner",
          tags: ["data-types", "primitives"],
          descStarter: "Understanding JavaScript data types: string, number, boolean, null, undefined, object, symbol."
        },
        {
          name: "If-Else Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["if-else", "conditional"],
          descStarter: "Conditional logic in JavaScript using if, else if, and else statements."
        },
        {
          name: "For Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["for-loop", "iteration"],
          descStarter: "Looping with for loops. Classic for loop syntax and iteration over arrays."
        },
        {
          name: "Switch Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["switch", "case"],
          descStarter: "Multi-way branching with switch statements. Alternative to multiple if-else conditions."
        },
        {
          name: "Functions Basics",
          category: "Functions",
          difficulty: "beginner",
          tags: ["functions", "parameters"],
          descStarter: "Creating and calling functions in JavaScript. Function declarations, expressions, and parameters."
        },
        {
          name: "Arrow Functions",
          category: "Functions",
          difficulty: "beginner",
          tags: ["arrow-functions", "es6"],
          descStarter: "Modern arrow function syntax (=>). Concise function expressions and implicit returns."
        },
        {
          name: "Closures",
          category: "Functions",
          difficulty: "intermediate",
          tags: ["closures", "scope"],
          descStarter: "Understanding closures and lexical scope. Functions that remember their outer scope."
        },
        {
          name: "Callbacks",
          category: "Functions",
          difficulty: "intermediate",
          tags: ["callbacks", "async"],
          descStarter: "Passing functions as arguments. Understanding callback patterns in JavaScript."
        },
        {
          name: "Array Basics",
          category: "Arrays & Objects",
          difficulty: "beginner",
          tags: ["arrays", "indexing"],
          descStarter: "Working with arrays in JavaScript. Creating, accessing, and modifying array elements."
        },
        {
          name: "Array Methods (map, filter, reduce)",
          category: "Arrays & Objects",
          difficulty: "intermediate",
          tags: ["map", "filter", "reduce", "arrays"],
          descStarter: "Functional array methods for transformation and aggregation. Mastering map, filter, and reduce."
        },
        {
          name: "Objects & Properties",
          category: "Arrays & Objects",
          difficulty: "beginner",
          tags: ["objects", "key-value"],
          descStarter: "Creating and using JavaScript objects. Object properties, methods, and property access."
        },
        {
          name: "Destructuring",
          category: "ES6+",
          difficulty: "intermediate",
          tags: ["destructuring", "es6"],
          descStarter: "Array and object destructuring. Extracting values into variables elegantly."
        },
        {
          name: "Spread & Rest Operators",
          category: "ES6+",
          difficulty: "intermediate",
          tags: ["spread", "rest", "es6"],
          descStarter: "Using spread (...) to expand and rest (...) to collect. Modern JavaScript syntax."
        },
        {
          name: "DOM Selection",
          category: "DOM Manipulation",
          difficulty: "beginner",
          tags: ["dom", "querySelector", "getElementById"],
          descStarter: "Selecting HTML elements from the DOM using querySelector, getElementById, and other methods."
        },
        {
          name: "DOM Manipulation",
          category: "DOM Manipulation",
          difficulty: "beginner",
          tags: ["dom", "innerHTML", "createElement"],
          descStarter: "Changing page content dynamically. Modifying elements, creating nodes, and updating the DOM."
        },
        {
          name: "Event Listeners",
          category: "Events",
          difficulty: "beginner",
          tags: ["events", "addEventListener", "click"],
          descStarter: "Handling user interactions with addEventListener. Click, submit, and other DOM events."
        },
        {
          name: "Event Delegation",
          category: "Events",
          difficulty: "intermediate",
          tags: ["event-delegation", "bubbling"],
          descStarter: "Efficient event handling using event delegation. Understanding event bubbling and capturing."
        },
        {
          name: "Form Handling",
          category: "Events",
          difficulty: "intermediate",
          tags: ["forms", "submit", "validation"],
          descStarter: "Processing form submissions with JavaScript. Form validation and preventing default behavior."
        },
        {
          name: "Promises",
          category: "Async Programming",
          difficulty: "intermediate",
          tags: ["promises", "then", "catch"],
          descStarter: "Asynchronous code with Promises. Chaining then() and handling errors with catch()."
        },
        {
          name: "Async/Await",
          category: "Async Programming",
          difficulty: "intermediate",
          tags: ["async-await", "promises"],
          descStarter: "Modern async syntax with async/await. Writing asynchronous code that looks synchronous."
        },
        {
          name: "Fetch API",
          category: "APIs",
          difficulty: "intermediate",
          tags: ["fetch", "rest-api", "json"],
          descStarter: "Making HTTP requests with the Fetch API. GET, POST requests and handling JSON responses."
        },
        {
          name: "Template Literals",
          category: "ES6+",
          difficulty: "beginner",
          tags: ["template-literals", "es6"],
          descStarter: "String interpolation using template literals (backticks). Multi-line strings and embedded expressions."
        },
        {
          name: "ES6 Classes",
          category: "ES6+",
          difficulty: "intermediate",
          tags: ["classes", "oop", "es6"],
          descStarter: "Object-oriented programming with ES6 class syntax. Constructor, methods, and inheritance."
        }
      ],
      defaultDifficulty: "beginner"
    },

    Java: {
      folder: "java",
      extension: ".java",
      categories: [
        "Basics",
        "Control Flow",
        "OOP",
        "Collections",
        "Exception Handling",
        "File I/O",
        "Multithreading",
        "Generics",
        "Streams",
        "Custom"
      ],
      tags: [
        "hello-world", "variables", "data-types", "operators", "if-else",
        "switch", "for-loop", "while-loop", "classes", "objects", "inheritance",
        "polymorphism", "encapsulation", "abstraction", "interfaces",
        "arraylist", "hashmap", "hashset", "collections", "try-catch",
        "exceptions", "throws", "file-io", "streams", "serialization",
        "threads", "runnable", "synchronized", "generics", "lambda", "stream-api"
      ],
      topicTemplates: [
        {
          name: "Hello World",
          category: "Basics",
          difficulty: "beginner",
          tags: ["hello-world", "main"],
          descStarter: "First Java program with main method. Understanding class structure and System.out.println()."
        },
        {
          name: "Variables & Types",
          category: "Basics",
          difficulty: "beginner",
          tags: ["variables", "data-types"],
          descStarter: "Variables and primitive data types in Java: int, double, char, boolean, etc."
        },
        {
          name: "If-Else Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["if-else", "conditional"],
          descStarter: "Conditional statements in Java using if, else if, and else."
        },
        {
          name: "For Loop",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["for-loop", "iteration"],
          descStarter: "Using for loops in Java. Traditional and enhanced for-each loops."
        },
        {
          name: "Switch Statement",
          category: "Control Flow",
          difficulty: "beginner",
          tags: ["switch", "case"],
          descStarter: "Multi-way branching with switch statements in Java."
        },
        {
          name: "Classes & Objects",
          category: "OOP",
          difficulty: "beginner",
          tags: ["classes", "objects", "oop"],
          descStarter: "Object-oriented programming basics. Creating classes, objects, and understanding constructors."
        },
        {
          name: "Inheritance",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["inheritance", "extends"],
          descStarter: "Class inheritance using extends keyword. Parent-child relationships and method overriding."
        },
        {
          name: "Interfaces",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["interfaces", "implements"],
          descStarter: "Defining and implementing interfaces. Multiple inheritance through interfaces."
        },
        {
          name: "Polymorphism",
          category: "OOP",
          difficulty: "intermediate",
          tags: ["polymorphism", "overriding", "overloading"],
          descStarter: "Method overloading and overriding. Compile-time and runtime polymorphism."
        },
        {
          name: "ArrayList",
          category: "Collections",
          difficulty: "beginner",
          tags: ["arraylist", "collections"],
          descStarter: "Dynamic arrays with ArrayList. Adding, removing, and iterating over elements."
        },
        {
          name: "HashMap",
          category: "Collections",
          difficulty: "intermediate",
          tags: ["hashmap", "key-value"],
          descStarter: "Key-value storage with HashMap. Put, get, and iterate over map entries."
        },
        {
          name: "HashSet",
          category: "Collections",
          difficulty: "intermediate",
          tags: ["hashset", "collections"],
          descStarter: "Unique element storage with HashSet. Set operations and uniqueness constraints."
        },
        {
          name: "Exception Handling",
          category: "Exception Handling",
          difficulty: "beginner",
          tags: ["try-catch", "exceptions"],
          descStarter: "Handling exceptions with try-catch blocks. Exception hierarchy and error recovery."
        },
        {
          name: "File Reading",
          category: "File I/O",
          difficulty: "intermediate",
          tags: ["file-io", "streams"],
          descStarter: "Reading from files using FileReader, BufferedReader, and Scanner."
        },
        {
          name: "File Writing",
          category: "File I/O",
          difficulty: "intermediate",
          tags: ["file-io", "streams"],
          descStarter: "Writing to files using FileWriter and BufferedWriter."
        },
        {
          name: "Threads Basics",
          category: "Multithreading",
          difficulty: "intermediate",
          tags: ["threads", "runnable"],
          descStarter: "Creating and running threads. Implementing Runnable interface and extending Thread class."
        },
        {
          name: "Generics",
          category: "Generics",
          difficulty: "intermediate",
          tags: ["generics", "type-safety"],
          descStarter: "Type-safe programming with generics. Generic classes and methods."
        },
        {
          name: "Lambda Expressions",
          category: "Streams",
          difficulty: "intermediate",
          tags: ["lambda", "functional"],
          descStarter: "Functional programming with lambda expressions. Concise syntax for functional interfaces."
        },
        {
          name: "Stream API",
          category: "Streams",
          difficulty: "intermediate",
          tags: ["stream-api", "functional"],
          descStarter: "Processing collections with Stream API. Filter, map, reduce operations."
        }
      ],
      defaultDifficulty: "beginner"
    },

    SQL: {
      folder: "sql",
      extension: ".sql",
      categories: [
        "Basics",
        "Queries",
        "Joins",
        "Aggregate Functions",
        "Subqueries",
        "Database Design",
        "Indexes & Optimization",
        "Views & Triggers",
        "Custom"
      ],
      tags: [
        "select", "where", "order-by", "group-by", "having", "inner-join",
        "left-join", "right-join", "full-join", "count", "sum", "avg", "min",
        "max", "subquery", "nested-query", "create", "insert", "update",
        "delete", "primary-key", "foreign-key", "normalization", "index",
        "performance", "optimization", "views", "triggers", "stored-procedures"
      ],
      topicTemplates: [
        {
          name: "SELECT Statement",
          category: "Basics",
          difficulty: "beginner",
          tags: ["select", "queries"],
          descStarter: "Basic data retrieval using SELECT statement. Selecting columns from tables."
        },
        {
          name: "WHERE Clause",
          category: "Basics",
          difficulty: "beginner",
          tags: ["where", "filter"],
          descStarter: "Filtering query results using WHERE clause. Conditional data retrieval."
        },
        {
          name: "ORDER BY",
          category: "Basics",
          difficulty: "beginner",
          tags: ["order-by", "sorting"],
          descStarter: "Sorting query results with ORDER BY. Ascending and descending order."
        },
        {
          name: "DISTINCT Keyword",
          category: "Basics",
          difficulty: "beginner",
          tags: ["distinct", "unique"],
          descStarter: "Retrieving unique values using DISTINCT keyword. Removing duplicate rows."
        },
        {
          name: "INNER JOIN",
          category: "Joins",
          difficulty: "intermediate",
          tags: ["inner-join", "joins"],
          descStarter: "Combining tables with INNER JOIN. Matching rows from multiple tables."
        },
        {
          name: "LEFT JOIN",
          category: "Joins",
          difficulty: "intermediate",
          tags: ["left-join", "joins"],
          descStarter: "Left outer join to include all rows from left table. Handling unmatched rows."
        },
        {
          name: "Multiple Joins",
          category: "Joins",
          difficulty: "intermediate",
          tags: ["joins", "multiple-tables"],
          descStarter: "Joining more than two tables. Complex queries with multiple join conditions."
        },
        {
          name: "GROUP BY & Aggregates",
          category: "Aggregate Functions",
          difficulty: "intermediate",
          tags: ["group-by", "count", "sum"],
          descStarter: "Grouping data with GROUP BY and using aggregate functions: COUNT, SUM, AVG, MIN, MAX."
        },
        {
          name: "HAVING Clause",
          category: "Aggregate Functions",
          difficulty: "intermediate",
          tags: ["having", "group-by"],
          descStarter: "Filtering grouped results with HAVING clause. Difference between WHERE and HAVING."
        },
        {
          name: "Subqueries",
          category: "Subqueries",
          difficulty: "intermediate",
          tags: ["subquery", "nested-query"],
          descStarter: "Queries within queries (subqueries). Using SELECT statements inside WHERE clause."
        },
        {
          name: "CREATE TABLE",
          category: "Database Design",
          difficulty: "beginner",
          tags: ["create", "table", "schema"],
          descStarter: "Creating database tables with CREATE TABLE statement. Defining columns and data types."
        },
        {
          name: "INSERT INTO",
          category: "Basics",
          difficulty: "beginner",
          tags: ["insert", "data"],
          descStarter: "Inserting data into tables using INSERT INTO statement."
        },
        {
          name: "UPDATE Statement",
          category: "Basics",
          difficulty: "beginner",
          tags: ["update", "modify"],
          descStarter: "Modifying existing data with UPDATE statement. Using WHERE to target specific rows."
        },
        {
          name: "DELETE Statement",
          category: "Basics",
          difficulty: "beginner",
          tags: ["delete", "remove"],
          descStarter: "Removing data from tables using DELETE statement. Careful with WHERE clause."
        },
        {
          name: "Primary & Foreign Keys",
          category: "Database Design",
          difficulty: "intermediate",
          tags: ["primary-key", "foreign-key"],
          descStarter: "Defining table relationships with primary and foreign keys. Referential integrity."
        },
        {
          name: "Indexes",
          category: "Indexes & Optimization",
          difficulty: "intermediate",
          tags: ["index", "performance"],
          descStarter: "Creating indexes to improve query performance. When and how to use indexes."
        },
        {
          name: "Views",
          category: "Views & Triggers",
          difficulty: "intermediate",
          tags: ["views", "virtual-table"],
          descStarter: "Creating virtual tables with views. Simplifying complex queries and providing abstraction."
        }
      ],
      defaultDifficulty: "beginner"
    },

    "HTML/CSS": {
      folder: "html-css",
      extension: ".html",
      categories: [
        "HTML Basics",
        "Forms",
        "Semantic HTML",
        "CSS Basics",
        "Layout",
        "Responsive Design",
        "Flexbox",
        "Grid",
        "Animations",
        "Accessibility",
        "Custom"
      ],
      tags: [
        "html", "tags", "elements", "attributes", "headings", "paragraphs",
        "links", "images", "lists", "tables", "forms", "input", "button",
        "semantic", "header", "footer", "nav", "section", "css", "selectors",
        "properties", "colors", "box-model", "margin", "padding", "border",
        "flexbox", "grid", "layout", "positioning", "responsive",
        "media-queries", "mobile-first", "animations", "transitions",
        "transforms", "pseudo-classes", "pseudo-elements"
      ],
      topicTemplates: [
        {
          name: "Basic HTML Structure",
          category: "HTML Basics",
          difficulty: "beginner",
          tags: ["html", "structure"],
          descStarter: "Essential HTML document structure with doctype, html, head, and body tags."
        },
        {
          name: "Headings & Paragraphs",
          category: "HTML Basics",
          difficulty: "beginner",
          tags: ["headings", "paragraphs"],
          descStarter: "Text formatting with h1-h6 headings and paragraph tags. Text hierarchy."
        },
        {
          name: "Links & Images",
          category: "HTML Basics",
          difficulty: "beginner",
          tags: ["links", "images"],
          descStarter: "Adding hyperlinks with anchor tags and embedding images. Href and src attributes."
        },
        {
          name: "Lists (Ordered & Unordered)",
          category: "HTML Basics",
          difficulty: "beginner",
          tags: ["lists", "ul", "ol"],
          descStarter: "Creating bullet lists (ul) and numbered lists (ol). List items and nesting."
        },
        {
          name: "HTML Forms",
          category: "Forms",
          difficulty: "beginner",
          tags: ["forms", "input", "button"],
          descStarter: "Creating user input forms with input fields, labels, and submit buttons."
        },
        {
          name: "Form Input Types",
          category: "Forms",
          difficulty: "beginner",
          tags: ["input", "text", "email", "password"],
          descStarter: "Different input types: text, email, password, number, checkbox, radio, etc."
        },
        {
          name: "Semantic HTML",
          category: "Semantic HTML",
          difficulty: "intermediate",
          tags: ["semantic", "header", "footer", "nav"],
          descStarter: "Using semantic elements for better structure: header, nav, main, section, article, footer."
        },
        {
          name: "Tables",
          category: "HTML Basics",
          difficulty: "beginner",
          tags: ["tables", "tr", "td"],
          descStarter: "Creating data tables with table, thead, tbody, tr, th, and td elements."
        },
        {
          name: "CSS Selectors",
          category: "CSS Basics",
          difficulty: "beginner",
          tags: ["css", "selectors"],
          descStarter: "Targeting HTML elements with CSS selectors: element, class, id, and attribute selectors."
        },
        {
          name: "Colors & Backgrounds",
          category: "CSS Basics",
          difficulty: "beginner",
          tags: ["colors", "background"],
          descStarter: "Applying colors and backgrounds. Color values: hex, rgb, rgba, named colors."
        },
        {
          name: "Box Model",
          category: "CSS Basics",
          difficulty: "beginner",
          tags: ["box-model", "margin", "padding"],
          descStarter: "Understanding the CSS box model: content, padding, border, and margin."
        },
        {
          name: "Typography",
          category: "CSS Basics",
          difficulty: "beginner",
          tags: ["typography", "font"],
          descStarter: "Styling text with font-family, font-size, font-weight, line-height, and text properties."
        },
        {
          name: "Flexbox Layout",
          category: "Flexbox",
          difficulty: "intermediate",
          tags: ["flexbox", "layout"],
          descStarter: "Creating flexible layouts with Flexbox. Flex container and flex items properties."
        },
        {
          name: "Flexbox Alignment",
          category: "Flexbox",
          difficulty: "intermediate",
          tags: ["flexbox", "align", "justify"],
          descStarter: "Aligning and justifying content with Flexbox. justify-content, align-items, align-self."
        },
        {
          name: "CSS Grid",
          category: "Grid",
          difficulty: "intermediate",
          tags: ["grid", "layout"],
          descStarter: "Two-dimensional layouts with CSS Grid. Grid container, rows, columns, and areas."
        },
        {
          name: "Grid Template Areas",
          category: "Grid",
          difficulty: "intermediate",
          tags: ["grid", "template-areas"],
          descStarter: "Named grid areas for intuitive layout design. Creating complex grid structures."
        },
        {
          name: "Media Queries",
          category: "Responsive Design",
          difficulty: "intermediate",
          tags: ["media-queries", "responsive"],
          descStarter: "Responsive design with media queries. Adapting layouts for different screen sizes."
        },
        {
          name: "Mobile-First Design",
          category: "Responsive Design",
          difficulty: "intermediate",
          tags: ["mobile-first", "responsive"],
          descStarter: "Building mobile-first responsive websites. Progressive enhancement approach."
        },
        {
          name: "CSS Transitions",
          category: "Animations",
          difficulty: "intermediate",
          tags: ["transitions", "animations"],
          descStarter: "Smooth property changes with CSS transitions. Transition duration, timing, and delay."
        },
        {
          name: "CSS Animations",
          category: "Animations",
          difficulty: "intermediate",
          tags: ["animations", "keyframes"],
          descStarter: "Creating animations with @keyframes. Animation properties and sequencing."
        },
        {
          name: "Positioning",
          category: "Layout",
          difficulty: "intermediate",
          tags: ["positioning", "absolute", "relative"],
          descStarter: "CSS positioning: static, relative, absolute, fixed, and sticky. Understanding context."
        },
        {
          name: "Pseudo-classes & Pseudo-elements",
          category: "CSS Basics",
          difficulty: "intermediate",
          tags: ["pseudo-classes", "pseudo-elements"],
          descStarter: "Styling with :hover, :focus, :nth-child, ::before, ::after, and other pseudo-selectors."
        }
      ],
      defaultDifficulty: "beginner"
    }
  };

  /* ============================================
     STATE MANAGEMENT
     ============================================ */

  const state = {
    selectedLang: "C",
    selectedTemplate: null,
    selectedTags: new Set(),
    customTags: [],
    detectedFile: null,
    savedIndex: null,
    currentDescStarter: "",
    idTouched: false
  };

  /* ============================================
     LOCALSTORAGE KEYS
     ============================================ */

  const LS_KEYS = {
    INDEX: "arcIndexJson",
    DRAFT: "arcFormDraft",
    CUSTOM_TAGS: "arcCustomTags",
    THEME: "theme"
  };

  /* ============================================
     UTILITY FUNCTIONS
     ============================================ */

  const utils = {
    slugify(str) {
      return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },

    nowISO() {
      return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    },

    todayDate() {
      return utils.nowISO().slice(0, 10);
    },

    escapeHTML(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    },

    detectLanguageFromExtension(filename) {
      const ext = filename.split(".").pop().toLowerCase();
      const extMap = {
        c: "C",
        h: "C",
        py: "Python",
        js: "JavaScript",
        jsx: "JavaScript",
        ts: "JavaScript",
        tsx: "JavaScript",
        java: "Java",
        sql: "SQL",
        html: "HTML/CSS",
        css: "HTML/CSS"
      };
      return extMap[ext] || null;
    },

    saveToLS(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn("localStorage save failed:", e);
      }
    },

    loadFromLS(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        console.warn("localStorage load failed:", e);
        return null;
      }
    },

    removeFromLS(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn("localStorage remove failed:", e);
      }
    }
  };

  /* ============================================
     DOM REFERENCES
     ============================================ */

  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => document.querySelectorAll(selector);

  const DOM = {
    // File Detection
    dropZone: $("dropZone"),
    fileInput: $("fileInput"),
    detectedInfo: $("detectedInfo"),
    detectedLang: $("detectedLang"),
    detectedFile: $("detectedFile"),
    clearDetection: $("clearDetection"),

    // Form Fields
    langSelect: $("langSelect"),
    topicTemplates: $("topicTemplates"),
    topicTitle: $("topicTitle"),
    topicCategory: $("topicCategory"),
    topicDifficulty: $("topicDifficulty"),
    topicId: $("topicId"),
    topicDesc: $("topicDesc"),
    whatLearned: $("whatLearned"),
    challenges: $("challenges"),
    nextSteps: $("nextSteps"),

    // Tags
    tagSuggestions: $("tagSuggestions"),
    selectedTags: $("selectedTags"),
    customTags: $("customTags"),

    // Description
    descActions: $("descActions"),
    useDescStarter: $("useDescStarter"),

    // Files
    fileRows: $("fileRows"),
    addFileBtn: $("addFileBtn"),

    // Errors
    titleError: $("titleError"),
    descError: $("descError"),

    // Actions
    generateBtn: $("generateBtn"),
    loadSampleBtn: $("loadSampleBtn"),
    clearFormBtn: $("clearFormBtn"),

    // Index Manager
    indexFile: $("indexFile"),
    indexStatusPill: $("indexStatusPill"),
    indexStatusText: $("indexStatusText"),
    indexPasteToggle: $("indexPasteToggle"),
    indexPasteBox: $("indexPasteBox"),
    indexPasteArea: $("indexPasteArea"),
    indexPasteLoad: $("indexPasteLoad"),
    indexRemoveBtn: $("indexRemoveBtn"),

    // Outputs
    topicOutput: $("topicOutput"),
    indexOutput: $("indexOutput"),
    indexOutputTitle: $("indexOutputTitle"),
    indexOutputHint: $("indexOutputHint"),
    downloadIndexBtn: $("downloadIndexBtn"),

    // Copy/Download
    copyTopicBtn: $("copyTopicBtn"),
    downloadTopicBtn: $("downloadTopicBtn"),
    copyIndexBtn: $("copyIndexBtn"),

    // Theme
    themeToggle: $("themeToggle")
  };

  /* ============================================
     FILE AUTO-DETECTION
     ============================================ */

  function handleFileDetection(file) {
    const lang = utils.detectLanguageFromExtension(file.name);
    
    if (!lang) {
      alert("Could not detect language from file extension. Supported: .c, .py, .js, .java, .sql, .html, .css");
      return;
    }

    state.detectedFile = file;
    state.selectedLang = lang;

    // Update UI
    DOM.langSelect.value = lang;
    DOM.detectedLang.textContent = lang;
    DOM.detectedFile.textContent = file.name;
    DOM.detectedInfo.classList.remove("hidden");

    // Trigger language change
    handleLanguageChange();

    // Auto-fill first file row
    const firstFileRow = DOM.fileRows.querySelector(".file-row-builder");
    if (firstFileRow) {
      const config = LANG_CONFIG[lang];
      const nameInput = firstFileRow.querySelector(".f-name");
      const pathInput = firstFileRow.querySelector(".f-path");
      
      nameInput.value = file.name;
      pathInput.value = `content/${config.folder}/${file.name}`;
    }
  }

  // Drag & Drop
  DOM.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    DOM.dropZone.classList.add("dragover");
  });

  DOM.dropZone.addEventListener("dragleave", () => {
    DOM.dropZone.classList.remove("dragover");
  });

  DOM.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    DOM.dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) handleFileDetection(file);
  });

  // File Input
  DOM.fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleFileDetection(file);
    e.target.value = "";
  });

  // Clear Detection
  DOM.clearDetection.addEventListener("click", () => {
    state.detectedFile = null;
    DOM.detectedInfo.classList.add("hidden");
  });

  /* ============================================
     LANGUAGE CHANGE HANDLER
     ============================================ */

  function handleLanguageChange() {
    const lang = DOM.langSelect.value;
    state.selectedLang = lang;
    const config = LANG_CONFIG[lang];

    // Update categories
    DOM.topicCategory.innerHTML = config.categories
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join("");

    // Update difficulty default
    DOM.topicDifficulty.value = config.defaultDifficulty;

    // Render topic templates
    renderTopicTemplates();

    // Render tag suggestions
    renderTagSuggestions();

    // Update topic ID if not manually touched
    updateTopicId();
  }

  DOM.langSelect.addEventListener("change", handleLanguageChange);

  /* ============================================
     TOPIC TEMPLATES
     ============================================ */

  function renderTopicTemplates() {
    const config = LANG_CONFIG[state.selectedLang];
    const html = config.topicTemplates
      .map((tpl, idx) => `
        <div class="topic-chip" data-index="${idx}">
          <span class="topic-chip-icon">📄</span>
          ${utils.escapeHTML(tpl.name)}
        </div>
      `)
      .join("");

    DOM.topicTemplates.innerHTML = html;

    // Add click handlers
    $$(".topic-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const idx = parseInt(chip.dataset.index);
        selectTopicTemplate(idx);
      });
    });
  }

  function selectTopicTemplate(index) {
    const config = LANG_CONFIG[state.selectedLang];
    const tpl = config.topicTemplates[index];

    // Update active state
    $$(".topic-chip").forEach((chip, i) => {
      chip.classList.toggle("active", i === index);
    });

    state.selectedTemplate = tpl;

    // Auto-fill form (but allow editing)
    DOM.topicTitle.value = `${tpl.name} in ${state.selectedLang}`;
    DOM.topicCategory.value = tpl.category;
    DOM.topicDifficulty.value = tpl.difficulty;

    // Pre-select tags
    state.selectedTags.clear();
    tpl.tags.forEach((tag) => state.selectedTags.add(tag));
    renderSelectedTags();
    updateTagPillsState();

    // Show description starter
    state.currentDescStarter = tpl.descStarter;
    DOM.useDescStarter.classList.remove("hidden");

    // Update ID
    state.idTouched = false;
    updateTopicId();
  }

  DOM.useDescStarter.addEventListener("click", () => {
    DOM.topicDesc.value = state.currentDescStarter;
    DOM.useDescStarter.classList.add("hidden");
  });

  /* ============================================
     TAG SYSTEM
     ============================================ */

  function renderTagSuggestions() {
    const config = LANG_CONFIG[state.selectedLang];
    const html = config.tags
      .map((tag) => `
        <div class="tag-pill" data-tag="${tag}">
          ${utils.escapeHTML(tag)}
        </div>
      `)
      .join("");

    DOM.tagSuggestions.innerHTML = html;

    // Add click handlers
    $$(".tag-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const tag = pill.dataset.tag;
        toggleTag(tag);
      });
    });

    updateTagPillsState();
  }

  function toggleTag(tag) {
    if (state.selectedTags.has(tag)) {
      state.selectedTags.delete(tag);
    } else {
      state.selectedTags.add(tag);
    }
    renderSelectedTags();
    updateTagPillsState();
  }

  function updateTagPillsState() {
    $$(".tag-pill").forEach((pill) => {
      const tag = pill.dataset.tag;
      pill.classList.toggle("selected", state.selectedTags.has(tag));
    });
  }

  function renderSelectedTags() {
    const allTags = [
      ...Array.from(state.selectedTags),
      ...state.customTags
    ];

    if (allTags.length === 0) {
      DOM.selectedTags.innerHTML = '<span class="no-tags-msg">No tags selected</span>';
      return;
    }

    const html = allTags.map((tag, idx) => {
      const isCustom = state.customTags.includes(tag);
      return `
        <div class="selected-tag-item ${isCustom ? 'custom' : ''}" data-tag="${tag}">
          ${utils.escapeHTML(tag)}
          <button class="selected-tag-remove" data-tag="${tag}" type="button">×</button>
        </div>
      `;
    }).join("");

    DOM.selectedTags.innerHTML = html;

    // Add remove handlers
    $$(".selected-tag-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = btn.dataset.tag;
        removeTag(tag);
      });
    });
  }

  function removeTag(tag) {
    state.selectedTags.delete(tag);
    state.customTags = state.customTags.filter((t) => t !== tag);
    renderSelectedTags();
    updateTagPillsState();
  }

  // Custom tags input
  DOM.customTags.addEventListener("change", () => {
    const input = DOM.customTags.value.trim();
    if (!input) return;

    const tags = input
      .split(",")
      .map((t) => utils.slugify(t))
      .filter(Boolean);

    tags.forEach((tag) => {
      if (!state.selectedTags.has(tag) && !state.customTags.includes(tag)) {
        state.customTags.push(tag);
      }
    });

    DOM.customTags.value = "";
    renderSelectedTags();
  });

  /* ============================================
     AUTO TOPIC ID
     ============================================ */

  function updateTopicId() {
    if (state.idTouched) return;

    const title = DOM.topicTitle.value.trim();
    if (!title) {
      DOM.topicId.value = "";
      return;
    }

    const langPrefix = {
      C: "c",
      Python: "python",
      JavaScript: "js",
      Java: "java",
      SQL: "sql",
      "HTML/CSS": "web"
    }[state.selectedLang] || "misc";

    const slug = utils.slugify(title);
    DOM.topicId.value = slug ? `${langPrefix}-${slug}` : "";
  }

  DOM.topicTitle.addEventListener("input", updateTopicId);
  DOM.topicId.addEventListener("input", () => {
    state.idTouched = DOM.topicId.value.trim() !== "";
  });

  /* ============================================
     FILE ROWS
     ============================================ */

  function addFileRow(data = {}) {
    const row = document.createElement("div");
    row.className = "file-row-builder";
    
    const config = LANG_CONFIG[state.selectedLang];
    const defaultPath = `content/${config.folder}/`;

    row.innerHTML = `
      <button class="remove-file" title="Remove file" type="button">×</button>
      <div class="file-row-grid">
        <div class="form-group" style="margin-bottom:10px">
          <label>File Name</label>
          <input class="form-control f-name" placeholder="example${config.extension}" value="${data.name || ''}">
        </div>
        <div class="form-group" style="margin-bottom:10px">
          <label>File Path</label>
          <input class="form-control f-path" placeholder="${defaultPath}example${config.extension}" value="${data.path || ''}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:10px">
        <label>Description</label>
        <input class="form-control f-desc" placeholder="What does this file demonstrate?" value="${data.desc || ''}">
      </div>
      <div class="file-row-grid">
        <div class="form-group" style="margin-bottom:0">
          <label>Lines (optional)</label>
          <input class="form-control f-lines" type="number" min="0" value="${data.lines || ''}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label>Size (optional)</label>
          <input class="form-control f-size" placeholder="1.2KB" value="${data.size || ''}">
        </div>
      </div>
    `;

    // Remove button
    row.querySelector(".remove-file").addEventListener("click", () => row.remove());

    // Auto-fill path when name changes
    const nameInput = row.querySelector(".f-name");
    const pathInput = row.querySelector(".f-path");
    let pathTouched = !!data.path;

    nameInput.addEventListener("input", () => {
      if (pathTouched) return;
      const name = nameInput.value.trim();
      if (name) {
        const ext = config.extension;
        const fileName = name.endsWith(ext) ? name : name + ext;
        pathInput.value = `${defaultPath}${fileName}`;
      }
    });

    pathInput.addEventListener("input", () => {
      pathTouched = pathInput.value.trim() !== "";
    });

    DOM.fileRows.appendChild(row);
  }

  DOM.addFileBtn.addEventListener("click", () => addFileRow());

  function collectFiles() {
    return Array.from($$(".file-row-builder"))
      .map((row, i) => {
        const name = row.querySelector(".f-name").value.trim();
        const path = row.querySelector(".f-path").value.trim();
        if (!name && !path) return null;

        const config = LANG_CONFIG[state.selectedLang];
        const entry = {
          id: "file-" + String(i + 1).padStart(3, "0"),
          fileName: name || path.split("/").pop(),
          filePath: path || `content/${config.folder}/${name}`,
          description: row.querySelector(".f-desc").value.trim(),
          dateAdded: utils.nowISO()
        };

        const lines = row.querySelector(".f-lines").value;
        if (lines) entry.lines = parseInt(lines, 10);

        const size = row.querySelector(".f-size").value.trim();
        if (size) entry.size = size;

        return entry;
      })
      .filter(Boolean);
  }

  /* ============================================
     FORM VALIDATION
     ============================================ */

  function validateForm() {
    let isValid = true;

    // Title
    if (!DOM.topicTitle.value.trim()) {
      DOM.titleError.textContent = "Topic title is required";
      DOM.titleError.classList.remove("hidden");
      DOM.topicTitle.classList.add("error");
      isValid = false;
    } else {
      DOM.titleError.classList.add("hidden");
      DOM.topicTitle.classList.remove("error");
    }

    // Description
    if (!DOM.topicDesc.value.trim()) {
      DOM.descError.textContent = "Description is required";
      DOM.descError.classList.remove("hidden");
      DOM.topicDesc.classList.add("error");
      isValid = false;
    } else {
      DOM.descError.classList.add("hidden");
      DOM.topicDesc.classList.remove("error");
    }

    // Files
    const files = collectFiles();
    if (files.length === 0) {
      alert("Please add at least one file.");
      isValid = false;
    }

    return isValid;
  }

  /* ============================================
     JSON GENERATION
     ============================================ */

  function generateJSON() {
    if (!validateForm()) return;

    const config = LANG_CONFIG[state.selectedLang];
    const title = DOM.topicTitle.value.trim();
    const id = DOM.topicId.value.trim() || utils.slugify(`${state.selectedLang}-${title}`);
    const files = collectFiles();
    const allTags = [...Array.from(state.selectedTags), ...state.customTags];

    // Topic JSON
    const topicJSON = {
      topic: {
        id,
        title,
        language: state.selectedLang,
        category: DOM.topicCategory.value,
        difficulty: DOM.topicDifficulty.value,
        dateCreated: utils.nowISO(),
        lastUpdated: utils.nowISO(),
        tags: allTags,
        description: DOM.topicDesc.value.trim(),
        learningNotes: {
          whatILearned: DOM.whatLearned.value.trim(),
          challenges: DOM.challenges.value.trim(),
          nextSteps: DOM.nextSteps.value.trim()
        }
      },
      files
    };

    // Index Entry
    const indexEntry = {
      id,
      title,
      language: state.selectedLang,
      dateCreated: utils.todayDate(),
      lastUpdated: utils.todayDate(),
      fileCount: files.length,
      tags: allTags,
      description: DOM.topicDesc.value.trim().slice(0, 220),
      topicFile: `data/topics/${config.folder}/${utils.slugify(title.split(" in ")[0]) || utils.slugify(title)}.json`
    };

    // Output topic JSON
    DOM.topicOutput.value = JSON.stringify(topicJSON, null, 2);

    // Handle index output
    if (state.savedIndex) {
      // Full rewrite
      const existingIdx = state.savedIndex.topics.findIndex((t) => t.id === id);
      if (existingIdx !== -1) {
        const ok = confirm(`Topic "${id}" already exists.\n\nOK = replace\nCancel = abort`);
        if (!ok) return;
        state.savedIndex.topics.splice(existingIdx, 1);
      }

      const updated = JSON.parse(JSON.stringify(state.savedIndex));
      updated.topics = [indexEntry, ...updated.topics];
      updated.metadata.totalTopics = updated.topics.length;
      updated.metadata.totalFiles = updated.topics.reduce((s, t) => s + (t.fileCount || 0), 0);
      updated.metadata.lastUpdated = utils.nowISO();

      if (!Array.isArray(updated.metadata.languages)) updated.metadata.languages = [];
      if (!updated.metadata.languages.includes(state.selectedLang)) {
        updated.metadata.languages.push(state.selectedLang);
      }

      if (!updated.metadata.firstEntryDate) {
        updated.metadata.firstEntryDate = indexEntry.dateCreated;
      }

      state.savedIndex = updated;
      utils.saveToLS(LS_KEYS.INDEX, updated);
      renderIndexStatus();

      DOM.indexOutput.value = JSON.stringify(updated, null, 2);
      DOM.indexOutputTitle.textContent = "2 · Complete index.json (updated)";
      DOM.indexOutputHint.innerHTML = `Your <b>full rewritten index.json</b> — download and replace <code>data/index.json</code>`;
      DOM.downloadIndexBtn.classList.remove("hidden");
    } else {
      // Snippet only
      DOM.indexOutput.value = JSON.stringify(indexEntry, null, 2);
      DOM.indexOutputTitle.textContent = "2 · index.json Entry";
      DOM.indexOutputHint.innerHTML = `Paste this inside <code>"topics": []</code> array, then update metadata manually. <b>Tip:</b> Upload your index.json to get automatic rewrites.`;
      DOM.downloadIndexBtn.classList.add("hidden");
    }

    // Show success feedback
    const btnText = DOM.generateBtn.querySelector(".btn-text");
    const btnLoader = DOM.generateBtn.querySelector(".btn-loader");
    btnText.classList.add("hidden");
    btnLoader.classList.remove("hidden");
    
    setTimeout(() => {
      btnText.classList.remove("hidden");
      btnLoader.classList.add("hidden");
    }, 800);
  }

  DOM.generateBtn.addEventListener("click", generateJSON);

  /* ============================================
     INDEX.JSON MANAGER
     ============================================ */

  function adoptIndex(parsed) {
    if (!parsed || !parsed.topics || !Array.isArray(parsed.topics)) {
      throw new Error('Invalid index.json structure (missing "topics" array)');
    }
    if (!parsed.metadata || typeof parsed.metadata !== "object") {
      parsed.metadata = {};
    }
    state.savedIndex = parsed;
    utils.saveToLS(LS_KEYS.INDEX, parsed);
    renderIndexStatus();
  }

  function renderIndexStatus() {
    if (state.savedIndex) {
      const m = state.savedIndex.metadata || {};
      const n = state.savedIndex.topics.length;
      const files = m.totalFiles || "?";
      DOM.indexStatusPill.textContent = "Loaded ✓";
      DOM.indexStatusPill.classList.add("loaded");
      DOM.indexStatusText.innerHTML = `Storing <b>${n}</b> topic${n === 1 ? "" : "s"} · ${files} files · last updated <code>${utils.escapeHTML(m.lastUpdated || "—")}</code>`;
      DOM.indexRemoveBtn.classList.remove("hidden");
    } else {
      DOM.indexStatusPill.textContent = "Not loaded";
      DOM.indexStatusPill.classList.remove("loaded");
      DOM.indexStatusText.innerHTML = `Upload your <code>data/index.json</code> once — it's stored in this browser and automatically updated on each generation.`;
      DOM.indexRemoveBtn.classList.add("hidden");
    }
  }

  DOM.indexFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        adoptIndex(JSON.parse(reader.result));
      } catch (err) {
        alert("Failed to load index.json: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  DOM.indexPasteToggle.addEventListener("click", () => {
    DOM.indexPasteBox.classList.toggle("hidden");
  });

  DOM.indexPasteLoad.addEventListener("click", () => {
    const raw = DOM.indexPasteArea.value.trim();
    if (!raw) {
      alert("Paste your index.json first.");
      return;
    }
    try {
      adoptIndex(JSON.parse(raw));
      DOM.indexPasteBox.classList.add("hidden");
      DOM.indexPasteArea.value = "";
    } catch (err) {
      alert("Failed to parse: " + err.message);
    }
  });

  DOM.indexRemoveBtn.addEventListener("click", () => {
    if (!confirm("Remove stored index.json from browser?")) return;
    state.savedIndex = null;
    utils.removeFromLS(LS_KEYS.INDEX);
    renderIndexStatus();
  });

  DOM.downloadIndexBtn.addEventListener("click", () => {
    if (!state.savedIndex) return;
    const blob = new Blob([JSON.stringify(state.savedIndex, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });

  /* ============================================
     COPY / DOWNLOAD
     ============================================ */

  async function copyText(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = old;
      }, 1500);
    } catch (e) {
      alert("Copy failed. Please select and copy manually.");
    }
  }

  DOM.copyTopicBtn.addEventListener("click", () => {
    const text = DOM.topicOutput.value;
    if (!text) {
      alert("Generate JSON first.");
      return;
    }
    copyText(text, DOM.copyTopicBtn);
  });

  DOM.copyIndexBtn.addEventListener("click", () => {
    const text = DOM.indexOutput.value;
    if (!text) {
      alert("Generate JSON first.");
      return;
    }
    copyText(text, DOM.copyIndexBtn);
  });

  DOM.downloadTopicBtn.addEventListener("click", () => {
    const text = DOM.topicOutput.value;
    if (!text) {
      alert("Generate JSON first.");
      return;
    }
    const id = (DOM.topicId.value.trim() || "topic").replace(/[^a-z0-9-]/gi, "-");
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });

  /* ============================================
     SAMPLE DATA
     ============================================ */

  DOM.loadSampleBtn.addEventListener("click", () => {
    DOM.langSelect.value = "C";
    handleLanguageChange();
    
    // Select template
    selectTopicTemplate(3); // If-Else Statement
    
    // Customize
    DOM.topicDesc.value = "Understanding conditional execution in C using if-else statements. Covers basic decision making, nested conditions, and practical examples.";
    DOM.whatLearned.value = "How to use if-else for decision making. Learned about condition evaluation and code branching.";
    DOM.challenges.value = "Initially confused about nested if-else blocks. Solved by using proper indentation.";
    DOM.nextSteps.value = "Study switch statements and ternary operators for more efficient branching.";

    // Add files
    DOM.fileRows.innerHTML = "";
    addFileRow({
      name: "if-else-basic.c",
      path: "content/c/if-else-basic.c",
      desc: "Basic if-else examples with simple conditions",
      lines: 45,
      size: "1.1KB"
    });
    addFileRow({
      name: "if-else-nested.c",
      path: "content/c/if-else-nested.c",
      desc: "Nested if-else statements for complex decision trees",
      lines: 62,
      size: "1.5KB"
    });
  });

  /* ============================================
     CLEAR FORM
     ============================================ */

  DOM.clearFormBtn.addEventListener("click", () => {
    if (!confirm("Clear all form data?")) return;

    DOM.topicTitle.value = "";
    DOM.topicDesc.value = "";
    DOM.whatLearned.value = "";
    DOM.challenges.value = "";
    DOM.nextSteps.value = "";
    DOM.customTags.value = "";
    DOM.topicOutput.value = "";
    DOM.indexOutput.value = "";

    state.selectedTags.clear();
    state.customTags = [];
    state.selectedTemplate = null;
    state.currentDescStarter = "";
    state.idTouched = false;

    DOM.fileRows.innerHTML = "";
    addFileRow();

    renderSelectedTags();
    updateTagPillsState();
    $$(".topic-chip").forEach((c) => c.classList.remove("active"));
    DOM.useDescStarter.classList.add("hidden");
    updateTopicId();
  });

  /* ============================================
     THEME TOGGLE
     ============================================ */

  if (DOM.themeToggle) {
    const sunSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const syncTheme = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      DOM.themeToggle.innerHTML = isLight ? moonSVG : sunSVG;
    };

    DOM.themeToggle.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        utils.saveToLS(LS_KEYS.THEME, "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        utils.saveToLS(LS_KEYS.THEME, "light");
      }
      syncTheme();
    });

    syncTheme();
  }

  /* ============================================
     INITIALIZATION
     ============================================ */

  function init() {
    // Load saved index
    const savedIdx = utils.loadFromLS(LS_KEYS.INDEX);
    if (savedIdx) {
      try {
        adoptIndex(savedIdx);
      } catch (e) {
        console.warn("Failed to load saved index:", e);
      }
    }

    renderIndexStatus();

    // Initialize language
    handleLanguageChange();

    // Add initial file row
    addFileRow();
  }

  init();
})();
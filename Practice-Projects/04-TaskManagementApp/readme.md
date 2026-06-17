# Task Manager Application

## Overview

This project is a Task Manager Application built using HTML, CSS, and JavaScript. It allows users to create, update, delete, and manage tasks dynamically using DOM manipulation techniques. The project also demonstrates important JavaScript concepts such as DOM creation, custom attributes, event delegation, event propagation, and the browser rendering pipeline.

---

# Features

## Task Management

* Create new tasks
* Update existing tasks
* Delete tasks
* Change task status (Pending / Completed)
* Categorize tasks

## DOM Manipulation

* createElement()
* createTextNode()
* append()
* appendChild()

## Attribute Methods

* setAttribute()
* getAttribute()
* hasAttribute()
* removeAttribute()
* dataset

## Event Handling

* Event Delegation
* Event Bubbling
* Event Capturing

## JavaScript Concepts

* Attributes vs Properties
* Browser Rendering Pipeline

---

# DOM Methods Used

## createElement()

The createElement() method creates a new HTML element dynamically.

Example:

```javascript
const div = document.createElement("div");
```

---

## createTextNode()

The createTextNode() method creates a text node.

Example:

```javascript
const text = document.createTextNode("Task Title");
```

---

## append()

The append() method inserts nodes or text into an element.

Example:

```javascript
div.append(text);
```

---

# Attribute Methods

## setAttribute()

Used to create or update an attribute.

Example:

```javascript
button.setAttribute("id", "delete");
```

---

## getAttribute()

Used to retrieve the value of an attribute.

Example:

```javascript
button.getAttribute("id");
```

---

## hasAttribute()

Checks whether an attribute exists.

Example:

```javascript
button.hasAttribute("id");
```

Returns:

```javascript
true
```

or

```javascript
false
```

---

## removeAttribute()

Removes an attribute from an element.

Example:

```javascript
button.removeAttribute("id");
```

---

## dataset

Used to work with custom data attributes.

Example:

```javascript
card.dataset.id = 1;
card.dataset.status = "Pending";
```

Generated HTML:

```html
<div data-id="1" data-status="Pending"></div>
```

---

# Attributes vs Properties

Attributes are defined in HTML.

Properties are the current values maintained by the DOM.

Example:

```html
<input value="Original Value">
```

```javascript
input.getAttribute("value");
```

Output:

```javascript
Original Value
```

After changing input value:

```javascript
input.value = "New Value";
```

```javascript
input.getAttribute("value");
```

Output:

```javascript
Original Value
```

```javascript
input.value;
```

Output:

```javascript
New Value
```

### Difference

* Attributes represent the initial HTML values.
* Properties represent the current state of the element.

---

# Event Delegation

Event Delegation is a technique where a single event listener is attached to a parent element instead of multiple child elements.

Example:

```javascript
taskContainer.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
});
```

### Advantages

* Better performance
* Less memory usage
* Works for dynamically created elements

---

# Event Bubbling

Event Bubbling means an event starts from the target element and moves upward through its ancestors.

Example:

```javascript
child.addEventListener("click", () => {
  console.log("Child");
});

parent.addEventListener("click", () => {
  console.log("Parent");
});
```

Output:

```text
Child
Parent
```

---

# Event Capturing

Event Capturing is the opposite of bubbling. The event travels from parent to child.

Example:

```javascript
parent.addEventListener(
  "click",
  () => {
    console.log("Parent");
  },
  true
);
```

Output:

```text
Parent
Child
```

---

# Browser Rendering Pipeline

The browser follows several steps to render a webpage.

## 1. Parse HTML

HTML is converted into a DOM Tree.

```text
HTML
 ↓
DOM Tree
```

---

## 2. Parse CSS

CSS is converted into a CSSOM Tree.

```text
CSS
 ↓
CSSOM Tree
```

---

## 3. Create Render Tree

DOM and CSSOM are combined.

```text
DOM + CSSOM
 ↓
Render Tree
```

---

## 4. Layout

The browser calculates the position and size of each element.

```text
Render Tree
 ↓
Layout
```

---

## 5. Paint

Pixels are drawn on the screen.

```text
Layout
 ↓
Paint
```

---

## 6. Composite

Final layers are combined and displayed to the user.

```text
Paint
 ↓
Composite
 ↓
Screen
```

---

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)

---

# Learning Outcomes

Through this project, the following concepts were learned:

* DOM Manipulation
* Dynamic Element Creation
* Custom Data Attributes
* Event Delegation
* Event Bubbling
* Event Capturing
* Attributes vs Properties
* Browser Rendering Pipeline
* CRUD Operations using JavaScript

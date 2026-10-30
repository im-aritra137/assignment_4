# JobHub - Job Portal Dashboard

Welcome to JobHub, a modern job portal dashboard where you can explore available job opportunities and manage your job applications. Mark jobs for interviews or reject them with ease. This project demonstrates core JavaScript DOM manipulation and event handling concepts.

## 🎯 Features

- **Responsive Dashboard**: View total jobs, interview count, and rejected count at a glance
- **Available Jobs Section**: Browse 8 meaningful job listings with detailed information
- **Tab Navigation**: Switch between All, Interview, and Rejected job tabs
- **Interactive Job Cards**: Each card displays company name, position, location, job type, salary, and description
- **Toggle Functionality**: Mark jobs for interview or rejected status - toggle between states anytime
- **Delete Functionality**: Remove jobs from the dashboard entirely
- **Real-time Updates**: Dashboard counts update instantly as you interact with jobs
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox layouts
- **JavaScript (Vanilla)**: Pure JavaScript for interactive features without frameworks

## 📁 Project Structure

```
assignment_4/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Documentation and answers
```

## 🚀 How to Use

1. Open `index.html` in your web browser
2. View all available jobs in the "All Jobs" tab
3. Click the **Interview** button to mark a job for interview
4. Click the **Rejected** button to mark a job as rejected
5. Toggle between states by clicking the same button again
6. Click the **Delete** (🗑️) button to remove a job permanently
7. Switch tabs to view jobs by status
8. Monitor dashboard counts for real-time statistics

## 💡 Key Functionalities

### Interview Button
- Moves a job from "All" to the "Interview" tab
- Updates interview count on the dashboard
- Click again to toggle back to "All"

### Rejected Button
- Moves a job from "All" to the "Rejected" tab
- Updates rejected count on the dashboard
- Click again to toggle back to "All"

### Delete Button
- Permanently removes a job from the dashboard
- Deducts count from both dashboard and available jobs section
- Works across all tabs

### Dashboard
- **Total Jobs**: Count of available jobs waiting to be categorized
- **Interview**: Count of jobs marked for interview
- **Rejected**: Count of jobs marked as rejected

## 📚 JavaScript Concepts Explained

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**getElementById** is used to select a single element by its unique `id` attribute. It returns a single Element object or null if not found. This method is fast and efficient because IDs are unique identifiers.

Example: `document.getElementById('myElement')` returns the element with id="myElement"

**getElementsByClassName** returns a live HTMLCollection of all elements that have a specific class name. It's called "live" because it automatically updates if the DOM changes. You can't use array methods directly on it without converting to an array first.

Example: `document.getElementsByClassName('my-class')` returns all elements with class="my-class"

**querySelector** returns the first element that matches a specific CSS selector. It accepts any valid CSS selector string. It's very flexible and returns a single Element or null.

Example: `document.querySelector('.my-class')` or `document.querySelector('#myId')` or `document.querySelector('div.container')`

**querySelectorAll** returns a static NodeList of all elements matching a CSS selector. Unlike getElementsByClassName, this is not a live collection - it's a snapshot of the DOM at the time of the query. This makes it safer to use in loops where you might be modifying the DOM.

Example: `document.querySelectorAll('.my-class')` returns all elements with class="my-class"

**Key Difference**: `getElementById` and `getElementsByClassName` return live collections that update as the DOM changes, while `querySelector` and `querySelectorAll` return static snapshots. Also, `querySelector` methods are more flexible as they accept any CSS selector, making them more powerful for complex selections.

In JobHub, I used `querySelector` and `querySelectorAll` for maximum flexibility in selecting elements by ID, class, or data attributes.

---

### 2. How do you create and insert a new element into the DOM?

To create a new element in the DOM, use the `document.createElement()` method with the HTML tag name as a parameter. This creates the element in memory but doesn't add it to the page yet.

Example: `const newDiv = document.createElement('div');`

After creating an element, you can set its properties and content:
- `element.textContent = 'Hello World';` - adds plain text
- `element.innerHTML = '<span>Hello</span>';` - adds HTML content
- `element.className = 'my-class';` - adds CSS classes
- `element.setAttribute('data-id', '123');` - adds attributes

To insert the element into the DOM, you have several options:

1. **appendChild()**: Adds an element as the last child of a parent element
   ```javascript
   parent.appendChild(newDiv);
   ```

2. **insertBefore()**: Inserts an element before a specific child
   ```javascript
   parent.insertBefore(newDiv, referenceChild);
   ```

3. **innerHTML**: Directly insert HTML as a string (be careful with user input for security)
   ```javascript
   parent.innerHTML += '<div>New Content</div>';
   ```

4. **insertAdjacentHTML()**: Insert HTML at a specific position (before, after, inside)
   ```javascript
   parent.insertAdjacentHTML('beforeend', '<div>New Content</div>');
   ```

In JobHub, the `createJobCard()` function demonstrates this by creating a job card element with `createElement('div')`, setting its HTML content with `innerHTML`, and then returning it to be appended to the appropriate tab container using `appendChild()`.

---

### 3. What is Event Bubbling? And how does it work?

Event Bubbling is the mechanism where an event triggered on a DOM element propagates up through its parent elements in the DOM tree. When you trigger an event on an element (like a click), the event doesn't just trigger on that element - it "bubbles up" through each parent element, triggering the same event on each one.

**How Event Bubbling Works:**

1. **Event Capturing Phase** (rarely used): The event travels down from the root to the target element
2. **Event Target Phase**: The event fires on the target element itself
3. **Event Bubbling Phase**: The event travels back up from the target element through all parent elements

Example scenario:
```
<div id="parent">           <!-- Event bubbles here (3rd) -->
    <div id="child">        <!-- Event bubbles here (2nd) -->
        <button>Click me</button>  <!-- Event fires here (1st) -->
    </div>
</div>
```

When you click the button:
1. The click event fires on the button
2. Then it bubbles up to the child div
3. Then it bubbles up to the parent div
4. Then it bubbles up to the document

**Real-world Example:**
```javascript
document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked'); // Logs when button is clicked too!
});

document.getElementById('child').addEventListener('click', function() {
    console.log('Child clicked'); // Logs when button is clicked too!
});

document.querySelector('button').addEventListener('click', function() {
    console.log('Button clicked'); // Logs when button is clicked
});
```

If you click the button, all three messages log because the event bubbles up.

**Why is this useful?**
Event bubbling allows you to use event delegation, which improves performance by using a single event listener on a parent instead of multiple listeners on children.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a pattern where you attach a single event listener to a parent element instead of attaching listeners to individual child elements. Since events bubble up the DOM, you can handle events on child elements by listening on their parent.

**How Event Delegation Works:**

Instead of this (inefficient with many elements):
```javascript
const buttons = document.querySelectorAll('.job-button');
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});
```

You do this (efficient - one listener):
```javascript
document.querySelector('.jobs-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('job-button')) {
        handleClick(event);
    }
});
```

**Why is Event Delegation Useful?**

1. **Performance**: One event listener is faster than hundreds. This is especially important in applications with dynamic content or many elements.

2. **Dynamic Elements**: When you add new elements dynamically (like new job cards), they automatically respond to the delegated event without needing to attach new listeners.

3. **Memory Efficiency**: Uses less memory by creating fewer event listener objects.

4. **Cleaner Code**: Centralizes event handling logic in one place.

**Real Example from JobHub:**
Instead of attaching click listeners to every job card button individually (which would require re-attaching when cards are created), I attach listeners to each card's buttons directly as they're created in the `createJobCard()` function. However, a more scalable approach using event delegation would be:

```javascript
document.querySelector('.jobs-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-interview')) {
        // Handle interview click
    } else if (event.target.classList.contains('btn-rejected')) {
        // Handle rejected click
    } else if (event.target.classList.contains('btn-delete')) {
        // Handle delete click
    }
});
```

This way, whether there are 8 cards or 800 cards, we only have one listener handling all clicks.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

Both `preventDefault()` and `stopPropagation()` are event methods that modify how events behave, but they work in different ways.

**preventDefault()**

This method prevents the default browser action associated with an event. It does NOT stop the event from bubbling up the DOM.

Common examples:
- Prevents form submission: `event.preventDefault()` on a form submit
- Prevents link navigation: `event.preventDefault()` on an anchor tag click
- Prevents page refresh: `event.preventDefault()` on keyboard shortcuts

**Example:**
```javascript
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents page reload
    // Custom form handling code here
});
```

**stopPropagation()**

This method stops the event from bubbling up to parent elements. However, it does NOT prevent the default browser action - that still happens.

**Example:**
```javascript
document.querySelector('button').addEventListener('click', function(event) {
    event.stopPropagation(); // Stops bubbling to parent
    console.log('Button clicked'); // This logs
});

document.querySelector('div').addEventListener('click', function(event) {
    console.log('Div clicked'); // This does NOT log when button is clicked
});
```

**Comparison Table:**

| Method | Prevents Default Action | Stops Bubbling | Stops Capturing |
|--------|------------------------|-----------------|-----------------|
| preventDefault() | ✅ Yes | ❌ No | ❌ No |
| stopPropagation() | ❌ No | ✅ Yes | ✅ Yes |
| stopImmediatePropagation() | ❌ No | ✅ Yes | ✅ Yes (+ prevents other handlers) |

**Real-world Scenario:**

Imagine a button inside a clickable card:
```javascript
card.addEventListener('click', () => {
    // Navigate to job details
});

button.addEventListener('click', (event) => {
    event.stopPropagation(); // Card click won't trigger
    // Handle button action only
});
```

Without `stopPropagation()`, clicking the button would trigger both the button's click AND the card's click event due to bubbling.

In JobHub, I could use `stopPropagation()` to prevent events from bubbling if job cards were clickable to show details, but individual buttons should have their own isolated behavior.

---

## 🎓 Learning Outcomes

This project demonstrates:
- DOM manipulation with pure JavaScript
- Event handling and event delegation patterns
- State management without frameworks
- Responsive design with CSS Grid and Flexbox
- Dynamic rendering of content
- Data structure management with arrays
- Best practices for vanilla JavaScript applications

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above (3-column grid for job cards)
- **Tablet**: 768px - 1023px (2-column grid)
- **Mobile**: Below 768px (1-column grid with simplified buttons)
- **Small Mobile**: Below 480px (optimized spacing and touch targets)

## 🚀 Future Enhancements

- Add job search and filter functionality
- Implement local storage to persist job states
- Add job details modal
- Integrate with real job API
- Add user authentication
- Add saved jobs feature
- Email notifications for interview invites

## 📝 Commits Made

This project contains meaningful commits documenting each feature:
1. Initial project setup with HTML structure
2. Add CSS styling and responsive design
3. Implement job data structure
4. Add interview button functionality
5. Add rejected button functionality
6. Implement delete functionality
7. Add dashboard count updates
8. Add comprehensive README with JavaScript concept explanations

---

**Created with ❤️ for Assignment 4**

# TaskFlow React Landing Page — Interview Guide

## 1. Simple introduction

“TaskFlow is a responsive SaaS landing page built with React. It introduces a task-management product, explains its benefits, shows pricing, answers common questions, and lets users interact with a dashboard preview.”

## 2. React concepts used

### Component

`Home` is the main React component. A component is a reusable function that returns the user interface written in JSX.

### JSX

JSX lets us write HTML-like code inside JavaScript. React converts it into elements displayed by the browser.

### useState

`useState` remembers values that change while the user interacts with the page:

- `mobileOpen` opens and closes the mobile navigation.
- `tasks` stores the interactive task list.
- `demoOpen` controls the demo modal.
- `openFaq` remembers which FAQ is expanded.
- `selectedPlan` remembers the chosen pricing plan.
- `submitted` displays the success message after form submission.

When state changes, React automatically updates only the affected interface.

### Array map

`map()` generates repeated elements from data. It is used for tasks, plans, their features, and FAQs. This avoids duplicating JSX and makes content easier to maintain.

### Event handling

Events connect user actions to functions:

- `onClick` handles buttons, task completion, plans, FAQs, and menus.
- `onSubmit` handles the email form.
- `preventDefault()` stops the browser from refreshing after form submission.

### Conditional rendering

React displays content only when a condition is true. Examples include the modal, FAQ answers, “Most popular” label, selected-plan text, and form success message.

### Props and dynamic values

Task and pricing data are inserted into JSX using braces such as `{plan.name}`. The progress bar width is calculated from completed tasks and passed through the `style` prop.

## 3. CSS concepts used

- CSS variables store reusable colors.
- Grid creates page sections, dashboard columns, cards, and pricing layouts.
- Flexbox aligns navigation, buttons, and smaller interface groups.
- Media queries make the layout responsive on tablets and phones.
- Transitions and keyframes add lightweight movement.
- `prefers-reduced-motion` improves accessibility for people who disable animations.
- Focus styles, labels, semantic elements, and ARIA attributes improve keyboard and screen-reader support.

## 4. Functionality flow

1. Navigation links smoothly move to a section.
2. The mobile menu opens below 780px screen width.
3. Clicking a dashboard task toggles its completed state.
4. The progress percentage is recalculated from completed tasks.
5. “Watch demo” opens a modal; the close button or backdrop closes it.
6. Clicking an FAQ opens its answer and closes it when clicked again.
7. A pricing button updates the selected plan.
8. The email field uses browser validation; a valid submission shows a success message.

## 5. Why this structure was chosen

The page uses data arrays and one main component so it remains easy for a beginner to read. In a larger production project, Header, Hero, Pricing, FAQ, Modal, and Footer can be moved into separate component files.

## 6. Common interview questions

**Why use React instead of plain HTML?**  
React makes interactive state and reusable sections easier to manage. The task list, modal, FAQ, menu, plan selection, and form feedback can update without reloading the page.

**What happens when state changes?**  
React runs the component again, compares the new UI with the old UI, and updates only the required DOM elements.

**Why use `key` inside `map()`?**  
The key gives each generated element a stable identity, helping React update lists efficiently.

**How is the page responsive?**  
CSS Grid/Flexbox handle flexible layouts, and media queries stack columns, reveal the mobile menu, and adjust spacing and typography on small screens.

**What would you improve for production?**  
I would connect login and signup to a backend API, save tasks in a database, split sections into reusable files, add automated tests, and connect the form to an email service.

## 7. Run locally

Install Node.js, open the project folder, and run:

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

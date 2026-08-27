# Addis Eats - Static React Menu

This is my mini-project for Module 3 (Day 26). It is a simple static food menu for Addis Eats built with React and Vite. 

The goal of this project was to rebuild the menu from Module 2 using React components and props instead of plain HTML and manual DOM manipulation.

## What I Built

- **`Header.jsx`**: A component for the page header.
- **`Card.jsx`**: A reusable component that takes `name` and `price` as props and displays the price in ETB.
- **`App.jsx`**: The main component that combines the Header and maps over an array of dish objects using `.map()` with unique `key` props.

## Setup & Running Locally

Follow these steps to run the project locally:

==========step-1==========
Clone the repository:

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd addis-eats

==========step-2==========
```Install dependencies:

Bash
npm install

==========step-3==========
Start the development server:

Bash
npm run dev
Open your browser and navigate to the local URL provided in the terminal (typically http://localhost:5173).
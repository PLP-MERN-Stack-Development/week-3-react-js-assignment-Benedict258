# React Assignment App - Component Architecture & State Management

A comprehensive and modern React application showcasing key development skills including component architecture, state management, hooks usage, API integration, and responsive UI — all built using **Vite**, **TypeScript**, and **Tailwind CSS**.

> 🧠 Built by Benedict Isaac as part of the PLP MERN Stack Week 3 Assignment.

---

## 🌐 Live Demo

🔗 **Deployed URL:** [[Click to view the app]](https://react-assignment-app.onrender.com/)(#)  


---

## 🚀 Features

### Core Functionality
- **📝 Task Management System**  
  Add, complete, delete, and filter tasks with persistent local storage.
  
- **🌍 API Integration**  
  Fetch and display posts from the JSONPlaceholder API, with search and pagination.

- **🌗 Theme Switching**  
  Toggle light and dark mode using React Context + Tailwind dark classes.

- **📱 Responsive Design**  
  Mobile-first UI that adapts beautifully to all screen sizes.

---

## 🧩 Component Architecture

- **Reusable UI Components**  
  `Button`, `Card`, `Navbar`, and `Footer` — all customizable with props.

- **Layout System**  
  A global layout component that wraps all pages with navigation and footer.

- **Page Components**  
  Independent pages for Task Management and API Post Explorer.

---

## 🧠 State Management & Hooks

- **useState**  
  Manage component-level task input and UI toggles.

- **useEffect**  
  Load tasks from local storage on mount.

- **useContext**  
  Share theme state (light/dark) across the app.

- **Custom Hooks**
  - `useLocalStorage`: Persist tasks in the browser
  - `useApi`: Handle API fetching, errors, and loading states

---

## 🎨 Styling & UX

- **Tailwind CSS**  
  Utility-first styling with a scalable design system.

- **Dark Mode**  
  Full theme switching implementation using Tailwind’s dark mode classes.

- **Animations & Transitions**  
  Smooth interactive feedback using Tailwind transition utilities.

- **Accessibility**  
  Semantic HTML, proper color contrast, and focus states included.

---

## 🛠️ Technologies Used

- ⚛️ **React 18** with TypeScript
- ⚡ **Vite** for blazing-fast development
- 🎨 **Tailwind CSS** for styling
- 🔀 **React Router** for page navigation
- 🌐 **JSONPlaceholder API** for dummy data
- 🎯 **Lucide React** for modern icons

---

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-assignment-app
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open your browser and navigate to http://localhost:5173

🏗️ Project Structure
graphql
Copy
Edit
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Navbar.tsx       # Navigation component
│   │   └── Footer.tsx       # Footer component
│   ├── tasks/
│   │   └── TaskManager.tsx  # Task management component
│   ├── posts/
│   │   └── PostsList.tsx    # Posts display component
│   └── ui/
│       ├── Button.tsx       # Reusable button component
│       └── Card.tsx         # Reusable card component
├── context/
│   └── ThemeContext.tsx     # Theme context provider
├── hooks/
│   ├── useLocalStorage.ts   # Local storage custom hook
│   └── useApi.ts            # API fetching custom hook
├── pages/
│   ├── TasksPage.tsx        # Tasks page component
│   └── PostsPage.tsx        # Posts page component
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
🎯 Assignment Requirements Fulfilled
✅ Task 1: Project Setup
 React application created with Vite

 Tailwind CSS installed and configured

 Proper folder structure (components, pages, utils, hooks)

 React Router set up

✅ Task 2: Component Architecture
 Button component with multiple variants

 Card component for content display

 Navbar and Footer with theming and navigation

 Layout wrapper component

 Components customizable via props

✅ Task 3: State Management and Hooks
 TaskManager component with CRUD

 Filtering: All, Active, Completed

 useState & useEffect for task logic

 useContext for theme toggling

 Custom useLocalStorage hook

✅ Task 4: API Integration
 Posts from JSONPlaceholder API

 Search and pagination features

 Handled loading & error states

 Responsive display of data

✅ Task 5: Tailwind CSS Styling
 Mobile, tablet, desktop responsive layout

 Dark mode with context and Tailwind

 Tailwind utility classes used throughout

 Interactive transitions and animations

🎨 Design Features
Color System: Blue, emerald, and purple with dark/light variants

Typography: Inter font, clear hierarchy, and headings

Layout: 8px spacing scale, card-based sections

Transitions: Subtle hover effects and focus states

Dark Mode: Persistent and instant theme toggling

📱 Responsive Breakpoints
Mobile-view.png
📱 Mobile: < 768px
Tablet-View.png
💻 Tablet: 768px – 1024px
Desktop-View.png
🖥️ Desktop: > 1024px

🔧 Scripts
Command	Description
npm run dev	Start development server
npm run build	Build the app for production
npm run preview	Preview production build locally
npm run lint	Run linting checks

🌐 Deployment
Options:
Vercel

Connect your GitHub repo and deploy instantly

Netlify

Run npm run build and drag the dist folder into Netlify

GitHub Pages

Optional via GitHub Actions or plugins like vite-plugin-gh-pages


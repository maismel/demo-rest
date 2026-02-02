# Restaurant CRM

A simple CRM dashboard for managing employees, built with **Vue 3**, **TypeScript**, **Pinia**, and **Element Plus**.

The project demonstrates authentication flow, protected routes, data fetching from an external API, responsive layout.
demo: https://maismel.github.io/demo-rest/

## Features

- Authentication (login / logout)
- Protected routes with navigation guards
- Employees list with pagination
- Statistics cards (total employees, gender-based stats)
- Employee details modal (route-based)
- Responsive layout (sidebar + mobile drawer)
- UI built with Element Plus
- API integration with centralized helper

## Tech Stack & Dependencies

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Vite**
- **Pinia** — state management
- **Vue Router**
- **Element Plus** — UI library
- **DummyJSON API** — backend mock
- **GitHub Pages** — deployment

## Installation

- Clone the repository: git clone https://github.com/your-username/demo-rest.git
- Add .env (VITE_API_URL=https://dummyjson.com)
- Install dependencies: npm install
- Run the project: npm run dev

# SWE Compass

SWE Compass is a React + Vite front-end portal for Software Engineering students. The app combines an academic dashboard, study roadmap, resource library, upload workflow, and profile/authentication pages in one responsive interface.

## Team Members

- Member 1: Aseel Bawazir, Architect
- Member 2: Waleed Alharbi, UI Lead
- Member 3: Sultan Alsbia, Feature Developer A
- Member 4: Amin Srraj, Feature Developer B
- Member 5: Abdullah Alzahrani, QA and Documentation

## Features

- Dashboard with course summaries, search, and status filtering
- Interactive roadmap with semester cards, course details, and filters
- Resource library with search and category filtering
- Upload flow with validation and submission feedback
- Login, signup, and profile pages with interactive form validation
- Responsive layout with desktop sidebar and mobile navigation drawer

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Lucide React
- ESLint 9

## Project Structure

```text
src/
  components/
    ui/
  data/
  layouts/
  pages/
public/
```

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run ESLint

```bash
npm run lint
```

### Preview the Production Build

```bash
npm run preview
```

## Main Dependencies

### Runtime

- `react`
- `react-dom`
- `react-router-dom`
- `lucide-react`
- `@tailwindcss/vite`

### Development

- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `@tailwindcss/postcss`
- `postcss`
- `autoprefixer`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `@types/react`
- `@types/react-dom`

## Routes

- `/`
- `/roadmap`
- `/library`
- `/upload`
- `/profile`
- `/login`
- `/signup`

## QA Summary

- Checked responsive behavior for shared layout and profile actions
- Verified interactive filtering in resource views
- Added upload-form validation and success feedback
- Confirmed the project passes `npm run build` and `npm run lint`

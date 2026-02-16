# NoteHub

**NoteHub** is a multi-page note-taking app built with **Next.js**, **TypeScript**, and **React
Query (TanStack Query)**.  
It allows you to create, view, search, and delete notes with support for both SSR and CSR.

---

## 🚀 Features

- Create new notes via a modal form.
- Search notes by keyword.
- Paginated list of notes.
- View detailed information for each note.
- Delete notes.
- Fully typed with TypeScript.
- Styled with CSS Modules.
- Loading and error handling for all routes.

---

## ⚙️ Technologies

- [Next.js](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query / React Query](https://tanstack.com/query/latest)
- [Formik + Yup](https://formik.org/)
- [Axios](https://axios-http.com/)
- CSS Modules
- React Hot Toast

---

## 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/06-notehub-nextjs.git
cd 06-notehub-nextjs
Install dependencies:

npm install
# or
yarn install
Create a .env file and add your API token:

NEXT_PUBLIC_NOTEHUB_TOKEN=your_api_token_here
Start the development server:

npm run dev
# or
yarn dev
Visit http://localhost:3000 to view the app locally.

📌 Routes
/ — Home page with app description.

/notes — List of notes with search, pagination, and creation.

/notes/[id] — Detailed view of a single note.


Live Demo: https://06-notehub-nextjs-delta-olive.vercel.app/
```

# Portfolio Frontend

Next.js 14 portfolio website with Admin CMS panel — deployed on **Vercel** (free).

---

## Tech Stack

- **Next.js 14** — React framework (App Router)
- **TypeScript** — type safety
- **Ant Design 5** — UI components
- **Axios** — API calls
- **js-cookie** — JWT token storage
- **react-hot-toast** — notifications
- **dayjs** — date formatting

---

## Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # CSS variables + styles
│   ├── page.tsx             # Public portfolio homepage
│   ├── not-found.tsx        # 404 page
│   ├── error.tsx            # Error boundary
│   └── admin/
│       ├── layout.tsx       # Sidebar + auth guard
│       ├── page.tsx         # Dashboard
│       ├── login/
│       ├── profile/
│       ├── projects/
│       ├── skills/
│       ├── experience/
│       ├── messages/
│       └── settings/
├── lib/
│   └── api.ts               # All API calls (auto-attaches JWT)
└── hooks/
    └── useAuth.tsx          # Auth state (login / logout)
```

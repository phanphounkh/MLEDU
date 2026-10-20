# MLEDU

MLEDU is a modern, responsive machine-learning education platform that turns a complete curriculum into a visual learning roadmap. Learners can watch course videos, read Markdown-based notes, explore Python examples, search the curriculum, and track lesson completion in their browser.

**Live site:** [mledu-roadmap-2026.skai-technol-5018.chatgpt.site](https://mledu-roadmap-2026.skai-technol-5018.chatgpt.site)

> The hosted site is private and may require OpenAI sign-in.

## Highlights

- Visual roadmap containing 11 modules and 44 lessons/projects
- Responsive dashboard and lesson workspace
- Collapsible curriculum sidebar
- Embedded YouTube lessons from the Siddhardhan ML course playlist
- Markdown tutorials and reusable Python snippets
- Lesson search and curriculum filters
- Per-lesson completion tracking with overall and module progress
- Persistent progress through browser `localStorage`
- Light and dark themes
- Accessible keyboard-friendly navigation

## Curriculum

The roadmap covers:

1. Machine Learning Basics
2. Python Basics for Machine Learning
3. Python Libraries for Machine Learning
4. Data Collection and Preprocessing
5. Mathematical Foundations
6. Machine Learning Models
7. Classification Models
8. Regression Models
9. Clustering Models
10. Association Rule Learning
11. Real-World Projects

Curriculum content is stored in [`data/curriculum.json`](data/curriculum.json).

## Video mapping

Lesson videos come from the [Machine Learning Course With Python playlist](https://www.youtube.com/playlist?list=PLfFghEzKVmjsNtIRwErklMAN8nJmebB0I).

The mapping is maintained in [`data/video-map.json`](data/video-map.json). Each entry includes:

- YouTube video ID
- Playlist position
- Source video title
- Match type: `primary` or `related`

Most lessons have a direct playlist match. When the supplied playlist does not contain a dedicated video for a curriculum topic, MLEDU displays the closest related lesson and labels it clearly in the interface.

## Tech stack

- Next.js-compatible App Router powered by Vinext
- React 19 and TypeScript
- Tailwind CSS
- Shadcn UI components
- Lucide icons
- `react-markdown` with GitHub Flavored Markdown support
- Cloudflare Workers and ChatGPT Sites hosting
- Browser `localStorage` for progress and theme preferences

## Requirements

- Node.js `>=22.13.0`
- npm
- Git

The project has been tested with Node.js `22.23.2`.

## Getting started

Clone the repository, then install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL printed by the development server. The default portable-development address is usually:

```text
http://127.0.0.1:5173
```

If your current Node version is older than 22 and you use NVM:

```bash
nvm use 22.23.2
npm run dev
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reloading |
| `npm run build` | Create a production build |
| `npm run start` | Preview the built Worker locally |
| `npm run lint` | Run ESLint |
| `npm run install:ci` | Install dependencies from the lockfile |
| `npm run db:generate` | Generate Drizzle migrations if database features are added |

## Project structure

```text
MLEDU/
├── app/
│   ├── lesson/[id]/page.tsx    # Dynamic lesson route
│   ├── globals.css             # Theme, typography, and global styles
│   ├── layout.tsx              # Root metadata and document layout
│   └── page.tsx                # Roadmap dashboard route
├── components/mledu/
│   ├── dashboard.tsx           # Roadmap, search, filters, and statistics
│   ├── lesson-shell.tsx        # Video, notes, code, and lesson navigation
│   ├── site-header.tsx         # Shared application header
│   └── theme-toggle.tsx        # Light/dark mode control
├── data/
│   ├── curriculum.json         # Module and lesson definitions
│   └── video-map.json          # YouTube-to-lesson mapping
├── hooks/
│   └── use-progress.ts         # Local progress persistence
├── lib/
│   └── curriculum.ts           # Curriculum helpers and generated content
└── .openai/hosting.json        # Sites deployment configuration
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Interactive roadmap dashboard |
| `/lesson/[id]` | Individual lesson workspace |

Lesson IDs follow the module and lesson number. For example:

```text
/lesson/1-1
/lesson/7-2
/lesson/11-4
```

## Progress storage

Completion state is saved locally under the key:

```text
mledu-progress-v1
```

Theme preference is saved under:

```text
mledu-theme
```

No account or database is required for progress tracking. Clearing the browser's site data resets local progress.

## Updating content

To add or modify a lesson:

1. Update the module or lesson in `data/curriculum.json`.
2. Add its YouTube metadata to `data/video-map.json` using the same lesson ID.
3. Run `npm run build` to validate the data and routes.

The lesson workspace reads both files through `lib/curriculum.ts`.

## Deployment

MLEDU is configured for ChatGPT Sites through `.openai/hosting.json`. Production output runs as a Cloudflare Worker generated by the Vinext build pipeline.

For standalone validation, run:

```bash
npm run build
```

Deployment through Sites also commits the prepared source automatically. If `git status` reports a clean working tree after a Sites deployment, the changes have already been committed locally.

## License

No license has been specified yet.

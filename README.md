# Weekly To-Do App (React + Tailwind CSS)

Mobile-first to-do app that groups tasks by week (Monday–Sunday) and shows open vs. completed counts per week.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview
```

## Features
- Create / edit / delete tasks (title*, description, date & time*, priority)
- Onboarding, Mon–Sun day strip, Complete / Pending cards and weekly progress (matches the Figma)
- "View All" shows every week as a card with open / completed counts; tap a card to expand its tasks
- Mark tasks Completed / In progress (updates the week card instantly)
- Swipe left on a task (touch) to reveal **Delete**; a delete icon is shown on desktop
- Search by title or description, with edit / delete / status toggle in results
- Responsive: bottom sheet form on phones, centred dialog on larger screens

## Folder structure
```
src/
  screens/     OnboardingScreen, HomeScreen, AllWeeksScreen
  components/
    home/      SearchBar, WeekStrip, StatCards, WeeklyProgress
    tasks/     TaskItem, TaskList, TaskForm, SwipeableRow
    week/      WeekCard, WeekList   (weekly summary cards, "View All")
    search/    SearchView
    ui/        Icons, Checkbox, Modal, PriorityBadge, EmptyState
  context/     TaskContext (reducer + actions)
  services/    taskService (tasks), preferencesService (onboarding flag)
  hooks/       useDebounce
  utils/       date helpers, week grouping, search
  constants/   status / priority enums and styles
```

## Using your own API
All persistence goes through `src/services/taskService.js` (currently localStorage).
Replace `loadTasks` / `saveTasks` (or the reducer actions in `TaskContext`) with `fetch()` calls
to your Express/MongoDB API; no UI components need to change.

## Deploy to Netlify
Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).

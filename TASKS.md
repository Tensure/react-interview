# Tasks

Work through these in order. They start simple and get progressively harder. Talk out loud as you go — how you investigate and the tradeoffs you consider matter as much as the final diff.

There's a test suite (`npm test`). Some tests fail right now on purpose. A task is done when its related behavior works correctly and (where a test already exists) the relevant test passes. You're welcome to add your own tests too.

You don't need to finish everything — work at whatever pace produces solid, correct code. When time is up, or you reach the end of this list, let the interviewer know.

---

### 1. Checkbox toggles the wrong task

Change the status filter to "Completed", then back to "All". Now try checking/unchecking a task — sometimes the wrong task gets marked complete. Find the root cause and fix it.

### 2. Editing a title can bleed into another task

Start editing a task's title (double-click it), then delete a *different* task above it in the list before saving. Something goes wrong. Figure out what, and fix it.

### 3. Add a category filter

Tasks already have a `category` field (work / personal / errands / health), but there's no way to filter by it. Add one, following the pattern already used for the status filter (`FilterBar.tsx`, the reducer, etc). It should work in combination with the existing status filter and search.

### 4. Search results are unreliable

Type a search query quickly (e.g. clear the box, then type "a", then "ab", then "abc" without pausing). Watch the results closely. Something is off. Diagnose it and fix it properly — a debounce alone will reduce how often it happens, but won't eliminate it.

### 5. Priority: editing, sorting, and persistence

- Let users change a task's priority after creation (currently it can only be set when the task is created).
- Add "Priority" as a sort option alongside the existing ones.
- Persist the user's chosen filters/sort/search to `localStorage`, so reloading the page restores where they left off.

### 6. Smart task suggestions

Product wants to add **smart task suggestions** to TaskFlow — something that gives users a bit of
intelligent assistance while managing their tasks. That's intentionally the whole spec.

Use your judgment on what to build and how big to make it. Some ideas that would satisfy this
(not a checklist — pick a direction, or bring your own):

- Suggest a priority for a new task based on its title/description/due date.
- Flag likely-duplicate tasks when adding a new one.
- Surface tasks that seem stuck (e.g. overdue, or untouched a long time).
- A natural-language quick-add ("call mom tomorrow at 5" → parsed into fields).

Ship something real — not a stub, not a giant redesign. Use whatever tools you'd normally reach
for, including AI coding assistants, exactly as you would on the job. Be ready to walk through
the decisions you made, including any you'd revisit given more time.

---

Move at whatever pace makes sense — if you finish early, mention it to the interviewer.

# Interviewer guide (do not share with candidate)

Senior-level React interview, 45 minutes nominal. The task list is intentionally sized so that
most candidates will **not** finish all of Tasks 1–5 in 45 minutes — that's fine and expected. The
point of stretching it is Task 6 (below), which is only revealed once a candidate reaches it or
time is called. **Do not mention Task 6 or its purpose up front.**

## Before you send this to a candidate

This repo (the one containing this file) is your reference copy — keep it private. Run
`scripts/make-candidate-copy.sh [output-dir]` to generate a clean copy with `INTERVIEWER_GUIDE.md`,
`FINAL_TASK.md`, and `scripts/` stripped out and git history reset, then send/share *that* copy
(zip it, push it to a fresh private repo, whatever your usual handoff is).

## Format

- Give them the repo, `README.md`, and `TASKS.md`. Let them run `npm install && npm run dev` and
  `npm test` themselves — that's part of the signal (do they read output, notice failing tests
  are meaningful, etc).
- Sit back and let them drive. Ask them to narrate their reasoning.
- Move to the next task once the current one is genuinely working — don't let them polish
  indefinitely.

## Task-by-task notes

### Task 1 — checkbox toggles the wrong task

**Root cause:** `TaskList` passes the *rendered* array index to `TaskItem`, and the reducer's
`TOGGLE_COMPLETE` action matches against that same index into the *unfiltered/unsorted*
`state.tasks` array (`src/context/taskReducer.ts`, `src/components/TaskList.tsx`,
`src/components/TaskItem.tsx`). The two arrays only line up when no filter/sort is active, which
is why it "looks fine" until you touch the filter or sort controls.

**Correct fix:** identify tasks by `task.id` everywhere — `TOGGLE_COMPLETE` should carry an `id`,
not an `index`, and the reducer should match on it.

**What to look for:** do they reproduce it reliably before touching code? Do they fix the root
cause (id-based matching) rather than a superficial patch (e.g. re-deriving the "real" index,
which is fragile and a red flag)?

### Task 2 — editing bleeds into another task

**Root cause:** `key={index}` in `TaskList`'s map. React reuses component instances (and their
local state, like `isEditing`/`draftTitle`) by key across re-renders. When a task above the one
being edited is removed, everything shifts up by one index, so the *same key* now points at a
different task — the edit-mode instance and its stale draft text get reattached to the wrong row.

**Correct fix:** `key={task.id}`.

**What to look for:** this is the single most common React interview bug for a reason — a strong
senior candidate should recognize "index as key + reorderable list" almost on sight. Docking for
someone who needs the failing test to point them at it, but that's fine if they still land the
right fix and can explain why.

### Task 3 — category filter (feature)

Mechanical, low ambiguity: add `categoryFilter` to `TaskState`/`taskReducer` (`'all' | Category`),
a `SET_CATEGORY_FILTER` action, a `filterByCategory` (or extend `filterByStatus`) in
`utils/filterSort.ts`, and UI in `FilterBar.tsx`. Filters should compose (status AND category AND
search).

**What to look for:** do they follow the existing reducer/state shape rather than inventing a
parallel mechanism? Do they actually compose all three filters, or does adding category filtering
silently break status filtering (a common regression when someone replaces rather than chains
filter predicates)?

### Task 4 — search race condition

**Root cause:** `SearchBar` fires a new `fetchTasks(query)` on every keystroke with no guard.
`fetchTasks` has randomized latency (`src/api/fakeApi.ts`), so requests can resolve out of order —
a fast typist can see results for `"a"` land *after* results for `"abc"`, overwriting the correct,
newer results with stale ones.

**Correct fix:** guard against stale responses — e.g. a ref holding a monotonically increasing
request id/token, only applying a response if it's still the latest one issued. Debouncing the
*input* reduces how often this fires but does not fix it (two requests can still race after a
debounce), which is explicitly called out in the task so candidates don't stop at "add a
debounce." A true `AbortController` isn't wired through `fakeApi`, so the expected solution is the
stale-response-guard pattern, not cancellation.

**What to look for:** do they understand *why* a debounce alone is insufficient, or do they submit
it as if it were a complete fix? Do they reach for a ref (correct — avoids stale closures over a
plain variable across renders) vs. a plain module-level or state variable (a state variable works
but causes an extra render per request; a plain outer variable shared across component instances
is a bug)?

### Task 5 — priority editing, sorting, persistence (feature)

Three sub-features touching most of the app: editing an existing field, extending the sort utility
and its type (`SortKey`), and introducing `localStorage` persistence for the first time in this
codebase.

**Watch for the classic persistence bug:** if they persist filter/sort/search state via a
`useEffect` keyed on that state, and *also* load the saved state on mount via another effect, the
save effect can fire (with default/initial values) before the load effect finishes, clobbering
what was saved on a previous visit. A candidate who's done this before should either lazy-initialize
state from `localStorage` (`useState(() => ...)`) instead of loading in an effect, or explicitly
guard the save effect until after the initial load.

**What to look for:** scope discipline — this is the first "big" feature task, and it's easy to
over-build (e.g., persisting the entire task list instead of just view preferences, which wasn't
asked for and raises its own sync-with-the-"server" questions). A senior engineer should notice
the scope boundary on their own.

## Wrapping up Tasks 1–5 / reaching the 45-minute mark

Whichever comes first — they reach the end of `TASKS.md`, or 45 minutes elapses — tell them
(verbally, in these words or similar):

> "Good work. There's one more task. I'm going to give it to you now — take as long as you need,
> and feel free to use any tools you'd normally use, including AI coding assistants, exactly as
> you would on the job."

Then hand them the content of `FINAL_TASK.md` (read it to them, paste it into a message, however
you'd naturally hand off a ticket).

**Do not tell them beforehand that this last task exists or that it's evaluating tool use** — the
point is to observe how they naturally work when given an open-ended, realistically-scoped
problem and enough runway to actually use their tools well, not how they perform under an
announced test.

## Evaluating Task 6

See `FINAL_TASK.md` for the prompt itself. There's deliberately no reference implementation —
it's underspecified on purpose. Evaluate:

- **Scoping:** did they ask clarifying questions (if allowed) or make and state reasonable
  assumptions? Did they pick something shippable rather than either a trivial stub or an
  overbuilt system?
- **Tool use:** did they delegate effectively — e.g. parallelizing independent exploration or
  subtasks, using an agent to draft while they review, having it write tests alongside the
  feature — rather than either ignoring the tooling or blindly accepting whatever it produced?
- **Verification:** did they actually run/exercise what was generated, or just eyeball the diff?
  Did they catch anything the tool got wrong?
- **Communication:** can they explain the design decisions embedded in what was built, including
  ones the assistant made on their behalf?

There's no fixed pass bar here — weigh it as evidence of how this person will actually work day to
day with AI-assisted tooling on your team, not as a correctness check.

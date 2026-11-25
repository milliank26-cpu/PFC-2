# StudyPilot — Adaptive Academic Revision Planner

A local-first academic revision website for hierarchical concept tracking, performance-aware spaced review, exam practice, availability planning, and adaptive timetables. Built with HTML5, CSS3 and vanilla JavaScript. No account, server, paid API, or build step is required.

## Run locally

1. Download and extract the project folder.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge or Safari).
3. Data is saved in that browser's local storage. Use **Settings & backup → Export full JSON backup** regularly. Clearing browser data may erase the local database.
4. For the most consistent browser file handling, you may optionally run a local static server from this folder: `python -m http.server 8000`, then visit `http://localhost:8000`.

## First setup

1. In **Settings & backup**, edit the profile and add/remove subjects.
2. In **Concepts**, add concepts individually or use **Bulk add / paste**. Recommended line format:
   `Physics | Mechanics | Motion | Equations of motion`
   `Mathematics | Functions | Graphs | Domain and range`
   A `# Subject: Physics` line sets the default subject for unstructured lines. Review the preview before saving.
3. Use **Import CSV** for a CSV with headers such as `subject,topic,subtopic,name,paper,description,type,difficulty,importance,learnMin,reviewMin,practiceMin,targetReps,targetQuestions`.
4. In **Availability**, set academic revision minutes per weekday, buffer, maximum session duration and commitments. Project-work budget is separate and never counted as academic capacity. Date-specific overrides are supported.
5. In **Exams & goals**, set a real exam deadline and subject scope. Dates are intentionally not prefilled.
6. Choose a strategy and horizon on **Timetable**, then recalculate.
7. Complete a task and log the result. For retrieval/practice, record performance before checking notes, then compare against a worked solution or marking guide. Results, assistance and confidence are recorded separately.
8. Export a JSON backup regularly. Import merges by record ID and preserves records not present in the imported backup.

## What the planner measures

- **Coverage:** concept has a logged first-learning activity.
- **Retrieval attempted:** retrieval or practice activity has been logged.
- **Evidence-secure:** current heuristic requires a mastery estimate of at least 75% and two independent successful attempts. This is not a guarantee of future recall.
- **Mastery estimate:** recent logged assessment scores are weighted toward more recent attempts; assisted results are discounted. Time spent alone does not raise the estimate.
- **Priority:** a transparent heuristic combining exam importance, weakness, self-rated difficulty, overdue status, novelty and deadline pressure. It is not a validated psychological scale.
- **Review intervals:** initial defaults expand after independent success and return to an early follow-up after unsuccessful or assisted attempts. Intervals are scheduling defaults, not a scientifically exact forgetting prediction.

## Research foundations

- Dunlosky et al. (2013), [Improving Students' Learning With Effective Learning Techniques](https://doi.org/10.1177/1529100612453266)
- Cepeda et al. (2006), [Distributed Practice in Verbal Recall Tasks](https://doi.org/10.1037/0033-2909.132.3.354)
- Donoghue & Hattie (2021), [A Meta-Analysis of Ten Learning Techniques](https://doi.org/10.3389/feduc.2021.581216)
- Institute of Education Sciences, [Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)

Research supports the general usefulness of retrieval/practice testing and spacing, but optimal schedules depend on content, learner, learning conditions and the retention interval. The application's scoring weights, duration estimates and exact interval policy are practical engineering heuristics. The planner cannot guarantee retention or exam results.

## Validation checklist

The app includes workflows for the requested scenarios: setup and hierarchical bulk import; changing weekly availability and date overrides; goal changes and workload estimates; poor/assisted performance triggering corrective work and early review; successful independent performance lengthening intervals; deadline-sensitive priority; missed tasks moved rather than marked done; urgent assignment reservation; browser persistence; JSON backup/restore; duplicate detection, bounded numeric inputs and confirmation before destructive actions; responsive mobile layout; and zero-capacity / past-deadline / high-workload cases.

This is a client-side app, so its data is local to one browser profile. It does not sync across devices, authenticate users, verify marking guides, or infer actual learning without the student's logged assessment evidence.

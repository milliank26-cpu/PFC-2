# StudyPilot V4.2 change log

- Deferred student-facing Learning Resources until a later release.
- Brought O Level/A Level and subject selection forward in Settings & Backup.
- Preserved student coverage declarations when official curriculum selections are refreshed.
- Added topic and subtopic bulk coverage actions in My Curriculum.
- Replaced the overcrowded smartphone navigation with five primary destinations plus a More menu.
- Extended dark theme styling to forms, controls, dialogs, curriculum panels and admin screens.
- Added administrator concept edit/delete actions and batch add under a selected subtopic.
- Kept Noticeboard publishing and added more useful migration-related error feedback.


## Hotfix: curriculum dashboard and student subject saving
- Added an atomic `studypilot_save_academic_selection` database function. It validates the chosen level and published subjects before changing the student's subject selections, avoiding partial saves when a later profile write fails.
- Updated the student save flow to use that function and display the actual database error rather than a generic message.
- Student settings now reload the saved academic level from `student_academic_profiles`.
- Administrator overview refreshes after CSV imports, manual concept additions and subject publication changes.
- The V4.1 migration must be applied for the new profile table and save function to exist.

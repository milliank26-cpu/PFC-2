# StudyPilot V4.2 hotfix: subject saving and admin overview

## What caused the symptoms

The supplied V4.2 frontend expects the V4.1 database migration. Your earlier Supabase check showed that `student_academic_profiles` and the Noticeboard/suggestions tables did not exist. The student save code attempted to delete and recreate `student_subjects`, then write `student_academic_profiles`. Because that profile table was missing, the sequence could fail after changing the subject rows. The old code also hid the actual database error behind a generic message.

The admin overview function also comes from the database migration. If the updated V4.1 function is not installed, the overview will not expose the new O/A subject and concept metrics. In addition, the admin page did not refresh overview metrics after an import or publication action.

## Files updated

- `auth.js`: saves level and subjects through one atomic RPC; displays actual error details; reloads saved academic level from the database.
- `admin.js`: refreshes overview after CSV import, manual concept creation/batch creation, and subject publish/unpublish.
- `StudyPilot_V4_1_Noticeboard_Levels_Suggestions.sql`: creates the missing V4.1 tables and policies, refreshes the overview function, and adds `studypilot_save_academic_selection`.

## Safe installation order

1. Keep a copy of your currently deployed website files.
2. In Supabase SQL Editor, run the updated `StudyPilot_V4_1_Noticeboard_Levels_Suggestions.sql` from this package against the existing StudyPilot project. It is additive/idempotent and does not drop your existing curriculum or planner tables.
3. Verify the new tables and RPC with the SQL checks below.
4. Upload the updated `auth.js` and `admin.js` from this package. Keep your live `config.js` unchanged; this ZIP has placeholder credentials.
5. Refresh the website. Test with one student account and one administrator account.

## Verification query: new tables

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'student_academic_profiles',
    'studypilot_notices',
    'studypilot_notice_reads',
    'studypilot_concept_suggestions'
  )
order by table_name;
```

Expected: four rows.

## Verification query: curriculum counts

```sql
select s.level, s.name as subject,
       count(distinct t.id) as topics,
       count(distinct st.id) as subtopics,
       count(distinct c.id) as concepts,
       s.is_published
from public.curriculum_subjects s
left join public.curriculum_topics t on t.subject_id = s.id
left join public.curriculum_subtopics st on st.topic_id = t.id
left join public.curriculum_concepts c on c.subtopic_id = st.id
group by s.id, s.level, s.name, s.is_published
order by s.level, s.name;
```

## Test

- Admin: open Curriculum, check that imported concept counts exist, and publish only subjects with complete curriculum.
- Admin: open Overview and refresh. Concept and published subject totals should reflect database records.
- Student: open Settings, choose a level, select one or more published subjects, and save. The success message should report the concepts loaded.
- Student: refresh the page, return to Settings, and confirm the level and subject choices remain selected.

If a save still fails, copy the detailed error shown below the Save button. Do not run destructive SQL or manually delete rows from `student_subjects`.

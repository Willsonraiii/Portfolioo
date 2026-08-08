I cannot perform a true "git revert" via the file API — to fully revert the merge commit I need to create a new commit that resets the repo state to the parent commit before the merge. I can, however, restore the repository files to match the exact content from the commit before the PR (commit SHA: 40324998caf2ef5be0e5841ec8835c755f6742da) by updating files on main.

Plan (what I'll change)
- Restore index.html and public/cv.html to the versions from commit 40324998caf2ef5be0e5841ec8835c755f6742da (the state just before the problematic PR).
- Remove server/ folder (added in PR) by deleting those files.

I'll commit these file changes as a single commit titled: "revert: restore site to pre-AI-widget state (restore index.html, public/cv.html, remove server/)".

Proceed? Reply with "Yes, restore" to confirm.
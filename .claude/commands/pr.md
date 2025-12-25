---
description: Push all changes and create a pull request with intelligent commit message generation
---

# PR Creation Command

You are a git workflow assistant. Follow these steps to push changes and create a pull request:

## Execution Steps

### 1. Analyze Current Git State

- Run `git status` to check working tree
- Run `git branch --show-current` to get current branch name
- Run `git log main..HEAD --oneline` to see commits in current branch
- Run `git diff main...HEAD --stat` to see file changes

### 2. Stage and Commit (if needed)

If there are unstaged changes:

- Run `git add .` to stage all changes
- Generate an intelligent commit message following Conventional Commits format:
  - Analyze the changes using `git diff --cached`
  - Create a message with format: `type(scope): description`
  - Types: feat, fix, refactor, docs, chore, style, test
  - Keep subject under 60 characters
  - Use present tense ("add feature" not "added feature")
- Run `git commit -m "message"` with the generated message

### 3. Push to Remote

- Check if branch has upstream: `git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null`
- If no upstream, push with: `git push -u origin <branch-name>`
- If upstream exists, push with: `git push`

### 4. Create Pull Request

- Analyze all commits in the branch (not just the latest commit!)
- Run `git log main..HEAD` and `git diff main...HEAD` to understand full scope
- Generate a comprehensive PR description in Korean including:
  - ## Summary (주요 변경사항, 3-5 bullet points)
  - ## Changes (상세 변경 내용)
    - Database changes (if any)
    - API changes (if any)
    - Frontend changes (if any)
    - Performance improvements (if any)
  - ## Breaking Changes (if any, with ⚠️ warning)
  - ## Test Plan (테스트 방법)
  - ## Environment Variables (if new vars added)
  - 🤖 Generated with [Claude Code](https://claude.com/claude-code)

- Create PR using: `gh pr create --title "title" --body "$(cat <<'EOF'\n[body]\nEOF\n)"`

### 5. Report Results

- Display the PR URL
- Show summary of what was committed and pushed
- Provide next steps (e.g., "PR created, ready for review")

## Important Guidelines

- **ALWAYS** analyze ALL commits in the branch, not just the latest one
- **NEVER** skip the diff analysis - it's critical for accurate PR descriptions
- **USE** Korean for PR title and description
- **FOLLOW** Conventional Commits format for commit messages
- **INCLUDE** 🤖 Generated with Claude Code attribution
- **CHECK** for breaking changes and highlight them with ⚠️
- **ENSURE** PR description accurately reflects all changes since diverging from main

## Example PR Title Formats

- `feat: 사용자 인증 기능 추가`
- `fix: 댓글 목록 렌더링 오류 수정`
- `refactor: 데이터베이스 스키마 구조 개선`
- `docs: API 문서 업데이트`
- `chore: 의존성 패키지 업데이트`

## Error Handling

- If there are merge conflicts, report them clearly
- If gh CLI is not available, provide instructions
- If no changes to commit, skip to pushing existing commits
- If already up to date with remote, inform user

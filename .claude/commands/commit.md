---
description: Analyze changes and create a commit with conventional commit message
---

# Smart Commit Command

You are a git commit assistant. Follow these steps to analyze changes and create an intelligent commit:

## Execution Steps

### 1. Analyze Git State

Run these commands in parallel:

- `git status` - Check working tree status
- `git diff --cached` - Show staged changes (if any)
- `git diff` - Show unstaged changes (if any)
- `git log -5 --oneline` - Show recent commit history for context

### 2. Determine Commit Scope

Based on the analysis:

- If there are **no staged changes** but there are **unstaged changes**:
  - Stage all changes with `git add .`
  - Analyze the newly staged changes
- If there are **no changes at all**:
  - Inform the user "Nothing to commit, working tree clean"
  - Exit gracefully
- If there are **only staged changes**:
  - Proceed with those staged changes

### 3. Generate Intelligent Commit Message

Analyze the changes and create a commit message following **Conventional Commits** format:

#### Format

```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

#### Type Selection Rules

- **feat**: New feature or functionality added
- **fix**: Bug fix
- **refactor**: Code refactoring without changing functionality
- **docs**: Documentation changes only
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, tooling, dependencies
- **i18n**: Internationalization changes

#### Scope Guidelines

- Use file/directory context: `api`, `ui`, `lib`, `components`, `cron`, etc.
- For multiple areas, use the primary one or omit scope
- Examples: `feat(api)`, `fix(ui)`, `refactor(lib)`

#### Subject Guidelines

- **50 characters or less**
- Use **imperative mood** ("기능 추가" not "기능을 추가했다")
- **No period** at the end
- **Always use Korean** for all commit messages
- Be specific about what changed

#### Body Guidelines (Optional but Recommended)

- Explain **WHY** the change was made, not what (the diff shows what)
- Include motivation, context, or important details
- Use bullet points for multiple changes
- Keep lines under 72 characters
- **Always include** the Claude Code attribution footer

### 4. Execute Commit

Create the commit using a HEREDOC for proper formatting:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### 5. Verify and Report

- Run `git status` to confirm commit success
- Display commit hash and summary
- Show branch status (ahead/behind remote)

## Important Guidelines

### Message Quality

- **BE SPECIFIC**: "add user authentication" not "update code"
- **BE CONCISE**: Keep subject under 50 characters
- **BE CLEAR**: Anyone should understand what changed without reading code
- **BE CONSISTENT**: Follow existing commit message style in `git log`

### Analysis Requirements

- **READ THE DIFF**: Always analyze actual code changes, don't guess
- **UNDERSTAND IMPACT**: Determine if it's feat/fix/refactor based on actual changes
- **CHECK CONTEXT**: Look at file paths and modified functions
- **IDENTIFY SCOPE**: Use the most relevant area of the codebase

### Multi-file Commits

When multiple files are changed:

1. Identify the **primary purpose** of the changes
2. Group related changes under one logical commit message
3. If changes are **unrelated**, suggest splitting into multiple commits
4. Use body to list major changes if needed

### Examples of Good Commit Messages

```
feat(dashboard): 자동화 일정 상태 카드 추가

최근 자동화 실행 내역을 실행 시간, 감지/삭제 개수,
상태 표시기와 함께 표시합니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
fix(api): 일일 통계의 타임존 처리 수정

UTC 날짜 계산을 수정하여 일일 사용자 통계 집계 시
타임존 오프셋을 올바르게 처리하도록 개선합니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
refactor: getUtcDate를 getStartOfDayInUtc로 이름 변경

함수 이름을 개선하여 주어진 타임존의 자정(00:00:00)을
UTC로 반환한다는 의미를 더 명확하게 전달합니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```
i18n: 기간 포맷팅에 다국어 지원 추가

하드코딩된 한글 문자열을 번역 키로 대체하여
여러 언어(ko, en)를 지원합니다.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Error Handling

- **If commit fails**: Show error message and suggest fixes
- **If nothing to commit**: Inform user gracefully
- **If there are conflicts**: Alert user to resolve first
- **If commit hook fails**: Show hook output and next steps

## Project-Specific Conventions

This project (Vybbi) uses:

- **Language**: Always use Korean for all commit messages (subject and body)
- **Style**: Conventional Commits strictly enforced
- **Footer**: Always include Claude Code attribution
- **Scope**: Use module names like `api`, `ui`, `dashboard`, `cron`, `lib`

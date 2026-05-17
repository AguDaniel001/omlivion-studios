# Gemini CLI Quota Minimization Rules

You are working under a strict daily token and API request quota. You must adhere to the following execution constraints to preserve resources:

## 1. Loop and Execution Limits
* **No Autopilot Prototyping**: Never execute multi-step iterative loops or self-correction rounds without explicit permission.
* **Ask Before Action**: Propose exactly one tool execution or shell command at a time. Wait for a user `[Y/N]` approval confirmation before proceeding.

## 2. Context Windows & Reading Limits
* **Targeted File Access**: Do not view entire directories or perform large codebase text sweeps. Explicitly ask me for files or paths if needed.
* **Snippets Only**: When inspecting local project files, read only the target block or function line-range. Do not load the complete source text.

## 3. Dense Token Optimization
* **Terse Outputs**: Provide brief, direct technical responses. Omit conversational filler, long code explanations, and verbose pleasantries.
* **Drafting First**: Show code modifications as minimal unified diff blocks (`+` and `-` lines) instead of printing entire rewrites of complete files.

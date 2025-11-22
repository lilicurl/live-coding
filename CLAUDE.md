# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository generates and manages full-stack interview coding exercises for React + Node.js/Fastify + GraphQL positions. Each exercise is a 1-hour live coding challenge with intentionally flawed starter code that candidates must improve.

## Repository Structure

```
live-coding/
├── rules/                    # Agent rules and memory
│   ├── challenge-generation.md   # Template/constraints for generating exercises
│   ├── challenge-history.md      # Registry of past exercises (prevent duplicates)
│   └── review-guidelines.md      # Code review rubric and format
├── exercise-XXX/             # Each exercise folder
│   ├── README.md             # Challenge description and rubric
│   ├── backend/              # Node.js/Fastify starter code
│   ├── frontend/             # React starter code
│   └── .solution/            # Reference solution with tests
├── AGENT_PROMPT.md           # Prompt for generating new challenges
└── REVIEW_PROMPT.md          # Prompt for reviewing candidate submissions
```

## Two Agent Workflows

### 1. Challenge Generation (AGENT_PROMPT.md)
- Check `rules/challenge-history.md` to avoid duplicate topics
- Create new `exercise-XXX` folder with README, starter code (with intentional flaws), and verified `.solution/`
- Run tests and verify solution works before committing
- Update `rules/challenge-history.md` with new topic

### 2. Code Review (REVIEW_PROMPT.md)
- Read exercise README for requirements and rubric
- Compare candidate code against `.solution/` reference
- Generate structured report: Summary → Detailed Review → Requirements Check → Solution Comparison
- Grade as Pass / Weak Pass / Fail

## Tech Stack for Exercises

- **Frontend**: React (Vite or Next.js)
- **Backend**: Node.js with Fastify
- **API**: GraphQL
- **Focus areas**: Architecture, SOLID, Clean Code, Error Handling

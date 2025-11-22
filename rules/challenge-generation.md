---
description: Rules for GENERATING challenges (the prompt constraints)
globs: exercise-*/README.md
---
# Interview Challenge Generation Rules

## Mission
Design a 1-hour live coding exercise for candidates applying to a Full-Stack (React + Node.js) position.

## Structure
1) EXERCISE OVERVIEW (FOR INTERVIEWER)
2) CANDIDATE INSTRUCTIONS (TO COPY/PASTE)
3) STARTER CODE DESCRIPTION
4) EXPECTED SOLUTION OUTLINE
5) EVALUATION CRITERIA (RUBRIC)

## General constraints
- Total expected time: ~60 minutes.
- Stack: React (Frontend), GraphQL, Node.js/Fastify (Backend).
- Focus: Architecture, code quality, engineering practices (SOLID, DRY, KISS).

## Validation Requirement
- The agent MUST implement a Reference Solution in `.solution/`.
- The agent MUST add automated tests to the solution.
- The agent MUST run these tests and/or manually verify the app (build & deploy check) before finishing.
# Project Plan: AI Challenges Repository

## Repository Structure
The `live-coding` repository will be organized as follows:

```
live-coding/
├── rules/
│     ├── challenge-generation.mdc   # Rules for GENERATING challenges (the prompt constraints)
│     └── challenge-history.mdc      # Memory of past challenges to avoid duplication
├── exercise-001/
│   ├── README.md                      # The Challenge Description (Candidate instructions)
│   ├── backend/                       # Starter backend code
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── frontend/                      # Starter frontend code
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── .solution/                     # (Optional) Reference solution for the interviewer
├── exercise-002/
│   └── ...
└── README.md                          # General repo info
```

## Cursor Rules Strategy

The agent will leverage `rules` to maintain consistency and "memory" across sessions.

### 1. `rules/challenge-generation.md`
*   **Purpose**: Enforces the format of the interview question (the "Senior Engineer" persona output).
*   **Content**: Contains the template required (Overview, Instructions, Starter Code, Evaluation).
*   **Trigger**: Applied when creating `README.md` in an `exercise-XXX` folder or when asked to "generate a challenge".

### 2. `rules/challenge-history.md`
*   **Purpose**: Acts as a "registry" of existing exercises.
*   **Content**: A list of previous topics to ensure diversity.
*   **Example**:
    ```markdown
    ---
    description: Registry of existing AI challenges to prevent duplicates
    globs: **/*.md
    ---
    # Existing Challenges
    - exercise-001: Booking System (React/Express) - Focus on ACID & State
    - exercise-002: Real-time Chat (React/Node) - Focus on WebSockets & Event Loop
    ```

## Agent Execution Flow

1.  **Init**: Agent checks `challenge-history.md`.
2.  **Plan**: Agent picks a new topic (e.g., "Inventory Management").
3.  **Generate**: Agent creates `exercise-003/README.md` using the structure from `challenge-generation.md`.
4.  **Code**: Agent scaffolds `backend` and `frontend` folders with "bad" but working code.
5.  **Update**: Agent appends the new topic to `challenge-history.md`.

# Generating New Exercises

This repository uses a **Claude Sonet Agent** workflow to autonomously generate high-quality, consistent coding challenges.

## Prerequisites
- **Codespace IDE** (or an environment with access to `claude-3.5-sonnet` models via API).
- Access to this repository.

## The Workflow

1.  **Open the Agent Prompt**:
    Open the file `AGENT_PROMPT.md` located in the root of this repository.

2.  **Start a Composer Session**:
    In Codespace, open the **Chat** pane.

3.  **Input the Prompt**:
    Copy the *entire content* of `AGENT_PROMPT.md` and paste it into the chat.

4.  **Watch the Magic**:
    The Agent will:
    *   Scan the `rules/challenge-history.md` file to see what topics are already covered.
    *   Search the web for a new, relevant interview topic (e.g., "Real-time Dashboard", "Kanban Board").
    *   Generate a new folder (e.g., `exercise-002`).
    *   Scaffold the `backend` and `frontend` code.
    *   Write the `README.md` with candidate instructions.
    *   **Implement the Reference Solution**: Create a `.solution/` folder with a complete, "Exceeds Expectations" implementation.
    *   **Run Tests**: The agent will automatically install dependencies and run tests (Jest/Vitest) to verify the solution works.
    *   **Update the History**: Automatically append the new topic to `challenge-history.md` to prevent future duplicates.

## Customizing the Generation

If you want a specific topic instead of a random one, you can append a user instruction after pasting the prompt:

> "Follow the instructions in AGENT_PROMPT.md, but specifically create an exercise about a **Drag-and-Drop File Upload Service**."

## Verifying the Output

After the agent finishes:
1.  Go to the new `exercise-XXX` folder.
2.  Run `npm install` and `npm start` in both subfolders to ensure the starter code works.
3.  Check that the `README.md` instructions are clear.
4.  (Optional) Run the solution tests yourself to confirm:
    ```bash
    cd exercise-XXX/.solution/backend && npm test
    cd exercise-XXX/.solution/frontend && npm test
    ```
5.  Commit the changes:
    ```bash
    git add .
    git commit -m "feat: Add exercise-XXX (Topic Name)"
    git push
    ```
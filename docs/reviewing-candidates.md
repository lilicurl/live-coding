# Reviewing Candidate Submissions

This repository includes a **Review Agent** workflow to automatically evaluate candidate submissions against the reference solution and rubric.

## The Workflow

1.  **Receive Candidate Submission**:
    Ensure the candidate's code is placed in the `exercise-XXX/backend` and `exercise-XXX/frontend` folders (overwriting the starter code).

2.  **Open the Review Prompt**:
    Open the file `REVIEW_PROMPT.md` located in the root of this repository.

3.  **Start a Composer/Chat Session**:
    In Codespace, open the **Chat** pane.

4.  **Input the Prompt**:
    Copy the content of `REVIEW_PROMPT.md` and paste it into the chat. You can simply say:
    
    > "Please review the solution for exercise-001."

5.  **Receive the Report**:
    The Agent will:
    *   Read the requirements in `exercise-001/README.md`.
    *   Analyze the candidate's code.
    *   Compare it against the ideal solution in `exercise-001/.solution/`.
    *   Generate a Markdown report with:
        *   **Pass/Fail Status**.
        *   **Strengths & Weaknesses**.
        *   **Detailed Code Feedback** (Backend & Frontend).
        *   **Requirements Checklist**.

## Manual Grading vs. AI Grading

While the AI agent provides a strong baseline and detailed code analysis, a human interviewer should always:
*   Verify the "Fail" judgments (sometimes valid alternative approaches are flagged).
*   Assess the "Communication" aspect of the rubric during the live interview.

# Exercise 001: Shopping Cart with Inventory Management

## 1. Exercise Overview

### Scenario
You're building a simplified e-commerce shopping cart that syncs with real-time inventory. Products have limited stock, and the cart must reflect availability and handle concurrent updates gracefully.

### What's Implemented
- Basic React frontend with product listing
- Fastify backend with GraphQL endpoint
- In-memory data store with products

### What You Must Do
- Fix architectural issues in the starter code
- Implement add-to-cart with inventory validation
- Handle error states properly
- Improve code organization following SOLID principles

### Skills Evaluated
- React state management
- GraphQL API design (queries + mutations)
- Error handling (client & server)
- Clean Code & separation of concerns
- Optimistic UI updates

---

## 2. Candidate Instructions

### User Story
> As a shopper, I want to add products to my cart while seeing real-time stock availability, so I never order more than what's available.

### Functional Requirements
1. Display a list of products with name, price, and available stock
2. Add products to cart (decrement available stock)
3. Remove products from cart (restore stock)
4. Show cart total (quantity and price)
5. Prevent adding more items than available stock
6. Display appropriate error messages when operations fail

### Non-Functional Requirements
- Clean separation between UI components and business logic
- Proper error handling at API and UI layers
- No prop drilling beyond 2 levels
- GraphQL mutations should return updated state
- Code should be readable and maintainable

### Constraints
- No authentication required
- Use provided in-memory store (no external DB)
- Keep existing GraphQL schema structure
- Time limit: 60 minutes

---

## 3. Starter Code Description

### Structure
```
exercise-001/
├── backend/
│   ├── package.json
│   └── src/
│       └── index.js        # Fastify server with GraphQL (messy)
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.jsx         # Everything in one file (anti-pattern)
│       └── main.jsx
```

### Intentional Flaws in Starter Code
1. **Backend**: All logic in one massive file, no error handling, mutations don't validate stock
2. **Frontend**: God component with all state and logic, prop drilling, no error states
3. **No separation**: Business logic mixed with UI rendering
4. **Missing**: Cart total calculation, stock validation, error messages

---

## 4. Expected Solution Outline

### Architecture Guidance
- **Backend**: Separate resolvers, services, and data access layers
- **Frontend**: Use React Context or custom hooks for cart state
- **Error Handling**: GraphQL errors with proper codes, UI error boundaries or states
- **Validation**: Server-side stock checks before mutations succeed

---

## 5. Evaluation Criteria (Rubric)

| Criteria | Below Expectations | Meets Expectations | Exceeds Expectations |
|----------|-------------------|-------------------|---------------------|
| **Architecture** | Logic scattered, no clear layers | Basic separation of concerns | Clean layers, dependency injection |
| **State Management** | Prop drilling, scattered state | Centralized cart state | Context/hooks with optimistic updates |
| **Error Handling** | No error handling | Basic try/catch, shows errors | Graceful degradation, retry logic |
| **GraphQL Design** | Mutations don't return data | Proper return types | Efficient queries, proper error codes |
| **Code Quality** | Hard to read, no comments | Readable, consistent style | Self-documenting, SOLID principles |
| **Testing** | No tests | Basic happy path tests | Edge cases, error scenarios |

### Pass Criteria
- All functional requirements working
- Basic error handling present
- Code reasonably organized

### Fail Criteria
- Core functionality broken
- No error handling
- Unchanged starter code structure

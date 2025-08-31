# ADR-001: Initial Technology Stack

## Status
<!-- [TODO: Accepted/Proposed/Deprecated] -->
Proposed

## Context
<!-- [TODO: Describe the situation and what needs to be decided]
Consider:
- What are your constraints?
- What are your goals?
- What factors influence this decision? -->
My initial tech stack for this project

## Decision
<!-- [TODO: State what you've decided to do]
Example format:
We will use [technology] for [purpose] because [reason]. -->
We will be using Next.js + React for both the frontend and backend because it allows me to control both aspects under one tech stack.

## Consequences

### Positive
- Easier control and management
- Can control backend easily when frontend has issues, and vice versa. 

### Negative
[TODO: List challenges or downsides]
- Harder to distinguish, other solutions such as Vite+react/Node.js will separate the two.

## Alternatives Considered

Vite+React

### Option 1: Vite+React, either Node.js or Python as backend
- **Pros**: Cleaner, Easier to integrate new features.
- **Cons**: Not as seamless.
- **Decision**: Undecided

## Notes
<!-- [TODO: Any additional thoughts or future considerations] -->
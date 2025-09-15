# ADR-002: Data Storage Strategy

## Status
Decided, not implemented 

## Context
Decide how to store data

## Decision
Use SQLite/WASM, since it seems to be more common for local storage

## Consequences
Unsure

### Positive
Easy SQL integration

### Negative
Not using a proper backend

## Migration Plan
Example:
- Weeks 1-4: Store stuff directly on local storage/cache
- Weeks 5-7: Integrate more on SQLite
- Weeks 8-10: Full implementation, look at separate backend solutions

## Notes
None yet
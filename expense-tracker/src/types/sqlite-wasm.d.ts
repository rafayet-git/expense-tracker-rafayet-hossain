// Type shim for '@sqlite.org/sqlite-wasm'
// The package does not ship proper named export typings for `sqlite3Worker1Promiser`.
// Runtime usage works with a named import in bundlers (re-exported), but TS complains.
// We declare the module shape minimally so the existing import compiles.
declare module '@sqlite.org/sqlite-wasm' {
  export const sqlite3Worker1Promiser: any;
}

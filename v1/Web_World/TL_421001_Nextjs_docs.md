# Architecture

## Fast refresh

- For dev env
- Edit a file that only exports React component(s), Fast Refresh will update the code only for that file, and re-render your component
- Edit a file that's imported by files outside of the React tree, Fast Refresh will fall back to doing a full reload
- Error Resilience: Syntax or Runtime
    - Not lose component state after fixed

## Compiler

- Using SWC(Rust): allows Next.js to transform and minify your JavaScript code for production
    - Why? Rust's support for WASM + Rust have strong community

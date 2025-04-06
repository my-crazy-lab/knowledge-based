# Fundamentals

1. type-check your code : 
    - `deno check module.ts`
2. Node compatible, support npm packages: 
    - `import { Hono }from "npm:hono";`
3. Use Node modules:
    - `import * as os from "node:os";`
4. Deno resolve npm packages to a central global npm cache
    - **Uses less space and keeps your project directory clean**
5. Deno ships with a built-in linter that is written with performance in mind
    - `deno lint`
6. Deno ships with a built-in formatter that can optionally format your code according to the Deno style guide
    - `deno fmt`
7. Deno provides a built-in test runner
    - `deno test`
8. Workspaces for monorepos
    - `"workspace": ["./add", "./subtract"]`

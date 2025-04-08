# Chromium docs

## Sandbox

`we can only truly secure a system if we fully understand its behaviors with respect to the combination of all possible inputs in all possible states`

- Sandbox leverages the OS-provided security to allow code execution that cannot make persistent changes to the computer or access information that is confidential
- Design principles
    - Don't extend the OS kernel with a better security model
    - The sandbox should work even if the user cannot elevate to super-user
    - Assume sandboxed code is malicious code
    - Emulation and virtual machine solutions do not by themselves provide security

# Electron docs

## Processes

Sandboxed processes can only freely use CPU cycles and memory

## Security

- JavaScript can access the filesystem, user shell, and more. This allows you to build high quality native applications, but the inherent security risks scale with the additional powers granted to your code.
- In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) — if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.
- Concept
    - Security is everyone's responsibility
    - Isolation for untrusted content

## Distribute application

2 ways to distribute your application:
- With prebuilt binaries
- With an app source code archive
# Overview

## JS frame rate (JavaScript thread)

- Most React Native applications, the business logic will run on the JavaScript thread
- Update UI will send over to the native side at the end of each iteration of event loop, before frame dealine.
    - Animation, async control by JS would appear freeze during rendering.
    - Longer than 100ms, user can feel it.
- Usually happen at **`Navigator`** transitions
    - when you push a new route, the JavaScript thread needs to render all of the components necessary for the scene
- Delay when use **`TouchableOpacity`**
    - Because JavaScript thread is busy and cannot process the raw touch events
    - As result, user can feel `lag` when touch somethings.

## UI frame rate (main thread)

-  **`ScrollView`** and **`NavigatorIOS`** live in main thread (not through JS thread), so it's feel better than **`Navigator`**

## Common problems

- Dev mode always slower than production, because runtime provide warning and error messages
- Logger can cause a big bottleneck in the JavaScript thread, so make sure remove them when bundling
    - Why? It's sync, when logging complex object it take extra time. 
- **`ListView`** is bad for large list, use **`SectionList`** or **`FlatList`** instead

# Speeding up your Build phase

- Only build App local based on the Arch needed `--active-arch-only`
- Use compiler cache

# Optimizing JS loading

- Use Hermes
- Lazy-load 
- Call `require` inline or Automatically inline require calls
- Use random access module bundles (non-Hermes) (also known as RAM bundles)
    - limit the amount of JavaScript code that needs to be parsed and loaded into memory. Each module is stored as a separate string (or file) which is only parsed when the module needs to be executed.

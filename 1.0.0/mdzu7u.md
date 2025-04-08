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

## Common sources

- 

# Compare Web stream and Nodejs stream

- Backpressure handling
    - WebStream: Automatic via queuing strategy	
    - NodejsStream: Manual implementation required
- Data types
    - WebStream: Handles any JavaScript value natively	
    - NodejsStream: Primarily Buffer/string, object mode available
- Cork/Uncork	
    - WebStream: No cork/uncork support yet	
    - NodejsStream: Supports cork and uncork methods

# renderToString 

- Legacy, renders a React tree to an HTML string.
- Returns a string immediately, so it does not support streaming content as it loads

# renderToPipeableStream 

- Renders a React tree to a pipeable Node.js Stream.
    - React currently only supports piping to one writable stream

# renderToReadableStream 

- Renders a React tree to a Readable Web Stream, `ReadableStream`

# renderToStaticMarkup 

- Renders a non-interactive React tree to an HTML string
- Call same function with `renderToString`
- Cannot be hydrated
- Useful if you want to use React as a simple static page generator or rendering completely static content like emails

# Web Streams API

## Concept

- Only reader/writer can read/write a stream at a time, by locked mechanism
- Byte stream:  extended version of a conventional stream for reading underlying byte sources
- An internal queue keeps track of the chunks that have been written to the stream
- Backpressure: the process by which a single stream or a pipe chain regulates the speed of reading/writing
    - When a stream later in the chain is still busy and isn't yet ready to accept more chunks, it sends a signal backwards through the chain to tell earlier transform streams -> descrease bottleneck

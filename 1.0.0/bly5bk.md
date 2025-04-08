# Bundle format

- **Plain bundle**
    - standard, all files in 1 global .js file
    - useful for environments that expect a JS only bundle (as browser)
- **Indexed RAM** bundle
    - compose bundle as binary file
    - optimal for an environment that is able to load all code in memory at once
    - usually use by iOS
- **File RAM** bundle
    - usually use by Android: access to zipped file faster

# Caching

- Use **local cache** of transformer modules -> doesn't need to retransform modules unless the source changed
- **Remote cache**: reducing time spent locally building, setup (at Meta):
    - Storage backend: S3 bucket
    - metro build + HttpStore
    - Config Metro at Dev machines, use HttpGetStore

# Module resolution

- Is the process of translating module names to module paths at build time
- Implement by: **Nodejs resolution** algorithms + **specific features**:
    - Haste
        - use globally-unique name anywhere
    - Platform extensions
        - write platform-specific versions
    - Asset extensions and image resolutions
        - automatically select the best version of an image asset based on the device's screen density at runtime
    - Custom resolvers
        - override almost everything about how modules are resolved.
- Resolution algorithm [metro-resolver](https://github.com/facebook/metro/blob/main/packages/metro-resolver/src/resolve.js)

# Source map format

- Source maps are tools in modern web for debugging easier
    - **x_facebook_sources**
    - **x_google_ignoreList**: by default

## Fast refresh

- Work in module only export component(s)
- Module imported outside React tree -> full reload

## Metro concept

- Resolution
    - Build a graph of all modules
    - Happen in parallel with transformation stage
- Transformation
    - All modules go through transformer
    - Convert modules to format that is understandable by target platform (ISO, Android)
- Serialization
    - When transformer done, serializer compile modules to bundles (.js file)

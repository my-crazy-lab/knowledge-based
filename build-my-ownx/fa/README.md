# Build a web browser by JS

## HTML
- Build a parser (either “by hand” or with a library or parser generator) that takes a subset of HTML as input and produces a tree of DOM nodes.
- Modify robinson’s HTML parser to add some missing features, like comments. Or replace it with a better parser, perhaps built with a library or generator.
- Create an invalid HTML file that causes your parser (or mine) to fail. Modify the parser to recover from the error and produce a DOM tree for your test file.

## CSS
- Implement your own simplified CSS parser and specificity calculation.
- Extend robinson’s CSS parser to support more values, or one or more selector combinators.
- Extend the CSS parser to discard any declaration that contains a parse error, and follow the error handling rules to resume parsing after the end of the declaration.
- Make the HTML parser pass the contents of any <style> nodes to the CSS parser, and return a Document object that includes a list of Stylesheets in addition to the DOM tree.

## Style
In addition to writing your own selector matching and value assignment code, for further exercise you can implement one or more of the missing pieces discussed above, in your own project or a fork of robinson:

- Cascading
- Initial and/or computed values
- Inheritance
- The style attribute

Also, if you extended the CSS parser from Part 3 to include compound selectors, you can now implement matching for those compound selectors.

## Boxes
Some extra ideas for the ambitious implementer:

- Collapsing vertical margins.
- Relative positioning.
- Parallelize the layout process, and measure the effect on performance.

If you try the parallelization project, you may want to separate the width calculation and the height calculation into two distinct passes. The top-down traversal for width is easy to parallelize just by spawning a separate task for each child. The height calculation is a little trickier, since you need to go back and adjust the y position of each child after its siblings are laid out.

## Paiting
If you’re playing along at home, here are some things you might want to try:
- Write an alternate painting function that takes a display list and produces vector output (for example, an SVG file) instead of a raster image.
- Add support for opacity and alpha blending.
- Write a function to optimize the display list by culling items that are completely outside of the canvas bounds.
- If you’re familiar with OpenGL, write a hardware-accelerated painting function that uses GL shaders to draw the rectangles.

# Webpack/babel transpilation size experiments

The purpose of this repo is to see how much smaller webpack bundles can become
when we in the transpilation phase target newer more capable browsers. In these
experiments we take advantage of babel-loader and @babel/preset-env's option to
transpile code so that it works in all browsers that are so new so that they
support script tags with the type attribute set to "module". By doing so only
javascript's very new features are converted to old javascript syntax and for
example arrow functions and template literals are not transformed in any way
in the outputted code.

A presentation/slideshow describing the different comparisions I made can be
found here https://slides.com/trondfroding/performance-lab

The source folder contains a couple of files that each is compiled separately by
webpack to it's own bundle. The webpack runtime, react and react-dom is
extracted to separate bundles so that you easily can see approximately how much
code each file generates when it's transpiled to semi modern vs old js code.
Each bundle (outputed file) still contains a little unrelevant code though. If
we for example take a look at the dist/arrow-function.modern.js bundle (formated
with prettier):

```javascript
(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    3: function(o, n) {
      (({ name: o }) => {
        console.log(`Hello ${o}!`);
      })({ name: "world" });
    }
  },
  [[3, 0]]
]);
```

we can see that it's only three lines that represents the code in the source
file (src/arrow-function.js):

```javascript
(({ name: o }) => {
  console.log(`Hello ${o}!`);
})({ name: "world" });
```

all other lines are related to webpacks runtime and the loading of modules.

## Table of results

| Output file name                                      |      Size | Savings |
| ----------------------------------------------------- | --------: | ------: |
| arrow-function.js                                     | 164 bytes |         |
| arrow-function.modern.js                              | 144 bytes |     12% |
| index.js                                              | 795 bytes |         |
| index.modern.js                                       | 423 bytes |     47% |
| react-hooks-state.js                                  | 744 bytes |         |
| react-hooks-state.modern.js                           | 731 bytes |      2% |
| class.js                                              | 795 bytes |         |
| class.modern.js                                       | 423 bytes |     47% |
| react-class-state.js                                  |  1.72 KiB |         |
| react-class-state.modern.js                           | 459 bytes |     73% |
| ten-arrow-functions.js                                | 877 bytes |         |
| ten-arrow-functions.modern.js                         | 677 bytes |     23% |
| runtime.js                                            |  1.42 KiB |         |
| runtime.modern.js                                     |  1.42 KiB | no diff |
| vendors~react-class-state~react-hooks-state.js        |   114 KiB |
| vendors~react-class-state~react-hooks-state.modern.js |   114 KiB | no diff |

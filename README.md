Picture Purrfect
=======

Demonstration of integration between React and TypeScript based on James Brantly's https://github.com/jbrantly/reactconf.

For more details see:

* [React.js Conf 2015: Static typing with Flow and TypeScript by James Brantly](http://conf.reactjs.com/schedule.html#static-typing-with-flow-and-typescript)
* https://github.com/jbrantly/reactconf

## Getting Started

You must have [npm](https://www.npmjs.org/) and [grunt](http://gruntjs.com/) installed on your computer. From the root project directory run these commands from the command line:

```
npm install
```

That will install all dependencies. To build the project, first run this command:

```
grunt build
```

That will build `public/js/bundle.js`, which are used by `public/index.html`.
Once you've built the project you can open `public/index.html` in your browser.



## Differences between James Brantly's reactconf and this repo

James Brantly's reactconf uses [webpack](http://webpack.github.io/) and [ts-jsx-loader](https://github.com/jbrantly/ts-jsx-loader).
This repo uses [grunt](http://gruntjs.com/) and [grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace) with
[react-tools](https://www.npmjs.com/package/react-tools) and [grunt-browserify](https://github.com/jmreidy/grunt-browserify).

The main reason for [choosing browserify over webpack](http://blog.namangoel.com/browserify-vs-webpack-js-drama) is that
browserify injects node.js polyfills like [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter),
which is i.e. used by [flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc).

This repo supports minification using Google's Closure Compiler.

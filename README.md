# <img alt="Style It" height="60" src="https://s3.amazonaws.com/style-it/style-it.svg" />
Style It is a component for writing plaintext CSS in JavaScript apps. Use the same
familiar CSS syntax you already know and love -- now inside of your components.

[<img title="Version" src="https://img.shields.io/npm/v/style-it.svg?style=flat-square" />](https://www.npmjs.org/package/style-it) [<img title="Maintenance Status" src="https://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square" />](https://github.com/buildbreakdo/style-it/pulse) [<img title="Build Status" src="https://travis-ci.org/buildbreakdo/style-it.svg?branch=master" />](https://travis-ci.org/buildbreakdo/style-it/) [![Coverage Status](https://coveralls.io/repos/github/buildbreakdo/style-it/badge.svg?branch=master)](https://coveralls.io/github/buildbreakdo/style-it?branch=master)

Proponent of eat your own dog food. If you want to see Style It live head over to [Pholder.com](https://pholder.com/r/oldschoolcool), serving thousands daily. Question, issue, or request? [Open an issue](https://github.com/buildbreakdo/style-it/issues) or [reach out on gitter](https://gitter.im/Style-It/Lobby).

| Feature               | Style It | Inline Style |           |
| :-------------------- | :------------: | :----------: | :--------- |
| Nothing&nbsp;new to learn | &#10004;       |              | With Style It, you use the same familiar CSS syntax you already know and love -- now inside of your components. Just wrap your component with Style It and start writing CSS. |
| Fully featured        | &#10004;       |              | There is no abstraction to go through -- Style It is just CSS. Use any CSS feature available. |
| Scoped selectors      | &#10004;       |              | Move your CSS out of the global name space. Style It automatically scopes selectors for you to the component's root element and acts as a polyfill for sub-tree scoping (learn more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)). |
| [Layout styling](#layout-styling) | &#10004;       |              | Style your layout without using an external CSS file. Style It makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles. |


<p align="right">
    <b><a href="#user-content-more-features">SEE MORE &raquo;</a></b>
</p>

### Installation

Install with npm.

```sh
npm install style-it --save
```
[![NPM Stats](https://nodei.co/npm/style-it.png?downloads=true)](https://npmjs.org/package/style-it)

Alternatively, if you are not using npm as your package manager the files can be downloaded directly from the [npm content delivery network](https://unpkg.com/style-it/).

### Usage
Style It takes advantage of ES2015 / ES6 specification for Template Literals (previously "template strings") to write plaintext CSS in JavaScript. Use of Template Literals enables multi-line strings, string interpolation, and use of curley brackets / braces to declare CSS rules.

Template Literals are enclosed by the back-tick (\` \`) (grave accent) character instead of double or single quotes. Learn more about Template Literals on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

#### Functional syntax [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/9ckvkeec/1/)

In:
```js
import React from 'react';
import Style from 'style-it';

class Intro extends React.Component {
  render() {
    return Style.it(`
      .intro {
        font-size: 40px;
      }
    `,
      <p className="intro">CSS-in-JS made simple -- just Style It.</p>
    );
  }
}

export default Intro;
```

Out:
```html
<p class="intro _scoped-1">
  <style type="text/css">
    ._scoped-1.intro {
      font-size: 40px;
    }
  </style>

  CSS-in-JS made simple -- just Style It.
</p>
```

#### JSX syntax [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/8mjcqv6e/1/)

In:
```js
import React from 'react';
import Style from 'style-it';

class Intro extends React.Component {
  render() {
    return (
      <Style>
        {`
          .intro {
            font-size: 40px;
          }
        `}

        <p className="intro">CSS-in-JS made simple -- just Style It.</p>
      </Style>
    );
  }
}

export default Intro;
```

Out:
```html
<p class="intro _scoped-1">
  <style type="text/css">
    ._scoped-1.intro {
      font-size: 40px;
    }
  </style>

  CSS-in-JS made simple -- just Style It.
</p>
```

#### Component with Component Root Node [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/2vo4yov4/1/)
Let's say we have two components `ParentComponent` and `ChildComponent` defined as follows (note the root node in the `ParentComponent` is another component):

```js
...
class ParentComponent extends Component {
    render() {
        return (
            <ChildComponent>
                <p> Some stuff </p>
            </ChildComponent>
        )
    }
}
...
```

```js
...
class ChildComponent extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
...
```

The child component is a typical passthrough component, that takes the props (in this case `<p> Some stuff </p>`) and renders them.

A core feature of Style It are scopes, you do not have to worry about global CSS name collisions because each CSS rule is scoped to it's own sub-tree (poly-like fill for [scoped attribute](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)). To achieve this, a scoping className is added. This works automagically when component root nodes are types like `<div>`, `<span>`, `<p>`, etc. When the root node of a component is another component, this becomes a much more tricky problem because it is not known how deep the component root node nesting will go (e.g., multiple passthrough components composed inside of one another).

For this reason, components which serve as root nodes for other components must have their `className` attribute set to `this.props.className` to have the CSS scoping class name properly set (without the scope class name CSS styles will not apply). So the ChildComponent (since it is used as a root node in the ParentComponent) becomes:

```js
...
class ChildComponent extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}
...
```

So all we added was an explicit className assignment from props (this snippet `className={this.props.className}`). Would argue that this is best practices anyway for a component that can be a root node; likely should use the spread operator (e.g., `{...this.props}`) to cover all your bases and include events a would be user of your component may attach.

If you would like to play with this scenario online, you can [open this example in JSFIDDLE](https://jsfiddle.net/pk9L2j4d/1/).

### Additional Usage

#### JavaScript variables in your CSS [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/jw9hpfxm/1/)
In:
```js
import React from 'react';
import Style from 'style-it';

class Intro extends React.Component {
  render() {
    const fontSize = 13;

    return Style.it(`
      .intro {
        font-size: ${ fontSize }px;  // ES2015 & ES6 Template Literal string interpolation
      }
      .package {
        color: blue;
      }
      .package:hover {
        color: aqua;
      }
    `,
      <p className="intro">CSS-in-JS made simple -- just Style It.</p>
    );
  }
}

export default Intro;
```

Out:
```html
<p class="intro _scoped-1">
  <style type="text/css">
    ._scoped-1.intro {
      font-size: 13px;
    }
    ._scoped-1 .package {
      color: blue;
    }
    ._scoped-1 .package:hover {
      color: aqua;
    }
  </style>

  CSS-in-JS made simple -- just Style It.
</p>
```

#### Layout styling[<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/r3hhzaze/1/)
Style your layout without using an external CSS file. Style It makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles (uses JSX syntax).

In:
```js
import React from 'react';
import Style from 'style-it';

class App extends React.Component {
  render() {
    return (
      <div>
        <Style>
          {`
            body {
              font-size: small;
              font-family: arial;
            }
            h1 {
              font-size: large;
            }
            h2 {
              font-size: medium;
            }
            h3 {
              font-size: small;
            }
            a {
              color: blue;
            }
            a:hover {
              color: aqua;
            }
         `}
        </Style>

        <header />
        <main />
        <footer />
      </div>
    );
  }
}

export default App;
```

Out:
```html
<div>
  <style type="text/css">
    body {
      font-size: small;
      font-family: arial;
    }
    h1 {
      font-size: large;
    }
    h2 {
      font-size: medium;
    }
    h3 {
      font-size: small;
    }
    a {
      color: blue;
    }
    a:hover {
      color: aqua;
    }
  </style>

  <header></header>
  <main></main>
  <footer></footer>
</div>
```
### More Features

| Feature                                   | Style It    | Inline Style |            |
| :----------------------------------------- | :---------------: | :----------: | :--------- |
| Increase cohesion     | &#10004;       | &#10004;     | Self contained and complete components. With Style It there is no need to fragment your component by creating an external CSS file when you need to use pseudo-classes, pseudo-selectors, at-media rules, or one of Reacts unsupported vendor prefixes (like flexbox or cursor grab). |
| Write less code       | &#10004;       |              | Use the right tool for the right job. With Style It the full power of CSS is available so we can stop reimplementing CSS language features like `:hover` and `nth-of-type` in JavaScript. |
| Faster build times                        | &#10004;          | &#10004;     | Remove the preprocessor middle man -- this is just CSS. Style It brings back the simplicity of writing CSS and removes the need for managing and executing a build step. |
| Increase readability                      | &#10004;          |              | Maintain the simplicity, symmetry, and beauty of HTML's open and close syntax. With Style It you can achieve cohesion and clean separation while still bringing component concerns together as a single self-contained unit of code. |
| Isomorphic                                | &#10004;          | &#10004;     | Style It is completely isomorphic and renders the same markup on server and client. |
| Increase new&nbsp;hire productivity | &#10004;          | &#10004;     | On boarding of new developers is quick and easy with Style It -- there is nothing new to learn. Get your new developers styling today! |
| Better workflow                           | &#10004;          |              | Better workflow, a classic workflow. Not often we are able to say that, because Style It requires no transformations to your CSS you can make adjustments in your browser and simply copy and paste the style rules into your component. |
| Easily&nbsp;portable                           | &#10004;          |              | By simply being CSS Style It makes porting styles elsewhere easy with no special syntax or quirks to transform. |
| Share styles                              | &#10004;          | &#10004;     | Easily share styles across multiple components by leveraging JavaScript import notation you already know.|
| Small size                                |                   |              | Style It is tiny at only 1.84kB gzipped. |
| Better composition                        | &#10004;          |              | More easily evaluate when to break down a component. CSS complexity is an oft forgotten input when evaluating component complexity (+selectors, +pseudo states). Unifying HTML-CSS-JS in one place ensures CSS complexity is a part of your -- when should I decompose -- equation. |

### Behind The Scenes (bonus)

#### How scopes work
To isolate styles Style It iterates over child component prop data and generates a hash that is used as a scoping class. Preference would be to use `Math.random()` however HTML rendered on the server would not be identical to the HTML rendered on the client. Use of `Math.random()` would create a server-client mismatch and benefits of the serverside render would be lost. Working within these constraints, Style It collects child component props and hashes them to generate a -- unique as possible -- identifier on client and server. Relative to how iterating through children is historically done, by going to the DOM and reading values, React allows us to perform this operation incredibly fast by leveraging the component hierarchy already held in memory. The hash of the prop data is then used to create a class name (e.g., _scope-472614893) which is automatically prefixed to selectors for you.

#### Optimization
Firm believer in Don Knuth's Literate Programmer movement: 'the most important function of computer code is to communicate the programmer's intent to a human reader' and that we should not prematurely optimize; optimizations tend to vary and be scenario specific, making code less idiomatic and obtuse, bad for readability and maintainability.

Point being: _You probably do not need to worry about this section._

That said, every usage scenario cannot be predicted, so an escape hatch is built into the library. If performance is sluggish this is potentially due to class name scope thrashing. Prop data used to create the class name scope is changing quickly causing the DOM sub-tree to rerender (e.g., live data). To tell Style It to ignore this prop during hash generation mark the prop as internal by prefixing `_` to the prop name (e.g, `_someProp`).

Props like `value` on `<input />` and `<textarea />` are automatically ignored, as are props internal to React (they are not idempotent and change from server to client).


### License
[MIT](LICENSE). Copyright © 2016-present Joshua Robinson.

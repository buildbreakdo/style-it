# <img alt="Style It" height="60" src="https://s3.amazonaws.com/style-it/style-it.svg" />
Style It is a component for writing plaintext CSS in JavaScript apps. Use the same
familiar CSS syntax you already know and love -- now inside of your components.

[<img title="Version" src="https://img.shields.io/npm/v/style-it.svg?style=flat-square" />](https://www.npmjs.org/package/style-it) [<img title="License" src="https://img.shields.io/dub/l/vibe-d.svg?maxAge=2592000?style=flat-square" />](https://github.com/buildbreakdo/style-it/blob/master/LICENSE) [<img title="Maintenance Status" src="https://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square" />](https://github.com/buildbreakdo/style-it/pulse) [<img title="Build Status" src="https://travis-ci.org/buildbreakdo/style-it.svg?branch=master" />](https://travis-ci.org/buildbreakdo/style-it/) [![Coverage Status](https://coveralls.io/repos/github/buildbreakdo/style-it/badge.svg?branch=master)](https://coveralls.io/github/buildbreakdo/style-it?branch=master)

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

Alternatively, if you are not using npm as your package manager the files can be downloaded directly from the [npm content delivery network](https://unpkg.com/style-it/).

### Usage
Style It takes advantage of ES2015 / ES6 specification for Template Literals (previously "template strings") to write plaintext CSS in JavaScript. Use of Template Literals enables multi-line strings, string interpolation, and use of curley brackets / braces to declare CSS rules in JSX.

Template Literals are enclosed by the back-tick (\` \`) (grave accent) character instead of double or single quotes. Learn more about Template Literals on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

####Functional syntax [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/y2pnqh9e/24/)

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

####JSX syntax [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/y2pnqh9e/26/)

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

### Additional Usage

#### JavaScript variables in your CSS [<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/y2pnqh9e/44/)
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

#### Layout styling[<img title="OPEN IN JSFIDDLE" align="right" src="https://img.shields.io/badge/OPEN%20IN%20JSFIDDLE--eaeff2.svg" />](https://jsfiddle.net/y2pnqh9e/45/)
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
| Safe by default       | &#10004;       | &#10004;     | Escaping of CSS property-values is automatically handled for you using the same library React uses for inline styles. Like with React inline styles, Style It CSS property-values are safe by default. |
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

### License
[MIT](LICENSE). Copyright © 2016-present Joshua Robinson.

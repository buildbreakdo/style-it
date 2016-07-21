# <img alt="Reactive Style" height="60" style="width: auto;" src="https://github.com/buildbreakdo/reactive-style/blob/master/logo/logo.png" />

Reactive Style is a component for writing plaintext CSS in JavaScript apps. Use the same 
familiar CSS syntax you already know and love -- now inside of your components.

[<img title="Version" src="https://img.shields.io/npm/v/reactive-style.svg?style=flat-square" />](https://www.npmjs.org/package/reactive-style) [<img title="License" src="https://img.shields.io/dub/l/vibe-d.svg?maxAge=2592000?style=flat-square" />](https://github.com/buildbreakdo/reactive-style/blob/master/LICENSE) [<img title="Maintenance Status" src="https://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square" />](https://github.com/buildbreakdo/reactive-style/pulse)

| Feature               | Reactive Style | Inline Style |           |
| :-------------------- | :------------: | :----------: | :--------- |
| Nothing&nbsp;new to learn | &#10004;       |              | With Reactive Style, you use the same familiar CSS syntax you already know and love -- now inside of your components. Just wrap your component with Reactive Style and start writing CSS. |
| Fully featured        | &#10004;       |              | There is no abstraction to go through -- Reactive Style is just CSS. Use any CSS feature available. |
| Scoped selectors      | &#10004;       |              | Move your CSS out of the global name space. Reactive Style automatically scopes selectors for you to the component's root element and acts as a polyfill for sub-tree scoping (learn more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)). |
| [Layout styling](#layout-styling) | &#10004;       |              | Style your layout without using an external CSS file. Reactive Style makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles. |


<p align="right"> 
    <b><a href="#user-content-more-features">SEE MORE &raquo;</a></b>
</p>

### Installation

Install with npm.

```sh
npm install reactive-style --save
```

Alternatively, if you are not using npm as your package manager the files can be downloaded directly from the [npm content delivery network](https://npmcdn.com/reactive-style/).

### Usage
Reactive Style takes advantage of ES2015 / ES6 specification for Template Literals (previously "template strings") to write plaintext CSS in JavaScript. Use of Template Literals enables multi-line strings, string interpolation, and use of curley brackets / braces to declare CSS rules in JSX.

Template literals are enclosed by the back-tick (\` \`) (grave accent) character instead of double or single quotes. Learn more about Template literals on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

####JSX syntax

In:
```js
import React from 'react';
import Style from 'reactive-style';

class Intro extends React.Component {  
  render() {
    return (
      <Style>
        {`
          .intro {
            font-size: 13px;
          }
          .package {
            color: blue;
          }
          .package:hover {
            color: aqua;
          }
       `}

        <p className="intro"> 
          <b className="package">Reactive Style</b> has many of the benefits of 
          inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
          <i>without</i> the costs and quirks of Reacts inline styling.
        </p>
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
      font-size: 13px;
    }
    ._scoped-1 .package-name {
      color: blue;
    }
    ._scoped-1 .package-name:hover {
      color: aqua;
    }
  </style>

  <b class="package">Reactive Style</b> has many of the benefits of 
  inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
  <i>without</i> the costs and quirks of Reacts inline styling.
</p>
```

### Additional Usage

#### JavaScript variables in your CSS
```js
import React from 'react';
import Style from 'reactive-style';

class Intro extends React.Component {  
  render() {
    const fontSize = 13;
  
    return (
      <Style>
        {`
          .intro {
            font-size: ${ fontSize }px;  // ES2015 / ES6 Template Literal string interpolation
          }
          .package {
            color: blue;
          }
          .package:hover {
            color: aqua;
          }
       `}

        <p className="intro"> 
          <b className="package">Reactive Style</b> has many of the benefits of 
          inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
          <i>without</i> the costs and quirks of Reacts inline styling.
        </p>
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
      font-size: 13px;
    }
    ._scoped-1 .package {
      color: blue;
    }
    ._scoped-1 .package:hover {
      color: aqua;
    }
  </style>

  <b class="package">Reactive Style</b> has many of the benefits of 
  inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
  <i>without</i> the costs and quirks of Reacts inline styling.
</p>
```

#### Layout styling
Style your layout without using an external CSS file. Reactive Style makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles.
```js
import React from 'react';
import Style from 'reactive-style';

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
        
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
```

Out:
```html
<div>
  <Style>
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
  </Style>
  
  <header> Header Content </header>
  <main> Main Content </main>
  <footer> Footer Content </footer>
</div>
```
### More Features

| Feature                                   | Reactive Style    | Inline Style |            |
| :----------------------------------------- | :---------------: | :----------: | :--------- |
| Safe by default       | &#10004;       | &#10004;     | Escaping of CSS property-values is automatically handled for you using the same library React uses for inline styles. Like with React inline styles, Reactive Style CSS property-values are safe by default. |
| Increase cohesion     | &#10004;       | &#10004;     | Self contained and complete components. With Reactive Style there is no need to fragment your component by creating an external CSS file when you need to use pseudo-classes, pseudo-selectors, at-media rules, or one of Reacts unsupported vendor prefixes (like flexbox or cursor grab). |
| Write less code       | &#10004;       |              | Use the right tool for the right job. With Reactive Style the full power of CSS is available so we can stop reimplementing CSS language features like `:hover` and `nth-of-type` in JavaScript. |
| Faster build times                        | &#10004;          | &#10004;     | Remove the preprocessor middle man -- this is just CSS. Reactive Style brings back the simplicity of writing CSS and removes the need for managing and executing a build step. |
| Increase readability                      | &#10004;          |              | Maintain the simplicity, symmetry, and beauty of HTML's open and close syntax. With Reactive Style you can achieve cohesion and clean separation while still bringing component concerns together as a single self-contained unit of code. |
| Isomorphic                                | &#10004;          | &#10004;     | Reactive Style is completely isomorphic and renders the same markup on server and client. |
| Increase new&nbsp;hire productivity | &#10004;          | &#10004;     | On boarding of new developers is quick and easy with Reactive Style -- there is nothing new to learn. Get your new developers styling today! |
| Better workflow                           | &#10004;          |              | Better workflow, a classic workflow. Not often we are able to say that, because Reactive Style requires no transformations to your CSS you can make adjustments in your browser and simply copy and paste the style rules into your component. |
| Easily&nbsp;portable                           | &#10004;          |              | By simply being CSS Reactive Style makes porting styles elsewhere easy with no special syntax or quirks to transform. |
| Share styles                              | &#10004;          | &#10004;     | Easily share styles across multiple components by leveraging JavaScript import notation you already know.|
| Small size                                |                   |              | Reactive Style is small at only 8kB. | 
| Better composition                        | &#10004;          |              | More easily evaluate when to break down a component. CSS complexity is an oft forgotten input when evaluating component complexity (+selectors, +pseudo states). Unifying HTML-CSS-JS in one place ensures CSS complexity is a part of your -- when should I decompose -- equation. |
 
### License
[MIT](LICENSE). Copyright © 2016-present Joshua Robinson.

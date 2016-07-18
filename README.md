# Reactive Style [<img title="Version" align="right" src="http://img.shields.io/npm/v/reactive-style.svg?stye=flat-square" />](https://www.npmjs.org/package/reactive-style) [<img title="License" align="right" src="https://img.shields.io/npm/l/express.svg?maxAge=2592000&?stye=flat-square" />](https://github.com/buildbreakdo/reactive-style/blob/master/LICENSE) [<img title="Maintenance Status" align="right" src="https://img.shields.io/badge/status-maintained-brightgreen.svg?stye=flat-square" />] (https://github.com/buildbreakdo/reactive-style/pulse)

Reactive Style is a simple passthrough component that allows you to write the same 
familiar CSS syntax you already know and love -- now inside of your components.

## Features

| Feature               | Reactive&nbsp;Style | Inline&nbsp;Style |           |
| :-------------------- | :------------: | :----------: | :--------- |
| Nothing&nbsp;new&nbsp;to&nbsp;learn | &#10004;       |              | With Reactive Style, you use the same familiar CSS syntax you already know and love -- now inside of your components. Just wrap your component with Reactive Style and start writing CSS. |
| Fully featured        | &#10004;       |              | There is no abstraction to go through -- Reactive Style is just CSS. Use any CSS feature available. |
| Scoped selectors      | &#10004;       |              | Move your CSS out of the global name space. Reactive Style automatically scopes selectors for you to the component's root element and is effectively a polyfill for sub-tree scoping (learn more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)). |
| Safe by default       | &#10004;       | &#10004;     | Escaping of CSS property-values is automatically handled for you using the same library React uses for inline styles. Like with React inline styles, Reactive Style CSS property-values are safe by default. |
| [Layout styling](#layout-styling) | &#10004;       |              | Style your layout right in your <App /> component. Reactive Style makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles. |


<p align="right"> 
    <b><a href="#user-content-more-features">SEE MORE &raquo;</a></b>
</p>

## Usage

Install with npm.

```sh
npm install reactive-style --save
```

In:
```js
import React, { Component } from 'react';
import Style from 'reactive-style';

class Intro extends Component {  
  render() {
    return (
      <Style>
        {`
          .intro {
            font-size: 13px;
          }
          .package-name {
            color: blue;
          }
          .package-name:hover {
            color: aqua;
          }
       `}

        <p className="intro"> 
          <b className="package-name"> Reactive Style </b> has many of the benefits of 
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

  <b class="package-name"> Reactive Style </b> has many of the benefits of 
  inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
  <i>without</i> the costs and quirks of Reacts inline styling.
</p>
```

## Additional Usage

### JavaScript variables in your CSS. 
```js
import React, { Component } from 'react';
import Style from 'reactive-style';

class Intro extends Component {  
  render() {
    const introFontSize = 13;
  
    return (
      <Style>
        {`
          .intro {
            font-size: ${ introFontSize }px;
          }
          .package-name {
            color: blue;
          }
          .package-name:hover {
            color: aqua;
          }
       `}

        <p className="intro"> 
          <b className="package-name"> Reactive Style </b> has many of the benefits of 
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

  <b class="package-name"> Reactive Style </b> has many of the benefits of 
  inline styling like: scoping, ↑ cohesion, and ↓ coupling of files -- 
  <i>without</i> the costs and quirks of Reacts inline styling.
</p>
```

### Layout styling
Style your layout right in your <App /> component. Reactive Style makes keeping all of your CSS in the App component hierarchy easy -- from global layout to component specific styles.
```js
import React, { Component } from 'react';
import Style from 'reactive-style';

class App extends Component {  
  render() {
    return (
      <div>
        <Style>
          {`
            body {
              font-size: small;
              font-family: arial,sans-serif;
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
      font-family: arial,sans-serif;
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
## More Features

| Feature                                   | Reactive&nbsp;Style    | Inline&nbsp;Style |            |
| :----------------------------------------- | :---------------: | :----------: | :--------- |
| Increase cohesion     | &#10004;       | &#10004;     | Self contained and complete components. With Reactive Style there is no need to fragment your component by creating an external CSS file when you need to use pseudo-classes, pseudo-selectors, at-media rules, or one of Reacts unsupported vendor prefixes (like flexbox or cursor grab). |
| Write less code       | &#10004;       |              | Use the right tool for the right job. With Reactive Style the full power of CSS is available so we can stop reimplementing CSS language features like `:hover` and `nth-of-type` in JavaScript. |
| Faster build times                        | &#10004;          | &#10004;     | Remove the preprocessor middle man -- this is just CSS. Reactive Style brings back the simplicity of writing CSS and removes the need for managing and executing a build step. |
| Increase readability                      | &#10004;          |              | Maintain the simplicity, symmetry, and beauty of HTML's open and close syntax. With Reactive Style you can achieve cohesion and clean separation while still bringing component concerns together as a single self-contained unit of code. |
| Isomorphic                                | &#10004;          | &#10004;     | Reactive Style is completely isomorphic and renders the same markup on server and client. |
| Increase&nbsp;new&nbsp;hire&nbsp;productivity | &#10004;          | &#10004;     | On boarding of new developers is quick and easy with Reactive Style -- there is nothing new to learn. Get your new developers styling today! |
| Better workflow                           | &#10004;          |              | Better workflow, a classic workflow. Not often we are able to say that, because Reactive Style requires no transformations to your CSS you can make adjustments in your browser and simply copy and paste the style rules into your component. |
| Write less code                           | &#10004;          |              | Use the right tool for the right job. With Reactive Style the full power of CSS is avaialble so we can stop reimplementing CSS language features like `:hover` and `nth-of-type` in JavaScript. |
| Easily portable                           | &#10004;          |              | By simply being CSS Reactive Style makes porting styles elsewhere easy with no special syntax or quirks to transform. |
| Share styles                              | &#10004;          | &#10004;     | Easily share styles across multiple components by leveraging JavaScript import notation you already know.|
| Small size                                |                   |              | Reactive Style is small at only 30kB. | 
| Better composition                        | &#10004;          |              | More easily evaluate when to break down a component. CSS complexity is an oft forgotten input when evaluating component complexity (+selectors, +pseudo states). Unifying HTML-CSS-JS in one place ensures CSS complexity is a part of your -- when should I decompose -- equation. |
 
## License
[MIT](LICENSE). Copyright © 2016-present Joshua Robinson.

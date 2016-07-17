# Reactive Style [![Version](http://img.shields.io/npm/v/reactive-root.svg)](https://www.npmjs.org/package/reactive-style) [![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/buildbreakdo/reactive-style/pulse) 

Reactive Style is a simple passthrough component that allows you to write the same 
familiar CSS syntax you already know and love -- now inside of your components.

### Features

Nothing new to learn

With Reactive Style you use the same familiar CSS syntax you already know
and love -- now inside of your components. Just wrap your component with Reactive
Style and start writing CSS.

Fully featured

There is no abstraction to go through -- Reactive Style is just CSS. Use any CSS
feature available.

Scoped selectors

Move your CSS out of the global name space. Reactive Style automatically scopes 
selectors for you to the component's root element and is effectively a poly-fill for
sub-tree scoping (more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)).

Safe by default

Escaping of CSS property-values is automatically handled for you using the same
library React uses for inline styles. Like with React inline styles, Reactive 
Style CSS property-values are safe by default. 

Increase cohesion

Self contained and complete components. With Reactive Style there is no need
to fragment your component by creating an external CSS file when you need to 
use pseudo-classes, pseudo-selectors, at-media rules, or one of Reacts unsupported
vendor prefixes (like flexbox or cursor grab).

											     CSS
	HTML-JS |----- CSS =>   /   \ 
		  (fragmented)			 HTML JS
									      (triforce)

Write less code

Use the right tool for the right job. With Reactive Style the full power of CSS 
is avaialble so we can stop reimplementing CSS language features like `:hover` and 
`nth-of-type` in JavaScript.


[SEE MORE &vee;](#more-features)

### Usage

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

### More Features

Faster build times

Remove the preprocessor middle man -- this is just CSS. Reactive Style brings back
the simplicity of writing CSS and removes the need for managing and executing a
build step.

Increase readability

Maintain the simplicity, symmetry, and beauty of HTML's open and close syntax. 
With Reactive Style you can achieve cohesion and clean seperation while still 
bringing component concerns together as a single self-contained unit of code.

Isomorphic

Reactive Style is completely isomorphic and renders the same markup on server 
and client.

Increased productivity for new developers

On boarding of new developers is quick and easy with Reactive Style -- there is 
nothing new to learn. Get your new developers styling today!

Better workflow

Better workflow, a classic workflow. Not often we are able to say that, because
Reactive Style requires no transformations to your CSS you can make adjustments
in your browser and simply copy and paste the style rules into your component.

Easily portable

By simply being CSS Reactive Style makes porting styles elsewhere easy with no
special syntax or quirks to transform.

Share styles

Easily share styles across multiple components by leveraging JavaScript import 
notation you already know.

Small size

Reactive Style is small at only 30kB. 

Better composition 

More easily evaluate when to break down a component further. CSS complexity is an
oft forgotten input into a components complexity. Unifying HTML-CSS-JS into one
place ensures CSS complexity is a part of your -- when should I decompose -- equation.

### Additional Usage

Using JavaScript variables in your CSS, in:
```javascript
...
	render() {
		const introFontSize = 10;
		
		return (
			<Style>
				{` 
					.intro { 
						font-size: ${ introFontSize }px;
					} 
				`}

				<div>
					<p className="intro"> An intro to `reactive-style`. </p>
				</div>
			</Style>
		)
	}
...
```

Using JavaScript variables in your CSS, out:
```html
...
	<div className="_scoped-1">
		<style type="text/css">
			._scoped-1 .intro {
				font-size: 10px;
			}
		</style>

		<p class="intro"> An intro to `reactive-style`. </p>
	</div>
...
```

## License
[MIT](LICENSE). Copyright (c) 2016-present Joshua Robinson.

<h1 align="center">
  <img src="https://github.com/zouhir/preact-habitat/blob/master/docs/artworkv3.gif?raw=true" height=300px>
</h1>
<br />

## Preact Habitat 

A 900 Bytes module for that will make plugging in Preact components and widgets in any CMS or website as fun as lego!

### Demos


### Installation

```bash
npm install --save preact-habitat
```

### Core Features

### Basic Usage Example

```js
import habitat from 'preact-habitat';
import WidgetAwesome from './components/WidgetAwesome';

let habitat = habitat(WidgetAwesome);

/**
** other selecors options:
**
** ".classname"  for querying DOM element by its class name
**
** "#div-id"  for querying DOM element by its ID value
**
** "[data-attribute-example='widget-here']"  for querying DOM element by its data attribute name & val
**
**/

habitat.render({
  selector: '.some-class', // Searches and mounts in <div class="some-class"></div>
  inline: false,
  clean: false,
  clientSpecified: false,
});
```

in `webpack.config.js` or any other build tool bundle output format should be `UMD`:

```js
output: {
  libraryTarget: 'umd'
}
```

in the DOM you'd like to mount your widget in:

```html
<div class="some-class"> <!-- as specified in render, habitat will mount the component in this-->
  <script type="text/props">
    {
      "title": "Widget Title passed as prop",
      "theme": "red",
      "anotherProp": "Thanks for trying this widget out!"
    }
  </script>
</div>
```

Now, build your production ready preact widget and you're all set, TADA! 🎉

## API Docs

### habitat(...)

accepts a single Preact component as its only argument

##### example: 
```js
import { h } form 'preact';
import habitat from 'preact-habitat';

const Widget = () => (<h1>Hello, World!</h1>)

let habitat = habitat(Widget); // NOTE: pass Widget and not <Widget />

habitat.render({
  ...
});
```

### render(options)

render function accepts an options Object which supports the following properties:

#### option.selector

>String: `.myclass`, `#myid`, `[data-selector="my-data-attr"]`

DOM Element selector used to retrieve the DOM elements you want to mount the widget in

#### option.inline
> Boolean: true || false (default)

Set to true if you want to use the parent DOM node as a host for your widget without specifing any selectors.

example:

```html
<div class="beautiful-container">
  <!-- inline set to true will make this widget render in it's parent 
      wrapper class="beautiful-container" without using selector option-->
  <script async src="cdn.preactwidget..."></script>
</div>
```

#### option.clean
> Boolean: true || false (default)

clean will remove all the innerHTML from the HTMl element the widget will mount in.

example:

if we set the widget to be mounted inside the selector ".beautiful-container" with {clean: true} it will remove the Loading div as soon as it renders.

```html
<div class="beautiful-container">
  <div class="loader">LOADING...</div>
</div>

<script async src="cdn.preactwidget..."></script>
```

#### option.clientSpecified
> Boolean: true || false (default)

This option allows who ever using the script to specifit the selector which they'd like to mount the widget in

```html
<div class="beautiful-container">
  <div class="loader">LOADING...</div>
</div>

<script async src="cdn.preactwidget..." data-mount-in=".beautiful-container"></script>
```

### Passing Props

There are 2 ways to pass props, either via data-attributes or text/props script tag

#### via data-attribute

the data attribute has to always start with `data-prop-` examples:

`data-prop-name` will be available in your component as `name`
`data-prop-version` will be available in your component as `version`
`data-prop-theme-color` will be available in your component as `themeColor` *NOTE* the lowerCamelCase when there's a -

```html
<div class="beautiful-container" data-prop-name="preact habitat" data-prop-version="v3.0.0" data-prop-theme-color="green">
  
</div>
```


## License
[MIT](LICENSE) - Copyright (c) [Zouhir Chahoud](http://zouhir.org)

## Credits
Artwork By: [Oleg Turbaba, Dribble](https://dribbble.com/turbaba)
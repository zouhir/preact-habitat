<h1 align="center">
  <img src="https://github.com/zouhir/preact-habitat/blob/master/docs/artwork.png?raw=true">
   <br />
    Preact Habitat
  <br />
</h1>
<br />

Preact habitat is a tiny (900Byte) module that will help you ship your Preact components & widgets to any world wide DOM page in a very easy and neat way.

> If you are looking for v2.x.x docs they're here

## <img src='https://github.com/zouhir/preact-habitat/blob/master/docs/artwork_2.png?raw=true.png' height=22 /> Demos


## <img src='https://github.com/zouhir/preact-habitat/blob/master/docs/artwork_2.png?raw=true.png' height=22 /> Installation

```bash
npm install --save preact-habitat
```

## <img src='https://github.com/zouhir/preact-habitat/blob/master/docs/artwork_2.png?raw=true.png' height=22 />  Basic Usage Example

##### before diving in the docs

```js
import habitat from 'preact-habitat';
import WidgetAwesome from './components/WidgetAwesome';

let habitat = habitat(WidgetAwesome);

/**
* other selecors options:
* ".classname" for querying DOM element by its class name
* "#div-id" for querying DOM element by its ID value
* "[data-attribute-example='widget-here']" for querying DOM element by its data attribute name & val
**/

habitat.render({
  selector: '.some-class' // Searches and mounts in <div class="some-class"></div>
});
```

in `webpack.config.js` or other build tool, bundle output \ format should be UMD:

```js
output: {
  libraryTarget: 'umd'
}
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
s
/**
** Note: pass the widget as habitat as habitat(Widget) not habitat(<Widget />);
** thats a common error and woth noting :)
**/
let habitat = habitat(Widget);

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
Set to true if you want to use the parent DOM node as a host for your widget without specifing any selectors example:

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

clean will remove all the innerHTML of the widget host element

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

## License

[MIT](LICENSE) - Copyright (c) [Zouhir Chahoud](http://zouhir.org)

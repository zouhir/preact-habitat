<h1 align="center">
  <img src="https://github.com/zouhir/preact-habitat/blob/master/artwork.png?raw=true">
   <br />
  Preact Habitat
  <br />
</h1>
<br />

Preact habitat is a 756Byte module that will help you ship your Preact components \ widget to any world wide DOM page in a very easy and neat way.

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Demos

- *Simple Login* 🔑 [link](https://preact-habitat-inline.netlify.com/)

- *Youtube Players* ▶️ [link](https://preact-habitat-youtube.netlify.com/)

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Use Case

If you have built a [Preact](https://preactjs.com/) component (eg: Video, login, signup or booking components) and would like to bundle it and ship it to be loaded in multiple web applications, blogs without with mostly 0 or very minimal configuration from your package host, then preact-habitat is what you are after!

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Installation

```bash

npm install --save preact-habitat

```

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 />  How to use

### Render your component using Habitat
> ✨ NEW: Now habitat support multiple widget rendering✨

```js
import habitat from 'preact-habitat';
import WidgetAwesomeOne from './components/WidgetAwesome';
import WidgetAwesomeTwo from './components/WidgetAwesome';
import WidgetAwesomeThree from './components/WidgetAwesome';

let habitatOne = habitat(WidgetAwesomeOne);
let habitatTwo = habitat(WidgetAwesomeTwo);
let habitatThree = habitat(WidgetAwesomeTwo);

habitatOne.render();
habitatTwo.render();
habitatThree.render({ name: 'data-mount-here', value: 'mount-number-three' });
```


### Set the build output library type to UMD

usage example in Webpack:

```js
output: {
  ...
  libraryTarget: 'umd'
}

```

### Inline Client Integration

*Assuming your bundle available on: `https://cdn.awesome/widget.js`*

```html
<div id="external-widget-place">
  <script async src="https://cdn.awesome/widget.js"></script>
</div>
```

> ✨ Pass props! ✨

```html
<div id="external-widget-place" data-prop-key="1x2uus88z" data-prop-theme="red">
  <script async src="https://cdn.awesome/widget.js"></script>
</div>
```

### Mount multiple widgets (not inline)

> ✨ NEW:  data-mount script attr ✨

```html
<body>
<div data-widget="awesome-widgets" id="widget-one" data-prop-video-id="123123" data-prop-auto-play="false">
</div>

<div data-widget="awesome-widgets" id="widget-two" data-prop-video-id="898989" data-prop-auto-play="true">
...
...
...
...
...
<script async src="https://cdn.awesome/widget.js" data-mount="awesome-widgets"></script>
</body>
```

### Mount multiple widgets (developer specified divs)
```html
<body>
<div data-widget-here-please="widget-number-three" id="widget-one" data-prop-video-id="123123" data-prop-auto-play="false">
</div>
<script async src="https://cdn.awesome/widget.js"></script>
</body>
```
```js
import habitat from 'preact-habitat';
import WidgetAwesomeThree from './components/WidgetAwesome';

let habitatThree = habitat(WidgetAwesomeTwo);
habitatThree.render({ name: 'data-widget-here-please', value: 'widget-number-three', inline: false });

```
### Render Method API

Render method accepts an *Object* and supports 3 properties

- name: HTML tag attribute name, Srting, default `data-mount`.
- value: HTML tag attribute value, Strinf, default null.
- inline: Enable \ Disable inline mounting for the widget, Boolean.


### Prop Names Rules
Now habitat allow you to pass props from HTML to your preact components, here are the rules:

- *starts with* `data-prop-`
- *all lower case* `data-prop-videoid` === `this.prop.videoid`
- *add dashes for camelCase* 🐫 `data-prop-video-id` === `this.prop.videoId`


## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Thank You!, But..

1. Please make sure your widget size is reasonable, bloated and big size bundles make puppies sick 🐶 😔

2. Feel free to fork, contribute or give it a 🌟. Open an issue or [chat with me](https://twitter.com/_zouhir) if you have any questions.


## License

[MIT](LICENSE) - Copyright (c) [Zouhir Chahoud](http://zouhir.org)

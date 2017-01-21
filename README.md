<h1 align="center">
  <img src="https://github.com/zouhir/preact-habitat/blob/master/artwork.png?raw=true">
   <br />
  Preact Habitat
  <br />
</h1>
<br />

Preact habitat is a 1kb module that will help you ship your Preact components \ widget to any world wide DOM page in a very easy and neat way.

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Use Case

If you have built a [Preact](https://preactjs.com/) component (eg: Video, login, booking components) and would like to bundle it and ship it to be loaded in other web applications, blogs, etc.. the preact-habitat is what are you looking for.

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Installation

```bash

npm install --save-dev preact-habitat

```

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 />  How to use

#### Render your component using Habitat

```js
import { render } from 'preact-habitat';
import WidgetAwesome from './components/WidgetAwesome'

render(WidgetAwesome);

```

#### Set Build tool output library type to UMD

example in Webpack:

```js

output: {
  ....
  libraryTarget: 'umd'
}

```

#### Host HTML integration

Now your widget is ready and assuming it's on your CDN and your URL is: `https://cdn.awesome/widget.js`
This is how easy it is to integrate in the host DOM

```html
<div id="external-widget-place">
  <script async src="https://cdn.awesome/widget.js"></script>
</div>
```

The snippet above will load the Preact component you have built inside a `div` with `external-widget-place` as id which you can position and style however you want.

#### Cloning multiple widgets

1. make a `<script>` tag and make sure `type="widget/config"`
2. add JSON config with the `clone` key of habitat script parent node `id` as a value

```html

<div id="external-widget-place">
  <script async src="https://cdn.awesome/widget.js"></script>
</div>

<script type="widget/config">
  {
    "clone": "external-widget-place"
  }
</script>

<script type="widget/config">
  {
    "clone": "external-widget-place"
  }
</script>

```

#### You're all set 🎉!

## <img src='https://github.com/zouhir/preact-habitat/blob/master/artwork_2.png?raw=true.png' height=24 /> Notes

1. Please make sure your widget size is reasonable, bloated and big size bundles make puppies sick 🐶 😔
2. Feel free to fork, contribute or give it a star. Open an issue or [chat with me](https://twitter.com/_zouhir) if you have any questions.

## License

[MIT](LICENSE) - Copyright (c) [Zouhir Chahoud](http://zouhir.org)

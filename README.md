rework-clone
============

This module clones properties from one selectors to another instead adding
appropriate selector as [rework-inherit](https://github.com/reworkcss/rework-inherit)
(rework.extend()).

Don’t copy anything and everything! Think, when you need to inherit and when to
clone.

## Example

```css
.a {
  background: red
}
.b {
  clone: .a;
}
```

yields:

```css
.a {
  background: red;
}
.b {
  background: red;
}
```

## API

```js
var clone = require('rework-clone');

var css = rework(inputCSS)
  .use(clone(options))
  .toString();
```

### Options

This is only one option: `regexp` to replace.

```js
var css = rework(inputCSS)
  .use(clone({regexp: /^foo?$/}))
  .toString();
```

It will work with all `foo` properties.

## License

MIT


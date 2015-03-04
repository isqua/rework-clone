# rework-clone

[![NPM version][npm-image]][npm-link]
[![Build status][travis-image]][travis-link]
[![devDependency status][devdeps-image]][devdeps-link]
[![peerDependency status][peerdeps-image]][peerdeps-link]

This module clones properties from one rule set to another, unlike
[rework-inherit](https://github.com/reworkcss/rework-inherit) (rework.extend())
which concatenates the selectors.

Don’t copy anything and everything! Think when you need to inherit and when to
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

## Usage

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

[npm-image]: https://img.shields.io/npm/v/rework-clone.svg?style=flat
[npm-link]: https://npmjs.org/package/rework-clone
[travis-image]: https://img.shields.io/travis/isqua/rework-clone.svg?style=flat
[travis-link]: https://travis-ci.org/isqua/rework-clone
[devdeps-image]: https://img.shields.io/david/dev/isqua/rework-clone.svg?style=flat
[devdeps-link]: https://david-dm.org/isqua/rework-clone#info=peerDependencies
[peerdeps-image]: https://img.shields.io/david/peer/isqua/rework-clone.svg?style=flat
[peerdeps-link]: https://david-dm.org/isqua/rework-clone#info=peerDependencies

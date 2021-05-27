SideBySideMultiSelect
=====================

Is a **javascript** multiselectbox with filters for `select` html tag

## Live Demo

You can check the live demo [right here](https://scheibome.github.io/side-by-side-multiselect/)

![Side by side select for multiselect demo](src/images/demo.gif)

## Usage:

**On npm**: `side-by-side-multiselect`

## Style setup in css

~~~css
:root {
    --sideBySiteMultiSelectColor: red;
    --sideBySiteMultiSelectHeight: 200px;
    --sideBySiteMultiSelectSearchFocusColor: yellow;
    --sideBySiteMultiSelectSearchFocusBgColor: green;
    --sideBySiteMultiSelectBorderWidth: 2px;
}
~~~

## SideBySideMultiSelect

~~~html
<select class="js-sidebysidemultiselect" id="demo1" multiple="multiple" name="tools[]">
    <option value="C++" name="C++">C++</option>
    <option value="JavaScript" name="JavaScript">JavaScript</option>
    <option value="PHP" name="PHP">PHP</option>
    <option value="Python" name="Python">Python</option>
    <option value="Ruby" name="Ruby">Ruby</option>
</select>

<script src="side-by-side-multiselect.min.js"></script>
<script type="text/javascript">
    SideBySideMultiselect();
</script>
~~~


## Simple SideBySideMultiSelect without filter

~~~html
<select class="js-sidebysidemultiselect" id="demo2" multiple="multiple" name="tools[]">
    <option value="google" name="google" selected="selected">Google</option>
    <option value="microsoft" name="microsoft">Microsoft</option>
    <option value="apple" name="apple">Apple</option>
    <option value="amazon" name="amazon">Amazon</option>
    <option value="yahoo" name="yahoo" selected="selected">Yahoo</option>
    <option value="yandex" name="yandex" selected="selected">Yandex</option>
    <option value="polycom" name="polycom">Polycom</option>
    <option value="jquery" name="jquery">jQuery</option>
    <option value="script" name="script">Script</option>
</select>

<script src="side-by-side-multiselect.min.js"></script>
<script type="text/javascript">
    SideBySideMultiselect({
        'selector': '.myselectfield',
        'hidefilter': true
    });
</script>
~~~

## SideBySideMultiSelect Options

Example use of the options.

~~~javascript
SideBySideMultiselect({
    'selector': '.js-sidebysidemultiselect',
    'hidefilter': true,
    'hideCounter': false,
    'showfilterplaceholder': true,
    'hidefilterlabel': true,
    labels: {
        'filter': 'Filter',
        'selected': 'Selected'
    },
    classSettings: {
        'labelclass': 'your-labelclass',
        'wrapperclass': 'your-wrapperclass',
        'optionclass': 'your-optionclass',
        'boxesclass': 'your-boxesrclass',
        'searchclass': 'your-searchclass',
        'counterclass': 'your-counterclass'
    }
});
~~~

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| selector | string | `.js-sidebysidemultiselect` | Name of the selector for example '.js-sidebysidemultiselect' |
| hideFilter | boolean | `false` | Hide the filter |
| hidefilterlabel | boolean | `false` | add a label to filter input  |
| showfilterplaceholder | boolean | `false` | Add a placeholder to the filter input  |
| classSettings | object | `See options example` | Name of the skin, it will add a class to the lightbox so you can style it with css. |
| hideCounter | boolean | `false` | Hide the counter |
| labels | object | `See options example` | The label content  |

## Including SideBySideMultiSelect

SideBySideMultiSelect is distributed as an ES6 module, but there is also a UMD module included.
How to install

```npm i side-by-side-multiselect```

### Example with vanilla js
This is what I used in the demo. Checkout index.html and demo.js.

```js
import SideBySideMultiselect from './side-by-side-multiselect.js';

window.onload = function() {
    SideBySideMultiselect({
        'selector': '.js-sidebysidemultiselectdemo2',
        'hidefilter': true,
        'hideCounter': true,
    });
}
```

Include in your html. Notice the `type` attribute:
```html
<script src="./demo.js" type="module"></script>
```

To support IE and legacy browsers, use the `nomodule` script tag to include separate scripts that don't use the module syntax:

```html
<script nomodule src="js/side-by-side-multiselect.umd.js"></script>
```

Author
------

[Thomas Scheibitz][scheibome]

License
-------

[MIT](https://opensource.org/licenses/MIT)
[scheibome]: https://github.com/scheibome/

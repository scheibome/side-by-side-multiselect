Side by side select for multiselect
===================================

**javascript** multiselectboxes with filters for `select` html tag

## Live Demo

You can check the live demo [right here](https://scheibome.github.io/side-by-side-multiselect/)

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
| classSettings | object | `See options example` | Name of the skin, it will add a class to the lightbox so you can style it with css. |
| hideCounter | boolean | `false` | Hide the counter |
| labels | object | `See options example` | The label content  |

Author
------

[Thomas Scheibitz][scheibome]

License
-------

[MIT](https://opensource.org/licenses/MIT)
[scheibome]: https://github.com/scheibome/

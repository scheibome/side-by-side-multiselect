import SideBySideMultiselect from './side-by-side-multiselect.min.js';

window.onload = function() {
    SideBySideMultiselect();
    SideBySideMultiselect({
        'selector': '.js-sidebysidemultiselectdemo2',
        'hidefilter': true,
        'hideCounter': true,
    });
    SideBySideMultiselect({
        'selector': '.js-sidebysidemultiselectdemo3',
        'orderOption': true
    });
};


import SideBySideMultiselect from './side-by-side-multiselect.js';

window.onload = function() {
    SideBySideMultiselect();
    SideBySideMultiselect({
        'selector': '.js-sidebysidemultiselectdemo2',
        'hidefilter': true,
        'hideCounter': true,
    });
};


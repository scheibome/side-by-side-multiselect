'use strict';

var SideBySideMultiselect = function SideBySideMultiselect(options) {

    if (typeof options === 'undefined') {
        options = '';
    }

    var selectElements = options.selector ? document.querySelectorAll(options.selector) : document.querySelectorAll('.js-sidebysidemultiselect');
    var classSettings = options.classSettings;
    var wrapperClassName = classSettings && classSettings.wrapperclass ? classSettings.wrapperclass : 'side-by-side-multiselect';
    var optionClassName = classSettings && classSettings.optionclass ? classSettings.optionclass : 'side-by-side-multiselect__option';
    var boxesClassName = classSettings && classSettings.boxesclass ? classSettings.boxesclass : 'side-by-side-multiselect__inner';
    var filterClassName = classSettings && classSettings.filterclass ? classSettings.filterclass : 'side-by-side-multiselect__filter';
    var counterClassName = classSettings && classSettings.counterclass ? classSettings.counterclass : 'side-by-side-multiselect__counter';
    var errorText = 'Error, the select must been a multible select';

    var labels = options.labels;
    var labelFilter = labels && labels.filter ? labels.filter : 'Filter';
    var labelSelected = labels && labels.selected ? labels.selected : 'Selected: ';

    /**
     * create the multiselect wrapper with the eompty inner boxes
     * @param selectField
     * @returns {HTMLDivElement}
     */
    var createSideBySideMultiSelectBoxes = function createSideBySideMultiSelectBoxes(selectField) {
        var wrapper = document.createElement('div');
        wrapper.classList.add(wrapperClassName);

        var leftBox = document.createElement('div');
        leftBox.classList.add(boxesClassName);
        wrapper.appendChild(leftBox);

        var rightBox = document.createElement('div');
        rightBox.classList.add(boxesClassName);
        wrapper.appendChild(rightBox);

        selectField.parentNode.insertBefore(wrapper, selectField.nextSibling);
        return wrapper;
    };

    /**
     * create the inner option
     * @param option
     * @param direction
     * @returns {HTMLDivElement}
     */
    var createSelectOption = function createSelectOption(option, direction) {
        var optionElement = document.createElement('div');
        optionElement.innerHTML = option.text;
        optionElement.classList.add(optionClassName);
        optionElement.setAttribute('data-index', option.index);

        if (direction === 1) {
            optionElement.setAttribute('data-direction', 'add');
            if (option.selected) {
                optionElement.style.display = '';
            } else {
                optionElement.style.display = 'none';
            }
        } else {
            optionElement.setAttribute('data-direction', 'remove');
            if (option.selected) {
                optionElement.style.display = 'none';
            } else {
                optionElement.style.display = '';
            }
        }
        return optionElement;
    };

    /**
     * get the options and duplicates these for the add and remove fields
     * @param option
     * @param selectElement
     */
    var duplicatesOptions = function duplicatesOptions(option, selectElement) {
        var selectFields = selectElement.querySelectorAll('.' + boxesClassName);
        if (selectFields.length === 2) {
            var addedOption = createSelectOption(option, 1);
            var removedOption = createSelectOption(option, 0);
            selectFields[0].appendChild(removedOption);
            selectFields[1].appendChild(addedOption);
        }
    };

    /**
     * @param selectField
     * @param selectElement
     */
    var setSelectOption = function setSelectOption(selectField, selectElement) {
        var options = selectField.querySelectorAll('option');
        options.forEach(function (option) {
            duplicatesOptions(option, selectElement, selectField);
        });
    };

    /**
     * add the cklickevent to the options to select the option in the original select and hide or show the selection
     * @param e
     * @param selectfield
     * @param selectElement
     */
    var addClickEventToOption = function addClickEventToOption(e, selectfield, selectElement) {
        var theTarget = e.target;
        var selectedDataSet = theTarget.dataset;
        if (theTarget.className === optionClassName && selectedDataSet.direction && selectedDataSet.index) {
            var selectedIndex = selectedDataSet.index;
            var selectOptions = selectfield.querySelectorAll('option');
            theTarget.style.display = 'none';
            if (selectedDataSet.direction === 'add') {
                selectElement.querySelector('[data-direction="remove"][data-index="' + selectedIndex + '"]').style.display = '';
                selectOptions[selectedIndex].selected = false;
            } else {
                selectElement.querySelector('[data-direction="add"][data-index="' + selectedIndex + '"]').style.display = '';
                selectOptions[selectedIndex].selected = true;
            }

            // start the counter Event
            if (!options.hideCounter) {
                calcCounter(selectfield, selectElement);
            }
        }
    };

    var calcCounter = function calcCounter(selectfield, selectElement) {
        var selectedItemsCount = selectfield.querySelectorAll('option:checked');
        selectElement.querySelector('.' + counterClassName).innerText = labelSelected + selectedItemsCount.length;
    };

    /**
     * create the counter div with content
     * @returns {*}
     */
    var addCounter = function addCounter() {
        var counterBox = document.createElement('div');
        counterBox.innerText = labelSelected;
        counterBox.classList.add(counterClassName);
        return counterBox;
    };

    /**
     * Filters the options by the input
     * @param input
     * @param sideBoxes
     */
    var filterFunc = function filterFunc(input, sideBoxes) {
        var filterItems = sideBoxes.querySelectorAll('[data-direction="remove"]');
        var filter = input.value.toUpperCase();

        // Loop through all list items, and hide those who don't match the filter query
        filterItems.forEach(function (filterItem) {
            var txtValue = filterItem.textContent || filterItem.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                filterItem.style.display = '';
            } else {
                filterItem.style.display = 'none';
            }
        });
    };

    /**
     * reset the created options to the selected options
     * @param selectfield
     * @param selectElement
     */
    var resetToSelectOptions = function resetToSelectOptions(selectfield, selectElement) {
        var selectedItemsCount = selectfield.querySelectorAll('option');
        selectedItemsCount.forEach(function (option) {
            var addOption = selectElement.querySelector('[data-direction="add"][data-index="' + option.index + '"]');
            var removeOption = selectElement.querySelector('[data-direction="remove"][data-index="' + option.index + '"]');
            if (option.selected) {
                addOption.style.display = 'block';
                removeOption.style.display = 'none';
            } else {
                addOption.style.display = 'none';
                removeOption.style.display = 'block';
            }
        });
    };

    /**
     * create the filter with eventlistener and prepend it to the sideboxes
     * @param sideBoxes
     * @returns {*}
     */
    var addFilterInput = function addFilterInput(select, sideBoxes) {
        var filterfield = document.createElement('input');
        filterfield.setAttribute('type', 'text');
        filterfield.setAttribute('placeholder', labelFilter);
        filterfield.classList.add(filterClassName);
        filterfield.addEventListener('keyup', function () {
            filterFunc(this, sideBoxes);
            if (this.value === '') {
                resetToSelectOptions(select, sideBoxes);
            }
        });
        sideBoxes.parentNode.insertBefore(filterfield, sideBoxes);
        return sideBoxes;
    };

    /**
     * Check if the select a multible select
     * if not, display a errormessage
     * @param select
     * @returns {boolean}
     */
    var checkIfMultiple = function checkIfMultiple(select) {
        if (select.type !== 'select-multiple') {
            var errorMessage = document.createElement('p');
            errorMessage.innerText = errorText;
            errorMessage.style.backgroundColor = 'red';
            errorMessage.style.padding = '1rem';
            errorMessage.style.color = 'white';
            select.parentNode.insertBefore(errorMessage, select);
            console.log(errorText, ':', select);
            return false;
        }
        return true;
    };

    /**
     * init function
     * hide the default select
     * add the filter and counter
     * add the click events
     */
    selectElements.forEach(function (select) {
        select.style.display = 'none';
        if (checkIfMultiple(select)) {
            var selectElement = createSideBySideMultiSelectBoxes(select);
            setSelectOption(select, selectElement);

            if (!options.hidefilter) {
                selectElement = addFilterInput(select, selectElement);
            }

            if (!options.hideCounter) {
                var counterBox = addCounter();
                selectElement.appendChild(counterBox);
                calcCounter(select, selectElement);
            }

            selectElement.addEventListener('click', function (e) {
                addClickEventToOption(e, select, selectElement);
            });
        }
    });
};
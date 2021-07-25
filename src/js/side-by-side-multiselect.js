export default function SideBySideMultiselect(options) {

    if (typeof options === 'undefined') {
        options = '';
    }

    let selectElements = (options.selector) ? document.querySelectorAll(options.selector) : document.querySelectorAll('.js-sidebysidemultiselect');
    let classSettings = options.classSettings;
    let wrapperClassName = (classSettings && classSettings.wrapperclass) ? classSettings.wrapperclass : 'side-by-side-multiselect';
    let optionClassName = (classSettings && classSettings.optionclass) ? classSettings.optionclass : 'side-by-side-multiselect__option';
    let selectedOptionClassName = (classSettings && classSettings.optionclass) ? classSettings.optionclass : 'side-by-side-multiselect__option--selected';
    let boxesClassName = (classSettings && classSettings.boxesclass) ? classSettings.boxesclass : 'side-by-side-multiselect__inner';
    let filterWrapperClassName = (classSettings && classSettings.filterwrapperclass) ? classSettings.filterwrapperclass : 'side-by-side-multiselectfilter';
    let filterClassName = (classSettings && classSettings.filterclass) ? classSettings.filterclass : 'side-by-side-multiselectfilter__input';
    let filterLabelClassName = (classSettings && classSettings.filterlabelclass) ? classSettings.filterlabelclass : 'side-by-side-multiselectfilter__label';
    let counterClassName = (classSettings && classSettings.counterclass) ? classSettings.counterclass : 'side-by-side-multiselect__counter';
    let labelClassName = (classSettings && classSettings.labelclass) ? classSettings.labelclass : 'side-by-side-multiselectlabel';
    let errorText = 'Error, the select must been a multible select';
    let moveOptionsFieldPrefix = '-move';
    let moveOptionsValueSplitter = ';';

    let labels = options.labels;
    let labelFilter = (labels && labels.filter) ? labels.filter : 'Filter';
    let labelSelected = (labels && labels.selected) ? labels.selected : 'Selected: ';

    const arrayMove = (arr, oldIndex, newIndex) => {
        while (oldIndex < 0) {
            oldIndex += arr.length;
        }
        while (newIndex < 0) {
            newIndex += arr.length;
        }
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        console.log(1627215883895, arr);
        return arr; // for testing purposes
    };

    /**
     * get the next sibling with given parameter
     * @param elem
     * @param selector
     * @returns {Element}
     */
    const getNextSibling = (elem, selector) => {
        let sibling = elem.nextElementSibling;
        if (!selector) {
            return sibling;
        }
        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.nextElementSibling;
        }
    };

    /**
     * get the previous sibling with given parameter
     * @param elem
     * @param selector
     * @returns {Element}
     */
    const getPreviousSibling = (elem, selector) => {
        let sibling = elem.previousElementSibling;
        if (!selector) {
            return sibling;
        }
        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
    };

    /**
     * select on first focus the first visible element
     * after press arrow up jumps the focus to the previous sibling
     * after press arrow down jumps the focus to the next sibling
     * @param e
     * @param singleBox
     */
    const setKeyboardUpAndDownSelect = (e, singleBox) => {
        e.preventDefault();
        let activeElement = document.activeElement;
        let nextSiblingOption = getNextSibling(activeElement, ':not([style="display: none;"]');
        let previousSiblingOption = getPreviousSibling(activeElement, ':not([style="display: none;"]');
        if (activeElement.classList.contains(boxesClassName)) {
            let firstSingleBoxOption = singleBox.querySelector('.' + optionClassName + ':not([style="display: none;"])');
            if (firstSingleBoxOption) {
                firstSingleBoxOption.focus();
            }
        } else {
            if (e.key === 'ArrowUp') {
                if (typeof previousSiblingOption !== 'undefined') {
                    previousSiblingOption.focus();
                }
            } else if (e.key === 'ArrowDown') {
                if (typeof nextSiblingOption !== 'undefined') {
                    nextSiblingOption.focus();
                }
            }
        }
    };

    /**
     * count the selected options and add the number to the html
     * @param select
     * @param wrapper
     */
    const calcCounter = (select, wrapper) => {
        let selectedItemsCount = select.querySelectorAll('option:checked');
        wrapper.querySelector('.' + counterClassName).innerText = labelSelected + selectedItemsCount.length;
    };

    /**
     * Returns the select html with the added elements as object
     *
     * @param wrapper
     * @returns {any}
     */
    const getTheAddBox = (wrapper) => {
        return wrapper.querySelector('[data-boxdirection="add"]');
    };

    /**
     * returns the field with the ordered elements
     *
     * @param select
     * @returns {HTMLElement}
     */
    const getmoveOptionField = (select) => {
      return document.getElementById(select.id + moveOptionsFieldPrefix);
    };

    /**
     * returns the value of the ordered input field as array
     * trims the values and remove empty items
     *
     * @param input
     * @returns {string[]}
     */
    const getOrderedOptions = (input) => {
        let array = input.value.trim().split(moveOptionsValueSplitter);
        array = array.filter(value => Object.keys(value).length !== 0);
        return array.map(string => string.trim());
    };

    /**
     * removes the active class from the selection
     * @param wrapper
     */
    const removeSelectionFromAllOptions = (wrapper) => {
        let activeOption = getTheAddBox(wrapper).querySelector('.' + selectedOptionClassName);
        if(activeOption) {
            activeOption.classList.remove(selectedOptionClassName);
        }

    };

    /**
     * rearrange the selected options to the correct order
     *
     * @param select
     * @param wrapper
     * @param rearrangeOptionField
     */
    const rearrangeSelectedOptions = (select, wrapper, rearrangeOptionField) => {
        let orderedOptions = getOrderedOptions(rearrangeOptionField);
        orderedOptions.forEach(function(orderedOption) {
            if (orderedOption) {
                let optionElement = select.querySelector('option[value=' + orderedOption + ']');
                let optionIndex = optionElement.index;
                let optionDiv = wrapper.querySelector('[data-direction="add"][data-index="' + optionIndex + '"]');
                getTheAddBox(wrapper).appendChild(optionDiv);
            }
        });
    };

    /**
     * add the clickevent to the options to select the option in the original select and hide or show the selection
     * @param theTarget
     * @param select
     * @param wrapper
     * @param moveOption
     */
    const addClickEventToOption = (theTarget, select, wrapper, moveOption) => {
        let selectedDataSet = theTarget.dataset;
        if (theTarget.className === optionClassName && selectedDataSet.direction && selectedDataSet.index) {
            let selectedIndex = selectedDataSet.index;
            let selectedValue = selectedDataSet.value;
            let selectOptions = select.querySelectorAll('option');
            let orderedOptions;
            let moveOptionField;

            if (moveOption) {
                moveOptionField = getmoveOptionField(select);
                orderedOptions = moveOptionField.value.trim();
            }

            if (selectedDataSet.direction === 'add') {
                if (moveOption) {
                    removeSelectionFromAllOptions(wrapper);
                    theTarget.classList.add(selectedOptionClassName);
                    moveOptionField.setAttribute('data-selected', selectedValue);
                } else {
                    // remove the field only if the ordered option is NOT set
                    wrapper.querySelector('[data-direction="remove"][data-index="' + selectedIndex + '"]').style.display = 'block';
                    selectOptions[selectedIndex].selected = false;
                    theTarget.style.display = 'none';
                }
            } else {
                wrapper.querySelector('[data-direction="add"][data-index="' + selectedIndex + '"]').style.display = 'block';
                selectOptions[selectedIndex].selected = true;
                theTarget.style.display = 'none';

                if (moveOption) {
                    moveOptionField.value = orderedOptions + ' ' + selectedValue + moveOptionsValueSplitter;
                    rearrangeSelectedOptions(select, wrapper, moveOptionField);
                }
            }

            // start the counter Event
            if (!options.hideCounter) {
                calcCounter(select, wrapper);
            }
        }
    };

    /**
     * select the focused element and set the focus to the next or prev
     * @param e
     * @param select
     * @param wrapper
     * @param moveOption
     */
    const selectOptionViaKeyboard = (e, select, wrapper, moveOption) => {
        e.preventDefault();
        let activeElement = document.activeElement;
        let nextSiblingOption = getNextSibling(activeElement, ':not([style="display: none;"]');
        let previousSiblingOption = getPreviousSibling(activeElement, ':not([style="display: none;"]');
        if (typeof nextSiblingOption !== 'undefined') {
            nextSiblingOption.focus();
        } else if (typeof previousSiblingOption !== 'undefined') {
            previousSiblingOption.focus();
        } else {
            activeElement.parentNode.focus();
        }
        if (typeof previousSiblingOption !== 'undefined') {
            previousSiblingOption.focus();
        }
        addClickEventToOption(activeElement, select, wrapper, moveOption);
    };

    /**
     * create a single box for the options
     * @param wrapper
     * @param select
     * @param moveOption
     * @returns {HTMLDivElement}
     */
    const createSingleBox = (wrapper, select, moveOption) => {
        const singleBox = document.createElement('div');
        singleBox.setAttribute('role', 'listbox');
        singleBox.setAttribute('aria-expanded', 'true');
        singleBox.setAttribute('tabindex', '0');
        singleBox.classList.add(boxesClassName);
        singleBox.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' ) {
                setKeyboardUpAndDownSelect(e, singleBox);
            } else if (e.key === ' ' || e.key === 'Enter') {
                selectOptionViaKeyboard(e, select, wrapper, moveOption);
            }
        });
        return singleBox;
    };

    /**
     * create the multiselect wrapper with the eompty inner boxes
     * @param select
     * @param moveOption
     * @returns {HTMLDivElement}
     */
    const createSideBySideMultiSelectBoxes = (select, moveOption) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add(wrapperClassName);

        const leftBox = createSingleBox(wrapper, select, moveOption);
        leftBox.setAttribute('data-boxdirection', 'remove');
        wrapper.appendChild(leftBox);

        const rightBox = createSingleBox(wrapper, select, moveOption);
        rightBox.setAttribute('data-boxdirection', 'add');
        wrapper.appendChild(rightBox);

        select.parentNode.insertBefore(wrapper, select.nextSibling);
        return wrapper;
    };

    /**
     * create the inner option
     * @param option
     * @param direction
     * @returns {HTMLDivElement}
     */
    const createSelectOption = (option, direction) => {
        let optionElement = document.createElement('div');
        optionElement.innerHTML = option.text;
        optionElement.setAttribute('role', 'option');
        optionElement.setAttribute('tabindex', '-1');
        optionElement.classList.add(optionClassName);
        optionElement.setAttribute('data-value', option.value);
        optionElement.setAttribute('data-index', option.index);

        if (direction === 1) {
            optionElement.setAttribute('data-direction', 'add');
        } else {
            optionElement.setAttribute('data-direction', 'remove');
        }
        return optionElement;
    };

    /**
     * get the options and duplicates these for the add and remove fields
     * @param option
     * @param wrapper
     */
    const duplicatesOptions = (option, wrapper) => {
        let selectFields = wrapper.querySelectorAll('.' + boxesClassName);
        if (selectFields.length === 2) {
            let removedOption = createSelectOption(option, 0);
            let addedOption = createSelectOption(option, 1);
            selectFields[0].appendChild(removedOption);
            selectFields[1].appendChild(addedOption);
        }
    };

    /**
     * add a new input field into the form for the ordered selection
     * @param select
     * @param wrapper
     */
    const createMoveOptionsField = (select, wrapper) => {
        let moveOptionField = document.createElement('input');
        moveOptionField.id = select.id + moveOptionsFieldPrefix;
        moveOptionField.name = select.name.replace('[]', '') + moveOptionsFieldPrefix;
        moveOptionField.value = select.dataset.selecteditems;
        // moveOptionField.style.display = 'none'; // TODO ENABLE
        wrapper.appendChild(moveOptionField);
        console.log(1627218185086, wrapper);
        return moveOptionField;
    };

    /**
     * @param select
     * @param wrapper
     */
    const setSelectOption = (select, wrapper) => {
        let options = select.querySelectorAll('option');
        options.forEach(function(option) {
            duplicatesOptions(option, wrapper);
        });
    };

    /**
     * create the counter div with content
     * @returns {*}
     */
    const addCounter = () => {
        let counterBox = document.createElement('div');
        counterBox.innerText = labelSelected;
        counterBox.classList.add(counterClassName);
        return counterBox;
    };

    /**
     * add the move events to the buttons
     *
     * @param button
     * @param select
     * @param wrapper
     * @param position
     */
    const addTriggerEventToButton = (button, select, wrapper, position) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let inputField = getmoveOptionField(select);
            let selectedItem = inputField.dataset.selected;
            let activeItemsArray = getOrderedOptions(inputField);
            let index = activeItemsArray.findIndex(items => items === selectedItem);
            let lastIndexID = activeItemsArray.length - 1;
            let newValue = '';

            switch(position) {
                case 0:
                    if (index > 0) {
                        activeItemsArray = arrayMove(activeItemsArray, index, 0);
                    }
                break;
                case -1:
                    if (index > 0) {
                        activeItemsArray = arrayMove(activeItemsArray, index, index + position);
                    }
                break;
                case 1:
                    if (index < lastIndexID) {
                        activeItemsArray = arrayMove(activeItemsArray, index, index + position);
                    }
                break;
                case 'last':
                    if (index < lastIndexID) {
                        activeItemsArray = arrayMove(activeItemsArray, index, lastIndexID);
                    }
                break;
            }

            activeItemsArray.forEach(function(activeItem) {
                newValue = newValue + activeItem + moveOptionsValueSplitter;
            });

            inputField.value = newValue;
            rearrangeSelectedOptions(select, wrapper, inputField);
        });
    };

    const createMoveButton = (text) => {
        let button = document.createElement('button');
        button.innerText = text;
        return button;
    };

    const addMoveOptionBox = (select, wrapper) => {
        // toTop Button
        let toTopButton = createMoveButton('to top');
        addTriggerEventToButton(toTopButton, select, wrapper, 0);
        wrapper.appendChild(toTopButton);

        // up Button
        let upButton = createMoveButton('up');
        addTriggerEventToButton(upButton, select, wrapper, -1);
        wrapper.appendChild(upButton);

        // down Button
        let downButton = createMoveButton('down');
        addTriggerEventToButton(downButton, select, wrapper, 1);
        wrapper.appendChild(downButton);

        // toTheBottom Button
        let toTheBottom = createMoveButton('to the bottom');
        addTriggerEventToButton(toTheBottom, select, wrapper, 'last');
        wrapper.appendChild(toTheBottom);
    };

    /**
     * Filters the options by the input
     * @param input
     * @param wrapper
     */
    const filterFunc = (input, wrapper) => {
        let filterItems = wrapper.querySelectorAll('[data-direction="remove"]');
        let filter = input.value.toUpperCase();

        // Loop through all list items, and hide those who don't match the filter query
        filterItems.forEach(function(filterItem) {
            let txtValue = filterItem.textContent || filterItem.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                filterItem.style.display = 'block';
            } else {
                filterItem.style.display = 'none';
            }
        });
    };

    /**
     * reset the created options to the selected options
     * @param select
     * @param wrapper
     */
    const resetToSelectOptions = (select, wrapper) => {
        let selectedItemsCount = select.querySelectorAll('option');
        selectedItemsCount.forEach(function(option) {
            let addOption = wrapper.querySelector('[data-direction="add"][data-index="' + option.index + '"]');
            let removeOption = wrapper.querySelector('[data-direction="remove"][data-index="' + option.index + '"]');
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
     * create the filter to filter the options
     * @param select
     * @param wrapper
     * @returns {HTMLDivElement}
     */
    const createFilter = (select, wrapper) => {
        // FilterWrapper
        let filterWrapper = document.createElement('div');
        filterWrapper.classList.add(filterWrapperClassName);

        // FilterLabel
        let filterLabel = document.createElement('label');
        filterLabel.innerText = labelFilter;
        filterLabel.classList.add(filterLabelClassName);
        filterLabel.setAttribute('for', select.id + '-filter');

        // FilterInput
        let filterField = document.createElement('input');
        filterField.id = select.id + '-filter';
        filterField.setAttribute('type', 'text');
        if (options.showfilterplaceholder) {
            filterField.setAttribute('placeholder', labelFilter);
        }
        filterField.classList.add(filterClassName);
        filterField.addEventListener('keyup', function() {
            filterFunc(this, wrapper);
            if (this.value === '') {
                resetToSelectOptions(select, wrapper);
                filterField.classList.remove('isfilled');
            } else {
                filterField.classList.add('isfilled');
            }
        });

        filterWrapper.appendChild(filterField);
        if (!options.hidefilterlabel) {
            filterWrapper.appendChild(filterLabel);
        }

        return filterWrapper;
    };

    /**
     * create the filter with eventlistener and prepend it to the wrapper
     * @param select
     * @param wrapper
     * @returns {*}
     */
    const addFilterInput = (select, wrapper) => {
        let filterWrapper = createFilter(select, wrapper);
        wrapper.parentNode.insertBefore(filterWrapper, wrapper);
        return wrapper;
    };

    /**
     * Check if the select a multible select
     * if not, display a errormessage
     * @param select
     * @returns {boolean}
     */
    const checkIfMultiple = (select) => {
        if (select.type !== 'select-multiple') {
            let errorMessage = document.createElement('p');
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
     * find the label for the select and add a new class
     * @param select
     */
    const findLabelOfSelectAndSetBlock = (select) => {
        let selectLabel = document.querySelector('label[for="' + select.id + '"]');
        if (selectLabel) {
            selectLabel.classList.add(labelClassName);
        }
    };

    /**
     * init function
     * hide the default select
     * add the filter and counter
     * add the click events
     */
    selectElements.forEach(function(select) {
        if (checkIfMultiple(select)) {
            let moveOption = options.moveOption;
            select.style.display = 'none';
            findLabelOfSelectAndSetBlock(select);
            let wrapper = createSideBySideMultiSelectBoxes(select, moveOption);
            setSelectOption(select, wrapper);
            resetToSelectOptions(select, wrapper);

            if (!options.hidefilter) {
                wrapper = addFilterInput(select, wrapper);
            }

            if (!options.hideCounter) {
                let counterBox = addCounter();
                wrapper.appendChild(counterBox);
                calcCounter(select, wrapper);
            }

            if (moveOption) {
                let rearrangeOptionField = createMoveOptionsField(select, wrapper);
                rearrangeSelectedOptions(select, wrapper, rearrangeOptionField);
                resetToSelectOptions(select, wrapper);
                let orderBox = addMoveOptionBox(select, wrapper); // TODO
            }

            wrapper.addEventListener('click', function(e) {
                addClickEventToOption(e.target, select, wrapper, moveOption);
            });
        }
    });
};

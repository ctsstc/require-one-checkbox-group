import { winLoad } from "./winLoad";

export function RequireCheckBoxes() {

  // add event listener for on form submit validate the fields

  // if invalid display a standard form error message using native browser functions
  //  later this could be overrode with a custom handler or something

  winLoad(() => {

    const forms = Array.from(
      document.querySelectorAll('form'))
      .filter((form) => form.querySelectorAll('fieldset[data-requires]').length > 0);

    // resetValidity
    const checkBoxes = Array.from(document.querySelectorAll('form fieldset[data-requires] input[type=checkbox]'));
    checkBoxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        checkBoxes.forEach((checkboxEach) => {
          checkboxEach.setCustomValidity('');
          checkboxEach.reportValidity();
        });
      });
    });

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {

        const fieldSets = Array.from(form.querySelectorAll('fieldset'));

        for (let i = 0; i < fieldSets.length; i++) {
          const fieldSet = fieldSets[i];
          const requiredAmount = parseInt(fieldSet.dataset.requires);
          const checkboxes = Array.from(fieldSet.querySelectorAll('input[type=checkbox]'));
          const checkedBoxes = checkboxes.filter((checkbox) => checkbox.checked);
          const pluralizer = requiredAmount > 1 ? 's' : '';

          if (checkboxes.length === 0) continue;

          if (checkedBoxes.length == 0) {
            const checkbox = checkboxes[0];
            checkbox.setCustomValidity(`Please select ${requiredAmount} option${pluralizer}`);
            checkbox.reportValidity();
            event.preventDefault();
            break;
          }
        };
      });
    });
  });
}


(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// This is an example script, please modify as needed
const rangeInput = document.getElementById('Rating');
const rangeOutput = document.getElementById('rangeValue');

// Set initial value
if (rangeInput && rangeOutput) {
  // Set initial value
  rangeOutput.textContent = rangeInput.value;
  rangeInput.addEventListener('input', function () {
    rangeOutput.textContent = this.value;
  });
}

let taxSwitch = document.getElementById("switchCheckDefault");
if (taxSwitch) {
  taxSwitch.addEventListener("click", function () {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      info.style.display = taxSwitch.checked ? "inline" : "none";
    }
  })
}

// Mobile Search Toggle Logic
const mobileSearchTrigger = document.getElementById('mobile-search-trigger');
const mobileSearchBar = document.getElementById('mobile-search-bar');
const closeMobileSearch = document.getElementById('close-mobile-search');
const navbarCollapse = document.getElementById('navbarNavAltMarkup');

if (mobileSearchTrigger) {
  mobileSearchTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    // Close the menu first
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false
    });
    bsCollapse.hide();

    // Toggle visibility with a slight delay or immediately
    mobileSearchBar.classList.remove('d-none');
    mobileSearchBar.classList.add('d-flex');

    // Optionally focus the input
    mobileSearchBar.querySelector('input').focus();
  });
}

if (closeMobileSearch) {
  closeMobileSearch.addEventListener('click', () => {
    mobileSearchBar.classList.add('d-none');
    mobileSearchBar.classList.remove('d-flex');
  });
}


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
    rangeInput.addEventListener('input', function() {
      rangeOutput.textContent = this.value;
    });
  }

  let taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click", function() {
        let taxInfo = document.getElementsByClassName("tax-info");
        for(info of taxInfo){
            info.style.display = taxSwitch.checked ? "inline" : "none";
        }
    })

  
window.onload = function () {
    'use strict';
    
    const generateBtn = document.getElementById("generateBtn");
    const dataBox = document.getElementById("dataBox");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrcode = document.getElementById("qrcode");
    const qrdiv = document.getElementById("qrdiv");

    const errorClassName = "error";
    const shakeClassName = "shake";
    const dataBoxClassName = "dataBox";
    const toHideClassName = "hide";
    const qrdivClassName = "qrdiv";

    var QR_CODE = new QRCode("qrcode", {
      width: 260,
      height: 260,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    const idNumber = document.getElementById("id_number");
    idNumber.addEventListener('keyup', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("id_number");
      var y = document.getElementsByClassName("idnumber");
      if (self.value) {
        y[0].classList.remove("hidden");
      } else {
        y[0].classList.add("hidden");
      }
      x[0].innerHTML = self.value;
    });
    idNumber.addEventListener('blur', (event) => {
      var self = event.target;
      if (self.value) {
        generateQRCode(self.value);
      }
    });

    const lastName = document.getElementById("lastname");
    lastName.addEventListener('keyup', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("lastname");
      if (self.value) {
        x[0].innerHTML = self.value;
      } else {
        x[0].innerHTML = '';
      }
    });
    lastName.addEventListener('blur', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("lastname");
      if (self.value) {
        x[0].innerHTML = self.value;
      } else {
        x[0].innerHTML = '';
      }
    });

    const firstName = document.getElementById("firstname");
    firstName.addEventListener('keyup', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("firstname");
      if (self.value) {
        x[0].innerHTML = self.value;
      } else {
        x[0].innerHTML = '';
      }
    });
    firstName.addEventListener('blur', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("firstname");
      if (self.value) {
        x[0].innerHTML = self.value;
      } else {
        x[0].innerHTML = '';
      }
    });

    const middleName = document.getElementById("middlename");
    middleName.addEventListener('keyup', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("middlename");
      if (self.value) {
        x[0].innerHTML = self.value[0] + '.';
      } else {
        x[0].innerHTML = '';
      }
    });
    middleName.addEventListener('blur', (event) => {
      var self = event.target;
      var x = document.getElementsByClassName("middlename");
      if (self.value) {
        x[0].innerHTML = self.value[0] + '.';
      } else {
        x[0].innerHTML = '';
      }
    });

    function generateQRCode(data) {
      QR_CODE.clear();
      QR_CODE.makeCode(data);
    }
    
    /* show file value after file select */
    const fileInput = document.getElementById("customFile");
    fileInput.addEventListener('change', (event) => {
        var fileName = event.target.files[0].name;
        var nextSibling = event.target.nextElementSibling
        nextSibling.innerText = fileName
    });
};


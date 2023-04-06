var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
const userData = {
  email: "",
  name: "",
  lastname: "",
  postcode: "",
  optin: false,
  activeClient: "",
  phone: "",
  address: "",
  request: "",
  referral: "",
};

function callback() {
  const submitButton = document.getElementById("nextBtn");
  submitButton.removeAttribute("disabled");
}

function expiredCallback(){
  const submitButton = document.getElementById("nextBtn");
  let btnText = submitButton.innerText;
  if(btnText == 'Submit'){
    submitButton.setAttribute("disabled", "disabled");
  }

}

var deliverablePostcodes = ',BL23HS,BL23HZ,BL23JD,BL23JE,BL23JR,BL23JW,BL23JY,';


function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("pcc-form__tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").setAttribute("disabled", "disabled");
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  if (document.getElementById("prevBtn").style.display == "inline") {
    document
      .querySelector(".pcc-form__button-container")
      .classList.add("two-btns");
    document
      .querySelector(".pcc-form__button-container")
      .classList.remove("one-btn");
  } else if (document.getElementById("prevBtn").style.display == "none") {
    document
      .querySelector(".pcc-form__button-container")
      .classList.add("one-btn");
    document
      .querySelector(".pcc-form__button-container")
      .classList.remove("two-btns");
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName("pcc-form__tab");
  let userPostcode = document.getElementById("PCCPostcode");
  let ID = x[currentTab].getAttribute("id");
  let clientStatusField = document.getElementById("PCCActiveClient");

  if(n == 1){
    // Exit the function if any field in the current tab is invalid:
    let values = validateForm(ID);

    if (n == 1 && !values.valid) return false;

    sedDataLayerEvent(n, currentTab);

    if (ID == 'PPCFirstStep' && userPostcode) {
      let compactPostcode = ","+userPostcode.value.toUpperCase().replace(/\s/g, "")+",";
      let position = deliverablePostcodes.indexOf(compactPostcode);
      console.log(compactPostcode);
      document.getElementById("PostcodeChecker").style.visibility = 'hidden';
      if (position >= 0) {
        console.log("Position:", position);
        document.getElementById("PostcodeChecker").style.visibility = 'visible';
        document.getElementById("postcode").value = userPostcode.value;
      } else {
        console.log("Not in area", userData);
        // sendUserData(userData, "Not_In_The_Area");
        document.querySelector("#PostcodeChecker").action ="/pages/thank-you/";
        //document.getElementById("PostcodeChecker").submit();
      }
    }

    if (ID == 'PPCSecondStep' && clientStatusField) {
      if (clientStatusField.value == "existing-client") {
        console.log("PPCSecondStep value", clientStatusField.value);
        console.log("Existing customer", userData);
        // sendUserData(userData, "Existing_customer");
        document.querySelector("#PostcodeChecker").action =
          "https://www.ringtons.co.uk/get-in-touch-i99";
        //document.getElementById("PostcodeChecker").submit();
      }
    }
    console.log("Raw Data", userData);
    //sending current data to raw data tab
    // sendUserData(userData, "Raw_data");
  }

  if(n == -1){
    sedDataLayerEvent(n, currentTab);
  }

  // Hide the current tab:
  x[currentTab].style.display = "none";

  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;

  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    //sendUserData(userData, "New_Leads");
    document.querySelector("#PostcodeChecker").action =
      "/pages/well-be-in-touch";
    //document.getElementById("PostcodeChecker").submit();
    // return false;
    // exit;
    return;
  }

  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm(ID) {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    validQ1,
    validQ2,
    validQ2a,
    validQ3,
    optInResponse,
    valid = true;
  x = document.getElementsByClassName("pcc-form__tab");
  y = x[currentTab].getElementsByTagName("input");
  // Regex
  let regexEm =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  let regexLastName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  // let regexPC = /\b(GIR ?0AA|SAN ?TA1|(?:[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d|[A-HK-Y]\d\d|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])) ?\d[ABD-HJLNP-UW-Z]{2})\b/gim;
  //let regexPC = /\b(GIR?0AA|SAN?TA1|(?:[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d|[A-HK-Y]\d\d|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])) \d[ABD-HJLNP-UW-Z]{2})\b/gim;
  let regexPC = /[\S\s]+[\S]+/;
  let regexPhone =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
  // Declare the truthy/falsy array
  let validValuesArr = [];

  // First step
  if (ID == "PPCFirstStep") {
    // input fields
    let email = document.getElementById("PCCEmail");
    let name = document.getElementById("PCCName");
    let lastname = document.getElementById("PCCLastName");
    let phone = document.getElementById("PCCNumber");
    let postcode = document.getElementById("PCCPostcode");

    // Empty the truthy/falsy array
    validValuesArr = [];
    // Validate email
    if (email) {
      validQ1 = regexEm.test(email.value);
      if (!validQ1) {
        validValuesArr.push("0");
        email.className += " invalid";
        email.placeholder = "Please insert your email";
      } else {
        validValuesArr.push("1");
        userData.email = email.value;
      }
    } else {
      validValuesArr.push("0");
      email.className += " invalid";
      email.placeholder = "Please insert your email";
    }

    // Validate name
    if (name) {
      validQ2 = regexName.test(name.value);
      if (!validQ2) {
        validValuesArr.push("0");
        name.className += " invalid";
        name.placeholder = "Please insert your name";
      } else {
        validValuesArr.push("1");
        userData.name = name.value;
      }
    } else {
      validValuesArr.push("0");
      name.className += " invalid";
      name.placeholder = "Please insert your name";
    }

    // Validate last name
    if (lastname) {
      validQ2a = regexLastName.test(lastname.value);
      if (!validQ2a) {
        validValuesArr.push("0");
        lastname.className += " invalid";
        lastname.placeholder = "Please insert your last name";
      } else {
        validValuesArr.push("1");
        userData.lastname = lastname.value;
      }
    } else {
      validValuesArr.push("0");
      lastname.className += " invalid";
      lastname.placeholder = "Please insert your last name";
    }

    // Validate phone
    if (phone) {
      validQ1 = regexPhone.test(phone.value);
      if (!validQ1) {
        validValuesArr.push("0");
        phone.className += " invalid";
      } else {
        validValuesArr.push("1");
        userData.phone = phone.value;
      }
    } else {
      validValuesArr.push("0");
      phone.className += " invalid";
    }

    // Validate postcode
    if (postcode) {
      validQ3 = regexPC.test(postcode.value);
      if (!validQ3) {
        validValuesArr.push("0");
        postcode.className += " invalid";
        postcode.placeholder = "Please insert your postcode";
      } else {
        if (
          //here we can set the accepted length of postcodes in number of digits
          postcode.value.replace(/\s/g, "").length < 4 ||
          postcode.value.replace(/\s/g, "").length > 8
        ) {

              // document.getElementById("PostcodeChecker").style.opacity = "100";
        validValuesArr.push("0");
        postcode.className += " invalid";
        postcode.placeholder = "Please insert your postcode";
        } else {
        validValuesArr.push("1");
        userData.postcode = postcode.value;
        }
      }
    } else {
      validValuesArr.push("0");
      postcode.className += " invalid";
      postcode.placeholder = "Please insert your postcode";
    }

    if (validValuesArr.indexOf("0") >= 0) {
      valid = false;
    }
    optInResponse = document.getElementById("PCCOptIn").checked;
    if (optInResponse) {
      userData.optin = "Yes";
    } else {
      userData.optin = "No";
    }

    if (valid) {
      document.getElementsByClassName("pcc-form__step")[currentTab].className +=
        " finish";
    }

    return {
      valid,
      userData,
    };
  }

  // Second Step
  if (ID == "PPCSecondStep") {
    let clientStatus = document.getElementById("PCCActiveClient");
    // Empty the truthy/falsy array
    validValuesArr = [];
    // Validate Active Client
    if (clientStatus.value == "not-selected") {
      clientStatus.className += " invalid";
      valid = false;
    } else {
      userData.activeClient = clientStatus.value;
      //trying to get the redirect done before the next step is shown
      if (clientStatus.value == "existing-client") {
        //sendUserData(userData, "Existing_customer");
       valid = false;
        document.querySelector("#PostcodeChecker").action =
          "https://www.ringtons.co.uk/get-in-touch-i99";
        //document.getElementById("PostcodeChecker").submit();
      }
    }

    if (valid) {
      document.getElementsByClassName("pcc-form__step")[currentTab].className +=
        " finish";
    }

    return {
      valid,
      userData,
    };
  }

  // Third Step
  if (ID == "PPCThirdStep") {

    let address = document.getElementById("formatted_address_0");
    let address1 = document.getElementById("formatted_address_1");
    let address2 = document.getElementById("formatted_address_2");
    let town = document.getElementById("town_or_city");
    let county = document.getElementById("county");
    let postcode = document.getElementById("postcode");
    let fullAddress = "";

    // Empty the truthy/falsy array
    validValuesArr = [];

    // Validate address
    if (address) {
      validQ2 = address.value;
      if (validQ2 == "") {
        validValuesArr.push("0");
        address.className += " invalid";
      } else {
        validValuesArr.push("1");
        fullAddress = address.value;
        if (address1.value != "") fullAddress += ", " + address1.value;
        if (address2.value != "") fullAddress += ", " + address2.value;
        if (town.value != "") fullAddress += ", " + town.value;
        if (county.value != "") fullAddress += ", " + county.value;

        userData.address = fullAddress;
      }
    } else {
      validValuesArr.push("0");
      address.className += " invalid";
    }

    // Validate postcode
    if (postcode) {
      validQ3 = postcode.value;
      if (validQ3 == "") {
        validValuesArr.push("0");
        postcode.className += " invalid";
      } else {
        validValuesArr.push("1");
        if (/\d/.test(validQ3)) {
          userData.postcode = postcode.value;
        } else {
          userData.postcode = document.getElementById("PCCPostcode").value;
        }
      }
    } else {
      validValuesArr.push("0");
      postcode.className += " invalid";
    }

    if (validValuesArr.indexOf("0") >= 0) {
      valid = false;
    }

    if (valid) {
      document.getElementsByClassName("pcc-form__step")[currentTab].className +=
        " finish";
    }

    return {
      valid,
      userData,
    };
  }

  // Fourth Step
  if (ID == "PPCFourthStep") {
    //let request = document.getElementById('PCCRequest');
    let requestOther = document.getElementById("PCCRequestOther");
    let referral = document.getElementById("PCCReferral");
    let referralOther = document.getElementById("PCCReferralOther");

    if (document.getElementById("price-list").checked) {
      userData.request += "Price List. ";
    }
    if (document.getElementById("delivery-days").checked) {
      userData.request += "Deliver Days. ";
    }
    if (document.getElementById("arrange-visit").checked) {
      userData.request += "Arrange a visit. ";
    }
    if (document.getElementById("other").checked) {
      userData.request += "Other request. ";
    }

    // Empty the truthy/falsy array
    validValuesArr = [];
    // Validate request
    /* if (request) {
      validQ1 = request.value;
      validQ2  = requestOther.value;
      if (validQ1 == 'not-selected') {
        validValuesArr.push('0');
        request.className += " invalid";
      } else if (validQ1 == 'other' && validQ2 == '') {
        validValuesArr.push('0');
        requestOther.className += " invalid";
      } else {
        validValuesArr.push('1');
        if (validQ1 != 'not-selected' && validQ1 != 'other') {
          userData.request = request.value;
        } else {
          userData.request = requestOther.value;
        }
      }
    } else {
      validValuesArr.push('0');
      request.className += " invalid";
    }*/

    // Validate address
    if (referral) {
      validQ1 = referral.value;
      validQ2 = referralOther.value;
      /*if (validQ1 == "not-selected") {
        validValuesArr.push("0");
        referral.className += " invalid";
      } else*/ if (validQ1 == "other" && validQ2 == "") {
        validValuesArr.push("0");
        referralOther.className += " invalid";
      } else {
        validValuesArr.push("1");
        if (validQ1 != "not-selected" && validQ1 != "other") {
          userData.referral = referral.value;
        } else {
          userData.referral = referralOther.value;
        }
      }
    } else {
      validValuesArr.push("0");
      referral.className += " invalid";
    }

    if (validValuesArr.indexOf("0") >= 0) {
      valid = false;
    }

    if (valid) {
      document.getElementsByClassName("pcc-form__step")[currentTab].className +=
        " finish";
    }

    return {
      valid,
      userData,
    };
  }
}

function sendUserData(data, tabId) {
  var myHeaders = new Headers();
  var date = Date();
  var userData = [];
  var dataObject = Object.values(data);

  dataObject.forEach((item) => userData.push(item));
  userData.unshift(date);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "post",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify([userData]),
  };

  fetch(
    "https://v1.nocodeapi.com/leaffm/google_sheets/UGRnqhQwalpCkEUX?tabId=" +
      tabId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log("done, we are ready to redirect if needed in "+tabId))
    .then((result) => {
      if(tabId!="Raw_data")document.getElementById("PostcodeChecker").submit();
    })

    .catch((error) => console.log("error", error));
}

document.addEventListener("getaddress-find-address-selected", function (e) {
  document.querySelector("#getaddress_dropdown").classList.add("hidden");
  console.log(e.address);
  let formatted_address = e.address.formatted_address;
  let address = "";
  for (line in formatted_address) {
    if (formatted_address[line] != "") {
      address += formatted_address[line] + ", ";
    }
  }

  document.getElementById("PCCAddress").value = address.slice(0, -2);
});

document.addEventListener("getaddress-find-suggestions", function (e) {
  console.log(e.suggestions);
  if (e.suggestions.length <= 0) {
    document.querySelector("#getaddress_dropdown").classList.add("hidden");
    document.querySelector("#postcode").value =
      "Please add your address below.";
  }
});

document.addEventListener("getaddress-find-suggestions-failed", function (e) {
  console.log(e.status);
  console.log(e.message);
});

document.addEventListener(
  "getaddress-find-address-selected-failed",
  function (e) {
    console.log(e.status);
    console.log(e.message);
  }
);

document.getElementById("PCCReferral").addEventListener("change", function (e) {
  let referralElem = document.getElementById("PCCReferral");
  let referralOtherElem = document.getElementById("PCCReferralOther");
  if (referralElem.value == "other") {
    referralOtherElem.parentElement.classList.remove("hidden");
  } else {
    referralOtherElem.parentElement.classList.add("hidden");
  }
});

/*document.getElementById('PCCRequest').addEventListener('change', function(e) {
  console.log(e);
  let requestElem = document.getElementById('PCCRequest');
  let requestOtherElem = document.getElementById('PCCRequestOther');
  if (requestElem.value == 'other') {
    requestOtherElem.parentElement.classList.remove('hidden');
  } else {
    requestOtherElem.parentElement.classList.add('hidden');
  }
});*/

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("pcc-form__step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function sedDataLayerEvent(n, step) {

  let formStep = '';

  switch(step){
    case 0:
      formStep = "First Form Step";
      break;
    case 1:
      formStep = "Customer Status";
      break;
    case 2:
      formStep = "User’s Complete Address";
      break;
    case 3:
      formStep = "Final Submission";
      break;
    default:
      formStep = "Next Step Clicked";
  }

  if (n != -1) {
    dataLayer.push({
      event: "dl_StepSubmit",
      step: step,
      description: formStep
    });
  } else {
    dataLayer.push({
      event: "dl_PrevStepSubmit",
      step: step,
      description: formStep
    });
  }
}

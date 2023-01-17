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


  //experiment of hiding all if step 1 so we don't show the form during async check
if(ID=="PPCFirstStep")document.getElementById("PostcodeChecker").style.visibility = "hidden";

  console.log("step id ",ID);
  // Exit the function if any field in the current tab is invalid:
  let values = validateForm(ID);

  if (n == 1 && !values.valid) return false;

  if (userPostcode) {
    //-----AI
    async function getParsedData() {
      let result;
      let postcodeIsDeliverable;
      // Use Papa.parse to download the file and parse it as a CSV
      await Papa.parse(
        "https://cdn.shopify.com/s/files/1/0687/4323/3847/files/postcodes.csv?v=1673865260",
        {
          download: true,
          delimiter: "''",
          header: false,
          step: function (row) {
            let postcodesString = row.data[0].toUpperCase().replace(/\s/g, "");
            let compactPostCode = userPostcode.value
              .toUpperCase()
              .replace(/\s/g, "");
            position = postcodesString.indexOf(compactPostCode);
            if (position >= 0) {
              postcodeIsDeliverable = true;
              document.getElementById("postcode").value = userPostcode.value
              document.getElementById("PostcodeChecker").style.visibility = "visible";
            } else {
              postcodeIsDeliverable = false;
              sendUserData(userData, "Not_In_The_Area");
              document.querySelector("#PostcodeChecker").action =
                "/pages/were-not-in-your-area/";
              document.getElementById("PostcodeChecker").submit();
            }
            result = postcodeIsDeliverable;
          },
        }
      );
      // Return the parsed data
      return result;
    }

    // Declare the external variable that you want to assign the parsed data to
    var parsedData;

    // Use the `getParsedData` function to get the parsed data asynchronously
    let answer = getParsedData().then(function (data) {
      // Assign the parsed data to the external variable
      parsedData = data;
      return parsedData;
    });

    // You can then use the `parsedData` variable outside of the async function to access the parsed data
    //-----AI

    // let postcode = userPostcode.value.toUpperCase();
    // let postcodeIsDeliverable;
    // let position;

    // Papa.parse('https://cdn.shopify.com/s/files/1/0687/4323/3847/files/Ringtons_4.4miles_around_NE6_4NQ.csv?v=1671545517', {
    //   download: true,
    //   delimiter: "''",
    //   header: false,
    //   step: function(row) {
    //     console.log("Row:", row.data);
    //     let postcodesString = row.data[0];
    //     position = postcodesString.indexOf(postcode);
    //     if(position >= 0){
    //       postcodeIsDeliverable = true;
    //     } else {
    //       postcodeIsDeliverable = false;
    //     }
    //     console.log(postcodeIsDeliverable);
    //   },
    //   // The `complete` callback function is called when the CSV parsing is finished
    //   complete: function(results) {
    //       console.log('done');
    //   }
    // });

    // console.log(position);

    // You can then use the `parsedData` variable outside of the async function to access the parsed data
    // console.log(parsedData);

    // console.log(checkPostcode);
    // let postcode = userPostcode.value.toUpperCase();
    // let postcodeIsDeliverable = checkPostcodeAvailability(postcode);

    // if (!postcodeIsDeliverable) {
    //   sendUserData(userData);
    //   document.querySelector("#PostcodeChecker").action = "https://ringtons-store.myshopify.com/pages/were-not-in-your-area";
    //   document.getElementById("PostcodeChecker").submit();
    //   return;
    // }
  }

  if (clientStatusField) {
    if (clientStatusField.value == "existing-client") {
      sendUserData(userData, "Existing_customer");
      document.querySelector("#PostcodeChecker").action =
        "https://www.ringtons.co.uk/get-in-touch-i99";
      document.getElementById("PostcodeChecker").submit();
    }
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  //sending current data to raw data tab
  sendUserData(userData, "Raw_data");
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;

  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    sendUserData(userData, "New_Leads");
    document.querySelector("#PostcodeChecker").action =
      "/pages/well-be-in-touch";
    document.getElementById("PostcodeChecker").submit();
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

  // Firt step
  if (ID == "PPCFirstStep") {
    // input fields
    let email = document.getElementById("PCCEmail");
    let name = document.getElementById("PCCName");
    let lastname = document.getElementById("PCCLastName");
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

    // Validate postcode
    if (postcode) {
      validQ3 = regexPC.test(postcode.value);
      if (!validQ3) {
        validValuesArr.push("0");
        postcode.className += " invalid";
        postcode.placeholder = "Please insert your postcode";
      } else {
        if (
          postcode.value.replace(/\s/g, "").length < 5 ||
          postcode.value.replace(/\s/g, "").length > 8
        ) {
          
              document.getElementById("PostcodeChecker").style.visibility = "visible";
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
        sendUserData(userData, "Existing_customer");
       valid = false;
        document.querySelector("#PostcodeChecker").action =
          "https://www.ringtons.co.uk/get-in-touch-i99";
        document.getElementById("PostcodeChecker").submit();
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

    let phone = document.getElementById("PCCNumber");
    let address = document.getElementById("formatted_address_0");
    let address1 = document.getElementById("formatted_address_1");
    let address2 = document.getElementById("formatted_address_2");
    let town = document.getElementById("town_or_city");
    let county = document.getElementById("county");
    let postcode = document.getElementById("postcode");
    let fullAddress = "";

    // Empty the truthy/falsy array
    validValuesArr = [];
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
    .then((result) => console.log(result))
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

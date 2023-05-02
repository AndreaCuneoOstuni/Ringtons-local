let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
let foundPostcode = "";
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

let recaptchaRes = "";

function callback(res) {
  const submitButton = document.getElementById("nextBtn");
  recaptchaRes = res;
  submitButton.removeAttribute("disabled");
}

function expiredCallback(){
  recaptchaRes = "";
  const submitButton = document.getElementById("nextBtn");
  let btnText = submitButton.innerText;

  if(btnText == 'Submit'){
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
  }
}

// define your polygons (as arrays of LatLng coordinates)
const polygons = [
  {
    name: "Aycliffe",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.56523, lat: 54.86553 },
        { lng: -1.638431, lat: 54.855016 },
        { lng: -1.72452, lat: 54.806309 },
        { lng: -1.865676, lat: 54.816956 },
        { lng: -1.945502, lat: 54.787396 },
        { lng: -1.975833, lat: 54.77444,},
        { lng: -2.135134, lat: 54.749084 },
        { lng: -2.098742, lat: 54.71816 },
        { lng: -2.142001, lat: 54.660215 },
        { lng: -2.077456, lat: 54.583886 },
        { lng: -2.033511, lat: 54.497845 },
        { lng: -1.701174, lat: 54.49625 },
        { lng: -1.829798, lat: 54.410012 },
        { lng: -1.851771, lat: 54.344423 },
        { lng: -2.004206, lat: 54.316796 },
        { lng: -2.154582, lat: 54.322803 },
        { lng: -2.217066, lat: 54.337217 },
        { lng: -2.247966, lat: 54.30558 },
        { lng: -2.168315, lat: 54.295162 },
        { lng: -2.056386, lat: 54.29205 },
        { lng: -1.890223, lat: 54.269106 },
        { lng: -1.714442, lat: 54.297967 },
        { lng: -1.579323, lat: 54.366604 },
        { lng: -1.46122, lat: 54.450526 },
        { lng: -1.410408, lat: 54.501992 },
        { lng: -1.315581, lat: 54.552906 },
        { lng: -1.312834, lat: 54.588332 },
        { lng: -1.405531, lat: 54.641215 },
        { lng: -1.428588, lat: 54.689696 },
        { lng: -1.4485, lat: 54.697236 },
        { lng: -1.503394, lat: 54.726174 },
        { lng: -1.52744, lat: 54.777095 },
        { lng: -1.526778, lat: 54.784836 },
        { lng: -1.523345, lat: 54.811357 },
        { lng: -1.566604, lat: 54.847349 },
        { lng: -1.56523, lat: 54.86553 },
      ]
    }),
  },
  {
    name: "Barrington",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -2.087594, lat: 55.878562 },
        { lng: -2.027342, lat: 55.733355 },
        { lng: -1.948359, lat: 55.60048, },
        { lng: -1.857482, lat: 55.378769 },
        { lng: -2.249964, lat: 55.251149 },
        { lng: -2.003763, lat: 55.148529 },
        { lng: -1.775275, lat: 55.043878 },
        { lng: -1.67103, lat: 55.007215 },
        { lng: -1.609876, lat: 54.982967 },
        { lng: -1.604896, lat: 54.976661 },
        { lng: -1.606269, lat: 54.968583 },
        { lng: -1.586358, lat: 54.969666 },
        { lng: -1.58035, lat: 54.965824 },
        { lng: -1.547219, lat: 54.960009 },
        { lng: -1.536628, lat: 54.96358 },
        { lng: -1.53599, lat: 54.971487 },
        { lng: -1.529206, lat: 54.982995 },
        { lng: -1.517612, lat: 54.986228 },
        { lng: -1.452102, lat: 54.987794 },
        { lng: -1.440826, lat: 55.004616 },
        { lng: -1.42675, lat: 55.010818 },
        { lng: -1.406812, lat: 55.016949 },
        { lng: -1.432719, lat: 55.042887 },
        { lng: -1.445323, lat: 55.058784 },
        { lng: -1.501214, lat: 55.149202 },
        { lng: -1.497635, lat: 55.220107 },
        { lng: -1.554536, lat: 55.271603 },
        { lng: -1.544353, lat: 55.324099 },
        { lng: -1.592866, lat: 55.366602 },
        { lng: -1.56581, lat: 55.417187 },
        { lng: -1.585747, lat: 55.467552 },
        { lng: -1.595178, lat: 55.507705 },
        { lng: -1.609346, lat: 55.555997 },
        { lng: -1.705591, lat: 55.63106, },
        { lng: -1.770764, lat: 55.642309 },
        { lng: -1.774511, lat: 55.682876 },
        { lng: -1.877824, lat: 55.699043 },
        { lng: -2.087594, lat: 55.878562 }
      ]
    }),
  },
  {
    name: "Birstall",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.373416, lat: 53.764829 },
        { lng: -1.420795, lat: 53.789378 },
        { lng: -1.422168, lat: 53.831138 },
        { lng: -1.442081, lat: 53.842888 },
        { lng: -1.506626, lat: 53.877714 },
        { lng: -1.606189, lat: 53.887832 },
        { lng: -1.68378, lat: 53.883785 },
        { lng: -1.773731, lat: 53.893093 },
        { lng: -1.865741, lat: 53.923429 },
        { lng: -1.92136, lat: 53.926664 },
        { lng: -1.956378, lat: 53.923025 },
        { lng: -1.974918, lat: 53.907253 },
        { lng: -1.968051, lat: 53.888237 },
        { lng: -1.987964, lat: 53.861924 },
        { lng: -1.970798, lat: 53.824653 },
        { lng: -2.027103, lat: 53.760161 },
        { lng: -2.093707, lat: 53.733362 },
        { lng: -2.136966, lat: 53.727675 },
        { lng: -2.119113, lat: 53.70939 },
        { lng: -2.041524, lat: 53.707588 },
        { lng: -2.022642, lat: 53.726578 },
        { lng: -1.959812, lat: 53.71061 },
        { lng: -1.975604, lat: 53.640651 },
        { lng: -1.951572, lat: 53.594218 },
        { lng: -1.80669, lat: 53.567313 },
        { lng: -1.646015, lat: 53.540391 },
        { lng: -1.531345, lat: 53.535086 },
        { lng: -1.505252, lat: 53.510185 },
        { lng: -1.425602, lat: 53.490172 },
        { lng: -1.335651, lat: 53.511002 },
        { lng: -1.355564, lat: 53.584029 },
        { lng: -1.288272, lat: 53.678492 },
        { lng: -1.288959, lat: 53.70492 },
        { lng: -1.305438, lat: 53.751636 },
        { lng: -1.373416, lat: 53.764829 }
      ]
    }),
  },
  {
    name: "Chesterfield",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.909858, lat: 53.224647 },
        { lng: -1.782142, lat: 53.0896 },
        { lng: -1.7326, lat: 52.973994 },
        { lng: -1.63108, lat: 52.944199 },
        { lng: -1.620093, lat: 52.875459 },
        { lng: -1.370154, lat: 52.794986 },
        { lng: -1.07627, lat: 52.80495 },
        { lng: -0.842811, lat: 52.799968 },
        { lng: -0.680762, lat: 52.894519 },
        { lng: -0.752174, lat: 52.945854 },
        { lng: -0.820838, lat: 53.013656 },
        { lng: -0.840064, lat: 53.101145 },
        { lng: -0.823585, lat: 53.147294 },
        { lng: -0.925208, lat: 53.217247 },
        { lng: -1.051551, lat: 53.309246 },
        { lng: -1.08863, lat: 53.383849 },
        { lng: -1.090003, lat: 53.446873 },
        { lng: -1.210853, lat: 53.458322 },
        { lng: -1.341315, lat: 53.502453 },
        { lng: -1.416846, lat: 53.48448 },
        { lng: -1.492377, lat: 53.504087 },
        { lng: -1.537696, lat: 53.528584 },
        { lng: -1.607734, lat: 53.53593 },
        { lng: -1.659919, lat: 53.534297 },
        { lng: -1.669532, lat: 53.521236 },
        { lng: -1.661292, lat: 53.476307 },
        { lng: -1.664039, lat: 53.437058 },
        { lng: -1.74369, lat: 53.400228 },
        { lng: -1.850806, lat: 53.365006 },
        { lng: -1.911231, lat: 53.341235 },
        { lng: -1.949683, lat: 53.35763 },
        { lng: -1.955863, lat: 53.391221 },
        { lng: -2.003928, lat: 53.392858 },
        { lng: -2.036887, lat: 53.371561 },
        { lng: -1.999808, lat: 53.347384 },
        { lng: -2.008735, lat: 53.327294 },
        { lng: -1.977149, lat: 53.31704 },
        { lng: -1.913978, lat: 53.319912 },
        { lng: -1.920844, lat: 53.30104 },
        { lng: -1.941444, lat: 53.288728 },
        { lng: -1.968909, lat: 53.254234 },
        { lng: -1.909858, lat: 53.224647 }
      ]
    }),
  },
  {
    name: "Cumbria",
    polygon: new google.maps.Polygon({
      paths: [
            { lng: -3.279066, lat: 54.962194 },
            { lng: -3.571826, lat: 54.669143 },
            { lng: -3.681689, lat: 54.535503 },
            { lng: -3.522387, lat: 54.353432 },
            { lng: -3.346606, lat: 54.11907 },
            { lng: -3.176318, lat: 54.044954 },
            { lng: -2.890674, lat: 54.176982 },
            { lng: -2.819262, lat: 54.11907 },
            { lng: -2.962085, lat: 54.041729 },
            { lng: -2.883807, lat: 53.964243 },
            { lng: -2.990924, lat: 53.927063 },
            { lng: -2.957965, lat: 53.873661 },
            { lng: -2.904406, lat: 53.841262 },
            { lng: -2.782184, lat: 53.812893 },
            { lng: -2.714597, lat: 53.843059 },
            { lng: -2.706358, lat: 53.875456 },
            { lng: -2.72009, lat: 54.009636 },
            { lng: -2.541563, lat: 54.109586 },
            { lng: -2.471525, lat: 54.10717 },
            { lng: -2.429607, lat: 54.121299 },
            { lng: -2.434446, lat: 54.141776 },
            { lng: -2.545682, lat: 54.209295 },
            { lng: -2.4731, lat: 54.318142 },
            { lng: -2.39345, lat: 54.370175 },
            { lng: -2.250128, lat: 54.530237 },
            { lng: -2.552252, lat: 54.6766 },
            { lng: -2.38883, lat: 54.807403 },
            { lng: -2.383337, lat: 54.918846 },
            { lng: -2.314672, lat: 54.977998 },
            { lng: -2.390203, lat: 54.991394 },
            { lng: -2.581091, lat: 55.000847 },
            { lng: -2.851972, lat: 54.977959 },
            { lng: -3.020887, lat: 55.000808 },
            { lng: -3.081312, lat: 55.03309 },
            { lng: -3.284559, lat: 55.093646 },
            { lng: -3.277693, lat: 55.132134 },
            { lng: -3.379316, lat: 55.133704 },
            { lng: -3.438368, lat: 55.078712 },
            { lng: -3.586683, lat: 55.103075 },
            { lng: -3.745985, lat: 55.099146 },
            { lng: -3.688307, lat: 55.037024 },
            { lng: -3.560591, lat: 55.056694 },
            { lng: -3.449354, lat: 55.022069 },
            { lng: -3.279066, lat: 54.962194 }
      ]
    }),
  },
  {
    name: "East-Anglia",
    polygon: new google.maps.Polygon({
      paths: [
          { lng: 0.668892, lat: 52.663013 },
          { lng: 0.585121, lat: 52.52119 },
          { lng: 0.50135, lat: 52.358784 },
          { lng: 0.648292, lat: 52.237848 },
          { lng: 0.755409, lat: 52.205879 },
          { lng: 0.917457, lat: 52.172202 },
          { lng: 1.020454, lat: 52.09465 },
          { lng: 1.095985, lat: 52.009356 },
          { lng: 1.194862, lat: 52.000902 },
          { lng: 1.300606, lat: 52.020343 },
          { lng: 1.393989, lat: 52.135129 },
          { lng: 1.534065, lat: 52.228596 },
          { lng: 1.722206, lat: 52.386452 },
          { lng: 1.79499, lat: 52.493607 },
          { lng: 1.751045, lat: 52.573802 },
          { lng: 1.764778, lat: 52.625517 },
          { lng: 1.70298, lat: 52.613011 },
          { lng: 1.546425, lat: 52.650518 },
          { lng: 1.411842, lat: 52.699646 },
          { lng: 1.336311, lat: 52.731258 },
          { lng: 1.196236, lat: 52.734584 },
          { lng: 0.874885, lat: 52.702142 },
          { lng: 0.668892, lat: 52.663013 }
      ]
    }),
  },
  {
    name: "Edinburgh",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -3.4768323, lat: 56.0846974 },
        { lng: -3.5024275, lat: 56.059555 },
        { lng: -3.4172835, lat: 56.0442169 },
        { lng: -3.4392561, lat: 56.0150578 },
        { lng: -3.5024275, lat: 56.016593 },
        { lng: -3.7578596, lat: 56.0365456 },
        { lng: -3.8732161, lat: 56.0012379 },
        { lng: -3.6606306, lat: 55.852901 },
        { lng: -3.5991872, lat: 55.8241874 },
        { lng: -3.2970632, lat: 55.7562428 },
        { lng: -3.2366269, lat: 55.5775508 },
        { lng: -3.0471127, lat: 55.5363849 },
        { lng: -2.8987973, lat: 55.3712897 },
        { lng: -2.6709447, lat: 55.3903451 },
        { lng: -2.5320081, lat: 55.4301994 },
        { lng: -2.3263374, lat: 55.5491926 },
        { lng: -2.177699, lat: 55.6167693 },
        { lng: -2.0911816, lat: 55.8726311 },
        { lng: -2.1749524, lat: 55.9380653 },
        { lng: -2.4358777, lat: 56.0156731 },
        { lng: -2.5938062, lat: 56.0647698 },
        { lng: -2.8217725, lat: 56.0762678 },
        { lng: -3.0373792, lat: 55.9741992 },
        { lng: -3.1788281, lat: 55.9926376 },
        { lng: -3.3697156, lat: 56.0095317 },
        { lng: -3.3559827, lat: 56.0586361 },
        { lng: -3.3875684, lat: 56.0915931 },
        { lng: -3.4768323, lat: 56.0846974 }
      ],
    }),
  },
  {
    name: "Hull",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -0.926362, lat: 53.696267 },
        { lng: -0.898896, lat: 53.69464 },
        { lng: -0.874176, lat: 53.69708 },
        { lng: -0.849457, lat: 53.687322 },
        { lng: -0.813752, lat: 53.709274 },
        { lng: -0.784912, lat: 53.698706 },
        { lng: -0.739594, lat: 53.704397 },
        { lng: -0.692902, lat: 53.701145 },
        { lng: -0.64209, lat: 53.725527 },
        { lng: -0.596772, lat: 53.713338 },
        { lng: -0.508881, lat: 53.70521 },
        { lng: -0.355072, lat: 53.725527 },
        { lng: -0.268555, lat: 53.736089 },
        { lng: -0.197144, lat: 53.691388 },
        { lng: -0.142212, lat: 53.644198 },
        { lng: -0.054322, lat: 53.625469 },
        { lng: 0.034942, lat: 53.642569 },
        { lng: 0.089874, lat: 53.62384 },
        { lng: 0.155792, lat: 53.628727 },
        { lng: 0.120086, lat: 53.666172 },
        { lng: -0.048828, lat: 53.802645 },
        { lng: -0.143586, lat: 53.906328 },
        { lng: -0.190278, lat: 53.970999 },
        { lng: -0.217743, lat: 54.042021 },
        { lng: -0.291901, lat: 54.032344 },
        { lng: -0.382538, lat: 53.996032 },
        { lng: -0.418244, lat: 53.935442 },
        { lng: -0.527426, lat: 53.927099 },
        { lng: -0.559693, lat: 53.935442 },
        { lng: -0.677796, lat: 53.938676 },
        { lng: -0.723114, lat: 53.878003 },
        { lng: -0.790406, lat: 53.856139 },
        { lng: -0.881043, lat: 53.799401 },
        { lng: -0.96344, lat: 53.731215 },
        { lng: -0.926362, lat: 53.696267 }
      ]
    }),
  },
  {
    name: "Lancashire",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -2.267663, lat: 53.968304 },
        { lng: -2.284256, lat: 53.938448 },
        { lng: -2.365281, lat: 53.918233 },
        { lng: -2.444932, lat: 53.890726 },
        { lng: -2.47789, lat: 53.84862 },
        { lng: -2.541062, lat: 53.840518 },
        { lng: -2.696244, lat: 53.832414 },
        { lng: -2.796494, lat: 53.809716 },
        { lng: -2.899491, lat: 53.832414 },
        { lng: -2.953049, lat: 53.85834 },
        { lng: -2.981888, lat: 53.88506 },
        { lng: -3.007981, lat: 53.932789 },
        { lng: -3.067032, lat: 53.930363 },
        { lng: -3.067032, lat: 53.864819 },
        { lng: -3.078019, lat: 53.774021 },
        { lng: -3.031327, lat: 53.724486 },
        { lng: -2.880265, lat: 53.743982 },
        { lng: -2.778641, lat: 53.766716 },
        { lng: -2.743626, lat: 53.773626 },
        { lng: -2.678391, lat: 53.772398 },
        { lng: -2.649164, lat: 53.740043 },
        { lng: -2.640661, lat: 53.713948 },
        { lng: -2.628644, lat: 53.677766 },
        { lng: -2.580236, lat: 53.601844 },
        { lng: -2.541784, lat: 53.563527 },
        { lng: -2.45252, lat: 53.529868 },
        { lng: -2.418531, lat: 53.519663 },
        { lng: -2.402395, lat: 53.49945 },
        { lng: -2.404454, lat: 53.462879 },
        { lng: -2.373702, lat: 53.435585 },
        { lng: -2.316907, lat: 53.413182 },
        { lng: -2.343343, lat: 53.3921 },
        { lng: -2.32634, lat: 53.379711 },
        { lng: -2.384448, lat: 53.370239 },
        { lng: -2.295621, lat: 53.361583 },
        { lng: -2.281203, lat: 53.357796 },
        { lng: -2.246183, lat: 53.349084 },
        { lng: -2.242063, lat: 53.337195 },
        { lng: -2.261632, lat: 53.326124 },
        { lng: -2.23142, lat: 53.325099 },
        { lng: -2.202581, lat: 53.325304 },
        { lng: -2.187647, lat: 53.340579 },
        { lng: -2.170308, lat: 53.344985 },
        { lng: -2.182243, lat: 53.361024 },
        { lng: -2.149746, lat: 53.360441 },
        { lng: -2.107656, lat: 53.339354 },
        { lng: -2.090314, lat: 53.353387 },
        { lng: -2.063535, lat: 53.367524 },
        { lng: -2.071431, lat: 53.41748 },
        { lng: -2.023901, lat: 53.440196 },
        { lng: -1.952403, lat: 53.441729 },
        { lng: -1.949552, lat: 53.460018 },
        { lng: -2.008758, lat: 53.477181 },
        { lng: -2.009633, lat: 53.509456 },
        { lng: -1.982511, lat: 53.531296 },
        { lng: -1.979947, lat: 53.563519 },
        { lng: -1.975644, lat: 53.58432 },
        { lng: -2.013062, lat: 53.589516 },
        { lng: -2.037442, lat: 53.607956 },
        { lng: -2.082576, lat: 53.616506 },
        { lng: -2.128766, lat: 53.66007 },
        { lng: -2.165302, lat: 53.701144 },
        { lng: -2.181638, lat: 53.714354 },
        { lng: -2.195028, lat: 53.743805 },
        { lng: -2.203612, lat: 53.76177 },
        { lng: -2.184728, lat: 53.766946 },
        { lng: -2.190759, lat: 53.786149 },
        { lng: -2.152306, lat: 53.837233 },
        { lng: -1.994378, lat: 53.882183 },
        { lng: -1.969659, lat: 53.926681 },
        { lng: -1.925288, lat: 53.95352 },
        { lng: -1.973779, lat: 53.982035 },
        { lng: -2.032144, lat: 53.982438 },
        { lng: -2.092568, lat: 53.997779 },
        { lng: -2.164666, lat: 54.005851 },
        { lng: -2.236077, lat: 54.023603 },
        { lng: -2.272469, lat: 54.054651 },
        { lng: -2.245004, lat: 54.084467 },
        { lng: -2.307488, lat: 54.088092 },
        { lng: -2.304742, lat: 54.044976 },
        { lng: -2.267663, lat: 53.968304 }
      ]
    }),
  },
  {
    name: "Leicester",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.61016, lat: 52.819008 },
        { lng: -1.61428, lat: 52.840581 },
        { lng: -1.650672, lat: 52.842655 },
        { lng: -1.688438, lat: 52.820253 },
        { lng: -1.699424, lat: 52.789121 },
        { lng: -1.666465, lat: 52.769184 },
        { lng: -1.630753, lat: 52.78518 },
        { lng: -1.595054, lat: 52.752979 },
        { lng: -1.542869, lat: 52.701831 },
        { lng: -1.579948, lat: 52.658121 },
        { lng: -1.623207, lat: 52.631873 },
        { lng: -1.62252, lat: 52.60144 },
        { lng: -1.599178, lat: 52.52955 },
        { lng: -1.638972, lat: 52.410862 },
        { lng: -1.604667, lat: 52.332463 },
        { lng: -1.61428, lat: 52.261495 },
        { lng: -1.544221, lat: 52.250597 },
        { lng: -1.474187, lat: 52.261101 },
        { lng: -1.439872, lat: 52.239636 },
        { lng: -1.388718, lat: 52.236489 },
        { lng: -1.358161, lat: 52.240897 },
        { lng: -1.155601, lat: 52.241738 },
        { lng: -0.925575, lat: 52.233328 },
        { lng: -0.909782, lat: 52.248465 },
        { lng: -0.911155, lat: 52.257712 },
        { lng: -1.009346, lat: 52.289224 },
        { lng: -1.104789, lat: 52.309379 },
        { lng: -1.178947, lat: 52.368534 },
        { lng: -1.170981, lat: 52.4471 },
        { lng: -0.95697, lat: 52.463622 },
        { lng: -0.888496, lat: 52.458999 },
        { lng: -0.865837, lat: 52.502073 },
        { lng: -1.00443, lat: 52.55767 },
        { lng: -1.001734, lat: 52.629078 },
        { lng: -0.978446, lat: 52.715144 },
        { lng: -0.933814, lat: 52.723878 },
        { lng: -0.855537, lat: 52.750901 },
        { lng: -0.865837, lat: 52.786214 },
        { lng: -0.971571, lat: 52.779309 },
        { lng: -1.071121, lat: 52.748359 },
        { lng: -1.131857, lat: 52.786011 },
        { lng: -1.250358, lat: 52.790367 },
        { lng: -1.340995, lat: 52.776662 },
        { lng: -1.447425, lat: 52.775831 },
        { lng: -1.61016, lat: 52.819008 }
      ]
    }),
  },
  {
    name: "Peterborough",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -0.812876, lat: 52.542512 },
        { lng: -0.876053, lat: 52.440887 },
        { lng: -0.806009, lat: 52.375993 },
        { lng: -0.723612, lat: 52.288717 },
        { lng: -0.654947, lat: 52.213051 },
        { lng: -0.529978, lat: 52.117022 },
        { lng: -0.45582, lat: 52.107745 },
        { lng: -0.245706, lat: 52.189484 },
        { lng: -0.052072, lat: 52.291237 },
        { lng: 0.302237, lat: 52.384376 },
        { lng: 0.309516, lat: 52.415501 },
        { lng: 0.272052, lat: 52.529068 },
        { lng: 0.284384, lat: 52.615531 },
        { lng: 0.221213, lat: 52.805642 },
        { lng: 0.10723, lat: 52.843814 },
        { lng: -0.03422, lat: 52.847961 },
        { lng: -0.183908, lat: 52.849619 },
        { lng: -0.301398, lat: 52.834497 },
        { lng: -0.646707, lat: 52.822242 },
        { lng: -0.759317, lat: 52.702577 },
        { lng: -0.776504, lat: 52.649673 },
        { lng: -0.79365, lat: 52.596766 },
        { lng: -0.812876, lat: 52.542512 }
      ]
    }),
  },
  {
    name: "Rasen",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.063415, lat: 53.352037 },
        { lng: -1.049111, lat: 53.313824 },
        { lng: -0.818398, lat: 53.146537 },
        { lng: -0.831444, lat: 53.106571 },
        { lng: -0.827324, lat: 53.062441 },
        { lng: -0.809471, lat: 53.015375 },
        { lng: -0.736, lat: 52.942611 },
        { lng: -0.671456, lat: 52.893342 },
        { lng: -0.5458, lat: 52.869309 },
        { lng: -0.371392, lat: 52.875526 },
        { lng: -0.205223, lat: 52.893342 },
        { lng: 0.028352, lat: 52.926549 },
        { lng: 0.18216, lat: 53.00182 },
        { lng: 0.335969, lat: 53.066646 },
        { lng: 0.378541, lat: 53.2067 },
        { lng: 0.323609, lat: 53.311852 },
        { lng: 0.25706, lat: 53.380672 },
        { lng: 0.212373, lat: 53.435974 },
        { lng: 0.158212, lat: 53.501566 },
        { lng: 0.041398, lat: 53.534441 },
        { lng: -0.052672, lat: 53.5736 },
        { lng: -0.205794, lat: 53.651811 },
        { lng: -0.27851, lat: 53.726749 },
        { lng: -0.534698, lat: 53.691675 },
        { lng: -0.626708, lat: 53.713625 },
        { lng: -0.710479, lat: 53.694928 },
        { lng: -0.817596, lat: 53.694114 },
        { lng: -0.857421, lat: 53.647741 },
        { lng: -0.908233, lat: 53.571154 },
        { lng: -0.967284, lat: 53.444564 },
        { lng: -1.073028, lat: 53.442928 },
        { lng: -1.085387, lat: 53.40201 },
        { lng: -1.063415, lat: 53.352037 }
      ]
    }),
  },
  {
    name: "Scarborough",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -0.70458, lat: 54.521592 },
        { lng: -1.064382, lat: 54.250496 },
        { lng: -1.016154, lat: 54.164935 },
        { lng: -0.889974, lat: 54.103407 },
        { lng: -0.723806, lat: 53.98972 },
        { lng: -0.527426, lat: 53.927099 },
        { lng: -0.425918, lat: 53.946721 },
        { lng: -0.393677, lat: 54.001828 },
        { lng: -0.309759, lat: 54.034103 },
        { lng: -0.247615, lat: 54.051852 },
        { lng: -0.210882, lat: 54.057486 },
        { lng: -0.131918, lat: 54.103407 },
        { lng: -0.1079, lat: 54.098585 },
        { lng: -0.063253, lat: 54.116288 },
        { lng: -0.250021, lat: 54.180634 },
        { lng: -0.26032, lat: 54.199111 },
        { lng: -0.250021, lat: 54.215981 },
        { lng: -0.357138, lat: 54.256112 },
        { lng: -0.398986, lat: 54.306594 },
        { lng: -0.417562, lat: 54.357069 },
        { lng: -0.509461, lat: 54.42341 },
        { lng: -0.518427, lat: 54.444986 },
        { lng: -0.563131, lat: 54.483315 },
        { lng: -0.70458,  lat: 54.521592 }
      ]
    }),
  },
  {
    name: "South-Tyne",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.313839, lat: 54.820034 },
        { lng: -1.352918, lat: 54.883626 },
        { lng: -1.355664, lat: 54.895869 },
        { lng: -1.352918, lat: 54.910871 },
        { lng: -1.361245, lat: 54.933727 },
        { lng: -1.357468, lat: 54.941419 },
        { lng: -1.347855, lat: 54.954433 },
        { lng: -1.353349, lat: 54.96626 },
        { lng: -1.371888, lat: 54.977295 },
        { lng: -1.373261, lat: 54.984388 },
        { lng: -1.41446, lat: 55.009891 },
        { lng: -1.438321, lat: 55.005461 },
        { lng: -1.441582, lat: 55.000539 },
        { lng: -1.449136, lat: 54.987638 },
        { lng: -1.513236, lat: 54.987346 },
        { lng: -1.531603, lat: 54.981042 },
        { lng: -1.536238, lat: 54.962518 },
        { lng: -1.553576, lat: 54.959069 },
        { lng: -1.565592, lat: 54.963996 },
        { lng: -1.57675, lat: 54.963996 },
        { lng: -1.584818, lat: 54.966854 },
        { lng: -1.594432, lat: 54.970402 },
        { lng: -1.606791, lat: 54.967938 },
        { lng: -1.611598, lat: 54.981042 },
        { lng: -1.623328, lat: 54.985292 },
        { lng: -2.084754, lat: 55.186507 },
        { lng: -2.230322, lat: 55.217072 },
        { lng: -2.449362, lat: 55.177098 },
        { lng: -2.40885, lat: 55.122166 },
        { lng: -2.279738, lat: 54.969854 },
        { lng: -2.375182, lat: 54.910295 },
        { lng: -2.366942, lat: 54.80437 },
        { lng: -2.205886, lat: 54.751868 },
        { lng: -1.967992, lat: 54.790922 },
        { lng: -1.875577, lat: 54.827571 },
        { lng: -1.814282, lat: 54.814724 },
        { lng: -1.728292, lat: 54.809768 },
        { lng: -1.637654, lat: 54.858016 },
        { lng: -1.556225, lat: 54.868862 },
        { lng: -1.562404, lat: 54.844752 },
        { lng: -1.511936, lat: 54.807967 },
        { lng: -1.444645, lat: 54.820628 },
        { lng: -1.408596, lat: 54.806779 },
        { lng: -1.313839, lat: 54.820034 }
      ]
    }),
  },
  {
    name: "St-Helens",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -2.403669, lat: 53.45197 },
        { lng: -2.405729, lat: 53.468322 },
        { lng: -2.407103, lat: 53.495291 },
        { lng: -2.426329, lat: 53.519792 },
        { lng: -2.541784, lat: 53.563527 },
        { lng: -2.587004, lat: 53.603806 },
        { lng: -2.596617, lat: 53.618472 },
        { lng: -2.635069, lat: 53.677487 },
        { lng: -2.639876, lat: 53.710012 },
        { lng: -2.662535, lat: 53.751445 },
        { lng: -2.678391, lat: 53.772398 },
        { lng: -2.69824, lat: 53.770118 },
        { lng: -2.736692, lat: 53.765247 },
        { lng: -2.787504, lat: 53.747385 },
        { lng: -2.951613, lat: 53.716108 },
        { lng: -3.03607, lat: 53.653891 },
        { lng: -3.119154, lat: 53.552439 },
        { lng: -3.077269, lat: 53.51571 },
        { lng: -3.053923, lat: 53.478131 },
        { lng: -3.01959, lat: 53.442564 },
        { lng: -3.035383, lat: 53.442973 },
        { lng: -3.060789, lat: 53.445836 },
        { lng: -3.14868, lat: 53.415563 },
        { lng: -3.202238, lat: 53.392639 },
        { lng: -3.181639, lat: 53.352492 },
        { lng: -3.110914, lat: 53.278655 },
        { lng: -3.071776, lat: 53.266747 },
        { lng: -3.007918, lat: 53.281118 },
        { lng: -2.944746, lat: 53.294253 },
        { lng: -2.881575, lat: 53.334455 },
        { lng: -2.849989, lat: 53.320512 },
        { lng: -2.819777, lat: 53.328714 },
        { lng: -2.801924, lat: 53.320102 },
        { lng: -2.777891, lat: 53.332405 },
        { lng: -2.753859, lat: 53.339785 },
        { lng: -2.759352, lat: 53.319691 },
        { lng: -2.734633, lat: 53.320512 },
        { lng: -2.7003, lat: 53.335685 },
        { lng: -2.676954, lat: 53.348393 },
        { lng: -2.594557, lat: 53.364376 },
        { lng: -2.496367, lat: 53.370112 },
        { lng: -2.429075, lat: 53.365605 },
        { lng: -2.375517, lat: 53.363557 },
        { lng: -2.317152, lat: 53.35659 },
        { lng: -2.2684, lat: 53.346754 },
        { lng: -2.279387, lat: 53.331995 },
        { lng: -2.263594, lat: 53.318871 },
        { lng: -2.210035, lat: 53.320512 },
        { lng: -2.192183, lat: 53.323793 },
        { lng: -2.179823, lat: 53.334865 },
        { lng: -2.160597, lat: 53.338555 },
        { lng: -2.146864, lat: 53.346754 },
        { lng: -2.146864, lat: 53.354951 },
        { lng: -2.160597, lat: 53.35864 },
        { lng: -2.177076, lat: 53.35823 },
        { lng: -2.16609, lat: 53.348393 },
        { lng: -2.18051, lat: 53.338965 },
        { lng: -2.196989, lat: 53.323793 },
        { lng: -2.26428, lat: 53.320922 },
        { lng: -2.26428, lat: 53.328714 },
        { lng: -2.251234, lat: 53.346344 },
        { lng: -2.29106, lat: 53.357 },
        { lng: -2.384448, lat: 53.370239 },
        { lng: -2.331572, lat: 53.381172 },
        { lng: -2.343343, lat: 53.3921 },
        { lng: -2.326078, lat: 53.40533 },
        { lng: -2.330885, lat: 53.414335 },
        { lng: -2.345991, lat: 53.408196 },
        { lng: -2.372084, lat: 53.430702 },
        { lng: -2.403669, lat: 53.45197 }
      ]
    }),
  },
  {
    name: "Stoke",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.812654, lat: 52.905749 },
        { lng: -1.932817, lat: 52.95128 },
        { lng: -1.968523, lat: 53.069436 },
        { lng: -1.974016, lat: 53.146929 },
        { lng: -2.070146, lat: 53.218527 },
        { lng: -2.05092, lat: 53.282617 },
        { lng: -2.126451, lat: 53.299035 },
        { lng: -2.1721, lat: 53.283656 },
        { lng: -2.220344, lat: 53.277601 },
        { lng: -2.302919, lat: 53.296983 },
        { lng: -2.351318, lat: 53.31525 },
        { lng: -2.399736, lat: 53.313805 },
        { lng: -2.40317, lat: 53.282617 },
        { lng: -2.402516, lat: 53.216446 },
        { lng: -2.498983, lat: 53.21298 },
        { lng: -2.552172, lat: 53.197143 },
        { lng: -2.536528, lat: 53.178415 },
        { lng: -2.468718, lat: 53.177778 },
        { lng: -2.484196, lat: 53.127121 },
        { lng: -2.556291, lat: 53.085111 },
        { lng: -2.647739, lat: 53.066144 },
        { lng: -2.755419, lat: 52.977748 },
        { lng: -2.703663, lat: 52.944484 },
        { lng: -2.54762, lat: 52.953346 },
        { lng: -2.535133, lat: 52.85766 },
        { lng: -2.409349, lat: 52.754741 },
        { lng: -2.25332, lat: 52.736955 },
        { lng: -2.024828, lat: 52.66426 },
        { lng: -2.014447, lat: 52.650415 },
        { lng: -1.997197, lat: 52.661561 },
        { lng: -1.923204, lat: 52.659887 },
        { lng: -1.905351, lat: 52.741025 },
        { lng: -1.851179, lat: 52.850355 },
        { lng: -1.812654, lat: 52.905749 }
      ]
    }),
  },
  {
    name: "Teesside",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.517822, lat: 54.805436 },
        { lng: -1.522399, lat: 54.780534 },
        { lng: -1.523073, lat: 54.768845 },
        { lng: -1.514136, lat: 54.761908 },
        { lng: -1.507951, lat: 54.740109 },
        { lng: -1.496969, lat: 54.722668 },
        { lng: -1.428588, lat: 54.689696 },
        { lng: -1.405531, lat: 54.641215 },
        { lng: -1.312834, lat: 54.588332 },
        { lng: -1.311575, lat: 54.56214 },
        { lng: -1.320501, lat: 54.545017 },
        { lng: -1.398779, lat: 54.505566 },
        { lng: -1.323591, lat: 54.398779 },
        { lng: -1.269943, lat: 54.394953 },
        { lng: -1.217758, lat: 54.430916 },
        { lng: -1.096908, lat: 54.431715 },
        { lng: -1.076309, lat: 54.453277 },
        { lng: -1.04541, lat: 54.487992 },
        { lng: -0.986358, lat: 54.500354 },
        { lng: -0.913574, lat: 54.50793 },
        { lng: -0.74261, lat: 54.538024 },
        { lng: -0.814697, lat: 54.559324 },
        { lng: -0.829117, lat: 54.570471 },
        { lng: -0.868942, lat: 54.57684 },
        { lng: -0.896408, lat: 54.578034 },
        { lng: -0.933487, lat: 54.593552 },
        { lng: -0.971939, lat: 54.589573 },
        { lng: -1.052277, lat: 54.616619 },
        { lng: -1.127121, lat: 54.636096 },
        { lng: -1.136047, lat: 54.64762 },
        { lng: -1.157333, lat: 54.638083 },
        { lng: -1.177246, lat: 54.663906 },
        { lng: -1.186172, lat: 54.68336 },
        { lng: -1.177246, lat: 54.698838 },
        { lng: -1.25827, lat: 54.736516 },
        { lng: -1.298096, lat: 54.76901 },
        { lng: -1.307709, lat: 54.784852 },
        { lng: -1.308395, lat: 54.803457 },
        { lng: -1.315948, lat: 54.816911 },
        { lng: -1.411392, lat: 54.804249 },
        { lng: -1.444645, lat: 54.820628 },
        { lng: -1.517822, lat: 54.805436 }
      ]
    }),
  },
  {
    name: "",
    polygon: new google.maps.Polygon({
      paths: [
        { lng: -1.32207, lat: 54.395411 },
        { lng: -1.478282, lat: 54.416793 },
        { lng: -1.608745, lat: 54.3308 },
        { lng: -1.679469, lat: 54.289138 },
        { lng: -1.715862, lat: 54.122474 },
        { lng: -2.057124, lat: 54.109192 },
        { lng: -2.053005, lat: 54.062874 },
        { lng: -1.925288, lat: 53.95352 },
        { lng: -1.912242, lat: 53.938972 },
        { lng: -1.783777, lat: 53.899583 },
        { lng: -1.695907, lat: 53.887966 },
        { lng: -1.598445, lat: 53.890036 },
        { lng: -1.496076, lat: 53.878758 },
        { lng: -1.415798, lat: 53.832129 },
        { lng: -1.415528, lat: 53.787533 },
        { lng: -1.368241, lat: 53.765829 },
        { lng: -1.297008, lat: 53.754659 },
        { lng: -1.279155, lat: 53.679893 },
        { lng: -1.350566, lat: 53.59929 },
        { lng: -1.32722, lat: 53.510367 },
        { lng: -1.181651, lat: 53.459704 },
        { lng: -0.966045, lat: 53.450708 },
        { lng: -0.902873, lat: 53.627804 },
        { lng: -1.000377, lat: 53.740041 },
        { lng: -0.803996, lat: 53.863319 },
        { lng: -0.718852, lat: 53.88437 },
        { lng: -0.698253, lat: 53.971698 },
        { lng: -0.854808, lat: 54.074156 },
        { lng: -0.948192, lat: 54.125693 },
        { lng: -1.060802, lat: 54.187613 },
        { lng: -1.070415, lat: 54.267891 },
        { lng: -1.248943, lat: 54.352415 },
        { lng: -1.275035, lat: 54.391613 },
        { lng: -1.32207, lat: 54.395411 }
      ]
    }),
  },
];

// use the geocoder to get the LatLng of the postcode
let geocoder = new google.maps.Geocoder();

// Take a written address, geocode it, and look it up in all the polygons.
const lookup = async (lat, lng) => {

  document.getElementById("PostcodeChecker").style.visibility = 'hidden';

  // Iterate through the polygons and see if the lat long is in any of them
  for (const poly of polygons) {
    const found = google.maps.geometry.poly.containsLocation(
      new google.maps.LatLng(lat, lng),
      poly.polygon
    );
    if (found) {
        console.log(`Found in ${poly.name} region`);
        // TEMP
        document.getElementById("PostcodeChecker").style.visibility = 'visible';
        //document.getElementById("postcode").value = userPostcode;
        return false;
    }
  }

  console.log("Not found in any region");
  document.querySelector("#PostcodeChecker").action ="/pages/thank-you/";
  document.getElementById("PostcodeChecker").submit();

  return true;

};

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("pcc-form__tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  // Show Previous button if not on first tab
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  // Show Next button if not on last tab
  // Rename to Submit if on last tab
  // And controll recaptcha
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    if (recaptchaRes == "") {
      document.getElementById("nextBtn").setAttribute("disabled", "disabled");
    }
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").removeAttribute("disabled");
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
  let ID = x[currentTab].getAttribute("id");
  let clientStatusField = document.getElementById("PCCActiveClient");

  if(n == 1){
    // Exit the function if any field in the current tab is invalid:
    let values = validateForm(ID);

    if (n == 1 && !values.valid) return false;

    sedDataLayerEvent(n, currentTab);

    if (ID == 'PPCFirstStep') {
      console.log("PPCFirstStep");
      let lat = document.getElementById("PCCLat").value;
      let lng = document.getElementById("PCCLng").value;
      lookup(lat,lng);
    }

    if (ID == 'PPCSecondStep' && clientStatusField) {
      if (clientStatusField.value == "existing-client") {
        console.log("PPCSecondStep value", clientStatusField.value);
        console.log("Existing customer", userData);
        sendUserData(userData, "Existing_customer");
        document.querySelector("#PostcodeChecker").action =
          "https://www.ringtons.co.uk/get-in-touch-i99";
        //document.getElementById("PostcodeChecker").submit();
      }
    }
    console.log("Raw Data", userData);
    //sending current data to raw data tab
    sendUserData(userData, "Raw_data");
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
    console.log("New_Leads", userData);
    sendUserData(userData, "New_Leads");
    document.querySelector("#PostcodeChecker").action =
      "/pages/well-be-in-touch";
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

  // Declare the truthy/falsy array
  let validValuesArr = [];

  // Regex
  let regexEm = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let regexName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  let regexLastName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  let regexPC = /[\S\s]+[\S]+/;
  let regexPhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;

  x = document.getElementsByClassName("pcc-form__tab");
  y = x[currentTab].getElementsByTagName("input");

  // First step
  if (ID == "PPCFirstStep") {
    // input fields
    let email = document.getElementById("PCCEmail");
    let name = document.getElementById("PCCName");
    let lastname = document.getElementById("PCCLastName");
    let phone = document.getElementById("PCCNumber");
    let address = document.getElementById("formatted_address_0");

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
    if (address) {
      validQ3 = address.value;
      if (validQ3 == "") {
        validValuesArr.push("0");
        address.className += " invalid";
        address.placeholder = "Please type your address";
      }  else {
        validValuesArr.push("1");
        userData.postcode = foundPostcode;
      }
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
        console.log("Existing_customer", userData);
        sendUserData(userData, "Existing_customer");
        valid = false;
        document.querySelector("#PostcodeChecker").action = "https://www.ringtons.co.uk/get-in-touch-i99";
      }
    }

    if (valid) {
      document.getElementsByClassName("pcc-form__step")[currentTab].className += " finish";
    }

    return {
      valid,
      userData,
    };
  }

  // Third Step
  if (ID == "PPCThirdStep") {

    let address = document.getElementById("line_1");
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
          userData.postcode = document.getElementById("formatted_address_0").value;
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
      document.getElementsByClassName("pcc-form__step")[currentTab].className += " finish";
    }

    return {
      valid,
      userData,
    };
  }

  // Fourth Step
  if (ID == "PPCFourthStep") {
    let referral = document.getElementById("PCCReferral");
    let referralOther = document.getElementById("PCCReferralOther");

    if (document.getElementById("price-list").checked) {
      userData.request += "Price List. ";
    }
    if (document.getElementById("delivery-days").checked) {
      userData.request += "Delivery Days. ";
    }
    if (document.getElementById("arrange-visit").checked) {
      userData.request += "Arrange a visit. ";
    }
    if (document.getElementById("other").checked) {
      userData.request += "Other request. ";
      if (document.getElementById("PCCRequestOther").value != "") {
        userData.request += document.getElementById("PCCRequestOther").value;
      }
    }

    // Empty the truthy/falsy array
    validValuesArr = [];

    // Validate address
    if (referral) {
      validQ1 = referral.value;
      validQ2 = referralOther.value;
      if (validQ1 == "other" && validQ2 == "") {
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
      document.getElementsByClassName("pcc-form__step")[currentTab].className += " finish";
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

// getaddress.io event listeners
document.addEventListener("getaddress-autocomplete-address-selected", function (e) {
  console.log(e.address);
  let address = e.address;
  let county = address.county;
  let town = address.town_or_city;
  let displayedAddress = "";
  let fullAddress = "";

  document.getElementById("PCCLat").value = address.latitude;
  document.getElementById("PCCLng").value = address.longitude;

  if (address.line_1 != "") {
    fullAddress += address.line_1;
    document.getElementById("line_1").value = address.line_1;
  } else {
    document.getElementById("line_1").value = '';
  }

  if (address.line_2 != "") {
    fullAddress += ", " + address.line_2;
    displayedAddress += address.line_2;
    document.getElementById("formatted_address_1").value = address.line_2;
  } else {
    document.getElementById("formatted_address_1").value = '';
  }

  if (address.line_3 != "") {
    fullAddress += ", " + address.line_3;
    document.getElementById("formatted_address_2").value = address.line_3;
  } else {
    document.getElementById("formatted_address_2").value = '-';
  }

  if (county == "") {
    document.getElementById("county").value = town;
    fullAddress += ", " + town;
    displayedAddress += ", " + town;
  } else {
    document.getElementById("county").value = county;
    fullAddress += ", " + town + ", " + county;
    displayedAddress += ", " + town + ", " + county;
  }

  displayedAddress += ", " + address.postcode;

  document.getElementById("auto-built-address").value = displayedAddress;
  document.getElementById("postcode").value = address.postcode;

  foundPostcode = address.postcode;
  userData.postcode = address.postcode;
  userData.address = fullAddress;

  console.log(userData);
});

document.addEventListener("getaddress-find-suggestions", function (e) {
  console.log(e.suggestions);
  if (e.suggestions.length <= 0) {
    document.querySelector("#getaddress_dropdown").classList.add("hidden");
    document.querySelector("#userPostcode").value =
      "Please add your address below.";
  }
});

document.addEventListener("getaddress-find-suggestions-failed", function (e) {
  console.log(e.status);
  console.log(e.message);
});

document.addEventListener("getaddress-find-address-selected-failed", function (e) {
    console.log(e.status);
    console.log(e.message);
  }
);
// end of getaddress.io event listeners

// 4th step hidden fields controls
document.getElementById("PCCReferral").addEventListener("change", function (e) {
  let referralElem = document.getElementById("PCCReferral");
  let referralOtherElem = document.getElementById("PCCReferralOther");
  if (referralElem.value == "other") {
    referralOtherElem.parentElement.classList.remove("hidden");
  } else {
    referralOtherElem.parentElement.classList.add("hidden");
  }
});

document.getElementById("other").addEventListener("change", function (e) {
  let requestElem = document.getElementById("other");
  let requestOtherElem = document.getElementById("PCCRequestOther");
  if (requestElem.checked) {
    requestOtherElem.parentElement.classList.remove("hidden");
  } else {
    requestOtherElem.parentElement.classList.add("hidden");
  }
});
// end of 4th step hidden fields controls


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

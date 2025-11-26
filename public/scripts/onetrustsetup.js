function OptanonWrapper() { }

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return true;
  }
}

function reloadOTBanner() {
  var otConsentSdk = document.getElementById("onetrust-consent-sdk");
  if (otConsentSdk) {
    otConsentSdk.remove();
  }

  if (window.OneTrust != null) {
    OneTrust.Init();

    setTimeout(function() {
      OneTrust.LoadBanner();

      var toggleDisplay = document.getElementsByClassName("ot-sdk-show-settings");
      for (var i = 0; i < toggleDisplay.length; i++) {
        toggleDisplay[i].onclick = function(event) {
          event.stopImmediatePropagation();
          window.OneTrust.ToggleInfoDisplay();
        };
      }
    }, 1000);
  }
}

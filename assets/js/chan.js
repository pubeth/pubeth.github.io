(function () {
  function applyPageConfig(config) {
    var active = String(config.active);
    if (active === "0" && config.officialQrContentUrl) {
      location.href = config.officialQrContentUrl;
      return false;
    }
    document.querySelector(".page-wrap").style.display = "block";
    return true;
  }

  fetch("assets/data/chan-device.json")
    .then(function (res) {
      if (!res.ok) throw new Error("chan-device.json");
      return res.json();
    })
    .then(function (data) {
      document.title = data.pageTitle;

      if (!applyPageConfig(data.pageConfig)) return;

      var iframe = document.getElementById("chan-iframe");
      if (data.iframe && data.iframe.src) {
        iframe.src = data.iframe.src;
      }
      if (data.iframe && data.iframe.height) {
        iframe.style.height = data.iframe.height;
      }

      document.getElementById("venue-site").textContent = data.venue.siteName;
      document.getElementById("venue-device-id").textContent = data.venue.deviceId;
      document.getElementById("venue-vendor").textContent = data.venue.vendor;

      var qr = document.getElementById("qr-image");
      qr.src = data.qrImage;
      qr.alt = "设备二维码";

      var foot = document.getElementById("footer-links");
      foot.innerHTML = "";
      data.footer.links.forEach(function (item, index) {
        if (index > 0) foot.appendChild(document.createElement("br"));
        var a = document.createElement("a");
        a.href = item.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = item.text;
        foot.appendChild(a);
      });
    })
    .catch(function (err) {
      console.error(err);
      document.querySelector(".page-wrap").style.display = "block";
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<p style="padding:1rem;color:#c00;">配置加载失败，请检查 assets/data/chan-device.json</p>'
      );
    });
})();

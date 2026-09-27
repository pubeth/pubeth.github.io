(function () {
  function scrollParentToVenue() {
    try {
      if (window.parent && window.parent !== window) {
        var target = window.parent.document.querySelector(".device-info");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
    } catch (e) {
      /* cross-origin guard */
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderRows(container, fields) {
    container.innerHTML = "";
    for (var i = 0; i < fields.length; i += 2) {
      var row = document.createElement("div");
      row.className = "ycxx-content";

      [fields[i], fields[i + 1]].forEach(function (field) {
        if (!field) return;
        var col = document.createElement("div");
        col.className = "ycxx-left";
        col.innerHTML =
          "<span>" +
          escapeHtml(field.label) +
          "</span><span>" +
          escapeHtml(field.value) +
          "</span>";
        row.appendChild(col);
      });

      container.appendChild(row);
    }

    var detailRow = document.createElement("div");
    detailRow.className = "ycxx-content";
    var col = document.createElement("div");
    col.className = "ycxx-left";
    var label = document.createElement("span");
    label.textContent = " ";
    var value = document.createElement("span");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = "详情";
    link.addEventListener("click", function (e) {
      e.preventDefault();
      scrollParentToVenue();
    });
    value.appendChild(link);
    col.appendChild(label);
    col.appendChild(value);
    detailRow.appendChild(col);
    container.appendChild(detailRow);
  }

  fetch("assets/data/chan-device.json")
    .then(function (res) {
      if (!res.ok) throw new Error("chan-device.json");
      return res.json();
    })
    .then(function (data) {
      var m = data.ministry;
      document.getElementById("ministry-header").textContent = m.header;
      document.querySelector(".first .title-text").textContent = m.sectionTitle;
      renderRows(document.getElementById("ycxx-root"), m.fields);
    })
    .catch(function (err) {
      console.error(err);
      document.getElementById("ycxx-root").innerHTML =
        "<p style='padding:1rem;color:#c00;'>设备信息加载失败</p>";
    });
})();

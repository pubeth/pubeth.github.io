(function () {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".nav-mobile");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }

  const projectsHost = document.getElementById("projects-grid");
  if (!projectsHost) return;

  fetch("assets/data/projects.json")
    .then(function (res) {
      if (!res.ok) throw new Error("projects.json");
      return res.json();
    })
    .then(function (items) {
      projectsHost.innerHTML = "";
      items.forEach(function (project) {
        const a = document.createElement("a");
        a.className = "project-card";
        a.href = project.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        const h3 = document.createElement("h3");
        h3.textContent = project.name;

        const p = document.createElement("p");
        p.textContent = project.description;

        const hint = document.createElement("span");
        hint.className = "link-hint";
        hint.textContent = "查看项目 →";

        a.appendChild(h3);
        a.appendChild(p);
        a.appendChild(hint);
        projectsHost.appendChild(a);
      });
    })
    .catch(function () {
      projectsHost.innerHTML =
        '<p class="about-text">项目列表加载失败，请稍后刷新或编辑 <code>assets/data/projects.json</code>。</p>';
    });
})();

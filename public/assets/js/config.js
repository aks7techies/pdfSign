/**
* Theme: Powerx - Responsive Bootstrap 5 Admin Dashboard
* Author: Coderthemes
* Module/App: Theme Config Js
*/

(function () {
    var savedConfig = sessionStorage.getItem("__POWERX_CONFIG__");
    // var savedConfig = localStorage.getItem("__POWERX_CONFIG__");

    var html = document.getElementsByTagName("html")[0];

    //  Default Config Value
    var defaultConfig = {
        theme: "light",

        layout: {
            position: "fixed",
        },

        topbar: {
            color: "light",
        },

        menu: {
            color: "light",
        },

        // This option for only vertical (left Sidebar) layout
        sidenav: {
            size: "default",
            user: false,
        },
    };

    this.html = document.getElementsByTagName('html')[0];

    config = Object.assign(JSON.parse(JSON.stringify(defaultConfig)), {});

    var layoutColor = this.html.getAttribute('data-bs-theme');
    config['theme'] = layoutColor !== null ? layoutColor : defaultConfig.theme;

    var layoutMode = this.html.getAttribute('data-layout-position');
    config['layout']['position'] = layoutMode !== null ? layoutMode : defaultConfig.layout.position;

    var topbarColor = this.html.getAttribute('data-topbar-color');
    config['topbar']['color'] = topbarColor != null ? topbarColor : defaultConfig.topbar.color;

    var leftbarSize = this.html.getAttribute('data-sidenav-size');
    config['sidenav']['size'] = leftbarSize !== null ? leftbarSize : defaultConfig.sidenav.size;

    var sidebarUser = this.html.getAttribute('data-sidenav-user')
    config['sidenav']['user'] = sidebarUser !== null ? true : defaultConfig.sidenav.user;

    var menuColor = this.html.getAttribute('data-menu-color');
    config['menu']['color'] = menuColor !== null ? menuColor : defaultConfig.menu.color;

    window.defaultConfig = JSON.parse(JSON.stringify(config));

    if (savedConfig !== null) {
        config = JSON.parse(savedConfig);
    }

    window.config = config;

    if (config) {
        html.setAttribute("data-bs-theme", config.theme);
        html.setAttribute("data-menu-color", config.menu.color);
        html.setAttribute("data-topbar-color", config.topbar.color);
        html.setAttribute("data-layout-position", config.layout.position);

        let size = config.sidenav.size;
        if (window.innerWidth <= 767) {
            size = "full";
        } else if (window.innerWidth >= 767 && window.innerWidth <= 1140) {
            if (self.config.sidenav.size !== 'full' && self.config.sidenav.size !== 'fullscreen') {
                size = "condensed";
            }
        }
        html.setAttribute("data-sidenav-size", size);
        if (config.sidenav.user && config.sidenav.user.toString() === "true") {
            html.setAttribute("data-sidenav-user", true);
        } else {
            html.removeAttribute("data-sidenav-user");
        }
    }
})();
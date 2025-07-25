// ==UserScript==
// @name         Vjudge Better!
// @namespace    https://github.com/1000ttank/vjudge-better
// @version      1.1
// @description  一个让vjudge更美观更便捷的脚本
// @author       1000ttank
// @match        https://vjudge.net/*
// @icon         https://vjudge.net/favicon.ico
// @require      https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @run-at       document-body
// @license      MIT
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    const PAGE_TYPES = [
        /\/problem$/, /\/problem\/[^\/]+$/, /\/problem\/[^\/]+\/origin$/, /\/problem\/description\/[^\/]+$/,
        /\/status$/, /\/solution\/[^\/]+\/origin$/, /\/solution\/[^\/]+\/[^\/]+$/,
        /\/contest$/, /\/contest\/[^\/]+$/, /\/contest\/statistic$/,
        /\/workbook$/, /\/article\/create$/, /\/article\/[^\/]+$/,
        /\/user$/, /\/user\/[^\/]+$/,
        /\/group$/, /\/group\/[^\/]+$/,
        /\/comment$/, /\/message$/
    ];

    function detectPageType(path) {
        const cleanPath = path.replace(/\/$/, "");
        return PAGE_TYPES.findIndex(re => re.test(cleanPath));
    }

    const pageId = detectPageType(location.pathname);

    if (pageId === -1 && location.pathname !== "/") {
        console.warn("Unknown VJudge page – possibly 404.");
    }

    const pagesNeedingBg = new Set([0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const frostedBackground = `body {
        background: #f0f0f0 url(http://static.rqnoj.cn/images/bg.jpg) no-repeat center top fixed !important;
        background-size: cover !important;
    }`;

    if (pagesNeedingBg.has(pageId) || pageId === -1) {
        GM_addStyle(frostedBackground);
        $("body").prepend("<nav style='height: 60px'></nav>");
    }

    if (pageId === 3) {
        GM_addStyle("dd {background-color: rgba(255,255,255,0.7) !important; border-radius: 4px !important;}");
    }

    // Global UI Theme
    GM_addStyle(`
        .navbar {
            background-color: rgba(255, 255, 255, 0.75) !important;
            backdrop-filter: blur(10px);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar a,
        .navbar .nav-link,
        .navbar-brand {
            color: #000 !important;
            font-weight: 500;
        }
        .navbar a:hover,
        .navbar .nav-link:hover {
            background-color: rgba(255, 255, 255, 1.0);
            color: #000 !important;
        }
        .navbar .nav-item.active > .nav-link {
            font-weight: bold !important;
        }
        ::-webkit-scrollbar {
            display: none;
        }
        #prob-ads, #img-support {
            display: none !important;
        }
        .card,
        .list-group-item,
        .btn-secondary,
        .page-link,
        .dropdown-menu,
        .modal-content,
        .form-control,
        .tab-content {
            background-color: rgba(255, 255, 255, 0.65) !important;
            backdrop-filter: blur(6px);
            border-radius: 0.5rem;
        }
        .card:hover,
        .dropdown-menu:hover {
            background-color: rgba(255, 255, 255, 0.85) !important;
        }
        .form-control {
            border: 1px solid #ccc;
        }
        .body-footer {
            color: #333;
            background: rgba(255, 255, 255, 0.85);
            padding: 1em;
            border-top: 1px solid #ddd;
        }
        .list-group-item.active,
        .page-item.active .page-link,
        .navbar .nav-link.active,
        .btn.active,
        .dropdown-item.active,
        .tag.active {
            background-color: #007bff !important;
            color: #fff !important;
        }
        @media (max-width: 768px) {
            .navbar {
                font-size: 14px;
            }
        }
    `);

    // Footer credit
    $("body > div.body-footer").append(
        '<p style="text-align:center">Theme enhanced by <a href="https://github.com/1000ttank/vjudge-better" target="_blank">vjudge-better</a></p>'
    );
})();

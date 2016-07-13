require(['gitbook', 'jquery'], function (gitbook, $) {

  var opts; // 配置的 隐藏元素 数组

  function getRootPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    if (webName == "") {
      return window.location.protocol + '//' + window.location.host;
    } else {
      return window.location.protocol + '//' + window.location.host + '/' + webName;
    }
  }

  // 基础设置
  function setBase() {
    // logo
    var logo = gitbook.state.config.pluginsConfig["theme-hqbook"]["logo"] || './gitbook/gitbook-plugin-theme-hqbook/logo.png';
    $(".header-inner .logo img").attr("src", logo);
    // 标题
    var $title = $(".header-inner .title");
    $title.text(gitbook.state.config.title);

    // 搜索框
    var $search = $('#book-search-input');
    var placeholder = gitbook.state.config.pluginsConfig["theme-hqbook"]["search-placeholder"] || "输入关键字搜索"
    $search.find("input").attr("placeholder", placeholder);
    $search.append("<span id='searchBtn'>搜索</span>");
    $search.focus();
    $("#searchBtn").click(function (e) {
    });

    // 隐藏元素, 比如去掉gitbook-link
    $.map(opts, function (ele) {
      $(ele).hide();
    });
  }

  gitbook.events.on('start', function (e, config) {
    opts = config['theme-hqbook']["hide-elements"];
  });

  gitbook.events.on('page.change', function () {
    setBase();
  });
});

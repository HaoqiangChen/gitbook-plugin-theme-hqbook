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
  
  // 生成内容导航
  function generateSectionNavigator() {
    $(".page-inner .markdown-section").find("h1,h2,h3").each(function () {
      var cls = "anchor-h1";
      if ($(this).is("h2")) {
        cls = "anchor-h2";
      }
      if ($(this).is("h3")) {
        cls = "anchor-h3";
      }
      var text = $(this).text();
      var href = $(this).attr("id");
      $(".book-anchor-body").append("<a id='an_" + text + "' class='anchor-text " + cls + "' title='" + text + "'  href='#" + href + "'>" + text + "</a>")
    });

    $(".book-anchor-title").click(function () {
      // $(".book-anchor-body").toggle();
    });

    $(".book-anchor-body>a").click(function () {
      $(".book-anchor-body>a").removeClass("selected");
      $(this).addClass("selected");
    });

    // 获取hash值定向到指定位置
    var hash = decodeURIComponent(location.hash);
    if (hash) {
      hash = hash.substring(1);
      $("#an_" + hash).addClass("selected");
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
	
	// 返回顶部按钮
    var $bookTotop = ['<div class="book-toTop"><i class="fa fa-arrow-up"></i></div>'].join("");
    $(".book").append($bookTotop)
    $(".book-toTop").hide();
    $('.book-body,.body-inner').on('scroll', function () {
      if ($(this).scrollTop() > 100) {
        $('.book-toTop').fadeIn();
      } else {
        $('.book-toTop').fadeOut();
      }
    });
    $('.book-toTop').click(function () {
      $('.book-body,.body-inner').animate({
        scrollTop: 0
      }, 800);
      return false;
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
	generateSectionNavigator();
  });
});

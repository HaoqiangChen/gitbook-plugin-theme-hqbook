require(['gitbook', 'jQuery'], function (gitbook, $) {

  const TERMINAL_HOOK = '**[terminal]'

  var pluginConfig = {}; // 该插件配置
  var opts; // 配置的 隐藏元素 数组
  var timeouts = {};

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
    var logo = pluginConfig["logo"] || './gitbook/gitbook-plugin-theme-hqbook/logo.png';
    $(".header-inner .logo img").attr("src", logo);
    // 标题
    var $title = $(".header-inner .title");
    $title.text(gitbook.state.config.title);

    // 搜索框
    var $search = $('#book-search-input');
    var placeholder = pluginConfig["search-placeholder"] || "输入关键字搜索"
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

  /**
   * 代码添加行号&复制按钮
   */
  function addCopyButton(wrapper) {
    wrapper.append(
      $('<i class="fa fa-clone t-copy"></i>')
        .click(function () {
          copyCommand($(this));
        })
    );
  }

  function addCopyTextarea() {
    // 允许添加复制的文本区域
    $('body').append('<textarea id="code-textarea" />');
  }

  function copyCommand(button) {
    pre = button.parent();
    textarea = $('#code-textarea');
    textarea.val(pre.text());
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    pre.focus();
    updateCopyButton(button);
  }

  function format_code_block(block) {
    // 为多行块添加行号
    code = block.children('code');
    lines = code.html().split('\n');

    if (lines[lines.length - 1] == '') {
      lines.splice(-1, 1);
    }

    if (pluginConfig.copyLines && lines.length > 1) {
      // console.log(lines);
      lines = lines.map(line => '<span class="code-line">' + line + '</span>');
      // console.log(lines);
      code.html(lines.join('\n'));
    }

    // 将包装器添加到pre元素
    wrapper = block.wrap('<div class="code-wrapper"></div>');
    if (pluginConfig.copyButtons) {
      addCopyButton(wrapper);
    }
  }

  function updateCopyButton(button) {
    id = button.attr('data-command');
    button.removeClass('fa-clone').addClass('fa-check');
    if (id in timeouts) {
      clearTimeout(timeouts[id]);
    }
    timeouts[id] = window.setTimeout(function () {
      button.removeClass('fa-check').addClass('fa-clone');
    }, 1000);
  }

  gitbook.events.on('start', function (e, config) {
    pluginConfig = config['theme-hqbook'];
    opts = pluginConfig["hide-elements"];

    if (pluginConfig.copyButtons) {
      addCopyTextarea();
    }
  });

  gitbook.events.on('page.change', function () {
    setBase();
    generateSectionNavigator();

    $('pre').each(function () {
      format_code_block($(this));
    });
  });
});

;(function ( $, window, undefined ) {

  var pluginName = 'mobileNav',
      document = window.document,
      defaults = {
        breakpoint: 400,
        openText: "open menu",
        closeText: "close menu",
        triggerClass: "mobileNavTrigger",
        pluginActiveClass: "mobileNavActive",
        isOpenClass: "mobileNavOpen",
        afterOpen: undefined,
        afterClose: undefined,
        afterConstruct: undefined,
        afterDestruct: undefined,
        showLabel: false,
        labelClass: "mobileNavLabel",
        activeItemSelector: "ul > li.active > a",
        noActiveItemText: "Menu"
      };

  function Plugin( element, options ) {

    var _self = this;

    _self.element = $(element);
    _self.options = $.extend( {}, defaults, options) ;
    _self.init();
  
  }

  Plugin.prototype.init = function () {

    var _self = this, eventType;

    _self.$trigger = $('<a href="#">' + _self.options.openText + '</a>');
    _self.$trigger.addClass(_self.options.triggerClass);
    _self.$label = $('<span class="' +  _self.labelClass + '"/>');
    
    eventType = (window.Modernizr && window.Modernizr.touch) ? "touchstart" : "click";

    $(window).resize(function () {
      _self.observe();
    });
    
    _self.element.on(eventType, '.' + _self.options.triggerClass, function(e) {
      
      e.preventDefault();
      _self.toggle();

    });
  };

  Plugin.prototype.toggle = function () {

    var _self = this;

    if(_self.element.hasClass(_self.options.openClass)) {

      _self.element.removeClass(_self.options.openClass);
      _self.$trigger.text(_self.options.openText);
      _self.executeCallback(_self.options.afterClose);

      if(_self.options.showLabel) {
        _self.element.append(_self.$label);
        _self.$label = _self.element.find('.' + _self.options.labelClass);
      }

    }else{
      _self.element.addClass(_self.options.openClass);
      _self.$trigger.text(_self.options.closeText);
      _self.$label.remove();
      _self.executeCallback(_self.options.afterOpen);

    }

  }

  Plugin.prototype.observe = function () {
    
    var _self = this;

    if($(window).width() < _self.options.breakpoint) {
      _self.construct();   
    }else {
      _self.destruct();
    }
  }

  Plugin.prototype.construct = function () {

    var _self = this, $activeItem, labelText;

    _self.element.append(_self.$trigger);
    _self.element.addClass(_self.options.activeClass);
    _self.$trigger = _self.element.find('.' + _self.options.triggerClass);

    $activeItem = _self.element.find(_self.options.activeItemSelector);

    if($activeItem.length) {
      labelText = $activeItem.text();
    }else {
      labelText = _self.options.noActiveItemText;
      _self.$label.addClass('empty');
    }
    
    _self.$label.text(labelText);
    
    _self.executeCallback(_self.options.afterConstruct());

  }

  Plugin.prototype.destruct = function () {

    var _self = this;

    _self.element.removeClass(_self.options.activeClass);
    _self.$trigger.remove();

    _self.executeCallback(_self.options.afterDestruct());
  
  }

  Plugin.prototype.executeCallback = function (callback) {
    if(typeof callback === 'function') {
      callback();
    }
  };

  $.fn[pluginName] = function ( options ) {

    var _self = this;

    return _self.each(function () {
      if (!$.data(_self, 'plugin_' + pluginName)) {
        $.data(_self, 'plugin_' + pluginName, new Plugin( _self, options ));
      }
    });
  }

}(jQuery, window));


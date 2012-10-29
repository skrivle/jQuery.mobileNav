;(function ( $, window, undefined ) {

  var pluginName = 'mobileNav',
      document = window.document,
      defaults = {
        // css classes
        css: {
          triggerClass: "mobileNavTrigger",
          pluginActiveClass: "mobileNavActive",
          isOpenClass: "mobileNavOpen",
          labelClass: "mobileNavLabel",
        },

        // text settings
        text: {
          openText: "Open menu",
          closeText: "Close menu",
          noActiveItemText: "Menu"
        },

        // available callbacks
        callbacks: {
          afterOpen: undefined, 
          afterClose: undefined,
          afterConstruct: undefined,
          afterDestruct: undefined,
        },
        

        breakpoint: 400, // $(window).width() value
        showLabel: false, // show a label with the active menu item
        activeItemSelector: "ul > li.active > a", // selector to get the active menu item
        
      };

  function Plugin( element, options ) {

    var _self = this;

    _self.element = $(element);
    _self.options = $.extend( {}, defaults, options) ;
    _self.init();
  
  }

  Plugin.prototype.init = function () {

    var _self = this, eventType;

    _self.$trigger = $('<a href="#">' + _self.options.text.openText + '</a>');
    _self.$trigger.addClass(_self.options.css.triggerClass);
    _self.$label = $('<span class="' +  _self.options.css.labelClass + '"/>');
    
    // enable touch support when available
    eventType = (window.Modernizr && window.Modernizr.touch) ? "touchstart" : "click";

    // start observing the window width
    $(window).resize(function () {
      _self.observe();
    });
    _self.observe();

    
    // add open/close eventhandler
    _self.element.on(eventType, '.' + _self.options.css.triggerClass, function(e) {
      
      e.preventDefault();
      _self.toggle();

    });
  };


  Plugin.prototype.toggle = function () {

    var _self = this;

    if(_self.element.hasClass(_self.options.css.isOpenClass)) {

      _self.element.removeClass(_self.options.css.isOpenClass);
      _self.$trigger.text(_self.options.text.openText);
      _self.executeCallback(_self.options.callbacks.afterClose);

      if(_self.options.showLabel) {
        _self.element.append(_self.$label);
        _self.$label = _self.element.find('.' + _self.options.css.labelClass);
      }

    }else{
      _self.element.addClass(_self.options.css.isOpenClass);
      _self.$trigger.text(_self.options.text.closeText);
      _self.$label.remove();
      _self.executeCallback(_self.options.callbacks.afterOpen);

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
    _self.element.addClass(_self.options.css.pluginActiveClass);
    _self.$trigger = _self.element.find('.' + _self.options.css.triggerClass);

    $activeItem = _self.element.find(_self.options.activeItemSelector);

    if($activeItem.length) {
      labelText = $activeItem.text();
    }else {
      labelText = _self.options.text.noActiveItemText;
      _self.$label.addClass('empty');
    }
    
    _self.$label.text(labelText);
    
    _self.executeCallback(_self.options.callbacks.afterConstruct);

  }

  Plugin.prototype.destruct = function () {

    var _self = this;

    _self.element.removeClass(_self.options.css.pluginActiveClass);
    _self.$trigger.remove();

    _self.executeCallback(_self.options.callbacks.afterDestruct);
  
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


(function ( $, window, undefined ) {

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

        breakpoint: 500, // $(window).width() value
        showLabel: false, // show a label with the active menu item
        activeItemSelector: "ul > li.active > a", // selector to get the active menu item
        
      };

  function Plugin( element, options ) {

    var _self = this;

    _self.$element = $(element);
    _self.options = $.extend( {}, defaults, options) ;
    _self.init();
  }

  Plugin.prototype.init = function () {

    var _self = this, _eventType;

    _self.$trigger = $('<a href="javascript:void()" class="' + _self.options.css.triggerClass + '">' + _self.options.text.openText + '</a>');
    _self.$label = $('<span class="' +  _self.options.css.labelClass + '"/>');
    
    // check for modernizr, if it's available, let it check for touch support
    _eventType = (window.Modernizr && window.Modernizr.touch) ? "touchstart" : "click";

    console.log(_eventType);

    // start observing the window width
    $(window).resize(function () {
      _self.observe();
    });
    _self.observe();

    // add open/close eventhandler
    _self.$element.on(_eventType, '.' + _self.options.css.triggerClass, function(e) {
      
      e.preventDefault();
      
      if(_self.isOpen()) {
        _self.close();
      }else{
        _self.open();
      }

    });
  };

  Plugin.prototype.isOpen = function () {
    _self = this;
    return _self.$element.hasClass(_self.options.css.isOpenClass);
  }

  Plugin.prototype.close = function () {
    var _self = this;

    // close menu
    _self.$element.removeClass(_self.options.css.isOpenClass);
    _self.$trigger.text(_self.options.text.openText);

    // after close callback
    _self.executeCallback(_self.options.callbacks.afterClose);

  }

  Plugin.prototype.open = function () {
    var _self = this;

    // open menu
    _self.$element.addClass(_self.options.css.isOpenClass);
    _self.$trigger.text(_self.options.text.closeText);
    
    // after open callback  
    _self.executeCallback(_self.options.callbacks.afterOpen);

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

    var _self = this; 

    _self.$element.prepend(_self.$trigger);
    _self.$element.addClass(_self.options.css.pluginActiveClass);
    _self.$trigger = _self.$element.find('.' + _self.options.css.triggerClass);

    if(_self.options.showLabel) {
      _self.$element.append(_self.$label);
      _self.$label = _self.$element.find('.' + _self.options.css.labelClass);
    }
    
    _self.updateLabel();

    _self.executeCallback(_self.options.callbacks.afterConstruct);

  }

  Plugin.prototype.updateLabel = function () {

    var _self = this, $activeItem, labelText;

    $activeItem = _self.$element.find(_self.options.activeItemSelector);

    if($activeItem.length) {
      labelText = $activeItem.text();
    }else {
      labelText = _self.options.text.noActiveItemText;
    }
    
    _self.$label.text(labelText);

  }

  Plugin.prototype.destruct = function () {

    var _self = this;

    _self.$element.removeClass(_self.options.css.pluginActiveClass);
    _self.$trigger.remove();
    _self.$label.remove();
    _self.executeCallback(_self.options.callbacks.afterDestruct);
  
  }

  Plugin.prototype.executeCallback = function (callback) {
    if(typeof callback === 'function') {
      callback();
    }
  };

  $.fn[pluginName] = function ( options ) {
    
    return this.each(function () {

      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options ));
      }else{

        if(typeof options === 'string') {

          switch(options) {

            case 'updateLabel':
              $.data(this, 'plugin_' + pluginName).updateLabel();
              break;
            case 'open':
              $.data(this, 'plugin_' + pluginName).open();
              break;
            case 'close':
              $.data(this, 'plugin_' + pluginName).close();
              break;
          }
        }
      }
    });
  }

})(jQuery, window);


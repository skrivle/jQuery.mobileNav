var $nav, nav;

// init plugin
$nav = $('#primaryNav');
$nav.mobileNav({
	showLabel: true
});

// get nav object
nav = $nav.data('plugin_mobileNav');

// make sure the plugin is active
nav.construct();

// options object
options = nav.options;

test("destruct test", function () {
	
	var $wrapper, $trigger ,getElements;

	getElements = function () {
		$wrapper = $nav.find('.' + options.css.wrapperClass);
		$trigger = $nav.find('.' + options.css.triggerClass);	
	}

	nav.destruct();
	getElements();	
	ok($wrapper.length === 0 && $trigger.length === 0, 'Destruct working');

	nav.construct();
	getElements();
	ok($wrapper.length === 1 && $trigger.length === 1, 'construct working');
	
});

test( "open test", function() {
	nav.open();
	ok($nav.hasClass(options.css.isOpenClass), 'opening working');
});

test( "close test", function() {
	nav.close();
	ok(! $nav.hasClass(options.css.isOpenClass), 'close working');
});

test( "trigger click test", function () {
	var $trigger = $nav.find('.' + options.css.triggerClass);

	$trigger.click();
	ok($nav.hasClass(options.css.isOpenClass), 'open click working');
	$trigger.click()
	ok(!$nav.hasClass(options.css.isOpenClass), 'close click working');
});

test("isOpen test", function () {
	nav.open();
	ok(nav.isOpen(), 'open check');
	nav.close();
	ok(!nav.isOpen(), 'close check')
});

test("label test", function () {
	var activeItemSel = options.activeItemSelector,
		txt = $nav.find(activeItemSel).text(),
		$label = $nav.find('.' + options.css.labelClass);
	ok(txt === $label.text(), 'label is correct');

	$nav.find('li').removeAttr('class');
	nav.updateLabel();

	ok($label.text() === options.text.noActiveItemText, 'noActiveItemText working');

});


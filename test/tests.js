var $nav, nav;

$nav = $('#primaryNav');
$nav.mobileNav();
nav = $nav.data('plugin_mobileNav');
	
test( "open test", function() {
	nav.open();
	ok($nav.hasClass('mobileNavOpen'));
});

test( "destruct test", function() {
	nav.close();
	ok(! $nav.hasClass('mobileNavOpen'));
});

	
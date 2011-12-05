<?php
/**
 * The Sidebar containing the primary and secondary widget areas.
 *
 * @package WordPress
 * @subpackage Pollenizer Hummingbird
 * @since Pollenizer Hummingbird
 */
?>
<aside id="sidebar" class="grid-3 last">
	<section>
	<?php
	/* When we call the dynamic_sidebar() function, it'll spit out
	 * the widgets for that widget area. If it instead returns false,
	 * then the sidebar simply doesn't exist, so we'll hard-code in
	 * some default sidebar stuff just in case.
	 */
	if ( ! dynamic_sidebar( 'primary-widget-area' ) ) : ?>	
	<?php endif; // end primary widget area ?>
	</section>

	<?php
	// A second sidebar for widgets, just because.
	if ( is_active_sidebar( 'secondary-widget-area' ) ) : ?>
	<section>
		<?php dynamic_sidebar( 'secondary-widget-area' ); ?>
	</section>
</aside>
<?php endif; ?>
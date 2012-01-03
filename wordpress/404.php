<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Pollenizer Hummingbird
 * @since Pollenizer Hummingbird
 */

get_header(); ?>
<section class="rounded" role="region">
	<div class="grid">
		<article class="grid-9">
			<header class="subhead">
				<h1><?php _e( 'Not Found', 'twentyten' ); ?></h1>
			</header>
			<div class="postContent">
				<p><?php _e( 'Apologies, but the page you requested could not be found. Perhaps searching will help.', 'twentyten' ); ?></p>
				<?php get_search_form(); ?>

	<script type="text/javascript">
		// focus on search field after it has loaded
		document.getElementById('s') && document.getElementById('s').focus();
	</script>
							</div>
							</article>
		<?php get_sidebar(); ?>
	</div>
</section>
<?php get_footer(); ?>
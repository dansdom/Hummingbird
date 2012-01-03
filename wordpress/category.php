<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage Starkers
 * @since Starkers 3.0
 */

get_header(); ?>
<section class="rounded" role="region">
	<div class="grid">
		<article class="grid-9">
			<header class="subhead">
				<h1><?php
					printf( __( 'Category Archives: %s', 'twentyten' ), '' . single_cat_title( '', false ) . '' );
				?></h1>
			</header>
				<?php
					$category_description = category_description();
					if ( ! empty( $category_description ) )
						echo '' . $category_description . '';

				/* Run the loop for the category page to output the posts.
				 * If you want to overload this in a child theme then include a file
				 * called loop-category.php and that will be used instead.
				 */
				get_template_part( 'loop', 'category' );
				?>
</article>
		<?php get_sidebar(); ?>
	</div>
</section>
<?php get_footer(); ?>
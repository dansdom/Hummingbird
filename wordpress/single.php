<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Pollenizer Hummingbird
 * @since Pollenizer Hummingbird
 */
get_header(); ?>
<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
<section class="rounded" role="region">
	<div class="grid">
		<article class="grid-9">
			<header class="subhead">
				<?php previous_post_link( '%link', '' . _x( '&larr;', 'Previous post link', 'twentyten' ) . ' %title' ); ?>					
				<h1><?php the_title(); ?></h1>
				<?php next_post_link( '%link', '%title ' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '' ); ?>	 	   					
			</header>
			<div class="postContent">
				<?php the_content(); ?>
			</div>
			<div class="postMeta">
				<?php twentyten_posted_on(); ?>
				<?php wp_link_pages( array( 'before' => '' . __( 'Pages:', 'twentyten' ), 'after' => '' ) ); ?>
				<?php if ( get_the_author_meta( 'description' ) ) : // If a user has filled out their description, show a bio on their entries  ?>
				<?php echo get_avatar( get_the_author_meta( 'user_email' ), apply_filters( 'twentyten_author_bio_avatar_size', 60 ) ); ?>
				<h2><?php printf( esc_attr__( 'About %s', 'twentyten' ), get_the_author() ); ?></h2>
				<?php the_author_meta( 'description' ); ?>
				<a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
				<?php printf( __( 'View all posts by %s &rarr;', 'twentyten' ), get_the_author() ); ?>
				</a>
				<?php endif; ?>
				<?php twentyten_posted_in(); ?>
				<?php edit_post_link( __( 'Edit', 'twentyten' ), '', '' ); ?>
			</div>
			<div class="postComments">
				<?php comments_template( '', true ); ?>
			</div>		
			<?php endwhile; // end of the loop. ?>
		</article>
		<?php get_sidebar(); ?>
	</div>
</section>
<?php get_footer(); ?>
<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content
 * after.  Calls sidebar-footer.php for bottom widgets.
 *
 * @package WordPress
 * @subpackage Pollenizer Hummingbird
 * @since Pollenizer Hummingbird
 */
?>
				</div><!-- end contentwrap -->  	
			</div><!-- end #content -->
		</div><!-- end pagewrap --> 
    </div><!-- end page -->    	
    <footer id="footer" class="clear">
 		<div class="footerWrap">
 			<?php get_sidebar( 'footer' );?>
 			<!-- navigation -->
			<nav role="navigation">
				<?php wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) ); ?>
			</nav>	   		
    	</div><!-- end footerwrap --> 
	</footer><!-- end of footer -->    	
</div><!--! end of #wrap -->
<!-- JavaScript at the bottom for fast page loading -->
	<!-- plugin scripts-->
	<script src="js/plugins/log.js"></script>
	<script src="js/plugins/placeholder.js"></script>
	<!-- custom interface -->
	<script src="js/interface.js"></script>
	<!--[if (lt IE 9) & (!IEMobile)]>
	<script src="js/libs/selectivizr.js"></script>
	<script src="js/libs/respond.js"></script>
<![endif]-->
<!-- end scripts-->
<?php wp_footer();?>
</body>
</html>
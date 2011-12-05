<?php
/**
 * @package WordPress
 * @subpackage Pollenizer Hummingbird
 * @since Pollenizer Hummingbird
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<title><?php wp_title( '|', true, 'right' );?></title>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">
	<meta name="author" content="<?php bloginfo( 'name' ); ?>">	
	<!--Microsoft. Delete if not required -->
	<meta http-equiv="cleartype" content="on">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- Icons -->
	<link title="iPhone4" rel="apple-touch-icon-precomposed" sizes="114x114" href="img/ios-114.png">
	<link title="iPad" rel="apple-touch-icon-precomposed" sizes="72x72" href="img/ios-72.png">
	<link title="iPhone3" rel="apple-touch-icon-precomposed" href="img/ios.png">
	<link title="nokia" rel="shortcut icon" href="img/ios.png">
	<link title="Favicon" rel="shortcut icon" href="/favicon.ico">
	<!--iOS. Delete if not required -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
	<!-- Mobile viewport optimized: j.mp/bplateviewport -->	
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<!-- CSS -->
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<!-- jQuery and HTML5 script so IE knows how to style the html5 elements -->
	<script src="js/libs/jquery.js"></script>	
	<script src="js/libs/html5.js"></script>	
<?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); wp_head();?>
</head>
<body <?php body_class(); ?>>
<div id="wrap" class="clear">
<!-- ========================== BLOG PAGES -->
	<!-- begin #header -->
	<header id="header" class="clear">
		<!-- navigation -->
		<nav role="navigation">
			<a id="logo" href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
			<img role="banner" alt="<?php bloginfo( 'name' ); ?>: <?php bloginfo( 'description' ); ?>" src="/img/logo-small.png">
			</a>
			<?php /* Our navigation menu.  If one isn't filled out, wp_nav_menu falls back to wp_page_menu.  The menu assiged to the primary position is the one used.  If none is assigned, the menu with the lowest ID is used.  */ ?>
			<?php wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) ); ?>
		</nav>
	</header><!-- end #header -->  
	<!-- begin #page-->
    <div id="page" class="clear">
   		<div class="pageWrap">
	 		<div id="content" role="main">
	 	   		<div class="contentWrap">
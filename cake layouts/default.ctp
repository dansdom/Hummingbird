<?php echo $this->Html->doctype('html5'); ?>
<html class="no-js" lang="en">
<head>
	<?php echo $this->Html->charset(); ?>
	<title><?php echo $title_for_layout; ?> - <?php echo Configure::read('App.name'); ?></title>
	<?php echo HtmlMetaComponent::elements(); ?>
	<meta http-equiv="cleartype" content="on" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<?php echo $this->Html->meta('icon'); ?>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
	<?php if(isset($metaDescription)) {
		echo $this->Html->meta(array('name' => 'description', 'content' => $metaDescription));
	} ?>
	<?php echo $this->Html->css(array('style', 'skin')); ?>
	<!--[if lte IE 8]><?php echo $this->Html->css(array('ie')); ?><![endif]-->
	<?php echo $this->Html->script(array('libs/jquery', 'libs/html5')); ?>
	<!--[if (lt IE 9) & (!IEMobile)]>
		<?php echo $this->Html->script(array('libs/selectivizr')); ?>
	<![endif]-->
</head>
<body class="<?php echo $this->params['controller']; ?>-<?php echo $this->params['action']; ?>">

	<div id="wrap" class="clear">
		
		<header id="header" class="clear">
			<nav role="navigation">	
			</nav>
		</header>
		
		<div id="content" role="main">
			<div class="page" role="main">
				<?php echo $content_for_layout; ?>
			</div>
		</div>
		
		<div id="footer" class="clear">
			 <footer>
			 </footer>
		</div>
		
	</div>
	
	<script type="text/javascript">
	var baseUrl = '<?php echo $this->Html->url('/'); ?>';
	</script>
	<?php echo $scripts_for_layout; ?>
	<?php echo $this->Html->script(array('plugins/log', 'plugins/placeholder', 'plugins/validator1.4a', 'plugins/jquery.autocomplete.min', 'plugins/popup2.1', 'interface')); ?>
	<?php echo $this->element('kissmetrics'); ?>
	<?php echo $this->element('google_analytics'); ?>
	<?php echo $this->element('sql_dump'); ?>
	<?php if (Configure::read('debug') > 0): ?>
		<?php debug($this->Session->read()); ?>
	<?php endif; ?>
	</body>
</html>
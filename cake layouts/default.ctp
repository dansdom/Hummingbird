<?php echo $this->Html->docType(); ?>
<html class="no-js" lang="en">
<head>
<?php echo $this->Html->charset(); ?>
<title><?php echo $title_for_layout; ?></title>
<?php echo $this->Html->meta('icon'); ?>
<?php echo $this->Html->meta(array('http-equiv' => 'cleartype', 'content' => 'on')); ?>
<?php echo $this->Html->meta(array('http-equiv' => 'X-UA-Compatible', 'content' => 'IE=edge,chrome=1')); ?>
<?php echo $this->Html->meta(array('name' => 'apple-mobile-web-app-capable', 'content' => 'yes')); ?>
<?php echo $this->Html->meta(array('name' => 'apple-mobile-web-app-status-bar-style', 'content' => 'black-translucent')); ?>
<?php echo $this->Html->meta(array('name' => 'viewport', 'content' => 'width=device-width,initial-scale=1.0')); ?>
<?php echo $this->Html->css(array('style', 'skin')); ?>
<!--[if lte IE 8]><?php echo $this->Html->css(array('ie')); ?><![endif]-->
<?php echo $this->Html->script(array('libs/jquery', 'libs/html5')); ?>
<!--[if (lt IE 9) & (!IEMobile)]><?php echo $this->Html->script(array('libs/selectivizr')); ?><![endif]-->
</head>
<body>
<div id="wrap" class="clear">
    <header id="header" class="clear">
        <nav role="navigation">
        </nav>
    </header>
    <div id="content" role="main">
        <div class="page" role="main">
            <?php echo $this->Session->flash(); ?>
            <?php echo $this->fetch('content'); ?>
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
<?php echo $this->Html->script(array('interface')); ?>
<?php echo $this->element('sql_dump'); ?>
</body>
</html>

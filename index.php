<?php

include 'header.php';

?>
<!--sidebar-->
<div class="col-xs-6 col-sm-3" id="sidebar">
	<div class="player">
		<div class="userImage"></div>
		<span class="userName"></span>
	</div>
	<div class="vs">
		vs
	</div>
	<div class="player">
		<div class="opponentImage"></div>
		<span class="opponentName"></span>
	</div>
	<ul class="matches">
	</ul>
</div><!--/sidebar-->

<!--/main-->
<div class="col-xs-12 col-sm-9" data-spy="scroll" data-target="#sidebar-nav">

	<div class="row">
		<div class="col-sm-6" id="challenge">
			<h1></h1>
			<p></p>
			<hr/>
		</div><!--/col-6-->
		
		<div class="col-sm-6">
			<div class="clock"></div>
		</div><!--/col-6-->
		
	</div><!--/row-->

	<div class="row">
		<div class="col-sm-6">	  
			  <div class="well"> 
				 <form class="form-horizontal" role="form">
				  <h4><span class="userName"></span>'s code</h4>
				   <div class="form-group" style="padding:14px;">
					<textarea id="editor" class="form-control" placeholder="You shouldn't empty this field, dangerous behaviour!"></textarea>
				  </div>
				  <button class="btn btn-success btn-run" type="button">Run</button>
				  </form>
				  <div class="alert alert-dismissable" id="message"></div>
			</div><!--/well-->
		</div><!--/col-6-->
		
		<div class="col-sm-6" id="opponentPanel">	  
			  <div class="well"> 
				 <form class="form-horizontal" role="form">
				  <h4><span class="opponentName"></span>'s code</h4>
				   <div class="form-group" style="padding:14px;">
					<textarea id="opponentEditor" class="form-control"></textarea>
				  </div>
				  </form>
			</div><!--/well-->
		</div><!--/col-6-->
		
		<div class="col-sm-6" id="parametersPanel">
			<div class="panel panel-default">
			<div class="panel-heading"><h4>Test Parameters</h4></div>
				<div class="panel-body">
				  <div class="list-group"></div>
				</div><!--/panel-body-->
			</div><!--/panel-->
		</div>
		
		<div class="col-sm-12" id="performancePanel">
			<div class="panel panel-default">
			<div class="panel-heading"><h4>Performance</h4></div>
				<div class="panel-body">
					<div id="performance"></div>
				</div><!--/panel-body-->
			</div><!--/panel-->
		</div>
				  
	</div><!--/row-->

</div>
<?php

include 'footer.php';

?>
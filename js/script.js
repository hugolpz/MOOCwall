var htmlHead = `
	<link rel="apple-touch-icon" sizes="57x57" href="./img/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="./img/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="./img/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="./img/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="./img/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="./img/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="./img/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="./img/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="./img/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="./img/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="./img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="./img/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="./img/favicon/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="./img/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
`;
var topbar =`
	<ol class="breadcrumb">
		<li class="breadcrumb-item"><a href="./index.html">
	<img class="logo" src="./img/logo-moocfactory.svg" style="height:1.5em;" /></a></li>
		<li class="breadcrumb-item"><a href="./index.html">MOOCWall</a></li>
		<li class="breadcrumb-item"><a href="./intro.html">Studio</a></li><!--
		<li class="breadcrumb-item"><a href="./description.html">Studio de réalisation</a></li>
		<li class="breadcrumb-item"><a href="./contact.html">Contact</a></li> -->
	</ol>`;

var sidebar = `<img class="logo" src="./img/logo-moocfactory.svg" />
<div class="menu">
	<a href="./index.html"><div>MoocWall</div></a>
	<a href="./intro.html"><div>Studio</div></a><!--
	<a href="./description.html"><div>Description</div></a>
	<div href="./">Team</div> 
	<img class="partners" src="./img/partners/USPC-Invest-MairieParis.png" />
	<img class="partners" src="./img/partners/IIFR.png" /> 
	<img class="partners" src="./img/partners/cri.png" />-->
	<img class="partners" src="./img/partners/paris.png" />
	<img class="partners" src="./img/partners/fondation_bettencourt.png" />
</div>
<div class="footer">
	<p class="icons">
		<a target="_blank" href="https://www.youtube.com/channel/UCAwnYwPOM-fcJ7wkfp1Xn7g" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a> 
		<a target="_blank" href="https://vimeo.com/criparis" title="Vimeo"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
	</p>
	<!-- <p class="authors">CRI's MOOC Factory</p> -->
	<p class="authors"><i class="fa fa-globe" aria-hidden="true"></i> <a target="_blank" href="http://mooc.cri-paris.org">mooc.cri-paris.org</a></p>
<p class="contacts">Contacts :<br>
<i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:xavier.desplas@cri-paris.org"> Production MOOC</a>
<br><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:hugo.lopez@cri-paris.org"> Platform MOOC</a></p>
</div>`;

$("head").append(htmlHead);
$(".topbar").prepend(topbar);
$(".sidebar").append(sidebar);

/* Build up gallery*/
var tpl = {
	container:`<div class="container-fluid"></div>`,
	galleries: `<div class="row galleries"></div>`,
	columns : `
		<div id="col1" class="col-lg-6 col-md-6-down"></div>
		<div id="col2" class="col-lg-6 col-md-6-down"></div>`,
	cell : `<div class="cell box"></div>`,
	photo   : `<img class="photo" data-target="#datainfo" />`
};



/* ******************************************************************* */
/* Data call ********************************************************* */
/* ******************************************************************* */
window.onload = function() { init() };

function init() {
  Tabletop.init({
    key: '1Jl8hPef57ay40SKbQRd0ez2hEbDIqwhKEcDe0R4cSVc',
    callback: moocWall,
    simpleSheet: true
  })
}

var galleriesBuilder = function (imgList){
	var col1 = $("#col1"),
		col2 = $("#col2"),
		currentSerie,
		serieCounter;
	for(var i=0; i<imgList.length; i++){
		var l = imgList[i],
			url = `img/wall2/`+l.img,
			photoHtml = tpl.photo.replace(/#datainfo/i, l.codename),
			$col,
			$cell, $cellSerie,
			chancell;
		if(i%2==0){ $col = col1; }
		if(i%2==1){ $col = col2; }
		$cell = $col.children().last();
		$cellSerie = $cell.attr("serie");
		if(true || $cellSerie != l.codename ) { $col.append(tpl.cell); $col.children().last().attr("serie",l.codename) }
		console.log(l.codename)
		$cell = $col.children().last();
		$cell.append(photoHtml);
		$cell.children().last().attr("src",url);

		currentSerie = l.codename;
		serieCounter++; ///           count so we get 5 images max per cell !
	}
}

/* Modale ****************************************************************** */
var infoboxHtml = function (d) {
	var buildInfobox = function (d){
	console.log(d);
	return `<div class="row infobox">
			<div class="col-md-6 col-xs-12">
			<h4>`+d.fullname+`</h4>
			<ul>
				<li>Homepage : <a href="`+d.url+`">click here</a> `+ (d.session?" ("+d.session+")":"") +`</li>
				<li>On `+ d.categories +`</li>
				<li>Thanks to `+ d.organisation +`</li>
				<li>Open on `+d.start+`→`+d.end+`</li>
				<li>Impact : `+ d.participants+` trainees</li>
			</ul>
		</div>

		<div class="col-md-6 col-xs-12 iframe">`+(d.url?`<iframe frameborder=0 scrolling=no src="`+d.url+`"></iframe>`:"")+`</div>
		<!--`		
		+(d.introVideoIframeSrc?`
			<div class="col-xs-12"><iframe frameborder="0" src="`+d.introVideoIframeSrc+`" allowfullscreen></iframe>
		</div>`:"")+

	`--></div>`;
}
	var infobox = buildInfobox(d);

	var	modal = `<div class="modal fade" id="`+d.codename+`" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">`+d.fullname+`</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">×</span></button>
					</div>
					<div class="modal-body">`
						+infobox+
					`</div>
				</div>
			</div>
		</div>`;
	return infobox;
}

var infoboxBuilder = function(data) {
	for(var i=0; i<data.length; i++){
		var project = data[i],
			html = infoboxHtml(project);
		$('*[data-target="'+project.codename+'"]').parent().append(html)
	}
	
}

var carousselBuilder = function () {
	$(".slider").each(function(index) {
	var position = 1;
	var carousel = function () {
		console.log("hi")
		var i, that = $(".slider").eq(index);
		var x = that.children(".photo");
		// x.children().css({"display":"none"});
		x.css({'display':'none', 'opacity': '0'});
		x.eq(position-1).css({'display':'block', 'opacity': '1'});
		position == x.length? position = 1 : position++;
		// if (position == x.length) { position = 0 }; position++;
		setTimeout(carousel, 12000); // Change image every 2 seconds
	}
	carousel();
	});
 }

var moocWall = function (data, tabletop) {
	// console.log(JSON.stringify(data))
	// build structure
	$(".wall").addClass("container-fluid")
		.append(tpl.galleries);
	$(".galleries").append(tpl.columns);
	// fill the structure
	galleriesBuilder(wall2);
	infoboxBuilder(data);
	carousselBuilder();
};








/* Caroussel */

/* Tabletop data injection */
//http://www.jsoneditoronline.org/?id=86bed24507b7689237b8eefe9498a69b

/*Ask for devis */

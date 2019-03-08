var Kex={};

Kex.change=function(){};

Kex.ifchange=function(event){
  var $inp=$(event.delegateTarget);
  if($inp.val()!=$inp.data("origval")) Kex.change();
};

Kex.render=function(div, json){
  $(div).append("<div id='pagebody' class='notop'><div class='pillarform'></div></div>"); var $div=$(div).find("div.pillarform");

  $div.append("<div class='title'>Sketch Engine URL</div>");
  $div.append("<input class='textbox' id='kex_url'/>");
  $div.find("#kex_url").val(json.url).data("origval", json.url).on("change keyup", Kex.ifchange);
  $div.append("<div class='instro'>The path to the <code>run.cgi</code> script in Sketch Engine. For most users this should be <code>https://api.sketchengine.co.uk/bonito/run.cgi</code>. Do not change this unless you are using a local installation of Sketch Engine.</div>");

  $div.append("<div class='title'>Corpus name</div>");
  $div.append("<input class='textbox' id='kex_corpus'/>");
  $div.find("#kex_corpus").val(json.corpus).data("origval", json.corpus).on("change keyup", Kex.ifchange);
  $div.append("<div class='instro'>The identifier Sketch Engine uses internally for the corpus from which you want to pull data into your dictionary, for example <code>bnc2</code> for the British National Corpus.</div>");

  $div.append("<div class='title'>Concordance query</div>");
  $div.append("<input class='textbox' id='kex_concquery'/>");
  $div.find("#kex_concquery").val(json.concquery).data("origval", json.concquery).on("change keyup", Kex.ifchange);
  $div.append("<div class='instro'>The CQL query that will be used to obtain concordance from Sketch Engine. You can use placeholders for elements in the form of '%(element)', e.g. '[lemma=\"%(headword)\"]'. If left empty the 'simple' query type will be used as configured for the respective corpus. Please note that you cannot use CQL syntax with default attribute because it is not specified.</div>");
  $div.append("<input type='number' min='0' placeholder='0' class='textbox' style='width: auto' id='kex_concsampling'/>");
  $div.find("#kex_concsampling").val(json.concsampling).data("origval", json.concsampling).on("change keyup", Kex.ifchange);
  $div.append("<div class='instro'>Whether to apply automatic sampling of the concordance. Any non-zero value means to automatically create a random sample of that size.</div>");
};

Kex.harvest=function(div){
  var $div=$(div);
  var ret={};
  ret.url=$.trim( $div.find("#kex_url").val() );
  ret.corpus=$.trim( $div.find("#kex_corpus").val() );
  ret.concquery=$.trim( $div.find("#kex_concquery").val() );
  ret.concsampling=$.trim( Math.max(0, $div.find("#kex_concsampling").val()));
  return ret;
};

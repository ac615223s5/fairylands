---
layout: widget-base2
---
A simple tool to convert text into uppercase, lowercase, or invert the case of every letter.

<div x-data="{inputText:''}">
  <textarea x-model="inputText"></textarea>
  <p>Uppercase:</p>
  <p x-text="inputText.toUpperCase()"></p>
  <p>Lowercase:</p>
  <p x-text="inputText.toLowerCase()"></p>
  <p>Inverted:</p>
  <p x-text="convert(inputText,(i,c)=>'A'<=c&&c<='Z')"></p>
  <p>Alternating:</p>
  <p x-text="convert(inputText,(i,c)=>i&1)"></p>
  <p>Random:</p>
  <p x-text="convert(inputText,(i,c)=>Math.random()<0.5)"></p>
</div>
<script>
	function convert(text,rule){
		let output='';
		for(let i=0;i<text.length;i++){
			var c=text.charAt(i);
			if(rule(i,c)) output+=c.toLowerCase();
			else output+=c.toUpperCase();
		}
		return output;
	}
</script>


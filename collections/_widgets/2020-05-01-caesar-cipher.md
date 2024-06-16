---
layout: widget-base2
---
The caesar cipher encrypts a string by shifting all its characters by some amount. For example, a shift of 1 (or A) would replace A with B, B with C, ... and Z with A. Because this cipher is so simple it is easily decoded and not recommended for security purposes (unless the key is as long as the text).

<div x-data="{inputText:'',key:'a'}">
	<label>Text:</label>
	<input type="text" x-model="inputText">
	<label>Key:</label>
	<input type="text" x-model="key">
	<p>Encrypted text:</p>
	<p x-text="caesarCipher(inputText,key,1)"></p>
<div x-data="{inputText:''}">

<script>
function caesarCipher(s,key,type){
	let cipher="";
	for(var i=0;i<s.length;i++){
		var c=s.charCodeAt(i);
		var shift=key.charCodeAt(i%key.length);
		if(shift>=97) shift-=97;
		else if(shift>=65) shift-=65;
		else if(shift>=48) shift-=48;
		if(65<=c&&c<=90) c=((c-65+shift)%26+26)%26+65;
		else if(97<=c&&c<=122) c=((c-97+shift)%26+26)%26+97;
		else if(48<=c&&c<=57) c=((c-48+shift)%10+10)%10+48;
		cipher+=String.fromCharCode(c);
	}
	return cipher;
}
</script>

---
layout: widget-base2
---

A simple tool to calculate the gcd (greatest common divisor) and lcm (least common multiple) of a list of numbers. It uses Euclid's algorithm so it runs quickly (O(log(n)) time complexity) without needing to check every factor.

<input type="text" id="next-prime-in" onchange="findGCD()">
<p>GCD:</p>
<p id="out1">0</p>
<p>LCM:</p>
<p id="out2">1</p>
<script src="/assets/widgets.js"></script>
<script>
	function findGCD() {
		var input = document.getElementById("next-prime-in").value.split(/\D+/g), last = 0, ans = 0n, product = 1n, x;
		for (var i = 0; i < input.length; i++) {
			x = BigInt(input[i]);
			ans = gcd(ans, x);
			product *= x / gcd(product, x);
		}
		document.getElementById("out1").innerHTML = ans;
		document.getElementById("out2").innerHTML = product;
	}
</script>

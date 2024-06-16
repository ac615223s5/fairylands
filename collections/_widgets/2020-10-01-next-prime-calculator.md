---
layout: widget-base2
title: Next/Previous Prime Calculator
---

A simple tool to calculate the the next prime after a given number (the smallest prime larger than that number) or the largest prime below it.

<label for="next-prime-in">Input:</label>
<input type="number" id="next-prime-in" onchange="nextPrime()">
<p>Next Prime:</p>
<p id="next-prime-out1"></p>
<p>Last Prime:</p>
<p id="next-prime-out2"></p>
<p id="time"></p>
<h2>Comment</h2>
<p>This program uses the Miller–Rabin primality test to quickly tell if a number is prime. 
  It runs quickly because the distance between prime numbers remains small even as the primes 
  become quite large.</p>
<script src="/assets/widgets.js"></script>
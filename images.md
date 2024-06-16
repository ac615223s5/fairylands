---
layout: default
title: Image Dump
---

# Image Dump

-
{%- for img in site.static_files-%}
  {%- if img.extname==".png" or img.extname==".jpg" or img.extname==".jpeg" or img.extname==".webp" or img.extname==".ico" or img.extname==".svg" or img.extname==".gif" -%}
    <img src="{{img.path | relative_url}}" class="inline m-1 h-40 max-w-full">
  {%- endif -%}
{%- endfor -%}
---
layout: post
title: Rendering Algorithms
---

### Project

Render the sponza scene as quickly as possible using data acceleration structure, SIMD, early ray termination and packet tracing.

### Progress

Currently I have implemented the spatial subdivision data structure. So far I'm only using SIMD for triangle intersection test. I also have early ray termination.

#### Data structure

<img src="images/mravn_ads.png" />

#### Picture of sponza scene

<img src="images/mravn_sponza.png" />

### Numbers

Rendering time without early ray termination: 6.59 seconds

Rendering time with early ray termination: 1.12 seconds (~6 times faster)

### What's next

I have some problems with my SAH, so my tree is kinda weird. So I need to redo it to make sense (due to going from object to spatial)

I need to implement early ray termination with SIMD

I haven't made the packet tracing yet

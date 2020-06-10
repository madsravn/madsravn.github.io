---
layout: post
title: Improving performance with packet tracing and other methods
---

Introduction
------------

The subject I chose for final handin in the rendering algorithms course was improving the rendering time of a given scene, the Sponza scene as seen below. The scene consist of 66,454 triangles which are rather compact and from any given viewpoint pretty stacked - i.e. if you shoot a ray through a triangle you are pretty sure to hit at least a few other triangles either behind or in front of it.

<img src="https://madsravn.dk/images/mravn_sponza.png" alt="sponza scene" />

The methods
-----------

Firstly I used an acceleration data structure to put all my geometry in a tree which can be traversed. An acceleration data structure is an improvement in itself, but with this tree it became possible to make some further improvements using packet tracing. Packet tracing is a method where you group some of your rays together and traverse the tree of the data structure with them packed instead of a single ray at a time. This way you don't have to traverse many of the nodes of the tree so many times and you can also do some early miss testing by making a frustum of this group of rays and cheaply check if they all miss a bounding box with a single frustum/AABB intersection test instead of doing 16 to 512 ray/box intersection tests. 

<img src="https://madsravn.dk/images/mravn_ads.png" alt="ads" />

The results
-----------

I checked my implementation of packet tracing compared to the same scene with only early ray termination. I got these numbers

### Normal ray tracing with early ray termination yielded the following results:

Did 6,503,630 triangle intersections

Did 20,193,290 traversals

Did 33,267,596 box intersections

### Packet tracing with a packet size of 4x4:

Did 6,560,144 triangle intersections

Did 1,877,640 traversals

Did 11,500,952 box intersections

### Packet tracing with a packet size of 8x8:

Did 9,904,128 triangle intersections

Did 602,404 traversals

Did 10,080,299 box intersections

### Packet tracing with a packet size of 16x16:

Did 20,155,648 triangle intersections

Did 248,074 traversals

Did 10,991,985 box intersections




Path tracing
-----------

A part of the handin was also to implement either photon mapping or path tracing. I chose path tracing with 512 samples per pixel. The result can be seen here

<img src="https://madsravn.dk/images/teapot.pathtracing.png" alt="pathtracing" />

The conclusion
--------------

This was a very fun project to work on and an exciting way to finish of a good course in rendering algorithms. I wish I could have had more time doing this project because I don't think I was far from getting much better results using leaf traversal. As you can see on my numbers above the amount of ray/triangle intersection tests explode at packet size 16x16, while the traversal is pretty low. 

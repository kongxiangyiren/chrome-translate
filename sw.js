if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const f=e=>i(e,r),l={module:{uri:r},exports:o,require:f};s[r]=Promise.all(n.map((e=>l[e]||f(e)))).then((e=>(t(...e),o)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/css/index-BLTSQVKc.css",revision:null},{url:"assets/js/index-EVYmfNS7.js",revision:null},{url:"index.html",revision:"0ff30087ab1aa5d5f791f2c1b03dc035"},{url:"512x.png",revision:"6806da9d037ad69fbd72f8b6b1fafe25"},{url:"manifest.webmanifest",revision:"3240d3a964f609e600d1f50662553263"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

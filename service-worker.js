"use strict";var precacheConfig=[["/coi-client/index.html","730b40c0c5e99e595f5a0c69cde0fda0"],["/coi-client/static/css/main.2f457cc9.css","4647e203c0dc21ca906b10101e4e0765"],["/coi-client/static/js/main.b96dea01.js","aed87b474a9d73ca8d62cd4320f4b0ab"],["/coi-client/static/media/Raleway-Light.010aae55.ttf","010aae55eee63f16095bc47f7cffae1b"],["/coi-client/static/media/Raleway-Thin.b2a0b765.ttf","b2a0b765ded79576d3bb4dbffc65550f"],["/coi-client/static/media/barclays.d6571423.png","d6571423fe39c4eb496cf0c0cd519020"],["/coi-client/static/media/homeless.442572b3.png","442572b3ffaf7e0dd2983fef03da3db9"],["/coi-client/static/media/lightbulb.dbe24274.png","dbe24274ba1749a9c71bf0f2dbaee7a7"],["/coi-client/static/media/logo.33ef46c6.png","33ef46c60d205bfe9d9e67bae05a690e"],["/coi-client/static/media/logo_v2.1dcdf10a.svg","1dcdf10a68b4966a95d58c62d49a5fb9"],["/coi-client/static/media/mailing.4e6c2433.png","4e6c2433e481eb8246120c5abaa51065"],["/coi-client/static/media/map.3672971e.png","3672971ea7a104d18cc542e296bc6c98"],["/coi-client/static/media/placeholder.8d36a830.jpeg","8d36a830b5cb55113c5b0fda82c3fb1c"],["/coi-client/static/media/ticketaid.1c7f62ad.png","1c7f62adbf351ebca8565bd85fad6bb5"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/coi-client/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});
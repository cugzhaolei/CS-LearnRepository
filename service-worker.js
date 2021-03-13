/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "861fc8c4e96474fc06f5fce8ce5d1b28"
  },
  {
    "url": "app/C#/BUG/index.html",
    "revision": "4cdd4025a30891610c5eb76818cc0602"
  },
  {
    "url": "app/hybridapp/index.html",
    "revision": "afc21bb893aca194f5995f58d1f64881"
  },
  {
    "url": "app/index.html",
    "revision": "daab83b9a04be07093f4e2b9cfe2e1c2"
  },
  {
    "url": "app/nativeapp/index.html",
    "revision": "ab063fe08c233ddca677bc7e9bf9f430"
  },
  {
    "url": "app/webapp/index.html",
    "revision": "0621128216fae7fbd15a3e188fccf961"
  },
  {
    "url": "assets/css/0.styles.1d31411f.css",
    "revision": "2865536773bbd8de2a033188493f12f4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a8feb3f2.js",
    "revision": "680f774f873eee22f8a82d31facd4993"
  },
  {
    "url": "assets/js/100.6bb02861.js",
    "revision": "4cabe92267d48b6df6841d2682d5f315"
  },
  {
    "url": "assets/js/101.945ab624.js",
    "revision": "24769063fae9a7f9a9df4243d75c0e3e"
  },
  {
    "url": "assets/js/102.414fb51f.js",
    "revision": "6c4b1f71cdbe53feb2e1129f2b0e00d2"
  },
  {
    "url": "assets/js/103.3e98b030.js",
    "revision": "e4ff7522ff2c583ac98ba36252b7926a"
  },
  {
    "url": "assets/js/104.4288c7f9.js",
    "revision": "0f158b8f1beb5c5532eba8d9dc2c16ce"
  },
  {
    "url": "assets/js/105.c0b12e68.js",
    "revision": "18b2b34ca067938741783d44097acdff"
  },
  {
    "url": "assets/js/106.cf589ec1.js",
    "revision": "2aa64470e50f355ff9f3732b9d1873c7"
  },
  {
    "url": "assets/js/107.1fadf1d7.js",
    "revision": "8f9a6c34fc8baddd857dc21a3bf4f169"
  },
  {
    "url": "assets/js/108.974233d2.js",
    "revision": "828fd64e916006c0ec24d18d0d5272cd"
  },
  {
    "url": "assets/js/109.faea7003.js",
    "revision": "cce5fa08ee7275a1411bb608b43db15f"
  },
  {
    "url": "assets/js/11.b2e6c1bb.js",
    "revision": "4f3e9681ea7855d0fbe64a3cd004eb36"
  },
  {
    "url": "assets/js/110.30f955bc.js",
    "revision": "674638a1577d23f5afdfb357649be40b"
  },
  {
    "url": "assets/js/111.2b3471da.js",
    "revision": "555a0193e86a9c092626cbd39e1123a9"
  },
  {
    "url": "assets/js/112.452de93a.js",
    "revision": "17a6788a4d40d79027fe25a0856b87bc"
  },
  {
    "url": "assets/js/113.584b29ce.js",
    "revision": "039fd4b8c7e229e99af0a678131423f5"
  },
  {
    "url": "assets/js/114.5348c1d4.js",
    "revision": "71a2a91f68a8a099832da0c0f4b883c8"
  },
  {
    "url": "assets/js/115.b13df47f.js",
    "revision": "a2095015004e221b11b30f2cc8f948b3"
  },
  {
    "url": "assets/js/116.d640fd41.js",
    "revision": "675b8fa3a1158be6274d1458a2c00b49"
  },
  {
    "url": "assets/js/117.bdaf94da.js",
    "revision": "adc3d692bc8384510327ce5b67e6ef51"
  },
  {
    "url": "assets/js/118.97a0f16f.js",
    "revision": "1fb1ce1306ed479f08d6f308a2b9c738"
  },
  {
    "url": "assets/js/119.bf26347f.js",
    "revision": "56e05b800d02a95d905ffe39f978a412"
  },
  {
    "url": "assets/js/12.1e24409a.js",
    "revision": "4a910e477da0d6101d0fc409ee1d836c"
  },
  {
    "url": "assets/js/120.a3e2db03.js",
    "revision": "e82c8cbe990564fd6ff092f6a4d7f752"
  },
  {
    "url": "assets/js/121.18947dac.js",
    "revision": "c16f1453d442d62a2f97efadf8498711"
  },
  {
    "url": "assets/js/122.b3cb10e8.js",
    "revision": "a519f8bbcbdd7be53993d126939ad6ea"
  },
  {
    "url": "assets/js/123.e00e8b7f.js",
    "revision": "ec9d14fc378ab21ee9a2b24cbd750524"
  },
  {
    "url": "assets/js/124.46b2d669.js",
    "revision": "1dd95a3e18b9816bd40f455aca4c0466"
  },
  {
    "url": "assets/js/125.fda73dbc.js",
    "revision": "ddc7db84444856544433a070d8e84e07"
  },
  {
    "url": "assets/js/126.d9741a2f.js",
    "revision": "0a9a108990cbd95e5ba64a75e1e7a4ff"
  },
  {
    "url": "assets/js/127.5c726f39.js",
    "revision": "5d3f740c8e97b4e62c26bc3d2873c2b3"
  },
  {
    "url": "assets/js/128.e68d508e.js",
    "revision": "387eb35310ef569e5a3c60ea39ebb72b"
  },
  {
    "url": "assets/js/129.938763b6.js",
    "revision": "7a1388bc26bff188b09d6e2ee5bfc456"
  },
  {
    "url": "assets/js/13.7d6cb442.js",
    "revision": "b61078bda1795d49d27abb77a06b13ca"
  },
  {
    "url": "assets/js/130.88887412.js",
    "revision": "fe044380cf03c2f3995ef3acc0ad1c75"
  },
  {
    "url": "assets/js/14.333d4c28.js",
    "revision": "b910eaeba1e57787bfb0f35f90abb257"
  },
  {
    "url": "assets/js/15.91362abb.js",
    "revision": "0e432c43b24a6f006d9d1abd8f33ceb6"
  },
  {
    "url": "assets/js/16.63fb38fb.js",
    "revision": "cbeaff5a621a0e25a6d2b414c370c6b4"
  },
  {
    "url": "assets/js/17.ac1c13e7.js",
    "revision": "963053b15c6f426ee703d6c8741692bc"
  },
  {
    "url": "assets/js/18.18f5e735.js",
    "revision": "589a5ede65884be3ececebb8d1e45a64"
  },
  {
    "url": "assets/js/19.b97c23d8.js",
    "revision": "9ec87b31f9c7c833ce77a95a25f950ac"
  },
  {
    "url": "assets/js/2.2d6b1135.js",
    "revision": "c688dbdd01cf41b1525fb51bddc20e03"
  },
  {
    "url": "assets/js/20.76748dab.js",
    "revision": "681ebafa27dc837730dd144d176b54d8"
  },
  {
    "url": "assets/js/21.6b293e7a.js",
    "revision": "d030f5269035fba3e5be9785210be879"
  },
  {
    "url": "assets/js/22.12dd11ae.js",
    "revision": "ed1588dd630b92bdbd89995a104bfc91"
  },
  {
    "url": "assets/js/23.658ba7b0.js",
    "revision": "3c9281dafe40472e2c4055fdf50e07b3"
  },
  {
    "url": "assets/js/24.cb68a48f.js",
    "revision": "d4ef88a0eddb19288f34c3d09c1e81a7"
  },
  {
    "url": "assets/js/25.cc75fd3f.js",
    "revision": "0d65f4505e3b9436a8d210dd3dfa386a"
  },
  {
    "url": "assets/js/26.601b0375.js",
    "revision": "ca44f5a9151772a31745057911417145"
  },
  {
    "url": "assets/js/27.04cc9d8d.js",
    "revision": "0dde0b43f6e7eac70724b6134a6e1fa9"
  },
  {
    "url": "assets/js/28.c53c55c1.js",
    "revision": "b5eb0ffe91d955eeccbdefebb374ee5b"
  },
  {
    "url": "assets/js/29.9d80ed51.js",
    "revision": "9ff8066c2fe5c9dc65ba839ed4ec2058"
  },
  {
    "url": "assets/js/3.c37f75ee.js",
    "revision": "9b7caf48c3357bde246209dc4da517ec"
  },
  {
    "url": "assets/js/30.73547023.js",
    "revision": "1da94f4f252f507ba41359847272e0c6"
  },
  {
    "url": "assets/js/32.86cd035f.js",
    "revision": "22c0166388aafa401131c05a2dad2fa6"
  },
  {
    "url": "assets/js/33.27b5fc4a.js",
    "revision": "a8365cca5dc2a60a94dca91a159f4d43"
  },
  {
    "url": "assets/js/34.7ce7068d.js",
    "revision": "f82e340ce49af6f65f7c6d80c84b891d"
  },
  {
    "url": "assets/js/35.04144e7a.js",
    "revision": "50562e7876255a1d85b7498ad1512256"
  },
  {
    "url": "assets/js/36.85706530.js",
    "revision": "b52932c0b6205c18a3ad66c86e1cd37f"
  },
  {
    "url": "assets/js/37.f4c37e6b.js",
    "revision": "c80785e692038bc857c2ec04aba54443"
  },
  {
    "url": "assets/js/38.2dad05c1.js",
    "revision": "439a4f6ab4ce4621fb755cf9406e982e"
  },
  {
    "url": "assets/js/39.fcbb3b79.js",
    "revision": "afbcae7e61fc96f2efbc3657b45b4c8a"
  },
  {
    "url": "assets/js/4.bcd513ff.js",
    "revision": "bc016e75e8fdc802b0541f45dd277db2"
  },
  {
    "url": "assets/js/40.c896b7e4.js",
    "revision": "f0fd3f0a7944cce483bc3dbf81c8adc3"
  },
  {
    "url": "assets/js/41.fda7cf66.js",
    "revision": "cdb6408fe4a2066a713d3cb38c797b9d"
  },
  {
    "url": "assets/js/42.b22dd537.js",
    "revision": "efb0bb9c3794e664b6c7a5a3e52bc457"
  },
  {
    "url": "assets/js/43.110be0c4.js",
    "revision": "6d89fd08f77b0c8ef8fc36461e6c3a71"
  },
  {
    "url": "assets/js/44.5fbe1271.js",
    "revision": "84afd1e758769c745bce453e6b0462e5"
  },
  {
    "url": "assets/js/45.df945ea2.js",
    "revision": "5353925a210cefb22d3aee3043e3b869"
  },
  {
    "url": "assets/js/46.f767546b.js",
    "revision": "cdd2452279575c7d1fafa1115ea21fc2"
  },
  {
    "url": "assets/js/47.c54f545a.js",
    "revision": "20108cddffdd2543525c391d75cd649c"
  },
  {
    "url": "assets/js/48.b20f2790.js",
    "revision": "d7c00e9949c0ab63d7fdc6b19fa95686"
  },
  {
    "url": "assets/js/49.e804fa12.js",
    "revision": "4d7546f9025b3aeaebe156a7a6aa35c3"
  },
  {
    "url": "assets/js/5.8f5a74a9.js",
    "revision": "86583b4943a59275ea3ede2c456699c3"
  },
  {
    "url": "assets/js/50.61abf6a0.js",
    "revision": "17e7455ecc63a2d92e079f2b62af234d"
  },
  {
    "url": "assets/js/51.02f42775.js",
    "revision": "39a716dc18258779c184d476609a2de1"
  },
  {
    "url": "assets/js/52.982524a7.js",
    "revision": "fa5ed1e9a90dbc495b85371ac3cb82f5"
  },
  {
    "url": "assets/js/53.51b08eca.js",
    "revision": "a4c4489cbe7fb531ca988c86452df7de"
  },
  {
    "url": "assets/js/54.f4ad271b.js",
    "revision": "a7a3d1cdf31a17d91262456e712bb82c"
  },
  {
    "url": "assets/js/55.68a63f5e.js",
    "revision": "b8838e6b87c10a731834b5755e8116cf"
  },
  {
    "url": "assets/js/56.cc49399d.js",
    "revision": "6587b73ddf6e5a05fb9d507ebd6bbfad"
  },
  {
    "url": "assets/js/57.5a2fb031.js",
    "revision": "27398c2ccaf7cdbd3de1cf2aa1d2d901"
  },
  {
    "url": "assets/js/58.c78b2bb1.js",
    "revision": "1a34486efc814fc2d0adc7cc46e01b09"
  },
  {
    "url": "assets/js/59.962b4b72.js",
    "revision": "0a87a8486b16808c56b7010379da2373"
  },
  {
    "url": "assets/js/6.744b5cc8.js",
    "revision": "9a86564e6ebe2d0da477a55e15c1d6e4"
  },
  {
    "url": "assets/js/60.e215f3ab.js",
    "revision": "ab817b6c5713453a8ff4a1974e3e9659"
  },
  {
    "url": "assets/js/61.e3ce296e.js",
    "revision": "8d0f4f39dd8d46a30e2e3ea0eed6200e"
  },
  {
    "url": "assets/js/62.2fca25bc.js",
    "revision": "659d74bb22c502a75b83ce03315ab859"
  },
  {
    "url": "assets/js/63.fe618e2c.js",
    "revision": "8e492e70779e5c8349deb7bf51dbf682"
  },
  {
    "url": "assets/js/64.d2fe65c5.js",
    "revision": "b257b155da11ae0b9ad501ef92545100"
  },
  {
    "url": "assets/js/65.bdfe2ec4.js",
    "revision": "a553976ec5c3ce90d423053338b112c4"
  },
  {
    "url": "assets/js/66.bbb34387.js",
    "revision": "a43903a7a444871669019ce4973d5aa5"
  },
  {
    "url": "assets/js/67.b43a45d8.js",
    "revision": "7d5671bdfbe55ee722cab249a1614b0e"
  },
  {
    "url": "assets/js/68.ac72d4f5.js",
    "revision": "2b87e87291c0300f43b2304f0a7b47cb"
  },
  {
    "url": "assets/js/69.5ebf774f.js",
    "revision": "439262b1eb3ac30c05646ce3eac9f1ef"
  },
  {
    "url": "assets/js/7.d576193f.js",
    "revision": "9157c75f962d1c5a66f183b1223dc4a1"
  },
  {
    "url": "assets/js/70.696953d4.js",
    "revision": "9f8e3eccb5df6a23731b9f6abc95d56d"
  },
  {
    "url": "assets/js/71.9a9ec809.js",
    "revision": "2a20ec3647923101be833a5da7949dbf"
  },
  {
    "url": "assets/js/72.a7be8469.js",
    "revision": "b9a48c9d9b8bc21902f1df2c73cbd541"
  },
  {
    "url": "assets/js/73.4d15522d.js",
    "revision": "447c61f0f2e94c3fdf6b981354f5acf0"
  },
  {
    "url": "assets/js/74.12d3c944.js",
    "revision": "878f5fe209028aaeff60018642a07790"
  },
  {
    "url": "assets/js/75.9cf1908b.js",
    "revision": "95e72e5aecf6e19f71d8e6262b21aac1"
  },
  {
    "url": "assets/js/76.6c08d6d6.js",
    "revision": "07615f507c5574fa6c15234a60cae296"
  },
  {
    "url": "assets/js/77.5f3f99e4.js",
    "revision": "8fd673d29145fc075814359280e86276"
  },
  {
    "url": "assets/js/78.3b66c240.js",
    "revision": "83ea68a8af3b0ffd0dda99bf318e2291"
  },
  {
    "url": "assets/js/79.48f80a8c.js",
    "revision": "6799ead7ff0eb3fc5b98f3429f6d50f5"
  },
  {
    "url": "assets/js/8.64e9f0f8.js",
    "revision": "799fda2118e789da4ea2960403194965"
  },
  {
    "url": "assets/js/80.c3b92c15.js",
    "revision": "3db96c55847ead89203293a4bc28a71e"
  },
  {
    "url": "assets/js/81.273e891b.js",
    "revision": "efe72d14247213f0bfff2e5ee3c60471"
  },
  {
    "url": "assets/js/82.e6fc0592.js",
    "revision": "9f4169fc81db22b6ffc35e9cf4e7304b"
  },
  {
    "url": "assets/js/83.54cbfe14.js",
    "revision": "a07f0d8c7ff301f92dbc2c055ca2811d"
  },
  {
    "url": "assets/js/84.4253638d.js",
    "revision": "913127ece89ab5af930248f51dfe01e5"
  },
  {
    "url": "assets/js/85.3dc4b220.js",
    "revision": "c0c8bb580608705185d0f384cad0b70d"
  },
  {
    "url": "assets/js/86.5190799a.js",
    "revision": "43d519bf3d2eabea2f675dd04ff199de"
  },
  {
    "url": "assets/js/87.0b95eea0.js",
    "revision": "1c0d9395e964d9f26dc8d559ed98b49d"
  },
  {
    "url": "assets/js/88.01ae1ca5.js",
    "revision": "09067db1297d54160f5855cfc3f963ae"
  },
  {
    "url": "assets/js/89.af302008.js",
    "revision": "5b87adaa578d590e06f919a432bc9b80"
  },
  {
    "url": "assets/js/9.0155f281.js",
    "revision": "de8f3e198a33b1584801d6f1b6b4bb30"
  },
  {
    "url": "assets/js/90.8a585b8c.js",
    "revision": "a29e59f0adfd0705e7ae69da109d7729"
  },
  {
    "url": "assets/js/91.ab232622.js",
    "revision": "233b303a2216028e0ca2134bb1b6ce96"
  },
  {
    "url": "assets/js/92.7232189d.js",
    "revision": "d39e4c5dfa409df9fc98b5df47f75b18"
  },
  {
    "url": "assets/js/93.d2384e34.js",
    "revision": "a69ff380a0fa0503cab992eefb23fdeb"
  },
  {
    "url": "assets/js/94.74214e88.js",
    "revision": "bfba94c1af793f325b5786278e9278c1"
  },
  {
    "url": "assets/js/95.61e52cf4.js",
    "revision": "8834d5c2efae00acb414090b74c1bb79"
  },
  {
    "url": "assets/js/96.37e37757.js",
    "revision": "eebf111956a57e2bd9a2aaffeab342c2"
  },
  {
    "url": "assets/js/97.0ab9ff8d.js",
    "revision": "b0b57608aafd2ac9a993bf41a63be0dc"
  },
  {
    "url": "assets/js/98.51eb4eb4.js",
    "revision": "d927ca3be1401857591d9a8987f86783"
  },
  {
    "url": "assets/js/99.26184acc.js",
    "revision": "88a8682345d74b316dae6625b7efa5f6"
  },
  {
    "url": "assets/js/app.3da675be.js",
    "revision": "8d2cedb570cb0b8e717854b4524e8317"
  },
  {
    "url": "backend/c++/index.html",
    "revision": "1ab6e0d8835622249ffa606a46d0fef1"
  },
  {
    "url": "backend/database/index.html",
    "revision": "cd82079e2e03f2b851952c92465b4076"
  },
  {
    "url": "backend/index.html",
    "revision": "107a493bb7b140d4f14cc8f2bb1e7376"
  },
  {
    "url": "backend/Network/index.html",
    "revision": "8cd854f3c6e9ee7bf7be7618137a3bfb"
  },
  {
    "url": "backend/OS/index.html",
    "revision": "a589f7d26835dc4a7449f7a94f977e5b"
  },
  {
    "url": "backend/Security/Encrypt/index.html",
    "revision": "9e25d7f9e878b168d5d16e55e58e2aff"
  },
  {
    "url": "backend/Security/index.html",
    "revision": "4d9045ede81ee5601777d74a6bcd558e"
  },
  {
    "url": "frontend/angular/index.html",
    "revision": "d845d4cc7e6198d94948cf2c0e61183c"
  },
  {
    "url": "frontend/browser/index.html",
    "revision": "fcfcf3eb2f3d105ab6c4f5e5a406947c"
  },
  {
    "url": "frontend/css/class/index.html",
    "revision": "27e860e7b547fcd99ee33d2efb303a2b"
  },
  {
    "url": "frontend/css/flex/index.html",
    "revision": "863257ffaff4c8e4fad5ddae69bbba21"
  },
  {
    "url": "frontend/css/grid/index.html",
    "revision": "fdba1360898ca062fa9b4d83a8491969"
  },
  {
    "url": "frontend/css/index.html",
    "revision": "c02313b56f92da90c583a08293bd0916"
  },
  {
    "url": "frontend/dom/index.html",
    "revision": "14b0772accc760defbee31ad5337f44c"
  },
  {
    "url": "frontend/html/index.html",
    "revision": "869cb3c6d643fb9af74af84d21092cd7"
  },
  {
    "url": "frontend/http/index.html",
    "revision": "64b691a990f509ec253a0e6dd9932dec"
  },
  {
    "url": "frontend/index.html",
    "revision": "ed096a139365a221f86dc8cc1926ff5e"
  },
  {
    "url": "frontend/javascript/array/index.html",
    "revision": "f72368e382094378befb6fd6d36d19d6"
  },
  {
    "url": "frontend/javascript/basic/index.html",
    "revision": "535e52661c148fd3cdacb4ded495ea0b"
  },
  {
    "url": "frontend/javascript/books/index.html",
    "revision": "4b1e5c6c24857989466f3fcd7ac39152"
  },
  {
    "url": "frontend/javascript/clone/index.html",
    "revision": "308a9b0a617e0d6576572a9fb9f22823"
  },
  {
    "url": "frontend/javascript/debounce/index.html",
    "revision": "e1cd530e9d3a2a039c69fa6d10f5d21b"
  },
  {
    "url": "frontend/javascript/es6/es6-async.html",
    "revision": "676ad617b9c367785238f3550f689617"
  },
  {
    "url": "frontend/javascript/es6/es6-generator.html",
    "revision": "9d01b8cbd57ee962834dadc43c8411d6"
  },
  {
    "url": "frontend/javascript/es6/es6-iterable.html",
    "revision": "f7ad9f48df9719ce13c4bdb7bb1ab7a6"
  },
  {
    "url": "frontend/javascript/es6/es6-let-const.html",
    "revision": "574557bcfcb135f8091ae16a26ccd955"
  },
  {
    "url": "frontend/javascript/es6/es6-map-set.html",
    "revision": "0787033370f9813f4c20b59415381d99"
  },
  {
    "url": "frontend/javascript/es6/es6-promise.html",
    "revision": "86e19953c7077114541664c2506612fe"
  },
  {
    "url": "frontend/javascript/es6/es6-proxy.html",
    "revision": "e6e7c63ccac09fcd04320d93ab80d52e"
  },
  {
    "url": "frontend/javascript/es6/es6-symbol.html",
    "revision": "19fc2c8db3dd43f2595d2ea121de23f1"
  },
  {
    "url": "frontend/javascript/es6/index.html",
    "revision": "677e0dec04f8e4ea85ca6af4aaa6e29c"
  },
  {
    "url": "frontend/javascript/eventloop/index.html",
    "revision": "3d3d35e988159661364123587069b136"
  },
  {
    "url": "frontend/javascript/function/index.html",
    "revision": "6d8325de7325d3989ce1f4bdcd76a8cc"
  },
  {
    "url": "frontend/javascript/immutable/index.html",
    "revision": "c2b616f5ba3127fc18f7d4d5b1245a6c"
  },
  {
    "url": "frontend/javascript/index.html",
    "revision": "c71eff8b87e4abc326173dc96be0c7b2"
  },
  {
    "url": "frontend/javascript/json/index.html",
    "revision": "7e970f593017e44760a2e17f6891b3b4"
  },
  {
    "url": "frontend/javascript/memory/index.html",
    "revision": "1ca94921df7997b128ddf895900139b7"
  },
  {
    "url": "frontend/javascript/modules/index.html",
    "revision": "408de52d6982cc4fc454cbeb5236d28b"
  },
  {
    "url": "frontend/javascript/object/index.html",
    "revision": "ba46cf5cce83ea927f109ac5840adaf3"
  },
  {
    "url": "frontend/javascript/optimization/index.html",
    "revision": "52ba0a6294a6b31834f6dc00e6daff9e"
  },
  {
    "url": "frontend/javascript/prototype/index.html",
    "revision": "bccce5ec43ef3b9591ac58c90f2182e6"
  },
  {
    "url": "frontend/javascript/quiz/decorator/index.html",
    "revision": "c528da664a453a88845dd3794aff8c81"
  },
  {
    "url": "frontend/javascript/quiz/es6/index.html",
    "revision": "77c526689fd3818c8dac5dcb11121d16"
  },
  {
    "url": "frontend/javascript/quiz/index.html",
    "revision": "8a76483f421030abe264565b24228dac"
  },
  {
    "url": "frontend/javascript/quiz/react/index.html",
    "revision": "ac2d3704d232171a4784cd1edae696f3"
  },
  {
    "url": "frontend/javascript/quiz/vue/index.html",
    "revision": "edf0c0e89dfc2c880e93fb664f1b2a4c"
  },
  {
    "url": "frontend/javascript/quiz/webworker/index.html",
    "revision": "6974817974d4a78ffa18d1083826bba0"
  },
  {
    "url": "frontend/javascript/string/index.html",
    "revision": "7e711b128f6952fb555e75fe32af3156"
  },
  {
    "url": "frontend/javascript/timeclock/index.html",
    "revision": "a3624e8dd7ae55692fd5453c38bc33fd"
  },
  {
    "url": "frontend/javascript/utils/index.html",
    "revision": "777a3dbf1f617791dad87254feba6e1e"
  },
  {
    "url": "frontend/node/index.html",
    "revision": "ca26cb3b761424313d71392c3fe5c86b"
  },
  {
    "url": "frontend/node/router/index.html",
    "revision": "fd4d4b5f1fa81ea6754a182974c5b529"
  },
  {
    "url": "frontend/node/test.html",
    "revision": "2921745e51eee24e7b0f28ff579f3466"
  },
  {
    "url": "frontend/node/web/index.html",
    "revision": "2148e4eb6e7d001c30f559110ca4114e"
  },
  {
    "url": "frontend/node/web/koa/index.html",
    "revision": "b04293fd9c1e96ddac85470218c9c151"
  },
  {
    "url": "frontend/node/web/mocha/index.html",
    "revision": "5212369207b2f5924f1d4d7dfa27ce71"
  },
  {
    "url": "frontend/node/web/mvvm/index.html",
    "revision": "122fdb98f0502a21463f5f9c48a52901"
  },
  {
    "url": "frontend/node/web/REST/index.html",
    "revision": "8b5f0daaeed72400cf97fb0c23bdfec0"
  },
  {
    "url": "frontend/node/web/WebSocket/index.html",
    "revision": "113d5bbac9926cfe6dbbd11c6a939c35"
  },
  {
    "url": "frontend/react/index.html",
    "revision": "9cca792c76ff20901aca4199fefd0b2e"
  },
  {
    "url": "frontend/ssr/index.html",
    "revision": "4e54ef9a1fe08f79978da341c7ec00e9"
  },
  {
    "url": "frontend/typescript/index.html",
    "revision": "ec02c07c46ebc6e25dc8918dbd66f383"
  },
  {
    "url": "frontend/visiual/canvas/index.html",
    "revision": "8ae481e98c1e2d3db6b9f150f3130aa0"
  },
  {
    "url": "frontend/visiual/d3.js/index.html",
    "revision": "536096f5ac18570f8fa75d0b87acff00"
  },
  {
    "url": "frontend/visiual/index.html",
    "revision": "3a95967642c5137568becb6b17ace4f4"
  },
  {
    "url": "frontend/visiual/svg/index.html",
    "revision": "e7edeee68385255376bd065e413cdac2"
  },
  {
    "url": "frontend/visiual/three.js/index.html",
    "revision": "fb97771df0c552800c1a86c3b70f651f"
  },
  {
    "url": "frontend/visiual/zrender/index.html",
    "revision": "68e03e524fb7a0e324667be13e5dc308"
  },
  {
    "url": "frontend/vue-router/index.html",
    "revision": "2f4e5b22b49c49d9df4072b8d0246527"
  },
  {
    "url": "frontend/vue/index.html",
    "revision": "2931f1191324a3521fbed7eddacbbb32"
  },
  {
    "url": "frontend/vuex/index.html",
    "revision": "554f5be08bfb8b20dc12f0f527f0d8cf"
  },
  {
    "url": "frontend/webpack/index.html",
    "revision": "4519cb722a0dab5adf2612d661fc4433"
  },
  {
    "url": "frontend/webworker/index.html",
    "revision": "5791a5e8b8d6ba00f660107b14a08aa0"
  },
  {
    "url": "images/_prototype_.jpg",
    "revision": "dc939e630d4a376cc14c54543d7e498a"
  },
  {
    "url": "images/agentDiffpng.png",
    "revision": "4b08e84063f15d3496180b3b23a9fee3"
  },
  {
    "url": "images/agentLoadbalance.png",
    "revision": "2c9526e2fc9a2ba6d6c7ee3fb6de229c"
  },
  {
    "url": "images/algorithm-coinchange-greedy.jpg",
    "revision": "a97efe2abaaa643260f040b0b6f63ac7"
  },
  {
    "url": "images/algorithm-data-01-for-opt.jpg",
    "revision": "3d55131b5d56c199fe077b97bd844103"
  },
  {
    "url": "images/algorithm-data-01-formulation.png",
    "revision": "cbffbcc3713acfed5f52f1a541c54e57"
  },
  {
    "url": "images/algorithm-greedy-leetcode-45-jump-2.png",
    "revision": "c45993749240768fe3bea08f2a483e4d"
  },
  {
    "url": "images/algorithm-greedy-leetcode-45-jump-3.png",
    "revision": "39de7e732feace1272fce30e1e96223d"
  },
  {
    "url": "images/algorithm-greedy-leetcode-45-jump.png",
    "revision": "545484a331c2921d5f3c7fa17fe30dca"
  },
  {
    "url": "images/algorithm-javascript-linkedlist-doublylist-removemiddle.jpg",
    "revision": "738c102dbfe5b41df891c40189a94223"
  },
  {
    "url": "images/algorithm-JavaScript-linkedlist-removelastnode.jpg",
    "revision": "a10e9d6e8dcf0244c501228a7722c144"
  },
  {
    "url": "images/algorithm-javascript-recursive-linkedlist.jpg",
    "revision": "28a21a0a0eec3d2480ad847c923b3c24"
  },
  {
    "url": "images/algorithm-knapsack-0-1.jpg.jpg",
    "revision": "b05bc81896c91bac0efb3dec3f4b85c3"
  },
  {
    "url": "images/algorithm-lcs-dp.jpg",
    "revision": "f5f5947242795a98326eaa0430bfe70c"
  },
  {
    "url": "images/algorithm-lcs.jpg.jpg",
    "revision": "1dd6e70622301d6fe2b55c868338d0b6"
  },
  {
    "url": "images/algorithm-leetcode-91-numDecoding.png",
    "revision": "5401f9ec018c453114789e4d935517f0"
  },
  {
    "url": "images/algorithm-LeetCode-greedy-453-1.gif",
    "revision": "abd5f9bfbcf435c8407dc803505688f3"
  },
  {
    "url": "images/algorithm-LeetCode-greedy-453-2.jpg",
    "revision": "d4546c0926c559605d9c54a4395033ac"
  },
  {
    "url": "images/algorithm-LeetCode-greedy-453-3.jpg",
    "revision": "6ee029412bebc1b322e0fe7606a46b67"
  },
  {
    "url": "images/algorithm-LeetCode-greedy-453-4.jpg",
    "revision": "e6b3370c7a226a6f43fbbdcf6359bfc8"
  },
  {
    "url": "images/algorithm-LeetCode-search-bfs.jpg",
    "revision": "38aa45fb67595f011415b3d2a335ddc3"
  },
  {
    "url": "images/algorithm-LeetCode-search-dfs.jpg",
    "revision": "3bde9a1b6eacf6001464a1b222d129f2"
  },
  {
    "url": "images/algorithm-longest-string.jpg.jpg",
    "revision": "cd630a855b3e60c48eef4c64903f71bf"
  },
  {
    "url": "images/algorithm-recursicve-fibnacci.jpg",
    "revision": "c5f6b137169132fcd804baa73254069a"
  },
  {
    "url": "images/algorithm-sort.jpg",
    "revision": "0e61289de17a20683911c3559f72a42e"
  },
  {
    "url": "images/await-under-the-hood.svg",
    "revision": "53229f5da04e94e321179e8fa348a27e"
  },
  {
    "url": "images/baseClientRequest.jpg",
    "revision": "696897d8ebe5aac1287bb53fd2ab943f"
  },
  {
    "url": "images/cat.jpg",
    "revision": "1de89e294365d9ea7d2a853c20788315"
  },
  {
    "url": "images/data-dfs-sequence.jpg",
    "revision": "d88c2ca2448188d0d8e1f2b5d3f07069"
  },
  {
    "url": "images/data-dfs.jpg",
    "revision": "e0d6641f0a85506afdc2e59fdea24b85"
  },
  {
    "url": "images/data-encrypt.jpeg",
    "revision": "dc3352ea62b9fbeb8d7b9a2e764c0280"
  },
  {
    "url": "images/data-grapg-dijkstra.jpg",
    "revision": "8b214f1ca66d026e1a758be276c4169c"
  },
  {
    "url": "images/data-graph-bfs.jpg",
    "revision": "f511bb17c74e39e3559d293cad1f31a5"
  },
  {
    "url": "images/data-graph-dfs-dag.jpg",
    "revision": "709eb63604aa65bfaff5f4d8367fd02c"
  },
  {
    "url": "images/data-graph-dfs-eg1.jpg",
    "revision": "cb9a5fdcc0aea8e7897b5263a67fbedc"
  },
  {
    "url": "images/data-graph-improve-dfs.jpg",
    "revision": "7c18f480f2c45cf9a034596d18708664"
  },
  {
    "url": "images/data-graph-matrix.jpg",
    "revision": "5543963a3e40b865776eaffa36e688c2"
  },
  {
    "url": "images/data-graph-mst.jpg",
    "revision": "219eb67e16087307a6b1b076369e19c8"
  },
  {
    "url": "images/data-graph-relate.jpg",
    "revision": "1909c20a001f5a2ce0f1379c8433901d"
  },
  {
    "url": "images/data-graph-table.jpg",
    "revision": "872f28788d75eced76456ee8d237d011"
  },
  {
    "url": "images/database-design-formula-2-.png",
    "revision": "0788c2e22d5ceb04f7357ca3dee2c1f7"
  },
  {
    "url": "images/database-design-formula-2-2.png",
    "revision": "13fe9b105a29eb6328965099f310e6c0"
  },
  {
    "url": "images/database-design-formula-2.png",
    "revision": "2b81bcad6afa5eb1d58ec4526e51874a"
  },
  {
    "url": "images/database-design-formula-3-1.png",
    "revision": "2c63db8c523dee695def5cb3b1e6c923"
  },
  {
    "url": "images/database-design-formula-3-2.png",
    "revision": "226116e6c4930f99a1cb07492e8a2c4a"
  },
  {
    "url": "images/datacollection.png",
    "revision": "2ceee8fbb71e6c6d79c3c10b48029ce3"
  },
  {
    "url": "images/datastructure-javascript-array-3dmatrix.jpg",
    "revision": "cc8333e36d118df649e1e07e787093d2"
  },
  {
    "url": "images/datastructure-javascript-array-shift.jpg",
    "revision": "656377fd70f9de28d6fdc5f4556dbe32"
  },
  {
    "url": "images/datastructure-javascript-array-unshift.jpg",
    "revision": "4d29d60f336834657bb3f677c3d3a570"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-doublehead.jpg",
    "revision": "028d29743a9f8ca12a2c28d4641fcb86"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-doublylist-new.jpg",
    "revision": "171460c59d7d0dd91bc00b53f858caae"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-doublylist-newlist.jpg",
    "revision": "c4e433f2d84b10c84d5b3e076fd171ac"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-doublylist-type3.jpg",
    "revision": "87b4d9778cb7ef59a982ab67a573b6c9"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-insert-example-head.jpg",
    "revision": "5bc243824e88fded719aa03949deaedf"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-insert-middle.jpg",
    "revision": "1a738dcf4a3126ab033fad3772813628"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-new-linklist-insert.jpg",
    "revision": "71cb032ff7c7bf7af01451731625c506"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-new-linklist.jpg",
    "revision": "8180bcbad5a62a1cb000e38941b2c0f3"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-remove2.jpg",
    "revision": "b37772e73994a35c02efde7694e8884b"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-removeexample.jpg",
    "revision": "daaec0537e200207ea5c23835cd8b766"
  },
  {
    "url": "images/datastructure-JavaScript-linkedlist-removelast.jpg",
    "revision": "0027c7232e9bf601f2f996fe9f673c69"
  },
  {
    "url": "images/datastructure-JavaScript-list-what's-list.jpg",
    "revision": "d6d637871df2e9794824bdfef65223fb"
  },
  {
    "url": "images/datastructure-JavaScript-queue-hotpotato.jpg",
    "revision": "02e0c19f6a1615a4bd01f6605f33e51a"
  },
  {
    "url": "images/datastructure-JavaScript-queue-priorityqueue-example.jpg",
    "revision": "56ccb7759c46166d010afd3b832c9c2b"
  },
  {
    "url": "images/datastructure-O-analysis-1.jpg",
    "revision": "5f58d9b4ddefc73c87ea05d140aaee61"
  },
  {
    "url": "images/datastructure-O-compare.png",
    "revision": "4c3cefb2e063fcee02ed0f23b142e241"
  },
  {
    "url": "images/datastructure-O-complixity.png",
    "revision": "d8c70a145975410334f5145f2762ec49"
  },
  {
    "url": "images/datastructure-O-graph.png",
    "revision": "f8e12a8de33833087e7bf9cd2e619422"
  },
  {
    "url": "images/datastructure-O-search.png",
    "revision": "ba17d964f59f54833dcb10e424443e6b"
  },
  {
    "url": "images/datastructure-sort-complixity.jpg",
    "revision": "25f6391855f245df19b918f118e8e89c"
  },
  {
    "url": "images/datastructure-sort-heapsort-tree.png",
    "revision": "467d15e7a68584ecb531e672d55a90f4"
  },
  {
    "url": "images/datastructure-sort-heapsort-tree2.png",
    "revision": "f893f767f4ad352adee495ff20091dd0"
  },
  {
    "url": "images/datastructure-sort-heapsort-tree3.jpg",
    "revision": "16e7923b70982d21f493d7e50765e27c"
  },
  {
    "url": "images/datastructure-tree-huffman-encode.jpg",
    "revision": "bbeca38de4391e509aacf1a6b9b650f8"
  },
  {
    "url": "images/datastructure-tree-huffman.jpg",
    "revision": "219787457a3925b2e9acad3eecbc73d9"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-aggregation.gif",
    "revision": "08c20c70c86a428aa2e1c23f98eda447"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-association.gif",
    "revision": "b7073da5d19e02c7bb0c82aa927dcde0"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-composition.gif",
    "revision": "8463f10bc64d7f50989d04acbe7cefb9"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-dependency.gif",
    "revision": "0500aa5d66f9a80a739d760a7f1b0bbc"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-generalization.gif",
    "revision": "3c23123a926e4feae3587df3a145b43c"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture-realization.gif",
    "revision": "b6377bbbc132e4242e10f4e8129ba801"
  },
  {
    "url": "images/designPattern-basicInfo-classPicture.gif",
    "revision": "8be45b1106a16968b8a86fcc4c34b386"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-abstractFactory.gif",
    "revision": "8d50beda77a158bcafe349bf0fbc6833"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-adaptor-object-example.gif",
    "revision": "bcccb5b1cc9d658e5846dcf8bdf27e2e"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-adaptor-object.gif",
    "revision": "37569a91bad78ca8aee4b982318d6962"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-adaptor-observer-clock.gif",
    "revision": "e4098986cb93cde4f3454671c53792df"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-adaptor.gif",
    "revision": "e03c768b5ed2989d4afa2f420d918d63"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-aggregate-composition.gif",
    "revision": "6521b03ca0016a5343be31e1bc4c8eac"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-aggregate-example.gif",
    "revision": "6e5a370f0bcf456eb8fb7d643ec2c5da"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-aggregate.gif",
    "revision": "56808e8226689515ef81baa78f6543e6"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-bridge-example.gif",
    "revision": "f93c59762561f53ec8c10ce3d070db78"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-bridge.gif",
    "revision": "24531b52e3b22ddf1240d923d130938a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-bridgeAndAdaptor.gif",
    "revision": "8176a572607a207dabc8f89b4999ddf6"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-builder-example.gif",
    "revision": "a503aeeba2eca9fb30db16f1dbb6040d"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-builder.gif",
    "revision": "5f189c42f9c74e9d11777571f9da5ada"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-command-composition.gif",
    "revision": "a9ca1cb953ce7b0b8be3f2e44edd033c"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-command-dinning.gif",
    "revision": "208690fa5565a5c29653dc15c1e5f7a4"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-command.gif",
    "revision": "284c0e86a16a5b751ff72c75c8a5175e"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-compositionPattern-ComplexComposition.gif",
    "revision": "8d3718e34c1002442ade3fd11a6f0023"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-compositionPattern-leaf.gif",
    "revision": "d81057b65cf20b6a251776f65cbdb8d1"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-compositionPattern-safe.gif",
    "revision": "410f9fcb2ea38fa4accfee7b55c0da85"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-compositionPattern-UseSafe.gif",
    "revision": "6fd323dc0c9733afa9093eeff79238e8"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-compositionPattern.gif",
    "revision": "44c5f1708c950ea16871b8d91315d0ea"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-CompositionReusePrinciple-useComposition.gif",
    "revision": "f773ab4f79585ecb0f4aa1ee6dc4684c"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-CompositionReusePrinciple.gif",
    "revision": "ef984930a9039669683809a107cdf393"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-decorator-example.gif",
    "revision": "2afbcf356ddfdb5c664c51635ba914e4"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-decorator-extend-noAbstractConstruct.gif",
    "revision": "4291dbc3000f91439a4000f4c967226e"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-decorator-oneDecoration.gif",
    "revision": "690ac910ab5817c250d56b0951a96d8f"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-decorator.gif",
    "revision": "e522782edd431352b249572452ec36f6"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-DemeterPrinciple.gif",
    "revision": "928e91baaf77b90ce855dde051e3f286"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-DependencyInversionPrinciple.gif",
    "revision": "b02e9bf5f030e7406c242b250be3a016"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-doucleAdaptor.gif",
    "revision": "955c17960a362543dae7989c0bb75268"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-Electricfactory.gif",
    "revision": "143ae280aff94c050149842bf9616c5a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-facede-example.gif",
    "revision": "b98f36addbe3956528a81a0693c1c631"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-facede-extend.gif",
    "revision": "3094b5c0158c6442caeb8569f3989b34"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-facede-implementation.gif",
    "revision": "2b18b79a43bf9c80007d9430c28e5960"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-facede.gif",
    "revision": "f71591fd5a764e2ce216babf81aa0acb"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-factory-farm.gif",
    "revision": "d5305a355854158d8a87ec280e176d08"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-factory.gif",
    "revision": "9cb4fbe364c148c511a8bdd64f7884d0"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-factoryStrategy.gif",
    "revision": "f5d309369127895cbbb1bb9d5586ef2d"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-flyweight-composition.gif",
    "revision": "c354887a02621d6a9ffcc39a1fcdf4cd"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-flyweight-example.gif",
    "revision": "c83cc3df09caa689dbdcaa63ad146914"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-flyweight-pure.gif",
    "revision": "3a1990da2e37082f83196cc0591caa7a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-flyweight.gif",
    "revision": "e94028aa175446d6af25d8fb1287d74e"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-InterfaceSegregationPrinciple.gif",
    "revision": "dcff5124fae344a90adcd3cdcd26eb6c"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-interpreter-example.gif",
    "revision": "aac83bebedc20138a8253a6fbe75a150"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-interpreter-student.gif",
    "revision": "f1e6ee3af31e730072cf28f28110a99e"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-interpreter.gif",
    "revision": "ef3294c080e4147cf771c49827c289e8"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-LiskovSubstitutionPrinciple.gif",
    "revision": "1575567eba3a00b9dad76cc9e5f6ef4a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-mediator-estate.gif",
    "revision": "a8f9e9a4be2037c5d04f0b3c293922ed"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-mediator-extend.gif",
    "revision": "7a6f352851eed38c8c4da0c60011ac1a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-mediator.gif",
    "revision": "2757530b097845dd5d611dddfb5b5697"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-observer-example.gif",
    "revision": "cfabe3cff04c1b9a4d57154be8bd07f6"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-observer-oil.gif",
    "revision": "383530d547b96dfcb734f49ec786bf68"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-observer.gif",
    "revision": "4ad3e0b3c15d542518aa433ed9a8c640"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-OpenCLosedPrinciple-example-bird.gif",
    "revision": "d93bbd2db0ad920a7cd9d176b159c2df"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-OpenCLosedPrinciple.gif",
    "revision": "b35a7361ca3145be36c704637fed79e6"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-prototype-example-shape.gif",
    "revision": "a8aead2bb4c3090c6aa204b0dd610cc3"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-prototype-example.gif",
    "revision": "a84e4e56efc16a7288cf022f306ce209"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-prototype-extend.gif",
    "revision": "e7654fa666d5e5637a347965a86616e3"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-prototype-generateResemble.gif",
    "revision": "a8f645059c27b277c8313aa4333cec17"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-prototype.gif",
    "revision": "eea303f6ae1e366f9dc86a787a97b5f3"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-ProxyConstructor-example.gif",
    "revision": "8c4df6bed0907a845ad1a1b791ebedc2"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-ProxyConstructor-extend.gif",
    "revision": "0beffab7740a20055f27e55db943065a"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-ProxyConstructor.gif",
    "revision": "d1199a094739eae5460057291376b7cf"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-simpeFactory-farm.gif",
    "revision": "fb116b6bb13dfaf657f4e39e38329c7c"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-simpeFactory.gif",
    "revision": "2b47d9b1cef2ba331f1ac32dc499bb81"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-SingleResponsibilityPrinciple.gif",
    "revision": "cdf202d95f6230a7a8c3b6e8bf0b3757"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-singleton-structure.gif",
    "revision": "f2bee9f1598f9d3028e32dd2123fca20"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-singlton-hungry.gif",
    "revision": "389765df030eb2e5d0e3ad89cff437cc"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-singlton-lazy.gif",
    "revision": "fd2a2a24c98db1b137598d1218f1dc6f"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-singlton-multicm.gif",
    "revision": "790216cd19b4c9188d1a6168dc1ca934"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-strategy-crab.gif",
    "revision": "2388db0e4284c0cd4b15cb62c2f8e088"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-strategy-visit.gif",
    "revision": "e4cd64c5b18340e8577a9aa98a463e81"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-Strategy.gif",
    "revision": "75c91de2fab6a2e39e9ee7ce3c79ccd4"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-template-abroad.gif",
    "revision": "3dd9bb1919c5f48f9fa4a1127ee4293d"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-template-example.gif",
    "revision": "ed4f437525760c48b0e3bad990065f5f"
  },
  {
    "url": "images/designPattern-basicInfo-OOP-Principle-template.gif",
    "revision": "c07b44f8d0fa11efaf4a07430dae2613"
  },
  {
    "url": "images/designPattern-basicInfo-uml-class.gif",
    "revision": "a057f661fd6acb48884adf4127fb8e82"
  },
  {
    "url": "images/designPattern-basicInfo-uml-classPicture.gif",
    "revision": "5c6340ac9d218e35a38db2234ba5ff51"
  },
  {
    "url": "images/designPattern-basicInfo-uml-classRelation.gif",
    "revision": "ae0344c39eafba0c8eb680ea3a77bc9a"
  },
  {
    "url": "images/designPattern-basicInfo-uml-interface.gif",
    "revision": "f3a32695ac15feaf59a88d0e02c768a5"
  },
  {
    "url": "images/dom-tree-render.png",
    "revision": "6ccc9594a0dc0a616804780992d4298d"
  },
  {
    "url": "images/droidapp.jpg",
    "revision": "88ae637b492b6c196626e0c1aa1e6e50"
  },
  {
    "url": "images/drone.png",
    "revision": "5fa95cc24fb7c9018caa8d14ac63487e"
  },
  {
    "url": "images/ealgorithm-data-longestSubqueue.jpg",
    "revision": "1e7e985582fa04b4a205ece84fc156fb"
  },
  {
    "url": "images/event-buble.png",
    "revision": "276c91e03be37bc857446b7126428ea6"
  },
  {
    "url": "images/forwardAgent2.png",
    "revision": "8edfcd894c78975522af66519cd7d46c"
  },
  {
    "url": "images/forwordAgent.png",
    "revision": "3c7dbf3b8f53795123dd8f312e9c3e89"
  },
  {
    "url": "images/front-end-javascript-function-hasownproperty.jpg",
    "revision": "c555ab60b4ac8f102f2be7a0c8c49554"
  },
  {
    "url": "images/front-javascript-variable-baisctype-copyvalue.jpg",
    "revision": "b8f8d6a5ccb7caaf7017f9bd0500bc9e"
  },
  {
    "url": "images/front-stack.jpg",
    "revision": "3142670b8497e50397fae5084be16248"
  },
  {
    "url": "images/frontend-algorithm-JavaScript-doublylinkedlist-insert.jpg",
    "revision": "3751cf847b949dd4a316ddedcad96b79"
  },
  {
    "url": "images/frontend-datastructure-javascript-stack-10tohextring.jpg",
    "revision": "8f070f7aa921126d2485782cccb8010b"
  },
  {
    "url": "images/frontend-datastructure-javascript-stack-example-1.jpg",
    "revision": "f11ac5ca3cd7b3968593f47f5351a68e"
  },
  {
    "url": "images/frontend-datastructure-javascript-stack-example.jpg",
    "revision": "f75b6afb0f2611722d049513d681707e"
  },
  {
    "url": "images/frontend-datastructure-JavaScriptDescription-stack-pop.jpg",
    "revision": "cde9ff20612af96c3735db9e34930f02"
  },
  {
    "url": "images/frontend-javascript-dom-client.jpg",
    "revision": "22eec9071f83b020ef65c5083f45b054"
  },
  {
    "url": "images/frontend-JavaScript-dom-offset.jpg",
    "revision": "dd7e2707947fcd04d43bdd8d1a6d6372"
  },
  {
    "url": "images/frontend-javascript-dom-scroll.jpg",
    "revision": "b139f6f2cf683956a7606ed0a12be4c9"
  },
  {
    "url": "images/frontend-JavaScript-event-device-orientation.jpg",
    "revision": "e8662fe9036b34362d77d48275dc0e70"
  },
  {
    "url": "images/frontend-javascript-event-domevent.jpg",
    "revision": "94d7405baba458fd2692acae843cc9af"
  },
  {
    "url": "images/frontend-JavaScript-event-iecapture.jpg",
    "revision": "f51681fb974975bfe19b01cbd88e1e2f"
  },
  {
    "url": "images/frontend-javascript-event-mousescroll.jpg",
    "revision": "a55f56d87203de7394cc6d6f7258a6dd"
  },
  {
    "url": "images/frontend-javascript-event-netscape-capture.jpg",
    "revision": "5c2c97fc51eb4774dbfb0f6d78852b69"
  },
  {
    "url": "images/frontend-JavaScript-function-Closure-scope.jpg",
    "revision": "03ae508623e338946381c2e418bdc646"
  },
  {
    "url": "images/frontend-JavaScript-function-closure-scope2.jpg",
    "revision": "ec491c83aa4c2608d672f6ca90736014"
  },
  {
    "url": "images/frontend-JavaScript-function-prototype.jpg",
    "revision": "99d000e80935f7e5fd6db060f9cdfd05"
  },
  {
    "url": "images/frontend-JavaScript-oop-extend-prototype.jpg",
    "revision": "22ff7766c2872429d17f6bc05a10f5fa"
  },
  {
    "url": "images/frontend-JavaScript-oop-extend-prototypechain.jpg",
    "revision": "9754d5ab825b5a147cd603f7532607db"
  },
  {
    "url": "images/frontend-JavaScript-oop-parasiticinheritanceexample.jpg",
    "revision": "db34127af3148ec83038eb461fae4cf5"
  },
  {
    "url": "images/frontend-JavaScript-oop-prototypemode.jpg",
    "revision": "b81c57ac9234edd2308021450b6dd423"
  },
  {
    "url": "images/frontend-javascript-variable-findvariable.jpg",
    "revision": "f8126eb1cf88b1d69d65c226e5ff2dc9"
  },
  {
    "url": "images/frontend-javascript-variable-referencevalue.jpg",
    "revision": "c557fc1fb0ea5bd6aa520b4657a9a147"
  },
  {
    "url": "images/http-head.png",
    "revision": "3f732131bde60f27ab672e9c5d3f4fb2"
  },
  {
    "url": "images/http-network.png",
    "revision": "861d19e3d59b66d6175b509b90212295"
  },
  {
    "url": "images/http-request-header.png",
    "revision": "0f9c92ce2c35ad468e4e81fdf67a36e0"
  },
  {
    "url": "images/http-response-header.png",
    "revision": "881539b349a745cf4c83dfee2652e747"
  },
  {
    "url": "images/http1.0-http2.0.jpg",
    "revision": "fdfe969a4f665c3eb1aaf74c92efb9d7"
  },
  {
    "url": "images/httpAhttps.png",
    "revision": "bc27b98c4710a66954df05a9c6ed1aa6"
  },
  {
    "url": "images/httpmultiline.jpg",
    "revision": "4cc839ecf9ef62043e92814dc42fda62"
  },
  {
    "url": "images/hybrid-6.png",
    "revision": "a7ac57306e382c9ec1c3ef34299c683d"
  },
  {
    "url": "images/hzcms.png",
    "revision": "ffa21df678207f3fe1adcefabbe65dbd"
  },
  {
    "url": "images/hzsmartfactory.jpg",
    "revision": "645b5c4013a2c0e56058ead85de25383"
  },
  {
    "url": "images/iot-hierarchy-devices.png",
    "revision": "5433b8e335c8c1e318bcff0f3cb4624d"
  },
  {
    "url": "images/JavaScript-DOM-childNodes.jpg",
    "revision": "50692ab41597946296927d348a93cce3"
  },
  {
    "url": "images/js-prototype.png",
    "revision": "282ef60fe1dfe60924c6caeaeab6c550"
  },
  {
    "url": "images/jsTimeClock.png",
    "revision": "ff1e503747ef3c68425135fbeaec26d8"
  },
  {
    "url": "images/mesxz.png",
    "revision": "df5cfe08be41f79f76751001bb3edc02"
  },
  {
    "url": "images/microtasks-vs-tasks.svg",
    "revision": "bdfe0f074174e2d3efd004d994ef6d71"
  },
  {
    "url": "images/mysql-Parameter-must be-defined.png",
    "revision": "effa7c28b4d18228f77e8b0c0f3ce0e5"
  },
  {
    "url": "images/network-industrail-canopen-device-model.jpg",
    "revision": "39fed89d01b1412fb72d15c9d673a1cd"
  },
  {
    "url": "images/network-industrial-canopen.jpg",
    "revision": "85728a6c9de69d7476cf8cb6eb2db827"
  },
  {
    "url": "images/network-osi-7-ref.png",
    "revision": "15bdc5c257f7c109f184f9872c57b2d5"
  },
  {
    "url": "images/network-osi-7.png",
    "revision": "a9e21d4f002a8a22a7129fc63c22dc46"
  },
  {
    "url": "images/network-tcp-ip-5.png",
    "revision": "e3e6da6551e8178d4244a272b1765efa"
  },
  {
    "url": "images/OSI-7-TCP-IP.png",
    "revision": "24151f0f827fad11b252d848d527746a"
  },
  {
    "url": "images/photo (2).jpg",
    "revision": "428c4d401509f254120dc94349ccf045"
  },
  {
    "url": "images/photo.jpg",
    "revision": "24e3f6aadcf450e5b4714b43fb0cc048"
  },
  {
    "url": "images/requestBody.jpg",
    "revision": "fa36618745d71a7d878c861c29b48a35"
  },
  {
    "url": "images/reverseAgent.png",
    "revision": "fe75527fb05a5f5b8012a13c80a3a98a"
  },
  {
    "url": "images/reverseAgent2.png",
    "revision": "d97b6941ceba2861d569975c27952d88"
  },
  {
    "url": "images/ryf-server-sent-events.jpg",
    "revision": "dc7cccab941a5405e83817917159c6b1"
  },
  {
    "url": "images/ryf-websocket.png",
    "revision": "01881d8f5cd4dc6d8650a6b9f173cb49"
  },
  {
    "url": "images/serverPush.png",
    "revision": "8ad9ffcd375857b4784209da5753092a"
  },
  {
    "url": "images/set-add.jpg",
    "revision": "49def9e1748d92b21d9fd6f465020205"
  },
  {
    "url": "images/software_boardxz.jpg",
    "revision": "fb1f51e091fc65d0ab20fcaeb4586204"
  },
  {
    "url": "images/SPDY.png",
    "revision": "2eec55da31940fbcbccf97df570e6142"
  },
  {
    "url": "images/statistics.jpg",
    "revision": "3470fc8592196276dd5b149305af094e"
  },
  {
    "url": "images/szxzkb.png",
    "revision": "d5d6a957e6196ea288fef475e4875836"
  },
  {
    "url": "images/thread-deadlock.jpg",
    "revision": "b0f417cfe698029179cd22b2b273581b"
  },
  {
    "url": "images/vue-diff.png",
    "revision": "276e7694c4160d45d9a6f805433c9c71"
  },
  {
    "url": "images/vuex.png",
    "revision": "983ea11f68f23d6a3229e13eafea6dc7"
  },
  {
    "url": "images/vuex1.png",
    "revision": "288a0dc913bab3fe765baf18fb4bac27"
  },
  {
    "url": "images/webpack-complier.png",
    "revision": "956672185ef6f7c536a002fc1d0c9061"
  },
  {
    "url": "images/webpack-SourceMap.png",
    "revision": "49742518be20a4a2a55356c66b6bf014"
  },
  {
    "url": "index.html",
    "revision": "e15d7f345a63961c48369ad2681fc5aa"
  },
  {
    "url": "others/algorithm/index.html",
    "revision": "debbc91b4305600dd227c17bd3bc92e8"
  },
  {
    "url": "others/algorithm/LeetCode/BackTrace/index.html",
    "revision": "03d0b61d3f67bc0fb4651e76b0925048"
  },
  {
    "url": "others/algorithm/LeetCode/BinarySearch/index.html",
    "revision": "1aeb8d13d3dce4b790e4403b4bb4f61d"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/index.html",
    "revision": "a8294ab32bf0d3e5aae5fa2f32a1d465"
  },
  {
    "url": "others/algorithm/LeetCode/Divorce/index.html",
    "revision": "159a722d67158f3a26ddf08ea8a763b3"
  },
  {
    "url": "others/algorithm/LeetCode/DynamicPlaning/index.html",
    "revision": "683e720164a49c8c1092305c67be5e96"
  },
  {
    "url": "others/algorithm/LeetCode/Greedy/index.html",
    "revision": "a67caa543794821b27dc4a3eddd6a3c7"
  },
  {
    "url": "others/algorithm/LeetCode/index.html",
    "revision": "bd651f0f38cd5cfe3b01e16659285236"
  },
  {
    "url": "others/algorithm/LeetCode/LinkedList/index.html",
    "revision": "2ed2b175b0233107704b89cb6c5661d4"
  },
  {
    "url": "others/algorithm/LeetCode/Recursive/index.html",
    "revision": "4ed547bd8ed074a11f286adb7b173fd8"
  },
  {
    "url": "others/algorithm/LeetCode/Search/index.html",
    "revision": "b60f24c7540c4926400369da5e3d088a"
  },
  {
    "url": "others/algorithm/mode/index.html",
    "revision": "aece4efd0d6a580e1a1d716afe5fc74e"
  },
  {
    "url": "others/algorithm/search/index.html",
    "revision": "79ddb487198a5090376384a914ee2c2f"
  },
  {
    "url": "others/algorithm/sort/index.html",
    "revision": "db3ffdba20128dad6ee42b3a22807a0a"
  },
  {
    "url": "others/BigData/index.html",
    "revision": "d5f24354a00a312a069fe68e9d9cb12c"
  },
  {
    "url": "others/Bug/index.html",
    "revision": "69411b2750dcec07094204145fc1f647"
  },
  {
    "url": "others/cloudcomputing/index.html",
    "revision": "b34a0e210802e01dc0d280af1a3c293b"
  },
  {
    "url": "others/cs/compilers/index.html",
    "revision": "1323f68a2b82fa86c88e857cab8a206f"
  },
  {
    "url": "others/cs/index.html",
    "revision": "dda004af16f65da09fe6671c3f2459bb"
  },
  {
    "url": "others/datastructure/array/index.html",
    "revision": "83c81f1ac7c44e11d2b1ec15929f15d1"
  },
  {
    "url": "others/datastructure/graph/index.html",
    "revision": "6f1a855778679cc5c136daa5223b584a"
  },
  {
    "url": "others/datastructure/hash/index.html",
    "revision": "fcbbaf98e067c160f881bf8590511ef6"
  },
  {
    "url": "others/datastructure/index.html",
    "revision": "b8eabaf0c6318b7d2e833429ac166c5d"
  },
  {
    "url": "others/datastructure/list/index.html",
    "revision": "9c10cd485be577a63e121a4241c78330"
  },
  {
    "url": "others/datastructure/map/index.html",
    "revision": "696da61efa74a56404dbebe57653b67a"
  },
  {
    "url": "others/datastructure/queue/index.html",
    "revision": "fcd3de9f4a2c1174afef60cbd4e0d99a"
  },
  {
    "url": "others/datastructure/set/index.html",
    "revision": "6fb0ac2fb6711030c87bc0abe573206c"
  },
  {
    "url": "others/datastructure/stack/index.html",
    "revision": "37cc74ca49d687d11d70d8eec494257a"
  },
  {
    "url": "others/datastructure/tree/index.html",
    "revision": "5662b2c4615c21c808aa56181dadbbb0"
  },
  {
    "url": "others/DesignPartten/index.html",
    "revision": "ab918385d5b713104cbf479fb1e32fb4"
  },
  {
    "url": "others/DesignPartten/singleton.html",
    "revision": "f89b5d5a9c69700beb54e23c34611320"
  },
  {
    "url": "others/devops/index.html",
    "revision": "8f37349031e009111ce55c76287e38c6"
  },
  {
    "url": "others/git/index.html",
    "revision": "bcdfca4ac2848a8504c0daeaea904729"
  },
  {
    "url": "others/index.html",
    "revision": "0e50a731f28c1135f4eea047db7bd9a5"
  },
  {
    "url": "others/industrial/index.html",
    "revision": "38285c578b7053151812ec07518d1edb"
  },
  {
    "url": "others/interview/index.html",
    "revision": "676da3cae84f36d21143a2cd9112a721"
  },
  {
    "url": "others/IoT/index.html",
    "revision": "0dbadc8c1dd7ca8f694c9025828905e3"
  },
  {
    "url": "others/leisure/aGlobalHostory.html",
    "revision": "6c3b973672dc9a1bf1fb5b7e39868936"
  },
  {
    "url": "others/leisure/index.html",
    "revision": "49185334050012afcd865e7eae9de5de"
  },
  {
    "url": "others/network/http/index.html",
    "revision": "13f8d0046061a92b2cadb4880e0ae26c"
  },
  {
    "url": "others/network/index.html",
    "revision": "e4daa4f04d1abab610af6c3213f67771"
  },
  {
    "url": "others/network/socket/READMD.html",
    "revision": "8884c07196ce5b30868e6ca31df2241f"
  },
  {
    "url": "others/projects/index.html",
    "revision": "4cb368c77f6c24f3e1840390945b27d2"
  },
  {
    "url": "others/system/index.html",
    "revision": "5b65d44466a93a74a5ed0d75218f6af5"
  },
  {
    "url": "others/system/Linux/index.html",
    "revision": "21822518a52f00a92b407991b78826aa"
  },
  {
    "url": "profile/index.html",
    "revision": "b2613fda5568c08a959149cb25a3b986"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

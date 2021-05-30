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
    "revision": "456df6a2a7dbf3a821a3ee5b5a286f49"
  },
  {
    "url": "app/C#/BUG/index.html",
    "revision": "456df6a2a7dbf3a821a3ee5b5a286f49"
  },
  {
    "url": "app/hybridapp/index.html",
    "revision": "4ded200dbb555c25f0097aba985c22eb"
  },
  {
    "url": "app/index.html",
    "revision": "beb7ead11d0ed9b9a9e97bb39b78fe49"
  },
  {
    "url": "app/nativeapp/index.html",
    "revision": "1275ab18749567a654ca8e76f9eeed69"
  },
  {
    "url": "app/webapp/index.html",
    "revision": "ff42362dacd3fb0ebf99b084d8170ade"
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
    "url": "assets/js/10.2e5ceadb.js",
    "revision": "63252f67765c2d7f4f8553af1e70b8bb"
  },
  {
    "url": "assets/js/100.52ab5ed3.js",
    "revision": "ba9ffcc60f7f8051e57e597bbb6376b6"
  },
  {
    "url": "assets/js/101.cc544cfc.js",
    "revision": "f5216511c767480d74dc6a490be91a9c"
  },
  {
    "url": "assets/js/102.38bb05fe.js",
    "revision": "edd5e6220f1c4e87c6dec166d5a23a3e"
  },
  {
    "url": "assets/js/103.ad8dc25f.js",
    "revision": "429e7836ad80497de235651f7cb7e40d"
  },
  {
    "url": "assets/js/104.257fe328.js",
    "revision": "c1ada73bbf12dad55c5d9636455e908f"
  },
  {
    "url": "assets/js/105.1ca53594.js",
    "revision": "75a37e0cec88b6821e145dbb8422b9b5"
  },
  {
    "url": "assets/js/106.112495f8.js",
    "revision": "ff9afbd99754b5931eee2dc3c26d5856"
  },
  {
    "url": "assets/js/107.76552c87.js",
    "revision": "5938aa62df70025b3cfdbba3ca22dead"
  },
  {
    "url": "assets/js/108.3decb1c1.js",
    "revision": "304eaf2bf214885f75af288270570357"
  },
  {
    "url": "assets/js/109.8195a469.js",
    "revision": "b350c8eff9785c5ba3f8d8019ed214b8"
  },
  {
    "url": "assets/js/11.4c3344a7.js",
    "revision": "9a8e09d9899dddafc179b7b790280b2d"
  },
  {
    "url": "assets/js/110.5446659d.js",
    "revision": "60c80cf72b8f9f3b2be306d87de22e4e"
  },
  {
    "url": "assets/js/111.483e4bba.js",
    "revision": "bfc812931bf16b6b86d31db4a9d63ffb"
  },
  {
    "url": "assets/js/112.2be2fc97.js",
    "revision": "06753b7cf36883b2cc1a07912cd77c77"
  },
  {
    "url": "assets/js/113.103f9302.js",
    "revision": "8957ba965b7e8e5592d28612644e7c7d"
  },
  {
    "url": "assets/js/114.b4853da1.js",
    "revision": "b5454cfd88f1bedfa35343464a7efbe6"
  },
  {
    "url": "assets/js/115.b61b7ffa.js",
    "revision": "29d171c98b5a9489d22570a31f22cb15"
  },
  {
    "url": "assets/js/116.0f3e8335.js",
    "revision": "19d86fe4550537addb27bc4b7e36d3bc"
  },
  {
    "url": "assets/js/117.b43ce674.js",
    "revision": "0f9af46e3a73aa775f687c5e3cd0cd9e"
  },
  {
    "url": "assets/js/118.142a9ecb.js",
    "revision": "9a44d950b3a248fefd5778971d93ac1e"
  },
  {
    "url": "assets/js/119.c844961a.js",
    "revision": "26e7d9be1a4c7e776150c254d795ba23"
  },
  {
    "url": "assets/js/12.1e24409a.js",
    "revision": "4a910e477da0d6101d0fc409ee1d836c"
  },
  {
    "url": "assets/js/120.4950ab7b.js",
    "revision": "82de62deccc1bdcbc347a135df8ceb22"
  },
  {
    "url": "assets/js/121.29194c11.js",
    "revision": "d893d4119fdeb2cf6afd3c7ccf161e51"
  },
  {
    "url": "assets/js/122.df8b0089.js",
    "revision": "cb9fd4b13fdc689a03c80a4d8e6c8c6a"
  },
  {
    "url": "assets/js/123.bc750af2.js",
    "revision": "2fda889ccb15b89e84489fc6a5dcfb3c"
  },
  {
    "url": "assets/js/124.57b4fb51.js",
    "revision": "8c5898944cfc087695344c66e41f9f44"
  },
  {
    "url": "assets/js/125.162c7922.js",
    "revision": "e6bbb847d36705e261ca71f6cb916f5b"
  },
  {
    "url": "assets/js/126.7c557d46.js",
    "revision": "106fe6fa6ec5b80be0ca8d4c42857e6b"
  },
  {
    "url": "assets/js/127.0fd666a8.js",
    "revision": "ecae089d1d2799d20f7a534507edb2a3"
  },
  {
    "url": "assets/js/128.0ce81f0d.js",
    "revision": "8a50cb8e383b289bf65dc2de4bb4de98"
  },
  {
    "url": "assets/js/129.b9b42849.js",
    "revision": "658cc237162ac777fb117d88f0db293c"
  },
  {
    "url": "assets/js/13.a8788553.js",
    "revision": "5bb9e5b88c71806f38a8baa2e9325ee2"
  },
  {
    "url": "assets/js/130.4b63bc72.js",
    "revision": "24b9207ca427acd085c107df1c3b2749"
  },
  {
    "url": "assets/js/131.8e5b33c0.js",
    "revision": "f90014b0f7298bc8f3bf260092c54543"
  },
  {
    "url": "assets/js/132.351ac869.js",
    "revision": "149aed0d124163948846cb0bed6008bb"
  },
  {
    "url": "assets/js/133.f721dd50.js",
    "revision": "da2167bae991124f76bc1b2c4e44a035"
  },
  {
    "url": "assets/js/134.ef73c22f.js",
    "revision": "733190699a304ec06a193e4af24a8a63"
  },
  {
    "url": "assets/js/135.0168fa9d.js",
    "revision": "ee9240fd0e1067f5aab78901bc3aba5d"
  },
  {
    "url": "assets/js/136.f7963c44.js",
    "revision": "2381119b3925a686b217a5ef80e38f60"
  },
  {
    "url": "assets/js/137.0826f57a.js",
    "revision": "c2ec677a34fa69ab77c745b0f5e91d24"
  },
  {
    "url": "assets/js/138.83cb8db6.js",
    "revision": "11499109690d5011e3306ab0a70cfcb4"
  },
  {
    "url": "assets/js/14.2adc07f3.js",
    "revision": "25331792c6d3fb2ad4f8ce737ce3e745"
  },
  {
    "url": "assets/js/15.c1cf2f8f.js",
    "revision": "78c97acd93d93c75cd669f1f81660b3f"
  },
  {
    "url": "assets/js/16.824fd1cc.js",
    "revision": "7f11d12012e4e011070c592e10eae937"
  },
  {
    "url": "assets/js/17.5cc9aa75.js",
    "revision": "9522432001b23b65f3cc9e7f03e76363"
  },
  {
    "url": "assets/js/18.18f5e735.js",
    "revision": "589a5ede65884be3ececebb8d1e45a64"
  },
  {
    "url": "assets/js/19.14efb2a6.js",
    "revision": "85f9920be2291ccb1bc1a471c75ad1c6"
  },
  {
    "url": "assets/js/2.1ba326f9.js",
    "revision": "c688dbdd01cf41b1525fb51bddc20e03"
  },
  {
    "url": "assets/js/20.8d8917ea.js",
    "revision": "afb9c0955e25820b8c14d6134ee2191b"
  },
  {
    "url": "assets/js/21.93499688.js",
    "revision": "5ccf8dc5c2890978758ac77dad18be08"
  },
  {
    "url": "assets/js/22.f9eef547.js",
    "revision": "7ae34fa6f1d9b05b7a5c6cf6cb534cee"
  },
  {
    "url": "assets/js/23.21f4ca65.js",
    "revision": "f1561788f171706fd3c9d996166d2f86"
  },
  {
    "url": "assets/js/24.06bcd4f7.js",
    "revision": "6b8d4eb4273b0e4a609dcbcaf9603361"
  },
  {
    "url": "assets/js/25.cc75fd3f.js",
    "revision": "0d65f4505e3b9436a8d210dd3dfa386a"
  },
  {
    "url": "assets/js/26.fe55d81f.js",
    "revision": "e539247e2a27baf27e3761cd3e72b171"
  },
  {
    "url": "assets/js/27.04cc9d8d.js",
    "revision": "0dde0b43f6e7eac70724b6134a6e1fa9"
  },
  {
    "url": "assets/js/28.d5593707.js",
    "revision": "c1a4d96eaaab03e8484e326d4f41c7e5"
  },
  {
    "url": "assets/js/29.6ae24eac.js",
    "revision": "e034216953aadf3fa84fe73931a708d9"
  },
  {
    "url": "assets/js/3.d0ce688b.js",
    "revision": "260af8ad0942f9817e84b9e27c9bc9b2"
  },
  {
    "url": "assets/js/30.6e4c58e4.js",
    "revision": "2ac10de0088217197232626c71d3b9b0"
  },
  {
    "url": "assets/js/32.86cd035f.js",
    "revision": "22c0166388aafa401131c05a2dad2fa6"
  },
  {
    "url": "assets/js/33.47f825cd.js",
    "revision": "5d6cad5358f283d7c242aecbf6e87482"
  },
  {
    "url": "assets/js/34.7ce7068d.js",
    "revision": "f82e340ce49af6f65f7c6d80c84b891d"
  },
  {
    "url": "assets/js/35.f1b91d69.js",
    "revision": "914802d85556598e6c14f51bdaa1a8c2"
  },
  {
    "url": "assets/js/36.22ffc057.js",
    "revision": "30f5f74d78c0e88506f7ba0eb26882cc"
  },
  {
    "url": "assets/js/37.4c7063b8.js",
    "revision": "2a28b52f16c5d81a961c397c9c2805d6"
  },
  {
    "url": "assets/js/38.a2d7d6d1.js",
    "revision": "5ad6a0c750d5bef6f9a446b7a9285643"
  },
  {
    "url": "assets/js/39.72e170d1.js",
    "revision": "f12f50d99c36926cfcfe9cee946a9569"
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
    "url": "assets/js/41.c67d6883.js",
    "revision": "5a1518cc8af28d4df1628701fc2357e1"
  },
  {
    "url": "assets/js/42.d3f25ca5.js",
    "revision": "596d3a9579a0894e2368299f92d3064e"
  },
  {
    "url": "assets/js/43.c9d8fd17.js",
    "revision": "df47f18419168aad75c2808efd509141"
  },
  {
    "url": "assets/js/44.48b09b06.js",
    "revision": "03ded2192ce4624ee67fc6b2d8bf66b0"
  },
  {
    "url": "assets/js/45.62d8c8c0.js",
    "revision": "40d01823dde609eb24bacc013c6bd4a5"
  },
  {
    "url": "assets/js/46.d4081d7b.js",
    "revision": "6783552201648ecb5d17ededc372bf60"
  },
  {
    "url": "assets/js/47.05c08073.js",
    "revision": "1219c12f9828ebe6b2f55fb5e5af3cdb"
  },
  {
    "url": "assets/js/48.6f7f50ff.js",
    "revision": "1e8f21bf46cc393143c3dfd26770a626"
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
    "url": "assets/js/51.bd07e3d1.js",
    "revision": "979360ecb9c291c2e77d743c031e4463"
  },
  {
    "url": "assets/js/52.e688c802.js",
    "revision": "28a0e404ff86a795a585ba9d9c7e9ba4"
  },
  {
    "url": "assets/js/53.8fdea818.js",
    "revision": "9ba225206f7c194c5b0c5ed8f9f17d39"
  },
  {
    "url": "assets/js/54.e80145dd.js",
    "revision": "da222c4f3ba5c3fd1df9db19c4b9e940"
  },
  {
    "url": "assets/js/55.d1499bc5.js",
    "revision": "51592a6211720e7bca3daf49291417dc"
  },
  {
    "url": "assets/js/56.d33b6ee0.js",
    "revision": "3a105148ec311593e7132a2b83d68a31"
  },
  {
    "url": "assets/js/57.5a2fb031.js",
    "revision": "27398c2ccaf7cdbd3de1cf2aa1d2d901"
  },
  {
    "url": "assets/js/58.5d1523b3.js",
    "revision": "4f9f2a119aa58a427c19f605fb557abb"
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
    "url": "assets/js/60.37f53572.js",
    "revision": "e0008dbb00b6a1a10effc25c11267312"
  },
  {
    "url": "assets/js/61.e3ce296e.js",
    "revision": "8d0f4f39dd8d46a30e2e3ea0eed6200e"
  },
  {
    "url": "assets/js/62.fbb24cf8.js",
    "revision": "e01bc24e662f6abe84f8ad1005dac487"
  },
  {
    "url": "assets/js/63.2fdd5d90.js",
    "revision": "b1fa52c1ddfd149bab585fa70cdcb550"
  },
  {
    "url": "assets/js/64.c6771c06.js",
    "revision": "9b01c0ae6c7896398664fe07342dd499"
  },
  {
    "url": "assets/js/65.0c4efae1.js",
    "revision": "17f8dbfef7f2599bb20ed20b0a50829b"
  },
  {
    "url": "assets/js/66.c99594bc.js",
    "revision": "1543a69419be21d3830a7429411b833e"
  },
  {
    "url": "assets/js/67.b241276f.js",
    "revision": "ddd60c6cb2ad061e2ec8dd967c4cd75a"
  },
  {
    "url": "assets/js/68.9818dca2.js",
    "revision": "e20684377cc1e9193a0526fc2af479fa"
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
    "url": "assets/js/71.537d925f.js",
    "revision": "b20322d1c298406ea88736222a794036"
  },
  {
    "url": "assets/js/72.529f57ce.js",
    "revision": "ddff11368c5aa03beacf6a92574b64cf"
  },
  {
    "url": "assets/js/73.26895b96.js",
    "revision": "fe9ec6fc0948bbd513fa5b36d3480d8d"
  },
  {
    "url": "assets/js/74.95bfb80a.js",
    "revision": "f90b34f33638a3fb9d8577df8702c86e"
  },
  {
    "url": "assets/js/75.417b0741.js",
    "revision": "4392471196b327c505b3c01904b2c26b"
  },
  {
    "url": "assets/js/76.a2b74358.js",
    "revision": "0b9ce2e132457db4e412a6ecff619a1a"
  },
  {
    "url": "assets/js/77.c431a1e5.js",
    "revision": "7050c270400d0153d221cc76c2790056"
  },
  {
    "url": "assets/js/78.cc7ddc5c.js",
    "revision": "a28e07c6eff5a7434bdc85b5285294bd"
  },
  {
    "url": "assets/js/79.18636072.js",
    "revision": "51d450ae626f0660d96ec5cc1d53e495"
  },
  {
    "url": "assets/js/8.64e9f0f8.js",
    "revision": "799fda2118e789da4ea2960403194965"
  },
  {
    "url": "assets/js/80.59a45e97.js",
    "revision": "f7e4e1baff7c8d8d038b0e455660ed33"
  },
  {
    "url": "assets/js/81.ea4c19bf.js",
    "revision": "d2137b08e1f4cba14807f3257f33b59e"
  },
  {
    "url": "assets/js/82.a4e09105.js",
    "revision": "3339767b08fbd05a46c1074a111b12d2"
  },
  {
    "url": "assets/js/83.c84a5cc0.js",
    "revision": "e2177fbb4499dc187944167c9be93c17"
  },
  {
    "url": "assets/js/84.c56acd4a.js",
    "revision": "5da772634ef6b10bfba849ee0680b502"
  },
  {
    "url": "assets/js/85.9c0e5bad.js",
    "revision": "fb1a89d16c28361163010bc2a20b130e"
  },
  {
    "url": "assets/js/86.9221650d.js",
    "revision": "fbad70aa9d2a606c41c80e518c94aabe"
  },
  {
    "url": "assets/js/87.3474573c.js",
    "revision": "8e0d1a8df6596fef4f9eccabc8df2aeb"
  },
  {
    "url": "assets/js/88.841bf75e.js",
    "revision": "eaf81d495098d8b8e33ba1b7b2fdb8f8"
  },
  {
    "url": "assets/js/89.de45407b.js",
    "revision": "22f106339fdb4edae8e0cecc86ad3ed8"
  },
  {
    "url": "assets/js/9.53d7237c.js",
    "revision": "aa0f5a491b753ceea99339f8c462541e"
  },
  {
    "url": "assets/js/90.37ebf94c.js",
    "revision": "fc795ea1483f123b4186e63d6e16640e"
  },
  {
    "url": "assets/js/91.f70bb95f.js",
    "revision": "84afeee36cb70a1311436d333f17d85c"
  },
  {
    "url": "assets/js/92.be6f1894.js",
    "revision": "97c15c058e14d4a35a09371f55a57657"
  },
  {
    "url": "assets/js/93.263999b7.js",
    "revision": "14d8831f922e4b139082036006168b7e"
  },
  {
    "url": "assets/js/94.f913f980.js",
    "revision": "7fecc511ad29250b446c109d1ab70b64"
  },
  {
    "url": "assets/js/95.6e6c8131.js",
    "revision": "1ba4f980feee46694950c887ef59db6c"
  },
  {
    "url": "assets/js/96.b258bbf5.js",
    "revision": "bda0b2678e15aeae9698ad03c545ffdb"
  },
  {
    "url": "assets/js/97.f0dc77c2.js",
    "revision": "dcb54045532505d4ef0b7b8b4dc65cbe"
  },
  {
    "url": "assets/js/98.d2aa840c.js",
    "revision": "b8c9dec60848697e5bd21a25369ec4f3"
  },
  {
    "url": "assets/js/99.601caf05.js",
    "revision": "4c5034cc306740322c3b428585d4e5b1"
  },
  {
    "url": "assets/js/app.ae6f3f76.js",
    "revision": "b2e05796b500aa7fa9441a88a2ca552e"
  },
  {
    "url": "backend/c++/index.html",
    "revision": "801ebcf553e9b7e6a29b652674e8836b"
  },
  {
    "url": "backend/database/index.html",
    "revision": "f6df8f576ba55e0075bf1da8c52a03d1"
  },
  {
    "url": "backend/index.html",
    "revision": "c1c6eb8c95cf220b39c51bf8d9eac3a7"
  },
  {
    "url": "backend/Network/index.html",
    "revision": "6a44d2d44e4352cffb4552a6e155d899"
  },
  {
    "url": "backend/OS/index.html",
    "revision": "0b9686ddb61892892f4fabb333c72be0"
  },
  {
    "url": "backend/Security/Encrypt/index.html",
    "revision": "1894a0626aa2d556aa776fe2b21eb86a"
  },
  {
    "url": "backend/Security/index.html",
    "revision": "9a47e7fa29bafec7192298fc1cec18d5"
  },
  {
    "url": "frontend/angular/index.html",
    "revision": "fc9f4248559f10ada0737c63d6499d5e"
  },
  {
    "url": "frontend/browser/index.html",
    "revision": "9c011472f3184efd4aa7242e2c934a5e"
  },
  {
    "url": "frontend/css/class/index.html",
    "revision": "62e0ecf76da22074cbe30f884623af6f"
  },
  {
    "url": "frontend/css/flex/index.html",
    "revision": "e65f9ab419d39d89fd06e3c0cee2df5e"
  },
  {
    "url": "frontend/css/grid/index.html",
    "revision": "05b75a8e999eb3468a76a1edb8bd6a74"
  },
  {
    "url": "frontend/css/index.html",
    "revision": "c37c3cfb84057d0689b2776c1ccb38ce"
  },
  {
    "url": "frontend/dom/index.html",
    "revision": "6186addb4d317e7c7d6144288a934147"
  },
  {
    "url": "frontend/html/index.html",
    "revision": "e3238abf19c9858095f74f59dd6dfa0b"
  },
  {
    "url": "frontend/http/index.html",
    "revision": "2613b0dcd9d825dccdf767492b75d1b4"
  },
  {
    "url": "frontend/index.html",
    "revision": "12384475b54ceaff6e4822dab6321b50"
  },
  {
    "url": "frontend/javascript/array/index.html",
    "revision": "004873f00bf7c260445918e3c90a4fc2"
  },
  {
    "url": "frontend/javascript/basic/index.html",
    "revision": "2614a96885ca85d9565f4a064156d7ed"
  },
  {
    "url": "frontend/javascript/books/index.html",
    "revision": "fd7a41182d58f2f9f70e60bf1743fbfa"
  },
  {
    "url": "frontend/javascript/clone/index.html",
    "revision": "23796a4fb199580dc3f4fc85a060d349"
  },
  {
    "url": "frontend/javascript/debounce/index.html",
    "revision": "f03aef592109036d617842a788802e77"
  },
  {
    "url": "frontend/javascript/es6/es6-async.html",
    "revision": "235563f3d6027176ac606042a18f77dc"
  },
  {
    "url": "frontend/javascript/es6/es6-generator.html",
    "revision": "4162b3aeec8bb18eb4fbd39c00a5fcdd"
  },
  {
    "url": "frontend/javascript/es6/es6-iterable.html",
    "revision": "4f9a269f69c186bc5123807cd70acfdf"
  },
  {
    "url": "frontend/javascript/es6/es6-let-const.html",
    "revision": "05775fded79b31a93779c551342096b1"
  },
  {
    "url": "frontend/javascript/es6/es6-map-set.html",
    "revision": "6600cf0cacb1ce4398d8bd1fba9167d4"
  },
  {
    "url": "frontend/javascript/es6/es6-promise.html",
    "revision": "6820e36ef80720cb48b41037f0066306"
  },
  {
    "url": "frontend/javascript/es6/es6-proxy.html",
    "revision": "79860626e3f12f557469f4810d9a7ede"
  },
  {
    "url": "frontend/javascript/es6/es6-symbol.html",
    "revision": "3e4b1f510bf306ed04b7a89a39c3719f"
  },
  {
    "url": "frontend/javascript/es6/index.html",
    "revision": "3046891dad0c9dd0056d2831a4a1f916"
  },
  {
    "url": "frontend/javascript/eventloop/index.html",
    "revision": "70d85378f7cd01c40200dcdbb1b83f40"
  },
  {
    "url": "frontend/javascript/function/index.html",
    "revision": "b1c3187a0819f573cf638b0e2ff7c884"
  },
  {
    "url": "frontend/javascript/immutable/index.html",
    "revision": "058d3e0de0cae693157e4a5b620ed012"
  },
  {
    "url": "frontend/javascript/index.html",
    "revision": "277e8eff3d669f380708245367b2e345"
  },
  {
    "url": "frontend/javascript/json/index.html",
    "revision": "b79cc54c084293dc70b120768fffb2a6"
  },
  {
    "url": "frontend/javascript/memory/index.html",
    "revision": "c4d9b6918c7b0fc3d0302814b6c79716"
  },
  {
    "url": "frontend/javascript/modules/index.html",
    "revision": "a4fff80183d5ad8353bcbb950038faa4"
  },
  {
    "url": "frontend/javascript/object/index.html",
    "revision": "6a0fc626fafe881cb71ca8aeb8f002ed"
  },
  {
    "url": "frontend/javascript/optimization/index.html",
    "revision": "eb8e7b96c0d671a01894c7f3461b484e"
  },
  {
    "url": "frontend/javascript/prototype/index.html",
    "revision": "bb08bbd85617f12e440c89828b37cb69"
  },
  {
    "url": "frontend/javascript/quiz/decorator/index.html",
    "revision": "e10c86d3da2ec0e1827753965e1ad4e1"
  },
  {
    "url": "frontend/javascript/quiz/es6/index.html",
    "revision": "3356f3a3185638b13a78ffd8953e39a6"
  },
  {
    "url": "frontend/javascript/quiz/index.html",
    "revision": "6bc7f3bd26c6c8069151d66244de39bf"
  },
  {
    "url": "frontend/javascript/quiz/react/index.html",
    "revision": "6a5b7ffb579029a963456bbefe899394"
  },
  {
    "url": "frontend/javascript/quiz/vue/index.html",
    "revision": "0987a159b4c1cdf7adb6ebcfbd5bc496"
  },
  {
    "url": "frontend/javascript/quiz/webworker/index.html",
    "revision": "324d94eb2743d4e93d6a4c29fdc1f5f4"
  },
  {
    "url": "frontend/javascript/string/index.html",
    "revision": "a4e572ea80011d93a363949fec0f6ab2"
  },
  {
    "url": "frontend/javascript/timeclock/index.html",
    "revision": "ab729b19129367592831257c6bfab574"
  },
  {
    "url": "frontend/javascript/utils/index.html",
    "revision": "73509d998f84e92fdb0707b5a1adac39"
  },
  {
    "url": "frontend/node/index.html",
    "revision": "d80ec93d0970225bafd62eedc3352efa"
  },
  {
    "url": "frontend/node/router/index.html",
    "revision": "dd46ddc91b650c1927d87395a9d45a63"
  },
  {
    "url": "frontend/node/test.html",
    "revision": "d63ae4ba8136bbd86b85f0f0059248db"
  },
  {
    "url": "frontend/node/web/index.html",
    "revision": "e55a628090265e1f5d6c49bcedec5531"
  },
  {
    "url": "frontend/node/web/koa/index.html",
    "revision": "3156b70c5a0f1dde30c79eab0fe56336"
  },
  {
    "url": "frontend/node/web/mocha/index.html",
    "revision": "9c59c2f1cd7cf8b239227249726ad3fe"
  },
  {
    "url": "frontend/node/web/mvvm/index.html",
    "revision": "17b359b9373e5200f0582abe2c4dd38f"
  },
  {
    "url": "frontend/node/web/REST/index.html",
    "revision": "fea77a417f80ec31a9299b4b220cf301"
  },
  {
    "url": "frontend/node/web/WebSocket/index.html",
    "revision": "5e61dbbe1b977f5c44cdac5a409ef8a7"
  },
  {
    "url": "frontend/react/index.html",
    "revision": "be487a121d03edc33e4c1f7e58707e09"
  },
  {
    "url": "frontend/ssr/index.html",
    "revision": "6b5dec14d998f935be1bc3c626ed398e"
  },
  {
    "url": "frontend/typescript/index.html",
    "revision": "4990b1752d71da24851ca059268e9a39"
  },
  {
    "url": "frontend/visiual/canvas/index.html",
    "revision": "02b5bb6e21d95d67e0e2a1b9901689b5"
  },
  {
    "url": "frontend/visiual/d3.js/index.html",
    "revision": "93bd4274323dd3c20fb943e53a7f99b6"
  },
  {
    "url": "frontend/visiual/index.html",
    "revision": "7d9025be7b981840d3747698368e7104"
  },
  {
    "url": "frontend/visiual/svg/index.html",
    "revision": "8f47575a7b901eef31dd6d664b9e8f97"
  },
  {
    "url": "frontend/visiual/three.js/index.html",
    "revision": "a1b3ca1383efdb5727ed2aad940a6dfe"
  },
  {
    "url": "frontend/visiual/zrender/index.html",
    "revision": "74efcc9e7855fa6b2a584bb8d54b6a24"
  },
  {
    "url": "frontend/vue-router/index.html",
    "revision": "2b9f7b9a30e6c57950ab84e77367b142"
  },
  {
    "url": "frontend/vue/index.html",
    "revision": "8c020ccf05bff2bfb896f80436420bc1"
  },
  {
    "url": "frontend/vuex/index.html",
    "revision": "30ec235e6b39a4a517dd621bb4354c59"
  },
  {
    "url": "frontend/webpack/index.html",
    "revision": "231cdbae7b9cc47a4515b6ab41da503a"
  },
  {
    "url": "frontend/webworker/index.html",
    "revision": "59516500a9fe48734cbc8d3d12e5872d"
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
    "revision": "e160ec23a431d5a1be9352f31f5e20f4"
  },
  {
    "url": "others/algorithm/index.html",
    "revision": "d8915b06e749a24478d20e7dee95e8cc"
  },
  {
    "url": "others/algorithm/LeetCode/BackTrace/index.html",
    "revision": "d23a7ea7de7d9532e959196acf489da9"
  },
  {
    "url": "others/algorithm/LeetCode/BinarySearch/index.html",
    "revision": "f8bab9441129275d8fd2ee0cf1793e61"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/2021-1.html",
    "revision": "21b861f6eb59aca972bd2b8e89c36d6a"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/2021-2.html",
    "revision": "59586cb339f218ba5205b47a153ac480"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/2021-3.html",
    "revision": "bab79c82e6bfcfa0b562393dadd6b2c3"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/2021-4.html",
    "revision": "a0d26cdfe92b21883b57a432b27b6ce1"
  },
  {
    "url": "others/algorithm/LeetCode/Daily/index.html",
    "revision": "a6ab7b523bd3cdf73670bc67117f0130"
  },
  {
    "url": "others/algorithm/LeetCode/Divorce/index.html",
    "revision": "ed66a7b25e378679e0798c96db6e0a1f"
  },
  {
    "url": "others/algorithm/LeetCode/DynamicPlaning/index.html",
    "revision": "76ad8b02c414c7472764c3abdc78209f"
  },
  {
    "url": "others/algorithm/LeetCode/Greedy/index.html",
    "revision": "1e20ee147f086e0b3b0d19f6d22cea65"
  },
  {
    "url": "others/algorithm/LeetCode/index.html",
    "revision": "69f7ff2a9dd0a191129a860dc06edceb"
  },
  {
    "url": "others/algorithm/LeetCode/LinkedList/index.html",
    "revision": "50e3ab0a77f6dc09d3b55ad0cd83c32d"
  },
  {
    "url": "others/algorithm/LeetCode/Recursive/index.html",
    "revision": "6021212d8f74d932e17f8e93d2b65931"
  },
  {
    "url": "others/algorithm/LeetCode/Search/index.html",
    "revision": "191cd0c9d34b750ba2594ac69da2f954"
  },
  {
    "url": "others/algorithm/mode/index.html",
    "revision": "cee8c2e3053d1bc94188e8d0bec91de0"
  },
  {
    "url": "others/algorithm/search/index.html",
    "revision": "8dfcc67120f6895e324aadbedaa2bd3c"
  },
  {
    "url": "others/algorithm/sort/index.html",
    "revision": "711c0f61babf342d282e4a637d5e90ea"
  },
  {
    "url": "others/BigData/index.html",
    "revision": "0c2b3aefdbb1bb276590452e121b71b6"
  },
  {
    "url": "others/Bug/index.html",
    "revision": "06cc7adbb2235b5155f99d92d8d263b7"
  },
  {
    "url": "others/cloudcomputing/index.html",
    "revision": "e75861885ee9b921cedd2e8b18807af4"
  },
  {
    "url": "others/cs/compilers/index.html",
    "revision": "a1f59f9d3783aa5b1b5384327893139a"
  },
  {
    "url": "others/cs/encode&decode/Unicode.html",
    "revision": "688c8abb700638f9d99988fc6a25ebc1"
  },
  {
    "url": "others/cs/index.html",
    "revision": "9e641608543eda13687e0b9f80651491"
  },
  {
    "url": "others/datastructure/array/index.html",
    "revision": "899a88590de8663fcf21f7665b70041c"
  },
  {
    "url": "others/datastructure/graph/index.html",
    "revision": "401ef812f30d6aebbc2afa9b1a871621"
  },
  {
    "url": "others/datastructure/hash/index.html",
    "revision": "2fad544aa40561c5b2c2d850f73494a1"
  },
  {
    "url": "others/datastructure/index.html",
    "revision": "1495e1cab59e405e909739dfd77a0253"
  },
  {
    "url": "others/datastructure/list/index.html",
    "revision": "7d182c9de06d6e31413e10a2cca5a8f0"
  },
  {
    "url": "others/datastructure/map/index.html",
    "revision": "1135a3a9143a492ecddd74495c661a83"
  },
  {
    "url": "others/datastructure/queue/index.html",
    "revision": "8b21ef19aa296bd9f7c02730c171a5c3"
  },
  {
    "url": "others/datastructure/set/index.html",
    "revision": "e8af145f13393c2e55117fd5ffe81173"
  },
  {
    "url": "others/datastructure/stack/index.html",
    "revision": "2923014a4261d7d720e5c2755a649b6b"
  },
  {
    "url": "others/datastructure/tree/index.html",
    "revision": "28605698ea70c907b0680a9daf348c19"
  },
  {
    "url": "others/DesignPartten/index.html",
    "revision": "4f6a4459b3ce7f935532a8d9d0017c64"
  },
  {
    "url": "others/DesignPartten/singleton.html",
    "revision": "d52d61f703f3deab76b5b2b9d36ad7aa"
  },
  {
    "url": "others/devops/index.html",
    "revision": "3014e29763ae69adaf58b203f4fdfab5"
  },
  {
    "url": "others/devops/Jenkins.html",
    "revision": "fba24efa4e9d0058b5dba6372ce1cccd"
  },
  {
    "url": "others/git/index.html",
    "revision": "b386f7e54e044af7ba7676137a21d8de"
  },
  {
    "url": "others/index.html",
    "revision": "ae89ffd8f982ddbd692ba6b6aeb358e1"
  },
  {
    "url": "others/industrial/index.html",
    "revision": "1ced219931ef08e5fa2019c4b8ad1b16"
  },
  {
    "url": "others/interview/index.html",
    "revision": "3a24f5c584da0e3907b49a88906a7b4e"
  },
  {
    "url": "others/IoT/index.html",
    "revision": "73ef6fce4fe73aa33a45fd34cf4f8dad"
  },
  {
    "url": "others/leisure/aGlobalHostory.html",
    "revision": "c06844aa4182116ba96a8bcc2f6dc86c"
  },
  {
    "url": "others/leisure/index.html",
    "revision": "c35c64c829c7165ee1589241bac679f5"
  },
  {
    "url": "others/network/http/index.html",
    "revision": "4f50479e9d29ab209ee1773ee488b26f"
  },
  {
    "url": "others/network/http/WebProtocol.html",
    "revision": "2eb1cee74aa50a4cf7cbac7b047b0e92"
  },
  {
    "url": "others/network/index.html",
    "revision": "1efc2e21e0171a214afff956cfb8cee7"
  },
  {
    "url": "others/network/lessons/WebProtocolInDetail.html",
    "revision": "02ecfe9081eeca2af6ae01daf0c52f6d"
  },
  {
    "url": "others/network/socket/READMD.html",
    "revision": "f6916c797285259dd7bfb121c0387960"
  },
  {
    "url": "others/projects/index.html",
    "revision": "d992fa2844c5967ef2877518093a4498"
  },
  {
    "url": "others/system/index.html",
    "revision": "cb6c36d5c91a269e443304db53a9323d"
  },
  {
    "url": "others/system/Linux/index.html",
    "revision": "dbe2a46fce7f83f09b4daf49f78b8970"
  },
  {
    "url": "profile/index.html",
    "revision": "e42ba889cbe6b1cb2f93704acaa51663"
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

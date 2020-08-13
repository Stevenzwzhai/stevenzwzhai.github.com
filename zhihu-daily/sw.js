const cacheVersion = "v2";

const cacheList = [
	'./dist/build.js',
	'./dist/svg/Category.svg',
	'./dist/svg/add.svg',
	'./dist/svg/arrow.svg',
	'./dist/svg/download.svg',
	'./dist/svg/home.svg',
	'./dist/svg/more-x.svg',
	'./dist/svg/more-y.svg',
	'./dist/svg/notify.svg',
	'./dist/svg/star.svg',
	'./dist/svg/user.svg'
]

//install
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheVersion)
			.then(cache => cache.addAll(cacheList))
			.then(() => self.skipWaiting())
	)
})

//catch fetch
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			//有缓存则先取缓存
			if(response){
				return response;
			}
			//由于fetch请求的request和response都是stream所以多次使用要用副本
			let requestClone = event.request.clone();
			return fetch(requestClone).then(response => {
				//checking
				if(!response || response.status!==200|| response.type !== 'basic'){
					return response;
				}
				//response要用于缓存和渲染
				let responseClone = response.clone();

				caches.open(cacheVersion).then(cache => {
					cache.put(event.request, responseClone);
				})
				return response;
			})
		})
	)
})

//update
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.filter(cachename => {
						if(cacheList.includes(cachename)){
							return caches.delete(cachename);
						}
					})
				)
		}).then(() => {
			return self.clients.claim()
		})
	)
})
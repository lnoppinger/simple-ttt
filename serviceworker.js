self.addEventListener("install", (event) => {
    event.waitUntil( (async () => {
        let cache = await caches.open("static")
        cache.addAll([
            "/",
            "/style.css",
            "/script.js",
        ])
    })())
})

self.addEventListener("fetch", event => {
    event.respondWith( ( async () => {
        let res = await caches.match(event.request, {
            ignoreMethod: false,
            ignoreSearch: false,
            ignoreVary: true
        })

        if(res == null) res = await fetch(event.request)

        return res
    })() )
})
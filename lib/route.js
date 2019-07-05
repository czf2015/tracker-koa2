const routes = {
    [path]: handle,
}

export default function (req, res) {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase
    routes[path] // => handle
}
three-envmap-helper
=======
Quickly add an HDR IBL envMap to your materials in a scene.  envMap and code pulled from [threejs webgl hdr environment map example](https://threejs.org/examples/webgl_materials_envmaps_hdr.html)

### installation

    npm install --save three-envmap-helper

### usage 

    const envMapify = require('three-envmap-helper')(THREE)
    envMapify(scene, renderer)
    // Optionally, if you host the assets somewhere else
    envMapify(scene, renderer, '/public/path/to/assets/)

`envMapify` takes an optional third parameter identifying where the .hdr files live.  These files need to be accessible to the browser so if you need to copy them elsewhere to serve them, you'll put the path prefix as the third parameter.  
module.exports = function(THREE) {
	require('./HDRCubeTextureLoader')(THREE)
	require('./PMREMCubeUVPacker')(THREE)
	require('./PMREMGenerator')(THREE)
	require('./RGBELoader')(THREE)

	return function(scene, renderer, prefix) {
		var genCubeUrls = function( prefix, postfix ) {
			return [
				prefix + 'px' + postfix, prefix + 'nx' + postfix,
				prefix + 'py' + postfix, prefix + 'ny' + postfix,
				prefix + 'pz' + postfix, prefix + 'nz' + postfix
			];
		};
		if (!prefix) prefix ='/node_modules/three-envmap-helper/assets/'
		const postfix = '.hdr'
		var hdrUrls = genCubeUrls( prefix, postfix );
		new THREE.HDRCubeTextureLoader().load( THREE.UnsignedByteType, hdrUrls, function ( hdrCubeMap ) {
			var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
			pmremGenerator.update( renderer );

			var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
			pmremCubeUVPacker.update( renderer );

			const hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
			scene.traverse(m => {
				if (m.material) {
					m.material.envMap = hdrCubeRenderTarget.texture
					m.material.envMapIntensity = 1
					m.material.needsUpdate = true
				}
			})
		});
	}
}


function setup3D() {
    // Core setup - don't modify unless you know what you're doing
    div3D = document.getElementById("div3D");
    
    scene3D = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 0.1, 10000);
    camera3D.up = new THREE.Vector3(0, 0, 1);
    camera3D.lookAt(new THREE.Vector3(250, 250, 0));
    camera3D.position.set(-30, -150, 225);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    div3D.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    controls = new THREE.OrbitControls(camera3D, renderer.domElement);
    controls.addEventListener("change", render3D);

    // Add stuff to scene3d and other three.js setup.

    ambientlight=new THREE.AmbientLight(0xffffff, 0.4);
    scene3D.add(ambientlight);
    light=new THREE.DirectionalLight(0xffffff);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0);

    var t=100;
    light.shadow.camera.bottom=-t;
    light.shadow.camera.left=-t;
    light.shadow.camera.top=t;
    light.shadow.camera.right=t;

    light.shadow.mapSize.width=10000;
    light.shadow.mapSize.height=10000;

    light.castShadow=true;
    scene3D.add(light);

    var l2=new THREE.PointLight(0xffffff);
    l2.position.set(-100,-100,100);
    scene3D.add(l2);

}



function draw3D() {
    for (var i = 0; i < meshArr.length; i++) {
        try{
            meshArr[i].geometry.dispose();
            meshArr[i].material.dispose();
        }
        catch(e){}
        scene3D.remove(meshArr[i]);
        delete meshArr[i];
    }
    meshArr = [];
    var axes = new THREE.AxesHelper(45);
    scene3D.add(axes);
    if (_BEList.length > 0) {
        for (var i = 0; i < _BEList.length; i++) {
            var retlist = _BEList[i].draw3D();
            if (retlist != undefined ) {
            for (var j = 0; j < retlist.length; j++) {
                meshArr.push(retlist[j]);
            }
        }

        }
    }

    for (var i = 0; i < meshArr.length; i++) {
        scene3D.add(meshArr[i]);
    }

    onWindowResize3D();
    render3D();
}


function onWindowResize3D() {
    camera3D.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    camera3D.updateProjectionMatrix();
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function render3D() {
    if (!renderer || !scene3D || !camera3D) return;
    renderer.render(scene3D, camera3D);
}

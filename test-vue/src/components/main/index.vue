<template>
    <div class="main">
        <div id="header_wrap" class="outer">
            <header class="inner">
              <div class="header-icon">
                <div>
                    <img src="../../assets/images/wolf.jpeg"/>
                    <transition name="slideRight">
                        <h3 v-if="showName">故园苒苒</h3>
                    </transition>
                </div>
                <div class="message">
                    <transition name="fadeDown">
                        <div class="message-container">
                            <p v-if="follow">follow me</p>
                            <span class="icon github" @click="go('github')"></span>
                            <span class="icon cnblog" @click="go('cnblog')"></span>
                            <span class="icon jianshu" @click="go('jianshu')"></span>
                        </div>
                    </transition>
                </div>
              </div>
              <!-- <a id="forkme_banner" href="https://github.com/Stevenzwzhai">View on GitHub</a>

              <h1 id="project_title">Stevenzwzhai.GitHub.com</h1>
              <h2 id="project_tagline"></h2> -->

            </header>
        </div>
        <div class="section" id="container"></div>
        <div ref="img"></div>
    </div>
</template>
<script type="text/javascript">
    import * as THREE from "three";
    export default {
        name: 'main-page',
        data () {
            return {
                showName: false,
                follow: false,
                img1: require('../../assets/images/cube/px.jpg'),
                img2: require('../../assets/images/cube/nx.jpg'),
                img3: require('../../assets/images/cube/py.jpg'),
                img4: require('../../assets/images/cube/ny.jpg'),
                img5: require('../../assets/images/cube/pz.jpg'),
                img6: require('../../assets/images/cube/nz.jpg'),
            }
        },
        mounted () {
            this.showName = true;
            setTimeout(() => {
                this.follow = true;
            }, 500)
            this.createBall();
        },
        methods: {
            go (type) {
                switch (type) {
                    case 'github': location.href = "https://github.com/Stevenzwzhai";
                    break;
                    case 'cnblog': location.href = "http://www.cnblogs.com/Upton/";
                    break;
                    case 'jianshu': location.href = "https://www.jianshu.com/u/d9eb11eb4b14";
                    break;
                    default: location.reload();
                }
            },
            createBall () {
                var self = this;
                var camera, scene, renderer;
            var texture_placeholder,
            isUserInteracting = false,
            onMouseDownMouseX = 0, onMouseDownMouseY = 0,
            lon = 90, onMouseDownLon = 0,
            lat = 0, onMouseDownLat = 0,
            phi = 0, theta = 0,
            target = new THREE.Vector3(),
            onPointerDownPointerX,onPointerDownPointerY,onPointerDownLon,onPointerDownLat;
            init();
            animate();
            function init() {
                var container, mesh,isUserInteracting;
                container = document.getElementById( 'container' );
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
                scene = new THREE.Scene();
                texture_placeholder = document.createElement( 'canvas' );
                texture_placeholder.width = 128;
                texture_placeholder.height = 128;
                var context = texture_placeholder.getContext( '2d' );
                context.fillStyle = 'rgb( 200, 200, 200 )';
                context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
                var materials = [
                    loadTexture( self.img1 ), // right
                    loadTexture( self.img2 ), // left
                    loadTexture( self.img3 ), // top
                    loadTexture( self.img4 ), // bottom
                    loadTexture( self.img5 ), // back
                    loadTexture( self.img6 ) // front
                ];
                console.log(materials)
                var geometry = new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 );
                geometry.scale( - 1, 1, 1 );
                mesh = new THREE.Mesh( geometry, materials );
                scene.add( mesh );
                for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {
                    var vertex = mesh.geometry.vertices[ i ];
                    vertex.normalize();
                    vertex.multiplyScalar( 550 );
                }
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight-100 );
                container.appendChild( renderer.domElement );
                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'wheel', onDocumentMouseWheel, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );
                //
                window.addEventListener( 'resize', onWindowResize, false );
            }
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }
            function loadTexture( path ) {
                var texture = new THREE.Texture( texture_placeholder );
                var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
                var image = new Image();
                image.src = path;
                image.onload = function () {
                    console.log(213)
                    texture.image = this;
                    texture.needsUpdate = true;
                };
                return material;
            }
            function onDocumentMouseDown( event ) {
                event.preventDefault();
                isUserInteracting = true;
                onPointerDownPointerX = event.clientX;
                onPointerDownPointerY = event.clientY;
                onPointerDownLon = lon;
                onPointerDownLat = lat;
            }
            function onDocumentMouseMove( event ) {
                if ( isUserInteracting === true ) {
                    lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
                    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
                }
            }
            function onDocumentMouseUp( event ) {
                isUserInteracting = false;
            }
            function onDocumentMouseWheel( event ) {
                var fov = camera.fov + event.deltaY * 0.05;
                camera.fov = THREE.Math.clamp( fov, 10, 75 );
                camera.updateProjectionMatrix();
            }
            function onDocumentTouchStart( event ) {
                if ( event.touches.length == 1 ) {
                    event.preventDefault();
                    onPointerDownPointerX = event.touches[ 0 ].pageX;
                    onPointerDownPointerY = event.touches[ 0 ].pageY;
                    onPointerDownLon = lon;
                    onPointerDownLat = lat;
                }
            }
            function onDocumentTouchMove( event ) {
                if ( event.touches.length == 1 ) {
                    event.preventDefault();
                    lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
                    lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
                }
            }
            function animate() {
                requestAnimationFrame( animate );
                update();
            }
            function update() {
                if ( isUserInteracting === false ) {
                    lon += 0.1;
                }
                lat = Math.max( - 85, Math.min( 85, lat ) );
                phi = THREE.Math.degToRad( 90 - lat );
                theta = THREE.Math.degToRad( lon );
                target.x = 500 * Math.sin( phi ) * Math.cos( theta );
                target.y = 500 * Math.cos( phi );
                target.z = 500 * Math.sin( phi ) * Math.sin( theta );
                camera.position.copy( target ).negate();
                camera.lookAt( target );
                renderer.render( scene, camera );
            }
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .main{
        .header-icon{
            display:flex;
            align-items: center;
            justify-content:space-between;
            width:100%;
            div:first-child{
                display:flex;
                align-items: center;
                h3{
                    display:inline-block;
                }
            }
            p{
                margin-left:15px;
                font-size:24px;
                font-weight:bolder;
                &:after{
                    content:'';
                    display: inline-block;
                    clear: both;
                }
            }
            .icon{
                height:36px;
                width: 36px;
                border-radius:36px;
                background-size:32px;
                background-repeat: no-repeat;
                background-position: center;
                margin-left:15px;
                cursor:pointer;
            }
            .github{
                background-image: url(../../assets/images/github.svg);
            }
            .cnblog{
                background-image: url(../../assets/images/cnblogs.svg);
            }
            .jianshu{
                background-image: url(../../assets/images/jianshu.svg);
            }
            .message{
                min-width:300px;
                height:100px;
                display: flex;
                justify-content: flex-end;
                align-items:center;
            }
            .message-container{
                margin-right:20px;
            }

        }
        .header-icon img{
            height:64px;
            width: 64px;
            border-radius: 64px;
            border:0;
            animation: wave 2s ease infinite;
            margin-left:50px;
        }
        @keyframes wave{
            0%{
              box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 0.8);
              border:0;
            }
            50%{
              box-shadow: 0px 0px 5px 5px rgba(255, 255, 255, 0.6);
              border:0;
            }
            100%{
              box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 0.8);
              border:0;
            }
        }
        .header-icon h3{
            margin-left: 15px;
        }
    }
</style>
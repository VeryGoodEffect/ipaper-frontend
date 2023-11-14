<template>
    <div v-if="visible" ref="canvasContainer" class="container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { render } from 'vue';
  import * as GUI from 'dat.gui';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  export default {
    mounted() {
        this.initThree()
    },
    methods: {
        init() {
            //定义容器，创建场景、相机和渲染器
            const container = this.$refs.canvasContainer
            let clientWidth = container.clientWidth
            let clientHeight = container.clientHeight
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, this.clientWidth / clientHeight, 0.1, 1000)
            camera.position.z = 20//设置相机深度
            scene.add(new THREE.AxesHelper(10));//坐标轴显示辅助
            scene.add(camera)//加入摄像机到场景
            const renderer = new THREE.WebGLRenderer({ alpha: true })
            renderer.setClearAlpha(0)//设置场景不透明度为0
            renderer.setSize(clientWidth, clientHeight)
            container.appendChild(renderer.domElement)//加入渲染器dom节点
  
  
            const simpleGeometries = []
  
            function createGeometries() {
                const geometry = new THREE.BoxGeometry(10, 10, 10)
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  
                for (let i = 0; i < 10; i++) {
                    const cube = new THREE.Mesh(geometry, material);
                    cube.scale.set(1, 1, 1);
                    cube.position.set(0, 0, 0);
                    simpleGeometries.push(cube);
                    scene.add(cube);
                }
                camera.lookAt(simpleGeometries[0].position.x, simpleGeometries[0].position.y, simpleGeometries[0].position.z)
            }
  
            function createLights() {
                const spotLight = new THREE.SpotLight("white", 0.5)
                spotLight.angle = Math.PI / 2
                spotLight.position.set(0, 0, 5)
                spotLight.penumbra = 5
                spotLight.decay = 2
                spotLight.target.position.set(0, 0, 0)
                scene.add(spotLight.target);//spotLight.target添加到场景中.target.position才会起作用
                scene.add(spotLight);//光源添加到场景中
  
            }
  
            function animate() {
                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }
            createGeometries()
            createLights()
            animate()
        },
        initThree() {
            const colorMode = 'white'
            // .control = new OrbitControls(this.camera, this.renderer.domElement);
            const gui = new GUI.GUI();
  
            //改变交互界面style属性
            gui.domElement.style.right = '0px';
            gui.domElement.style.width = '300px';
            const options = {
              message: 'dat.gui',
              speed: 0.8,
              displayOutline: false,
              button: function () {}
            }
            gui.add(options, 'message')
            gui.add(options, 'speed', -5, 5)
            gui.add(options, 'displayOutline')
            gui.add(options, 'button')
            
  
            
            // 获取容器元素
            const container = this.$refs.canvasContainer;
            //获取props并监听变化
            let elementColor = this.elementColor
            setInterval(() => {
                elementColor = this.elementColor
            }, 1000)
            // 创建场景
            const scene = new THREE.Scene();
            // scene.add(new THREE.AxesHelper(10)); // 添加坐标轴辅助线
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 5
            scene.add(camera);
            //创建聚光源1
            const spotLight1 = new THREE.SpotLight(elementColor, 0.5);// 1.0：光照强度intensity
            spotLight1.angle = Math.PI / 2;//发散角度,光锥角度的二分之一
            spotLight1.position.set(-2, 3, 0);// 设置聚光光源位置
            spotLight1.penumbra = 5; // 设置聚光灯的边缘柔化
            spotLight1.decay = 2; // 设置聚光灯的衰减
            spotLight1.target.position.set(0, 0, 0);// spotLight.target是一个模型对象Object3D，默认在坐标原点
            scene.add(spotLight1.target);//spotLight.target添加到场景中.target.position才会起作用
            scene.add(spotLight1);//光源添加到场景中
            //创建聚光源2
            const spotLight2 = new THREE.SpotLight(elementColor, 0.5);// 1.0：光照强度intensity
            spotLight2.angle = Math.PI / 2;//发散角度,光锥角度的二分之一
            spotLight2.position.set(2, 3, 0);// 设置聚光光源位置
            spotLight2.penumbra = 5; // 设置聚光灯的边缘柔化
            spotLight2.decay = 2; // 设置聚光灯的衰减
            spotLight2.target.position.set(0, 0, 0);// spotLight.target是一个模型对象Object3D，默认在坐标原点
            scene.add(spotLight2.target);//spotLight.target添加到场景中.target.position才会起作用
            scene.add(spotLight2);//光源添加到场景中
  
            //创建聚光源3
            const spotLight3 = new THREE.SpotLight(elementColor, 0.4);// 1.0：光照强度intensity
            spotLight3.angle = Math.PI / 2.5;//发散角度,光锥角度的二分之一
            spotLight3.position.set(0, -2, 0);// 设置聚光光源位置
            spotLight3.penumbra = 5; // 设置聚光灯的边缘柔化
            spotLight3.decay = 2; // 设置聚光灯的衰减
            spotLight3.target.position.set(0, 0, 0);// spotLight.target是一个模型对象Object3D，默认在坐标原点
            scene.add(spotLight3.target);//spotLight.target添加到场景中.target.position才会起作用
            scene.add(spotLight3);//光源添加到场景中
            // 聚光源辅助对象，可视化聚光源
            // const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 0x123456)
            // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0x345612)
            // const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 0x561234)
            // scene.add(spotLightHelper1, spotLightHelper2, spotLightHelper3);
  
            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearAlpha(0);//设置场景的背景为透明
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);
            
            const control = new OrbitControls(camera, renderer.domElement);
  
            // 保存相关对象以便后续更新
            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;
  
  
            //以下是渲染元素处理
  
            //渲染正四面体
            class animateTetrahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.3
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.TetrahedronGeometry(this.Size);
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染正方体
            class animateCube {
                rand = Math.random()
                Size = [this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3]
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size[0])))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.BoxGeometry(this.Size[0], this.Size[1], this.Size[2]);
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = [this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3]
                    this.Speed = (1 / (100 * (this.Size[0])))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.BoxGeometry(this.Size[0], this.Size[1], this.Size[2]);
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染正八面体.普通八面体太麻烦了
            class animateOctahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.3
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.OctahedronGeometry(this.Size)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
  
                }
            }
            //渲染正二十面体
            class animateIcosahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.2
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.IcosahedronGeometry(this.Size)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.2
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染六芒星
            class animateHexagram {
                rand = Math.random()
                Scale = this.rand * 0.1 + 0.1
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置四棱锥形状.具体的scale不在这里设置
                geometry = new THREE.ConeGeometry(1, 2, 4, 1, true)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                //整个六芒星
                element = new THREE.Group()
  
                constructor() {
                    //首先生成六个芒并平移到正确的位置
                    for (let i = 0; i < 6; i++) {
                        const pyramid = new THREE.Mesh(this.geometry, this.material);
                        const container = new THREE.Group()
                        //统一先向上平移
                        pyramid.translateY(Math.sqrt(Math.E))
                        pyramid.rotateY(Math.PI / 4)
                        //然后加入容器
                        container.add(pyramid)
                        //然后对容器进行旋转(围绕原点)
                        switch (i) {
                            //六个面
                            case 0:
                                break
                            case 1:
                                container.rotateX(-Math.PI / 2)
                                break
                            case 2:
                                container.rotateX(Math.PI)
                                break
                            case 3:
                                container.rotateZ(Math.PI / 2)
                                break
                            case 4:
                                container.rotateZ(-Math.PI / 2)
                                break
                            case 5:
                                container.rotateX(Math.PI / 2)
                                break;
                            default:
                                break
                        }
                        //加入"group"
                        this.element.add(container)
                    }
                    //设置随机的缩放
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.02;
                    this.element.rotation.y += 0.02;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //移除旧方块
                    // scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Scale = this.rand * 0.1 + 0.1
                    this.Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状,材质就不更新了
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染音符。默认八分和四分
            class animateNote {
                rand = Math.random()
                Scale = this.rand * 0.3 + 0.2
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //创建椭球体的方法。半径为x,y,z
                EllipsoidGeometry = (x, y, z) => {
                    const ellipsoidGeometry = new THREE.SphereGeometry(1, 7, 7);
                    const positionAttribute = ellipsoidGeometry.getAttribute('position');
  
                    for (let i = 0; i < positionAttribute.count; i++) {
                        const vertex = new THREE.Vector3();
                        vertex.fromBufferAttribute(positionAttribute, i);
                        vertex.x *= x;
                        vertex.y *= y;
                        vertex.z *= z;
                        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
                    }
                    return ellipsoidGeometry;
                }
                //设置音符的三种模型的形状.具体的scale不在这里设置
                geometries = [
                    this.EllipsoidGeometry(0.4, 0.2, 0.2),//底部椭球
                    new THREE.CylinderGeometry(0.08, 0.08, 1.5, 3, 1, true),//长杆
                    new THREE.CylinderGeometry(0.05, 0.12, 0.8, 8, 1, true)]//短杆
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2,
                });
                //整个音符
                element = new THREE.Group()
  
                // type为1是八分音符，否则为四分音符
                constructor(type) {
                    //生成椭球、长杆和短杆
                    const Ellipsoid = new THREE.Mesh(this.geometries[0], this.material)
                    const longCylinder = new THREE.Mesh(this.geometries[1], this.material)
  
                    //调节位置
                    Ellipsoid.translateY(-0.5)
                    longCylinder.translateX(0.3)
                    longCylinder.translateY(0.3)
                    if (type === 1) {
                        const shortCylinder = new THREE.Mesh(this.geometries[2], this.material)
                        shortCylinder.translateX(0.5)
                        shortCylinder.translateY(0.8)
                        shortCylinder.rotateZ(Math.PI / 5)
                        this.element.add(shortCylinder)
                    }
                    //加入"group"
                    this.element.add(Ellipsoid, longCylinder)
  
                    //设置随机的缩放
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
  
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.02;
                    this.element.rotation.y += 0.02;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Scale = this.rand * 0.3 + 0.2
                    this.Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状,材质就不更新了
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染夜间星星
            class animateStar {
                //屏幕上随机生成位置
                Position = [Math.random() * 12 - 6, Math.random() * 20 - 10]
                rand = Math.random()
                Size = this.rand / 5 + 0.1
                maxOpacity = Math.random() + 0.6//最大不透明度
                Opacity = []//透明度连续变化
                iterateCount = Math.random() * 200 + 100//随机化不透明度迭代次数
                Count = 0//遍历Opacity数组
                geometry = new THREE.CircleGeometry(this.Size, 3)
                //设置材质.就白色的吧，其他颜色不是很明显
                material = new THREE.MeshBasicMaterial({
                    color: 'rgb(240,240,240)',
                    transparent: true,
                    opacity: 0
                })
                element = new THREE.Mesh(this.geometry, this.material)
                constructor() {
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = 0
                    this.element.rotation.z = Math.random() * Math.PI / 3//随机化旋转角度
                    //设置透明度连续变化,可见时间:不可见时间=3:7
                    for (let i = 0; i < this.iterateCount; i++) {
                        if (i < this.iterateCount * 0.1) {
                            this.Opacity.push(i / this.iterateCount * 0.1) * this.maxOpacity;
                        }
                        else if (this.iterateCount * 0.1 <= i <= this.iterateCount * 0.3) {
                            this.Opacity.push((this.iterateCount * 0.3 - i) / this.iterateCount * 0.2) * this.maxOpacity;
                        }
                        else {
                            this.Opacity.push(0);
                        }
                    }
                    //随机化闪烁时间
                    setInterval(() => scene.add(this.element), Math.random() * 5000)
                }
                update = () => {
                    if (colorMode.value === 'white') {
                        scene.remove(this.element)
                        this.Count = 0;
                        this.element.opacity = 0;
                        return;
                    }
                    else {
                        scene.add(this.element)
                        //在update中进行不透明度循环
                        this.element.material.opacity = this.Opacity[this.Count];
                        this.Count++;
                        if (this.Count >= this.iterateCount) {
                            this.Count = 0
                            this.reset()
                        }
                    }
                }
                //重置方法，
                reset = () => {
  
                    scene.remove(this.element)
                    //更新位置和大小
                    this.Position = [Math.random() * 12 - 6, Math.random() * 20 - 10]
                    this.rand = Math.random()
                    this.Size = this.rand / 5 + 0.1
                    this.geometry = new THREE.CircleGeometry(this.Size, 3)
                    this.element.geometry = this.geometry
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = 0
                    this.element.rotation.z = Math.random() * Math.PI / 3//随机化旋转角度
                    //更新随机化不透明度和持续时间
                    this.maxOpacity = Math.random() + 0.6//最大不透明度
                    this.iterateCount = Math.random() * 200 + 100//随机化不透明度迭代次数
                    this.Opacity = []//清空不透明度变化数组
                    for (let i = 0; i < this.iterateCount; i++) {
                        if (i < this.iterateCount * 0.1) {
                            this.Opacity.push(i / this.iterateCount * 0.1) * this.maxOpacity;
                        }
                        else if (this.iterateCount * 0.1 <= i <= this.iterateCount * 0.3) {
                            this.Opacity.push((this.iterateCount * 0.3 - i) / this.iterateCount * 0.2) * this.maxOpacity;
                        }
                        else {
                            this.Opacity.push(0);
                        }
                    }
                    //随机化闪烁时间
                    setInterval(() => scene.add(this.element), Math.random() * 5000)
                }
            }
            //渲染rashinban.只有旋转运动
            class animateRashinban {
                //整个lashinbang
                element = new THREE.Group()
                //材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                middleMaterial = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    emissive: '#888',
                    transparent: true,
                    opacity: 0.5
                });
  
                //中心
                Center = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), this.material)
                //圆环1
                Torus1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 3, 36), this.material)
                //圆环2
                Torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.015, 3, 60), this.material)
                //圆环3
                Torus3 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.015, 3, 60), this.material)
                constructor(type) {
                    //位置调整
                    this.Torus2.rotation.y = Math.PI / 2
                    this.Torus3.rotation.x = Math.PI / 2
                    // this.element.add(this.Sphere)
                    this.element.add(this.Torus1)
                    this.element.add(this.Torus2)
                    this.element.add(this.Torus3)
                    this.element.add(this.Center)
                    //加入场景
                    this.element.position.x = 0
                    this.element.position.y = 0.5
                    this.element.position.z = 0
                    this.element.scale.set(2.5, 2.5, 2.5)
                    scene.add(this.element);
                }
  
                update = () => {
                    //以下是针对单个物体的操作
                    //白天和黑夜模式旋转相反
                    if (colorMode.value === 'white') {
                        //整体旋转
                        this.element.rotation.y += 0.003;
                        //圆环1旋转
                        this.Torus1.rotation.x += 0.002;
                        this.Torus1.rotation.y += 0.004;
                        //圆环2旋转
                        this.Torus2.rotation.y -= 0.02;
                        this.Torus2.rotation.x -= 0.02;
                        //圆环3旋转
                        this.Torus3.rotation.y += 0.02;
                        this.Torus3.rotation.x += 0.02;
                        //中心旋转
                        this.Center.rotation.y += 0.01;
                        this.Center.rotation.x -= 0.01;
                    }
                    else {
                        //整体旋转
                        this.element.rotation.y -= 0.003;
                        //圆环1旋转
                        this.Torus1.rotation.x -= 0.002;
                        this.Torus1.rotation.y -= 0.004;
                        //圆环2旋转
                        this.Torus2.rotation.y += 0.02;
                        this.Torus2.rotation.x += 0.02;
                        //圆环3旋转
                        this.Torus3.rotation.y -= 0.02;
                        this.Torus3.rotation.x -= 0.02;
                        //中心旋转
                        this.Center.rotation.y -= 0.01;
                        this.Center.rotation.x += 0.01;
                    }
                }
            }
            let Tetrahedrons = []//管理正四面体
            let Cubes = []//管理正方体
            let Octahedrons = []//管理正八面体
            let Icosahedrons = []//管理正二十面体
            let Stars = []//管理星星
            let Hexagrams = []//管理六芒星
            let Notes = []
            let Rashinban = new animateRashinban()
  
  
            //添加组件
            for (let i = 0; i < 2; i++) {
                Tetrahedrons.push(new animateTetrahedron())
                Cubes.push(new animateCube())
                Octahedrons.push(new animateOctahedron())
                Icosahedrons.push(new animateIcosahedron())
                Hexagrams.push(new animateHexagram())
                Notes.push(new animateNote(1))
                Notes.push(new animateNote(0))
            }
            for (let i = 0; i < 200; i++) {
                Stars.push(new animateStar())
            }
            // 渲染循环
            function update() {
                Tetrahedrons.forEach((tetrahedron) => {
                    tetrahedron.update()
                })
                Cubes.forEach((cube) => {
                    cube.update()
                })
                Octahedrons.forEach((octahedron) => {
                    octahedron.update()
                })
                Icosahedrons.forEach((icosahedron) => {
                    icosahedron.update()
                })
                Hexagrams.forEach((hexagram) => {
                    hexagram.update()
                })
                if (colorMode.value === 'black') {
                    Stars.forEach((star) => {
                        star.update()
                    })
                }
                Notes.forEach((note) => {
                    note.update()
                })
                Rashinban.update()
                //渲染摄像机
                renderer.render(scene, camera);
                //请求渲染动画帧
                requestAnimationFrame(update);
            }
            update()
        },
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        progress: {
            type: Number,
            required: true,
            validator: (value) => {
                if (0 < value && value < 100) {
                    return true
                }
                console.log("进度无效,必须介于0-100之间")
                return false
            }
        }
    }
  }
  </script>
  
  <style>
  .container {
    background: white;
    height: 1000px;
    aspect-ratio: 1;
  }
  </style>
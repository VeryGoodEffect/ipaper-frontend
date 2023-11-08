<template>
    <div class="wrapper">
        <div v-if="visible" ref="canvasContainer" class="container" :style="{
            'opacity': progress === 100 ? '0' : '1'
        }">
        </div>
        <div class="progress">{{ progress }}%</div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { render } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default {
    mounted() {
        this.initThree()
    },
    methods: {
        initThree() {
            // 获取容器元素
            const container = this.$refs.canvasContainer;
            // 创建场景
            const scene = new THREE.Scene();
            // scene.add(new THREE.AxesHelper(10)); // 添加坐标轴辅助线
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 10
            scene.add(camera);
            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearAlpha(0);//设置场景的背景为透明
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            class animateScene {
                scene = undefined
                elements = []
                lights = []
                constructor() {
                    const loader = new GLTFLoader()
                    loader.load('/public/3d models/loading-bar.gltf', (gltf) => {
                        this.scene = gltf.scene
                        scene.add(this.scene)//将模型加入场景
                        //将灯光和网格数据分类
                        gltf.scene.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                this.elements.push(child)
                            } else if (child instanceof THREE.Light) {
                                this.lights.push(child)
                            }
                        })
                        //为每个网格初始化
                        this.elements.forEach((ele) => {
                            //初始化周期
                            ele.userData.floatPeriod = this.getRandomPeriod(2, 6)
                            ele.userData.floatClock = new THREE.Clock()
                            //设置旋转方向和旋转速度
                            ele.userData.rotationAxis = new THREE.Vector3(Math.random(), Math.random(), Math.random())
                            ele.userData.rotationSpeed = this.getRandomPeriod(0.003, 0.01)
                            //设置初始悬浮方向
                            ele.userData.floatDirection = Math.random() - 0.5 >= 0 ? true : false
                        })
                    })
                }
                getRandomPeriod = (min, max) =>
                    Math.random() * (max - min) + min
                //实现悬浮效果
                updateWavingAnimation = (ele) => {
                    const elapsedTime = ele.userData.floatClock.getElapsedTime()
                    const t = (Math.sin(elapsedTime / ele.userData.floatPeriod * Math.PI * 2) + 1) / 2
                    //计算当前y轴位置
                    if (ele.userData.floatDirection === true) {
                        ele.position.y += THREE.MathUtils.lerp(-1, 1, t) / 200
                    }
                    else {
                        ele.position.y -= THREE.MathUtils.lerp(-1, 1, t) / 200
                    }
                }
                //实现旋转效果
                updateRotationAnimation = (ele) => {
                    ele.rotation.x += ele.userData.rotationAxis.x * ele.userData.rotationSpeed
                    ele.rotation.y += ele.userData.rotationAxis.y * ele.userData.rotationSpeed
                    ele.rotation.z += ele.userData.rotationAxis.z * ele.userData.rotationSpeed
                }
                //获取当前颜色
                getCurrentColor = (progress) => {
                    //初始化颜色
                    const colorString = getComputedStyle(document.documentElement).getPropertyValue('--theme-color')
                    const colorArray = colorString.match(/\d+(\.\d+)?/g).map(Number)
                    //前三个数字分别为RGB
                    const RGBAverage = (colorArray[0] + colorArray[1] + colorArray[2]) / 3
                    const k1 = progress / 100
                    const k2 = 1 - k1
                    const currentColorArray =
                        [colorArray[0] * k1 + RGBAverage * k2,
                        colorArray[1] * k1 + RGBAverage * k2,
                        colorArray[2] * k1 + RGBAverage * k2]
                    return new THREE.Color(currentColorArray[0] / 255, currentColorArray[1] / 255, currentColorArray[2] / 255)
                }
                //更新当前状态,要传入当前的进度
                update = (progress) => {
                    const color = this.getCurrentColor(progress)
                    this.elements.forEach((ele) => {
                        if (ele.name !== 'center_ball') {
                            this.updateWavingAnimation(ele)
                        }
                        this.updateRotationAnimation(ele)
                        ele.material.color = color
                    })
                    if (this.scene !== undefined) {
                        const percentage = progress / 40
                        const base = 0.2
                        const rate = base + percentage
                        if (progress < 100) {
                            this.scene.scale.set(rate, rate, rate)
                        }
                        else {
                            this.scene.scale.x += 0.1
                            this.scene.scale.y += 0.1
                            this.scene.scale.z += 0.1
                        }
                    }
                }
            }

            //以下是渲染元素处理
            let test = new animateScene()
            // 渲染循环
            let update = () => {
                test.update(this.progress)
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
    border-radius: 50%;
    margin: 0 auto;
    height: 300px;
    aspect-ratio: 1;
    overflow: hidden;
    transition: all ease-out 0.3s;
    border: var(--theme-color) solid 10px;
}

.progress {
    text-align: center;
    color: var(--theme-color)
}

.wrapper {
    position: relative;
}
</style>
<template>
    <div class="wrapper">
        <div v-if="visible" ref="canvasContainer" class="container" :style="{
            'opacity': progress >= 100 ? '0' : '1'
        }">
        </div>
        <div class="progress">{{ progress }}%</div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { render } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as GUI from 'dat.gui'

export default {
    mounted() {
        this.initThree()
    },
    methods: {
        initThree() {
            //可视化参数
            const gui = new GUI.GUI()
            const options = {
                option1: this.localProgress,
                option2: "abc"
            }
            gui.add(options, "option1")
            gui.add(options, "option2")
            gui.domElement.style.right = '0px'
            gui.domElement.style.width = "200px"
            // 获取容器元素
            const container = this.$refs.canvasContainer;
            // 创建场景
            const scene = new THREE.Scene();
            // scene.add(new THREE.AxesHelper(10)); // 添加坐标轴辅助线
            // 创建相机
            const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 20
            scene.add(camera);
            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearAlpha(0);//设置场景的背景为透明
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            //获取当前颜色
            let getCurrentColor = (progress) => {
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
                //更新当前状态,要传入当前的进度
                update = (progress) => {
                    const color = getCurrentColor(progress)
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
                            this.scene.rotation.y += 0.01
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
                let currentColor = getCurrentColor(this.localProgress)
                test.update(this.localProgress)
                //渲染摄像机
                renderer.render(scene, camera);
                //请求渲染动画帧
                requestAnimationFrame(update);
                //更改背景颜色
                container.style.backgroundColor = `rgba(${currentColor.r*255},${currentColor.g*255},${currentColor.b*255},${this.localProgress/100})`
            }
            update()
        },
    },
    data() {
        return {
            localProgress: 0
        }
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
    },
    watch: {
        progress() {
            let transitioner = () => {
                console.log(this.localProgress)
                if (this.localProgress < this.progress) {
                    this.localProgress += (this.progress - this.localProgress) / 100
                }
                else {
                    clearInterval(transitioner)
                }
            }
            setInterval(transitioner, 1)
        }
    }

}
</script>

<style scoped>
.container {
    /* border-radius: 50%; */
    margin: 0 auto;
    height: 800px;
    width: 100%;
    /* aspect-ratio: 1; */
    overflow: hidden;
    transition: all ease-out 0.3s;
    /* border: var(--theme-color) solid 10px; */
}

.progress {
    text-align: center;
    color: var(--theme-color)
}

.wrapper {
    position: relative;
}
</style>
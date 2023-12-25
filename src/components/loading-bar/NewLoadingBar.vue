<template>
    <div ref="container" class="loading-container"
        :class="{ 'open': display, 'loading-close-slow': slowClose, 'animated-end': slowClose }">
        <div class="letters-container" :class="{}">
            <span>
                <span class="letter-parent i" ref="parentI">i</span>
                <span class="letter-child i" :class="{ 'animated': localProgress >= (100 / 6) * 1 }" ref="childI">i</span>
            </span>
            <span>
                <span class="letter-parent p1" ref="parentP1">P</span>
                <span class="letter-child p1" :class="{ 'animated': localProgress >= (100 / 6) * 2 }" ref="childP1">P</span>
            </span>
            <span>
                <span class="letter-parent a" ref="parentA">a</span>
                <span class="letter-child a" :class="{ 'animated': localProgress >= (100 / 6) * 3 }" ref="childA">a</span>
            </span>
            <span>
                <span class="letter-parent p2" ref="parentP2">p</span>
                <span class="letter-child p2" :class="{ 'animated': localProgress >= (100 / 6) * 4 }" ref="childP2">p</span>
            </span>

            <span>
                <span class="letter-parent e" ref="parentE">e</span>
                <span class="letter-child e" :class="{ 'animated': localProgress >= (100 / 6) * 5 }" ref="childE">e</span>
            </span>
            <span>
                <span class="letter-parent r" ref="parentR">r</span>
                <span class="letter-child r" :class="{ 'animated': localProgress >= (100 / 6) * 6 }" ref="childR">r</span>
            </span>
        </div>
        <!-- <div>{{ localProgress }}</div> -->
    </div>
</template>

<script>
export default {
    name: 'NewLoadingBar',
    data() {
        return {
            slowClose: false,
            localProgress: 0
        }
    },
    props: {
        //是否跳过加载完成后的动画
        accelerate:
        {
            type: Boolean,
            default: false
        },
        //是否具有真加载进度
        isReal: {
            type: Boolean,
            default: true
        },
        display: {
            type: Boolean,
            required: true,
        },
        progress: {
            type: Number,
            required: true,
            validator(value) {
                return value >= 0 && value <= 100
            }
        }
    },
    watch: {
        localProgress(value) {
            const parentI = this.$refs.parentI
            const parentP1 = this.$refs.parentP1
            const parentA = this.$refs.parentA
            const parentP2 = this.$refs.parentP2
            const parentE = this.$refs.parentE
            const parentR = this.$refs.parentR

            const childI = this.$refs.childI
            const childP1 = this.$refs.childP1
            const childA = this.$refs.childA
            const childP2 = this.$refs.childP2
            const childE = this.$refs.childE
            const childR = this.$refs.childR

            const parents = [parentI, parentP1, parentA, parentP2, parentE, parentR]
            const children = [childI, childP1, childA, childP2, childE, childR]
            const initialize = () => {
                parents.forEach(parent => {
                    parent.style.visibility = 'visible'
                })
                children.forEach((child) => {
                    child.style.width = '0'
                })
            }
            if (value >= 100) {
                parentR.style.visibility = 'hidden'
                childR.style.width = '100%'
                if (this.accelerate) {
                    initialize()
                    this.localProgress = 0
                    this.$emit('stop-display')
                } else {
                    setTimeout(() => {
                        this.slowClose = true
                        setTimeout(() => {
                            initialize()
                            this.slowClose = false
                            this.localProgress = 0
                            this.$emit('stop-display')
                        }, 750);
                    }, 500);
                }
            }
            //分类讨论localProgress
            const segment = Math.floor(value / (100 / 6))
            const segmentRate = (value - segment * (100 / 6)) / (100 / 6)
            const rateLength = segmentRate * 100 + '%'
            if (segment === 0) {
                children[segment].style.width = rateLength
            }
            else if (segment > 0 && segment < children.length) {
                for (let i = 0; i < segment; i++) {
                    children[i].style.width = '100%'
                    parents[i].style.visibility = 'hidden'
                }
                children[segment].style.width = rateLength
            }
        },
        progress(value) {
            // console.log(value)
            let addProgress = () => {
                if (this.localProgress < value + 0.2 && this.display) {
                    this.localProgress += 1
                    setTimeout(addProgress, 1)
                }
            }
            addProgress()
        },
        display(value) {
            if (!this.isReal) {
                let x = 0
                let deltaTime = 10
                //a为上界，b为增长速率参数
                let a = 0.7, b = 0.5
                this.localProgress = 0
                const smoothLoad = () => {
                    const y = (-Math.exp(-b * x) + 1) * a
                    this.localProgress = y * 100
                    console.log(y)
                    x += deltaTime / 1000
                    if (this.progress < 70 && this.display) {
                        setTimeout(smoothLoad, deltaTime);
                    }
                }
                smoothLoad()
            }
        }
    },
    methods: {
        //因为采用了fixed，所以需要动态调整宽高
        resize() {
            const container = this.$refs.container
            const parentWidth = container.parentNode.offsetWidth
            const parentHeight = container.parentNode.offsetHeight
            container.style.width = parentWidth + 'px'
            container.style.height = parentHeight + 'px'
        }
    },
    mounted() {
        this.resize()
        // 使用 MutationObserver 监听 DOM 变化
        var observer = new MutationObserver(this.resize);
        observer.observe(document.documentElement, { childList: true, subtree: true });
    },
    beforeUnmount() {
        removeEventListener('resize', this.resize)
    },
}
</script>

<style scoped >
.loading-container {
    background: var(--theme-mode);
    /* backdrop-filter: blur(5px); */
    position: sticky;
    top: 0;
    display: none;
    /* width: 100%;
    height: 100%; */
    z-index: 500;
    align-items: center;
    justify-content: center;
    transition: all ease-out 0.5s;
    transform-origin: center center;
}

.letters-container {
    display: flex;
    justify-content: center;

}

.letters-container>span {
    margin: 0 2%;
    font-weight: 700;
    position: relative;
}

.open {
    display: flex;
}

.letter-child,
.letter-parent {
    font-size: 5em;
}

.letter-parent {
    position: relative;

}

.letter-child {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--theme-color);
    overflow: hidden;
    width: 0%;
}

.animated {
    animation: jump 0.6s 1 ease-out,
        float-up-down 2.58s infinite,
        float-left-right 3.46s infinite,
        rotation 5.94s 1s infinite;
    animation-composition: add;

}

.animated-end {
    /* background: var(--theme-color); */
}

.animated-end .letters-container>span>span.letter-child {
    /* color: var(--theme-mode); */
}


.loading-close-slow {
    animation: out 0.75s ease-in-out 1 forwards;
}


@keyframes out {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        display: none;
        transform: scale(3);
    }
}

@keyframes jump {
    0% {
        scale: 1;
        translate: 0;
    }

    40% {
        scale: 1.5;
        translate: 0 -20%;
    }

    60% {
        scale: 0.8;
        translate: 0;
    }

    80% {
        scale: 1.1;
    }

    100% {
        scale: 1;
    }
}


@keyframes float-up-down {
    0% {
        animation-timing-function: ease-out;
        translate: 0;
    }

    25% {
        animation-timing-function: ease-in-out;
        translate: -20% 0;
    }


    75% {
        animation-timing-function: ease-in;
        translate: 20% 0;
    }

    100% {
        animation-timing-function: linear;
        translate: 0;
    }
}

@keyframes float-left-right {
    0% {
        animation-timing-function: ease-out;
        translate: 0;
    }

    25% {
        animation-timing-function: ease-in-out;
        translate: 0 -20%;
    }

    75% {
        animation-timing-function: ease-in;
        translate: 0 20%;
    }

    100% {
        animation-timing-function: linear;
        translate: 0;
    }
}

@keyframes rotation {
    0% {
        animation-timing-function: ease-out;
        rotate: 0;
    }

    25% {
        animation-timing-function: ease-in-out;
        rotate: 10deg;
    }

    75% {
        animation-timing-function: ease-in;
        rotate: -10deg;
    }

    100% {
        animation-timing-function: linear;
        rotate: 0;
    }
}
</style>
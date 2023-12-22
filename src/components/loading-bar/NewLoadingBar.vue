<template>
    <div class="loading-container" :class="{ 'open': display, 'close': close }">
        <div class="letters-container">
            <span>
                <span class="letter-parent i" ref="parentI">i</span>
                <span class="letter-child i" ref="childI">i</span>
            </span>
            <span>
                <span class="letter-parent p1" ref="parentP1">P</span>
                <span class="letter-child i" ref="childP1">P</span>
            </span>
            <span>
                <span class="letter-parent a" ref="parentA">a</span>
                <span class="letter-child i" ref="childA">a</span>
            </span>
            <span>
                <span class="letter-parent p2" ref="parentP2">p</span>
                <span class="letter-child i" ref="childP2">p</span>
            </span>

            <span>
                <span class="letter-parent e" ref="parentE">e</span>
                <span class="letter-child i" ref="childE">e</span>
            </span>
            <span>
                <span class="letter-parent r" ref="parentR">r</span>
                <span class="letter-child i" ref="childR">r</span>
            </span>
        </div>
        <div>{{ localProgress }}</div>
    </div>
</template>

<script>
export default {
    name: 'NewLoadingBar',
    data() {
        return {
            close: false,
            localProgress: 0
        }
    },
    props: {
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
            if (value === 100) {
                setTimeout(() => {
                    this.close = true
                    setTimeout(() => {
                        this.$emit('stop-display')
                    }, 1000);
                }, 500);

            }

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

            //分类讨论localProgress
            let segment = Math.floor(value / (100 / 6))
            let segmentRate = (value - segment * (100 / 6)) / (100 / 6)
            if (segment === 0) {
                childI.style.width = segmentRate * 100 + '%'
            }
            else if (segment === 1) {
                childI.style.width = '100%'
                childP1.style.width = segmentRate * 100 + '%'
            }
            else if (segment === 2) {
                childI.style.width = '100%'
                childA.style.width = segmentRate * 100 + '%'
            }
            else if (segment === 3) {
                childI.style.width = '100%'
                childP2.style.width = segmentRate * 100 + '%'
            } else if (segment === 4) {
                childI.style.width = '100%'
                childE.style.width = segmentRate * 100 + '%'
            } else if (segment === 5) {
                childI.style.width = '100%'
                childR.style.width = segmentRate * 100 + '%'
            }
        },
        progress(value) {
            let addProgress = () => {
                this.localProgress++
                if (this.localProgress < value) {
                    setTimeout(addProgress, 5)
                }
            }
            addProgress()
        }
    }
}
</script>

<style scoped >
.loading-container {
    background: var(--theme-mode-translucent);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    display: none;
    width: 100%;
    height: 100%;
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.letters-container {
    display: flex;
    justify-content: center;
    background-clip: text;
}

.letters-container>span {
    margin: 0 2%;
    font-weight: 700;
    position: relative;
}

.open {
    display: flex;
}

.letter-parent {
    position: relative;
    /* animation: jump 0.5s infinite ease-in-out; */
}

.letter-child {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--theme-color);
    overflow: hidden;
}

.close {
    animation: out 0.5s ease-in-out 1 forward;
}


@keyframes out {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    10% {
        transform: scale(1.1);
    }

    100% {
        opacity: 0;
        display: none;
        transform: scale(0);
    }
}

@keyframes jump {
    0% {
        scale: 0;
        translate: 0;
    }

    50% {
        scale: 1.5;
        translate: -5% -5%;
    }

    90% {
        scale: 1;
        translate: 0;
    }

    100% {
        scale: 0.9;
    }
}
</style>
<template>
    <div class="tutorial-container" :class="{ 'open': display, 'tutorial-close': close }">
        <div class="skip-button-container">
            <span>{{ $t('tutorial_skip') }}</span>
            <button class="skip-button" @click="handleSkip">
                <svg t="1703228298208" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4440" width="23" height="23">
                    <path
                        d="M128 304.7L405.59 512 128 719.3V304.7M90.33 203.08c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L105.37 207.92c-4.73-3.33-9.95-4.84-15.04-4.84zM591.38 304.7L868.97 512 591.38 719.3V304.7m-37.67-101.62c-13.62 0-26.33 10.8-26.33 26.28v565.28c0 15.48 12.71 26.28 26.33 26.28 5.09 0 10.31-1.51 15.04-4.85l381.72-285.06c12.71-9.49 12.71-28.54 0-38.03L568.75 207.92c-4.73-3.33-9.95-4.84-15.04-4.84z"
                        p-id="4441"></path>
                </svg>
            </button>
        </div>
        <div class="images-container" :style="{ 'transform': `translateX(${-index * 100}%)` }">
            <div class="image-container" v-for="data in datas" :key="datas.indexOf(data)">
                <div class="image" :style="{ 'background-image': `url('${data.image}')` }">
                </div>
            </div>
        </div>
        <div class="down-area">
            <button class="prev_button" :class="{ 'disabled-button': index === 0 }" @click="handlePrev">
                <svg t="1703228223033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="3333" width="23" height="23">
                    <path
                        d="M710.314667 1024l91.576889-91.576889L381.468444 512 801.891556 91.576889 710.314667 0l-512 512z"
                        p-id="3334"></path>
                </svg>
            </button>
            <div class="text-container">
                <span>{{ datas[index].text }}</span>
            </div>
            <button class="next-botton" @click="handleNext">
                <svg v-if="index < datas.length - 1" t="1703231426269" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="6409" width="23" height="23">
                    <path
                        d="M364.899556 1024l-91.576889-91.576889L693.745778 512 273.322667 91.576889 364.899556 0l512 512z"
                        p-id="6410"></path>
                </svg>
                <svg v-else t="1703228126841" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1487" width="23" height="23">
                    <path d="M453.44 934.592L2.752 528.896l74.88-83.136 360.768 324.736 494.08-643.072 88.768 68.16z"
                        p-id="1489"></path>
                    <path d="M368.64 858.304L2.752 528.896l74.88-83.136 360.768 324.736" p-id="1490"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TutorialView',
    data() {
        return {
            index: 0,
            close: false,
        }
    },
    props: {
        display: {
            type: Boolean,
            required: true
        },
        datas: {
            type: Array,
            default: [
                {
                    image: '/public/3d models/avatar.jpg',
                    text: '这是第一张图片'
                },
                {
                    image: '/public/3d models/avatar.jpg',
                    text: '这是第二张图片'
                },
                {
                    image: '/public/3d models/avatar.jpg',
                    text: '这是第三张图片'
                },
                {
                    image: '/public/3d models/avatar.jpg',
                    text: '这是第四张图片'
                }
            ]
        }
    },
    methods: {
        handleNext() {
            if (this.index === this.datas.length - 1) {
                this.close = true
                this.index = 0
                setTimeout(() => {
                    this.$emit('stop-display')
                    this.close = false
                    this.index = 0
                }, 1000)
            }
            else if (this.index < this.datas.length) {
                this.index++
            }
        },
        handlePrev() {
            if (this.index > 0) {
                this.index--
            }
        },
        handleSkip() {
            this.close = true
            this.index = this.datas.length - 1
            setTimeout(() => {
                this.$emit('stop-display')
                this.close = false
                this.index = 0
            }, 1000)
        }
    }
}
</script>
<style scoped>
.tutorial-container {
    background: var(--theme-mode-translucent);
    backdrop-filter: blur(5px);
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1000;
    top: 0;
    display: none;
    flex-direction: column;
    justify-content: space-around;
}

.images-container {
    transition: all ease-in-out 0.5s;
    white-space: nowrap;
    margin-bottom: 5%;
}

.image-container {
    width: 100%;
    display: inline-block;
}



.image {
    border-radius: 15px;
    border: 2px var(--theme-color) solid;
    margin: 0 auto;
    aspect-ratio: 1.5;
    width: 40%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

svg path {
    fill: var(--theme-color);
}

.skip-button-container {
    display: flex;
    justify-content: end;
    padding-right: 10%;
    margin-bottom: 5%;
    align-items: center;
}

.skip-button-container span,
.text-container span {
    color: var(--theme-color);
    font-weight: 700;
}

.text-container span {
    font-size: 25px;
}

button {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
}

button:hover {
    background: var(--theme-mode-contrast);
}

.skip-button {
    width: 5%;
    margin-left: 2%;
}

.disabled-button {
    cursor: not-allowed;
}

.disabled-button:hover {
    background: var(--theme-mode-high-contrast);
    color: var(--theme-mode);
}

.down-area {
    display: flex;
    justify-content: space-around;
    margin-bottom: 3%;
}



.open {
    display: flex;
    animation: in 0.7s ease-in-out 1 forwards;
}

.tutorial-close {
    animation: out 1s ease-in-out 1 forwards;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    90% {
        transform: scale(1.1);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
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
</style>
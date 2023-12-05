<template>
        <div class="wrap">
            <div class="nav">
                <!--按钮-->
                <!-- <div class="btn">
                    <div class="btn-item"></div>
                    <div class="btn-item"></div>
                    <div class="btn-item"></div>
                </div> -->
                <!--头像-->
                <!-- <div class="icon">
                    <div class="icon-img"><img src="../assets/pig.jpg" alt="" /></div>
                    <div class="icon-con">
                        <p>非常好问卷</p>
                        <h2>爱来自Pig</h2>
                    </div>
                </div> -->
                <div class="line"></div>
                <!-- <div class="title">
                    <p>Menu </p>
                </div> -->
                <div @click="createNewQ" class="menu">
                    <div class="item">
                        <div class="light"></div>
                        <div class="licon"><span class="iconfont icon-wenjian"></span></div>
                        <div class="con" style="font-size: 20px;">我从哪里来</div>
                        <div class="ricon"><span class="iconfont icon-shezhi"></span></div>
                    </div>
                    <!-- <div @click="$refs.fileInput.click()"  class="item">
                        <div class="light"></div>
                        <div class="licon"><span class="iconfont icon-qipao1"></span></div>
                        <div class="con" style="font-size: 20px;">从模板创建</div>
                        <input ref="fileInput" type="file" @change="onFileChange" style="display: none">
                        <div class="ricon"></div>
                    </div>
                    <div @click="triggerParentEvent(0)" class="item">
                        <div class="light"></div>
                        <div class="licon"><span class="iconfont icon-qipao1"></span></div>
                        <div class="con"  style="font-size: 20px;">已创建问卷</div>
                        <div class="ricon"></div>
                    </div>
                    <div @click="triggerParentEvent(1)" class="item">
                        <div class="light"></div>
                        <div class="licon">
                            <span class="iconfont icon-xiaolian"></span>
                        </div>
                        <div class="con"  style="font-size: 20px;">已填写问卷</div>
                        <div class="ricon"><span class="iconfont icon-caidan1"></span></div>
                    </div>
                    <div @click="triggerParentEvent(2)" class="item">
                        <div class="light"></div>
                        <div class="licon">
                            <span class="iconfont icon-shexiang"></span>
                        </div>
                        <div class="con"  style="font-size: 20px;">垃圾箱</div>
                        <div class="ricon"></div>
                    </div> -->
                </div>

            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            menuState: 0
        }
    },
    methods: {
        async createNewQ() {
            const data = {
                "uid": this.$store.state.curUserID
            }
            console.log(data)
            // this.triggerParentEvent(0)


            await this.$api.questionnaire.postQuestionnaire_Create(data);
            this.$emit('childEvent', 0)

        },
        triggerParentEvent(state) {
            console.log("state:" + state)
            this.menuState = state
            this.$emit('childEvent', this.menuState)
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.$emit('file-selected', file);
        }
    },

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.6);
}

.wrap {
    /* width: 100%; */
    height: 7vh;
    /* background: url(img/bg.jpg) center no-repeat; */
    transform: scale(0.8);
}

.nav {
    border-radius: 20px;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.6);
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", "Microsoft YaHei UI", 微软雅黑, sans-serif;
    font-size: 12px;
    height: 18vh;
    /* margin: 0 180px -119px 15px; */
    overflow: hidden;
    padding: 0;
    top: 15%;
    transition: all .5s;
    width: 80px;
    background: var(--theme-mode-contrast);
    /* background-color: var()); */
    /* background-image: conic-gradient(from 90deg at 370% 67%, #65103E 0%, rgba(200, 152, 152, 0) 100%), linear-gradient(160deg, #183765 0%, #110E4F 29.9%, #3B124F 50.5%, #72134F 72.6%, #0E1B48 98.2%); */
}

.nav:hover {
    width: 280px;
}

.btn {
    width: 60px;
    height: 10px;
    display: flex;
    justify-content: space-around;
    margin-left: 25px;
    margin-top: 25px;
}

.btn-item {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.btn-item:nth-child(1) {
    background: #eb5a56;
}

.btn-item:nth-child(2) {
    background: #f8bc33;
}

.btn-item:nth-child(3) {
    background: #62cb44;
}

.icon {
    width: 250px;
    height: 60px;
    margin-left: 25px;
    margin-top: 20px;
    display: flex;
}

.icon-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.icon-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.icon-con {
    height: 60px;
    margin-left: 25px;
}

.icon-con p {
    padding-top: 5px;
}

.icon-con h2 {
    font-weight: 400;
}

.line {
    width: 60px;
    height: 1px;
    background: rgba(245, 253, 255, 0.5);
    margin: 20px 25px;
    transition: 0.5s;
}

.nav:hover .line {
    width: 230px;
}

.title {
    width: 100%;
    height: 30px;
    /* text-align: center; */
}

.title p {
    font-size: 14px;
    text-align: center;
}

.menu {
    width: 230px;
    margin-left: 25px;
    height: 100%;
}

.item {
    display: flex;
    position: relative;
    height: 90px;
    transition: 0.5s;
    border-radius: 6px;
}

.item:hover {
    background: rgba(255, 255, 255, 0.1);
}

.licon {
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.con {
    align-items: center;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", "Microsoft YaHei UI", 微软雅黑, sans-serif;
    font-size: 12px;
    height: 50px;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
}

.nav:hover .con {
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
}

.ricon {
    width: 0px;
    height: 50px;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    opacity: 0;
}

.nav:hover .ricon {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
}

.iconfont {
    font-size: 26px;
}

.ricon .iconfont {
    font-size: 20px;
    color: #62cb44;
}

.light {
    width: 6px;
    height: 100%;
    background: var(--theme-color);
    position: absolute;
    left: -25px;
    transition: 0.5s;
    /* border-top-right-radius: px;
    border-bottom-right-radius: 4px; */
    opacity: 0;
}

.item:hover .light {
    opacity: 1;
}

.serve {
    width: 60px;
    /*    background: rgba(98, 203, 68, 0.5);*/
    background: rgba(0, 0, 0, 0.7);
    margin-left: 25px;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.5s;
}

.nav:hover .serve {
    width: 230px;
}

</style>
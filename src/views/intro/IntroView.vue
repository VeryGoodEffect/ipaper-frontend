<template>
  <LoadingBar style="position: fixed;width: 1000px;z-index: -1;" :progress="progress"></LoadingBar>
  <header>
    <section>
      <div class="logo"></div>
      <h1>iPaper<span>{{ $t('web_name_text') }}</span></h1>
    </section>
    <section>
      <!-- <button >{{ $t('language') }}</button> -->
      
      <svg @click="translate"
        t="1700014496111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4957" width="200" height="200"><path d="M360.228571 505.234286c-8.594286 0-12.8-4.388571-12.8-13.165715v-74.24h-76.068571c-5.12 0-9.325714-1.645714-12.617143-4.937142s-4.754286-7.68-4.754286-12.982858v-81.005714c0-5.302857 1.645714-9.691429 4.754286-12.982857s7.497143-4.937143 12.617143-4.937143H347.428571v-34.742857c0-8.777143 4.205714-13.165714 12.8-13.165714s12.8 4.388571 12.8 13.165714v34.742857h77.165715c5.12 0 9.325714 1.645714 12.617143 4.937143s4.754286 7.68 4.754285 12.982857v81.005714c0 5.302857-1.645714 9.691429-4.754285 12.982858s-7.497143 4.937143-12.617143 4.937142H373.028571v74.24c0 8.777143-4.205714 13.165714-12.8 13.165715z m-75.337142-112.64H347.428571v-66.56h-62.537142c-4.205714 0-6.4 2.194286-6.4 6.582857v53.394286c0 4.388571 2.194286 6.582857 6.4 6.582857z m88.137142 0h62.537143c4.205714 0 6.4-2.194286 6.4-6.582857v-53.394286c0-4.388571-2.194286-6.582857-6.4-6.582857H373.028571v66.56zM704.548571 694.674286h-78.445714l-15.908571 50.285714c-2.011429 0.914286-4.022857 1.645714-6.217143 2.011429-2.194286 0.548571-4.754286 0.731429-7.68 0.731428-5.302857 0-9.691429-1.28-13.165714-3.657143-3.474286-2.377143-5.12-6.034286-5.12-10.971428 0-2.377143 0.365714-4.754286 0.914285-6.948572 0.548571-2.377143 1.462857-4.937143 2.56-7.862857 2.925714-9.142857 6.765714-21.028571 11.702857-35.84s10.422857-30.171429 16.091429-46.445714c5.668571-16.274286 11.52-32.182857 17.371429-48.091429s10.788571-29.257143 15.177142-40.411428c2.194286-1.28 5.485714-2.56 9.874286-3.84s8.96-2.011429 13.714286-2.011429c6.217143 0 11.885714 0.914286 16.822857 2.742857 4.937143 1.828571 8.228571 4.937143 10.057143 9.325715 4.571429 12.434286 9.874286 26.697143 15.36 42.605714 5.668571 15.908571 11.154286 32.365714 16.822857 49.371428 5.485714 17.005714 10.971429 33.645714 16.091429 49.737143 5.12 16.274286 9.874286 30.902857 13.897142 44.251429-2.011429 2.194286-4.571429 4.022857-7.68 5.485714-3.108571 1.462857-6.765714 2.194286-11.154285 2.194286-5.668571 0-9.874286-1.097143-12.434286-3.474286s-4.754286-6.217143-6.582857-11.702857l-12.068572-37.485714z m-39.497142-121.965715c-2.194286 5.851429-4.571429 12.617143-7.131429 20.114286-2.56 7.497143-5.302857 15.36-8.045714 23.588572-2.742857 8.228571-5.485714 16.64-8.228572 25.051428-2.742857 8.411429-5.485714 16.64-7.862857 24.685714h63.268572c-2.925714-8.777143-5.668571-17.737143-8.594286-26.697142-2.925714-8.96-5.668571-17.554286-8.228572-25.6s-5.12-15.725714-7.497142-22.857143c-2.377143-7.131429-4.205714-13.348571-5.851429-18.468572h-1.828571z" p-id="4958"></path><path d="M521.142857 606.171429H189.622857a65.097143 65.097143 0 0 1-65.097143-64.914286V202.605714c0-35.84 29.257143-65.097143 65.097143-65.097143H521.142857c35.84 0 64.914286 29.257143 64.914286 65.097143V541.257143a64.914286 64.914286 0 0 1-64.914286 64.914286zM189.622857 174.08c-15.725714 0-28.525714 12.8-28.525714 28.525714V541.257143c0 15.725714 12.8 28.342857 28.525714 28.342857H521.142857c15.725714 0 28.342857-12.8 28.342857-28.342857V202.605714c0-15.725714-12.8-28.525714-28.342857-28.525714H189.622857z" p-id="4959"></path><path d="M834.56 886.491429H503.04a65.097143 65.097143 0 0 1-65.097143-64.914286V587.885714c0-10.057143 8.228571-18.285714 18.285714-18.285714h64.914286c15.725714 0 28.342857-12.8 28.342857-28.342857v-105.142857c0-10.057143 8.228571-18.285714 18.285715-18.285715h266.788571c35.84 0 64.914286 29.257143 64.914286 65.097143v338.651429a64.914286 64.914286 0 0 1-64.914286 64.914286zM474.514286 606.171429v215.405714c0 15.725714 12.8 28.342857 28.525714 28.342857h331.52c15.725714 0 28.342857-12.8 28.342857-28.342857V482.925714c0-15.725714-12.8-28.525714-28.342857-28.525714H586.057143v86.857143a64.914286 64.914286 0 0 1-64.914286 64.914286h-46.628571z" p-id="4960"></path></svg>
      <button class="basic-btn" @click="loginModalShouldShow = true">{{ $t('login_text') }}</button>
      <button class="basic-btn-outline" @click="registerModalShouldShow = true">{{ $t('register_text') }}</button>
      
      <div class="dropdown-icon">
        <ul>
          <li @click="loginModalShouldShow = true">{{ $t('login_text') }}</li>
          <li @click="registerModalShouldShow = true">{{ $t('register_text') }}</li>
        </ul>   
      </div>
    </section>
  </header>
  <main>
    <div>
      <h2>一些吹牛的文案</h2>
      <h2 v-ellipsis="{ maxLine: 1, maxWidth: '2000px', transitionTime: '1s' }">
        最大宽度2000px 最大行数1 过渡时间1秒
        Lorem ipsum dolor sit amet consectetur illum omnis sunt in, quam eaque tempore ex consequuntur tempora. Totam quis
        minima sit natus eius quos aut soluta optio temporibus exercitationem? Blanditiis expedita tempore sit molestiae,
        ipsam quisquam ullam nostrum accusantium hic, optio distinctio animi doloremque a soluta dolor explicabo possimus!
        Autem neque sed earum commodi quidem doloribus? Ducimus, consequuntur tenetur placeat quidem voluptas minus est
        rem velit sint voluptatibus hic consequatur, in fugit quas voluptate consectetur autem aspernatur. Tempore,
        repellendus cumque aspernatur ea aliquam dicta!
      </h2>
      <h3 v-ellipsis="{ maxLine: 3, transitionMode: 'ease-in-out' }">
        最大宽度默认 最大行数3 过渡函数ease-in-out flex子元素最大宽度失效Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore corporis
        dolor distinctio enim nisi magni nesciunt ea, vitae assumenda atque illum maiores nobis ipsam, quae eos officia?
        Perferendis dignissimos enim, ducimus fuga ab voluptatibus fugit ex dicta a provident illum, aliquid alias
        repellat quasi sit laboriosam corporis suscipit dolorem deserunt sapiente est rerum veniam. Nobis exercitationem
        quo asperiores recusandae odio deleniti! Mollitia, nisi velit! Blanditiis architecto suscipit, quos similique
        facere quibusdam quia quae nesciunt recusandae sapiente vel doloribus! Nostrum, earum! Possimus, incidunt
        quibusdam quaerat quam ab aut! Doloremque aut doloribus vel maiores facilis. Laborum pariatur sunt, assumenda
        architecto tenetur veniam? Eveniet quae natus id quia. Voluptates deleniti explicabo recusandae quia! Minus omnis
        iure itaque est beatae quam commodi alias accusamus! Corporis soluta magnam, ex error exercitationem, harum
        pariatur necessitatibus maiores ad, perspiciatis rerum eum commodi. Ipsa facere tenetur consequatur neque debitis
        rem, ab minima similique odio iusto alias voluptatibus at ducimus, ipsam corrupti unde, ex vitae repellat odit.
        Perspiciatis quas quaerat facere odit ducimus et aspernatur consectetur deleniti temporibus. Minima maxime
        consequatur perspiciatis itaque distinctio consectetur rem minus voluptatem, accusantium ipsa natus modi
        reiciendis quam soluta nihil nemo quod, facilis eos laudantium alias, molestiae dolores dignissimos autem. Beatae
        iusto est saepe nemo assumenda exercitationem. Doloremque, consequuntur aut veritatis aperiam voluptatum mollitia
        velit. Saepe, quas deleniti explicabo iusto dicta itaque autem. Impedit labore veritatis et nostrum omnis eligendi
        explicabo sit nemo! Perspiciatis, laborum ipsa aliquam fugiat magnam corporis aliquid, eos deserunt accusamus
        doloremque eaque. Quo repellat ab, eius eveniet explicabo impedit quaerat quam dolore totam, atque optio iusto
        alias. Est a ut laboriosam mollitia, quidem aperiam ipsum expedita odit repudiandae consequuntur quo ex fuga
        fugiat qui illo quisquam alias ipsa dolore magnam ea placeat explicabo. Voluptatem quod quia et culpa aperiam
        optio aspernatur sit illo eaque aliquid, sequi ratione nam. Cumque, quaerat corporis voluptas vel necessitatibus
        facere quas nesciunt eius quasi deserunt quae, delectus pariatur, explicabo odio temporibus. Facilis doloremque
        saepe praesentium beatae dolor rem, magnam nisi recusandae, ipsa sunt dolorem enim pariatur voluptatem quod maxime
        exercitationem veritatis voluptate debitis non nam corrupti ex. Eos totam tempora dolores asperiores pariatur
        recusandae modi ad tenetur! Et exercitationem ipsa consequuntur reiciendis laborum fugit soluta enim suscipit,
        iusto porro iste unde modi excepturi omnis vitae qui atque explicabo accusamus aliquam facilis quia corrupti
        dignissimos? Eligendi consectetur itaque rerum laborum provident quasi aperiam, tenetur in veritatis quaerat.
        Tempora, reiciendis recusandae ipsum placeat deserunt numquam delectus nam cupiditate minima, distinctio molestias
        natus voluptate ducimus. Consequatur ducimus quo officia, reiciendis voluptas ipsa, debitis odit ipsam illo totam
        similique, ad recusandae nihil fugit. Explicabo, culpa, nesciunt aut asperiores tempore esse autem expedita iusto
        unde enim exercitationem sunt rem est aliquam, natus vitae. Suscipit ipsam illo molestiae eligendi maiores nihil
        accusamus nesciunt quae facere culpa. Vero dolorem facere rem aliquid reiciendis, saepe dolorum sint quisquam
        laborum doloribus sapiente possimus? Dolorum voluptatem labore soluta sed eius dolore cupiditate cum, maxime quo
        obcaecati velit animi. Voluptatem officiis saepe fugit voluptatum velit cumque tempore perferendis architecto
        optio sint mollitia neque ipsam, rerum fugiat itaque, ut ratione eaque nostrum suscipit ea ab quae. Illo
        temporibus praesentium, tempore minus magni iste velit! Quo eos repellat earum consectetur dignissimos, quidem
        culpa quod beatae molestiae incidunt aliquid magnam libero provident explicabo. Facilis eius mollitia quos soluta
        dignissimos accusamus saepe sed, sint voluptas porro. In cupiditate eum, quas itaque, dolorum mollitia asperiores
        impedit odio neque perferendis veniam ad sint, iste molestiae assumenda expedita saepe ducimus facilis suscipit
        dolorem dolores. A corporis quo tenetur ratione officiis veniam quidem modi laudantium? Unde, labore itaque
        molestias quisquam velit quam officiis doloribus obcaecati deleniti quasi? Ut debitis consectetur blanditiis sunt
        fugiat earum? Molestias expedita dolore blanditiis odit, asperiores maiores nam sequi odio modi! Quo alias, rem
        recusandae nisi assumenda cumque consequuntur voluptatem labore esse maiores inventore! Nulla obcaecati itaque
        doloribus vel similique officiis modi illum ad sed minima alias animi consequuntur dolores, possimus labore
      </h3>
      <div class="huge-input-wrapper">
        <input 
          class="basic-input huge-input" type="text" :placeholder="$t('huge_input_placeholder')"
          v-model="searchKeyword" @keyup.enter="basicSearch"
        />
        <svg @click="basicSearch"
          t="1699356103686" class="icon search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" width="200" height="200"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  p-id="4163"></path></svg>
      </div>
    </div>
  </main>

  <LoginModal 
    :show="loginModalShouldShow" 
    @close="loginModalShouldShow = false" 
    @jumpToRigister="registerModalShouldShow = true"
    @jumpToRetrievePassword="retrievePasswordModalShouldShow = true"
  />

  <RegisterModal 
    :show="registerModalShouldShow" 
    @close="registerModalShouldShow = false" 
    @jumpToLogin="loginModalShouldShow = true"
  />

  <RetrievePasswordModal 
    :show="retrievePasswordModalShouldShow" 
    @close="retrievePasswordModalShouldShow = false"
  />
</template>

<script>
import LoginModal from '../../components/modals/LoginModal.vue'
import RegisterModal from '../../components/modals/RegisterModal.vue'
import RetrievePasswordModal from '../../components/modals/RetrievePasswordModal.vue'

import LoadingBar from '../../components/loading-bar/LoadingBar.vue';
import i18n from '../../language'


export default {
  name: 'IntroView',
  components: {
    LoginModal,
    RegisterModal,
    RetrievePasswordModal,
    LoadingBar,
    i18n
  },
  data() {
    return {
      searchKeyword: '', // 搜索关键字
      loginModalShouldShow: false,
      registerModalShouldShow: false,
      retrievePasswordModalShouldShow: false
    }
  },
  methods: {
    basicSearch() {
      if (this.searchKeyword != '') {
        alert('搜索关键字：' + this.searchKeyword)
        this.searchKeyword = ''
      }
    },
    translate() {
      if (this.$i18n.locale == 'zh') {
        this.$i18n.locale = 'en'
      }
      else {
        this.$i18n.locale = 'zh'
      }
    }
  }
}
</script>

<style scoped>
header {
  height: 80px;
  background: rgba(255, 255, 255, .2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

header>section {
  display: flex;
  align-items: center;
}

header h1,
header h1 span {
  font-size: 30px;
  font-weight: bold;
  color: var(--theme-color);
}

header h1 {
  margin-left: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  background: green;
  border-radius: 50%;
  flex: none;
}

header button {
  margin: 0 10px;
}

main {
  height: calc(100vh - 80px);
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

main>div {
  display: flex;
  max-width: 900px;
  flex-wrap: wrap;
  justify-content: center;
}

main h2 {
  font-size: 80px;
  color: var(--theme-color);
  font-weight: bold;
  padding-bottom: 50px;

  transition-property: font-size;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon {
  width: 50px;
  height: 50px;
  background: url('../../components/svg/menu.svg');
  background-size: cover;
  display: none;
  cursor: pointer;
  position: relative;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon ul {
  position: absolute;
  top: calc(100%);
  right: 10px;
  padding: 10px;
  background: var(--theme-mode-like);
  border-radius: 5px;
  display: none;
}

.dropdown-icon ul li {
  width: 80px;
  display: flex;
  justify-content: center;
  background: var(--theme-mode-contrast);
  color: var(--theme-mode-high-contrast);
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  transition: .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon ul li:first-child {
  margin-bottom: 10px;
}

.dropdown-icon ul li:hover {
  scale: 1.05;
}

.icon {
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: #666;
}

.icon:hover {
  scale: 1.2;
  fill: var(--theme-color);
}

.search-icon {
  position: absolute;
  right: 15px;
  z-index: 10;
}

header svg {
  margin: 0 10px;
}

@media screen and (max-width: 1000px) {
  header h1,
  header h1 span {
    font-size: 25px;
  }
}

@media screen and (max-width: 850px) {
  .icon {
    width: 40px;
    height: 40px;
  }
}

@media screen and (max-width: 768px) {
  .dropdown-icon {
    display: block;
  }

  .dropdown-icon:hover ul {
    display: block;
  }

  header button {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .dropdown-icon {
    width: 40px;
    height: 40px;
  }

  main h2 {
    font-size: 60px;
  }
}

@media screen and (max-width: 450px) {
  main h2 {
    font-size: 40px;
  }

  header h1 span {
    display: none;
  }
}

</style>
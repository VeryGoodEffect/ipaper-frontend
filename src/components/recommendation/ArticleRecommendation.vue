<template>
  <ul>
    <li v-for="(article, index) in articles" :key="index">
      <h3>{{ article.title }}</h3>
      <p class="abstract" v-ellipsis="{ maxLine: 3, maxWidth: '100%', wrappable: false}">
        {{ article.abstract }}
      </p>
      <span class="author">
        {{ article.authors }}
      </span>
      <span class="journal">
        {{ article.journal }}
      </span>
    </li>
  </ul>
  
</template>

<script>


export default {
  name: 'ArticleRecommendation',
  data() {
    return {
      articles: [
        {
          title: '基于区块链技术的低碳供应链政府补贴策略研究',
          abstract: '本文以一个制造商和一个零售商组成的二级低碳供应链为研究对象, 以低碳供应链政府补贴策略为研究主题, 政府投资建设区块链技术应用平台, 供应链企业有偿使用区块链技术. 在此背景下,(3)政府和牧民视 角下的工程障碍相似,主要是民生改善,产业促进与政民沟通.(4)不同的利益得失导致政府的 高调整意愿和(3)政府和牧民视 角下的工程障碍相似,主要是民生改善,产业促进与政民沟通.(4)不同的利益得失导致政府的 高调整意愿和',
          authors: '张令荣， 彭博， 程春琪',
          journal: '中国管理科学, 2023 - zgglkx.com'
        },
        {
          title: 'Circular Economy strategies for concrete: implementation and integration',
          abstract: 'Economy principles; how the full range of Circular Economy … when integrating different Circular Economy strategies (such … materials and products in Circular Economy discourse - their The share of industry in the population employed in various sectors of the economy is 13b5%. That is, the industrial sector in the economy of Uzbekistan is one of the main sectorsthe digital economy in a large region in a pandemic. The key technologies of the digital economy of a … The economic efficiency of using these systems in the regions economy has been',
          authors: 'ATM Marsh, APM Velenturf, SA Bernal',
          journal: 'Journal of Cleaner Production, 2022 - Elsevier'
        },
        {
          title: '地方数字政府, 数字经济一体化发展研究',
          abstract: '地方数字政府, 数字经济一体化发展是信息社会演进的重要趋势, 也是我国各级地方政府共同建设中国式现代化的重要推力. 在建设数字城市背景下, 从地方数字政府, 数字经济一体化的内涵,(3)政府和牧民视 角下的工程障碍相似,主要是民生改善,产业促进与政民沟通.(4)不同的利益得失导致政府的 高调整意愿和',
          authors: '李楠， 胡亦琦',
          journal: '信息通信技术与政策, 2023 - ictp.caict.ac.cn'
        },
        {
          title: '三江源国家公园区政府和牧民二元视角下的退牧还草工程绩效研究',
          abstract: '(2)牧民对工程效率性的评价高于政府,对其他维度的评价与政府相近.(3)政府和牧民视 角下的工程障碍相似,主要是民生改善,产业促进与政民沟通.(4)不同的利益得失导致政府的 高调整意愿和',
          authors: '夏翠珍， 周立华， 裴孝东， 王娅， 李军豪',
          journal: '自然资源学报, 2023 - jnr.ac.cn'
        },
        {
          title: 'THE ROLE OF INDUSTRIAL ENTERPRISES IN THE DEVELOPMENT OF THE NATIONAL ECONOMY',
          abstract: 'The share of industry in the population employed in various sectors of the economy is 13b5%. That is, the industrial sector in the economy of Uzbekistan is one of the main sectorsthe digital economy in a large region in a pandemic. The key technologies of the digital economy of a … The economic efficiency of using these systems in the regions economy has been The share of industry in the population employed in various sectors of the economy is 13b5%. That is, the industrial sector in the economy of Uzbekistan is one of the main sectorsthe digital economy in a large region in a pandemic. The key technologies of the digital economy of a … The economic efficiency of using these systems in the regions economy has been',
          authors: 'AU Kobilov, DP Khashimova, SG Mannanova, Tom Johnson, Jane Keila, Tim D. Alson, Jackson Roll, P. E. Bellyton',
          journal: 'Journal of Cleaner Production, 2022 - Elsevier'
        },
        {
          title: 'Circular Economy strategies for concrete: implementation and integration',
          abstract: 'Economy principles; how the full range of Circular Economy … when integrating different Circular Economy strategies (such … materials and products in Circular Economy discourse - their',
          authors: 'ATM Marsh, APM Velenturf, SA Bernal',
          journal: 'Journal of Cleaner Production, 2022 - Elsevier'
        },
        {
          title: '地方数字政府, 数字经济一体化发展研究',
          abstract: '地方数字政府, 数字经济一体化发展是信息社会演进的重要趋势, 也是我国各级地方政府共同建设中国式现代化的重要推力. 在建设数字城市背景下, 从地方数字政府, 数字经济一体化的内涵,',
          authors: '李楠， 胡亦琦',
          journal: '信息通信技术与政策, 2023 - ictp.caict.ac.cn'
        },
        {
          title: '三江源国家公园区政府和牧民二元视角下的退牧还草工程绩效研究',
          abstract: '(2)牧民对工程效率性的评价高于政府,对其他维度的评价与政府相近.(3)政府和牧民视 角下的工程障碍相似,主要是民生改善,产业促进与政民沟通.(4)不同的利益得失导致政府的 高调整意愿和',
          authors: '夏翠珍， 周立华， 裴孝东， 王娅， 李军豪',
          journal: '自然资源学报, 2023 - jnr.ac.cn'
        },
        {
          title: 'Circular Economy strategies for concrete: implementation and integration',
          abstract: 'Economy principles; how the full range of Circular Economy … when integrating different Circular Economy strategies (such … materials and products in Circular Economy discourse - their The share of industry in the population employed in various sectors of the economy is 13b5%. That is, the industrial sector in the economy of Uzbekistan is one of the main sectorsthe digital economy in a large region in a pandemic. The key technologies of the digital economy of a … The economic efficiency of using these systems in the regions economy has been',
          authors: 'ATM Marsh, APM Velenturf, SA Bernal',
          journal: 'Journal of Cleaner Production, 2022 - Elsevier'
        },
        {
          title: '地方数字政府, 数字经济一体化发展研究',
          abstract: '地方数字政府, 数字经济一体化发展是信息社会演进的重要趋势, 也是我国各级地方政府共同建设中国式现代化的重要推力. 在建设数字城市背景下, 从地方数字政府, 数字经济一体化的内涵,',
          authors: '李楠， 胡亦琦',
          journal: '信息通信技术与政策, 2023 - ictp.caict.ac.cn'
        },
        {
          title: 'Circular Economy strategies for concrete: implementation and integration',
          abstract: 'Economy principles; how the full range of Circular Economy … when integrating different Circular Economy strategies (such … materials and products in Circular Economy discourse - their',
          authors: 'ATM Marsh, APM Velenturf, SA Bernal',
          journal: 'Journal of Cleaner Production, 2022 - Elsevier'
        },
        {
          title: '地方数字政府, 数字经济一体化发展研究',
          abstract: '地方数字政府, 数字经济一体化发展是信息社会演进的重要趋势, 也是我国各级地方政府共同建设中国式现代化的重要推力. 在建设数字城市背景下, 从地方数字政府, 数字经济一体化的内涵,',
          authors: '李楠， 胡亦琦',
          journal: '信息通信技术与政策, 2023 - ictp.caict.ac.cn'
        },
      ],
      
    }
  }
}
</script>

<style scoped>
ul {
  width: 80%;
}

li {
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--theme-mode-contrast);
}

li h3 {
  color: var(--theme-mode-very-high-contrast);
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}

li:hover h3 {
  text-decoration: underline;
}

.abstract {
  color: var(--theme-mode-high-contrast);
  font-size: 14px;
}

.author, .journal {
  font-size: 14px;
  font-weight: bold;
  color: var(--theme-mode-very-high-contrast);
}

.journal {
  margin-left: 15px;
}

@media screen and (max-width: 960px) {
  ul {
    width: 100%;
  }
}
</style>
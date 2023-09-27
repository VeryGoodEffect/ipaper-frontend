# 说明

## 1 插件

- 路由 router，配置在`/src/router/index.js`中

- 状态管理 vuex，配置在`/src/store/index.js`中

  > 使用 vuex 时，必须把复杂的判断逻辑写在`actions`中，仅在`mutations`中处理数据。
  >
  > 访问 vuex 时，应使用 `mapState` `mapAction` `mapMutation`。

- 网络请求 http，配置在`/src/http/index.js`中

- 全剧事件总线 mitt，配置于`vm`身上的`$bus`，发送事件写`this.$bus.emit`，接收事件写`this.$bus.on`

- vue-cookies，配置于`vm`身上的`$cookies`

## 2 规范（持续更新）

> ### 出现不符合规范的写法会被打回重写。

1. **js 脚本不写分号。css 的每一个样式表中，最后一个`key: value`后写分号。**

   > **注意：**通过`log+回车`、`set+回车`、`import+回车`快捷生成代码时，vscode 会自动加上分号，**必须删掉**。

2. **任何能用单引号的地方就不用双引号。**

3. 数组或对象的最后一个成员后不写逗号，例如

   ```js
   let arr = [ // <- 第一个成员的'{'不要出现在这里
       {
           name: 'Tom',
           age: 18 // <- 这里不要有逗号
       },
       {
           name: 'Jane',
           age: 20 // <- 这里不要有逗号
       } // <- 这里不要有逗号
   ]
   ```

4. 插值语法等出现`{}`的地方，花括号首尾都必须有一个空格，例如

   ```js
   import { mapState } from 'vuex'
   //      ^        ^
   ```

5. `views`和`components`中的`.vue`文件，**按照`template` `script` `style`的顺序写（vscode 快捷键：`<v` + 回车）**，**style 标签必须写 `scoped`**。

6. **单标签必须自结束**，例如应写`<div><input /></div>`而非`<div><input></div>`。组件标签必须用**驼峰命名**的写法，例如应写`<VueAdvancedChat />`而非`<vue-advanced-chat />`，当然，对于没有插槽的单标签组件，标签同样必须自结束。

7. 除`App.vue`外的`.vue`文件，不应直接隶属于`views`或`components`，**必须再套一层目录**，哪怕该目录中只有一个文件。

8. 设置 vscode 默认缩进 **2 空格**。

9. vue 语法支持的函数调用，不传参数时不写括号，例如，应写`@click="handleClick"`而非`@click="handleClick()"`

10. 标签中既有原生属性、又有 vue 语法时，原生放前面。**例外是，可以把`ref`放在最前面。**

    ```vue
    <!-- 这么写 -->
    <div class="card-item" v-for="item in items" :key="item.id"></div>
    
    <!-- 而不是这么写 -->
    <div v-for="item in items" :key="item.id" class="card-item"></div>
    ```

    标签有一坨属性时，分行写，标签的左尖括号和标签名独占一行，右尖括号独占一行，例如

    ```vue
    <div
      class="card-item" style="padding-left: 10px"
      v-for="item in items" :key="item.id"
      @click="alertMessage(item.msg)"
      @mouseover="handleHover" @mouseleave="handleUnhover"
    >
      内容
    </div>
    ```

11. 组件脚本采用 vue2 写法，**不使用 vue3 的`setup`函数**。

## 3 Candy（持续更新）

- ### 悬浮提示`v-tooltip`

  在一个双标签元素上加上这个指令，可以指定一个悬浮时的气泡提示。例如

  ```vue
  <button v-tooltip="'点我'">Click Me</button>
  ```

  效果就是按钮文字内容为“Click Me”，悬浮时会有气泡提示，内容为“点我”**。注意指令的双引号内部必须包单引号。**

## 4 重置样式

`/public/css/reset.css`已经清除了绝大多数元素的**默认样式**，如各级`h`标题的粗细和大小、`a`标签的颜色、`ul` `li`的小圆点等。

该文件引入于`/index.html`。

## 5 默认样式（持续更新）

`/public/css/index.css`设置了一些风格类型的样式，兹详述如下。

- ### 全局量

  - `--theme-mode`：颜色模式，白天 / 黑夜

  - `--theme-color`：强调色

    > `--theme-color-*`：不同透明度的强调色

- ### 按钮样式

  - 类选择器`.basic-btn`：具有一定圆角和默认大小的实心（即背景色填充了强调色、文字颜色与背景色形成对比）按钮。该按钮被悬浮时会发生一定颜色减淡变化。

  - 类选择器`.basic-btn-outline`：具有一定圆角和默认大小的空心（既背景色透明，边框和文字颜色为强调色）按钮。该按钮被悬浮时会发生一定颜色减淡变化。

- ### 输入框样式

  - 类选择器`.basic-input`：具有一定圆角和默认大小的输入框，输入框的边框和光标色都是强调色。该输入框被聚焦时边框会加粗。
  - 类选择器`.huge-input-wrapper`：巨大输入框的容器。大概率仅用一次，不详述。
  - 类选择器`.huge-input`：巨大输入框。大概率仅用一次，不详述。

- ### 其他

  - `v-tooltip`的样式
    - 动画`tooltip-zoomIn`：tooltip 出场动画
    - 动画`tooltip-zoomOut`：tooltip 离场动画
    - 类选择器`.tooltip-appear`：tooltip 出场样式
    - 类选择器`.tooltip-disappear`：tooltip 离场样式
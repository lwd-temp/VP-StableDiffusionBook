##  实战指南

这个简短的实战指南，可以让你快速了解如何合理调整参数达成目的效果。

### 场景表

竖着看

|人物|场景|数据限定|事件|
|----|------|-----|-----|
|表情| | | |
|头发|广狭选择|绘画类型|缩写词|
|眼睛|光影选择|评价限定|sfw/nsfw|
|衣着|背景主体|联想元素||
|状态|人物事件地|||
|姿势位||||
|镜头位||||


### 图转图的秘籍

无论是 3D(DAZ这样的3D模型) 还是线稿，AI只识别 **色彩** ，而不是线条，色彩直接决定图转图的效果。


### 尺寸选择

不应该将其与画质挂钩，尺寸一定程度上影响了主题，因为它潜在代表选择的类别(比如竖屏人物，横屏风景，小分辨率表情包居多)。

画质可以使用 超分指南 进行操作。

### 视角

[推荐使用 Danbooru含有的术语](https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition)

![shot](https://user-images.githubusercontent.com/75739606/198682933-25c1b2df-c573-44ea-aba7-2df4609299e5.png)
<!--
![shot](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/shot.png)
-->
>引用来自日本 Wiki 的图片，作者不明

### 跨领域术语/奇门遁甲

跨领域术语的核心逻辑就是**缩小指定的数据范围**，从画面内容之外的**平台，领域，事件**上入手来提升效果。

是的！你可以在提示中使用 [Film Glossary](https://www.owlnet.rice.edu/~engl377/film.html) [FILM GLOSSARY摄影术语](http://userhome.brooklyn.cuny.edu/anthro/jbeatty/COURSES/glossary.htm)， [Cinematic techniques摄影技术](https://en.wikipedia.org/wiki/Category:Cinematic_techniques)，以及绘画术语(类型) 来控制基本情况。

跨领域！你甚至可以使用各种惊险运动的名词来生产一些特效....比如空降

比如，景深，光圈，构图，拍摄机位，运动元素，[艺术摄影术语表中文介绍](https://gallerix.asia/pedia/photography-glossary/)

**但是**这种效果可能会带来附加作用:引入你不希望见到的风格(如实景**而不是**而二次元)数据进入图片。把握好量度。适当增加 Step 和 风格提示 来改善.

你还可以使用**平台名**来限定数据集的范围，比如 pixiv 之类的词汇。

**扩展阅读**

[推荐使用 Danbooru含有的术语](https://danbooru.donmai.us/wiki_pages/tag_group%3Aimage_composition)

[Danbooru tag组](https://danbooru.donmai.us/wiki_pages/tag_groups)

有用的电影术语 https://en.wikipedia.org/wiki/Category:Cinematic_techniques

镜头类型 https://www.bhphotovideo.com/explora/video/tips-and-solutions/filmmaking-101-camera-shot-types

电视术语  https://en.wikipedia.org/wiki/Category:Television_terminology

摄影类型 https://en.wikipedia.org/wiki/Category:Photography_by_genre

摄影术语 https://zh.wikipedia.org/zh-cn/%E9%AB%98%E9%80%9F%E6%91%84%E5%BD%B1

极限运动 https://en.wikipedia.org/wiki/Extreme_sport https://en.wikipedia.org/wiki/Category:Sports_by_type

构图艺术 https://en.wikipedia.org/wiki/Composition_(visual_arts)

### 迭代草图[^8]

这里讨论一下如何将**手绘草图**通过 Ai 绘画优化，*注意不是二次元*。

在第一次迭代中，您不需要太多 Steps，CFG 可以非常低（以获得更好的多样化结果），如果不想完全丢失草图，Denoising 应该在 0.3-0.4 左右。

在最后的迭代中，增加 Steps 和 Denoising 强度（但不超过 0.8，否则图像将被破坏，尤其是在大于 512*512 时）请参见[这里](https://github.com/AUTOMATIC1111/stable-diffusion-webui/issues/2213#issuecomment-1274137775)，同时根据需要提高 CFG 和尺寸。

你可以随时修复提示（添加或删除出现的细节）并尝试不同的采样器。

另外，你不应该在初次生成使用一个固定不变的种子？

如果你提供一个种子（而不是随机的 -1），你的图像很快就会变得过饱和、过度锐化、过度像素化..... 当然如果想微调，可以使用固定种子。

### 表情控制

我们可以使用 颜文字 来控制出图的表情！

:-) 微笑 :-( 不悦 ;-) 使眼色 :-D 开心 :-P 吐舌头 :-C 很悲伤 :-O 惊讶 张大口 :-/ 怀疑

仅支持西方颜文字，详细内容请见 [Danbooru颜文字部分](https://danbooru.donmai.us/wiki_pages/tag_group%3Aface_tags) 或 [维基百科](https://zh.wikipedia.org/wiki/%E8%A1%A8%E6%83%85%E7%AC%A6%E8%99%9F%E5%88%97%E8%A1%A8?oldformat=true)


### 多人物/单人物

打草图+IMG2IMG,这就秘诀～

宽幅画作单人物生成最好打草图，进行色彩涂抹，确定画面主体。

多人物确定人物数量，最好使用草稿/有色3d 排列 + 图生图。

人数超过三个就难以控制效果，人数大于6的图像模型里估计没有...

### 进行手掌修复

将图片送入 inpaint，使用大致相同的提示词，将关于 `手` 的提示放在前面，根据你希望它变动多少来设置降噪（如果只是希望手更完整，调至0.25以下)，然后保留步骤和 CFG 与 txt2img gen 相同。

或者仅遮住手部，以全分辨率修复，大大降低填充（它使用周围的像素来创建上下文，但只是在重新制作手部）并仅提示手部问题（详细的手部描写等）

CFG 越高，越符合提示词，降噪越高越偏离原图。


### 同人物&差分

需要用到进阶的 Img2Img 相关内容，最好的方法是准备一个带有色彩的 3D 母本模型，然后这样就可以保证基本一致。

也可以用很多提示词来限制角色内容，出很多张，挑能用的作品。

如果是表情或者是背景，可以采用进阶教程中的 重绘画 技巧。

如果你想了解一些差分的实例，[5CH日语Wiki](https://seesaawiki.jp/nai_ch/d/%c7%ed%a4%ae%a5%b3%a5%e9%a5%c6%a5%af) 提供了一个实例。

### 复刻

如果想在生成上复刻，需要相同的 `seed` ，提示词，和其他参数(甚至尺寸)。不过如果对方使用了风格化，那么你就几乎无法复刻。

~自欺欺人式复刻：图转图，降噪拉到到 0.3 以下...~

### 使用 Ai 进行设计



- 图标

[看这个](https://www.bilibili.com/video/BV1384y1B7MX)

- 表情包

表情包效果真的很好。 `sticker` 配合 西方颜文字 完成度超高！

文档编写者试了一下，以下 prompt 可以出高质量表情包。

不要对贴纸要求质量提示词。

**积极词汇**

```
1girl,sticker,Chibi,Q,
white background,
```
`masterpiece,best quality` 可加可不加，质量不够就加

`lowres` 可加可不加，不够复古就加

`Chibi` 控制角色为 Q版(大头小身)，不够 Q 就加

`sticker` 是指定风格为社交软件贴纸，必须

**消极词汇**

```
bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, jpeg artifacts, signature, watermark, username, blurry, bad feet
```
low quality 可加可不加

尺寸要求正方形。

- 立绘

<iframe src="//player.bilibili.com/player.html?aid=559362671&bvid=BV14e4y1U7r9&cid=869144379&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>
>BV14e4y1U7r9

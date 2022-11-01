## 魔法入门

请先在前面了解一下 WebUI(SD) 网页应用的参数。


### 提示词语法简介

对于NAI用户，请阅读[官网Docs](https://docs.novelai.net/image/promptmixing.html)

!!! tip
    两方的提示词语法**不通用**
    用 `()`在WebUI做增强，而在NAi用 `{}` 做增强，注意NAI不支持单个词语指定权重

    如果你想便捷转换权重，可以使用[转换服务](https://t.me/M2NM2NBot)

**表示方法**

分隔，英文半角 `,` 做分隔符，在英文逗号前后存在一个或数个空格并不影响实际使用。

混合，WebUI 使用 `|` 分隔多个关键词以混合多个要素，字面意义上的混合，可以多个使用。

增强，用 `(提示词:权重)` 在 WebUI 权重增强，增强的范围是 `0.1 ~:100`，允许小数。而NAI使用 `{}`

!!! tip
    `a ((((farm))), daytime` 的语法可能会吃掉逗号

渐变，使用 `[some1:some2:num]`

`[fantasy:cyberpunk:16]` 代表从第 16 step 后，使用 `cyberpunk` 标签替换 `fantasy`

`[to:when]` 在固定数量的step后添加 `to` 到提示 ( when)

`[from::when]` 在固定数量的step后从提示中删除 `from`( when)

转义，WebUI 对于带括号提示词比如`a (word)`  请使用 `\` 字符转义为 `a \(word\)`，这适用于带括号的Tag,防止出现本来不想要的增强效果。

降低权重，`[]` 或者 `(word:0.952)`。NAI 仅能使用 `[]`

交替（alternate prompt）[^7]，混合机。这使您可以创建动物、人或风格的混合体，每一个 step 切换一项(一步一换)，轮回渲染，`[alison brie|emma stone|elizabeth olsen|scarlett johansson|anne hathaway|emma roberts], still film` 这是WebUI 语法，在 NAI 中代表平均权重混合(前半部分和后半部分)。

!!! tip "NAI"

    NAI中不允许单独指定权重，但支持混合权重 `cat:1|happy:-0.2|cute:-0:3` 这样的语法。
    
    因为NAI使用的是 WebUI 2022 年 9 月 29 日之前的实现，所以权重增强语法是旧的 `{}` ，新的 WebUI 更改为 `()`。
    
    **换算关系**
    NAI的 [word] = WebUI(word:0.952)(0.952 = 1/1.05)

    NAI的{word} = WeUi的(word:1.05)

    NAI花括号权重为1.05/个，WebUI圆权重为1.1/个
    


### 如何书写提示词(提示)

结合法术书编写它。

- 自然语言

可以直接使用自然语言，WebUI(SD) 有自然语言处理能力(英文句子),也可以使用 颜文字 和 emoji

- 参数[^6]

将你想要的相似的提示词组合在一起，并将这些按从最重要到最不重要的顺序排列。

可以使用 艺术家，工作室，摄影术语，角色名字，风格，特效等等。这些内容可以在 上面提到的法术书(示例集)查看，这些项目在关于中可以看到。

```
图片的质量
图片的主题
他们的外表
他们的情绪
他们的衣服
他们的姿势
图片的背景
```

[为文字转图像Ai提示编写指南：A Guide to Writing Prompts for Text-to-image AI](https://docs.google.com/document/d/1XUT2G9LmkZataHFzmuOtRXnuWBfhvXDAo8DkS--8tec/edit#)

**书写长度**

- 提示不要太长，超过 100 就有失败风险。

根据 手抄本的Tip，由于GPT-3模型限制，prompt 并不是无限的，positive token 在 75-80 之间，negative 大概65，加太多会提示你 xxx of xxx are truncated，所以别人那边的圣经不要照抄，太长的咒语后半都没有意义了，所以用简易反咒就足够，除非你有特定想屏蔽的东西。

当提示超过75个`token`（比如150个`token`）时，WebUI 将分组提示词，提交多组75个 `token`。标记只具有同一集合中其他内容的上下文。这意味着您可能在第一组和第二组之间的边界处有`bule hair`，标记`blue`将在第一组中，`hair`将在第二组中。这导致了结果的不准确，因为这两个词是分开的。

新版本增加了一个选项 `Increase coherency by padding from the last comma within n tokens when using more than 75 tokens`

这个设置让程序试图通过查找最后N个标记中是否有最后一个逗号来缓解这种情况，如果有，则将所有经过该逗号的内容一起移动到下一个集合中。

!!! tip "比如"

    有词条为 `...,Comma,blue hair,PADDING,...`

    第75个词为 `blue`

    使用该选项前

    集合1:{[74]=Comma，[75]=blue}，集合2:{[76]=hair, [77]=PADDING}

    使用该选项后

    集合1:{[074]=Comma，[75]=PADDING}，集合2:{[76]=blue，[77]=hair}

    如果您的提示小于等于75个标记，不会发生分组。

**书写格式**

为了方便书写改动，多行书写的建议格式如下

```
masterpiece,
1girl,  hatsune miku, 
look at viewer,turning back,
blow wind, cyan hair, two side up, cyan eyes,eardrop,dress,
caustics, masterpiece, high resolution,
```

第一行指定作品风格类型，第二行指定人物，第三行指定动作，第四行指定场景和着装，第五放指定其他参数

以上顺序已经比较合理，但是你也可以调整提示词的顺序以产生不同的结果。 你可以手动调整，也可以 [使用 X/Y 图自动生成各种顺序](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/1607)

Ai 难以解析下划线，请少用。

**风格化**

Nai 出图默认是一种风格，你可以通过 训练风格模型，指定风格关键词等方法来创作带有特效或指定画风的图片。

[NovelAI使用教程和魔咒课堂](https://space.bilibili.com/8612008/channel/collectiondetail?sid=787691)

[人偶教室的测试记录](https://www.yuque.com/longyuye/lmgcwy)

[风格化: 32种](https://www.bilibili.com/video/BV1TP411N71t/)

更全面的指南在页尾。



### 调序编译

提示词放入的顺序就是优先级~

webui 突破 tag 75 个限制的方式是把 75 个分为一组。

出于提高可读性的目地，推荐主体往前放，接着描述装扮的词，画质提升词穿插在这些描述词之间，一般为了提高成品率要把动作、nsfw 词等改变构图的词往后放，或者手动调低权重。

以上排序是每组tag都要遵守的，所以如果后面的tag超过 75 了就应该把前面的分一部分过来。


### Batch count&batch size

`batch count` 指定训练几批次图像。

`batchsize` 中文翻译为批次大小（批次尺寸）

简单点说，批量大小将决定我们一次训练的样本数目。 batch_size将影响到模型的优化程度和速度。

还要注意 `batch size` 是为了在`内存效率`和`内存容量`之间寻找最佳平衡，因为单个 512x512 图像生成中，GPU 资源没有被充分利用。更大的图像从中获得的收益更少。

!!! info
    迭代是重复反馈的动作，神经网络中我们希望通过迭代进行多次的训练以到达所需的目标或结果。
    每一次迭代得到的结果都会被作为下一次迭代的初始值。
    一个迭代 = 一个正向通过+一个反向通过


### (提示词)影响因子[^6]
 
"调参魔法" 的一个基本技能是设置权重。

[Wiki:魔导师介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

具体规则如下

```
a (word) - 将权重提高 1.1 倍

a ((word)) - 将权重提高 1.21 倍（= 1.1 * 1.1），乘法的关系。

a [word] - 将权重减少 1.1 倍

a (word:1.5) - 将权重提高 1.5 倍

a (word:0.25) - 将权重减少 4 倍 (= 1 / 0.25)

a \(word\) - 在提示中使用文字 () 字符
```

必须使用 `()`指定，可以像这样指定权重：(text:1.4)

如果未指定权重，则假定为 `1.1`

指定权重仅适用于 `()` 而不是 `[]`，注意 `[]` 削减语法，指定单个权重仅适用于WebUI 且使用 `()`

```
> ( n ) = ( n : 1.1 )  
> (( n )) = ( n : 1.21 )  
> ((( n ))) = ( n : 1.331 )  
> (((( n )))) = ( n : 1.4641 )  
> ((((( n )))) = ( n : 1.61051 )  
> (((((( n )))))) = ( n : 1.771561 )  
```

`(cat :2 | dog)` 也就是更像猫的狗

在 WebUI 中需要使用 `()`指定权重！可以像这样指定权重：(text:1.4)。如果未指定权重，则假定为 1.1。



!!! info
    权重增加通常会占一个提示词位。在token紧张的情况下没有必要加特别多括号。
    
    过多圆括号会导致 字符 被程序吃掉，`a ((((farm))), daytime`会变成 `a farm daytime` 而没有逗号。
    
!!! tip "NAI"

    NAI中不允许单独指定权重，但支持混合权重 `cat:1|happy:-0.2|cute:-0:3` 这样的语法。
    
    因为 NAI 使用的是 WebUI 2022 年 9 月 29 日之前的实现，所以权重增强语法是旧的 `{}` ，新的 WebUI 更改为 `()`。
    
    **换算关系**
    NAI的 [word] = WebUI(word:0.952)(0.952 = 1/1.05)

    NAI的{word} = WeUi的(word:1.05)

    NAI花括号权重为1.05/个，WebUI圆权重为1.1/个

??? tip "How It Work"
    每个单词都有一个768个值的相关向量，该向量“指向”概念的方向（在768维空间中）。
    
    如果你缩放这个向量，这个概念会变得更强或更弱。

    From [Here](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2905)


### 否定提示词

WebUI(SD)网页应用会在生成时**拒绝否定提示词有关的内容**。

否定提示是一种使用稳定扩散的方式，允许用户指定他不想看到的内容，而不对模型做额外的要求。

通过指定 `unconditional_conditioning` 参数，在生成中采样器会查看去噪后符合提示的图像（城堡） 和 去噪后看起来符合负面提示的图像（颗粒状、雾状）之间的差异，并尝试将最终结果远离否定提示词。

```python
# prompts = ["a castle in a forest"]
# negative_prompts = ["grainy, fog"]

c = model.get_learned_conditioning(prompts)
uc = model.get_learned_conditioning(negative_prompts)

samples_ddim, _ = sampler.sample(conditioning=c, unconditional_conditioning=uc, [...])
```


比如使用以下提示词拒绝水印和文字内容

```
lowres, bad anatomy, bad hands, text, error, missing fingers, 
extra digit, fewer digits, cropped, worst quality, low quality, 
normal quality, jpeg artifacts, signature, watermark, username, blurry
```

还如这个例子

```
ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, 
disfigured, poorly drawn face, mutation, mutated, (extra_limb), 
(ugly), (poorly drawn hands fingers), messy drawing, morbid, 
mutilated, tranny, trans, trannsexual, [out of frame], (bad proportions), 
(poorly drawn body), (poorly drawn legs), worst quality, low quality, 
normal quality, text, censored, gown, latex, pencil
```

[官方Wiki](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Negative-prompt#examples)


#### CFG Scale/Denoising strength 契合度/降噪

**CFG Scale**

`cfg scale` 就是图像与 prompt 的契合度,Scale越高，程序对提示词越忠诚，契合度越高。

**Denoising strength 降低噪声**

`Denoising strength` 决定算法对图像内容的保留程度,可以减少对画风的变得，但也会弱化img2img能力。值越高 AI 对原图的参考程度就越低 (同时增加迭代次数)。

对于以图做图来说，低 `denoising` 意味着修正原图，高 `denoising` 就和原图就没有大的相关性了。一般来讲阈值是 0.7 左右，超过 0.7 和原图基本上无关，0.3 以下就是稍微改一些。



### 渐变标签

渐变标签，指示 WebUI 在训练中替换 Token，语法使用 `[some1:some2:num]`

`[fantasy:cyberpunk:16]` 代表从第 16 step 后，使用 `cyberpunk` 标签替换 `fantasy`

`[to:when]` 在固定数量的step后添加 `to` 到提示 ( when)

`[from::when]` 在固定数量的step后从提示中删除 `from`( when)

![sample_Gradient](https://user-images.githubusercontent.com/75739606/197822841-f7323afa-8c6a-46a2-a8e2-a1c457bb31d5.jpg)
<!--
![sample_Gradient](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/sample_Gradient.jpg)
-->
### 从图片重现提示词

程序默认会在图片中加入提示词，参数，模型信息，对于没有压缩的原图，我们可以将文件拖入 `PNG Info` 选项卡，进行提示词(Token)查看。

或者使用 [在线工具](https://spell.novelai.dev/) 查看它。


### 逆向提示词

这里有一些 **Image 逆向参数服务**，可以从图片中提取相关参数，不一定准确。

[LenKiMo_Bot](https://t.me/LenKiMo_Bot)

[DeepDanbooru](https://github.com/KichangKim/DeepDanbooru)


### 已知提示词(Token)组合 / 搜索引擎

你可以访问以下传送门获取一些优秀的参数实例！（当然，中文社区的测试群有**大量素材**，一分钟20次）

[StableDiffusion_Show](https://t.me/StableDiffusion_Show)

[cyan_ai_sese](https://t.me/cyan_ai_sese)

[LEXICA搜索引擎](https://lexica.art/?q=Miku)


### Prompt matrix 参数矩阵/要素混合

使用 | 分隔多个Tag，程序将为它们的每个组合生成一个图像。 例如，如果使用 `a busy city street in a modern city|illustration|cinematic lighting` ，则可能有四种组合（始终保留提示的第一部分）：

- a busy city street in a modern city
- a busy city street in a modern city, illustration
- a busy city street in a modern city, cinematic lighting
- a busy city street in a modern city, illustration, cinematic lighting

可以进一步在关键词后添加 :x 来指定单个关键词的权重，x 的取值范围是 0.1~100，默认为 1。

`cat :2 | dog` 也就是更像猫的狗


### 提示词原理

咒语的科学原理。

![prompt_draw](https://user-images.githubusercontent.com/75739606/198675128-c2c849d0-d024-468b-80c4-374f13e933e3.png)
<!--
![prompt_draw](https://raw.githubusercontent.com/sudoskys/StableDiffusionBook/main/resource/prompt_draw_fix.png)
-->
>By RcINS

在程序中，提示词的解析由 CLIP 处理

[WebUI的prompt_parser](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/modules/prompt_parser.py) 实现了渐变等功能

CLIP 无法处理中文，中文字符会被分解。

**关于权重的实现**：权重增加通常会占一个提示词位。


**关于渐变的实现**：到了指定 Step ，WebUI 程序会替换对应 提示词，达到渐变效果。

其他以此类推。

WebUI prompt 语法会转换为相应时间的 prompt,然后通过 embedding 交给 Ai 处理。


### 参数冲突(提示词)

比如 `sex` 包含较多姿势体位，在使用者想要特定姿势时，法术内单一的 `sex` tag就应该被删除。

同样地，`loli` Tag 附带了强画风属性，会很大地影响结果！改成 `female child` 会好一点。



### Step 迭代步数

更多的迭代步数可能会有更好的生成效果，更多细节和锐化，但是会导致生成时间变长。而在实际应用中，30 步和 50 步之间的差异几乎无法区分。

太多的迭代步数也可能适得其反，几乎不会有提高。

进行图生图的时候，正常情况下更弱的去噪需要更少的迭代步数(这是工作原理决定的)。你可以在设置里更改设置，让程序确切执行滑块指定的迭代步数。

### Samplers 采样器

目前好用的有 `eular`，`eular a`，更细腻，和`Ddim`。

推荐 `eular a` 和 `Ddim`，**新手推荐使用 `eular a`**

`eular a` 富有创造力，不同步数可以生产出不同的图片。
PS：调太高步数(>30)效果不会更好

`DDIM` 收敛快，但效率相对较低，因为需要很多 step 才能获得好的结果，**适合在重绘时候使用**

`LMS`和`PLMS`是`eular`的衍生，它们使用一种相关但稍有不同的方法（平均过去的几个步骤以提高准确性）。大概 30 step 可以得到稳定结果

`PLMS`是一种有效的LMS（经典方法），可以更好地处理神经网络结构中的奇异性


`DPM2`是一种神奇的方法，它旨在改进DDIM，减少步骤以获得良好的结果。它需要每一步运行两次去噪，它的速度大约是 DDIM 的两倍。但是如果你在进行调试提示词的实验，这个采样器效果不怎么样

`Euler` 是最简单的，因此也是最快的之一

[英文Wiki介绍](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#attentionemphasis)

[英文论坛介绍](https://www.reddit.com/r/StableDiffusion/comments/xbeyw3/can_anyone_offer_a_little_guidance_on_the/)

- 举个例子


|预览一|预览二|
|--|--|
|<img src="https://user-images.githubusercontent.com/22421310/187063145-3d4f16d7-7bd6-4804-be1c-acf228ed2507.jpg" width="400" alt="效果">|<img src="https://user-images.githubusercontent.com/75739606/197824518-f68188a3-0572-4b52-8fe7-289b6d7b640b.jpg" width="400" alt="效果">|

>不同 step 和 采样器 的不同效果


### 种子调试

实际的种子整数并不重要。它只是初始化一个定义扩散起点的随机数生成器，是一个随机初始值。

一个好的种子可以在各种提示、采样器和CFG中执行成分和颜色等内容。但是它现在作用有限。

在相同 Step ，cfg ，Seed,参数（prompts） 的情况下，生产的图片基本相同！

在同一模型和后端实现中，保持所有参数一致的情况下，相同的种子会产生同样的图片。取决于其他参数。

但是注意，**不同显卡可能会造成预料之外的不同结果**（比如精度这样的东西）

10xx 系列看起来与其他所有卡如此不同,见[这里](https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/2017#discussioncomment-3873467)

### 绘画插件

安装完毕重启程序。

#### 随机艺术家插件

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-inspiration)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-inspiration
```


#### 美学权重插件

[项目地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients)

```bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui-aesthetic-gradients extensions/aesthetic-gradients
```


#### 历史记录画廊

[项目地址](https://github.com/yfszzx/stable-diffusion-webui-images-browser)

```bash
cd extensions
git clone https://github.com/yfszzx/stable-diffusion-webui-images-browser 
```


#### Wildcards 通配符

[项目地址](https://github.com/AUTOMATIC1111/stable-diffusion-webui-wildcards)

允许使用类似 `__name__` 提示的语法，以从名为 `name.txt` 的文件中获取随机一行。 


#### Deforum

[项目地址](https://github.com/deforum-art/deforum-for-automatic1111-webui)

Deforum 的官方API，一个用于 2D 和 3D 动画的扩展脚本，supporting keyframable sequences, dynamic math parameters (even inside the prompts), dynamic masking, depth estimation and warping.

#### Stable-Diffusion-Video2Video

将 视频 投入 Img2Img,输出带有关键帧的视频。

https://github.com/Leonm99/Stable-Diffusion-Video2Video

#### Img2img Video

https://github.com/memes-forever/Stable-diffusion-webui-video

#### Artists To Study

把 https://artiststostudy.pages.dev 添加到 WebUI

https://github.com/camenduru/stable-diffusion-webui-artists-to-study

#### 美学权重评分器

计算生成图像的美学分数

https://github.com/tsngo/stable-diffusion-webui-aesthetic-image-scorer


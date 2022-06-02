---
layout: single
title: 「論文筆記」Real-time Neural Radiance Caching for Path Tracing
date: 2022-05-03 8:00:00
header:
  overlay_image: /assets/imgs/Papers/NeuralRadianceCache/header.jpg
  caption: "Thomas Müller | NVIDIA"
excerpt: 關於 NVIDIA 論文 Neural Radiance Cache 的筆記
categories:
- 論文
tags:
- 論文
- 筆記
- 程式
- 圖學
- AI
---
# Real-time Neural Radiance Caching for Path Tracing
> 來自 [NVIDIA Research https://research.nvidia.com/publication/2021-06_real-time-neural-radiance-caching-path-tracing](https://research.nvidia.com/publication/2021-06_real-time-neural-radiance-caching-path-tracing)  

關鍵字：`AI`, `Path Tracing`, `圖學`  
論文作者： `Thomas Müller`, `Fabrice Rousselle`, `Jan Novák`, `Alex Keller`  
時間：2021 / 07 / 21  

內容目前施工中
{: .notice--danger}

## Direct vs Global Illumination  
在開始談這篇論文之前，首先提一下 Direct illumination 與 Global illumination 的差異。Direct 光照又稱 local 光照，意味著光從光源打到物體後就不會再繼續往下打。而 glocal 光照則是 direct + indirect，也就是光會在場景內 bounce 非常多次 (理論上是無限次)。  
從圖中可看到，右邊的 Global illumination 相較於左邊的 local 多了很多光反射的細節，更加接近真實。那這篇論文想達到的效果就是右邊 global illumination 的效果。目前要達到這類型的光照效果是不可能的，由於涉及了光的多次反射、折射、散射等，目前的硬體無法實時的將結果運算出來。  
![](/assets/imgs/Papers/NeuralRadianceCache/DirectVSIndirect.jpg)  

## Radiance vs Irradiance
因此本文作者提出了透過 AI 去對 Radiance 做快取，讓 AI 自己學習不同位置的光能量，減少運算次數，藉此達到 real time。  
那麼問題來了，甚麼是 Radiance，甚麼是 Irradiance？

這是 wikipedia 對於 Radiance 的解釋，那簡單翻譯一下，Radiance 為光的能量，Irradiance 是相機端接收到的光能量。
```
光源的輻射率，是描述非點光源時光源單位面積強度的物理量，
定義為在指定方向上的單位立體角和垂直此方向的單位面積上的輻射通量，記為 L。
```  
![](/assets/imgs/Papers/NeuralRadianceCache/RadianceVSIrradiance.jpg)  

以往就有人針對 Irradiance 做快取，來加速運算。  
當光打到一個位置後，計算出這個點收到的光能量，並存入快取。等快取的數量夠多時，就可以依據快取內的光能量，對其他位置做內插。這樣就不用將整個螢幕內的光能量都計算出來，藉此減少運算時間。  
但這樣會遇到幾個問題：
* 光只能是 Smooth 的  
    例如因為做內插，所以光是建立在 smooth 的前提之上，所以遇到邊緣就會GG。  
* 場景不能動態  
    做快取這件事情也需要花不少時間與記憶體，因此通常是透過 precomputation 來達到加速的效果，那既然是預先運算，自然場景不能是動態的。  
* 只支援 Diffuse 材質  
* Light leakage 問題  
    在角落位置會出現漏光的問題，如下圖所示。因為在角落部分，對周圍的快取做內插時，會抓到隔壁區域的光，造成漏光。  
    ![](/assets/imgs/Papers/NeuralRadianceCache/LightLeakage.jpg)  
    > 圖片引用自 [blenderartists.org](https://blenderartists.org/t/light-leak-at-edges-inside-room-and-irradiance-volume-issues/1135864) 

## Neural Radiance Caching
那麼回過頭來看，這篇論文如何克服以上問題？以及他的終極目的？

#### 目的：
以 Real-time 做 path tracing，並且相較於其他方法要有更少的噪點。

#### 貢獻：
* 提出了 Neural Radiance Caching，由神經網路替代記憶體 Cache。  
* Efficient online self-Training  

以下是作者的 demo video，可以搭配觀看。
[https://d1qx31qr3h6wln.cloudfront.net/publications/nrc-video.mp4](https://d1qx31qr3h6wln.cloudfront.net/publications/nrc-video.mp4)  

之所以會需要用到 AI 來做快取的原因在於，如果只是單純地用記憶體或是硬碟做 Radiance caching，會很耗記憶體與頻寬，且由於場景是動態的，要如何辨別快取內的資料是否需要做更新也是個大問題。畢竟如果不做更新，可能會遇到一個 ray 打出去，以前打到的地方光被遮蔽，因此光能量很低；但當場景更動後，這個位置可能光已不被遮蔽，但舊的快取資料卻還是光被遮蔽時的資訊。
因此作者才會透過 AI 跑 online self-training，來動態更新快取內容。  
因此不同於一般熟悉的 AI 訓練流程：  
1. 收集資料  
2. 訓練  
3. 用訓練好的模型來預測  

整個 AI 模型是在 render 的過程中邊訓練邊預測的，原因就在於要讓動態的場景可以有效率的更新快取資料，pre-train 資料僅對於單一場景有用，從室內換到室外這 AI 可能就死給你看了。

### ReSTIR
容我在多嘴提一下論文的背景資料，前面提到 Global illumination 是第一層的 direct lighting + indirect lighting。而 ReSTIR 這東西主要是在改善 direct lighting 的效率，那作者的 NRC 在第一層的 ray 計算就是透過 ReSTIR 來計算，因此後面如果有對比 Nerual Radiance Cache 啟用與否的效果，就是對比 ReSTIR VS ReSTIR + Neural Radiace Cache，有興趣可以去看看這篇[論文](https://research.nvidia.com/sites/default/files/pubs/2020-07_Spatiotemporal-reservoir-resampling/ReSTIR.pdf)。  

![](/assets/imgs/Papers/NeuralRadianceCache/ReSTIR.jpg)

## Caching 機制
好終於回歸正題了，那麼 NRC 是怎麼做快取的？以及他快取的究竟是甚麼東西。
首先 NRC 與一般的 path tracing 很類似，從眼睛往視角方向依據螢幕像素打 ray，打到物件後，讓 ray 散開往下彈出去。等到彈得夠多次就能找到這個 pixel 最接近真實的顏色。  
![](/assets/imgs/Papers/NeuralRadianceCache/path_tracing.png)
而打到物件後，這顏色的決定就得依據傳說中的 rendering equation：  

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/2e9b47791ca5246c6d87db2d5ec4e023c5c71bf2)  

在這噁心的公式當中，Scatter radiance 是運算起來最麻煩的一個，它代表著光在點 $x$ 撞到物件後，往 $w$ 方向散出的能量，也是作者想要快取的東西。  

$$L_s(x, w) := \int_{S^2}{f_s(x, w, w_i) L_i(x,w_i) | cos\theta_i | dw_i}$$  

那麼快取運作的機制是這樣的，當從 Camera 打出 ray 之後，在場景中反彈個幾下後，將這條 ray 直接中止。把擊中的點 x 與 ray 的方向餵給 cache，並從 cache 獲得這個點所對應的顏色。  

![](/assets/imgs/Papers/NeuralRadianceCache/ScatteredRadiance.png)  

### 何時中止 ray？  
那麼要何時把這條 Ray 給中止呢？就是當這光能量的 aera spread 已經足夠模糊掉 cache 的 inaccuracy 時，就可以中止 ray。具體公式是這樣：

$$a(x_1...x_n) = \left({\sum{\sqrt{ \dfrac{||x_{i-1} - x_i||^2}{p(w_i|x_{i-1}, w) | cos\theta_i} }}}\right)^2 > C × \dfrac{{||x_0-x_1||}^2}{4 \pi cos \theta_1}$$  

> $p$：BSDF sampling PDF  
> $\theta_i$：$w_i$ 與 Surface normal 的夾角  
> $C$：常數，0.01 為最佳  

```
TODO...
```
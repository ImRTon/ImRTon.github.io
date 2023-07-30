---
layout: single
title: 「專案筆記」HighDynamicRange-Imaging
date: 2022-04-26 8:00:00
header:
  overlay_image: /assets/imgs/Projects/Software/VFX/PR2_ImageStitching/Results/101.jpg
  caption: "Collaborate with Yen @pnf4665jds"
excerpt: 關於 NTU Digital Visual Effects  HighDynamicRange Imaging 的專案實作筆記
categories:
- 專案
tags:
- 專案
- 筆記
- 程式
- 影像
---
# 「專案筆記」HighDynamicRange-Imaging

> Collaborate with Yen @pnf4665jds

## 成果
### 夜城　＠象山
#### 原圖
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/our_imgs/DSC00174-2.JPG)
#### Response Curve
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/Elephant_mountain_101/Response_curve.png)
#### Radiance Map
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/Elephant_mountain_101/Radiance_map.png)
#### HDR 結果
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/Elephant_mountain_101/ldr_0.2.jpg)

### 曾經風光的巨輪　＠基隆港
#### 原圖
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/our_imgs/ship_5.jpg)
#### Response Curve
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/ship/ship_response_curve.png)
#### Radiance Map
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/ship/ship_radiance_map.png)
#### HDR 結果
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/ship/result.jpg)

### 範例
#### 原圖
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/img06.jpg)
#### Response Curve
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/room/response_curve.png)
#### Radiance Map
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/room/radiance_map.png)
#### HDR 結果
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/room/results.jpg)

### Image Alignment
圖片對齊，先將所有圖片做 MTB，MTB 算法是將圖片轉成灰階後，對灰階值做排序，找到中值代表的顏色後，針對那個顏色對圖片做二值化，同時針對在 Threashold +- 10 的像素產生 Mask。
* MTB
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/doc/imgs/mtb.jpg)
* Mask
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/doc/imgs/mask.jpg)
之後對讀入的圖片依亮度做排序，選出中間值，作為 Reference image。並將所有圖片縮小 $2^{log2(min(height, width)) - 4}$ 倍。

以九宮格為移動方式
| -1, -1 | 0, -1 | 1, -1 |
| :----: | :----: | :----: |
| -1, 0 | 0, 0 | 1, 0 |
| -1, 1 | 0, 1 | 1, 1 |

將 MTB 圖片移動，對移動後的圖片做 a_img Xor b_img and mask，並取 sum()，找到 sum 最小的位置，將圖片移動。移動後，則將圖片解析度 ×2，重複以上動作直到回到圖片原始解析度大小。最終會得到圖片位移的 Offset，並依據這 Offset 做裁切。

## Response Curve
由於解 Response Curve 需要曝光時間作為參數，因此我們透過套件將圖片的 Exif 資訊讀入，可以拿到曝光時間。對其取 $log$ 後，對 RGB 三個 Channel 分別解 SVD，這邊主要參考[論文](http://www.pauldebevec.com/Research/HDR/debevec-siggraph97.pdf)附上的 Matlab Code。

``` python
x = np.linalg.lstsq(A, b, rcond=None)[0]
```
 Response Curve
![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/room/response_curve.png)

Sample 點部分有試過 Random 100 個點，以及將圖片縮到 10X10 去解，有發現縮到 10X10 的效果比較好。

## Radiance Map
Radiance Map 做法其實不難，照著公式實做就好，這邊遇到比較麻煩的問題是運算時間太久。一張 2400 萬畫素的圖片需要處理個 40 分鐘，因此後來將程式用 numpy 改寫，速度可以快到 40 秒內。

$ln E_i = \frac{\sum_{j=1}^P w(Z_{ij})(g(Z_{ij}) - ln\Delta t_j)}{\sum_{j=1}^P w(Z_{ij})}$

其中 g 函式即為剛剛求得的 Response Curve。

![](/assets/imgs/Projects/Software/VFX/PR1_HDR/results/room/radiance_map.png)

## Tone Mapping
我們使用的Tone mapping演算法是Reinhard的版本。
基本上按照公式實作Global operator的部分:

1. 首先計算整個場景的平均illuminance

    $ \bar{L}_w = \exp\begin{pmatrix}\frac{1}{N}\sum_{x,y}log(\delta + L_w(x,y))\end{pmatrix}$

2. 接著根據給定的key調整整個場景的亮度

    $ L_m(x,y) = \frac{a}{\bar{L}_w} L_w(x,y)$

3. 計算最後的結果，並將最亮的0.1% radiance mapping到1

    $ L_d(x,y) = \frac{L_m(x,y)\begin{pmatrix}1+\frac{L_m(x,y)}{L_{white}^2(x,y)}\end{pmatrix}}{1+L_m(x,y)} $

    其中 $L_{white}^2(x,y)$ 表示多少的radiance以上會被mapping到1

4. 最後將結果從 [0, 1] mapping到可以顯示的RGB範圍 [0, 255]
    ```python
    result[:, :, 0] = np.minimum(Ld * radianceMap[:, :, 0] / Lw * 255, 255)
    result[:, :, 1] = np.minimum(Ld * radianceMap[:, :, 1] / Lw * 255, 255)
    result[:, :, 2] = np.minimum(Ld * radianceMap[:, :, 2] / Lw * 255, 255)
    ```

## 心得
這份作業運用了許多生成照片背後的原理，從中學習到了包含相機的pipeline、利用多張曝光照片估算HDR的技術，以及用來生成不同影像效果的 Tonemapping 演算法。

我們也實際走訪了城市，並使用實作好的程式生成了屬於自己的HDR照片，透過參數的fine tune，觀察同樣的圖片下生成的不同效果。

此外為了加速程式的運算效率，我們也研究了 numpy 的使用方式，避免使用多個巢狀 for 迴圈，因而造成計算時間過長。加速後效果也確實令人滿意。
---
title: "作品集"
layout: single
classes: works-page
excerpt: "從研究到產品，從演算法到實體原型，把想法做成真正能運作的作品。"
sitemap: true
permalink: /works/
header:
  overlay_image: /assets/imgs/Taipei_Night.jpg
  overlay_filter: 0.55
  caption: "台北夜景"
author_profile: false
toc: false
comments: false
feature_row:
  - image_path: /assets/imgs/Papers/LSSGen/cover.jpg
    alt: "LSSGen 動態流程示意圖"
    title: "AI Research"
    excerpt: "生成式 AI、電腦視覺、時序模型與 LLM 的研究和工程實作。"
    url: "/works/#ai-software"
    btn_label: "探索 AI 研究"
    btn_class: "btn--primary"
  - image_path: https://raw.githubusercontent.com/ImRTon/Hows-The-Weather/main/docs/Image00005.jpg
    alt: "How’s the Weather 視覺化天氣判讀 App"
    title: "Personal Projects"
    excerpt: "運用 Agentic Tools，獨立完成產品從 0 到 1 的規劃、設計與實作。"
    url: "/works/#vibe-projects"
    btn_label: "探索獨立專案"
    btn_class: "btn--primary"
  - image_path: /assets/imgs/Projects/Software/3DGame/InteractivePailouModeling.jpg
    alt: "互動式牌樓建模畫面"
    title: "Visual & Interactive"
    excerpt: "電腦圖學、VFX、影像處理與遊戲，探索畫面如何被計算與互動。"
    url: "/works/#visual-interactive"
    btn_label: "探索視覺與互動"
    btn_class: "btn--primary"
  - image_path: /assets/imgs/Projects/Hardware/ElectricScooterV4/P_20210821_160935.jpg
    alt: "DIY 輕量化電動滑板車"
    title: "Hardware & Prototyping"
    excerpt: "結合機電、3D 列印與產品概念，將想法做成能夠實際運作的原型。"
    url: "/works/#hardware-prototyping"
    btn_label: "探索硬體與原型"
    btn_class: "btn--primary"
---

{% include feature_row %}

<div class="works-section-head" id="ai-software">
  <div>
    <p class="works-kicker">01 / AI Research</p>
    <h2>從研究，到落地。</h2>
  </div>
  <p>從模型研究和論文產出，到面向使用者的完整應用，這些作品展示了我前沿研究到產品落地，一路走通的能力。</p>
</div>

<h3 class="works-subhead">AI Research & Engineering</h3>

<article class="works-spotlight works-spotlight--lssgen">
  <div class="works-spotlight__body">
    <p class="works-kicker">Published Research · ICCVW 2025</p>
    <h3>LSSGen</h3>
    <p class="works-spotlight__tags"><code>Diffusion</code> <code>Flow Models</code> <code>DiT</code> <code>Latent Space Scaling</code></p>
    <p>利用 Diffusion coarse to fine 的生成特性，將前期擴散移至低解析度執行，在維持生成流程的同時加速 inference。</p>
    <div class="works-spotlight__metrics" aria-label="LSSGen 關鍵數據">
      <div class="works-metric">
        <strong>1/16<span>x</span></strong>
        <small>Computation<br>at ½ resolution</small>
      </div>
      <div class="works-metric">
        <strong>54<span>s</span><i aria-hidden="true">→</i>36<span>s</span></strong>
        <small>Faster than<br>FLUX.1-dev</small>
      </div>
    </div>
    <p class="works-spotlight__cta"><a href="https://imrton.github.io/%E8%AB%96%E6%96%87/LSSGen/" class="btn">Project Page</a></p>
  </div>
  <div class="works-spotlight__media works-spotlight__media--lssgen">
    <figure>
      <a href="/assets/imgs/Papers/LSSGen/teaser.jpg"><img src="/assets/imgs/Papers/LSSGen/teaser.jpg" alt="LSSGen 與 FLUX.1-dev、MegaFusion 的生成品質與速度比較"></a>
      <figcaption>FLUX.1-dev vs. MegaFusion vs. LSSGen（Ours）</figcaption>
    </figure>
    <figure>
      <a href="/assets/imgs/Papers/LSSGen/DynaFlow_v3.jpg"><img src="/assets/imgs/Papers/LSSGen/DynaFlow_v3.jpg" alt="LSSGen 多階段 Latent Space Scaling 生成流程架構"></a>
      <figcaption>Latent Space Scaling 多階段生成流程</figcaption>
    </figure>
  </div>
</article>

<div class="works-grid">

<article class="work-card work-card--contain" markdown="1">

#### 漫畫修補 (Inpainting) & 漫畫復原 (Restoration)
{: .no_toc}
`Stable Diffusion`, `VAE`
針對 Stable Diffusion 應用於漫畫修補時的問題進行調整，並改良內部 VAE，使其能去除老化漫畫的髒污與泛黃特徵。User Study 結果優於 LaMa、Stable Diffusion 與 Xie et al. 的漫畫 inpainting 模型。
<figure class="gallery--panorama">
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Inpainting.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Inpainting.jpg"></a>
    <figcaption>圖中影像來自漫畫烏龍派出所©</figcaption>
</figure> 
<div class="work-card__actions">
  <a href="https://imrton.github.io/%E5%B0%88%E6%A1%88/MangaInpainting/" class="btn btn--primary">Project Page</a>
</div>
</article>

<article class="work-card work-card--contain" markdown="1">

#### Ti-MAE & Transformer
{: .no_toc}
`Ti-MAE`, `Time Series`, `Transformer`  
參考 Ti-MAE 論文，使用 `PyTorch Lightning` 從頭實作 Transformer 與 Ti-MAE，透過隨機遮罩進行時間序列的自監督學習與分類。

<figure>
    <a href="/assets/imgs/Projects/Software/AI/TiMAE/TiMAE_Architecture.png"><img src="/assets/imgs/Projects/Software/AI/TiMAE/TiMAE_Architecture.png" alt="Ti-MAE 模型架構圖"></a>
</figure>
<div class="work-card__actions">
  <a href="https://github.com/ImRTon/TiMAE-Lightning" class="btn btn--primary">Source Code</a>
</div>
</article>

<article class="work-card" markdown="1">

#### AI Smart Fast Forward
{: .no_toc}
`C++`, `Video`  
在 Skywatch 實習期間，為可將 24 小時影片濃縮成最長 10 分鐘的智慧縮時演算法導入 AI，降低其對雜訊的敏感度；並同步最佳化運算流程，改善執行時間與記憶體消耗。

<figure>
    <a href="/assets/imgs/Projects/Software/SmartFF/SmartFF.jpg"><img src="/assets/imgs/Projects/Software/SmartFF/SmartFF.jpg" alt="AI Smart Fast Forward"></a>
</figure>
</article>

<article class="work-card" markdown="1">

#### Image Similarity & Semantic Search
{: .no_toc}
`CLIP`, `Milvus Vector DB`
以 CLIP 與 Milvus Vector Database 建立相似影像搜尋系統，支援使用文字描述或上傳圖片，從資料庫中找出語意或視覺上相近的影像。
<figure>
    <a href="/assets/imgs/Projects/Software/AI/ImageSimilaritySearch/Cover.png"><img src="/assets/imgs/Projects/Software/AI/ImageSimilaritySearch/Cover.png" alt="以圖片和文字進行相似影像搜尋的系統介面"></a>
</figure>
<div class="work-card__actions">
  <a href="https://imrton.github.io/%E5%B0%88%E6%A1%88/ImageSimilaritySearch/" class="btn btn--primary">Project Page</a>
</div>
</article>

<article class="work-card work-card--dark work-card--contain" markdown="1">

#### Skywatch 產品 QA 機器人
{: .no_toc}
`Llama 2`, `LLM`, `QLoRA`
挑戰在 NVIDIA GeForce RTX 2070 8GB 消費級顯示卡上部署 LLM。使用 GPT-4 產生 Skywatch 產品問答資料集，再透過 Supervised Fine-tuning 與 QLoRA 調整以 Llama 2-7B 為基礎的 Taiwan-LLM-7B，使模型能回答產品問題。

<figure class="gallery--qa">
    <a href="/assets/imgs/Projects/Software/AI/LLM/Skywatch-LLM/QA1.png"><img src="/assets/imgs/Projects/Software/AI/LLM/Skywatch-LLM/QA1.png"></a>
    <a href="/assets/imgs/Projects/Software/AI/LLM/Skywatch-LLM/QA2.png"><img src="/assets/imgs/Projects/Software/AI/LLM/Skywatch-LLM/QA2.png"></a>
</figure>
</article>

<article class="work-card work-card--contain" markdown="1">

#### 漫畫畫格 (Panel) 和對話框 (Speech Bubble) 的實例切割 (Instance Segmentation)
{: .no_toc}
`MViT`, `Detectron2`, `Instance Segmentation`  
使用 Detectron2 訓練以 MViT 為基礎的 Instance Segmentation 模型，自動辨識並切割漫畫中的畫格（Panel）與對話框（Speech Bubble）。

<figure class="half gallery--portrait">
    <a href="/assets/imgs/Projects/Software/AI/MangaSegmentation/MViT1.png"><img src="/assets/imgs/Projects/Software/AI/MangaSegmentation/MViT1.png"></a>
    <a href="/assets/imgs/Projects/Software/AI/MangaSegmentation/MViT2.png"><img src="/assets/imgs/Projects/Software/AI/MangaSegmentation/MViT2.png"></a>
    <figcaption>圖中影像來自漫畫烏龍派出所©</figcaption>
</figure>
</article>

<article class="work-card work-card--wide work-card--contain" markdown="1">

#### Car Detection and Removal of Landscape Scene
{: .no_toc}
`Mask-RCNN`, `Blender`, `2D to 3D Projection`  
以 Mask R-CNN 找出空拍影像中的車輛與街道雜物，並結合 3D 重建的相機資訊，將 2D mask 投影至場景中，避免雜物像素進入重建流程。最終產出更乾淨的 3D 街道場景，車輛辨識率接近 99%。

<figure class="gallery--poster">
	<a href="/assets/imgs/Projects/Software/AI/110_%E5%9C%B0%E6%99%AF%E8%BB%8A%E8%BC%9B%E5%B0%88%E9%A1%8C%E6%B5%B7%E5%A0%B1.jpg"><img src="/assets/imgs/Projects/Software/AI/110_%E5%9C%B0%E6%99%AF%E8%BB%8A%E8%BC%9B%E5%B0%88%E9%A1%8C%E6%B5%B7%E5%A0%B1.jpg"></a>
</figure>
</article>

</div>

<details class="works-coursework">
<summary>
  <span>Past Coursework</span>
  <strong>DLCV Projects</strong>
  <small>較早期的深度學習與電腦視覺課程作業，點擊展開</small>
</summary>

<div class="works-coursework__content" markdown="1">

<div class="works-grid">

<article class="work-card" markdown="1">

#### CNN & Semantic Segmentation
{: .no_toc}
* CNN t-SNE analysis  
<figure>
	<a href="/assets/imgs/Projects/Software/DLCV/tSNE.png"><img src="/assets/imgs/Projects/Software/DLCV/tSNE.png"></a>
</figure>  

* Satellite Semantic Segmentation  
<figure>
	<a href="/assets/imgs/Projects/Software/DLCV/Semantic%20segmentation.jpg"><img src="/assets/imgs/Projects/Software/DLCV/Semantic%20segmentation.jpg"></a>
</figure>  
<div class="work-card__actions">
  <a href="https://hackmd.io/@RTon/H1_Wtvcfs" class="btn btn--primary">Course Notes</a>
</div>
</article>

<article class="work-card work-card--wide work-card--contain" markdown="1">

#### DCGAN、WGAN、Diffusion Model & DANN
{: .no_toc}
* DCGAN  
<figure>
	<a href="/assets/imgs/Projects/Software/DLCV/DCGAN.png"><img src="/assets/imgs/Projects/Software/DLCV/DCGAN.png"></a>
</figure>  

* WGAN  
<figure>
	<a href="/assets/imgs/Projects/Software/DLCV/WGAN.png"><img src="/assets/imgs/Projects/Software/DLCV/WGAN.png"></a>
</figure>  

* Diffusion Model on MNIST dataset  
<figure>
	<a href="/assets/imgs/Projects/Software/DLCV/Diffusion.png"><img src="/assets/imgs/Projects/Software/DLCV/Diffusion.png"></a>
</figure>  

* DANN t-SNE Results  

| Type           | Domain                                                               | Class                                                               |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| MNIST-M → SVHN | ![](/assets/imgs/Projects/Software/DLCV/DANN_tSNE_M2SVHN_Domain.png) | ![](/assets/imgs/Projects/Software/DLCV/DANN_tSNE_M2SVHN_Class.png) |
| MNIST-M → USPS | ![](/assets/imgs/Projects/Software/DLCV/DANN_tSNE_M2USPS_Domain.png) | ![](/assets/imgs/Projects/Software/DLCV/DANN_tSNE_M2USPS_Class.png) |
<div class="work-card__actions">
  <a href="https://hackmd.io/@RTon/SJw676wms" class="btn btn--primary">Course Notes</a>
</div>
</article>

<article class="work-card work-card--contain" markdown="1">

#### CLIP、Image Captioning
{: .no_toc}
* Image Captioning  

| CLIPScore | 0.8990 |
| -------- | -------- |
| Predicted | a person standing on a beach with colorful kite . |
| Ground Truth | a man is walking towards his kite on the ground. |
| Image | ![](/assets/imgs/Projects/Software/DLCV/Caption_top_sourceImg.jpg) |  
<div class="work-card__actions">
  <a href="https://hackmd.io/@RTon/BkpQxeGHi" class="btn btn--primary">Course Notes</a>
</div>
</article>

<article class="work-card work-card--contain" markdown="1">

#### NeRF & Self-Supervised Learning
{: .no_toc}
* DVGO Results  
![](/assets/imgs/Projects/Software/DLCV/DVGO.gif)  
<div class="work-card__actions">
  <a href="https://hackmd.io/@RTon/H1YkYXjUj" class="btn btn--primary">Course Notes</a>
</div>
</article>

<article class="work-card work-card--wide work-card--contain" markdown="1">

#### 3D Semantic Segmentation
{: .no_toc}
* Post
<figure class="gallery--poster">
	<a href="/assets/imgs/Projects/Software/DLCV/DLCV_ntucool_final_RGB.jpg"><img src="/assets/imgs/Projects/Software/DLCV/DLCV_ntucool_final_RGB.jpg"></a>
</figure>
</article>

</div>

</div>
</details>

<div class="works-section-head" id="vibe-projects">
  <div>
    <p class="works-kicker">02 / Personal Projects</p>
    <h2>借助 Agentic Tools，把產品從 0 做到 1。</h2>
  </div>
  <p>展現產品問題定義、長任務規劃、技術選型與完整實作能力，並將 AI Agent 納入個人開發流程。</p>
</div>

<article class="works-spotlight works-spotlight--vibe">
  <div class="works-spotlight__body">
    <p class="works-kicker">Independent Android Product</p>
    <h3>How’s the Weather</h3>
    <p><code>Agentic Tools</code> <code>0→1 Product</code> <code>Kotlin</code> <code>Jetpack Compose</code> <code>Google Maps</code> <code>CWA Open Data</code></p>
    <p>一款為台灣日常移動打造的 Android 視覺化天氣判讀 App。<br>先用摘要抓住重點，再把雷達、雨量、雲層與風場直接疊在地圖上。<br>不讓冰冷的數字替你做決定，而是讓你看見天氣，自行判斷現在是否適合出門。</p>
    <p><a href="https://github.com/ImRTon/Hows-The-Weather" class="btn">Source Code</a></p>
  </div>
  <div class="works-spotlight__media">
    <a href="https://raw.githubusercontent.com/ImRTon/Hows-The-Weather/main/docs/Image00005.jpg"><img src="https://raw.githubusercontent.com/ImRTon/Hows-The-Weather/main/docs/Image00005.jpg" alt="展開的出門決策卡與雷達地圖"></a>
    <a href="https://raw.githubusercontent.com/ImRTon/Hows-The-Weather/main/docs/Image00007.jpg"><img src="https://raw.githubusercontent.com/ImRTon/Hows-The-Weather/main/docs/Image00007.jpg" alt="未來一小時累積雨量與地圖"></a>
  </div>
</article>

<article class="works-spotlight works-spotlight--expense">
  <div class="works-spotlight__body">
    <p class="works-kicker">Independent Android Product</p>
    <h3>Expense Bucket</h3>
    <p class="works-spotlight__tags"><code>Agentic Tools</code> <code>Kotlin</code> <code>Jetpack Compose</code> <code>Room</code> <code>CameraX</code> <code>ML Kit</code></p>
    <p>一款為日常消費與旅行打造的 Android 記帳 App。從消費通知與電子發票 QR Code 自動建立可編輯草稿，減少輸入負擔，同時保留每一筆交易的最終控制權。</p>
    <div class="works-spotlight__features" aria-label="Expense Bucket 核心功能">
      <span>通知與發票自動擷取</span>
      <span>信用卡回饋額度追蹤</span>
      <span>旅遊專案與多幣別預算</span>
    </div>
    <p class="works-spotlight__cta"><a href="https://github.com/ImRTon/Expense-Bucket" class="btn">Source Code</a></p>
  </div>
  <div class="works-spotlight__media works-spotlight__media--expense">
    <a href="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00009.jpg"><img src="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00009.jpg" alt="Expense Bucket 月預算水位與交易紀錄首頁"></a>
    <a href="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00004.jpg"><img src="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00004.jpg" alt="從 Android 通知自動偵測消費並等待使用者確認"></a>
    <a href="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00008.jpg"><img src="https://raw.githubusercontent.com/ImRTon/Expense-Bucket/main/docs/Image00008.jpg" alt="Expense Bucket 旅遊專案的多幣別預算與消費分類"></a>
  </div>
</article>

<div class="works-section-head" id="visual-interactive">
  <div>
    <p class="works-kicker">03 / Visual & Interactive</p>
    <h2>讓光線、像素與幾何成為體驗。</h2>
  </div>
  <p>從像素、光線與幾何的底層計算，到能夠直接操作與遊玩的互動體驗。</p>
</div>

<h3 class="works-subhead">Graphics</h3>

<div class="works-grid">

<article class="work-card" markdown="1">

#### Incremental Instant Radiosity
{: .no_toc}
`Unity Engine`, `Ray Tracing`, `Radiosity`  
<figure class="gallery--panorama">
	<a href="/assets/imgs/Projects/Software/3DGame/IncrementalInstantRadiosity.jpg"><img src="/assets/imgs/Projects/Software/3DGame/IncrementalInstantRadiosity.jpg"></a>
</figure>
<div class="work-card__actions">
  <a href="https://github.com/ImRTon/Incremental-Instant-Radiosity" class="btn btn--primary">Source Code</a>
</div>
</article>

<article class="work-card" markdown="1">

#### Interactive PailouModeling
{: .no_toc}
`Unity Engine`, `Procedure Modeling`
<figure class="gallery--16-9">
	<a href="/assets/imgs/Projects/Software/3DGame/InteractivePailouModeling.jpg"><img src="/assets/imgs/Projects/Software/3DGame/InteractivePailouModeling.jpg"></a>
</figure>
<div class="work-card__actions">
  <a href="https://github.com/ImRTon/InteractivePailouModeling" class="btn btn--primary">Source Code</a>
</div>
</article>

<article class="work-card" markdown="1">

#### 2D to 3D Maze
{: .no_toc}
`OpenGL`, `Visible-Surface Determination`  
使用 OpenGL 將 2D 迷宮轉換成 3D 場景，手動計算牆面、顏色與繪製位置，並在不使用 Z-Buffer 等 OpenGL 3D 功能的限制下完成可見面判定。
<figure class="gallery--16-9">
	<a href="/assets/imgs/Projects/Software/Graphics/Maze.png"><img src="/assets/imgs/Projects/Software/Graphics/Maze.png"></a>
</figure>
</article>

<article class="work-card" markdown="1">

#### HighDynamicRange-Imaging
{: .no_toc}
`Image Alignment using MTB`, `Solve Response Curve`, `Radiance Map`, `Tone Mapping`
將多張不同曝光的影像進行 MTB 對齊，求解相機反應曲線並建立 Radiance Map，最後透過 Tone Mapping 產生 HDR 影像。
<figure class="gallery--3-2">
	<a href="/assets/imgs/Projects/Software/VFX/PR1_HDR/results/Elephant_mountain_101/result.jpg"><img src="/assets/imgs/Projects/Software/VFX/PR1_HDR/results/Elephant_mountain_101/result.jpg" alt="象山多重曝光影像合成的 HDR 結果"></a>
</figure>
<div class="work-card__actions">
  <a href="https://imrton.github.io/%E5%B0%88%E6%A1%88/HDRImaging/" class="btn btn--primary">Project Page</a>
  <a href="https://github.com/ImRTon/HighDynamicRange-Imaging" class="btn btn--inverse">Source Code</a>
</div>
</article>

<article class="work-card" markdown="1">

#### Image Stitching
{: .no_toc}
`SIFT`
使用 SIFT 進行特徵偵測與配對，再透過影像對齊、warping、resampling 與 blending，將多張照片合成為完整全景圖。
<figure class="gallery">
    <a class="gallery__primary" href="/assets/imgs/Projects/Software/VFX/PR2_ImageStitching/Results/101.jpg"><img src="/assets/imgs/Projects/Software/VFX/PR2_ImageStitching/Results/101.jpg" alt="由多張照片拼接而成的台北夜景全景圖"></a>
</figure>
<div class="work-card__actions">
  <a href="https://imrton.github.io/%E5%B0%88%E6%A1%88/ImageStitching/" class="btn btn--primary">Project Page</a>
  <a href="https://github.com/ImRTon/VFX-ImageStitching" class="btn btn--inverse">Source Code</a>
</div>
</article>

</div>

<h3 class="works-subhead">Games</h3>

<div class="works-grid">

<article class="work-card" markdown="1">

#### Tank Battle
{: .no_toc}
`Unity Engine`, `Third Person`
<figure class="gallery--16-9">
	<a href="/assets/imgs/Projects/Software/Game/TankBattle.jpg"><img src="/assets/imgs/Projects/Software/Game/TankBattle.jpg"></a>
</figure>
</article>

<article class="work-card" markdown="1">

#### Zombie Field 2022 - First Person Shooter
{: .no_toc}
`Unreal Engine 4`, `FPS`
<figure class="half gallery--16-9">
    <a href="/assets/imgs/Projects/Software/Game/ZombieField_1.png"><img src="/assets/imgs/Projects/Software/Game/ZombieField_1.png"></a>
    <a href="/assets/imgs/Projects/Software/Game/ZombieField_2.png"><img src="/assets/imgs/Projects/Software/Game/ZombieField_2.png"></a>
</figure>
</article>

</div>

<div class="works-section-head" id="hardware-prototyping">
  <div>
    <p class="works-kicker">04 / Hardware & Prototyping</p>
    <h2>把生活觀察，做成可運作的實體。</h2>
  </div>
  <p>透過機電整合、3D 建模與快速製造，把生活觀察轉化為可以測試、操作與持續改良的實體作品。</p>
</div>

<div class="works-grid">

<article class="work-card work-card--wide" markdown="1">

#### DIY Electric Scooter v4
{: .no_toc}
`3D Printing`, `Electric Circuit`, `Motor Control`, `Lithium Battery`  
以迪卡農 Town 7 XL 為基礎，完成可折疊、全車重低於 8 kg 的輕量化電動輔助滑板車。採用可抽換式電池設計，兼顧攜帶、充電與快速補充電力。

<figure class="half gallery--4-3">
    <a href="/assets/imgs/Projects/Hardware/ElectricScooterV4/P_20210821_160935.jpg"><img src="/assets/imgs/Projects/Hardware/ElectricScooterV4/P_20210821_160935.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/ElectricScooterV4/P_20210821_160948.jpg"><img src="/assets/imgs/Projects/Hardware/ElectricScooterV4/P_20210821_160948.jpg"></a>
    <figcaption>電動滑板車</figcaption>
</figure>
</article>

<article class="work-card" markdown="1">

#### Battery Pack of Electric Scooter
{: .no_toc}
`3D Printing`, `Electric Circuit`, `Lithium Battery`  
為電動滑板車設計可抽換電池組，由 6 顆 Sanyo NCR-20700B 鋰離子電池組成 12V 系統。可連接 30W PD 充電器與 DC-DC 轉換電路，提供 60W PD 或 20W Dash/VOOC 輸出。

<figure class="gallery--4-3">
    <img src="/assets/imgs/Projects/Hardware/BatteryPackV1/P_20210821_161144.jpg" alt="電動滑板車的可抽換式鋰電池組">
</figure>
</article>

<article class="work-card work-card--wide" markdown="1">

#### 3D Printed KartRider Race Car
{: .no_toc}
`3D Printing`, `3D Modeling`  
使用 Autodesk Inventor 建模《跑跑卡丁車》中的「積木舒適 9」，再透過 3D 列印將數位模型製作為實體作品。

<figure class="gallery--car">
    <a href="/assets/imgs/Projects/Hardware/CarModel/CarFront.jpg"><img src="/assets/imgs/Projects/Hardware/CarModel/CarFront.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/CarModel/CarBack.jpg"><img src="/assets/imgs/Projects/Hardware/CarModel/CarBack.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/CarModel/CarRendered.png"><img src="/assets/imgs/Projects/Hardware/CarModel/CarRendered.png"></a>
</figure>
</article>

<article class="work-card work-card--wide" markdown="1">

#### 準時睡鬧鐘 (黑客松 MakeNTU 2020)
{: .no_toc}
`Arduino`, `24 Hours`, `黑客松`, `MakeNTU`

從發想到實作皆於 24 小時內完成。鬧鐘會在睡覺時間持續響起，直到偵測到手機已放入裝置充電；手機會被鎖在裝置內直到起床鬧鐘響起，藉此將「睡前充電」轉化成準時放下手機的行為提示。若有緊急需求，仍可透過刻意增加操作難度的反向觸控筆使用手機。

<figure class="third gallery--4-3">
    <a href="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/Clock_intro.jpg"><img src="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/Clock_intro.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/IMG_20201011_144303.jpg"><img src="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/IMG_20201011_144303.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/IMG_20201011_144322.jpg"><img src="/assets/imgs/Projects/Hardware/SleepNowAlarmClock/IMG_20201011_144322.jpg"></a>
</figure> 
</article>

<article class="work-card" markdown="1">

#### 智慧約束帶 (創創 AIoT 2022)
{: .no_toc}
`Arduino`, `App`  
與台科大醫工系及長庚科大護理系同學跨域合作，運用氣囊、橫向電動馬達與 App 管理患者的約束狀況，以降低壓瘡發生風險。作品獲得創創 AIoT 2022 佳作。

<figure class="gallery--16-9">
    <a href="/assets/imgs/Projects/Hardware/AIoT_SmartHealth/IMG20220714162119.jpg"><img src="/assets/imgs/Projects/Hardware/AIoT_SmartHealth/IMG20220714162119.jpg" alt="智慧約束帶競賽展示與實體原型"></a>
</figure>
</article>

<article class="work-card" markdown="1">

#### 被窩空調 (綠色生活創意競賽)
{: .no_toc}
`Arduino`, `App`  
與台科大電機及設計系同學合作，透過水冷式床墊與棉被直接調節睡眠環境溫度，減少以空調冷卻整個空間所需的能源。作品於綠色生活創意競賽獲得佳作。

<figure class="third gallery--4-3">
    <a href="/assets/imgs/Projects/Hardware/EMattress/IMG20191213092136.jpg"><img src="/assets/imgs/Projects/Hardware/EMattress/IMG20191213092136.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/EMattress/IMG20191208000646.jpg"><img src="/assets/imgs/Projects/Hardware/EMattress/IMG20191208000646.jpg"></a>
    <a href="/assets/imgs/Projects/Hardware/EMattress/IMG20191212054916.jpg"><img src="/assets/imgs/Projects/Hardware/EMattress/IMG20191212054916.jpg"></a>
</figure>
</article>

<article class="work-card work-card--wide" markdown="1">

#### 動物森林 (與設計系合作之桌遊)
{: .no_toc}
`Arduino`, `3D Printing`, `3D Modeling`  
與設計系同學合作完成結合卡牌與聲音互動的兒童桌遊。方形主機透過 RFID 辨識動物卡片，按下後播放對應叫聲；設計團隊負責遊戲概念與視覺，我與另一位電機系同學負責機電實作及概念優化。

<figure class="gallery--featured gallery--forest">
    <a class="gallery__primary" href="/assets/imgs/Projects/Hardware/ForestBoardGame/AnimalForest_3.jpg"><img src="/assets/imgs/Projects/Hardware/ForestBoardGame/AnimalForest_3.jpg" alt="動物森林桌遊與 RFID 互動主機完整展示"></a>
    <a class="gallery__secondary" href="/assets/imgs/Projects/Hardware/ForestBoardGame/AnimalForest_1.jpg"><img src="/assets/imgs/Projects/Hardware/ForestBoardGame/AnimalForest_1.jpg" alt="動物森林桌遊互動情境"></a>
    <a class="gallery__secondary" href="/assets/imgs/Projects/Hardware/ForestBoardGame/Circuit.jpg"><img src="/assets/imgs/Projects/Hardware/ForestBoardGame/Circuit.jpg" alt="動物森林 RFID 主機電路"></a>
</figure>
</article>

</div>

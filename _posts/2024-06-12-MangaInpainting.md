---
layout: single
title: 「專案筆記」Manga Inpainting and Restoration based on Latent Diffusion Model
date: 2024-06-12 8:00:00
header:
  overlay_image: /assets/imgs/Projects/Software/VFX/PR2_ImageStitching/Results/101.jpg
  caption: "Collaborate with Yen @pnf4665jds"
excerpt: 關於本人碩論：基於潛在擴散模型與對稱式變分自動編碼器的漫畫修補和復原之專案實作筆記
categories:
- 專案
tags:
- 專案
- 筆記
- 程式
- 影像
- AI
- Diffusion
- VAE
- Manga
- Inpainting
- Restoration
---
內容目前正在施工中
{: .notice--danger}

# 「專案筆記」Manga Inpainting and Restoration  
漫畫是種獨特的藝術創作，內容由純黑白的網點 (Screentone) 與結構線 (Structural Line) 構成，營造出不同於彩色和灰階的獨特視覺效果及意義。而漫畫，多數源自於日本，因此在其他國家，例如台灣，想要享受漫畫的樂趣，就必須透過翻譯。然而，現有的漫畫翻譯僅針對文字部分，對於漫畫中的狀聲詞皆不會翻譯。而對於互動式的漫畫，現有的[系統](https://www.ithome.com.tw/newstream/107288)也僅限於將對話框 (Speech Bubble) 依據閱讀順序放大，互動性有限。我認為這是因為目前不存在一個足夠強的 inpainting 系統，能夠將對話框底下的內容以合理的像素填上，假如存在一個足夠好的 inpainting 系統，將可以達成狀聲詞的翻譯和使對話框能夠依據閱讀順序逐一出現。除此之外，對於老舊的漫畫翻譯，還需要大量人力去將掃描下來紙張中的黃化和老化瑕疵移除，因此，本研究提出了 Manga Diffusion Inpainting Model (MDIM)，能夠對漫畫進行 inpainting 和 restoration。

## 問題  
### 空白處畫頭  
直接將 LDM 用在漫畫 Inpainting 上有著很多的問題，其中最明顯的莫過於填補頭，如下圖，可看到 LDM 會想盡辦法將人物的頭補到空白區域。你或許會想，這應該是資料有 bias 的關係吧？畢竟漫畫的圖片大多都有人物，但是，實際透過較少人物的漫畫資料集訓練後，雖然不再繼續畫頭，但是空白區域仍然出現了一堆奇怪的圖騰呀！  

<figure class="half">
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Results/Origin_SD_draw_things.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Results/Origin_SD_draw_things.jpg"></a>
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Results/Fined_SD_draw_things.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Results/Fined_SD_draw_things.jpg"></a>
</figure>

### 細節網點 (Screentone) 失真  
LDM 將 Diffusion 從 Pixel Space 轉移到 Latent Space 中，這樣的方法大幅降低了運算複雜度和記憶體的用量，然而，這樣的架構也導致了細節失真的問題。VAE 的壓縮是一種有損的壓縮，因此，當我們將圖片轉換到 Latent Space 後，再轉回 Pixel Space 時，細節會有所失真。這對於 Inpainting 來說，是一個很大的問題，尤其這個失真在網點的形狀上表現得尤為明顯，如下圖。

<figure>
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Results/VAE_diff.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Results/VAE_diff.jpg"></a>
</figure>

### 

## 模型
本研究提出的 Manga Diffusion Inpainting Model (MDIM) 模型延伸自 Latent Diffusion Model (LDM)，即大家所熟知的 Stable Diffusion，但如前一章節所提到的，LDM 無法應付漫畫，因此本研究針對這些問題，對 LDM 做了訓練上和架構上的修改之後，提出了 MDIM。以下說明 MDIM 確切的修改。  

### 訓練上的修改
Lin 等人發現了 LDM 的 Noise Scheduler 是有缺陷的，造成 LDM 無法生成太亮或是太暗的圖片，本研究引入了修正後的 Noise Scheduler，確保訓練和推理時，Signal-to-noise Ratio (SNR) 為 0，使其能夠生成純黑或是純白的圖片。  
導入了 Noise Scheduler 後，其實已經解決了很大部分的問題，但是，LDM 生成人頭的問題尚未解決，因此，我提出和導入了多個方式來改善。

1. Inpainting Mask  
首先，我以 `75%` 的機率，將 Inpainting 遮罩設為整張圖，這樣可以提升 LDM 繪圖的能力。  
2. 乾淨的漫畫  
接著，我將漫畫的對話框、文字和狀聲詞從漫畫中移除，確保這些部分不會被 Inpainting，這樣可以讓 LDM 專注在漫畫的網點和結構線上。  
3. 低 Learning Rate 和 低 Batch Size  
LDM 是一種很容易 overfitting 的模型，太高的學習率容易訓練失敗。但是，除此之外，我發現使用 [DreamBooth](https://dreambooth.github.io/) 方法訓練 LDM 時，如果資料太過單一風格，例如黑白的漫畫，那麼 Batch Size 太高也會導致訓練失敗。因此，我將 Learning Rate 設為 `1e-6`，Batch Size 設為 `4`。  
4. 提詞 (Prompt)  
提詞在 Inpainting 模型訓練中其實沒有這麼重要，影響並不到太大，本研究透過 [DeepDanBooru](https://github.com/KichangKim/DeepDanbooru) 辨識出的 Tag，隨機排列為提詞，搭配漫畫風格的提示詞，如 `"manga, manga style, comic, monochrome, " + TAGS`。  

結合以上的方法，我成功訓練出了 MDIM 模型，能夠對漫畫這類黑白分明的影像達成 SOTA 的漫畫 Inpainting。

### 高解析度 Inference  
我觀察到，LDM 於高解析度 Inference 時，其生成的內容往往比低解析度差，因此，本研究提出了Semantic Guidance Inpainting Method (SGIM)，以 Diffusion Model 的特性，透過兩階段方法來提升inpainting內容的合理性，第一階段 Semantic Guidance Inpainting (SGI)，會於低解析度進行 Inpainting，建構關鍵的結構線條；第二階段 Full Resolution Inpainting (FRI)，會以先前的低解析度結構為基礎去修復細節。避免因為高解析度特徵與訓練時不同，造成的特徵誤判，從而提高模型在高解析度下的表現。  

具體而言，在低解析度 SGI 階段，我會將影像最長邊逐步縮小到 1024 以下，此時，進行一次一般的 Inpainting，接著放大圖片，以 0.5 的 Strength，再次進行 Inpainting，此為 FRI 階段。0.5 的 Strength 意味著 Diffusion 會從一半的時間步開始進行 Denoise，輸入的圖片會在 Noise Scheduler 加上一半強度的 Noise 後，餵給 Diffusion Model 進行 Denoise，這樣 Diffusion 就能夠依據圖片內原本的內容，稍微的做修改，達到保留主要結構，但提升解析度的目的，以下這張圖展示導入 SGIM 和未導入的差異。  

<figure>
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Results/SGIM_Diff.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Results/SGIM_Diff.jpg"></a>
</figure>

### Symmetric VAE  
前面提到了 VAE 導致的失真問題，因此我提出了一個新的 VAE 架構，Symmetric VAE。之所以叫做 Symmetric VAE，是因為先前研究中，有個模型叫做 Asymmetric VAE，它藉由額外的 CNN Encoder 和增大的 Decoder，來改善失真問題。但是，這樣的做法在 512×512 的圖片中，需要大約 400MB 額外的記憶體消耗，而且還需要大量訓練才能使用。我的想法更為簡單，首先失真可以視為一種資訊的丟棄，Encoder 會學習一張影像中重要的結構，將這些重要特徵萃取出來，成為 Latent Vector。而 Decoder 擇要透過這些 Latent Vector 來重建影像。理想上，Encoder 會學習到所有重要的結構特徵，使 Decoder 能夠還原出視覺上與原本影像無差異的圖片。TODO
這個架構是一個對稱式的 VAE，即 Encoder 和 Decoder 的架構是對稱的，這樣可以保證 Encoder 和 Decoder 的對稱性，減少了壓縮和解壓縮的失真。Symmetric VAE 的 Encoder 和 Decoder 皆為 4 層的 Convolutional Neural Network，其中 Encoder 的最後一層是一個 2D Convolutional Layer，將圖片壓縮到 2D 的 Latent Space，Decoder 的最後一層是一個 1D Convolutional Layer，將 Latent Space 解壓縮回 2D 的圖片。Symmetric VAE 的架構如下圖所示。

## 比較


## References
1. https://github.com/UWbadgers16/Panoramas
2. https://gist.github.com/lxc-xx/7088609
---
layout: single
title: 「論文筆記」Common Diffusion Noise Schedules and Sample Steps are Flawed
date: 2024-07-04 8:00:00
header:
  overlay_image: /assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Header.webp
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
  caption: "Shanchuan Lin, Bingchen Liu, Jiashi Li, Xiao Yang | ByteDance Inc."
excerpt: 關於論文 Common Diffusion Noise Schedules and Sample Steps are Flawed 的筆記
categories:
- 論文
tags:
- 論文
- 筆記
- 程式
- AI
---
# Common Diffusion Noise Schedules and Sample Steps are Flawed
> 來自 [ByteDance Inc. https://arxiv.org/abs/2305.08891](https://arxiv.org/abs/2305.08891)  

關鍵字：`AI`, `Diffusion`, `Noise Schedulor`, `Image Synthesis`  
論文作者： `Shanchuan Lin`, `Bingchen Liu`, `Jiashi Li`, `Xiao Yang`  
期刊：`WACV`  
時間：2023 / 05 / 15  

## 簡介
這篇論文主要是針對目前常見的 Diffusion Model 的缺陷特性進行討論，其中更是針對 Stable Diffusion 的問題提出了原因和解決方案。  

如果你有用過 Stable Diffusion，你可能會遇到一個問題，那就是不管怎麼改 prompt，Diffusion 永遠都無法畫出很亮或是很暗的圖片。舉一個論文中的例子，論文中，作者請 Stable Diffusion 生成一張 "暗黑之子" 的圖片，結果模型吐給他的是一張明亮，看起來很善良的小孩。這怎麼看都沒有 "暗黑之子" 的感覺吧？

<figure class="half">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Child_of_dark_origin.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Child_of_dark_origin.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Child_of_dark_fix.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Child_of_dark_fix.jpg"></a>
    <figcaption>左圖為原始 Stable Diffusion 使用 Prompt "Isabella, child of dark, [...]" 生成出的結果，右圖為套用了作者的修正方法後，生成的結果。</figcaption>
</figure>

此外，在另一篇文章中，也有發現到，不管給的 Prompt 是 "Pure white"、"Pure black" 還是 "Dark Street with no light"，Diffusion 都無法正確生成符合文字敘述的圖片，以下也展示了阿湯在 SDXL、Stable Diffusion 3 和 Meta Emu 三個模型上的測試結果。  

<figure class="third">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_SDXL.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_SDXL.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_SD3.webp"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_SD3.webp"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_Emu.jpeg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureWhite_Emu.jpeg"></a>
    <figcaption>Prompt "Pure white"，最左邊的是 Stability AI SDXL 的生成結果；中間是 Stability AI Stable Diffusion 3 的生成結果；右邊是 Meta AI Emu 的生成結果。</figcaption>
</figure> 

<figure class="third">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureBlack_SDXL.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureBlack_SDXL.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureBlack_SD3.webp"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/PureBlack_SD3.webp"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Pure_Black_Emu.jpeg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/Pure_Black_Emu.jpeg"></a>
    <figcaption>Prompt "Pure black"，最左邊的是 Stability AI SDXL 的生成結果；中間是 Stability AI Stable Diffusion 3 的生成結果；右邊是 Meta AI Emu 的生成結果。</figcaption>
</figure> 

<figure class="third">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_SDXL.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_SDXL.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_SD3.webp"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_SD3.webp"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_Emu.jpeg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DarkStreet_Emu.jpeg"></a>
    <figcaption>Prompt "extremely dark street where's no light"，最左邊的是 Stability AI SDXL 的生成結果；中間是 Stability AI Stable Diffusion 3 的生成結果；右邊是 Meta AI Emu 的生成結果。</figcaption>
</figure>

所以，作者發現了導致這些問題的原因，並提出了解決方案，而這問題存在於 Diffusion 的 Noise Scheduler。  

## Diffusion Noise Scheduler
Diffusion 的訓練是將 Noise 逐步加入到圖片中，然後訓練模型在每個時間步，去猜加入的 Noise 為何。從一張乾淨的圖，逐漸加上 Noise，最後得到完全變成 Noise 的圖片，如下圖。

<figure>
    <a href="/assets/imgs/Projects/Software/AI/MDIM/Diffusion_Processes.jpg"><img src="/assets/imgs/Projects/Software/AI/MDIM/Diffusion_Processes.jpg"></a>
</figure>

而這個 Noise 的多寡，便是透過一個叫做 Noise Scheduler 的東西來控制的，這個 Scheduler 會決定每個時間步，要加入多少的 Noise。  
理想上，在時間步 T 時，圖片應該會變成完全的 Noise，不殘留任何圖片的資訊。但實際上，為了訓練的穩定性，幾乎所有的 Diffusion Model 在訓練時，是不會在時間步 T 時，將圖片變成完全的 Noise，而會殘留一些些圖片的訊號。用論文中的術語來說，就是 Signal-to-Noise Ratio (SNR) 不為 0。  

而 SNR 不為 0，就會導致 Diffusion 會去偷看圖片的訊號，有點像是在考試時，你的同學在旁邊偷看你的答案。而這些訓練圖片殘存的些微訊號則被 Diffusion 學習到了模型之中，其中，最好學的莫過於低頻訊號，也就是圖片的亮度。  
在 Inference 時，Diffusion 沒有圖片的訊號可看了，因此，它錯誤的將純 Noise 的亮度，做為生成圖片的依據，導致了上述的問題。所以，不管你怎麼改 Prompt，Diffusion 都會嘗試生成一張亮度與 Noise 一致的圖片出來，這就是為什麼，[這篇文章](https://www.crosslabs.org/blog/diffusion-with-offset-noise)將 Noise 加了個係數後，就能夠控制生成圖片的亮度。      

那你可能有問題了，為什麼這些 Noise Scheduler 會有這個問題呢？  
答案很簡單，一個理想的 Diffusion Model 應該會猜出每個時間步加入的 Noise 是吧？所以 Inference 時，當輸入為 Pure Noise 時，一個理想的 Diffusion 就該將這整陀 Noise 去除對吧？那請問，Noise - Noise = ？  
0 呀！這就很尷尬呀，Diffusion 在時間步 $T$ 時，理想上應該要將輸入 Noise 完全消除，但消除後又會導致輸出為 0，生成全黑影像。所以，為了能夠正常的生成圖片，多數 Diffusion 的 Noise Scheduler 選擇在時間步 $T$ 時，不將圖片變成完全的 Noise，而是保留一點點圖片的訊號。  

## 解決方案
那麼，怎麼解決這個問題呢？作者借鑑了 [Diffusion 蒸餾的方法](https://arxiv.org/abs/2202.00512)，讓 Diffusion 不再只預測 Noise，而是同步預測輸出的 $x_0$，讓 Diffusion 在時間步 T 時，能有目標從 Pure Noise 中還原出 $x_0$ 的訊號。因此，Diffusion 的預測目標從原本的 Noise，改為一個用係數加權的 Noise 和 $x_0$ 的混合，如以下公式。

$$
v_t = \sqrt{\bar{\alpha}_t} \epsilon - \sqrt{1 - \bar{\alpha}_t} x_0
$$

其對應的損失函數如下，其中，$\lambda_t$ 為一個預先定義好的權重係數，用於平衡不同時間步 $t$ 中，貢獻的損失，此項參數可依不同模型自行調整，在 Stable Diffusion 中，作者使用了 $\lambda_t = 1$ 的參數進行訓練。

$$
\mathcal{L} = \lambda_t \| v_t - \tilde{v}_t \|_2^2
$$

<figure>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DiffusionDistillation.png"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/DiffusionDistillation.png"></a>
    <figcaption>蒸餾的目的在於將原本一步一步的預測 Noise，改為將多個步合併，用少量的步驟完全 Diffusion DeNoise，這樣的特性被作者拿來在 SNR=0 的情況下，預測時間步 0 的 Noise。</figcaption>
</figure>

## 實務上的解決方案
那麼對應到程式上，我們該怎麼做呢？如果你跟我一樣，都是使用 `diffusers` 這個 library 來實現自己的 Diffusion 模型，那麼你只需要做[幾件事](https://huggingface.co/docs/diffusers/v0.17.1/api/schedulers/ddim#experimental-common-diffusion-noise-schedules-and-sample-steps-are-flawed)。  

1. 改用 DDIM Scheduler
改用 DDIM Scheduler，同時，將 `timestep_scaling` 改為 `trailing`，使 sampler 從最後一個時間步 $T$ 開始 sample。同時，將 `rescale_betas_zero_snr` 設為 `True`，這樣就能夠在 SNR=0 的情況下，預測時間步 0 的 Noise。
    ```python
    pipe.scheduler = DDIMScheduler.from_config(
        pipe.scheduler.config, 
        rescale_betas_zero_snr=True,
        timestep_scaling="trailing"
    )
    ```
2. 改用 `v_prediction` 和 `v_loss` 訓練模型
你可以參考 [`train_text_to_image.py`](https://github.com/huggingface/diffusers/blob/main/examples/text_to_image/train_text_to_image.py) 去修改程式碼，同時，於 command line 加入參數 `--prediction_type="v_prediction"`  
3. 重新調整 guidance_scale 參數，避免過曝
作者發現如果這樣調整模型後，在使用 classifier-free guidance 的情況下很容易讓模型產出過曝的圖片，因此，需要重新縮放 guidance_scale 參數。
    ```python
    pipe(..., guidance_rescale=0.7)
    ```

## 改善後的效果

<figure class="half">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/WhiteBack_SD.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/WhiteBack_SD.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/WhiteBack_Fix.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/WhiteBack_Fix.jpg"></a>
    <figcaption>Prompt: "Monochrome line-art logo on a white background"，左圖為 Stable Diffusion 的成果，右圖為修正後的 Stable Diffusion 成果。</figcaption>
</figure>

<figure class="half">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/ManDarkBack_SD.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/ManDarkBack_SD.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/ManDarkBack_Fix.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/ManDarkBack_Fix.jpg"></a>
    <figcaption>Prompt: "Close-up portrait of a man wearing suit posing in a dark studio, rim lighting, teal hue, octane, unreal"，左圖為 Stable Diffusion 的成果，右圖為修正後的 Stable Diffusion 成果。</figcaption>
</figure>

<figure class="half">
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/SolidBlack_SD.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/SolidBlack_SD.jpg"></a>
    <a href="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/SolidBlack_Fix.jpg"><img src="/assets/imgs/Papers/CommonDiffusionSchedulersAreFlawed/SolidBlack_Fix.jpg"></a>
    <figcaption>Prompt: "Solid black background"，左圖為 Stable Diffusion 的成果，右圖為修正後的 Stable Diffusion 成果。</figcaption>
</figure>


## Reference
* [Understanding “Common Diffusion Noise Schedules and Sample Steps are Flawed” and Offset Noise](https://isamu-website.medium.com/understanding-common-diffusion-noise-schedules-and-sample-steps-are-flawed-and-offset-noise-52a73ab4fded)  
* [Diffusion with Offset Noise](https://www.crosslabs.org/blog/diffusion-with-offset-noise)  
* [diffusers](https://huggingface.co/docs/diffusers/v0.17.1/api/schedulers/ddim#experimental-common-diffusion-noise-schedules-and-sample-steps-are-flawed)  
---
title: "關於我"
layout: single
classes:
  - wide
  - about-page
excerpt: "AI Research Engineer，專注於影像辨識與影像生成。"
sitemap: true
permalink: /about/
author_profile: false
comments: false
---

<section class="about-hero">
  <img class="about-hero__avatar" src="/assets/imgs/RTon.jpg" alt="阿湯的頭像">
  <div class="about-hero__body">
    <h1>阿湯</h1>
    <p class="about-hero__role">AI Research Engineer · Inventec AI Center</p>
    <p class="about-hero__lead">專注於電腦視覺與生成式 AI 的研究與落地，涵蓋影像辨識、影像生成與 Agentic AI，具備從演算法設計、論文發表到產品部署的完整經驗。另熟悉圖學、Unity、3D 建模、3D 列印與電路設計，能以跨領域的角度解決問題。</p>
    <div class="about-hero__actions">
      <a href="/works/" class="btn btn--primary">查看作品集</a>
      <a href="https://github.com/ImRTon" class="btn btn--inverse"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
      <a href="https://www.linkedin.com/in/tang-nick" class="btn btn--inverse"><i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn</a>
      <a href="mailto:col360785@gmail.com" class="btn btn--inverse"><i class="fas fa-envelope" aria-hidden="true"></i> Email</a>
    </div>
  </div>
</section>

<div class="about-stats" aria-label="亮點">
  <div class="about-stat">
    <strong>ICCVW</strong>
    <small>2025 論文發表 · LSSGen</small>
  </div>
  <div class="about-stat">
    <strong>arXiv</strong>
    <small>2026 預印本 · DuoAD</small>
  </div>
  <div class="about-stat">
    <strong>935</strong>
    <small>TOEIC 多益</small>
  </div>
  <div class="about-stat">
    <strong>2×</strong>
    <small>創意競賽佳作</small>
  </div>
</div>

<section class="about-section">
  <h2>研究發表</h2>
  <div class="about-pubs">
    <article class="about-pub about-pub--lssgen">
      <p class="about-kicker">ICCVW 2025</p>
      <h3>LSSGen</h3>
      <p>Leveraging Latent Space Scaling in Flow and Diffusion for Efficient Text to Image Generation。將前期擴散移至低解析度執行，在維持生成品質的同時加速 inference。</p>
      <div class="about-pub__links">
        <a href="/%E8%AB%96%E6%96%87/LSSGen/">Project Page →</a>
      </div>
    </article>
    <article class="about-pub about-pub--duoad">
      <p class="about-kicker">arXiv 2026</p>
      <h3>DuoAD</h3>
      <p>Leveraging [CLS] Dual Characteristics for Training-Free Few-Shot Anomaly Detection。只需少量正常樣本、不需訓練，即可達到 Few-Shot Anomaly Detection SOTA。</p>
      <div class="about-pub__links">
        <a href="/%E8%AB%96%E6%96%87/DuoAD/">Project Page →</a>
        <a href="https://arxiv.org/abs/2607.23924">arXiv →</a>
        <a href="https://github.com/inventec-ai-center/DuoAD">GitHub →</a>
      </div>
    </article>
  </div>
</section>

<section class="about-section">
  <h2>經歷</h2>
  <ol class="about-timeline">
    <li>
      <time>2024/10 – 至今</time>
      <strong>AI Research Engineer</strong>
      <span>英業達 Inventec Corporation · AI Center</span>
      <ul class="about-timeline__points">
        <li><b>免訓練瑕疵檢測，從研究到落地</b>：負責演算法從零到一的設計與實作（DuoAD 論文、專利申請中），打造免訓練、原生支援 4000×3000 以上之高解析度且可部署於 Edge 的瑕疵檢測方案，單張 NVIDIA A2000 僅需 &lt; 4 GB VRAM；封裝為 Python library 與 CLI，已導入筆電外觀與連接埠瑕疵檢測專案，Recall 達 99.9%。</li>
        <li><b>Agentic AI 平台</b>：獨立完成前後端（FastAPI + React）與 Agent pipeline 設計，打造瑕疵檢測流程規劃 Agent 與能自行調用 AD、SAM 等模型的 CV Agent（LangChain Deep-Agents），目前為 PoC 階段。</li>
        <li><b>Diffusion 瑕疵生成</b>：提供關鍵技術指導，涵蓋訓練方法、避免 overfitting 的核心設計與模型架構，協助團隊落地瑕疵影像生成方案。</li>
        <li><b>GPU 叢集維運</b>：Slurm 與 Open OnDemand 系統維護、UI/UX 優化與調校。</li>
      </ul>
    </li>
    <li>
      <time>2023/04 – 2024/01</time>
      <strong>RD Intern</strong>
      <span>行品 Skywatch Inc.</span>
      <ul class="about-timeline__points">
        <li>為智慧縮時演算法導入 AI，降低雜訊敏感度並最佳化執行時間與記憶體。</li>
        <li>以 QLoRA 微調 Taiwan-LLM-7B，於 8GB 消費級顯示卡部署產品 QA 機器人。</li>
      </ul>
    </li>
    <li>
      <time>2019</time>
      <strong>教學</strong>
      <span>NTUmaker 台大自造者社</span>
    </li>
  </ol>
</section>

<div class="about-columns">
  <section class="about-section">
    <h2>學歷</h2>
    <ol class="about-timeline">
      <li>
        <time>2022/02 – 2024/08</time>
        <strong>碩士 · 資訊工程研究所</strong>
        <span>國立臺灣科技大學</span>
      </li>
      <li>
        <time>2018/09 – 2022/01</time>
        <strong>學士 · 資訊工程系</strong>
        <span>國立臺灣科技大學</span>
      </li>
    </ol>
  </section>

  <section class="about-section">
    <h2>證照與獲獎</h2>
    <ul class="about-awards">
      <li><time>2022</time><span>創創 AIoT 競賽</span><strong>佳作</strong></li>
      <li><time>2022</time><span>TOEIC 多益（Reading 440 · Listening 495）</span><strong>935</strong></li>
      <li><time>2019</time><span>綠色生活創意設計大賽</span><strong>佳作</strong></li>
    </ul>
  </section>
</div>

<section class="about-section">
  <h2>技能</h2>
  <div class="about-skills">
    <div>
      <h3>Deep Learning</h3>
      <p><span>PyTorch</span><span>Diffusers</span><span>Transformers</span><span>Detectron2</span></p>
    </div>
    <div>
      <h3>Models</h3>
      <p><span>CNN</span><span>ViT</span><span>Stable Diffusion</span><span>DiT</span><span>VAE</span><span>Transformer</span><span>SAM</span><span>YOLO</span><span>Mask R-CNN</span><span>ViTDet</span></p>
    </div>
    <div>
      <h3>Agentic AI & Full-stack</h3>
      <p><span>LangChain Deep-Agents</span><span>FastAPI</span><span>React</span></p>
    </div>
    <div>
      <h3>Agentic Coding</h3>
      <p><span>Claude Code</span><span>OpenCode</span><span>Codex</span></p>
    </div>
    <div>
      <h3>Engineering & Infra</h3>
      <p><span>Python</span><span>C/C++</span><span>Docker</span><span>Slurm</span><span>Open OnDemand</span></p>
    </div>
    <div>
      <h3>3D & Interactive</h3>
      <p><span>Unity</span><span>Autodesk Inventor</span></p>
    </div>
  </div>
</section>

---
layout: single
title: 「筆記」PyTorch Lightning 於 DataModule 和 Model 之間共享參數
date: 2024-07-03 04:49:00
header:
  overlay_image: /assets/imgs/Articles/PyTorchLightning/Header.png
  caption: "RTon"
excerpt: 於 PyTorch Lightning 中，多個模組間共享參數的問題
categories:
- 筆記
tags:
- 筆記
- 程式
- AI
- PyTorch
- PyTorch Lightning
---

# PyTorch Lightning with OneCycleLR Scheduler
PyTorch Lightning 將許多訓練過程中的細節封裝起來，讓使用者可以專注在模型的設計與訓練上。而尤其搭配 `LightningCLI` 使用時，更是方便。然而，當我們在 PyTorch Lightning 中，想要於多個模組間共享參數時，你會發現似乎做不到？  

[前一篇文章](https://imrton.github.io/%E7%AD%86%E8%A8%98/PyTorchLightningOneCycleLR/)中，我們提到了在使用 OneCycleLR Scheduler 時，如何取得 dataloader 的長度，但是不可能 PyTorchLightning 都只能透過這種特定的參數去取得吧？。因此，這次我們將討論更廣泛的問題，即如何在 `LightningCLI` 中，共享參數。

假設我們有一個簡單的模型，其 `main.py` 如下：  

```python
def main():
    cli = LightningCLI(aModel, aDataModule)

if __name__ == '__main__':
    main()
```

而我的模型裡定義了一個 `num_classes` 參數，而這個參數需要透過 `DataModule` 獲得：  

```python
class MyModel(L.LightningModule):
    def __init__(
        self, 
        lr: float, 
        backbone: str = "resnet18",
        num_classes: int | None = None
    ):
        super().__init__()
        self.save_hyperparameters()

        model = create_model(backbone, num_classes)
        ...

class MyDataModule(L.LightningDataModule):
    def __init__(
        self, 
        data_path: str | Path,
        num_classes: int | None = None,
    ):
        super().__init__()

        self.num_classes = load_data(data_path)
        self.save_hyperparameters()
```

問題來了，我要怎麼把 `num_classes` 從 `DataModule` 傳到 `Model` 呢？
在 `main.py` 中，已經將模型和資料模組封裝在 `LightningCLI` 中，兩者透過 `LightningCLI` 獲取參數，因此無法直接在模型取得 `MyDataModule` 的資料。  
所以，PyTorch Lightning 提供了共享參數的方法，首先要修改 `main.py` 中的 `LightningCLI`，添加 `add_arguments_to_parser` 函式。此外，加上 `parser.link_arguments("data.ARG", "model.ARG", apply_on="instantiate")`，這行程式的意義在於將兩個參數連結起來，並且指定在 datamodule 初始後再同步：  

```python
class MyCLI(LightningCLI):
    def add_arguments_to_parser(self, parser):
        parser.link_arguments("data.num_classes", "model.num_classes", apply_on="instantiate")

def main():
    cli = MyCLI(
        MyModel, 
        MyDataModule
    )

if __name__ == '__main__':
    main()
```

然而，如果你按照 PyTorch Lightning 的[官方文件](https://lightning.ai/docs/pytorch/stable/cli/lightning_cli_expert.html)，只做了這樣的修改，你可能會發現訓練時，噴了一堆錯誤：

```bash
RuntimeError: Error while merging hparams: the keys ['num_classes'] are present in both the LightningModule's and LightningDataModule's hparams but have different values.
```

原因未知，可能是一種 bug 吧，又或是兩邊都儲存 hparams 可能導致同步出錯，總之，問題出在 `save_hyperparameters()` 上。因此，我們需要在 `MyModel` 中，將 `num_classes` 從 `save_hyperparameters()` 中移除：  

```python
class MyModel(L.LightningModule):
    def __init__(
        self, 
        lr: float, 
        backbone: str = "resnet18",
        num_classes: int | None = None
    ):
        super().__init__()
        self.save_hyperparameters(ignore=["num_classes"])

        model = create_model(backbone, num_classes)
        ...
```

這樣，就可以在 `MyModel` `MyDataModule` 之間共享參數了。

## References
* [PyTorch Lightning Argument linking](https://lightning.ai/docs/pytorch/stable/cli/lightning_cli_expert.html)  
* [PyTorch Lightning GitHub issues](https://github.com/Lightning-AI/pytorch-lightning/issues/8716)  
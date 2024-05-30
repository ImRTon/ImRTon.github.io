---
layout: single
title: 「筆記」PyTorch Lightning with OneCycleLR Scheduler
date: 2024-05-30 10:35:00
header:
  overlay_image: /assets/imgs/Articles/PyTorchLightning/Header.png
  caption: "RTon"
excerpt: 於 PyTorch Lightning 中使用 OneCycleLR Scheduler 遇到的尷尬問題
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
PyTorch Lightning 將許多訓練過程中的細節封裝起來，讓使用者可以專注在模型的設計與訓練上。而在訓練過程中，我們常常會使用到一些學習率調整的方法，例如：OneCycleLR Scheduler。然而，當我們在 PyTorch Lightning 中使用 OneCycleLR Scheduler 時，會遇到一個尷尬的問題。  

假設我們有一個簡單的模型，其 `main.py` 如下：  

```python
def main():
    cli = LightningCLI(aModel, aDataModule)

if __name__ == '__main__':
    main()
```

而我的模型裡定義了一個 scheduler：  

```python
class MLP(L.LightningModule):
    ...
    def configure_optimizers(self):
        optimizer = optim.AdamW(self.parameters(), self.hparams.lr)
        return {
            "optimizer": optimizer,
            "lr_scheduler": optim.lr_scheduler.OneCycleLR(
                optimizer, 
                max_lr=self.hparams.lr, 
                steps_per_epoch=len(train_loader)),
        }
```

問題來了，這 `train_loader` 要從哪裡獲得呢？  
在 `main.py` 中，已經將模型和資料模組封裝在 `LightningCLI` 中，兩者透過 `LightningCLI` 獲取參數，因此無法直接在模型取得 `train_loader`。當然，你也可以不要用 `LightningCLI`，但是我就是想用呀！！！  
欸嘿，別急，PyTorch Lightning 也有發現這個問題，只是它的解法藏的比較深而已，在 [Optimization](https://lightning.ai/docs/pytorch/stable/common/optimization.html#total-stepping-batches) 文件中有提到，`Trainer` 有個屬性叫做 `estimated_stepping_batches`，它會估算訓練時，呼叫 `optimizer.step()` 的次數，包含考慮 gradient accumulation，因此，只要將此參數指定到 [OneCycleLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.OneCycleLR.html#torch.optim.lr_scheduler.OneCycleLR) 的 `total_steps` 參數即可。  

```python
def configure_optimizers(self):
    optimizer = optim.AdamW(self.parameters(), self.hparams.lr)
    return {
        "optimizer": optimizer,
        "lr_scheduler": optim.lr_scheduler.OneCycleLR(
            optimizer, max_lr=self.hparams.lr, total_steps=self.trainer.estimated_stepping_batches),
    }
```

## References
* [PyTorch Lightning Optimization](https://lightning.ai/docs/pytorch/stable/common/optimization.html#total-stepping-batches)  
* [PyTorch Lightning Trainer](https://lightning.ai/docs/pytorch/stable/api/lightning.pytorch.trainer.trainer.Trainer.html#lightning.pytorch.trainer.trainer.Trainer.params.estimated_stepping_batches)  
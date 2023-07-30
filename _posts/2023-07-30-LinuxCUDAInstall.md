---
layout: single
title: 「筆記」Linux Ubuntu CUDA & cuDNN & NVIDIA-Docker 安裝
date: 2023-07-30 06:25:00
header:
  overlay_image: /assets/imgs/Articles/CUDA_Ubuntu_Docker_Installation/CUDAandUbuntu.jpg
  overlay_filter: rgba(0, 0, 0, 0.5)
  caption: "RTon | NTUST CGLab"
excerpt: Linux Ubuntu CUDA & cuDNN & NVIDIA-Docker 安裝筆記
categories:
- 安裝筆記
tags:
- 筆記
- Linux
- Ubuntu
- CUDA
- Docker
---
# Linux Ubuntu CUDA & cuDNN & NVIDIA-Docker 安裝筆記  
## Ubuntu 載點  

Ubuntu [https://www.ubuntu-tw.org/modules/tinyd0/](https://www.ubuntu-tw.org/modules/tinyd0/)  
USB 製作工具 [https://rufus.ie/zh_TW/](https://rufus.ie/zh_TW/)  

注意！安裝時，請選擇英文作為系統語言，以避免不必要的錯誤。
{: .notice--danger}

## NVIDIA Driver 安裝  

如要安裝 CUDA 可跳過此步驟
{: .notice--warning}  

```bash
sudo apt-get purge nvidia* # 移除 NVIDIA 相關 package
sudo add-apt-repository ppa:graphics-drivers
sudo apt-get update
sudo apt upgrade
```

### Server Driver  

```bash
ubuntu-drivers list
sudo apt install nvidia-driver-VERSION_NUMBER_HERE
```

## CUDA 安裝  

建議直接參考 CUDA Toolkit 官網安裝指令
[https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)
{: .notice--info}  

```bash
sudo apt-get purge nvidia* # 移除 NVIDIA 相關 package

wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.2.0/local_installers/cuda-repo-ubuntu2204-12-2-local_12.2.0-535.54.03-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-2-local_12.2.0-535.54.03-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-2-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

### 將 CUDA 加入 Path  

```bash
sudo vim /home/<user_name>/.bashrc

# Add these lines to the end of the file
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64
export PATH=$PATH:/usr/local/cuda/bin
```

### Reboot  

```bash
sudo reboot
```

### Check Installation  

```bash
nvcc -V
```

## cuDNN  

下載位置  
[https://developer.nvidia.com/rdp/cudnn-download](https://developer.nvidia.com/rdp/cudnn-download)  

### TAR Method  

Download cuDNN file  

移動到 cuDNN.tar 的資料夾路徑。  
```bash
cd ~/Downloads
```
    
Unzip file  
```bash
$ tar -xvf cudnn-linux-x86_64-8.x.x.x_cudaX.Y-archive.tar.xz
```
    
複製 cuDNN 的內容到 CUDA Library 路徑底下。  
```bash
$ sudo cp cudnn-*-archive/include/cudnn*.h /usr/local/cuda/include 
$ sudo cp -P cudnn-*-archive/lib/libcudnn* /usr/local/cuda/lib64 
$ sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
```
    
## Docker  

[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)  

### 透過 apt 安裝 Docker  
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```
    
## NVIDIA-Docker  
    
加入 NVIDIA Docker source  
```bash
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
```

{% capture notice-1 %}
如果上方的指令執行後發生錯誤，可以嘗試以下指令
    
```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/ubuntu22.04/libnvidia-container.list
sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```
    
如果 sudo apt-get update 又出現錯誤，代表 nvidia-docker.list 內已經含有 package 的 source 了，不需要再加入，因此執行以下指令移除重複的 source。  
```bash
sudo rm /etc/apt/sources.list.d/nvidia-container-toolkit.list
```
{% endcapture %}
<div class="notice--warning">{{ notice-1 | markdownify }}</div>


### 安裝 NVIDIA-Container Toolkit  
```bash
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit-base
sudo apt-get install -y nvidia-container-runtime
```
  
設置 Docker daemon 以認得 NVIDIA Container Runtime  
```bash
sudo nvidia-ctk runtime configure --runtime=docker
```
    
重啟 Docker daemon    
```bash
sudo systemctl restart docker
```
    
測試 NVIDIA-Docker 是否正確安裝  
```bash
sudo docker run --rm --runtime=nvidia --gpus all nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi
```
    
如安裝成功，應該會出現以下畫面  
```bash
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 450.51.06    Driver Version: 450.51.06    CUDA Version: 11.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla T4            On   | 00000000:00:1E.0 Off |                    0 |
| N/A   34C    P8     9W /  70W |      0MiB / 15109MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
```

### 將 Docker 權限加入使用者
```bash
sudo groupadd docker

sudo usermod -aG docker $USER
```

## Ubuntu 防火牆
[https://footmark.com.tw/news/linux/ubuntu/ubuntu-server-ufw/](https://footmark.com.tw/news/linux/ubuntu/ubuntu-server-ufw/)

允許指定 Port 連線
```bash
sudo ufw allow PORT
```

允許指定 IP 連線
```bash
sudo ufw allow from IP
# 如果 IP 設為 AAA.BBB.CCC.DDD/24 可以只比對前 24 bit
```

查看防火牆狀態
```bash
sudo ufw status
```

## Linux 掛載硬碟
https://officeguide.cc/linux-parted-create-disk-partitions-tutorial/

卦載硬碟  
```bash
sudo mount /dev/DRIVE_PARTITION MOUNT_PATH
```

卸載硬碟  
```bash
sudo umount MOUNT_PATH
```

查看所有硬碟  
```bash
lsblk
```

查看所有磁區剩餘空間
```bash
df -h
```


## 複製檔案並顯示進度條

```bash
sudo bash -c 'pv < /dev/sda > /dev/sdb'
```
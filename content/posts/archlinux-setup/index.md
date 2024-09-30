---
title: "Archlinux安装"
date: 2024-01-17T18:27:12+08:00
slug: archlinux-setup
tags: [linux]
---

Arch的安装确实照着官方教程做一遍就会了，不过每次安装总要看着wiki挺麻烦的，把整个流程记下来方便以後要安装的时候。

****

## 基本

### iwctl联网

```shell
device list # 列出网卡
station <device> scan
station <device> get-networks
station <device> connect <SSID>
```

### 硬盘分区

```shell
fdisk -l <disk>
fdisk <disk> # 进行配置
fdisk>> g # 新建GPT分区表
fdisk>> n # 新建分区
fdisk>> t # 更改分区类型 EFI: 1 swap: 19 x86-64-root: 23
fdisk>> w
```

### 格式化分区

```shell
mkfs.ext4 <root_partition>
mkfs.fat -F 32 <EFI_partition>
mkswap <swap_partition>
```

### 挂载分区

```shell
mount <root_partition> /mnt
mount <EFI_partition> /mnt/boot # 不存在则加上 --mkdir
swapon <swap_partition>
```

### 安装系统

遇上 GPG signature 的问题的话，找到 `/etc/pacman.conf` 中的 `SigLevel` 属性，添加 `TrustAll` 就得，怎么连自家的包都不信任的。

```shell
vim /etc/pacman.d/mirrorlist # Server=https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
pacstrap -K /mnt base linux linux-firmware amd-ucode intel-ucode networkmgr vim 
```

### 配置系统

```shell
genfstab -U /mnt >> /mnt/etc/fstab
arch-chroot /mnt
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
vim /etc/locale.gen # en_US.UTF-8
locale-gen
echo LANG=en_US.UTF-8 >> /etc/locale.conf
echo <hostname> >> /etc/hostname
passwd
```

### bootloader

双系统的话[先看下面](#双系统)。

```shell
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o <EFI_partition>/grub/grub.cfg
```

### Nvidia ~~fxxk you~~

```shell
pacman -S nvidia nvidia-utils nvidia-setting
```

### 桌面环境

```shell
pacman -S gnome gnome-tweak
```

## 双系统

> 先安装Windows，后安装Arch，同一个硬盘中的两个系统共用EFI分区。

在[挂载分区](#挂载分区)这一步中，`EFI_partition`是Windows安装时划分的：
```shell
mount <EFI_partition> /mnt/boot
```

在配置[bootloader](#bootloader)这一步中：
```shell
pacman -S grub efibootmanager os-prober
vim /etc/default/grub # GRUB_DISABLE_OS_PROBER=false
grub-mkconfig
```

## 参考资料

[Archlinux安装指南](https://wiki.archlinux.org/title/Installation_guide)

[Arch-Win双系统](https://wiki.archlinux.org/title/Dual_boot_with_Windows)

## Changelog

|||
|:-:|:-:|
| 2024-4-17 | #1: 踩到自己挖的坑，修补一下 |

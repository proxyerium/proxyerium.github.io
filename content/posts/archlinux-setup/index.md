---
title: "Archlinux安装"
date: 2024-01-17T18:27:12+08:00
slug: archlinux-setup
tags: [linux]
---

Archlinux wiki很完善，安装只需要照着文档做一遍就会了。不过每次安装总看wiki挺麻烦的，流程记下来方便以後安装。

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
fdisk <disk> # 进入fdisk命令行
fdisk>> g # 新建GPT分区表
fdisk>> n # 新建分区

fdisk>> t # 更改分区类型
# 1:  EFI
# 19: swap
# 23: x86-64-root
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
mount --mkdir <EFI_partition> /mnt/boot
swapon <swap_partition>
```

### 安装系统

```shell
cat <<'eof' > /etc/pacman.d/mirrorlist
Server = https://mirrors.cernet.edu.cn/archlinux/$repo/os/$arch
eof

# 安装所需软件包，ucode根据实际选择amd-ucode或intel-ucode
pacstrap -K /mnt base linux linux-firmware intel-ucode networkmgr nvim grub efibootmgr
```

### 配置系统

```shell
genfstab -U /mnt >> /mnt/etc/fstab
arch-chroot /mnt
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
vim /etc/locale.gen # 取消注释"en_US.UTF-8"
locale-gen
echo LANG=en_US.UTF-8 >> /etc/locale.conf
echo <hostname> >> /etc/hostname
passwd # 记得改密码
```

### bootloader

```shell
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o <EFI_partition>/grub/grub.cfg
```

## 其他

### N卡驱动 ~~fxxk you~~

```shell
pacman -S nvidia nvidia-utils nvidia-setting
```


## 参考资料

[Archlinux安装指南](https://wiki.archlinux.org/title/Installation_guide)

[MirrorZ校园联合镜像站](https://help.mirrors.cernet.edu.cn/archlinux/)

## Changelog

|||
|:-:|:-:|
| 2024-10-13 | 又踩到自己挖的坑，修一下 |
| 2024-4-17 | 踩到自己挖的坑，修一下 |

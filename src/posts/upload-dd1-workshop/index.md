---
title: '《暗黑地牢》上传Steam创意工坊模组'
date: 2025-02-09T13:13:34+08:00
slug: 'upload-dd1-workshop'
tags: [game]
---

先定位到本地文件夹：

在库里点开 Darkest Dungeon -> 齿轮图标 -> 管理（Manage） -> 浏览本地文件（Browse local files）

现在的位置应该是 `..\Steam\steamapps\common\DarkestDungeon\`，再进入到`_windows\`。

双击其中的 **steam_workshop_upload.exe**，此时程序会创建一个 “_sample_project.xml_”（这个 xml 可以随意改名，一般改成“_project.xml_”）：

```xml
<?xml version="1.0" encoding="utf-8"?>
<project>
 <ItemDescriptionShort/>
 <ModDataPath>c:/absolute_path_to_your_mod_folders_data_directory/data</ModDataPath>
 <Title>Your Mod Title here</Title>
 <Language>english</Language>
 <UpdateDetails>When you update your mod, this is where you would describe your latest changes</UpdateDetails>
 <Visibility>private</Visibility>
 <UploadMode>direct_upload</UploadMode>
 <VersionMajor>0</VersionMajor>
 <VersionMinor>0</VersionMinor>
 <TargetBuild>0</TargetBuild>
 <Tags>
  <Tags>tag1</Tags>
  <Tags>tag2</Tags>
 </Tags>
 <ItemDescription>Describe your mod in 8000
characters or less here!</ItemDescription>
</project>

```

并打开一个命令行形式的文档，这个文档会说明一个创意工坊模组需要什么元数据。

把这个 xml 文件移动到要做成 Mod 的那个文件夹的**根目录**。

然後按需修改对应的元数据，值得注意有三个必填项：

- `<ModDataPath>` Mod 文件夹在本机的绝对路径
- `<Visibility>` Mod 在创意工坊的访问权限
- `<UploadMode>` 上传方式，通常“direct_upload”就行

填好以後把 project.xml 拖进窗口，等待程序处理完成後，xml 里会多一个 steam 给这个 Mod 分配的唯一`<PublishedFileId>`。完毕。

还有一点，後续 Mod 有更新的话记得也是在这个文件夹里做改动，依旧注意`<ModDataPath>`是否有效。

## 遭遇问题

> 拖文件进去後窗口自动关闭，然後无事发生

应该是权限问题，以管理员身份运行 steam_workshop_upload.exe 即可；

如果管理员身份打开的窗口不能拖放文件，那就用命令行的方式打开，路径作为参数传入即可：

```powershell
steam_workshop_upload.exe "C:\path_to_mod_folder\project.xml"
```

## 参考资料

[Steam Community - Modding Guide \[Official\]](https://steamcommunity.com/sharedfiles/filedetails/?id=819597757)

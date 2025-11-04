# 关于

本人是一个喜欢计算机、二次元和打游戏的高中生。

主力系统是Arch Linux + Hyprland的组合，喜欢Catppuccin的Mocha主题。

目前我还没想好要在这个关于界面中写什么内容，就先说下这个网站是怎么弄的吧。由于本人用的是Linux，所以下面提到的有些操作可能无法再Windows下正常运行（Mac的话应该没问题）。

## 本站搭建

首先，这个博客用的框架是[Astro](https://astro.build/)，主题是[Fuwari](https://github.com/saicaca/fuwari)。然后将这个博客的源代码放在GitHub上，在通过Cloudflare的Pages功能生成静态网页和相应的域名。

配置完成后，每次要新增文章（post）的话只需要运行一个脚本（并被我绑定了快捷键执行），然后通过这个脚本创建新的post。发布的话我通过zoxide快速切换到本博客的根目录，然后`git commit -m "$(date) update" && git push`同步到GitHub上。之后Cloudflare会自动检测GitHub仓库的更新，然后自动生成更新后的内容。

通过Fuwari搭建的教程有很多，这里就不多重复别人的内容了。我参考的教程是B站[二叉树树](https://space.bilibili.com/325903362)的博客[Fuwari静态博客搭建教程 - AcoFork Blog](https://blog.2b2x.cn/posts/fuwari/)，我这边就提下需要注意的地方。

当你把模板仓库复制到自己的账号下时，可以把仓库的名称改为你希望的域名，比如说我希望我的域名是`ttthuan-blog.pages.dev`，那么我仓库的名字就可以设置成`ttthuan-blog`。这一点和Cloudflare自动分配的域名有关。

GitHub这个网站在国内经常无法访问，但是过段时间就可以正常访问了，所以如果进不去的话可以过个几分钟再试试。当你通过git克隆到本地时记得通过的方式SSH，虽然上面的教程说是推荐SSH，但是我强烈建议使用SSH连接，之后推送更改的时候就不容易发生网络问题，导致无法正常推送。

![image-20251103182536875](./about.assets/image-20251103182536875.png)

如果没有配置SSH的GitHub连接方式？去必应上搜“GitHub”和“SSH”等关键词来查查怎么配置吧。虽然可能会花点时间，但这一切都是值得的，之后可以一劳永逸地避免很多问题。

这个教程中提到了在MarkText中导入图片的方式，因为本人使用的是Typora，就顺便分享下我Typora的图片导入设置吧：

![image-20251103183150826](./about.assets/image-20251103183150826.png)

我估计其他的编辑器也大差不差，反正有几点需要注意的：

- 使用相对路径

- 在相对路径前添加`./`

- 把图片复制进`./$(filename).assets`的话可以比较方便地管理每篇post的附件

- 如果你文章的名字中间有空格，比如说`My Blog.md`的话，图片会复制到`./My Blog.assets`中，这会导致图片的路径中出现空格。Typora可以自动处理这些空格，以便正确地渲染图片，但是fuwari无法自动处理，你需要手动将`![img](./My Blog.assets/img.png)`中的空格替换成`%20`，也就是：`![img](./My%20Blog.assets/img.png)`

  > 对于外部链接的话也同理，有时候fuwari无法处理有空格的链接，你需要将链接中的空格替换成`%20`

如果要使用开源的markdown编辑器的话我推荐MarkText和Obsidian，商业软件的话就Typora。

参考了以下大佬的博客改造：

- [对Fuwari进行一些小的改动 - 伊卡的记事本](https://ikamusume7.org/posts/frontend/some_small_code_changes/)
- [在Fuwari中添加评论功能(带黑暗模式) - 伊卡的记事本](https://ikamusume7.org/posts/frontend/comments_with_darkmode/)

目前我魔改了一下创建新post的脚本，如果直接运行`npm run new-post`，不带任何参数的话会启动一个交互式，创建新post的界面。同时，也可以通过传入参数的方式直接创建post：

使用方式：

```shell
npm run new-post <post-name>

# 可选参数：
-t	--title         <post-title>
-d	--description   <post-description>
--tags	            <tags>              format: '#tag_1 #tag_2'
-c	--category      <category>
--lang              <lang>              'zh_CN' or 'en'
```

你可以使用下面的脚本替换原来`scripts/new-post.js`中的内容：

```js
/* This is a script to create a new post markdown file with front-matter */

import fs from "fs"
import path from "path"
import { Command } from "commander"
import inquirer from "inquirer"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function createPostContent(title, description, tags, category, lang, fileName) {
  const publishedDate = getDate()
  
  // Parse tags from string like "#tag1 #tag2" to array
  let tagsArray = []
  if (tags) {
    tagsArray = tags.split(/\s+/).filter(tag => tag.trim() !== '').map(tag => {
      // Remove # prefix if present
      return tag.replace(/^#/, '').trim()
    })
  }

  return `---
title: ${title || fileName}
published: ${publishedDate}
description: '${description || ""}'
image: ''
tags: [${tagsArray.map(tag => `"${tag}"`).join(", ")}]
category: '${category || ""}'
draft: false
lang: '${lang || ""}'
---
`
}

async function createPostInteractive() {
  console.log("Create New Post")
  
  const questions = [
    {
      type: "input",
      name: "fileName",
      message: "File name:",
      default: "Leave it blank to cancel",
      validate: (input) => {
        if (input == "Leave it blank to cancel") {
          process.exit(0)
        }
        return true
      }
    },
    {
      type: "input",
      name: "title",
      message: "Post title:",
      default: (answers) => answers.fileName
    },
    {
      type: "input",
      name: "description",
      message: "Post description (optional):",
      default: ""
    },
    {
      type: "input",
      name: "tags",
      message: "Tags (Format: #tag_1 #tag_2) (optional):",
      default: ""
    },
    {
      type: "input",
      name: "category",
      message: "Category (optional):",
      default: ""
    },
    {
      type: "list",
      name: "lang",
      message: "Language:",
      choices: ["zh_CN", "en", ""],
      default: "zh_CN"
    }
  ]

  const answers = await inquirer.prompt(questions)
  return createAndSavePost(answers.fileName, answers.title, answers.description, answers.tags, answers.category, answers.lang)
}

function createAndSavePost(fileName, title, description, tags, category, lang) {
  // Add .md extension if not present
  const fileExtensionRegex = /\.(md|mdx)$/i
  if (!fileExtensionRegex.test(fileName)) {
    fileName += ".md"
  }

  const targetDir = "./src/content/posts/"
  const fullPath = path.join(targetDir, fileName)

  if (fs.existsSync(fullPath)) {
    console.error(`Error: file ${fullPath} already exists!`)
    process.exit(1)
  }

  // recursive mode creates multi-level directories
  const dirPath = path.dirname(fullPath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  const content = createPostContent(title, description, tags, category, lang, fileName)
  fs.writeFileSync(path.join(targetDir, fileName), content)

  console.log(`The file ${fullPath} is successful created!`)
}

async function main() {
  const program = new Command()

  program
    .name("new-post")
    .description("Create new post from interactive TUI or arguments")
    .version("1.0.0")

  program
    .argument("[fileName]", "filename (without the extension)")
    .option("-t, --title <title>", "Post title")
    .option("-d, --description <description>", "Post description")
    .option("--tags <tags>", "Tags (format: '#tag_1 #tag_2')")
    .option("-c, --category <category>", "Category")
    .option("--lang <lang>", "Language (zh_CN or en)", "zh_CN")
    .action(async (fileName, options) => {
      if (fileName) {
        // Use command line arguments
        createAndSavePost(fileName, options.title, options.description, options.tags, options.category, options.lang)
      } else {
        // No arguments provided, use interactive mode
        await createPostInteractive()
      }
    })

  try {
    await program.parseAsync(process.argv)
  } catch (error) {
    console.error("ERROR:", error.message)
    process.exit(1)
  }
}

main()
```


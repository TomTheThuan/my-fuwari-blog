---
title: 交互式创建fuwari模板文章的脚本
published: 2025-11-08
description: '本人不大会JavaScript，不过经常看有些项目能很优雅地使用交互式的方式创建新项目，所以就让AI在原有脚本的基础上添加了这个功能'
image: ''
tags: ["计算机", "技术", "分享", "技术", "AI"]
category: '本站记录'
draft: false
lang: 'zh_CN'
---

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

你可以使用下面的脚本替换原来`scripts/new-post.js`中的内容，或者看我放在GitHub的代码[ttthuan-blog/scripts/new-post.js](https://github.com/TomTheThuan/ttthuan-blog/blob/main/scripts/new-post.js)：

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


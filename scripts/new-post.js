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

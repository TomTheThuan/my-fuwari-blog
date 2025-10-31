---
title: Array 数组
published: 2024-11-18
description: '对于数组的简单介绍'
image: ''
tags: ["CSCCA", "学校", "笔记", "计算机"]
category: 'CSCCA'
draft: false
lang: 'zh_CN'
---

An array is a data structure containing several elements of the same data type, these elements can be accessed using the same identifier name. The position of each element in an array is identified using the array’s index. 

数组是包含多个相同数据类型元素的数据结构，这些元素可以使用相同的标识符名称进行访问。数组中每个元素的位置都使用数组的索引来标识。

> Elements 元素：数组中的每一个数据被成为一个“元素”
>
> Index 索引：可以简单理解为一个元素在数组中的序号

- 一个数组储存**一组**数据**类型相同**的数据
- 可以通过**同一个标识符**（数组名）来访问其中的元素
- 每个元素在数组中的位置是唯一的，这个位置被称作“**索引**”

```pseudocode
// Create/declare an array called MyArray that contains 20 integer elements
DECLARE MyArray: ARRAY[1:20] OF INTEGERS

// Change the value of an element in array
MyArray[9] <- 28

// Output an element in array
OUTPUT MyArray[9]  // Outputs 28
```

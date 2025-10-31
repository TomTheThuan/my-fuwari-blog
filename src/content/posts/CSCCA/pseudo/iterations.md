---
title: Iterations 迭代
published: 2024-10-15
description: '结合伪代码介绍什么是迭代'
image: ''
tags: ["CSCCA", "计算机", "学校", "笔记"]
category: 'CSCCA'
draft: false
lang: 'zh_CN'
---

When some actions performed as part of an algorithm need repeating this is called iteration. Loop structures are used to perform the iteration.

当某些指令需要重复多次的时候就可以使用循环语句。

循环语句的类型：

1. Count-controlled (FOR) loops
2. Post-condition (REPEAT) loops
3. Pre-condition (WHILE) loops

## Count-controlled (FOR) loops - FOR循环

A set number of repetitions

当**已知**要执行多少次循环的时候一般使用FOR循环

```txt
吃一个苹果
吃一个苹果
吃一个苹果
```

```txt
重复三次：
	吃一个苹果
结束重复
```

```txt
FOR index <- 1 TO 3
    OUTPUT index
NEXT index
// Outputs: 1 2 3
```

## Post-condition (REPEAT) loops - 后置条件循环

A repetition, where the number of repeats is not known, that is completed at least once

让循环结束的条件**会在循环中出现**，所以循环内的内容会至少重复一次

```txt
吃一个苹果
吃一个苹果
吃一个苹果
```

```txt
重复一件事情：
	吃一个苹果
直到吃了三个苹果
```

```txt
index <- 1
REPEAT
    OUTPUT index
    index <- index + 1
UNTIL index > 3
// Outputs: 1 2 3
```

## Pre-condition (WHILE) loops - 前置条件循环 WHILE循环

A repetition, where the number of repeats is not known, that may never be completed

在**满足某个条件**下进行循环

```txt
吃一个苹果
吃一个苹果
吃一个苹果
```

```txt
在没有吃到三个苹果时重复：
	吃一个苹果
结束重复
```

```txt
index <- 1
WHILE index <= 3 DO
    OUTPUT index
    index <- index + 1
ENDWHILE
// Outputs: 1 2 3
```

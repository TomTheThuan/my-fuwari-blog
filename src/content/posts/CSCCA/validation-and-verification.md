---
title: Test data, Validation and Verification
published: 2024-11-11
description: '介绍什么是测试数据，什么是合法性验证和内容确认'
image: ''
tags: ["CSCCA", "学校", "计算机", "笔记"]
category: 'CSCCA'
draft: false
lang: 'zh_CN'
---

> 情景假设：你现在要写一个录入学生成绩的程序，每位学生要输入自己的姓名和学生id，然后输入自己的成绩。
>
> - 学生的成绩区间为0～100分，且不能有小数点。
> - 学生的姓名必须要大于2个字母并且不能多于30个字母
> - 学生ID由8位数字开头，并且以两位英文字符结尾，例如`00000000AB`

## Validation 合法性检测

Validation is the automated checking by a program that data is reasonable before it is accepted into a computer system. 验证是程序在数据被计算机系统接受之前自动检查它是否合理。

经过合法性检测，程序会将符合要求的数据进行下一步的计算（运算），如果数据不符合要求则会拒绝这个数据，让用重新输入。

### Range check 范围检测

A range check checks that the value of a number is between an upper value and a lower value. 检测数据的大小是否在最大值和最小值之间。

> 我们需要用range check 来检测用户输入的成绩是否在0～100之间。
>
> 条件：当`StudentMark >= 0 AND StudentMark <= 100`时接受数据，否则拒绝或让用户重新输入。

### Length check 长度检测

用于检测用户输入的内容长度是否符合要求。

在pseudocode中，LENGTH()用于获取一个字符串的长度：

```
String <- "Pseudocode"
LENGTH(String)  // 10
```

> 我们需要确保输入的姓名长度必须大于等于3，并且要不超过30。
>
> 条件：当`LENGTH(StudentName) > 2 AND LENGTH(StudentName) <= 30`时接受数据
>
> 我们还需要确保学生的ID长度必须等于10。
>
> 条件：当`LENGTH(StudentID) = 10`时接受数据

### Type check 类型检查

A type check checks that the data entered is of a given data type. 类型检查检查输入的数据是否为给定数据类型。

数据类型：INTEGER, REAL, CHAR, STRING, BOOLEAN

>  类型检测可以检测用户输入的成绩是否为整数

### Presence check 存在检查

A presence check checks to ensure that some data has been entered and the value has not been left blank. 存在检查检查以确保已输入某些数据并且该值未留空。

> 用户必须要输入他们的姓名、ID和成绩，不能留空
>
> 条件：当`输入的内容  <> ""`时，验证通过

### Format check 格式检测

A format check checks that the characters entered conform to a pre-defined pattern. 格式检查检查输入的字符是否符合预定义的模式。

> 学生ID需要是8位数字开头，并且以两位英文字符结尾

### Check digit 校验数字

A check digit is the final digit included in a code; it is calculated from all the other digits in the code. 校验位是代码中包含的最后一位数字;它是根据代码中的所有其他数字计算得出的。

## Verification 用户输入验证

Verification is checking that data has been accurately copied from one source to another. 验证是检查数据是否已从一个源准确复制到另一个源。

### Double entry 二次输入

The data is entered twice. 重复输入两次数据。

![image-20241111180803301](./Test%20data,%20Validation%20and%20Verification.assets/image-20241111180803301.png)

> 可以让用户输入两次成绩来确保输入成绩的正确性

### Screen/visual check 视觉检查

A screen/visual check is a manual check completed by the user who is entering the data. 屏幕/视觉检查是由输入数据的用户完成的手动检查。

当用户完成输入时，将用户输入的结果显示在屏幕上，让用户确认自己输入的内容是否正确。

> 可以在用户结束输入自己的姓名和ID后显示用户输入的内容，并让用户确认其中的内容是否正确。

## Test data

Test data is used to test the functionality of an algorithm. 测试数据是用来检测程序功能性的数据。

Types of test data 测试数据的种类: 

- normal data 正常数据
- abnormal test data (erroneous test data) 异常测试数据
- extreme data 极限数据
- boundary data 边界数据

> 这里我以成绩作为要测试的数据，成绩必须符合：`StudentMark >= 0 AND StudentMark <= 100`

### Normal data 正常数据

Data that is accepted by a program. 正常数据是会被程序接受的数据。

当我们输入正常数据时，我们预期程序能正确地计算出我们期望的结果。如果程序给出的结果是错误的，那么说明这个程序有问题。

> 在这个情景下，正常数据包括但不限于：`1, 23, 82, 29, 40, 90`

### Abnormal data 异常数据

Data that is rejected by a program. 异常数据应该被程序拒绝掉。

异常数据不应该被用于计算结果，所以正常情况下程序会提示用户输入的内容不符合要求。

> 异常数据的例子：`"six", 99.5, 1000, TRUE, -2, 40.0`

### Extreme data 极限数据

The largest/smallest data value that is accepted by a program. 极限数据是程序能接受的最大值和最小值。

极限数据仍然属于正常数据的范畴，但是是最大的正常数据和最小的正常数据。（所以说极限数据是特殊的正常数据）

> 在这个例子中极限数据只有两个：`0`和`100`

### Boundary data 边界数据

The largest/smallest data value that is accepted by a program and the corresponding smallest/largest rejected data value. 程序接受的最大/最小数据值以及相应的最小/最大拒绝数据值。

At each boundary two values are required: one value is accepted and the other value is rejected. 在每个边界上需要两个值：一个值被接受，另一个值被拒绝。

**注意！边界数据是成对出现的。**

> 边界数据为`-1, 0`和`100, 101`

---

![Test data](./Test%20data,%20Validation%20and%20Verification.assets/testdata.svg)

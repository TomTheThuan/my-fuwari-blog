---
title: IGCSE Computer Science - Paper 2 Sample Code (22/fm/2018)
published: 2024-12-10
description: '我对22/fm/2018这张卷子中编程题写的示例代码'
image: ''
tags: ["CSCCA", "学校", "计算机", "资料"]
category: 'CSCCA'
draft: false
lang: 'zh_CN'
---

这段代码可以通过[Pseudocode Pro](https://www.pseudocode.pro/editor)来测试运行。

```pseudocode
// 0478/22 Feb/Mar 2018

// StudentSubjects储存每个学生报的班，格式：[学生序号，学生选的第几节课]
DECLARE StudentSubjects: ARRAY[1:60, 1:2] OF INTEGER
DECLARE StudentNames: ARRAY[1:60] OF STRING  // 储存所有学生的名字
DECLARE AllSubjects: ARRAY[1:5] OF STRING  // 储存每个Subject的名字
DECLARE SubjectStu: ARRAY[1:5, 1:60] OF STRING  // 储存每个班里学生的名字，格式：[课程索引，学生姓名]
DECLARE SubjectsStuNo: ARRAY[1:5] OF INTEGER  // 储存每个班里学生的数量
DECLARE FullStudents: ARRAY[1:120] OF STRING  // 储存全部多出来的学生
DECLARE TotalSparePlace: INTEGER  // 储存班级中空位的总数
DECLARE TotalUnallocatedStu: INTEGER  // 储存多出来的学生的总数

DECLARE i, j, k, Counter: INTEGER  // 意义不大的一些临时变量
DECLARE line: STRING  // 意义不大的一些临时变量


// 设置每个班的人数上限，当成常量来用（问就是不会定义常量）
DECLARE SUBSCRIBE_LIMIT: INTEGER
SUBSCRIBE_LIMIT <- 30

// 初始化变量
AllSubjects[1] <- "Computer Science"
AllSubjects[2] <- "Physics"
AllSubjects[3] <- "Chemistry"
AllSubjects[4] <- "History"
AllSubjects[5] <- "Geography"

// 将每个班级中的人数设为0
FOR i <- 1 TO 5
    SubjectsStuNo[i] <- 0
NEXT i

// 初始化空位人数和未分配人数
TotalSparePlace <- 0
TotalUnallocatedStu <- 0

OUTPUT "***TASK ONE***"

// Task 1

// 依次询问60名学生
FOR i <- 1 TO 60
	// 读取学生的姓名
    OUTPUT "Enter the name of student ", i
	INPUT StudentNames[i]
	
	// 询问他们要选什么课
    FOR j <- 1 TO 2
    	// 读取课程编号
        OUTPUT "Enter the subject ", j, " for the student ", i
        INPUT StudentSubjects[i,j]
        
        // 将课程编号作为SubjectsStuNo的索引，将那个班级的人数+1
        SubjectsStuNo[StudentSubjects[i,j]] <- SubjectsStuNo[StudentSubjects[i,j]] + 1
		
		// 添加学生到SubjectStu中
		//
		// 值得注意的点：这里取了个巧，将SubjectsStuNo[StudentSubjects[i,j]]————也就是学生选的那门课
		// 的人数作为SubjectStu的第二个索引。因为当前那门科目的人数正好是第几个选那门课的人，所以可以直接用
		// 那门课的人数作为索引将当前的学生添加到SubjectStu这个数组中。
		//
        SubjectStu[StudentSubjects[i,j], SubjectsStuNo[StudentSubjects[i,j]]] <- StudentNames[i]
    NEXT j
NEXT i

// 输出每门科目的人数
//
// 用一个类型为String的数组和一个类型为Integer的“互相对应”的数组可以同时使用，省去单独定义每个科目的数组的
// 麻烦。“互相对应”就是说，比如说这AllSubjects在索引为2的位置上为'Physics'，那么在SubjectsStuNo索引为2
// 的位置上储存的正好是选择Physics科目的人数。
//
FOR i <- 1 TO 5
    OUTPUT "The number of students in ", AllSubjects[i], " is ", SubjectsStuNo[i]
NEXT i

OUTPUT ""
OUTPUT "***TASK TWO***"
OUTPUT ""

// Task 2

// 有个人和我说Task 2中要输出一个表格，所以我就写了个表格头，但是我后来查了只需要用list列表的形式输出信息就行
// 了。不过这个既然写了就不改了，应该没有什么大问题。
OUTPUT "Subject    Number of Students    Names" 
Counter <- 0  // Counter用于储存未分配学生的数量，以后会用

// 遍历5个科目，为每门科目统计学生数量和学生姓名
FOR i <- 1 TO 5
	// 如果要连接两个字符串的话用符号'&'，例如'photo'&'synthesis'等于'photosynthesis'
    line <- AllSubjects[i] & "    " & SubjectsStuNo[i] & "    "

	// 从SubjectsStuNo中获取当前科目的人数，如果超过20人则标记为满员
    IF SubjectsStuNo[i] > 20 THEN  // Task 3
    	// 将当前班级中的空位加到空位的总数上
        TotalSparePlace <- TotalSparePlace + SubjectsStuNo[i] - 20
    ENDIF

	// 将这个科目的人数储存到临时变量k中
    k <- SubjectsStuNo[i]
    FOR j <- 1 TO k  // 循环总数为当前科目的人数
        line <- line & SubjectStu[i,j] & " "  // 将参加这个课的学生添加到表格之中
        
        // 检测当前学生是否超额
        IF j > SUBSCRIBE_LIMIT THEN
            Counter <- Counter + 1  // 将超额人数+1
            FullStudents[Counter] <- SubjectStu[i,j]  // 将超额学生的名字储存到数组中
            TotalUnallocatedStu <- TotalUnallocatedStu + 1  // Task 3
        ENDIF
    NEXT j

	// 如果报名人数超额了则在line前标记一下
    IF SubjectsStuNo[i] > SUBSCRIBE_LIMIT THEN
        line <- "(Oversubscribed) " & line
    ENDIF
    
    // 输出
    OUTPUT line
NEXT i

OUTPUT ""

// 输出需要重新选课（或者说是超额了的学生）
OUTPUT "These are the students who need to change a subject:"
FOR i <- 1 TO Counter  // Counter中存有为未配学生的数量，循环次数视此数量而定
	
	// FullStudent中可能会同时存有两个相同的学生名称，这种情况是因为这个学生选的两个课都超额了。为了避免直接
	// 遍历列表时输出两次同样的学生，这个循环里在遇到一个学生时检查有没有重复的学生，如果有重复的学生的话会将
	// 这个学生的设置为''（空值），这样一来只有FullStudents[i]（当前学生）不为空值时才输出这名学生的信息。

	// 检测当前内容是否为空
    IF FullStudents[i] <> "" THEN
        k <- 2  // 总共选的课
        line <- FullStudents[i]  // 用变量line暂时储存学生的名字
        
        // 重新遍历数组FullStudents，试图找出重复的名字。(1 TO i)里的内容必定检测过，所以在检测部分中没必
        // 要再次检测，而(i TO Counter)是没有检测过的内容，所以只需要遍历(i TO Counter)就行了。
        FOR j <- i TO Counter  
            IF line = FullStudents[j] THEN
                k <- k -1  // 如果检测到数组中有当前学生，就给他的能上的课-1
                FullStudents[j] <- ""  // 将检测过的元素设置为空
            ENDIF
        NEXT j
        
		// 输出信息
        OUTPUT line，"'s allocated group number:", k
    ENDIF
NEXT i

OUTPUT ""
OUTPUT "**TASK THREE**"
OUTPUT ""

// Task 3

// 总共有的空位和总共未报课的学生已经在前面的循环中计算出来了，这边只要再算一下它们的差值，判断满足与否就行
IF TotalSparePlace - TotalUnallocatedStu < 0 THEN
    OUTPUT "The number of spare places is enough to cover the unallocated student!!!"
ELSE
    OUTPUT "The number of spare places is NOT enough to cover the unallocated student :("
ENDIF

```

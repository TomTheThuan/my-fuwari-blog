---
title: IGCSE Computer Science - Paper 2 Sample Code (23/mj/2024)
published: 2025-02-25
description: '我对23/mj/2024这张卷子中编程题写的示例代码'
image: ''
tags: ["CSCCA", "学校", "计算机", "资料"]
category: 'CSCCA'
draft: false
lang: 'zh_CN'
---

这段代码可以通过[Pseudocode Pro](https://www.pseudocode.pro/editor)来测试运行。

```pseudocode
// Question 9

// Input the number of games
REPEAT
	OUTPUT "How many games have been played:"
	INPUT Played
UNTIL Played <= 18

// Team names
FOR Index <- 1 TO 10
	OUTPUT "Enter the name:"
	INPUT Teams[Inedx]

	// Record the number of won, drawn and lost
	// (Include the validation)
	OUTPUT "Enter the number of won, drawn and lost:"
	INTPUT Won, Drawn, Lost
	WHILE Won + Drawn + Lost <> Played DO
		OUTPUT "Enter again:"
		INTPUT Won, Drawn, Lost
	ENDWHILE

	// Save the date in to Results[]
	Results[Index, 1] <- Won
	Results[Index, 2] <- Drawn
	Results[Index, 3] <- Lost

	// Calculate the total point
	Results[Index, 4] <- 3 * Won + 1 * Drawn
NEXT Index

// Sort the array
// (Bubble Sort)
Flag <- TRUE
WHILE Flag = TRUE DO
	Flag <- FALSE
	FOR Sort <- 1 TO 9
		IF Result[Sort, 4] < Result[Sort + 1, 4] THEN

			// Sawp two values
      		TempString <- Teams[Sort] 
            Temp1 <- Results[Sort, 1] 
            Temp2 <- Results[Sort, 2] 
            Temp3 <- Results[Sort, 3] 
            Temp4 <- Results[Sort, 4] 
            Teams[Sort] <- Teams[Sort + 1, 1] 
            Results[Sort, 1] <- Results[Sort + 1, 1] 
            Results[Sort, 2] <- Results[Sort + 1, 2] 
            Results[Sort, 3] <- Results[Sort + 1, 3] 
            Results[Sort, 4] <- Results[Sort + 1, 4] 
            Teams[Sort + 1] <- TempString 
            Results[Sort + 1, 1] <- Temp1 
            Results[Sort + 1, 2] <- Temp2 
            Results[Sort + 1, 3] <- Temp3 
            Results[Sort + 1, 4] <- Temp4

			Flag <- TRUE
		ENDIF
	NEXT Sort
ENDWHILE

// Count the number of teams with the highest points
Count <- 1
Finish <- TRUE
REPEAT 
	IF Result[Count, 4] = result[Count + 1, 4] THEN 
		Count <- Count + 1
	ELSE
		Finish <- True
	ENFIF
UNTIL Finish = TRUE

// Output the result 
FOR Index <- 1 to Count
	OUTPUT "Winning Team(s): ", Teams[Index]
NEXT Index
OUTPUT "Winning Points: ", Results[1 , 4]
```

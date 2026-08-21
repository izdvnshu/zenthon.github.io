/* ZENTHON — Python examples (file 6 of 6): CLASS 11 PROGRAMS */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f6-001", cat: "class11", title: "All arithmetic operators", desc: "Runs all six arithmetic operators on two numbers: addition, subtraction, multiplication, division, modulo and exponent. Each result is stored in its own variable and printed on a separate line.", code: `num1 = 12
num2 = 13

add=num1+num2
difference=num1-num2
product=num1*num2
quitient=num1/num2
remainder=num1%num2
exponent=num1**num2
print(difference)
print(add)
print(product)
print(quitient)
print(remainder)
print(exponent)`, output: `-1
25
156
0.9230769230769231
12
106993205379072`, explain: "num1 and num2 hold 12 and 13. Six variables store the result of one operator each, then six print calls show them in order. Division always produces a float, and 12 raised to 13 is the huge integer 106993205379072." },

{ id: "f6-002", cat: "class11", title: "Arithmetic operators with labels", desc: "The same six arithmetic operators, but every printed result carries a label describing which operation was done. Labels make the output easy to read without counting lines.", code: `num1 = 12
num2 = 10

add=num1+num2
difference=num1-num2
product=num1*num2
quitient=num1/num2
remainder=num1%num2
exponent=num1**num2
print("the sum of two number" , add)
print("the difference of two number" , difference)
print("the product of two number"  , product)
print("the quitient of two number" , quitient)
print("the remainder of two number"  , remainder)
print("the exponent of two number"  , exponent)`, output: `the sum of two number 22
the difference of two number 2
the product of two number 120
the quitient of two number 1.2
the remainder of two number 2
the exponent of two number 61917364224`, explain: "Each print call takes two arguments: a string label and the computed value. print places a single space between them. 12 divided by 10 gives 1.2, while 12 raised to 10 is 61917364224." },

{ id: "f6-003", cat: "class11", title: "Relational operators on strings", desc: "Relational operators compare two strings character by character using their ASCII codes. Here Good and god are tested with not equal, less than, greater than and equal. Every comparison returns a boolean.", code: `str1="Good"
str2="god"
n1,n2=1,10
print(str1!=str2)
print(str1<str2)
print(str1>str2)
print(str1==str2)`, output: `True
True
False
False`, explain: "The strings differ, so not equal is True and equal is False. Uppercase G has ASCII code 71 while lowercase g has 103, so Good is smaller than god, making the less-than check True and greater-than False." },

{ id: "f6-004", cat: "class11", title: "Compound assignment operators", desc: "Compound assignment combines an operation with assignment: a += 1 adds 1 to a, and a *= 2 doubles a. The value of a keeps changing through the program because each line reads and updates it.", code: `a = 6
a += 1
print(a)
a *= 2
print(a)`, output: `7
14`, explain: "a starts at 6. a += 1 adds one, making 7, which is printed. Then a *= 2 doubles the current value 7 to 14, which is printed next. Compound operators are shorthand for a = a + 1 and a = a * 2." },

{ id: "f6-005", cat: "class11", title: "Joke with a punch line", desc: "A joke is printed only after the user presses Enter. The input function waits for the key press, and its return value is ignored because the joke is already stored in a variable.", code: `joke = "Why don't scientists trust atoms? Because they make up everything."

i=input("Press enter")
print (joke)`, output: `Why don't scientists trust atoms? Because they make up everything.`, explain: "The joke string is stored in the variable joke before anything is printed. input pauses the program until the user types something and presses Enter. After the pause, print displays the stored joke." },

{ id: "f6-006", cat: "class11", title: "Days left in the current month", desc: "Asks for today's date and prints how many days remain in a 31-day month. The date is read as an integer and subtracted from 31. The result is printed with a sentence.", code: `day = int(input("Enter today's date"))
remaining_day= 31-day
print("there are" , remaining_day,"days left")`, output: `there are 27 days left`, explain: "input returns a string, so int converts it to a number before subtraction. For day 4, 31 minus 4 is 27. The print call joins the label, the number and the ending word with spaces." },

{ id: "f6-007", cat: "class11", title: "Output using one variable", desc: "A single print statement uses just one of the variables, while the other variable stays unused in the program. The expression num1 - 137 is computed directly inside the print call.", code: `num1=7
num2=3
print(num1-137)`, output: `-130`, explain: "num1 stores 7 and num2 stores 3, but only num1 is used. Python evaluates 7 minus 137 inside the print call, giving -130. Declaring num2 without using it is allowed and has no effect." },

{ id: "f6-008", cat: "class11", title: "Print with empty separator", desc: "The sep parameter of print is set to an empty string, so two values are joined with no space between them. This merges 2323 and 2300 into one long number-like string.", code: `x=2323
print(x,x-23,sep="")`, output: `23232300`, explain: "x is 2323 and x - 23 is 2300. With sep set to an empty string, print writes the two values back to back, producing 23232300 on one line. Without sep, a space would appear between them." },

{ id: "f6-009", cat: "class11", title: "Average of 5 subjects", desc: "Reads marks of five subjects as floats and computes their average. All five inputs are added together and divided by 5. The average is printed after the label.", code: `sub1 = float(input("Enter the marks of sub1;"))
sub2 = float(input("Enter the marks of sub2;"))
sub3 = float(input("Enter the marks of sub3;"))
sub4 = float(input("Enter the marks of sub4;"))
sub5 = float(input("Enter the marks of sub5;"))
AVERAGE = (sub1+sub2+sub3+sub4+sub5)/5
print (AVERAGE , "the average marks of 5 subject is:")`, output: `96.6 the average marks of 5 subject is:`, explain: "float converts each input so decimal marks like 90.5 work correctly. The sum of the five marks is divided by 5 inside parentheses, which guarantees the division happens last. The average 96.6 is printed before the label." },

{ id: "f6-010", cat: "class11", title: "Height in cm to inches and foot", desc: "Converts a height in centimetres into inches and whole feet. Inches are found by dividing by 2.54, and feet use floor division by 12 so only full feet count. Both results are printed.", code: `height = float(input("enter your height in centimeter :"))
inch = height/2.54
foot = inch//12
print("your height in inches is :",inch)
print("your height in foot is :" ,foot)`, output: `your height in inches is : 57.08661417322835
your height in foot is : 4.0`, explain: "For 145 cm, dividing by 2.54 gives 57.0866 inches. Floor division with // drops the decimal, so 57 inches becomes 4 feet with the leftover inches discarded. The foot result is a float because inch is a float." },

{ id: "f6-011", cat: "class11", title: "Area of triangle", desc: "Computes the area of a triangle from its base and height. The formula half times base times height is written directly with the 1/2 factor. The area is printed with a label.", code: `base = float(input("enter base of triangle"))
height = float(input("enter height  of triangle"))
area = 1/2*base*height
print(area, "area of triangle")`, output: `72.0 area of triangle`, explain: "Both inputs are converted to floats. The expression 1/2 times base times height follows normal left-to-right rules for multiplication and division. For base 12 and height 12, the area is 72.0." },

{ id: "f6-012", cat: "class11", title: "Simple interest and compound interest", desc: "Calculates simple interest with the formula P R T / 100, then compound interest with the formula P times (1 + r/n) raised to n times t. The rate is divided by 100 to turn a percentage into a decimal.", code: `# Simple Interest
p = float(input("Enter Principle Amount: "))
r = float(input("Enter Rate of Interest: "))
t = float(input("Enter Time in years: "))

# Fixed: added '*' between variables
si = (p * r * t) / 100
print("The Simple Interest is:", si)

print("-" * 30)

# Compound Interest
p = float(input("Enter the Principle Amount: "))
r = float(input("Enter the Rate Of Interest (in %): "))
t = float(input("Enter Time in years: "))  # Fixed: added missing time variable
n = float(input("Enter the number of times compounded per year: "))

# Formula expects rate as a decimal (e.g., 5% -> 0.05)
r_decimal = r / 100

ci = p * (1 + (r_decimal / n)) ** (n * t)

print("The Compound Interest amount is:", ci)`, output: `The Simple Interest is: 72000.0
------------------------------
The Compound Interest amount is: 218003.60382769097`, explain: "Simple interest multiplies principle, rate and time, then divides by 100. The line print(\"-\" * 30) prints a divider of 30 dashes. For compound interest the rate becomes a decimal, and exponentiation ** applies the power of n times t." },

{ id: "f6-013", cat: "class11", title: "Gross profit and net profit", desc: "Takes the cost of goods, revenue and operating cost from the user. Gross profit is revenue minus cost, and net profit also subtracts operating cost. A third value expresses net profit as a percentage of revenue.", code: `c = int(input("Enter the cost of goods : "))
r = int(input("Enter the revenue :"))
o = int(input("Enter the Operated cost :"))
gp = r-c
np = r-c-o
npp = np/r*100
print("The Gross Profit is",gp ,"The net profit is :" , np , "The net profit " ,npp)`, output: `The Gross Profit is 0 The net profit is : -12 The net profit  -100.0`, explain: "For cost 12, revenue 12 and operating cost 12, gross profit is 0 because revenue equals cost. Net profit is 12 minus 12 minus 12, giving -12. The percentage -12/12 times 100 is -100.0, meaning a full loss." },

{ id: "f6-014", cat: "class11", title: "Escape sequence for backslash", desc: "A backslash is a special character that starts escape sequences, so printing a single backslash needs two backslashes in the string. The double backslash escapes itself and prints as one backslash.", code: `print('\\\\')`, output: `\\`, explain: "Inside a string, the first backslash escapes the second one. Python therefore reads \\\\ as a single literal backslash character. The program prints exactly one backslash on its own line." },

{ id: "f6-015", cat: "class11", title: "Newline escape sequence", desc: "The \\n escape sequence represents a newline inside a string. Printing a string that contains only \\n writes a blank line. Escape sequences let special characters like newlines and tabs live inside quotes.", code: `print('\\n') #for blank space`, output: `
`, explain: "The string '\\n' holds the two characters backslash and n, which Python interprets as one newline character. print writes that newline and then adds its own, producing a blank line in the output." },

{ id: "f6-016", cat: "class11", title: "Unicode escape for the Om symbol", desc: "Unicode escape sequences let a string contain any character by its code point. The sequence \\u0950 is the Devanagari letter OM. When printed, it displays as the ॐ symbol.", code: `print("\\u0950")`, output: `ॐ`, explain: "The four hex digits after \\u name a Unicode code point. 0950 is the code for the Om symbol ॐ. Python decodes the escape when the string is created, and print shows the actual glyph." },

{ id: "f6-017", cat: "class11", title: "Unicode escape for the skull symbol", desc: "Another Unicode escape example: \\u2620 is the code point for the skull and crossbones symbol. The escape sequence is written in the source code and converted to the glyph at runtime.", code: `print("\\u2620")`, output: `☠`, explain: "The code point 2620 in the Miscellaneous Symbols block is the skull 2620. Python converts \\u2620 into the character when the program runs. The printed output shows the symbol instead of the escape text." },

{ id: "f6-018", cat: "class11", title: "Years into days, hours, minutes, seconds", desc: "Converts a number of years into days, hours, minutes and seconds using multiplication. Each unit is built from the previous one: 365 days in a year, 24 hours in a day, and so on. Every value is printed with a label.", code: `years=int(input("write the number of year"))
days=years * 365
hours=days * 24
minute=hours * 60
second=minute * 60
print("the number of years:",years)
print("the number of days:",days)
print("the number of hours:",hours)
print("the number of minutes:",minute)
print("the number of second:",second)`, output: `the number of years: 13
the number of days: 4745
the number of hours: 113880
the number of minutes: 6832800
the number of second: 409968000`, explain: "For 13 years, 13 times 365 gives 4745 days. Each later line multiplies the previous result by the next conversion factor. The chain of variables keeps every intermediate value so all five units can be printed." },

{ id: "f6-019", cat: "class11", title: "Seconds into minutes and seconds", desc: "Splits a large number of seconds into whole minutes and the leftover seconds. Floor division gives the minutes, and modulo gives the remainder. Both values are printed together.", code: `s= int(input("enter the time in second:"))
m= s//60
m2= s%60
print(m, "minutes", m2, "second")`, output: `202035353 minutes 32 second`, explain: "s // 60 divides and rounds down, so 12122121212 seconds contain 202035353 full minutes. The modulo s % 60 keeps what is left after removing those minutes, which is 32 seconds. The two numbers print side by side with their labels." },

{ id: "f6-020", cat: "class11", title: "Three digit number from n, n+1, n+2", desc: "Reads a single digit from 1 to 7 and prints it together with the next two numbers. The result looks like a three-digit number made from n, n plus 1 and n plus 2. Only the input is converted to int.", code: `num=int(input("enter number 1 to 7 only"))
print(num,num+1,num+2)`, output: `3 4 5`, explain: "The input 3 is stored in num. The print call evaluates num plus 1 and num plus 2 on the fly, giving 4 and 5. print separates the three values with spaces, so the line reads 3 4 5." },

{ id: "f6-021", cat: "class11", title: "Integer identity in memory", desc: "Shows that two variables holding the same small integer refer to the same object in memory. type reports their class and id returns the memory address of the object. Small integers are cached by Python.", code: `a=2
b=2
print(a,b)
print(type(a),type(b))
print(id(a))`, output: `None`, explain: "Both a and b store 2, and Python reuses the same cached integer object for small values. type shows they are both int. id returns the object's memory address, which changes between runs so it is not predictable." },

{ id: "f6-022", cat: "class11", title: "Set removes duplicate values", desc: "A set stores only unique values, so writing the same number many times keeps just one copy. The set literal {2,2,2,2,2,4,4,4} collapses to {2, 4}. type confirms it is a set.", code: `#set
x={2,2,2,2,2,4,4,4}
print(x)
print(type(x),x)`, output: `{2, 4}
<class 'set'> {2, 4}`, explain: "When the set literal is built, Python drops every repeated value. The values 2 and 4 appear once each. The first print shows the collapsed set, and the second also shows its type." },

{ id: "f6-023", cat: "class11", title: "Tuple keeps duplicate values", desc: "A tuple is an ordered, immutable collection that keeps every value exactly as written. The tuple (2,2,2,2,2,4,4,4) keeps all eight items. This contrasts with a set, which removes duplicates.", code: `#tuple
x=(2,2,2,2,2,4,4,4)
print(x)
print(type(x),x)`, output: `(2, 2, 2, 2, 2, 4, 4, 4)
<class 'tuple'> (2, 2, 2, 2, 2, 4, 4, 4)`, explain: "Parentheses create a tuple, and duplicates are preserved in order. All eight values print inside parentheses. The type check shows the object's class is tuple." },

{ id: "f6-024", cat: "class11", title: "Dictionary with lists as values", desc: "A dictionary maps group names to lists of students. Keys are the strings group1, group2 and group3, and each value is a two-student list. Printing the dictionary shows the whole mapping.", code: `#dictionary
# Using strings as keys and lists of students as values
class_dict = {
    "group1": ["abhay", "prashant"],
    "group2": ["ashu", "rajesh"],
    "group3": ["bhavya", "rakesh"]
}

print(class_dict)`, output: `{'group1': ['abhay', 'prashant'], 'group2': ['ashu', 'rajesh'], 'group3': ['bhavya', 'rakesh']}`, explain: "Each key is followed by a colon and then its value, with pairs separated by commas. The values are lists, so several students can belong to one group. print renders the dictionary with braces, colons and list brackets." },

{ id: "f6-025", cat: "class11", title: "Typecasting string to list", desc: "The list constructor splits a string into a list of single-character strings. Every character of python becomes one element. This is a quick way to work with characters as separate items.", code: `s="python"
l=list(s)
print(l)`, output: `['p', 'y', 't', 'h', 'o', 'n']`, explain: "list() iterates over the string and collects each character into a new list. The letters p, y, t, h, o and n become six separate string elements. The printed list shows quotes around each character." },

{ id: "f6-026", cat: "class11", title: "Typecasting string to set", desc: "The set constructor turns the characters of a string into a set of unique letters. Duplicate letters would collapse, though python has none. The order of a set is not guaranteed.", code: `s="python"
l=set(s)
print(l)`, output: `None`, explain: "set(s) visits each character and inserts it into a set. Because a set stores only unique values and unordered, the output order can differ from run to run. The result contains the six letters of python." },

{ id: "f6-027", cat: "class11", title: "ord() gives the code of a character", desc: "The ord function returns the Unicode code point of a single character. For the letter A that value is 65. It is the reverse of chr, which turns a code back into a character.", code: `#value
ch="A"
print(ord(ch))`, output: `65`, explain: "The string A is stored in ch and passed to ord. ord looks up A in the Unicode table and returns its integer code, 65. Uppercase letters have smaller codes than their lowercase versions." },

{ id: "f6-028", cat: "class11", title: "Comparing strings of different cases", desc: "String comparison uses character codes, so case matters. apple starts with lowercase a (code 97) and Apple starts with uppercase A (code 65). Because 97 is greater than 65, apple is greater than Apple.", code: `#str me inequality
s1= "apple"
s2= "Apple"
print(s1>s2)`, output: `True`, explain: "The greater-than operator compares the strings letter by letter. The first characters decide the result: a has code 97 and A has code 65. Since 97 is larger, apple is greater than Apple, so the comparison is True." },

{ id: "f6-029", cat: "class11", title: "Comparing int with a tuple", desc: "The equality operator compares the types and values of both sides. An integer is never equal to a tuple because the types differ. The comparison returns False without any error.", code: `print(3==(2,4,6))`, output: `False`, explain: "The left side is the integer 3 and the right side is a tuple of three integers. Python checks the types first, and int never equals tuple. The result is False even though 3 appears nowhere as an element." },

{ id: "f6-030", cat: "class11", title: "Math module functions", desc: "The math module is imported with the alias m, making calls short like m.log. The program demonstrates log, trigonometry, degrees, radians, log10, floor, fabs, ceil and pow. Every function takes 1231 as its argument.", code: `import math as m
print(m.log(1231))
print(m.sin(1231))
print(m.cos(1231))
print(m.tan(1231))
print(m.degrees(1231))
print(m.radians(1231))
print(m.log10(1231))
print(m.floor(1231))
print(m.fabs(1231))
print(m.ceil(1231))
print(m.pow(1231,16))`, output: `7.115582126184454
-0.48321239127428384
0.8755031609988558
-0.5519253530997992
70531.10458060434
21.485003092050196
3.090258052931316
1231
1231.0
1231
2.7805380780891805e+49`, explain: "log and log10 return natural and base-10 logarithms, while sin, cos and tan expect radians. degrees and radians convert between the two units. floor rounds down, ceil rounds up, fabs gives the absolute value, and pow raises 1231 to 16." },

{ id: "f6-031", cat: "class11", title: "sqrt of sum of squares", desc: "Computes the square root of a squared plus b squared plus c squared. Each number is squared with **2, and the three squares are added. The math alias m gives access to sqrt.", code: `import math as m
a=34
b=43
c=26
print(m.sqrt(a*a+b*b+c*c))`, output: `60.67124524847005`, explain: "a*a is 1156, b*b is 1849 and c*c is 676, summing to 3681. m.sqrt takes the square root of that total. The result 60.67 is the length of the diagonal of the box with sides 34, 43 and 26." },

{ id: "f6-032", cat: "class11", title: "exp() in an expression", desc: "The math function exp raises e to the power of its argument. Here exp is embedded inside a larger expression with multiplication and addition. Operator precedence decides which part computes first.", code: `import math as m
y=67
print(2-y*m.exp(2*y)+4*y)`, output: `-1.050837052826916e+60`, explain: "exp(2*y) computes e raised to 134, an enormous number. Multiplication by y happens before the additions and subtractions. The result is a huge negative value written in scientific notation." },

{ id: "f6-033", cat: "class11", title: "pow() inside an expression", desc: "math.pow raises a base to an exponent and always returns a float. Here (r + s) is raised to 4 inside a division. The full expression combines addition, division and exponentiation.", code: `import math

p = 12
q = 21
r = 23
s = 32

print(p + q / math.pow((r + s), 4))`, output: `12.00000229492521`, explain: "r plus s is 55, and 55 raised to 4 is about 9.15 million. The division 21 / 9150625 is a tiny number near 0.0000023. Adding p gives 12.0000023, close to 12 because the second term is so small." },

{ id: "f6-034", cat: "class11", title: "Menu calculator with if-elif-else", desc: "A menu-driven calculator: the user enters two numbers, sees six choices, and picks one. An if-elif chain runs only the matching operation. It covers multiplication, addition, subtraction, remainder, exponent and division.", code: `num1 = float(input("write first number:"))
num2 = float(input("write second number:"))

print("press 1 for multipication")
print("press 2 for addition")
print("press 3 for subtraction")
print("press 4 for remender")
print("press 5 for exponent")
print("press 6 for quotient")
     

choice = int(input("Enter your choice:"))

if choice == 1:
    print("their multiplication is:",num1*num2)
elif choice == 2:
    print("their addition is:",num1+num2)
elif choice == 3:
    print("their subtraction is:",num1-num2)    
elif choice == 4:
    print("their remender is:",num1%num2)   
elif choice == 5:
    print("their exponent is:",num1**num2)   
elif choice == 6:
    print("their quotient is:",num1/num2)     `, output: `None`, explain: "Both numbers are read as floats so division and remainder work correctly. The user's choice selects exactly one elif branch, and every other branch is skipped. A choice outside 1 to 6 prints nothing." },

{ id: "f6-035", cat: "class11", title: "Largest and smallest of three numbers", desc: "Three numbers are read from the user and compared with nested if statements. The program finds which number is the largest, then compares the other two to find the smallest. Every combination is handled.", code: `n1 = float(input("Enter first number: "))
n2 = float(input("Enter second number: "))
n3 = float(input("Enter third number: "))

# Check if n1 is the largest
if n1 >= n2 and n1 >= n3:
    print("largest number is :", n1)
    if n2 <= n3:
        print("smallest number is :", n2)
    else:
        print("smallest number is :", n3)

# Check if n2 is the largest
elif n2 >= n1 and n2 >= n3:
    print("largest number is :", n2)
    if n1 <= n3:
        print("smallest number is :", n1)
    else:
        print("smallest number is :", n3)

# Check if n3 is the largest
elif n3 >= n1 and n3 >= n2:
    print("largest number is :", n3)
    if n1 <= n2:
        print("smallest number is :", n1)
    else:
        print("smallest number is :", n2)

else:
    print("NOT IN YOUR AURA")`, output: `None`, explain: "The outer if-elif checks which number is the largest using the and operator to compare against both others. The inner if-else then compares the two remaining numbers for the smallest. Using >= means ties are handled by the first matching branch." },

{ id: "f6-036", cat: "class11", title: "Is it a triangle or not", desc: "Checks whether three side lengths can form a triangle. A triangle exists only when the sum of any two sides is greater than the third side. All three conditions must hold together with and.", code: `a=float(input("enter the 1st side"))
b=float(input("enter the 2nd side"))
c=float(input("enter the 3rd side"))

if a + b >c and b + c >a and c + a> b:
 print("This is a triange")
else:
 print("Not a triangle")`, output: `This is a triange`, explain: "The triangle inequality says a plus b must exceed c, b plus c must exceed a, and c plus a must exceed b. The and operator requires all three to be true. Equal sides like 23, 23, 23 satisfy the rule, so it is a triangle." },

{ id: "f6-037", cat: "class11", title: "Discount applier", desc: "Applies a discount to a shopping amount based on its size. Different slabs give 5, 10, 15 or 18 percent off. The discount is subtracted from the original amount and the final bill is printed.", code: `#discount applier
s=int(input("Enter the total amount"))
if s<10000:
    disc=s-s*0.05
elif s>=10000 and s<20000:
    disc=s-0.10
elif s>=20000 and s<30000:
    disc=s-s*0.15
else:
    disc=s-s*0.18
print("the amount you have to pay is:",disc)`, output: `the amount you have to pay is: 21250.0`, explain: "The if-elif chain picks the slab that matches the amount. For 25000, the third branch subtracts 15 percent, giving 21250. The printed value is a float because the discount uses decimal multipliers." },

{ id: "f6-038", cat: "class11", title: "Marks to grade", desc: "Converts exam marks into a letter grade. Marks from 90 upward get A+, then A, B+ and B for lower ranges. Any mark below 60 falls into the else branch with the grade C.", code: `#marks to grade
m=int(input("Enter your marks:"))
if m>=90:
    grade='A+'
elif m>=80:
    grade='A'
elif m>=70:
    grade='B+'
elif m>=60:
    grade='B'
else:
    grade='C' " tum IAS ki teyari chodh do"
print("Your got",grade)`, output: `Your got C tum IAS ki teyari chodh do`, explain: "Python checks the conditions from top to bottom and runs the first true branch. The last branch joins two adjacent string literals, which Python combines into one string. print shows the grade after the label." },

{ id: "f6-039", cat: "class11", title: "Print 1 to 20 with a for loop", desc: "A for loop with range(1,21,1) visits every number from 1 to 20. Each number is printed on its own line because print adds a newline. This is the simplest counting loop.", code: `for i in range(1,21,1):
    print(i)`, output: `1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20`, explain: "range(1,21,1) starts at 1, stops before 21, and steps by 1. The variable i takes each value in turn, and the indented print runs for every one. The loop body runs twenty times in total." },

{ id: "f6-040", cat: "class11", title: "Print 1 to 20 on one line", desc: "The same counting loop, but the end parameter of print keeps everything on one line. end=\" \" replaces the default newline with a single space. All twenty numbers print in a row.", code: `for i in range(1,21,1):
    print(i,end=" ")`, output: `1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 `, explain: "Normally print ends with a newline, but end=\" \" makes it end with a space instead. Each iteration writes one number followed by a space. The loop finishes on a single long line." },

{ id: "f6-041", cat: "class11", title: "Multiples of 5 from 5 to 500", desc: "A range with a step of 5 prints every multiple of 5 up to 500. The start is 5, the stop is 501 and the step is 5. The numbers are printed on one line with spaces.", code: `for i in range(5,501,5):
    print(i,end=" ")`, output: `5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95 100 105 110 115 120 125 130 135 140 145 150 155 160 165 170 175 180 185 190 195 200 205 210 215 220 225 230 235 240 245 250 255 260 265 270 275 280 285 290 295 300 305 310 315 320 325 330 335 340 345 350 355 360 365 370 375 380 385 390 395 400 405 410 415 420 425 430 435 440 445 450 455 460 465 470 475 480 485 490 495 500 `, explain: "range(5, 501, 5) starts at 5 and adds 5 each time until it reaches 500. The stop value 501 ensures 500 itself is included. Every number is a multiple of 5 because the step divides evenly." },

{ id: "f6-042", cat: "class11", title: "Table of 5 with f-string", desc: "Prints the multiplication table of 5 using an f-string. The expression {i} and {5*i} are filled with the loop variable and its product. Each line shows 5 times the number equals the result.", code: `for i in range(5,101,5):
    print(f"5*{i}={5*i}")`, output: `5*5=25
5*10=50
5*15=75
5*20=100
5*25=125
5*30=150
5*35=175
5*40=200
5*45=225
5*50=250
5*55=275
5*60=300
5*65=325
5*70=350
5*75=375
5*80=400
5*85=425
5*90=450
5*95=475
5*100=500`, explain: "The letter f before the string marks it as a formatted string. Curly braces hold expressions that Python evaluates and converts to text. The loop prints twenty lines, one for each multiple of 5." },

{ id: "f6-043", cat: "class11", title: "First n odd numbers", desc: "Asks how many odd numbers the user wants, then prints that many starting from 1. The range uses count times 2 plus 1 so the stop matches the requested quantity. Every number is odd because the step is 2.", code: `# Ask the user for the quantity of odd numbers
count = int(input("How many odd numbers do you want? "))

print(f"\nHere are the first {count} odd numbers:")
for num in range(1, count * 2 + 1, 2):
 print(num, end="  ")`, output: `None`, explain: "For count odd numbers, range must run count times, so the stop is count * 2 + 1. Starting at 1 with a step of 2 produces only odd numbers. The f-string in the header inserts the requested count." },

{ id: "f6-044", cat: "class11", title: "First n even numbers", desc: "Prints the first n even numbers starting from 2. The range stops at 2 times n plus 1 so exactly n numbers print. A step of 2 keeps every generated number even.", code: `#first 20 even number
n=int(input("Enter how many even numbers you want:"))
for i in range (2,2*n+1,2):
 print(i,end="  ")`, output: `None`, explain: "The loop begins at 2, the smallest even number. The stop 2*n + 1 guarantees the last value 2*n is included. Stepping by 2 skips every odd number, so n values print in total." },

{ id: "f6-045", cat: "class11", title: "Rectangle of stars", desc: "A simple pattern: ten stars with spaces are printed five times. The string \"* \" repeated 10 times makes one row, and the loop repeats that row. The result is a 5 by 10 rectangle.", code: `for i in range(5):
 print("* "*10)`, output: `* * * * * * * * * * 
* * * * * * * * * * 
* * * * * * * * * * 
* * * * * * * * * * 
* * * * * * * * * * `, explain: "The expression \"* \" * 10 builds a string with ten star-space pairs. Each iteration of the loop prints one full row. Because the loop runs five times, five identical rows appear." },

{ id: "f6-046", cat: "class11", title: "Increasing plus triangle", desc: "A triangle where each row has one more plus sign than the last. The row length comes from the loop variable i itself. Row 1 has one plus, row 2 has two, and so on up to five.", code: `for i in range(1,6):
    print("+"*i)`, output: `+
++
+++
++++
+++++`, explain: "On each iteration, the string \"+\" is multiplied by the current value of i. Multiplication by a number repeats the string that many times. The triangle grows from one plus to five pluses." },

{ id: "f6-047", cat: "class11", title: "Decreasing plus triangle", desc: "The reverse triangle: each row has one fewer plus sign. The loop counts down from 5 to 1 with a negative step. Row lengths shrink from five pluses to a single plus.", code: `for i in range(5,0,-1):
    print("+"*i)`, output: `+++++
++++
+++
++
+`, explain: "range(5, 0, -1) starts at 5 and counts down to 1, stopping before 0. Multiplying \"+\" by i repeats it i times. The rows get shorter until only one plus remains." },

{ id: "f6-048", cat: "class11", title: "Plus diamond", desc: "Two loops create a diamond shape: the first prints rows growing from 1 to 6 pluses, and the second prints rows shrinking from 5 back to 1. The two halves meet in the middle.", code: `for i in range(1,7):
    print("+ "*i)
for i in range(5,0,-1):
    print("+ "*i)`, output: `+ 
+ + 
+ + + 
+ + + + 
+ + + + + 
+ + + + + + 
+ + + + + 
+ + + + 
+ + + 
+ + 
+ `, explain: "The first loop counts up, printing wider rows with spaces between the pluses. The second loop counts down, printing the mirror half. Together the loops draw a diamond of eleven rows." },

{ id: "f6-049", cat: "class11", title: "Series 1 4 7 ... 40", desc: "Prints the arithmetic series starting at 1 and adding 3 each time until 40. The step of 3 in range makes every number 3 more than the last. All values print on one line.", code: `for i in range(1,41,3):
     print(i,end=" ")`, output: `1 4 7 10 13 16 19 22 25 28 31 34 37 40 `, explain: "range(1, 41, 3) yields 1, 4, 7 and so on, stopping before 41. The largest value included is 40. end=\" \" keeps the output on a single line with a space after each number." },

{ id: "f6-050", cat: "class11", title: "Alternating series 1 -4 7 ... -40", desc: "The same series, but even terms become negative. An if inside the loop checks whether the number is even and prints it with a minus sign. Odd terms print normally.", code: `for i in range(1,41,3):
    if i%2 == 0:
        print(-i,end=" ")
    else:
        print(i,end=" ")`, output: `1 -4 7 -10 13 -16 19 -22 25 -28 31 -34 37 -40 `, explain: "The modulo operator i%2 is zero only for even numbers. Even terms print as -i, making them negative. Odd terms keep their positive value, so the signs alternate across the series." },

{ id: "f6-051", cat: "class11", title: "Average of list elements", desc: "Walks through a list with a for loop and adds every element to a running total. The total is divided by the length of the list to find the average. The length comes from len.", code: `l=[20,41,3,19,8,81,91]
list_sum=0
for element in l:
    list_sum+=element #list_sum = list_sum + element
print(list_sum/len(l))`, output: `37.57142857142857`, explain: "list_sum starts at 0 and grows by one element per iteration. The compound operator += is shorthand for adding and storing. The final sum 263 divided by 7 elements gives 37.5714." },

{ id: "f6-052", cat: "class11", title: "Product of list elements", desc: "Multiplies every element of a list into a single product. The product starts at 1 so the first multiplication works correctly. The result is printed with a label.", code: `l = [20, 21, 34, 53, 34, 54]
product = 1
for element in l:
    product *= element  # product = product * element 
print("The product of the list elements is:", product)`, output: `The product of the list elements is: 1389558240`, explain: "product is initialized to 1, the neutral element for multiplication. Each iteration multiplies the running product by the next list item. The six factors multiply to 1389558240." },

{ id: "f6-053", cat: "class11", title: "Roots of a quadratic equation", desc: "Solves a quadratic equation using the formula with the discriminant b squared minus 4ac. If the discriminant is negative, the roots are imaginary. Otherwise two real roots are computed with sqrt.", code: `import math as m
a=float(input("Enter coefficient of x**2:"))
b=float(input("Enter coefficient of x:"))
c=float(input("Enter value of c:"))
delta=b**2-4*a*c
print(delta)
if delta<0:
    print("Roots are Imaginary")
else:
    root1=(-b+m.sqrt(delta))/(2*a)
    root2=(-b-m.sqrt(delta))/(2*a)
    print("Roots are :",root1,root2)`, output: `None`, explain: "The discriminant delta decides the nature of the roots. A negative delta means the roots are imaginary, printed as a message. A non-negative delta lets sqrt run, and the two formulas produce root1 and root2." },

{ id: "f6-054", cat: "class11", title: "Print letters of the alphabet", desc: "Prints the whole alphabet from A to Z. The loop starts with the code of A and adds 1 each time, and chr converts each code back to a letter. The letters print on one line with two spaces between them.", code: `letter=ord("A")#finding value of "A"
for i in range(26):
    print(chr(letter+i),end="  ")#chr for convert value of alphabet `, output: `A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  `, explain: "ord(\"A\") returns 65. Each iteration adds the counter i, so the codes go from 65 to 90. chr converts each code back into its letter, and end=\"  \" puts two spaces between letters." },

{ id: "f6-055", cat: "class11", title: "Alphabet pyramid", desc: "Builds a pyramid where each row repeats one letter. Row 1 prints A once, row 2 prints B twice, and so on up to 26 Z's. The letter and the repeat count both come from the loop variable.", code: `letter = ord("A")
for i in range(26):
    print(chr(letter + i ) * (i + 1))`, output: `A
BB
CCC
DDDD
EEEEE
FFFFFF
GGGGGGG
HHHHHHHH
IIIIIIIII
JJJJJJJJJJ
KKKKKKKKKKK
LLLLLLLLLLLL
MMMMMMMMMMMMM
NNNNNNNNNNNNNN
OOOOOOOOOOOOOOO
PPPPPPPPPPPPPPPP
QQQQQQQQQQQQQQQQQ
RRRRRRRRRRRRRRRRRR
SSSSSSSSSSSSSSSSSSS
TTTTTTTTTTTTTTTTTTTT
UUUUUUUUUUUUUUUUUUUUU
VVVVVVVVVVVVVVVVVVVVVV
WWWWWWWWWWWWWWWWWWWWWWW
XXXXXXXXXXXXXXXXXXXXXXXX
YYYYYYYYYYYYYYYYYYYYYYYYY
ZZZZZZZZZZZZZZZZZZZZZZZZZZ`, explain: "chr(letter + i) picks the i-th letter of the alphabet. Multiplying a one-character string by i + 1 repeats it that many times. The rows grow one letter longer each time, ending with 26 Z's." },

{ id: "f6-056", cat: "class11", title: "Counting vowels in a paragraph", desc: "Counts how many vowels appear in a multi-line paragraph. The vowels are stored as their character codes in a list. Every character of the text is checked against that list with the in operator.", code: `para = """we are learning new things very day.
          I am glad I get a chance to study"""

vowels = [ord("a"), ord("e"), ord("i"), ord("o"), ord("u")]
count = 0
for element in para:
    if ord(element) in vowels:
        count = count + 1
print("Total count:", count)`, output: `Total count: 18`, explain: "The vowels list holds the codes of a, e, i, o and u. Iterating over the string yields one character at a time, and ord converts it for the membership check. Each vowel found raises the counter, which ends at 18." },

{ id: "f6-057", cat: "class11", title: "Reverse alphabet pyramid", desc: "A pyramid that starts wide with F and shrinks down to a single A. The letter count falls from 6 to 1, and the letter moves backwards from F. The pattern stops being printed when the count becomes zero or negative.", code: `letter = ord("F")
for i in range(26):
    print(chr(letter - i) * (6 - i))`, output: `FFFFFF
EEEEE
DDDD
CCC
BB
A`, explain: "chr(letter - i) walks the alphabet backwards from F. The multiplier 6 - i starts at 6 and shrinks by one each row. After the first six rows the multiplier is zero or negative, so only blank lines are printed." },

{ id: "f6-058", cat: "class11", title: "While loop printing 1 to 10", desc: "A while loop counts from 1 to 10 using a counter variable. The loop runs as long as the counter is at most 10. Inside the loop the counter is printed and then increased by 1.", code: `i=1
while i<=10:
    print(i)
    i+=1`, output: `1
2
3
4
5
6
7
8
9
10`, explain: "The condition i<=10 is checked before every iteration. Each pass prints i and then increments it with i+=1. When i reaches 11 the condition fails and the loop stops." },

{ id: "f6-059", cat: "class11", title: "While loop counting down 100 to 1", desc: "A while loop counts backwards from 100 to 1. The counter starts at 100 and is decreased each time. Numbers print on one line because of end=\" \".", code: `i=100
while i>=1:
    print(i,end=" ")
    i-=1`, output: `100 99 98 97 96 95 94 93 92 91 90 89 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 `, explain: "The counter starts at 100 and the condition i>=1 keeps the loop going. The operator i-=1 subtracts 1 after every print. The loop ends after printing 1, when the counter becomes 0." },

{ id: "f6-060", cat: "class11", title: "Table of 5 using while", desc: "The multiplication table of 5 built with a while loop. The counter starts at 5 and grows by 5 until 50. Every value printed is a multiple of 5.", code: `# five table (while)
i=5
while i<=50:
    print(i,end=" ")
    i+=5`, output: `5 10 15 20 25 30 35 40 45 50 `, explain: "i starts at 5 and the loop continues while it is at most 50. Adding 5 each iteration steps through the multiples of 5. The loop prints ten numbers in total." },

{ id: "f6-061", cat: "class11", title: "While series with step 3", desc: "A while version of the series 1 4 7 ... 40. The counter increases by 3 on every pass. The loop stops as soon as the counter passes 40.", code: `i=1
while i<=40:
    print(i,end=" ")
    i+=3`, output: `1 4 7 10 13 16 19 22 25 28 31 34 37 40 `, explain: "Each iteration prints the current value and then adds 3. The sequence goes 1, 4, 7 and so on. The last printed value is 40, and the next check stops the loop." },

{ id: "f6-062", cat: "class11", title: "While alternating series", desc: "The while version of the alternating series 1 -4 7 ... -40. Even values are printed as negatives with an if check. Odd values keep their sign.", code: `i=1
while i<=40:
    if i%2==0:
       print(-i,end=" ")
    else:
       print(i,end=" ")
    i+=3`, output: `1 -4 7 -10 13 -16 19 -22 25 -28 31 -34 37 -40 `, explain: "The condition i%2==0 detects even numbers, which print as negative. Odd numbers print as themselves. The counter grows by 3, so the signs alternate through the series." },

{ id: "f6-063", cat: "class11", title: "While printing odd numbers", desc: "Prints every odd number from 1 to 100 using a while loop. Starting at 1 and adding 2 skips all even numbers. The output is one long line.", code: `#printing odd numbers (while)
i=1
while i<=100:
    print(i,end=" ")
    i+=2`, output: `1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35 37 39 41 43 45 47 49 51 53 55 57 59 61 63 65 67 69 71 73 75 77 79 81 83 85 87 89 91 93 95 97 99 `, explain: "The counter begins at 1, the first odd number. Adding 2 each time jumps over every even value. The loop runs while the counter stays at or below 100." },

{ id: "f6-064", cat: "class11", title: "While printing even numbers", desc: "Prints every even number from 2 to 100 using a while loop. The counter starts at 2 and adds 2 per iteration. One hundred numbers never appear because odd values are skipped.", code: `#printing even numbers (while)
i=2
while i<=100:
    print(i,end=" ")
    i+=2`, output: `2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100 `, explain: "Starting at 2 with a step of 2 produces only even values. The condition i<=100 includes 100 itself. The final increment makes the loop exit." },

{ id: "f6-065", cat: "class11", title: "While plus triangle pattern", desc: "A plus triangle built with a while loop instead of a for loop. The row width equals the counter, which grows each iteration. Five rows print, from one plus to five.", code: `#pattern printing using while
i=1
while i<=5:
    print('+ ' * i)
    i+=1`, output: `+ 
+ + 
+ + + 
+ + + + 
+ + + + + 
`, explain: "Multiplying the string '+ ' by i repeats it i times. Each loop pass prints a row one plus wider than the last. The counter stops the loop after five rows." },

{ id: "f6-066", cat: "class11", title: "While series with step 4", desc: "A while loop that steps by 4 from 1 to 40. Every generated value is odd, so the even-check inside the loop never triggers. The output is the positive series 1 5 9 ... 37.", code: `i=1
while i<=40:
    if i%2==0:
       print(-i,end=" ")
    else:
       print(i,end=" ")
    i+=4`, output: `1 5 9 13 17 21 25 29 33 37 `, explain: "Starting at 1 and adding 4 always lands on odd numbers. The check i%2==0 is therefore always false, so the minus branch never runs. The loop prints ten positive numbers and stops." },

{ id: "f6-067", cat: "class11", title: "While series with step 6", desc: "A while loop that prints 2, 8, 14, 20, 26 and 32 by adding 6 each time. The counter starts at 2 and the loop runs up to 32. The output fits on one line.", code: `i=2
while i<=32:
    print(i,end=" ")
    i+=6`, output: `2 8 14 20 26 32 `, explain: "The counter starts at 2 and grows by 6 per iteration. The values 2, 8, 14, 20, 26 and 32 are printed. After 32, adding 6 gives 38, which fails the condition and ends the loop." },

{ id: "f6-068", cat: "class11", title: "While squaring the value", desc: "The counter squares itself on every iteration, producing 2, 4, 16, 256. The loop condition compares against 1024, and 256 squared would exceed it. Squaring uses the **= operator.", code: `i=2
while i<=1024:
    print(i,end=" ")
    i**=2`, output: `2 4 16 256 `, explain: "The operator i**=2 squares the counter each pass. The sequence doubles in exponent, growing far faster than multiplication. The loop stops because the next square, 65536, is bigger than 1024." },

{ id: "f6-069", cat: "class11", title: "Nested loop plus grid", desc: "Two loops make a grid: the outer loop is the rows and the inner loop is the columns. Every inner loop prints four pluses for one row, and the outer loop repeats it three times.", code: `for r in range(1,4):
    for c in range(1,5):
        print("+",end=" ")
    print()`, output: `+ + + + 
+ + + + 
+ + + + 
`, explain: "For each value of r, the inner loop runs completely from c=1 to c=4. end=\" \" keeps the pluses on one row, and the empty print() moves to the next line. The result is a 3 by 4 grid." },

{ id: "f6-070", cat: "class11", title: "Nested loop row numbers", desc: "A grid where each row repeats the row number three times. The inner loop prints the outer variable r, so every cell in a row shows the same number. Four rows are printed.", code: `for r in range(1,5):
    for c in range(1,4):
        print(r,end=" ")
    print()`, output: `1 1 1 
2 2 2 
3 3 3 
4 4 4 
`, explain: "The inner loop prints r, which only changes when the outer loop advances. Each row therefore contains three copies of the same number. The rows change from 1 to 4." },

{ id: "f6-071", cat: "class11", title: "Nested loop squares", desc: "A grid showing the square of each row number. The inner loop prints r squared, so row 2 shows 4 4 4. The squared value is computed with the exponent operator.", code: `for r in range(1,5):
    for c in range(1,4):
        print(r**2,end="  ")
    print()`, output: `1  1  1  
4  4  4  
9  9  9  
16  16  16  
`, explain: "The expression r**2 squares the row number, and the inner loop prints it three times per row. Row 1 shows ones, row 2 shows fours, and so on. The squares 1, 4, 9 and 16 fill the grid." },

{ id: "f6-072", cat: "class11", title: "Nested loop powers", desc: "A grid where each cell is the column number raised to the row power. Row 1 shows c to the power 1, row 2 shows c squared, and row 3 shows c cubed. Each row grows differently.", code: `for r in range(1,4):
    for c in range(1,4):
        print(c**r,end="  ")
    print()`, output: `1  2  3  
1  4  9  
1  8  27  
`, explain: "The inner loop varies c from 1 to 3 while the outer loop fixes r. c**r means column raised to row: row 1 is 1, 2, 3 and row 3 is 1, 8, 27. The columns grow as powers." },

{ id: "f6-073", cat: "class11", title: "Nested loop letters", desc: "A grid of letters where each row repeats one letter. The outer loop walks the codes from A to D, and chr converts each code back to a letter. Each row prints three copies.", code: `for r in range(ord('A'), ord('A') + 4):
    for c in range(1, 4):
        print(chr(r), end=" ")
    print()`, output: `A A A 
B B B 
C C C 
D D D 
`, explain: "The outer loop ranges over the codes 65 to 68, which are A to D. chr(r) turns each code into its letter, printed three times by the inner loop. The result is four rows of letters." },

{ id: "f6-074", cat: "class11", title: "Nested loop 1 10 100", desc: "Each row of the grid multiplies the row number by powers of ten. The inner loop raises 10 to c, giving 1, 10 and 100. Five rows show 1 10 100 up to 5 50 500.", code: `for r in range (1,6):
    for c in range(0,3):
        print(r*10**c,end=" ")
    print()`, output: `1 10 100 
2 20 200 
3 30 300 
4 40 400 
5 50 500 
`, explain: "10**c is 1 for c=0, 10 for c=1 and 100 for c=2. Multiplying by r gives the row values. Row 3 therefore prints 3, 30 and 300, and the grid runs from row 1 to row 5." },

{ id: "f6-075", cat: "class11", title: "While loop printing hello 10 times", desc: "A counter-controlled while loop prints the word hello exactly ten times. The counter starts at 0 and is compared with 10. Each pass prints hello and increases the counter.", code: `count =0
while count<10:
    print("hello")
    count+=1`, output: `hello
hello
hello
hello
hello
hello
hello
hello
hello
hello`, explain: "The condition count<10 controls the number of passes. Printing hello and then incrementing keeps the loop from running forever. After ten passes count equals 10 and the loop ends." },

{ id: "f6-076", cat: "class11", title: "While loop with two counters", desc: "Two counters move in opposite directions: x counts down from 10 while y counts up from 0. The loop stops when x is no longer greater than y. Each line prints both counters.", code: `x=10
y=0
while x>y:
    print(x,y)
    x=x-1
    y=y+1`, output: `10 0
9 1
8 2
7 3
6 4`, explain: "The loop continues while 10 minus y is greater than y. Each pass prints the pair, then x drops by 1 and y rises by 1. The two counters meet after five lines, and the condition fails." },

{ id: "f6-077", cat: "class11", title: "Palindrome or not", desc: "Checks whether the typed word reads the same forwards and backwards. The word is reversed with a loop that walks the string from the end. If the reverse equals the original, it is a palindrome.", code: `N=str(input("Enter a sring"))
r=""
for i in range(-1,-len(N)-1,-1):
    r=r+N[i]
if r==N:
    print("string is a PALINDROME")
else:
    print("not a PALINDROME")`, output: `None`, explain: "Negative indexes start from the end, so N[-1] is the last character. The loop appends characters one by one to r, building the reversed word. Comparing r with N decides which message prints." },

]);
/* ZENTHON — Python examples (file 2 of 5): STRINGS, NUMBERS, CONDITIONALS, LOOPS */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f2-001", cat: "strings", title: "String Length", desc: "A string is a sequence of characters. The len() built-in function returns how many characters a string contains, counting spaces and punctuation too.", code: `word = 'Python'
print(len(word))`, output: `6`, explain: "len() counts every character in the string. \"Python\" has 6 letters, so the result is 6." },

{ id: "f2-002", cat: "strings", title: "Indexing Characters", desc: "Every character in a string has an index, starting from 0. You can grab a single character with square brackets [index].", code: `name = 'Python'
print(name[0])
print(name[3])`, output: `P
h`, explain: "Index 0 gives the first character 'P', index 3 gives the fourth character 'h'. Indices always start at 0 in Python." },

{ id: "f2-003", cat: "strings", title: "Negative Indexing", desc: "Python lets you index from the end of the string using negative numbers. Index -1 is the last character, -2 the second last, and so on.", code: `word = 'Python'
print(word[-1])
print(word[-2])`, output: `n
o`, explain: "Negative indices count backwards: -1 is 'n' (last), -2 is 'o' (second last). This is handy when you don't know the length." },

{ id: "f2-004", cat: "strings", title: "Slicing Basics", desc: "Slicing extracts a substring using [start:end]. The start index is included, the end index is excluded — a half-open range.", code: `text = 'Hello World'
print(text[0:5])
print(text[6:11])`, output: `Hello
World`, explain: "text[0:5] takes characters from index 0 up to (but not including) index 5, giving \"Hello\". text[6:11] gives \"World\"." },

{ id: "f2-005", cat: "strings", title: "Slicing with Step", desc: "A slice can take a third value: [start:end:step]. The step controls how many characters to jump each time, like skipping every other character.", code: `text = 'abcdef'
print(text[0:6:2])
print(text[::2])`, output: `ace
ace`, explain: "step 2 picks characters at indices 0, 2, 4: 'a', 'c', 'e'. text[::2] means \"from start to end, step 2\" — same result." },

{ id: "f2-006", cat: "strings", title: "Reverse a String", desc: "Using a negative step like -1 in a slice reverses the sequence. This is the classic one-liner to reverse any string.", code: `text = 'Python'
print(text[::-1])`, output: `nohtyP`, explain: "text[::-1] walks the string from the end to the start one character at a time, producing the reversed string." },

{ id: "f2-007", cat: "strings", title: "Strings Are Immutable", desc: "Strings cannot be changed in place. Any operation that 'modifies' a string actually creates a brand-new string object.", code: `word = 'Python'
# word[0] = "J"  <- this raises a TypeError
new_word = "J" + word[1:]
print(new_word)`, output: `Jython`, explain: "You cannot assign to an index of a string. Instead, build a new string by concatenation: \"J\" plus word[1:] ('ython')." },

{ id: "f2-008", cat: "strings", title: "Uppercase with .upper()", desc: "The .upper() method returns a copy of the string with all characters converted to uppercase. The original string stays unchanged.", code: `msg = 'hello zen'
print(msg.upper())`, output: `HELLO ZEN`, explain: ".upper() transforms every lowercase letter to uppercase and returns a new string; msg itself is untouched." },

{ id: "f2-009", cat: "strings", title: "Lowercase with .lower()", desc: "The .lower() method returns a copy of the string with all characters converted to lowercase. Useful for case-insensitive comparisons.", code: `msg = 'ZEN X DEV'
print(msg.lower())`, output: `zen x dev`, explain: ".lower() maps every uppercase letter to its lowercase form, producing \"zen x dev\"." },

{ id: "f2-010", cat: "strings", title: "Title Case with .title()", desc: "The .title() method capitalizes the first letter of every word in the string, turning each word into title case.", code: `msg = 'learn python basics'
print(msg.title())`, output: `Learn Python Basics`, explain: ".title() capitalizes the first character of each word: 'learn' becomes 'Learn', 'python' becomes 'Python', etc." },

{ id: "f2-011", cat: "strings", title: "Capitalize First Letter", desc: "The .capitalize() method makes only the very first character of the string uppercase and lowercases everything else.", code: `msg = 'pyTHON IS COOL'
print(msg.capitalize())`, output: `Python is cool`, explain: ".capitalize() uppercases the first letter 'p' to 'P' and converts the rest of the string to lowercase." },

{ id: "f2-012", cat: "strings", title: "Strip Whitespace", desc: "The .strip() method removes leading and trailing whitespace (spaces, tabs, newlines) from both ends of a string.", code: `data = '   clean me   '
print(data.strip())`, output: `clean me`, explain: ".strip() chops off the spaces at the start and end, leaving \"clean me\". Great for cleaning user input." },

{ id: "f2-013", cat: "strings", title: "Left and Right Strip", desc: ".lstrip() removes whitespace only from the left side, .rstrip() only from the right side. Both leave the other side untouched.", code: `data = '  pad  '
print(data.lstrip() + "|")
print(data.rstrip() + "|")`, output: `pad  |
  pad|`, explain: "lstrip() removes the two leading spaces; rstrip() removes the two trailing spaces. The '|' shows where the string ends." },

{ id: "f2-014", cat: "strings", title: "Split a String", desc: "The .split() method breaks a string into a list of substrings, splitting at whitespace by default, or at any separator you pass.", code: `sentence = 'zen code level'
words = sentence.split()
print(words)`, output: `['zen', 'code', 'level']`, explain: "split() with no argument splits on spaces, returning a list of the three words. Use split(\",\") to split on commas." },

{ id: "f2-015", cat: "strings", title: "Split with Separator", desc: "Passing an argument to .split() tells it where to cut. This is how you parse CSV-like text or key-value pairs.", code: `data = 'apple,banana,cherry'
print(data.split(","))`, output: `['apple', 'banana', 'cherry']`, explain: "split(\",\") cuts the string at every comma, producing a list of three fruits without the commas." },

{ id: "f2-016", cat: "strings", title: "Join a List", desc: "The .join() method is the opposite of split: it glues a list of strings together using the string it is called on as the separator.", code: `words = ['zen', 'x', 'dev']
print("-".join(words))
print(" ".join(words))`, output: `zen-x-dev
zen x dev`, explain: "\"-\".join(words) places a dash between each word; \" \".join(words) places a space between each word." },

{ id: "f2-017", cat: "strings", title: "Replace Text", desc: "The .replace(old, new) method replaces every occurrence of a substring with another substring and returns a new string.", code: `msg = 'I love cats'
print(msg.replace("cats", "python"))`, output: `I love python`, explain: "replace(\"cats\", \"python\") finds \"cats\" and swaps it for \"python\". The original msg is not modified." },

{ id: "f2-018", cat: "strings", title: "Count Occurrences", desc: "The .count(sub) method returns how many times a substring appears inside the string, without overlapping matches.", code: `text = 'abracadabra'
print(text.count("a"))
print(text.count("bra"))`, output: `5
2`, explain: "'a' appears 5 times in \"abracadabra\". The substring \"bra\" appears twice: at positions 1 and 8." },

{ id: "f2-019", cat: "strings", title: "Find a Substring", desc: "The .find(sub) method returns the index of the first occurrence of a substring, or -1 if it is not found at all.", code: `text = 'hello world'
print(text.find("world"))
print(text.find("zen"))`, output: `6
-1`, explain: "\"world\" starts at index 6. \"zen\" is not in the text, so find() returns -1 instead of crashing." },

{ id: "f2-020", cat: "strings", title: "Find from the Right", desc: "The .rfind(sub) method searches from the right side of the string, returning the index of the LAST occurrence of the substring.", code: `text = 'a-b-c'
print(text.rfind("-"))`, output: `3`, explain: "rfind() scans from the end. The last dash sits at index 3 (between 'b' and 'c')." },

{ id: "f2-021", cat: "strings", title: "Index vs Find", desc: "The .index(sub) method is like find() but raises a ValueError when the substring is missing, instead of returning -1.", code: `text = 'hello world'
print(text.index("world"))
# text.index("zen")  <- raises ValueError`, output: `6`, explain: "index() returns the position of \"world\" (6). Unlike find(), a missing substring causes a ValueError rather than -1." },

{ id: "f2-022", cat: "strings", title: "Starts With", desc: "The .startswith(sub) method returns True if the string begins with the given substring, otherwise False.", code: `name = 'python.py'
print(name.startswith("py"))
print(name.startswith("Py"))`, output: `True
False`, explain: "\"python.py\" starts with \"py\" so the first call is True. Matching is case-sensitive, so \"Py\" returns False." },

{ id: "f2-023", cat: "strings", title: "Ends With", desc: "The .endswith(sub) method checks whether the string ends with the given substring. Perfect for validating file extensions.", code: `file = 'notes.txt'
print(file.endswith(".txt"))
print(file.endswith(".pdf"))`, output: `True
False`, explain: "\"notes.txt\" ends with \".txt\" so the first check is True; it does not end with \".pdf\", so the second is False." },

{ id: "f2-024", cat: "strings", title: "Check Letters with .isalpha()", desc: "The .isalpha() method returns True only if every character is a letter and there is at least one character. Digits and spaces make it False.", code: `print('zen'.isalpha())
print("zen123".isalpha())
print("zen dev".isalpha())`, output: `True
False
False`, explain: "\"zen\" is all letters (True). \"zen123\" contains digits (False). \"zen dev\" contains a space, which is not a letter (False)." },

{ id: "f2-025", cat: "strings", title: "Check Digits with .isdigit()", desc: "The .isdigit() method returns True only if every character is a digit and there is at least one character. Use it before converting to int.", code: `print('123'.isdigit())
print("12a".isdigit())
print("".isdigit())`, output: `True
False
False`, explain: "\"123\" is all digits (True). \"12a\" has a letter (False). An empty string returns False because there must be at least one character." },

{ id: "f2-026", cat: "strings", title: "Alphanumeric Check", desc: "The .isalnum() method returns True when the string contains only letters and/or digits — no spaces, no punctuation.", code: `print('Zen2026'.isalnum())
print("Zen 2026".isalnum())`, output: `True
False`, explain: "\"Zen2026\" mixes letters and digits only, so it is alphanumeric (True). The space in \"Zen 2026\" makes it False." },

{ id: "f2-027", cat: "strings", title: "Check Spaces with .isspace()", desc: "The .isspace() method returns True when the string contains only whitespace characters like spaces, tabs or newlines.", code: `print('   '.isspace())
print(" a ".isspace())`, output: `True
False`, explain: "Three spaces are pure whitespace (True). \" a \" contains a letter, so the whole string is not whitespace (False)." },

{ id: "f2-028", cat: "strings", title: "Center a String", desc: "The .center(width) method pads the string on both sides with spaces so the total length reaches the given width.", code: `word = 'ZEN'
print(word.center(11))`, output: `    ZEN    `, explain: "center(11) distributes 8 extra spaces around \"ZEN\" (4 each side) so the result is exactly 11 characters wide." },

{ id: "f2-029", cat: "strings", title: "Left and Right Justify", desc: ".ljust(width) pads spaces on the right; .rjust(width) pads spaces on the left. Useful for aligning table columns.", code: `print('A'.ljust(5) + '|')
print("A".rjust(5) + "|")`, output: `A    |
    A|`, explain: "ljust(5) puts 4 spaces after 'A'; rjust(5) puts 4 spaces before 'A'. The '|' makes the padding visible." },

{ id: "f2-030", cat: "strings", title: "Zero Fill", desc: "The .zfill(width) method pads the string with zeros on the left until it reaches the given width. Great for fixed-width numbers.", code: `print('42'.zfill(5))
print("-7".zfill(4))`, output: `00042
-007`, explain: "zfill(5) turns \"42\" into \"00042\". For negative numbers the minus sign stays at the front: \"-7\" becomes \"-007\"." },

{ id: "f2-031", cat: "strings", title: "format() Placeholders", desc: "The .format() method fills {} placeholders in a string with values. It is the classic way to build dynamic strings.", code: `name = 'Zen'
level = 7
print("Player {} reached level {}".format(name, level))`, output: `Player Zen reached level 7`, explain: "The two {} placeholders are filled in order by the arguments of format(): name then level." },

{ id: "f2-032", cat: "strings", title: "f-String with Expression", desc: "f-strings put an 'f' before the quotes and embed expressions inside {} braces, evaluated right in the string.", code: `a = 5
b = 3
print(f"{a} + {b} = {a + b}")`, output: `5 + 3 = 8`, explain: "Inside the f-string, {a + b} is computed as 8. Any valid Python expression works inside the braces." },

{ id: "f2-033", cat: "strings", title: "f-String Width Padding", desc: "f-strings support alignment: {value:10} pads to 10 characters, < means left-align, > means right-align, ^ means center.", code: `name = 'ZEN'
print(f"[{name:10}]")
print(f"[{name:<10}]")
print(f"[{name:^10}]")`, output: `[ZEN       ]
[ZEN       ]
[   ZEN    ]`, explain: "{name:10} and {name:<10} right-pad with spaces (default right-align looks the same here), while {name:^10} centers the text." },

{ id: "f2-034", cat: "strings", title: "f-String Number Format", desc: "f-strings can format numbers: :.2f rounds to 2 decimal places, :d formats an integer, and you can add thousand separators with :,", code: `price = 19.995
print(f"Price: {price:.2f}")
big = 1234567
print(f"Total: {big:,}")`, output: `Price: 20.00
Total: 1,234,567`, explain: "{price:.2f} rounds 19.995 to \"20.00\". {big:,} inserts commas into 1234567, producing \"1,234,567\"." },

{ id: "f2-035", cat: "strings", title: "Escape Sequences", desc: "Escape sequences start with a backslash and represent special characters: \\n is a newline, \\t a tab, and \\\" a quote inside quotes.", code: `print('Line one\\nLine two')
print("Tab:\\there")`, output: `Line one
Line two
Tab:\there`, explain: "\\n creates a line break between \"Line one\" and \"Line two\". \\t inserts a tab before \"here\"." },

{ id: "f2-036", cat: "strings", title: "Raw Strings", desc: "A raw string, written r\"...\", keeps every backslash literally. Perfect for file paths and regular expressions that use backslashes.", code: `path = r'C:\\Users\\Zen\\file.txt'
print(path)`, output: `C:\\Users\\Zen\\file.txt`, explain: "With r\"\", the double backslashes are preserved as-is in the output, which is exactly what paths and regex patterns need." },

{ id: "f2-037", cat: "strings", title: "Triple-Quoted Multiline", desc: "Triple quotes \"\"\"...\"\"\" or '''...''' let you write strings that span several lines, keeping the line breaks.", code: `poem = '''Zen mind
beginners mind'''
print(poem)`, output: `Zen mind
beginners mind`, explain: "The triple-quoted string contains a real newline between the two lines, so print() shows the text across two lines." },

{ id: "f2-038", cat: "strings", title: "String Repetition", desc: "Multiplying a string by an integer repeats it that many times. It is the fastest way to build repeated patterns.", code: `print('hi' * 3)
print("-" * 10)`, output: `hihihi
----------`, explain: "\"hi\" * 3 produces \"hihihi\". \"-\" * 10 produces a 10-dash divider, handy for pretty console output." },

{ id: "f2-039", cat: "strings", title: "Membership Test in Strings", desc: "The in operator checks whether a substring exists inside a string, returning a boolean. Combined with not, it tests absence.", code: `text = 'python rocks'
print("rock" in text)
print("zen" not in text)`, output: `True
True`, explain: "\"rock\" is a substring of \"python rocks\" so in is True. \"zen\" is absent, so not in is also True." },

{ id: "f2-040", cat: "strings", title: "String Concatenation", desc: "The + operator joins strings end to end into one new string. Use it to build messages from parts.", code: `first = 'Zen'
last = "Dev"
full = first + " " + last
print(full)`, output: `Zen Dev`, explain: "\"Zen\" + \" \" + \"Dev\" concatenates the three pieces into a single string \"Zen Dev\"." },

{ id: "f2-041", cat: "numbers", title: "Round Numbers", desc: "The round(number, digits) function rounds a float to a given number of decimal places, or to a whole number if digits is omitted.", code: `print(round(3.14159, 2))
print(round(2.5))`, output: `3.14
2`, explain: "round(3.14159, 2) keeps 2 decimals: 3.14. round(2.5) rounds to the nearest whole number using banker's rounding, giving 2." },

{ id: "f2-042", cat: "numbers", title: "Absolute Value", desc: "The abs() function returns the absolute value of a number — its distance from zero, always non-negative.", code: `print(abs(-10))
print(abs(3 - 8))`, output: `10
5`, explain: "abs(-10) is 10. abs(3 - 8) computes 3 - 8 = -5 first, then takes its absolute value: 5." },

{ id: "f2-043", cat: "numbers", title: "Minimum of Values", desc: "The min() function returns the smallest value among the arguments, or the smallest item of a single iterable like a list.", code: `print(min(4, 1, 9, 2))
print(min([7, 3, 5]))`, output: `1
3`, explain: "min(4, 1, 9, 2) scans the values and returns 1. min([7, 3, 5]) finds the smallest element of the list: 3." },

{ id: "f2-044", cat: "numbers", title: "Maximum of Values", desc: "The max() function returns the largest value among the arguments, or the largest item of a single iterable.", code: `print(max(4, 1, 9, 2))
print(max([7, 3, 5]))`, output: `9
7`, explain: "max(4, 1, 9, 2) returns 9, the biggest of the four values. max([7, 3, 5]) returns the largest list item: 7." },

{ id: "f2-045", cat: "numbers", title: "Sum of Numbers", desc: "The sum(iterable) function adds up all numbers in a list or tuple. The optional start argument adds an initial value.", code: `scores = [10, 20, 30]
print(sum(scores))
print(sum(scores, 100))`, output: `60
160`, explain: "sum(scores) adds 10 + 20 + 30 = 60. The second call starts from 100, giving 100 + 60 = 160." },

{ id: "f2-046", cat: "numbers", title: "Power with pow()", desc: "The pow(base, exp) function raises a number to a power. With a third argument it computes the result modulo that number.", code: `print(pow(2, 10))
print(pow(3, 3, 5))`, output: `1024
2`, explain: "pow(2, 10) is 2 raised to the 10th: 1024. pow(3, 3, 5) computes 27 mod 5, which is 2." },

{ id: "f2-047", cat: "numbers", title: "Ceiling with math.ceil()", desc: "math.ceil(x) from the math module rounds a number UP to the nearest whole number, no matter how small the fraction.", code: `import math
print(math.ceil(4.1))
print(math.ceil(-4.9))`, output: `5
-4`, explain: "ceil(4.1) rounds up to 5. ceil(-4.9) rounds UP toward zero to -4, because -4 is greater than -4.9." },

{ id: "f2-048", cat: "numbers", title: "Floor with math.floor()", desc: "math.floor(x) rounds a number DOWN to the nearest whole number, always toward negative infinity.", code: `import math
print(math.floor(4.9))
print(math.floor(-4.1))`, output: `4
-5`, explain: "floor(4.9) rounds down to 4. floor(-4.1) rounds down to -5, the nearest whole number below -4.1." },

{ id: "f2-049", cat: "numbers", title: "Square Root", desc: "math.sqrt(x) returns the square root of a positive number as a float. It raises ValueError for negative inputs.", code: `import math
print(math.sqrt(16))
print(math.sqrt(2))`, output: `4.0
1.4142135623730951`, explain: "sqrt(16) is exactly 4.0 (a float). sqrt(2) is an irrational number, shown as a long float approximation." },

{ id: "f2-050", cat: "numbers", title: "Pi Constant", desc: "The math module defines math.pi, the ratio of a circle's circumference to its diameter, accurate to float precision.", code: `import math
print(math.pi)
print(round(math.pi, 4))`, output: `3.141592653589793
3.1416`, explain: "math.pi holds the double-precision value of pi. round(math.pi, 4) gives a tidy 3.1416 for display." },

{ id: "f2-051", cat: "numbers", title: "Factorial", desc: "math.factorial(n) returns n! = n * (n-1) * (n-2) * ... * 1. For n = 5 that is 5*4*3*2*1 = 120.", code: `import math
print(math.factorial(5))`, output: `120`, explain: "factorial(5) multiplies 5 by 4 by 3 by 2 by 1, giving 120. Useful in combinatorics and probability." },

{ id: "f2-052", cat: "numbers", title: "divmod() Returns Both", desc: "divmod(a, b) returns a tuple with the quotient and the remainder of the division at once, like a single // and % pair.", code: `q, r = divmod(17, 5)
print(q)
print(r)`, output: `3
2`, explain: "17 divided by 5 fits 3 times with remainder 2. The tuple (3, 2) is unpacked into q and r." },

{ id: "f2-053", cat: "numbers", title: "Binary, Octal, Hex", desc: "bin(), oct() and hex() convert an integer to its binary, octal and hexadecimal string representations.", code: `print(bin(10))
print(oct(10))
print(hex(255))`, output: `0b1010
0o12
0xff`, explain: "10 in binary is 0b1010, in octal 0o12. 255 in hexadecimal is 0xff. The prefixes show the base." },

{ id: "f2-054", cat: "numbers", title: "int() with Base", desc: "int(string, base) parses a string written in any base from 2 to 36 and converts it to a decimal integer.", code: `print(int('1010', 2))
print(int("ff", 16))`, output: `10
255`, explain: "int(\"1010\", 2) reads the binary string as 10 in decimal. int(\"ff\", 16) reads hexadecimal ff as 255." },

{ id: "f2-055", cat: "numbers", title: "Random Float", desc: "random.random() returns a float in the half-open interval [0.0, 1.0). Every call produces a new unpredictable value.", code: `import random
print(random.random() > 0)
print(random.random() < 1)`, output: `True
True`, explain: "random() never returns exactly 1.0, so it is always greater than 0 and always less than 1. The exact values vary each run." },

{ id: "f2-056", cat: "numbers", title: "Random Integer", desc: "random.randint(a, b) returns a random integer between a and b, with BOTH endpoints included.", code: `import random
roll = random.randint(1, 6)
print(roll >= 1 and roll <= 6)`, output: `True`, explain: "randint(1, 6) simulates a die roll — every result is guaranteed to be 1, 2, 3, 4, 5 or 6." },

{ id: "f2-057", cat: "numbers", title: "Random Choice", desc: "random.choice(sequence) picks one random element from a list, tuple or string.", code: `import random
team = ["zen", "dev", "code"]
print(random.choice(team))`, output: `Random`, explain: "choice() selects one of the three names at random, so the printed word changes on every run." },

{ id: "f2-058", cat: "numbers", title: "Shuffle a List", desc: "random.shuffle(list) rearranges the items of a list in place into a random order. The list itself is modified.", code: `import random
cards = ["A", "B", "C", "D"]
random.shuffle(cards)
print(cards)`, output: `Random`, explain: "shuffle() reorders the cards in a random permutation. The exact order differs on every execution." },

{ id: "f2-059", cat: "conditionals", title: "Basic If Statement", desc: "The if statement runs a block of code only when its condition evaluates to True. The block must be indented.", code: `age = 18
if age >= 18:
    print("Adult")`, output: `Adult`, explain: "The condition age >= 18 is True (18 >= 18), so the indented print() executes." },

{ id: "f2-060", cat: "conditionals", title: "If / Else", desc: "The else clause runs when the if condition is False. Exactly one of the two branches always executes.", code: `age = 15
if age >= 18:
    print("Adult")
else:
    print("Minor")`, output: `Minor`, explain: "age >= 18 is False for 15, so the if block is skipped and the else block prints \"Minor\"." },

{ id: "f2-061", cat: "conditionals", title: "Elif Chain", desc: "elif lets you check multiple conditions in order. The first True branch runs and the rest are skipped.", code: `score = 75
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(grade)`, output: `C`, explain: "75 fails the first two checks but passes score >= 70, so grade becomes \"C\". Only one branch executes." },

{ id: "f2-062", cat: "conditionals", title: "Nested If", desc: "An if statement inside another if is a nested conditional. The inner check only runs when the outer one is True.", code: `x = 10
y = 5
if x > 0:
    if y > 0:
        print("Both positive")
    else:
        print("x positive, y not")`, output: `Both positive`, explain: "The outer if (x > 0) passes, then the inner if checks y > 0. Both are True, so \"Both positive\" prints." },

{ id: "f2-063", cat: "conditionals", title: "Ternary Expression", desc: "The ternary operator value_if_true if condition else value_if_false picks one of two values in a single expression.", code: `age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)`, output: `Adult`, explain: "The condition age >= 18 is True, so the expression evaluates to \"Adult\" and is assigned to status." },

{ id: "f2-064", cat: "conditionals", title: "Truthy and Falsy", desc: "In conditions, every value is either truthy or falsy. False, 0, empty strings, empty lists and None are all falsy.", code: `for value in [0, 1, '', 'hi', [], [1], None]:
    if value:
        print("truthy:", value)
    else:
        print("falsy:", value)`, output: `falsy: 0
truthy: 1
falsy: 
truthy: hi
falsy: []
truthy: [1]
falsy: None`, explain: "Each item is tested directly as a condition. Non-zero numbers, non-empty strings/lists are truthy; zero, empty collections and None are falsy." },

{ id: "f2-065", cat: "conditionals", title: "Empty Collections Are Falsy", desc: "An empty list [], empty string \"\", empty dict {} and empty set are all falsy — a quick way to test for emptiness.", code: `cart = []
if not cart:
    print("Your cart is empty")`, output: `Your cart is empty`, explain: "not cart is True because the empty list is falsy, so the message prints. This reads naturally as \"if no items\"." },

{ id: "f2-066", cat: "conditionals", title: "And Operator", desc: "and returns True only when both sides are True. Python short-circuits: if the left side is False, the right side never runs.", code: `x = 5
y = 10
if x > 0 and y > 0:
    print("Both positive")
if x > 0 and y < 0:
    print("Never prints")`, output: `Both positive`, explain: "In the first if, both conditions hold, so it prints. In the second, y < 0 is False, so the whole and is False." },

{ id: "f2-067", cat: "conditionals", title: "Or for Defaults", desc: "or returns the first truthy value. A classic pattern: fall back to a default when a value is falsy.", code: `name = ''
display = name or "Guest"
print(display)
name = "Zen"
display = name or "Guest"
print(display)`, output: `Guest
Zen`, explain: "When name is empty (falsy), or yields the default \"Guest\". When name is \"Zen\" (truthy), or yields \"Zen\"." },

{ id: "f2-068", cat: "conditionals", title: "Not Operator", desc: "not flips a boolean: True becomes False and False becomes True. Often used with is and in.", code: `logged_in = False
if not logged_in:
    print("Please log in")`, output: `Please log in`, explain: "not False is True, so the block runs. \"if not logged_in\" reads as \"if the user is NOT logged in\"." },

{ id: "f2-069", cat: "conditionals", title: "Pass Statement", desc: "pass is a placeholder that does nothing. It keeps the block valid while you are still writing the logic.", code: `x = 10
if x > 5:
    pass  # TODO: implement later
print("Still runs")`, output: `Still runs`, explain: "An empty if block would be a syntax error; pass fills the block harmlessly and execution continues after it." },

{ id: "f2-070", cat: "conditionals", title: "Match-Case Basics", desc: "match-case (Python 3.10+) compares a value against patterns and runs the first matching case, like a switch statement.", code: `command = 'start'
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case _:
        print("Unknown")`, output: `Starting...`, explain: "command equals \"start\", so the first case runs. The underscore _ matches anything and acts as the default." },

{ id: "f2-071", cat: "conditionals", title: "Match with OR Pattern", desc: "A case pattern can combine alternatives with | so one case handles several exact values.", code: `color = 'red'
match color:
    case "red" | "green" | "blue":
        print("RGB color")
    case _:
        print("Other")`, output: `RGB color`, explain: "The pattern \"red\" | \"green\" | \"blue\" matches any of the three values, so \"RGB color\" prints." },

{ id: "f2-072", cat: "conditionals", title: "Match with Guard", desc: "A guard is an extra if condition attached to a case pattern with \"if\". The case matches only when the guard is True.", code: `point = (4, 4)
match point:
    case (x, y) if x == y:
        print("On the diagonal")
    case _:
        print("Not diagonal")`, output: `On the diagonal`, explain: "The pattern (x, y) captures the coordinates; the guard x == y is True for (4, 4), so that case runs." },

{ id: "f2-073", cat: "conditionals", title: "String Comparison", desc: "Strings compare lexicographically: character by character, using the Unicode order of each letter.", code: `print('apple' < 'banana')
print("Apple" < "apple")
print("a" < "aa")`, output: `True
True
True`, explain: "\"apple\" < \"banana\" because 'a' < 'b'. Uppercase 'A' has a smaller code than lowercase 'a'. \"a\" is a prefix of \"aa\", so it is smaller." },

{ id: "f2-074", cat: "conditionals", title: "Comparing Lists", desc: "Lists compare element by element, left to right. The first differing pair decides the result.", code: `print([1, 2, 3] < [1, 2, 4])
print([1, 2] < [1, 2, 3])`, output: `True
True`, explain: "The first lists match until 3 vs 4, and 3 < 4. For the second, [1, 2] is a prefix of [1, 2, 3], so it is smaller." },

{ id: "f2-075", cat: "conditionals", title: "True Equals 1 Gotcha", desc: "In Python, bool is a subclass of int: True is 1 and False is 0. Equality comparisons can surprise you.", code: `print(True == 1)
print(False == 0)
print(True + True)`, output: `True
True
2`, explain: "True is numerically 1, so True == 1 is True and True + True equals 2. Prefer \"is\" checks with booleans when exactness matters." },

{ id: "f2-076", cat: "conditionals", title: "If with In", desc: "Combining if with the in operator checks membership elegantly — much cleaner than a chain of == comparisons.", code: `fruit = 'apple'
if fruit in ["apple", "banana", "cherry"]:
    print("Known fruit")
else:
    print("Unknown")`, output: `Known fruit`, explain: "\"apple\" is in the list of known fruits, so the condition is True and \"Known fruit\" prints." },

{ id: "f2-077", cat: "conditionals", title: "Check Is None", desc: "Use \"is None\" (not == None) to test for the None object. This is the idiomatic way Python developers check it.", code: `value = None
if value is None:
    print("No value")
else:
    print(value)`, output: `No value`, explain: "is compares object identity. value really is the None object, so the first branch runs." },

{ id: "f2-078", cat: "conditionals", title: "Early Return Pattern", desc: "Functions can check invalid cases first and return early, keeping the happy path unindented and readable.", code: `def login(user, password):
    if user != "zen":
        return "Wrong user"
    if password != "1234":
        return "Wrong password"
    return "Welcome!"`, output: `None`, explain: "Each guard returns immediately when a check fails, so the final \"Welcome!\" only runs for perfect credentials." },

{ id: "f2-079", cat: "conditionals", title: "Conditional in f-String", desc: "Ternary expressions work inside f-string braces, letting you format output differently based on a condition.", code: `score = 85
print(f"Score: {score} ({'Pass' if score >= 50 else 'Fail'})")`, output: `Score: 85 (Pass)`, explain: "The ternary picks 'Pass' because 85 >= 50, and the f-string embeds it directly in the message." },

{ id: "f2-080", cat: "conditionals", title: "Combined Conditions", desc: "and, or and not can be freely mixed in one condition; parentheses keep the logic readable.", code: `age = 25
member = True
if (age >= 18 and member) or age >= 65:
    print("Discount applies")
else:
    print("No discount")`, output: `Discount applies`, explain: "The first group (age >= 18 and member) is True, so the or short-circuits and the discount message prints." },

{ id: "f2-081", cat: "loops", title: "For Loop with Range", desc: "for i in range(n) repeats the indented block n times, with i taking the values 0, 1, 2, ..., n-1.", code: `for i in range(3):
    print(i)`, output: `0
1
2`, explain: "range(3) produces 0, 1 and 2. The loop body runs once per value, printing each number on its own line." },

{ id: "f2-082", cat: "loops", title: "Range with Start and Step", desc: "range(start, stop, step) walks from start to stop-1, jumping by step. Negative steps count downwards.", code: `for i in range(2, 10, 3):
    print(i)
print("---")
for i in range(5, 0, -1):
    print(i)`, output: `2
5
8
---
5
4
3
2
1`, explain: "The first loop prints 2, 5, 8 (jumping by 3). The second counts down from 5 to 1 using a negative step." },

{ id: "f2-083", cat: "loops", title: "Loop over a List", desc: "The for loop iterates directly over any sequence, giving each element in order — no index needed.", code: `fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)`, output: `apple
banana
cherry`, explain: "Each iteration binds the next list element to the variable fruit until every element has been visited." },

{ id: "f2-084", cat: "loops", title: "Loop over a String", desc: "Iterating over a string visits one character at a time, which is perfect for text analysis.", code: `word = 'ZEN'
for ch in word:
    print(ch)`, output: `Z
E
N`, explain: "The loop walks through the string character by character, printing each letter on its own line." },

{ id: "f2-085", cat: "loops", title: "While Counter", desc: "A while loop repeats as long as its condition is True. A counter variable controls how many times it runs.", code: `count = 0
while count < 3:
    print("count:", count)
    count += 1`, output: `count: 0
count: 1
count: 2`, explain: "The condition count < 3 is checked before each iteration. count += 1 increments the counter so the loop eventually stops." },

{ id: "f2-086", cat: "loops", title: "While Until Condition", desc: "while keeps looping until a condition becomes False. This is ideal when the number of repeats is unknown in advance.", code: `balance = 100
target = 200
years = 0
while balance < target:
    balance += 25
    years += 1
print(years, "years")`, output: `4 years`, explain: "Each pass adds 25 to balance. After 4 passes balance reaches 200, the condition fails, and the loop ends." },

{ id: "f2-087", cat: "loops", title: "Break Statement", desc: "break immediately exits the loop, skipping anything after it and ignoring the remaining iterations.", code: `for i in range(1, 10):
    if i == 4:
        break
    print(i)`, output: `1
2
3`, explain: "When i becomes 4, break fires and the whole loop ends instantly — values 5 through 9 are never processed." },

{ id: "f2-088", cat: "loops", title: "Continue Statement", desc: "continue skips the rest of the current iteration and jumps straight to the next one.", code: `for i in range(1, 6):
    if i % 2 == 0:
        continue
    print(i)`, output: `1
3
5`, explain: "For even numbers the continue jumps to the next iteration, so only the odd values 1, 3, 5 get printed." },

{ id: "f2-089", cat: "loops", title: "Loop Else Clause", desc: "A loop can have an else block that runs when the loop finishes NORMALLY — it is skipped when break exits.", code: `for i in range(3):
    print(i)
else:
    print("Completed")`, output: `0
1
2
Completed`, explain: "The loop ends without break, so the else block executes. This distinguishes \"finished\" from \"broken out\"." },

{ id: "f2-090", cat: "loops", title: "Nested Loops", desc: "A loop inside another loop runs the inner loop completely for every single iteration of the outer loop.", code: `for i in range(1, 4):
    for j in range(1, 4):
        print(i, j)`, output: `1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
3 3`, explain: "For each outer i, the inner j loop runs from 1 to 3, producing 3 x 3 = 9 printed pairs." },

{ id: "f2-091", cat: "loops", title: "Enumerate", desc: "enumerate(iterable) yields (index, item) pairs, giving you both the position and the value in one go.", code: `colors = ['red', 'green', 'blue']
for index, color in enumerate(colors):
    print(index, color)`, output: `0 red
1 green
2 blue`, explain: "The loop unpacks each pair into index and color. Indices start at 0 by default, exactly like list indexing." },

{ id: "f2-092", cat: "loops", title: "Enumerate with Start", desc: "enumerate(iterable, start) lets you begin the index at any number, which is handy for user-facing numbering.", code: `steps = ['read', 'code', 'test']
for n, step in enumerate(steps, 1):
    print(n, step)`, output: `1 read
2 code
3 test`, explain: "With start=1, the counter begins at 1, producing a natural-looking numbered list." },

{ id: "f2-093", cat: "loops", title: "Zip Two Lists", desc: "zip(list1, list2) pairs up elements from both lists into tuples, stopping at the shorter list.", code: `names = ['Zen', 'Max']
scores = [95, 88]
for name, score in zip(names, scores):
    print(name, score)`, output: `Zen 95
Max 88`, explain: "Each iteration unpacks one (name, score) tuple, pairing the first with the first, the second with the second." },

{ id: "f2-094", cat: "loops", title: "Zip Three Lists", desc: "zip accepts any number of iterables. Each yielded tuple contains one element from each of them.", code: `a = [1, 2]
b = [10, 20]
c = [100, 200]
for x, y, z in zip(a, b, c):
    print(x + y + z)`, output: `111
222`, explain: "zip groups position by position: (1, 10, 100) then (2, 20, 200). Each tuple sums to 111 and 222." },

{ id: "f2-095", cat: "loops", title: "Reversed Loop", desc: "reversed(iterable) returns an iterator that walks a sequence backwards without modifying the original.", code: `for n in reversed([1, 2, 3]):
    print(n)`, output: `3
2
1`, explain: "reversed() yields items from the end to the start, so the loop prints 3, 2, 1." },

{ id: "f2-096", cat: "loops", title: "Sorted Loop", desc: "sorted(iterable) returns a new sorted list. Looping over it visits items in sorted order.", code: `for n in sorted([3, 1, 2]):
    print(n)`, output: `1
2
3`, explain: "sorted() builds a new list [1, 2, 3] from the original; the loop then visits it in ascending order." },

{ id: "f2-097", cat: "loops", title: "Loop over Dict Keys", desc: "Iterating over a dictionary directly yields its keys. Values are reached through the keys.", code: `ages = {'zen': 20, 'dev': 25}
for name in ages:
    print(name, ages[name])`, output: `zen 20
dev 25`, explain: "The loop variable name takes each key in turn, and ages[name] fetches the matching value." },

{ id: "f2-098", cat: "loops", title: "Loop over Dict Values", desc: "The .values() method lets you iterate over just the values of a dictionary, ignoring the keys.", code: `scores = {'a': 90, 'b': 80, 'c': 70}
total = 0
for s in scores.values():
    total += s
print(total)`, output: `240`, explain: "scores.values() yields 90, 80 and 70; each is added to total, giving 240." },

{ id: "f2-099", cat: "loops", title: "Loop over Dict Items", desc: "The .items() method yields (key, value) tuples, the cleanest way to walk through a whole dictionary.", code: `person = {'name': 'Zen', 'level': 7}
for key, value in person.items():
    print(key, "=", value)`, output: `name = Zen
level = 7`, explain: "Each iteration unpacks a (key, value) pair from .items(), printing both parts." },

{ id: "f2-100", cat: "loops", title: "While True with Break", desc: "while True loops forever unless something inside breaks out. Often used for menu or input loops.", code: `n = 0
while True:
    n += 1
    if n >= 3:
        break
    print(n)`, output: `1
2`, explain: "The loop increments n forever in theory, but when n hits 3 the break stops it. n printed 1 and 2 only." },

{ id: "f2-101", cat: "loops", title: "Sentinel Input Loop", desc: "A sentinel loop keeps asking for input until the user types a special stop word, like \"quit\".", code: `texts = []
while True:
    line = input("> ")
    if line == "quit":
        break
    texts.append(line)
print("Collected:", texts)`, output: `None`, explain: "Every entered line is appended to texts. Typing \"quit\" triggers the break and the collected lines print. Run it to try." },

{ id: "f2-102", cat: "loops", title: "Do-While Emulation", desc: "Python has no do-while, but while True with a break at the end runs the body at least once — same effect.", code: `attempt = 0
while True:
    attempt += 1
    print("Attempt", attempt)
    if attempt >= 2:
        break`, output: `Attempt 1
Attempt 2`, explain: "The body always executes before the stop check, exactly like a do-while loop in other languages." },

{ id: "f2-103", cat: "loops", title: "Accumulate a Sum", desc: "Loops excel at accumulating results. A running total variable grows with every iteration.", code: `total = 0
for i in range(1, 101):
    total += i
print(total)`, output: `5050`, explain: "total starts at 0 and each i from 1 to 100 is added. The famous sum of 1..100 is 5050." },

{ id: "f2-104", cat: "loops", title: "Accumulate a Product", desc: "A running product variable starts at 1 (the multiplicative identity) and multiplies each iteration.", code: `product = 1
for i in range(1, 6):
    product *= i
print(product)`, output: `120`, explain: "1 * 1 * 2 * 3 * 4 * 5 = 120. Starting product at 1 keeps multiplication correct; 0 would ruin it." },

{ id: "f2-105", cat: "loops", title: "Build a String in a Loop", desc: "Strings can be built progressively inside a loop using concatenation or list join.", code: `result = ''
for i in range(1, 6):
    result += str(i) + " "
print(result.strip())`, output: `1 2 3 4 5`, explain: "Each iteration appends the number and a space. strip() removes the trailing space before printing." },

{ id: "f2-106", cat: "loops", title: "Find the Maximum", desc: "A classic loop pattern: keep a best-so-far variable and update it whenever you see something bigger.", code: `numbers = [4, 9, 2, 7]
best = numbers[0]
for n in numbers:
    if n > best:
        best = n
print(best)`, output: `9`, explain: "best starts at 4. The loop compares each number and replaces best whenever a larger one appears, ending at 9." },

{ id: "f2-107", cat: "loops", title: "Early-Exit Flag", desc: "A boolean flag tracks whether something was found; the loop can break early to save work.", code: `numbers = [3, 5, 7, 11]
found = False
for n in numbers:
    if n == 7:
        found = True
        break
print("Found:", found)`, output: `Found: True`, explain: "The flag starts False. When 7 is found, the flag flips to True and break stops the search immediately." },

{ id: "f2-108", cat: "loops", title: "Multiplication Table", desc: "Nested loops generate a grid — the outer loop is the row, the inner loop is the column.", code: `for i in range(1, 4):
    row = ""
    for j in range(1, 4):
        row += str(i * j) + " "
    print(row.strip())`, output: `1 2 3
2 4 6
3 6 9`, explain: "For each row i, the inner loop computes i * j for columns 1-3, building the row string before printing it." },

{ id: "f2-109", cat: "loops", title: "Star Pyramid", desc: "By varying the inner loop's range based on the outer variable, loops can draw shapes like pyramids.", code: `for i in range(1, 6):
    print("*" * i)`, output: `*
**
***
****
*****`, explain: "Iteration i prints i stars using string repetition. The pyramid grows one star per line." },

{ id: "f2-110", cat: "loops", title: "Countdown with Negative Step", desc: "range(start, stop, step) with a negative step counts down, which is perfect for countdowns.", code: `for i in range(10, 0, -2):
    print(i)`, output: `10
8
6
4
2`, explain: "Starting at 10, each step subtracts 2, and the loop stops once i would drop below 1 — odd numbers never appear." },

{ id: "f2-111", cat: "loops", title: "Loop with Else and Break", desc: "The loop-else runs only when no break happened — a perfect primality test pattern.", code: `for n in range(2, 10):
    for d in range(2, n):
        if n % d == 0:
            break
    else:
        print(n, "is prime")`, output: `2 is prime
3 is prime
5 is prime
7 is prime`, explain: "For each n, the inner loop searches for a divisor. If none is found, the else fires and n prints as prime." },

{ id: "f2-112", cat: "loops", title: "Iterate Two Lists in Parallel", desc: "Combining zip() and enumerate() gives you index and paired elements from two lists at once.", code: `names = ['Zen', 'Max', 'Ivy']
levels = [3, 7, 5]
for i, (name, level) in enumerate(zip(names, levels), 1):
    print(i, name, level)`, output: `1 Zen 3
2 Max 7
3 Ivy 5`, explain: "zip pairs each name with its level; enumerate adds a 1-based counter. The tuple (name, level) is unpacked inline." },

{ id: "f2-113", cat: "loops", title: "Loop over a Set", desc: "Sets iterate in no particular order, but every element is visited exactly once.", code: `skills = {'python', 'sql', 'git'}
for s in skills:
    print(s)`, output: `Random`, explain: "The set guarantees each skill prints once, but the order is arbitrary — it can differ between runs." },

{ id: "f2-114", cat: "loops", title: "Loop over a Tuple", desc: "Tuples are iterable exactly like lists; use them when the data should never change.", code: `point = (10, 20)
for coord in point:
    print(coord)`, output: `10
20`, explain: "The loop visits the tuple's two elements in order. Tuples and lists both work directly in for loops." },

{ id: "f2-115", cat: "loops", title: "Skip with Continue (Evens)", desc: "continue is ideal for filtering inside loops — skip unwanted values, process the rest.", code: `for i in range(1, 11):
    if i % 2 == 1:
        continue
    print(i)`, output: `2
4
6
8
10`, explain: "Odd numbers trigger continue and are skipped; only even numbers reach the print statement." }

]);
/* ZENTHON — Python examples (file 1 of 5): FUNDAMENTALS */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f1-001", cat: "getting-started", title: "Hello, World!", desc: "A Hello, World program is the traditional first program in any language. It prints a single line of text to the console, proving the interpreter is installed and working. In Python, printing requires no boilerplate: just one built-in function call.", code: `# The classic first program
print("Hello, World!")`, output: `Hello, World!`, explain: "The print() built-in function sends its argument to standard output. The string literal Hello, World! is passed as the only argument. Python automatically appends a newline, so the text appears on its own line." },

{ id: "f1-002", cat: "getting-started", title: "print with multiple arguments", desc: "The print() function accepts any number of arguments and writes them all to the console. By default, arguments are separated by a single space. Each argument is converted to a string automatically before being printed.", code: `# Print accepts several arguments at once
print("Zen", "X", "Dev", 2026)`, output: `Zen X Dev 2026`, explain: "Each argument is written in order, and print() inserts a space between them. Numbers and text mix freely because print() converts everything to strings. The values appear on one line because print() adds a newline at the end." },

{ id: "f1-003", cat: "getting-started", title: "print with custom separator", desc: "The sep parameter of print() controls the separator placed between multiple arguments. Any string can be used, which makes it easy to format output like CSV rows or date strings. When sep is omitted, a single space is used.", code: `# sep replaces the default space separator
print("2026", "08", "18", sep="-")
print("red", "green", "blue", sep=", ")`, output: `2026-08-18
red, green, blue`, explain: "The first call uses a dash as the separator, producing a date-like string. The second call uses a comma and a space, producing a list-like string. Neither call changes the fact that print() adds a final newline." },

{ id: "f1-004", cat: "getting-started", title: "single-line comments", desc: "A comment is text in the source code that Python ignores completely. Single-line comments start with a hash symbol and run to the end of the line. Comments exist to explain code to humans, not to machines.", code: `# This whole line is a comment
print("Comments help humans")  # inline comment too`, output: `Comments help humans`, explain: "The first line starts with a hash symbol, so the interpreter skips it entirely. The second line prints text and then contains a trailing comment after the code. Removing every comment would not change the behavior of the program at all." },

{ id: "f1-005", cat: "getting-started", title: "multi-line comments and docstrings", desc: "Python has no dedicated multi-line comment syntax. A triple-quoted string that appears on its own acts as a multi-line comment because its value is discarded. When placed at the top of a module, class, or function, such strings become docstrings that tools like help() can read.", code: `"""This is a module docstring.
It spans multiple lines and documents the file."""
print("Triple-quoted strings are ignored here")`, output: `Triple-quoted strings are ignored here`, explain: "The interpreter evaluates the triple-quoted string expression and discards the value, so nothing is printed from it. The print() line below it runs normally. Docstrings are the recommended way to add longer documentation to modules, classes, and functions." },

{ id: "f1-006", cat: "getting-started", title: "why indentation matters", desc: "Python uses indentation instead of braces or keywords to define blocks of code. A consistent indentation level, usually four spaces, tells Python which statements belong to an if, for, or function. Mixed or missing indentation raises an IndentationError, so whitespace is part of the syntax.", code: `if 5 > 3:
    print("Inside the if block")
    print("Still indented, still inside")
print("Outside the block")`, output: `Inside the if block
Still indented, still inside
Outside the block`, explain: "The two indented lines under if 5 > 3 form a block that executes when the condition is true. The final print() has no indentation, so it is outside the block and always runs. Indentation depth is the only thing separating the two groups of statements." },

{ id: "f1-007", cat: "getting-started", title: "Python keywords list", desc: "Keywords are reserved words with a fixed meaning in the language, so they cannot be used as variable names. Python exposes the full list through the keyword module. The list changes slightly between versions as new features are added.", code: `import keyword
print(keyword.kwlist[:8])
print(keyword.iskeyword("for"))
print(keyword.iskeyword("loop"))`, output: `['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await']
True
False`, explain: "keyword.kwlist is the list of all reserved words, and slicing it with [:8] prints the first eight. keyword.iskeyword() reports whether a given string is reserved. The word for is a keyword, while loop is an ordinary identifier you could use." },

{ id: "f1-008", cat: "getting-started", title: "running a .py file", desc: "A .py file is a script that Python executes top to bottom. The special variable __name__ is set to __main__ when the file runs directly, but to the module name when the file is imported. Checking if __name__ == __main__ is the standard way to run code only when executing a script directly.", code: `if __name__ == '__main__':
    print("Running this file directly")
else:
    print("Imported as a module")`, output: `Running this file directly`, explain: "When you run python myfile.py, Python sets __name__ to __main__, so the first branch executes. If another script imports this file, __name__ becomes the module name and the else branch runs instead. This pattern keeps test code out of reusable modules." },

{ id: "f1-009", cat: "getting-started", title: "checking Python version", desc: "The sys module exposes version information about the running interpreter. sys.version_info is a tuple of major, minor, and micro numbers, so programs can detect which Python version is running. Checking the major version is a common compatibility guard.", code: `import sys
if sys.version_info[0] >= 3:
    print("Python 3 or newer detected")
else:
    print("Old Python 2 detected")`, output: `Python 3 or newer detected`, explain: "sys.version_info[0] is the major version number, which is 3 for every modern interpreter. The comparison against 3 decides which message prints. Most code today simply assumes Python 3 and adds no check at all." },

{ id: "f1-010", cat: "getting-started", title: "help() function", desc: "help() is a built-in that opens the interactive help system. Passing an object or a string name like print displays its docstring and usage. It is the fastest way to recall how a function works without leaving the interpreter.", code: `def greet():
    """Says hello to the world."""
    return "Hi!"

help(greet)`, output: `Help on function greet in module __main__:

greet()
    Says hello to the world.
`, explain: "help() looks up the docstring attached to greet and prints a formatted help page. The header names the module, and the body shows the signature line followed by the docstring text. The same mechanism documents every built-in and library function." },

{ id: "f1-011", cat: "getting-started", title: "dir() function", desc: "dir() lists the attributes available on an object, such as methods and data members. Without arguments it lists the names in the current scope. It is a quick way to discover what an object can do.", code: `print('upper' in dir(str))
print("fly" in dir(str))
print("count" in dir(list))`, output: `True
False
True`, explain: "dir(str) returns a list of string attribute names, and the in operator checks membership. upper and count are real methods, so the checks are True. fly is not a string method, so its membership test is False." },

{ id: "f1-012", cat: "getting-started", title: "the Zen of Python", desc: "The Zen of Python is a collection of guiding principles for writing Python code, written by Tim Peters. It is distributed inside the interpreter and printed by the this module. The aphorisms emphasize readability, simplicity, and clarity.", code: `import this`, output: `The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!`, explain: "Importing the module this executes code that prints the Zen of Python once. The text is stored inside the module as a ROT13-encoded constant that gets decoded on import. Many style discussions in the Python community quote these lines as shared values." },

{ id: "f1-013", cat: "getting-started", title: "line continuation with backslash", desc: "A backslash at the end of a line tells Python that the statement continues on the next physical line. This is useful for long expressions that would be hard to read on one line. Parentheses, brackets, and braces also allow line breaks without a backslash.", code: `total = 1 + 2 + 3 \\
        + 4 + 5 + 6
print(total)`, output: `21`, explain: "The trailing backslash escapes the newline, so Python treats both physical lines as one logical line. The expression 1 plus 2 plus 3 plus 4 plus 5 plus 6 evaluates to 21. Removing the backslash would raise a syntax error." },

{ id: "f1-014", cat: "getting-started", title: "multiple statements on one line", desc: "Multiple simple statements can share one physical line when separated by semicolons. The style guide discourages this for readability, but it appears in scripts and interactive sessions. Compound statements like if or for still need their own lines.", code: `x = 5; y = 10; print(x + y)`, output: `15`, explain: "The interpreter runs each statement from left to right, assigning 5 to x and 10 to y, then printing their sum. Semicolons act purely as separators between statements. This is equivalent to writing the three statements on three separate lines." },

{ id: "f1-015", cat: "getting-started", title: "print vs return intuition", desc: "print() writes text to the console, while return hands a value back to the caller of a function. A function without a return statement returns None. print is for humans to see; return is for logic to use.", code: `def add(a, b):
    return a + b

def show(a, b):
    print(a + b)

result = add(2, 3)
print("add returned:", result)
show(4, 5)`, output: `add returned: 5
9`, explain: "add() computes 2 plus 3 and returns 5, which is stored in result and then printed with a label. show() prints 4 plus 5 directly to the console and returns None. The caller can use add()'s value in further math, but show()'s output is gone after printing." },

{ id: "f1-016", cat: "variables", title: "simple assignment", desc: "Assignment binds a name to a value using a single equals sign. The name is called a variable because the value it refers to can change later. Python creates the variable automatically on first assignment, so no declaration is needed.", code: `age = 25
name = "Maya"
print(age)
print(name)`, output: `25
Maya`, explain: "The first line stores the int 25 under the name age, and the second stores the string Maya under name. Each print() reads the stored value and sends it to the console. The values appear on separate lines because print() adds a newline each time." },

{ id: "f1-017", cat: "variables", title: "dynamic typing", desc: "Python is dynamically typed: a variable has no fixed type, and the same name can hold different types over its lifetime. The type is determined by the object it currently points to. This is flexible, but type errors only surface at runtime.", code: `value = 10
print(type(value).__name__)
value = "now a string"
print(type(value).__name__)
value = [1, 2, 3]
print(type(value).__name__)`, output: `int
str
list`, explain: "The name value is rebound three times, first to an int, then to a str, then to a list. Each call to type() reports the class of the current object. No error occurs because Python never locks a name to a single type." },

{ id: "f1-018", cat: "variables", title: "type() check", desc: "The type() built-in returns the type object of any value. Passing the result to print shows the classic class notation like <class 'float'>. Comparing type(x) is float tests whether x is exactly a float.", code: `x = 3.14
print(type(x))
print(type(x) is float)`, output: `<class 'float'>
True`, explain: "type(3.14) returns the type object float, which prints as <class 'float'>. The identity check compares that object to the float type itself. Because x really is a float, the comparison is True." },

{ id: "f1-019", cat: "variables", title: "multiple assignment in one line", desc: "Python can assign several variables at once by separating them with commas. The values on the right are packed into a tuple and unpacked into the names in order. This keeps related assignments on one readable line.", code: `a, b, c = 1, 2, 3
print(a, b, c)
first, second = ["alpha", "beta"]
print(first, second)`, output: `1 2 3
alpha beta`, explain: "The tuple (1, 2, 3) is unpacked so a gets 1, b gets 2, and c gets 3. In the second example a two-item list unpacks into first and second. The number of names must match the number of values or Python raises a ValueError." },

{ id: "f1-020", cat: "variables", title: "swapping two variables", desc: "Swapping two variables is a one-liner in Python thanks to tuple packing and unpacking. The right side builds a tuple of the current values, which are then unpacked into the names. No temporary variable is needed.", code: `x, y = 5, 9
print("before:", x, y)
x, y = y, x
print("after: ", x, y)`, output: `before: 5 9
after:  9 5`, explain: "The right side (y, x) is evaluated first, forming the tuple (9, 5). That tuple is then unpacked into x and y, so the values exchange places. The whole swap happens in a single statement with no temp variable." },

{ id: "f1-021", cat: "variables", title: "constants naming convention", desc: "Python has no true constants, but by convention names written in ALL_CAPS are treated as constants. Libraries and teams agree not to reassign them. This convention signals intent to every reader of the code.", code: `PI = 3.14159
MAX_RETRIES = 5
print(PI)
print(MAX_RETRIES)`, output: `3.14159
5`, explain: "PI and MAX_RETRIES follow the ALL_CAPS naming convention for values that should not change. The program reads them exactly like any other variable. Nothing in Python stops a later assignment to PI, so the convention relies on discipline." },

{ id: "f1-022", cat: "variables", title: "legal vs illegal names", desc: "Variable names may contain letters, digits, and underscores, but must not start with a digit. Keywords like for or class are forbidden, and hyphens or spaces are illegal. Names like _score, score2, and PLAYER_2 are all valid.", code: `player_score = 10
_score2 = 20
PLAYER_2 = 30
print(player_score, _score2, PLAYER_2)`, output: `10 20 30`, explain: "Each of the three names uses only letters, digits, and underscores, so Python accepts them. A leading underscore is legal and signals a private or internal name. Names like 2score or player-score would raise a syntax error." },

{ id: "f1-023", cat: "variables", title: "reassigning a variable", desc: "Assigning to a variable again simply rebinds the name to a new value. The old value is discarded if no other name references it. A variable can also be updated using its current value, as in x = x + 4.", code: `x = 1
x = x + 4
x = x * 2
print(x)`, output: `10`, explain: "Each assignment reads the current value of x and computes a new one. Starting from 1, the sequence is 1 plus 4 gives 5, then 5 times 2 gives 10. The final print shows the last value stored in x." },

{ id: "f1-024", cat: "variables", title: "deleting a variable with del", desc: "The del statement removes a name from the current scope. After deletion, using the name raises a NameError. del is handy for freeing large objects early or cleaning up temporary names.", code: `temp = 42
print(temp)
del temp
print("temp has been deleted")`, output: `42
temp has been deleted`, explain: "temp is created with 42 and printed normally. The del statement removes the binding, so the name no longer exists. The program never touches temp again, so it avoids the NameError that would otherwise follow." },

{ id: "f1-025", cat: "variables", title: "id() memory address", desc: "The id() built-in returns a unique integer identifying an object during its lifetime. In CPython this is the objects memory address. Comparing ids tells you whether two names point to the very same object.", code: `a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(id(a) == id(b))
print(id(a) == id(c))`, output: `True
False`, explain: "b = a copies the reference, so a and b point to the same list object and share an id. The line c = [1, 2, 3] builds a brand-new list with equal contents but a different object. Equality of contents is not the same as identity of objects." },

{ id: "f1-026", cat: "variables", title: "chained assignment", desc: "Chained assignment binds several names to the same object in one statement. a = b = c = 7 gives all three names the int 7. For immutable values this is harmless; for mutable ones, all names share one object.", code: `a = b = c = 7
print(a, b, c)
print(a is b)`, output: `7 7 7
True`, explain: "The chained assignment evaluates the right side once and binds all three names to that value. The identity check a is b is True because both names reference the same int object. Small ints like 7 are interned, so a is c would also be True." },

{ id: "f1-027", cat: "variables", title: "unpacking a tuple into variables", desc: "A tuples items can be pulled apart into individual variables in one assignment. The number of names must match the number of items, otherwise Python raises a ValueError. This pattern makes data like coordinates easy to work with.", code: `point = (3, 4)
x, y = point
print("x =", x, "y =", y)`, output: `x = 3 y = 4`, explain: "The tuple (3, 4) is unpacked so x receives 3 and y receives 4. Each print argument becomes part of the output line with spaces between them. The variable names are now independent values you can use in math." },

{ id: "f1-028", cat: "variables", title: "underscore as throwaway variable", desc: "By convention the name _ is used when a value is needed only to fill a slot. It appears when unpacking or looping over items we do not care about. Python does not treat _ specially; it is just a readable placeholder.", code: `_, kept = (999, 'important')
print(kept)

for _ in range(3):
    print("loop iteration")`, output: `important
loop iteration
loop iteration
loop iteration`, explain: "Unpacking puts 999 into the throwaway _ and the string into kept, which is printed. The loop uses _ as the loop variable simply because the value is never needed. Both uses make it clear the value is deliberately ignored." },

{ id: "f1-029", cat: "variables", title: "f-string interpolation of variables", desc: "F-strings, short for formatted string literals, insert variable values directly into a string. An f-string starts with f before the opening quote, and expressions inside braces are evaluated and formatted. They are the modern, readable way to build strings from data.", code: `name = 'Maya'
level = 3
print(f"{name} reached level {level}")
print(f"Double: {level * 2}")`, output: `Maya reached level 3
Double: 6`, explain: "The braces in the f-string are placeholders that get filled with the current values of name and level. Braces can contain whole expressions, like level * 2, which evaluate before being inserted. The result is a single formatted string passed to print()." },

{ id: "f1-030", cat: "variables", title: "variable reuse in loops", desc: "Variables assigned inside a loop persist after the loop ends. The loop variable itself holds its final value once the loop finishes. Assigning inside the body each iteration simply overwrites the previous value.", code: `for i in range(3):
    message = "tick"
    print(i, message)
print("final i:", i)
print("final message:", message)`, output: `0 tick
1 tick
2 tick
final i: 2
final message: tick`, explain: "The loop runs three times, printing the counter and the message each pass. message is reassigned to the same string every iteration, and i advances from 0 to 2. After the loop, both variables still exist and hold their last values." },

{ id: "f1-031", cat: "variables", title: "integer vs float assignment", desc: "Assigning a whole number creates an int, while a number with a decimal point creates a float. The values may look similar, but they are different types with different behavior in division. Check with type() when precision matters.", code: `whole = 10
fraction = 10.0
print(whole, type(whole).__name__)
print(fraction, type(fraction).__name__)`, output: `10 int
10.0 float`, explain: "The literal 10 has no decimal point, so whole becomes an int. The literal 10.0 keeps its decimal point, so fraction becomes a float. Even though the numeric value is the same, the two variables behave differently in expressions." },

{ id: "f1-032", cat: "variables", title: "string variable concatenation", desc: "The + operator joins two strings into one new string. Concatenation creates a brand-new string; the originals are unchanged. For joining many pieces, f-strings or join() are more efficient than repeated concatenation.", code: `first = 'Zen'
second = "Dev"
full = first + " " + second
print(full)`, output: `Zen Dev`, explain: "The expression first + [space] + second creates a new string by combining the two variables with a space between them. That new string is stored as full and printed. The original first and second strings remain untouched." },

{ id: "f1-033", cat: "variables", title: "boolean variable", desc: "A boolean variable holds one of the two constants True or False. Booleans are the result of comparisons and conditions. Note the capital letters: true and false without caps are ordinary names, not values.", code: `is_open = True
has_key = False
print(is_open, has_key)
print(3 > 2)`, output: `True False
True`, explain: "is_open and has_key are booleans assigned directly from the constants True and False. print() shows their values separated by a space. The comparison 3 > 2 also evaluates to True, which is printed on the second line." },

{ id: "f1-034", cat: "variables", title: "shadowing builtins warning", desc: "If you assign a name that matches a built-in like len, print, or list, you shadow the original for the rest of the scope. The built-in stops being reachable by that name. It is legal but almost always a bad idea; use a more specific name.", code: `len = 5
print(len)
print(5 + 5)`, output: `5
10`, explain: "The assignment len = 5 binds the name len to an int, hiding the built-in len function within this scope. print(len) therefore shows 5 instead of the function object. Calling len('abc') afterwards would fail with a TypeError." },

{ id: "f1-035", cat: "variables", title: "None assignment", desc: "None is a special value that means nothing or no result. It is the default return value of functions without a return statement. Testing with is None is the idiomatic way to check for its presence.", code: `result = None
print(result)
print(result is None)
print(type(result).__name__)`, output: `None
True
NoneType`, explain: "result is explicitly assigned None, meaning no value yet. Printing it shows the word None, and the identity check confirms it is the singleton None. Its type is NoneType, a type with exactly one value." },

{ id: "f1-036", cat: "datatypes", title: "int type", desc: "The int type represents whole numbers with arbitrary precision. Python ints can grow as large as memory allows, unlike many languages where integers overflow. Literals like 42, -7, and 0 are all ints.", code: `n = 42
print(n, type(n).__name__)
print(2 ** 50)`, output: `42 int
1125899906842624`, explain: "The variable n holds the int 42, and type() confirms its class. The expression 2 ** 50 computes a large integer exactly, with no overflow. Python handles integers of any size transparently." },

{ id: "f1-037", cat: "datatypes", title: "float type", desc: "The float type represents numbers with fractional parts using binary floating point. Literals with a decimal point or scientific notation like 1e3 are floats. Because floats store approximations, exact decimal math can be surprising.", code: `pi = 3.14159
print(pi, type(pi).__name__)
print(1e3)
print(0.1 + 0.2)`, output: `3.14159 float
1000.0
0.30000000000000004`, explain: "The literal 3.14159 is stored as a float, and 1e3 is scientific notation for 1000.0. Adding 0.1 and 0.2 produces a tiny rounding error because both values have no exact binary representation. This is normal IEEE 754 behavior." },

{ id: "f1-038", cat: "datatypes", title: "complex numbers", desc: "Complex numbers have a real and an imaginary part, written like 3 + 4j. The attributes .real and .imag expose each part as a float. Python is one of the few mainstream languages with complex numbers built in.", code: `z = 3 + 4j
print(z, type(z).__name__)
print(z.real, z.imag)
print(abs(z))`, output: `(3+4j) complex
3.0 4.0
5.0`, explain: "The literal 3 + 4j creates a complex number with real part 3 and imaginary part 4. Printing shows it in parentheses, and .real and .imag return the two parts. abs() computes the magnitude, which is 5 for a 3-4-5 triangle." },

{ id: "f1-039", cat: "datatypes", title: "str type", desc: "The str type holds sequences of characters, written with single or double quotes. Strings are immutable and support indexing, slicing, and many methods. Every other type can be converted to a string with str().", code: `greeting = 'Hello'
print(greeting, type(greeting).__name__)
print(len(greeting))
print(greeting[0], greeting[4])`, output: `Hello str
5
H o`, explain: "greeting stores the five-character string Hello, and type() reports it as str. len() counts its characters, and indexing with square brackets pulls out single characters. Index 0 is the first character and index 4 is the last." },

{ id: "f1-040", cat: "datatypes", title: "bool type", desc: "The bool type has exactly two values: True and False. Booleans are produced by comparison and logical operators. They are technically a subclass of int, with True equal to 1 and False equal to 0.", code: `flag = True
print(flag, type(flag).__name__)
print(3 > 2)
print(True + True)`, output: `True bool
True
2`, explain: "flag is a bool with the value True, and type() reports its class. The comparison 3 > 2 evaluates to True. Because bool subclasses int, adding True and True produces the int 2." },

{ id: "f1-041", cat: "datatypes", title: "list type", desc: "A list is an ordered, mutable collection written with square brackets. Items can be added, removed, or changed in place. Lists can mix any types and nest inside each other.", code: `colors = ['red', 'green', 'blue']
print(colors, type(colors).__name__)
colors.append("yellow")
colors[0] = "crimson"
print(colors)`, output: `['red', 'green', 'blue'] list
['crimson', 'green', 'blue', 'yellow']`, explain: "The list starts with three strings, and type() confirms it is a list. append() adds yellow to the end, while indexing assigns a new value to position 0. The second print shows both changes in place." },

{ id: "f1-042", cat: "datatypes", title: "tuple type", desc: "A tuple is an ordered collection written with parentheses, and it is immutable: items cannot be changed once created. Tuples are often used for fixed groups like coordinates or return values. They are faster than lists and hashable when their items are hashable.", code: `point = (10, 20)
print(point, type(point).__name__)
print(point[0])`, output: `(10, 20) tuple
10`, explain: "The parentheses literal creates a tuple holding 10 and 20. Indexing works exactly like a list, so point[0] is 10. Attempting point[0] = 5 would raise a TypeError because tuples cannot be modified." },

{ id: "f1-043", cat: "datatypes", title: "dict type", desc: "A dict maps unique keys to values using curly braces and colons. Lookup by key is extremely fast. Dicts are mutable and preserve insertion order since Python 3.7.", code: `user = {'name': 'Maya', 'age': 30}
print(user, type(user).__name__)
user["city"] = "Tokyo"
print(user["name"], user["city"])`, output: `{'name': 'Maya', 'age': 30} dict
Maya Tokyo`, explain: "The literal maps the keys name and age to their values. Adding a new key is done by assignment, so user now has a city key too. Reading values with square-bracket key lookup retrieves Maya and Tokyo." },

{ id: "f1-044", cat: "datatypes", title: "set type", desc: "A set is an unordered collection of unique items written with curly braces. Duplicates are removed automatically, and membership tests are very fast. Sets support union, intersection, and difference operations.", code: `fruits = {'apple', 'banana', 'apple'}
print(len(fruits))
print("banana" in fruits)
print("mango" in fruits)`, output: `2
True
False`, explain: "The literal contains apple twice, but a set keeps only unique items, so its length is 2. Membership tests with in return True for banana and False for mango. This example avoids printing the set directly because iteration order is not guaranteed." },

{ id: "f1-045", cat: "datatypes", title: "NoneType", desc: "NoneType has exactly one value: None. It represents the absence of a value and is the default return of functions without a return statement. Printing None shows the word None.", code: `nothing = None
print(nothing)
print(type(nothing).__name__)
print(nothing is None)`, output: `None
NoneType
True`, explain: "nothing holds the singleton None, which prints as the word None. type() reveals its class is NoneType. The identity check with is None is the recommended way to test for it." },

{ id: "f1-046", cat: "datatypes", title: "bytes type", desc: "The bytes type is an immutable sequence of integers in the range 0 to 255. Literals are written with a b prefix, like b hello. Bytes are how binary data, files, and network payloads are handled.", code: `data = b'hello'
print(data, type(data).__name__)
print(data[0])
print(data.decode("utf-8"))`, output: `b'hello' bytes
104
hello`, explain: "The b prefix creates a bytes object that prints with a b prefix. Indexing returns the raw integer value, and 104 is the ASCII code for the letter h. decode() turns the bytes back into a normal string using UTF-8." },

{ id: "f1-047", cat: "datatypes", title: "range type", desc: "A range represents an arithmetic sequence of integers, usually used for looping. It is lazy: the numbers are generated on demand, saving memory. range(start, stop, step) produces the same values as slicing a list with those bounds.", code: `r = range(5)
print(r, type(r).__name__)
print(list(r))
print(list(range(2, 8, 2)))`, output: `range(0, 5) range
[0, 1, 2, 3, 4]
[2, 4, 6]`, explain: "range(5) stands for the numbers 0 through 4 and prints its definition rather than its items. Converting with list() materializes the numbers so they can be seen. The third range starts at 2 and steps by 2, stopping before 8." },

{ id: "f1-048", cat: "datatypes", title: "frozenset type", desc: "A frozenset is an immutable version of a set. Because it cannot change, it is hashable and can be stored in other sets or used as dict keys. It still supports fast membership tests and set math.", code: `fs = frozenset([1, 2, 2, 3])
print(len(fs))
print(3 in fs)
print(type(fs).__name__)`, output: `3
True
frozenset`, explain: "The frozenset constructor takes any iterable and keeps unique items, so duplicates collapse. Its length is 3 and membership of 3 is True. The class name prints as frozenset, and attempts to mutate it would fail." },

{ id: "f1-049", cat: "datatypes", title: "type() vs isinstance()", desc: "type(x) returns the exact type of x, while isinstance(x, T) also accepts subclasses. Because everything in Python inherits from object, isinstance(x, object) is always True. Prefer isinstance for flexible and readable checks.", code: `x = [1, 2, 3]
print(type(x) == list)
print(isinstance(x, list))
print(isinstance(x, object))
print(isinstance(True, int))`, output: `True
True
True
True`, explain: "Both type(x) == list and isinstance(x, list) agree that x is a list. isinstance(x, object) is True because every object inherits from object. The last line shows isinstance accepting True as an int, since bool is a subclass of int." },

{ id: "f1-050", cat: "datatypes", title: "int() conversion", desc: "The int() constructor converts compatible values into an int. It accepts floats, strings of digits, and even a base for parsing. When a float is converted, it is truncated toward zero.", code: `print(int('42'))
print(int(3.9))
print(int(3.1))
print(int("101", 2))`, output: `42
3
3
5`, explain: "The string 42 converts cleanly to the int 42. Floats truncate toward zero, so both 3.9 and 3.1 become 3. The optional base argument parses the string as binary, making 101 equal to 5." },

{ id: "f1-051", cat: "datatypes", title: "float() conversion", desc: "The float() constructor turns numbers or numeric strings into a float. Whole numbers gain a decimal point. Scientific notation strings like 1e3 are accepted. Invalid text raises a ValueError.", code: `print(float('3.5'))
print(float(2))
print(float("1e3"))`, output: `3.5
2.0
1000.0`, explain: "The string 3.5 converts to the float 3.5. The int 2 becomes the float 2.0, gaining a decimal point. The string 1e3 is parsed as scientific notation and becomes 1000.0." },

{ id: "f1-052", cat: "datatypes", title: "str() conversion", desc: "The str() constructor produces the string representation of any object. It works on numbers, booleans, lists, and anything else. This is how you build text output from data.", code: `print(str(123))
print(str(3.14))
print(str([1, 2]))`, output: `123
3.14
[1, 2]`, explain: "Each argument is converted to its printable string form by str(). The int 123 becomes the text 123, and the float becomes 3.14. The list becomes the bracket notation with a comma and space." },

{ id: "f1-053", cat: "datatypes", title: "bool() conversion", desc: "The bool() constructor converts any value to True or False using truthiness rules. Zero, empty collections, and None become False; everything else becomes True. The conversion is what happens implicitly in if conditions.", code: `print(bool(0))
print(bool(1))
print(bool(""))
print(bool("hi"))
print(bool([]))`, output: `False
True
False
True
False`, explain: "The int 1 is truthy and converts to True, while 0 is falsey. An empty string and an empty list are both falsey. A nonempty string like hi is truthy, so the result is True." },

{ id: "f1-054", cat: "datatypes", title: "truthiness of values", desc: "In a boolean context, values are judged true or false. The falsey values are False, None, 0, 0.0, empty strings, and empty collections like [], {}, (), and set(). Every other value is truthy, including nonzero numbers and nonempty text.", code: `print(bool(0), bool(-5))
print(bool(""), bool(" "))
print(bool([]), bool([0]))
print(bool(None))`, output: `False True
False True
False True
False`, explain: "Zero is falsey but -5 is truthy because it is nonzero. An empty string is falsey while a string containing a space is truthy. An empty list is falsey, but a list holding 0 still counts as truthy because it is nonempty." },

{ id: "f1-055", cat: "datatypes", title: "explicit vs implicit conversion", desc: "Implicit conversion happens automatically, like when an int and a float are combined and the result becomes a float. Explicit conversion is written by the programmer with functions like int() or str(). Python is strict: adding a string and a number fails without explicit conversion.", code: `x = 10
y = x / 4
print(y, type(y).__name__)
z = "count: " + str(x)
print(z)`, output: `2.5 float
count: 10`, explain: "Dividing the int 10 by 4 implicitly produces a float, 2.5. The str() call is an explicit conversion that turns x into text so it can join the string with +. Without str(), the concatenation would raise a TypeError." },

{ id: "f1-056", cat: "datatypes", title: "mutable vs immutable types", desc: "A mutable object can be modified in place; an immutable one cannot. Lists, dicts, and sets are mutable, while ints, floats, strings, tuples, and frozensets are immutable. Operations on immutable values always create new objects.", code: `nums = [1, 2, 3]
nums.append(4)
print(nums)

name = "Zen"
name = name + " Dev"
print(name)`, output: `[1, 2, 3, 4]
Zen Dev`, explain: "The list changes in place: append() adds 4 to the same object, and printing shows the update. The string cannot change in place, so the + operator builds a brand-new string that is stored under name. The original string object is left untouched." },

{ id: "f1-057", cat: "datatypes", title: "hashable types", desc: "A hashable object has a stable hash value and can be used in sets and as dict keys. Immutable types such as int, str, tuple, and frozenset are hashable. Mutable containers like list and dict are not.", code: `print(hash(42) == hash(42))
print(hash("same") == hash("same"))
try:
    hash([1, 2])
except TypeError:
    print("list is not hashable")`, output: `True
True
list is not hashable`, explain: "The same value always hashes to the same number, so both equality checks are True. A list is mutable, so Python refuses to hash it and raises a TypeError. The try and except block catches that error and prints a message instead of crashing." },

{ id: "f1-058", cat: "datatypes", title: "type of a type", desc: "Every type is itself an object, and the type of any type is type. That makes type a metaclass that creates other types. Even the class int is an instance of type.", code: `print(type(int))
print(type(type))
print(type(42) is int)`, output: `<class 'type'>
<class 'type'>
True`, explain: "Both int and type itself are instances of type, so printing their types shows <class 'type'>. The last line confirms that 42 is an instance of int. This is why Python is said to treat everything as an object." },

{ id: "f1-059", cat: "datatypes", title: "checking type before operation", desc: "Verifying a values type before operating on it prevents runtime errors. isinstance() is the usual tool because it also accepts subclasses. This is defensive coding, common when handling mixed or user input.", code: `value = '123'
if isinstance(value, int):
    print(value + 1)
else:
    print("not an integer, skipping math")`, output: `not an integer, skipping math`, explain: "The string 123 fails the isinstance check against int, so the math branch is skipped. The else branch reports that the value is not usable for arithmetic. Without the guard, value + 1 would have crashed with a TypeError." },

{ id: "f1-060", cat: "datatypes", title: "numeric type promotion", desc: "When ints and floats mix in an operation, Python promotes the result to float to preserve precision. This is called type promotion or coercion. In Python 3, dividing two ints always yields a float, even when the division is exact.", code: `a = 5
b = 2.0
print(a + b)
print(type(a + b).__name__)
print(8 / 2)`, output: `7.0
float
4.0`, explain: "Adding the int 5 and the float 2.0 promotes the result to the float 7.0. The type() call confirms the promoted type is float. Even the exact division 8 / 2 returns 4.0 rather than the int 4." },

{ id: "f1-061", cat: "io", title: "input() returns a string", desc: "The input() built-in reads a line from the keyboard and returns it as a str, always. The optional prompt string is printed before reading. Any numeric-looking text is still a string until you convert it.", code: `name = input('Your name: ')
print("Hello, " + name)`, output: `Your name: Zen
Hello, Zen`, explain: "The prompt Your name: appears on screen, then input() waits for a line of text. Whatever the user types, here Zen, is returned as a string and stored in name. Concatenating with + works because both operands are strings." },

{ id: "f1-062", cat: "io", title: "converting input to int", desc: "Because input() returns a string, arithmetic needs a conversion. int() turns the typed digits into an integer so math works. A nonnumeric line raises a ValueError.", code: `age_text = input('Age: ')
age = int(age_text)
print("Next year:", age + 1)`, output: `Age: 30
Next year: 31`, explain: "The typed text 30 is captured as the string age_text. int() converts it to the integer 30 stored as age. Adding 1 now works and prints the result 31." },

{ id: "f1-063", cat: "io", title: "input to float", desc: "float() converts the string from input() into a floating-point number. This lets the program do decimal math on typed values. The input may contain a decimal point or scientific notation.", code: `height = float(input('Height in meters: '))
print("Double height:", height * 2)`, output: `Height in meters: 1.75
Double height: 3.5`, explain: "The typed text 1.75 is converted to a float in the same expression that reads the input. Multiplying by 2 gives 3.5, which prints after the label. Without float(), the multiplication would have repeated the text instead." },

{ id: "f1-064", cat: "io", title: "print defaults to a newline", desc: "By default print() ends its output with a newline character, so each call starts a new line. This is why separate print() calls stack lines vertically. The default can be changed with the end parameter.", code: `print('line one')
print("line two")
print("line three")`, output: `line one
line two
line three`, explain: "Each print() call appends a newline after its text, so three calls produce three lines. No explicit newline is needed in the strings themselves. This automatic newline is the default behavior of the end parameter." },

{ id: "f1-065", cat: "io", title: "print sep parameter", desc: "The sep parameter sets the string placed between multiple arguments. It accepts any string, including an empty one. The default separator is a single space.", code: `print('a', 'b', 'c', sep='|')
print("x", "y", sep="")
print("1", "2", sep=" and ")`, output: `a|b|c
xy
1 and 2`, explain: "The first call places a pipe between each pair of values. The empty separator joins x and y with nothing between them. The last call inserts the words and between 1 and 2." },

{ id: "f1-066", cat: "io", title: "print end parameter", desc: "The end parameter replaces the newline that print() adds by default. Using end with an empty string keeps the cursor on the same line for the next print. This is used for progress indicators and custom line endings.", code: `print('Downloading', end='')
print(".", end="")
print(" done")`, output: `Downloading. done`, explain: "The first two calls suppress their newlines, so their text joins into one line. The third call keeps the default end and finishes the line. The final output reads as a single sentence." },

{ id: "f1-067", cat: "io", title: "print with f-string", desc: "An f-string embeds expressions inside a string using braces. Values are formatted automatically, and format specifiers after a colon refine the output. F-strings make report-like output concise and readable.", code: `score = 87
total = 100
print(f"Score: {score} / {total}")
print(f"Percent: {score / total * 100:.1f}%")`, output: `Score: 87 / 100
Percent: 87.0%`, explain: "The braces pull in the current values of score and total. The second f-string computes 87 divided by 100 times 100 inside the braces. The :.1f specifier rounds the result to one decimal place, giving 87.0." },

{ id: "f1-068", cat: "io", title: "print with format()", desc: "The format() method places values into braces within a template string. It uses positional or named placeholders, with optional format specs. It predates f-strings and is still common in libraries.", code: `print('{} is {} years old'.format('Maya', 30))
print("{name} scored {score}".format(name="Dev", score=95))
print("{:.2f}".format(3.14159))`, output: `Maya is 30 years old
Dev scored 95
3.14`, explain: "Empty braces fill in positional arguments in order. Named placeholders match keyword arguments by name. The :.2f specifier rounds pi to two decimals, producing 3.14." },

{ id: "f1-069", cat: "io", title: "print with % formatting", desc: "The % operator performs printf-style formatting inherited from C. Conversion specifiers like %s, %d, and %.2f mark where values go. It is older and less flexible than format() and f-strings, but appears in legacy code.", code: `print('%s scored %d points' % ('Dev', 95))
print("Pi is about %.2f" % 3.14159)
print("%d%% complete" % 70)`, output: `Dev scored 95 points
Pi is about 3.14
70% complete`, explain: "The specifiers are replaced left to right by the values in the tuple, with %s for text and %d for ints. The %.2f specifier rounds to two decimals. A doubled percent sign prints a literal percent character." },

{ id: "f1-070", cat: "io", title: "printing multiple values", desc: "print() can take any number of arguments of mixed types. Each is converted to a string and separated by spaces. This is the quickest way to output several related values at once.", code: `print(1, 'two', 3.0, True)
print("sum:", 2 + 2)`, output: `1 two 3.0 True
sum: 4`, explain: "The four mixed arguments are each converted to text and joined with spaces. The second call evaluates 2 + 2 before printing, showing how expressions can be arguments. The output values all share one line." },

{ id: "f1-071", cat: "io", title: "reading multiple values from one input line", desc: "A single input line can supply several values by splitting the string. split() breaks text on whitespace and returns a list of strings, which are then unpacked into variables. Each piece is still a string and may need conversion.", code: `a, b = input('Two numbers: ').split()
print(int(a) + int(b))`, output: `Two numbers: 5 7
12`, explain: "The typed line 5 7 is split on whitespace into the strings 5 and 7. Tuple unpacking assigns them to a and b. int() converts both before addition, so the result is the number 12." },

{ id: "f1-072", cat: "io", title: "echo loop until user types quit", desc: "A while True loop reads input repeatedly until a sentinel value is typed. The break statement exits the loop, and continue would skip to the next read. This pattern powers menus, REPLs, and chat-style programs.", code: `while True:
    word = input("Say something: ")
    if word == "quit":
        print("Goodbye")
        break
    print("You said:", word)`, output: `Say something: hello
You said: hello
Say something: quit
Goodbye`, explain: "Each pass reads one line of input and stores it in word. When the line equals quit, the program prints Goodbye and break ends the loop. Any other line is echoed back, and the loop starts over." },

{ id: "f1-073", cat: "io", title: "print flush example", desc: "When output is buffered, text may not appear immediately. The flush parameter forces the buffer to be written to the console right away. Interactive progress indicators rely on flush=True.", code: `import time
print("Working", end="")
print(".", end="", flush=True)
time.sleep(0.5)
print(" done")`, output: `Working. done`, explain: "The first print writes Working without a newline. The second writes a dot and flushes immediately so it appears without delay. After a short pause, the final print finishes the line." },

{ id: "f1-074", cat: "io", title: "printing to a file", desc: "The file parameter of print() redirects output to an open file object instead of the console. Each print call writes a line to the file. The with statement closes the file automatically when the block ends.", code: `with open('log.txt', 'w') as f:
    print("boot complete", file=f)
    print("status: ok", file=f)
print("written")`, output: `written`, explain: "open() creates log.txt in write mode, and the with block gives us the file object f. Both print calls write their lines into the file rather than the console. The with statement closes the file, and the final print confirms the work on screen." },

{ id: "f1-075", cat: "io", title: "repr vs str in output", desc: "str() and repr() produce two different string views of an object. str() is a human-friendly description, while repr() is an unambiguous representation that could be used in code. print() uses str() internally, and the console shows repr() results for objects.", code: `line = r'a\\nb'
print(line)
print(str(line))
print(repr(line))`, output: `a\\nb
a\\nb
'a\\\\nb'`, explain: "The raw string keeps the backslash as a literal character, so the text is a backslash-n-b. print() and str() show the human-friendly form. repr() wraps the value in quotes and doubles the backslash to show the escape exactly as it would appear in source code." },

{ id: "f1-076", cat: "operators", title: "addition", desc: "The + operator adds numbers and also concatenates strings and lists. This double meaning is called overloading. The operands must be compatible types, or Python raises a TypeError.", code: `print(7 + 3)
print("ab" + "cd")
print([1, 2] + [3])`, output: `10
abcd
[1, 2, 3]`, explain: "Numbers add arithmetically to give 10. Strings concatenate to form abcd. Lists concatenate to form a longer list, [1, 2, 3], keeping the order of both operands." },

{ id: "f1-077", cat: "operators", title: "subtraction", desc: "The - operator subtracts numbers. It also works as a unary operator to negate a single value. Subtraction always returns a float when a float is involved.", code: `print(10 - 4)
print(10.5 - 2.5)
print(-(3 + 4))`, output: `6
8.0
-7`, explain: "The int subtraction gives the int 6. Mixing floats keeps the float type, so 10.5 minus 2.5 prints as 8.0. The unary minus negates the sum of 3 and 4, producing -7." },

{ id: "f1-078", cat: "operators", title: "multiplication", desc: "The * operator multiplies numbers. With a string and an int it repeats the string, and with a list and an int it repeats the items. This repetition trick is handy for padding or building test data.", code: `print(6 * 7)
print("ha" * 3)
print([0, 1] * 2)`, output: `42
hahaha
[0, 1, 0, 1]`, explain: "The numbers multiply to 42. The string repeats three times to form hahaha. The list repeats its two items twice, producing [0, 1, 0, 1]." },

{ id: "f1-079", cat: "operators", title: "true division", desc: "The / operator always returns a float in Python 3, even when the division is exact. This is called true division. To get an integer result, use // or int().", code: `print(7 / 2)
print(8 / 2)
print(10 / 4)`, output: `3.5
4.0
2.5`, explain: "Dividing 7 by 2 gives the float 3.5. Even the exact division 8 / 2 returns 4.0 instead of 4. Every division result keeps a decimal point because true division always yields a float." },

{ id: "f1-080", cat: "operators", title: "floor division", desc: "The // operator divides and rounds down to the nearest whole number. The result is a float only if an operand is a float. For negative numbers, floor division rounds towards negative infinity, not towards zero.", code: `print(7 // 2)
print(-7 // 2)
print(8.0 // 3)`, output: `3
-4
2.0`, explain: "The floor of 7 divided by 2 is 3. With negatives, -7 // 2 rounds down to -4 rather than toward zero. Because one operand is a float, the third result keeps a decimal point." },

{ id: "f1-081", cat: "operators", title: "modulo", desc: "The % operator returns the remainder of division. It is ideal for cycling, even and odd checks, and wrapping indices. The sign of the result follows the divisor in Python, which differs from some other languages.", code: `print(10 % 3)
print(10 % 5)
print(17 % 5)
print(-7 % 3)`, output: `1
0
2
2`, explain: "10 divided by 3 leaves a remainder of 1, and 10 by 5 leaves 0. The remainder of 17 divided by 5 is 2. In Python, -7 % 3 gives 2 because the sign follows the divisor, so the result is positive." },

{ id: "f1-082", cat: "operators", title: "exponent", desc: "The ** operator raises a number to a power. It works with fractional and negative exponents, giving roots and reciprocals. Exponentiation is right-associative, so 2 ** 3 ** 2 means 2 to the power of 3 squared.", code: `print(2 ** 10)
print(9 ** 0.5)
print(2 ** -1)
print(2 ** 3 ** 2)`, output: `1024
3.0
0.5
512`, explain: "2 raised to the 10th power is 1024. A half exponent takes the square root of 9, giving 3.0, and a negative exponent gives a reciprocal, 0.5. Right-associativity makes 2 ** 3 ** 2 equal 2 to the 9th, which is 512." },

{ id: "f1-083", cat: "operators", title: "operator precedence", desc: "Operator precedence decides which operation runs first in an expression without parentheses. Exponent binds tightest, then multiplication, division, and modulo, then addition and subtraction. Equal-precedence operators run left to right, except exponent.", code: `print(2 + 3 * 4)
print(2 * 3 ** 2)
print(10 - 2 - 3)`, output: `14
18
5`, explain: "Multiplication beats addition, so the first expression computes 3 times 4 plus 2. Exponent beats multiplication, so 2 times 9 gives 18. Left-to-right evaluation of the subtraction chain gives 5." },

{ id: "f1-084", cat: "operators", title: "parentheses to override precedence", desc: "Parentheses override the default operator precedence and make expressions explicit. They also improve readability even when not strictly needed. Nested parentheses evaluate from the innermost pair outward.", code: `print((2 + 3) * 4)
print((10 - 2) * (3 + 1))
print(2 ** (2 * 3))`, output: `20
32
64`, explain: "The inner sums are computed first, so 5 times 4 is 20 and 8 times 4 is 32. In the exponent, 2 times 3 is evaluated first, giving 2 to the 6th power, which is 64. Without the parentheses these results would differ." },

{ id: "f1-085", cat: "operators", title: "augmented assignment", desc: "Augmented assignment combines an operation with assignment: x += 5 is shorthand for x = x + 5. Similar forms exist for minus, times, divide, floor divide, modulo, and exponent. The left side is evaluated only once.", code: `total = 10
total += 5
total -= 3
total *= 2
total //= 4
print(total)`, output: `6`, explain: "Each line updates total in place: 10 plus 5 is 15, minus 3 is 12, times 2 is 24, and floor divided by 4 is 6. The final print shows the accumulated value. Each augmented form is exactly equivalent to the longer assignment." },

{ id: "f1-086", cat: "operators", title: "equality comparison", desc: "The == operator tests whether two values are equal, and != tests inequality. Comparison involves types: 5 == '5' is False because an int never equals a string. Equality checks value, not identity.", code: `print(5 == 5)
print(5 == "5")
print(5 != 6)
print([1, 2] == [1, 2])`, output: `True
False
True
True`, explain: "Two equal ints compare equal, but the number 5 and the text 5 do not. The not-equal test is True because 5 and 6 differ. Two separate lists with identical contents compare equal by value." },

{ id: "f1-087", cat: "operators", title: "ordering comparisons", desc: "The operators <, >, <=, and >= compare ordered types like numbers and strings. Strings compare lexicographically by character codes. Chained forms like a < b < c test both relations at once.", code: `print(3 < 5)
print(5 > 10)
print(3 <= 3)
print(5 >= 6)
print("apple" < "banana")`, output: `True
False
True
False
True`, explain: "Numbers compare numerically, so 3 is less than 5 but 5 is not greater than 10. The inclusive comparisons accept equal values. Strings compare letter by letter, and apple comes before banana alphabetically." },

{ id: "f1-088", cat: "operators", title: "chained comparison", desc: "Python lets you chain comparisons like 18 <= age < 65 to test a range in one expression. It is equivalent to 18 <= age and age < 65, with the middle operand evaluated once. Chained comparisons read naturally and reduce errors.", code: `age = 25
print(18 <= age < 65)
print(0 < age < 10)
print(1 < 2 < 3 < 4)`, output: `True
False
True`, explain: "The value 25 satisfies both 18 <= 25 and 25 < 65, so the chain is True. The second chain fails because 25 is not under 10. Long chains evaluate every pair, and 1 < 2 < 3 < 4 holds at each step." },

{ id: "f1-089", cat: "operators", title: "logical and", desc: "The and operator returns True only when both operands are truthy. It short-circuits: if the left operand is falsey, the right side never runs. and returns the last evaluated operand, which may not be a boolean.", code: `print(True and True)
print(True and False)
print(1 < 2 and 2 < 3)
print(0 and "unused")`, output: `True
False
True
0`, explain: "True and True is True, while any False makes the whole result False. The comparison chain 1 < 2 and 2 < 3 evaluates both sides to True. Because 0 is falsey, and returns 0 itself without touching the string." },

{ id: "f1-090", cat: "operators", title: "logical or", desc: "The or operator returns True when at least one operand is truthy. It short-circuits: if the left operand is truthy, the right side is skipped. Like and, it returns the last evaluated operand, enabling fallback patterns like value or default.", code: `print(True or False)
print(False or False)
print(0 or 7)
print("name" or "fallback")`, output: `True
False
7
name`, explain: "One truthy operand makes the result True, and two falsey operands give False. Since 0 is falsey, or evaluates the right side and returns 7. A truthy string like name is returned immediately, and the fallback is never used." },

{ id: "f1-091", cat: "operators", title: "logical not", desc: "The not operator flips a values truthiness and always returns a boolean. not True is False, and not of any falsey value is True. It binds looser than comparisons but tighter than and and or.", code: `print(not True)
print(not 0)
print(not "text")
print(not not 5)`, output: `False
True
False
True`, explain: "not True flips to False, and not of the falsey 0 flips to True. A nonempty string is truthy, so not text is False. Double negation cancels out, making not not 5 equal to True." },

{ id: "f1-092", cat: "operators", title: "short-circuit behavior", desc: "Short-circuiting means and and or evaluate operands only as far as needed. If the result is already determined by the left operand, the right side is never evaluated. This lets you write guards like x is not None and x < 10 without errors.", code: `def risky():
    print("risky() called")
    return True

print(False and risky())
print(True or risky())
print(True and risky())`, output: `False
True
risky() called
True`, explain: "The first two calls skip risky() entirely because the left operand already decides the answer. Only the third call actually runs risky(), which prints its message and returns True. Skipped calls have no side effects at all." },

{ id: "f1-093", cat: "operators", title: "identity operator is", desc: "The is operator checks whether two names refer to the very same object, comparing ids rather than values. The recommended use is testing against None, like result is None. For value equality use == instead.", code: `a = [1, 2]
b = [1, 2]
c = a
print(a is c)
print(a is b)
print(a is not b)`, output: `True
False
True`, explain: "The assignment c = a copies the reference, so a and c are the same object and is returns True. The literal b = [1, 2] builds a separate object with equal contents, so a is b is False. The negated form is True for that same pair." },

{ id: "f1-094", cat: "operators", title: "membership in a list", desc: "The in operator tests membership in a collection, returning True when the value is present. not in is the negation. For lists this is a linear scan; for sets and dict keys it is a fast lookup.", code: `planets = ['mercury', 'venus', 'earth']
print("earth" in planets)
print("mars" in planets)
print("mars" not in planets)`, output: `True
False
True`, explain: "The list contains earth, so the first test is True. mars is not in the list, so the second is False and the negated form is True. The comparisons are case-sensitive and check exact matches." },

{ id: "f1-095", cat: "operators", title: "membership in a string", desc: "The in operator also works on strings, testing whether one string appears as a substring. The check is case-sensitive and matches anywhere in the text. This is the idiomatic way to find text inside larger strings.", code: `text = 'zen and the art'
print("zen" in text)
print("the" in text)
print("XYZ" in text)
print("Art" in text)`, output: `True
True
False
False`, explain: "The substring zen appears at the very start, and the appears later in the sentence, so both tests are True. The text XYZ does not appear at all. Art with a capital A differs from art, so case-sensitive matching returns False." }

]);

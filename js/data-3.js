/* ZENTHON — Python examples (file 3 of 5): LISTS, TUPLES, SETS, DICTS, COMPREHENSIONS */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f3-001", cat: "lists", title: "Create a List", desc: "A list is an ordered, changeable collection that can hold items of any type. You create one with square brackets and comma-separated values. Lists can be empty or prefilled, and they preserve the order in which items were added.", code: `# A list of strings, created with square brackets
fruits = ["apple", "banana", "cherry"]
print(fruits)`, output: `['apple', 'banana', 'cherry']`, explain: "The literal [\"apple\", \"banana\", \"cherry\"] builds a list holding three strings in order. Printing the list shows it with square brackets and quotes. Lists keep this insertion order for the life of the variable." },

{ id: "f3-002", cat: "lists", title: "list() Constructor", desc: "list() is a built-in constructor that turns any iterable into a list. It works on tuples, strings, ranges, and sets. Calling list() with no arguments returns an empty list.", code: `# list() converts other sequences into a list
nums = list((1, 2, 3))
empty = list()
print(nums)
print(empty)`, output: `[1, 2, 3]
[]`, explain: "list((1, 2, 3)) consumes the tuple and produces a list of the same values. list() with no arguments creates an empty list. This constructor is handy when you need a mutable copy of a non-mutable sequence." },

{ id: "f3-003", cat: "lists", title: "Access by Index", desc: "Every item in a list has a numeric index starting at 0. Bracket notation list[i] fetches the item at that position. Using an index equal to or greater than the list length raises an IndexError.", code: `fruits = ['apple', 'banana', 'cherry']
# Indexes start at 0
print(fruits[0])
print(fruits[2])`, output: `apple
cherry`, explain: "fruits[0] reads the first element, \"apple\", because indexes begin at zero. fruits[2] reads the third element, \"cherry\". The middle element \"banana\" sits at index 1." },

{ id: "f3-004", cat: "lists", title: "Negative Index", desc: "Negative indexes count from the end of the list. Index -1 is the last item, -2 the second-to-last, and so on. This is a fast, readable way to reach the tail of a list.", code: `fruits = ['apple', 'banana', 'cherry']
# -1 is the last item, -2 the second-to-last
print(fruits[-1])
print(fruits[-2])`, output: `cherry
banana`, explain: "fruits[-1] returns \"cherry\", the final element. fruits[-2] returns \"banana\", the one before it. Negative indexes never require knowing the list length." },

{ id: "f3-005", cat: "lists", title: "Slicing", desc: "A slice extracts a sublist using the syntax list[start:end]. The start index is included and the end index is excluded. Omitting either side runs the slice to the beginning or end of the list.", code: `nums = [0, 1, 2, 3, 4, 5]
# slice[start:end], end is excluded
print(nums[1:4])`, output: `[1, 2, 3]`, explain: "nums[1:4] takes indexes 1, 2, and 3 while stopping before index 4. That yields the new list [1, 2, 3]. The original list is untouched because slicing copies." },

{ id: "f3-006", cat: "lists", title: "Slice with Step", desc: "A full slice takes the form list[start:stop:step]. The step value skips over items while slicing. A negative step makes the slice run backwards, which is the classic way to reverse a list.", code: `nums = [0, 1, 2, 3, 4, 5]
# [start:stop:step] - every 2nd item
print(nums[::2])
# Negative step reverses the list
print(nums[::-1])`, output: `[0, 2, 4]
[5, 4, 3, 2, 1, 0]`, explain: "nums[::2] walks the whole list taking every second value, giving [0, 2, 4]. nums[::-1] walks from the end with a step of -1, producing a reversed copy. Both slices leave nums unchanged." },

{ id: "f3-007", cat: "lists", title: "len()", desc: "len() returns the number of items inside a list. It is a built-in function, not a method, and works on any sequence. Checking len(list) is the standard way to measure list size.", code: `fruits = ['apple', 'banana', 'cherry']
# len() counts the items
print(len(fruits))`, output: `3`, explain: "The list holds three strings, so len(fruits) returns 3. The value is printed directly to the console. len() also works on strings, tuples, sets, and dicts." },

{ id: "f3-008", cat: "lists", title: "Membership with in", desc: "The in operator tests whether a value exists inside a list. It returns True if the value is present and False otherwise. Membership checks scan the list from start to finish.", code: `fruits = ['apple', 'banana', 'cherry']
# in checks whether an item exists
print("banana" in fruits)
print("mango" in fruits)`, output: `True
False`, explain: "\"banana\" in fruits scans the list and finds a match, so the result is True. \"mango\" is not in the list, so the second check is False. Both results print as boolean values." },

{ id: "f3-009", cat: "lists", title: "append()", desc: "append() adds a single item to the end of a list. The list is modified in place and nothing is returned. Use append() when building lists one value at a time.", code: `fruits = ['apple', 'banana']
# append() adds one item to the end
fruits.append("cherry")
print(fruits)`, output: `['apple', 'banana', 'cherry']`, explain: "append() places \"cherry\" after \"banana\", growing the list by one element. The change happens in place, so the original variable now holds the longer list. Printing shows the updated contents." },

{ id: "f3-010", cat: "lists", title: "extend()", desc: "extend() adds every item of another iterable to the end of a list. Unlike append(), which adds one object, extend() splices in each element. The argument can be a list, tuple, range, or any iterable.", code: `fruits = ['apple']
# extend() adds every item of another list
fruits.extend(["banana", "cherry"])
print(fruits)`, output: `['apple', 'banana', 'cherry']`, explain: "extend() takes the list [\"banana\", \"cherry\"] and adds both strings one by one. The result is a flat list of three items, not a nested one. append([...]) would instead nest the whole list as a single element." },

{ id: "f3-011", cat: "lists", title: "insert()", desc: "insert(index, value) places an item at a specific position in a list. Existing items shift right to make room. If the index is larger than the list, the item is appended at the end.", code: `fruits = ['apple', 'cherry']
# insert(index, value) puts an item at a position
fruits.insert(1, "banana")
print(fruits)`, output: `['apple', 'banana', 'cherry']`, explain: "insert(1, \"banana\") slides \"banana\" into position 1, pushing \"cherry\" to position 2. The list is modified in place. The final order is apple, banana, cherry." },

{ id: "f3-012", cat: "lists", title: "remove()", desc: "remove() deletes the first occurrence of a value from a list. It searches by value, not by position, and modifies the list in place. If the value does not exist, Python raises a ValueError.", code: `fruits = ['apple', 'banana', 'cherry']
# remove() deletes the first match by value
fruits.remove("banana")
print(fruits)`, output: `['apple', 'cherry']`, explain: "remove() scans for the first \"banana\" and deletes it, leaving the other elements in order. The list shrinks from three items to two. Nothing is returned by this method." },

{ id: "f3-013", cat: "lists", title: "pop()", desc: "pop() removes the last item from a list and returns it. It is the counterpart to append(), together forming a last-in-first-out structure. Calling pop() on an empty list raises an IndexError.", code: `fruits = ['apple', 'banana', 'cherry']
# pop() removes and returns the last item
last = fruits.pop()
print(last)
print(fruits)`, output: `cherry
['apple', 'banana']`, explain: "pop() takes \"cherry\" out of the list and hands it back, which is stored in last. Printing last shows \"cherry\". The list itself is now down to the first two fruits." },

{ id: "f3-014", cat: "lists", title: "pop(index)", desc: "pop() accepts an optional index and removes the item at that position. The removed value is returned just like with plain pop(). Any other elements shift down to fill the gap.", code: `fruits = ['apple', 'banana', 'cherry']
# pop(index) removes and returns that position
second = fruits.pop(1)
print(second)
print(fruits)`, output: `banana
['apple', 'cherry']`, explain: "pop(1) targets position 1, which holds \"banana\", and returns it into second. The remaining items \"apple\" and \"cherry\" keep their relative order. The list now has two elements." },

{ id: "f3-015", cat: "lists", title: "del by Index", desc: "The del statement removes an item from a list by its index. Unlike pop(), del does not return the deleted value. del can also delete slices or an entire variable.", code: `fruits = ['apple', 'banana', 'cherry']
# del removes an item by position without returning it
del fruits[0]
print(fruits)`, output: `['banana', 'cherry']`, explain: "del fruits[0] removes \"apple\", the element at position 0. The list is modified in place and nothing is returned. The remaining items shift forward to positions 0 and 1." },

{ id: "f3-016", cat: "lists", title: "clear()", desc: "clear() removes every item from a list, leaving it empty. The list object itself still exists and can be reused. This is faster and safer than reassigning a brand-new empty list when other references matter.", code: `fruits = ['apple', 'banana']
# clear() empties the whole list
fruits.clear()
print(fruits)`, output: `[]`, explain: "clear() deletes both elements in one call, mutating the list in place. Printing fruits now shows an empty pair of brackets. The variable still refers to a valid, usable list object." },

{ id: "f3-017", cat: "lists", title: "index()", desc: "index(value) finds the position of the first occurrence of a value in a list. The result is a zero-based integer index. If the value is absent, Python raises a ValueError.", code: `fruits = ['apple', 'banana', 'cherry']
# index() finds the position of a value
print(fruits.index("banana"))`, output: `1`, explain: "index() searches the list and finds \"banana\" sitting at position 1. The returned integer 1 is printed. Indexes count from zero, so \"apple\" is 0 and \"cherry\" is 2." },

{ id: "f3-018", cat: "lists", title: "count()", desc: "count(value) returns how many times a value appears in a list. It scans the entire list and totals the matches. A value that never appears counts as zero.", code: `nums = [1, 2, 2, 3, 2]
# count() counts occurrences of a value
print(nums.count(2))`, output: `3`, explain: "The list contains three copies of the number 2, so count(2) returns 3. The other values, 1 and 3, each appear once. count() never raises an error for missing values." },

{ id: "f3-019", cat: "lists", title: "sort()", desc: "sort() reorders a list in place in ascending order. It works on numbers, strings, and mixed-sortable types. Because it modifies the original list, no new list is returned.", code: `scores = [3, 1, 2]
# sort() reorders the list in place, ascending
scores.sort()
print(scores)`, output: `[1, 2, 3]`, explain: "sort() rearranges the elements of scores from smallest to largest. The operation happens in place, so scores itself now holds [1, 2, 3]. Nothing is returned by the call." },

{ id: "f3-020", cat: "lists", title: "sorted()", desc: "sorted() returns a brand-new list sorted in ascending order. The original list is left completely untouched. It accepts any iterable, not just lists.", code: `scores = [3, 1, 2]
# sorted() returns a new sorted list
new = sorted(scores)
print(new)
print(scores)`, output: `[1, 2, 3]
[3, 1, 2]`, explain: "sorted(scores) builds a fresh list [1, 2, 3] and stores it in new. The original scores still holds [3, 1, 2], proving it was not mutated. This is the key difference from the in-place sort() method." },

{ id: "f3-021", cat: "lists", title: "reverse()", desc: "reverse() flips the order of a list in place. The first item becomes last and the last becomes first. Like sort(), it mutates the existing list and returns None.", code: `fruits = ['apple', 'banana', 'cherry']
# reverse() flips the order in place
fruits.reverse()
print(fruits)`, output: `['cherry', 'banana', 'apple']`, explain: "reverse() walks the list and swaps the positions of the elements end to end. The original list is rearranged in place. Printing fruits now shows the reversed order." },

{ id: "f3-022", cat: "lists", title: "reversed()", desc: "reversed() returns an iterator that walks a list from the end. It does not modify the original list. Wrap the result in list() to materialize a reversed copy.", code: `fruits = ['apple', 'banana', 'cherry']
# reversed() returns an iterator, so wrap in list()
rev = list(reversed(fruits))
print(rev)`, output: `['cherry', 'banana', 'apple']`, explain: "reversed(fruits) yields items from last to first but is lazy, so list() pulls them into a new list. The copy rev holds the reversed order. The original fruits list is unchanged." },

{ id: "f3-023", cat: "lists", title: "copy()", desc: "copy() creates a shallow, independent copy of a list. Changes to the copy do not affect the original. For lists of simple values, a shallow copy is fully independent.", code: `fruits = ['apple', 'banana']
# copy() makes an independent shallow copy
copy = fruits.copy()
copy.append("cherry")
print(copy)
print(fruits)`, output: `['apple', 'banana', 'cherry']
['apple', 'banana']`, explain: "copy() duplicates fruits into a separate list object. Appending \"cherry\" mutates only the copy. Printing both shows the copy grew while the original stayed at two items." },

{ id: "f3-024", cat: "lists", title: "Reference vs Copy", desc: "Assigning one list to another name does not copy the data; both names point to the same object. Mutating through either name changes the shared list. Use copy() or slicing when you need true independence.", code: `fruits = ['apple', 'banana']
# Assignment shares the SAME list object
alias = fruits
alias.append("cherry")
print(fruits)`, output: `['apple', 'banana', 'cherry']`, explain: "alias = fruits simply gives the existing list a second name. When alias.append() mutates the list, fruits sees the change too. This shared-reference behavior is why copy() exists." },

{ id: "f3-025", cat: "lists", title: "Concatenation with +", desc: "The + operator joins two lists end to end into a brand-new list. Neither input list is modified. The result always contains every element of both operands in order.", code: `# + joins two lists into a brand new one
combined = [1, 2] + [3, 4]
print(combined)`, output: `[1, 2, 3, 4]`, explain: "[1, 2] + [3, 4] creates a fresh list that holds all four numbers. The two source lists remain unchanged. The result is a flat sequence of the combined elements." },

{ id: "f3-026", cat: "lists", title: "Repetition with *", desc: "The * operator repeats a list a given number of times. It builds a new list by copying the elements. Repetition is useful for creating rows of zeros or placeholder data.", code: `# * repeats a list a given number of times
repeat = [0] * 3
print(repeat)`, output: `[0, 0, 0]`, explain: "[0] * 3 duplicates the single-element list three times, producing [0, 0, 0]. A brand-new list is created, so the source is untouched. Multiplication works with any list content." },

{ id: "f3-027", cat: "lists", title: "Unpacking", desc: "Unpacking assigns each element of a list to a variable in one statement. The number of variables must match the number of items. A starred name can soak up any remaining items.", code: `# Values unpack into variables in order
a, b, c = ["x", "y", "z"]
print(a)
print(b, c)`, output: `x
y z`, explain: "The three strings are pulled from the list and bound to a, b, and c in order. a receives \"x\", b receives \"y\", and c receives \"z\". A single print statement can output several values at once." },

{ id: "f3-028", cat: "lists", title: "Swap via Unpacking", desc: "Tuple-style unpacking swaps two variables in one line. The right side is evaluated fully before any assignment happens. This removes the need for a temporary third variable.", code: `a = 1
b = 2
# Swap values without a temporary variable
a, b = b, a
print(a)
print(b)`, output: `2
1`, explain: "The right side (b, a) is evaluated first, producing (2, 1). Unpacking then binds a to 2 and b to 1. Both prints show the values have traded places." },

{ id: "f3-029", cat: "lists", title: "Nested List Access", desc: "A nested list stores other lists as its elements, forming a grid or matrix. Accessing a value uses two indexes: one for the row and one for the column. Chain as many indexes as there are nesting levels.", code: `grid = [[1, 2], [3, 4]]
# First index picks the row, second the column
print(grid[1][0])`, output: `3`, explain: "grid[1] selects the second inner list, [3, 4]. The extra [0] then picks its first element, 3. The two indexes are applied left to right, first row, then column." },

{ id: "f3-030", cat: "lists", title: "Matrix Creation", desc: "A comprehension can build a rectangular matrix of any size. Each outer iteration creates one inner row list. This is the idiomatic way to make grids of default values.", code: `# A 3x3 matrix of zeros using a comprehension
matrix = [[0] * 3 for _ in range(3)]
print(matrix)`, output: `[[0, 0, 0], [0, 0, 0], [0, 0, 0]]`, explain: "For each of the 3 outer iterations, the expression [0] * 3 creates a fresh row of three zeros. The underscore name means the loop value is unused. The result is three independent rows in one matrix." },

{ id: "f3-031", cat: "lists", title: "Flatten a Nested List", desc: "Flattening converts a list of lists into a single flat list. A comprehension with two for clauses does this compactly. The first loop iterates rows and the second iterates items inside each row.", code: `nested = [[1, 2], [3, 4]]
# Two for clauses flatten rows into one list
flat = [item for row in nested for item in row]
print(flat)`, output: `[1, 2, 3, 4]`, explain: "The outer loop visits each row, and the inner loop visits each item of that row. Items are appended in row order, so the result is [1, 2, 3, 4]. The original nested list is unchanged." },

{ id: "f3-032", cat: "lists", title: "min() and max()", desc: "min() returns the smallest item in a list and max() returns the largest. Both are built-in functions that accept any iterable. They also work on strings, comparing them lexicographically.", code: `nums = [4, 9, 2]
# min() and max() find smallest and largest
print(min(nums))
print(max(nums))`, output: `2
9`, explain: "min(nums) scans the list and returns 2, the smallest value. max(nums) returns 9, the largest value. Neither function modifies the list." },

{ id: "f3-033", cat: "lists", title: "sum()", desc: "sum() adds together every item of a numeric iterable. It accepts an optional second argument as the starting value. Non-numeric lists cause a TypeError.", code: `nums = [4, 9, 2]
# sum() adds every numeric item
print(sum(nums))`, output: `15`, explain: "sum(nums) totals 4 + 9 + 2 and returns 15. The list is read but never modified. For empty lists, sum() returns the default starting value of 0." },

{ id: "f3-034", cat: "lists", title: "all() and any()", desc: "all() returns True only if every item in a list is truthy. any() returns True if at least one item is truthy. Both are built-ins that short-circuit their scan as soon as the answer is known.", code: `checks = [True, True, False]
# all() needs every value truthy
print(all(checks))
# any() needs at least one truthy value
print(any(checks))`, output: `False
True`, explain: "The list contains a False, so all(checks) fails and prints False. Because one element is True, any(checks) succeeds and prints True. Both functions treat 0, None, and empty containers as falsy." },

{ id: "f3-035", cat: "lists", title: "enumerate()", desc: "enumerate() pairs each item with its index while looping. It returns tuples of (index, item) as you iterate. This replaces manual counter variables in for loops.", code: `fruits = ['apple', 'banana']
# enumerate() yields (index, item) pairs
for i, fruit in enumerate(fruits):
    print(i, fruit)`, output: `0 apple
1 banana`, explain: "enumerate(fruits) yields (0, \"apple\") then (1, \"banana\"). The for loop unpacks each pair into i and fruit. Printing i and fruit shows the index next to its item." },

{ id: "f3-036", cat: "lists", title: "zip Two Lists", desc: "zip() pairs up items from two or more iterables into tuples. It stops when the shortest input is exhausted. It is the standard tool for walking parallel lists together.", code: `names = ['Ann', 'Bob']
ages = [30, 25]
# zip() pairs up items from both lists
for name, age in zip(names, ages):
    print(name, age)`, output: `Ann 30
Bob 25`, explain: "zip(names, ages) produces (\"Ann\", 30) and (\"Bob\", 25). The loop unpacks each pair into name and age. Because both lists have two items, the pairing is complete." },

{ id: "f3-037", cat: "lists", title: "Slice Assignment", desc: "A slice on the left side of = can be replaced with another list. The replacement may be any length, shrinking or growing the list. This swaps a whole block of items in one statement.", code: `nums = [1, 2, 3, 4, 5]
# A slice can be replaced by another list
nums[1:3] = [8, 9]
print(nums)`, output: `[1, 8, 9, 4, 5]`, explain: "nums[1:3] selects positions 1 and 2, which hold 2 and 3. Assigning [8, 9] overwrites exactly those two slots. The final list keeps 1, 8, 9, then the untouched 4 and 5." },

{ id: "f3-038", cat: "lists", title: "List as a Stack", desc: "A stack is a last-in-first-out structure supported natively by lists. append() pushes items onto the top, and pop() removes them again. No extra class is needed for simple stack behavior.", code: `stack = []
# append() pushes, pop() pops (LIFO)
stack.append("a")
stack.append("b")
print(stack.pop())
print(stack)`, output: `b
['a']`, explain: "Two pushes load the stack with \"a\" then \"b\". pop() removes the newest item first, returning \"b\". The list that remains holds only \"a\", exactly like a physical stack of plates." },

{ id: "f3-039", cat: "lists", title: "Remove Duplicates via Set", desc: "Passing a list to set() keeps only unique values because sets cannot store repeats. Converting the set back with list() yields a deduplicated list. The resulting order is not guaranteed for arbitrary data.", code: `nums = [1, 2, 2, 3, 3]
# A set drops duplicates; list() converts back
uniq = list(set(nums))
print(uniq)`, output: `[1, 2, 3]`, explain: "set(nums) collapses the repeats into {1, 2, 3}. list() turns the set back into a list for printing. For these small integers CPython happens to show [1, 2, 3], but order is not guaranteed in general." },

{ id: "f3-040", cat: "lists", title: "List from range()", desc: "range() lazily generates a sequence of integers without storing them. Wrapping it in list() materializes the values into a real list. This is the classic way to create quick numeric lists.", code: `# range() produces a sequence; list() materializes it
nums = list(range(5))
print(nums)`, output: `[0, 1, 2, 3, 4]`, explain: "range(5) represents the numbers 0 through 4 but holds them lazily. list() forces them out into an actual list object. The printed result contains exactly five integers starting at zero." },

{ id: "f3-041", cat: "tuples", title: "Create a Tuple", desc: "A tuple is an ordered, immutable collection written with parentheses. Once created, its items cannot be changed, added, or removed. Tuples are ideal for fixed data like coordinates or constant records.", code: `# A tuple is an immutable, ordered collection
point = (3, 4)
print(point)`, output: `(3, 4)`, explain: "The literal (3, 4) packs two numbers into a tuple. Printing shows the values inside parentheses. The tuple keeps its order and cannot be modified later." },

{ id: "f3-042", cat: "tuples", title: "Access Elements", desc: "Tuple elements are read with the same bracket syntax used by lists. Indexes start at zero and negative indexes work too. Reading never violates immutability, so it is always allowed.", code: `point = (3, 4)
# Indexing works exactly like lists
print(point[0])
print(point[1])`, output: `3
4`, explain: "point[0] reads the first element, 3, and point[1] reads the second, 4. Indexing a tuple works identically to indexing a list. Only writing to a tuple is forbidden." },

{ id: "f3-043", cat: "tuples", title: "Unpacking", desc: "Unpacking assigns every element of a tuple to variables in one line. This works because the tuple length is fixed and known. It is widely used to pull values out of functions that return multiple results.", code: `point = (3, 4)
# Tuple unpacking assigns each element
x, y = point
print(x, y)`, output: `3 4`, explain: "The tuple (3, 4) is spread across x and y in order. x receives 3 and y receives 4. The single print statement outputs both values separated by a space." },

{ id: "f3-044", cat: "tuples", title: "Single-Element Tuple", desc: "A one-item tuple needs a trailing comma to be a tuple at all. Without the comma, parentheses just group an expression. The comma is what creates the tuple, and len() confirms it holds one value.", code: `# A trailing comma makes a one-item tuple
single = (5,)
print(single)
print(len(single))`, output: `(5,)
1`, explain: "(5,) with the trailing comma creates a tuple containing the single value 5. len(single) returns 1, proving it holds one item. Plain (5) would just be the integer 5." },

{ id: "f3-045", cat: "tuples", title: "Immutability Error", desc: "Tuples cannot be modified after creation. Attempting to assign to an index raises a TypeError. This immutability is the defining difference between tuples and lists.", code: `t = (1, 2)
# Tuples cannot be changed after creation
t[0] = 9`, output: `TypeError: 'tuple' object does not support item assignment`, explain: "The assignment t[0] = 9 tries to write into the tuple, which Python forbids. A TypeError is raised and the program stops. The traceback points at the offending line before any value is printed." },

{ id: "f3-046", cat: "tuples", title: "count()", desc: "count(value) returns how many times a value occurs inside a tuple. It scans the whole tuple and totals the matches. Missing values simply count as zero.", code: `t = (1, 2, 2, 3)
# count() counts occurrences of a value
print(t.count(2))`, output: `2`, explain: "The tuple holds 2 twice, so count(2) returns 2. The values 1 and 3 each appear once. count() never raises an error regardless of the value searched." },

{ id: "f3-047", cat: "tuples", title: "index()", desc: "index(value) returns the position of the first occurrence of a value. Positions are zero-based, just like lists. If the value is not present, a ValueError is raised.", code: `t = (1, 2, 2, 3)
# index() finds the first matching position
print(t.index(3))`, output: `3`, explain: "index(3) scans left to right and finds 3 at position 3. Even though 2 repeats, only its first position would be reported. The returned integer is printed directly." },

{ id: "f3-048", cat: "tuples", title: "Concatenation", desc: "The + operator joins two tuples into one longer tuple. A new tuple is created and the inputs are left untouched. The resulting order is all of the first followed by all of the second.", code: `t1 = (1, 2)
t2 = (3, 4)
# + builds a new tuple from both
print(t1 + t2)`, output: `(1, 2, 3, 4)`, explain: "t1 + t2 merges the two tuples into a fresh four-element tuple. The original t1 and t2 stay unchanged. Concatenation is safe here because it creates new data instead of mutating." },

{ id: "f3-049", cat: "tuples", title: "Repetition", desc: "The * operator repeats the contents of a tuple a set number of times. It builds a new, longer tuple. The original tuple is never modified.", code: `# * repeats a tuple into a longer one
print((1, 2) * 2)`, output: `(1, 2, 1, 2)`, explain: "(1, 2) * 2 copies the tuple twice in sequence. The result is the four-element tuple (1, 2, 1, 2). Repetition works with any multiplier, including zero." },

{ id: "f3-050", cat: "tuples", title: "Membership", desc: "The in operator checks whether a value exists inside a tuple. It returns True or False. Membership tests scan the tuple from start to finish.", code: `# in checks for a value inside a tuple
print(2 in (1, 2, 3))
print(9 in (1, 2, 3))`, output: `True
False`, explain: "The first check finds 2 inside (1, 2, 3) and prints True. The second check looks for 9, which is absent, and prints False. No error is raised when the value is missing." },

{ id: "f3-051", cat: "tuples", title: "Nested Tuples", desc: "Tuples can hold other tuples, forming multidimensional data. Accessing a nested value chains one index per level. Nested tuples are convenient for immutable grids or tree-like records.", code: `matrix = ((1, 2), (3, 4))
# Nested access: row, then column
print(matrix[1][0])`, output: `3`, explain: "matrix[1] selects the second inner tuple, (3, 4). The extra [0] then picks its first element, 3. Each index peels one level deeper into the structure." },

{ id: "f3-052", cat: "tuples", title: "namedtuple", desc: "namedtuple creates tuple subclasses with named fields. Values are accessed by attribute instead of by numeric index. They keep tuple immutability while making code far more readable.", code: `from collections import namedtuple

# namedtuple gives fields readable names
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)`, output: `3 4`, explain: "namedtuple defines a Point type with fields x and y. Point(3, 4) builds an instance with those values. Accessing p.x and p.y reads the fields by name instead of position." },

{ id: "f3-053", cat: "tuples", title: "Tuple as Dict Key", desc: "Tuples are hashable, so they can be dictionary keys. Lists, which are mutable, cannot. This makes tuples perfect for keys like coordinates that combine several numbers.", code: `# Tuples are hashable, so they can be keys
coords = {(0, 0): "origin"}
print(coords[(0, 0)])`, output: `origin`, explain: "The dict uses the tuple (0, 0) as a key mapping to \"origin\". Looking up coords[(0, 0)] finds that value. If a list were used instead, Python would raise a TypeError for being unhashable." },

{ id: "f3-054", cat: "tuples", title: "List to Tuple", desc: "tuple() converts any iterable, such as a list, into a tuple. The values keep their order. The conversion gives the data immutable, hashable behavior.", code: `# tuple() converts any iterable to a tuple
t = tuple([1, 2, 3])
print(t)`, output: `(1, 2, 3)`, explain: "tuple([1, 2, 3]) consumes the list and builds a tuple with the same three values. The original list still exists. The new tuple is immutable and can be used as a dict key." },

{ id: "f3-055", cat: "tuples", title: "Tuple to List", desc: "list() converts a tuple into a mutable list. This is useful when you need to modify data that started as a tuple. Tuples remain the right choice for fixed data; convert only when mutability is actually required.", code: `# list() converts a tuple into a mutable list
lst = list((1, 2, 3))
lst.append(4)
print(lst)`, output: `[1, 2, 3, 4]`, explain: "list((1, 2, 3)) builds a list from the tuple's values. Because a list is mutable, append(4) succeeds. The printed list shows the added element, something a tuple could never do." },

{ id: "f3-056", cat: "sets", title: "Create a Set", desc: "A set is an unordered collection of unique values written with curly braces. Duplicate values collapse into one element. Sets are optimized for fast membership testing.", code: `# A set stores unique values; order is not guaranteed
nums = {3, 1, 2}
print(nums)`, output: `{1, 2, 3}`, explain: "The literal {3, 1, 2} builds a set holding three unique integers. Iteration order is not guaranteed by the language, though CPython happens to show small integers this way. Sets are fast for checking membership." },

{ id: "f3-057", cat: "sets", title: "add()", desc: "add() inserts a single value into a set. If the value already exists, nothing changes. Sets never hold duplicates, so repeated adds are harmless.", code: `s = {1, 2}
# add() inserts a value (ignored if present)
s.add(3)
s.add(3)
print(s)`, output: `{1, 2, 3}`, explain: "The first add(3) inserts 3 into the set. The second add(3) finds the value already present and silently does nothing. The set ends up with exactly three unique elements." },

{ id: "f3-058", cat: "sets", title: "remove()", desc: "remove() deletes a value from a set. If the value is missing, a KeyError is raised. Use remove() when absence of the value is a genuine error.", code: `s = {1, 2, 3}
# remove() deletes a value, raising if missing
s.remove(2)
print(s)`, output: `{1, 3}`, explain: "remove(2) finds 2 in the set and deletes it. The remaining set contains 1 and 3. Because 2 existed, no error occurs." },

{ id: "f3-059", cat: "sets", title: "discard()", desc: "discard() deletes a value from a set without raising errors. If the value is absent, it simply does nothing. Prefer discard() when removing an optional value.", code: `s = {1, 2, 3}
# discard() deletes a value without error if missing
s.discard(99)
print(s)`, output: `{1, 2, 3}`, explain: "discard(99) looks for 99, which is not in the set, and exits quietly. No exception is raised. The set keeps all three original values." },

{ id: "f3-060", cat: "sets", title: "pop()", desc: "pop() removes and returns an arbitrary element from a set. Because sets are unordered, you cannot know which value comes out. Popping an empty set raises a KeyError.", code: `s = {42}
# pop() removes and returns an arbitrary element
item = s.pop()
print(item)
print(s)`, output: `42
set()`, explain: "pop() extracts the sole element 42 and hands it to item. The set is now empty, so printing it shows set(). For a single-element set, the result is deterministic." },

{ id: "f3-061", cat: "sets", title: "clear()", desc: "clear() removes every value from a set in one call. The set object remains usable afterwards. This is the quick way to empty a set without rebinding the variable.", code: `s = {1, 2, 3}
# clear() empties the set
s.clear()
print(s)`, output: `set()`, explain: "clear() deletes all three elements in place. The variable s still refers to a valid, empty set. An empty set prints as set() to distinguish it from a dict." },

{ id: "f3-062", cat: "sets", title: "Union", desc: "The | operator or union() method merges two sets into one. The result contains every value from both sets. Duplicates appear only once because sets forbid repetition.", code: `a = {1, 2}
b = {2, 3}
# | gives every value from both sets
print(a | b)`, output: `{1, 2, 3}`, explain: "a | b combines the values of both sets into a new set. The shared value 2 appears only once. Neither input set is modified." },

{ id: "f3-063", cat: "sets", title: "Intersection", desc: "The & operator finds values shared by two sets. Only elements present in both sets appear in the result. An empty intersection produces an empty set.", code: `a = {1, 2}
b = {2, 3}
# & gives values present in both
print(a & b)`, output: `{2}`, explain: "a & b compares both sets and keeps only the common element, 2. The value 1 exists only in a and 3 only in b. The result is the one-element set {2}." },

{ id: "f3-064", cat: "sets", title: "Difference", desc: "The - operator subtracts one set from another. The result holds values in the left set that are missing from the right set. The operation is not symmetric.", code: `a = {1, 2}
b = {2, 3}
# - gives values only in the left set
print(a - b)`, output: `{1}`, explain: "a - b removes from a every value that also appears in b. The value 2 is removed, leaving only 1. Reversing the operands would give a different result, {3}." },

{ id: "f3-065", cat: "sets", title: "Symmetric Difference", desc: "The ^ operator keeps values in either set but not both. It is the union minus the intersection. Symmetric difference is the set version of an XOR operation.", code: `a = {1, 2}
b = {2, 3}
# ^ gives values in either set but not both
print(a ^ b)`, output: `{1, 3}`, explain: "a ^ b removes the shared value 2 from the combined values. The result keeps 1, which only a has, and 3, which only b has. The operation is symmetric, so order of operands does not matter." },

{ id: "f3-066", cat: "sets", title: "issubset()", desc: "issubset() checks whether every value of one set lives inside another. It returns True when the first set is fully contained in the second. An empty set is a subset of every set.", code: `a = {1, 2}
b = {1, 2, 3}
# issubset() checks a is fully inside b
print(a.issubset(b))`, output: `True`, explain: "Every element of a, namely 1 and 2, also exists in b. The subset test therefore returns True. This is equivalent to a <= b." },

{ id: "f3-067", cat: "sets", title: "issuperset()", desc: "issuperset() checks whether a set contains every value of another set. It is the inverse of issubset(). It returns True when the first set includes all of the second.", code: `a = {1, 2}
b = {1, 2, 3}
# issuperset() checks b contains all of a
print(b.issuperset(a))`, output: `True`, explain: "b contains both 1 and 2, which are all the values a holds. The superset test returns True. This is equivalent to b >= a." },

{ id: "f3-068", cat: "sets", title: "isdisjoint()", desc: "isdisjoint() checks whether two sets share no values at all. It returns True when the intersection is empty. It is a fast way to test for overlapping membership.", code: `a = {1, 2}
c = {4, 5}
# isdisjoint() checks for no shared values
print(a.isdisjoint(c))`, output: `True`, explain: "The sets share no common elements, so the intersection would be empty. isdisjoint() returns True to confirm they are completely separate. Sets with overlapping values would return False." },

{ id: "f3-069", cat: "sets", title: "Dedupe a List via Set", desc: "Converting a list to a set removes all duplicate values instantly. Converting back to a list restores a list type. This is the most concise deduplication trick in Python.", code: `nums = [1, 2, 2, 3, 3, 3]
# set() removes duplicates; list() converts back
uniq = list(set(nums))
print(uniq)`, output: `[1, 2, 3]`, explain: "set(nums) collapses the repeats into the unique values {1, 2, 3}. list() turns the set back into a list. For small integers the order comes out sorted in CPython, but for other data the order may vary." },

{ id: "f3-070", cat: "sets", title: "frozenset", desc: "A frozenset is an immutable version of a set. Once created, values cannot be added or removed. Because it is hashable, a frozenset can be used as a dict key or stored inside another set.", code: `# frozenset is immutable, so it can be hashed
fs = frozenset([1, 2, 3])
print(fs)`, output: `frozenset({1, 2, 3})`, explain: "frozenset([1, 2, 3]) freezes the three values into an immutable set. Printing shows the frozenset() wrapper around its contents. All set operations like union and intersection still work on it." },

{ id: "f3-071", cat: "dicts", title: "Create a Dict", desc: "A dictionary maps unique keys to values using key: value pairs in curly braces. Keys must be hashable, such as strings, numbers, or tuples. Dicts preserve insertion order in modern Python.", code: `# A dict maps unique keys to values
user = {"name": "Ada", "age": 36}
print(user)`, output: `{'name': 'Ada', 'age': 36}`, explain: "The literal builds a dict with two pairs: \"name\" maps to \"Ada\" and \"age\" maps to 36. Printing shows the pairs inside curly braces. Order matches insertion order." },

{ id: "f3-072", cat: "dicts", title: "Access by Key", desc: "Square brackets fetch the value stored under a key. The key must exist or a KeyError is raised. Bracket access is the fastest way to read a dict value when you know the key exists.", code: `user = {'name': 'Ada', 'age': 36}
# Bracket access fetches the value for a key
print(user["name"])`, output: `Ada`, explain: "user[\"name\"] looks up the key \"name\" and returns its value, \"Ada\". The value is printed directly. Requesting a missing key would raise a KeyError instead." },

{ id: "f3-073", cat: "dicts", title: "get()", desc: "get(key) reads a value but returns None instead of raising when the key is missing. This makes lookups safe for optional keys. The dict itself is never modified by get().", code: `user = {'name': 'Ada', 'age': 36}
# get() returns None for missing keys
print(user.get("email"))`, output: `None`, explain: "The key \"email\" does not exist in the dict, so get() returns None. None prints as the word None. No exception is raised, unlike bracket access." },

{ id: "f3-074", cat: "dicts", title: "get() with Default", desc: "get(key, default) returns a fallback value when the key is absent. The default is only used for missing keys. This is the idiomatic way to read dicts with sensible fallbacks.", code: `user = {'name': 'Ada', 'age': 36}
# get(key, default) uses a fallback value
print(user.get("email", "unknown"))`, output: `unknown`, explain: "Because \"email\" is missing, get() returns the supplied default \"unknown\". The dict is untouched and no error occurs. Existing keys return their real values instead of the default." },

{ id: "f3-075", cat: "dicts", title: "keys()", desc: "keys() returns a view of all keys in a dict. The view updates automatically if the dict changes. Wrap it in list() to snapshot the keys as a real list.", code: `user = {'name': 'Ada', 'age': 36}
# keys() yields all keys (as a view)
print(list(user.keys()))`, output: `['name', 'age']`, explain: "keys() provides a live view of the dict's keys. list() materializes it into a list in insertion order. The printed list shows \"name\" then \"age\"." },

{ id: "f3-076", cat: "dicts", title: "values()", desc: "values() returns a view of every value stored in a dict. Values can repeat, unlike keys. Converting with list() gives a plain list of the values in order.", code: `user = {'name': 'Ada', 'age': 36}
# values() yields all values
print(list(user.values()))`, output: `['Ada', 36]`, explain: "values() exposes the values \"Ada\" and 36 in key order. list() turns the view into a normal list. The original dict remains unchanged." },

{ id: "f3-077", cat: "dicts", title: "items()", desc: "items() returns a view of (key, value) pairs as tuples. It is the standard way to loop over a whole dict at once. Each pair unpacks cleanly in a for loop.", code: `user = {'name': 'Ada', 'age': 36}
# items() yields (key, value) pairs
print(list(user.items()))`, output: `[('name', 'Ada'), ('age', 36)]`, explain: "items() produces one tuple per pair, in insertion order. list() materializes them into a list of tuples. Each tuple holds a key followed by its value." },

{ id: "f3-078", cat: "dicts", title: "update()", desc: "update() merges the pairs of another dict into the current one. Existing keys get their values overwritten. New keys are simply added.", code: `user = {'name': 'Ada'}
# update() merges other keys and values
user.update({"age": 36, "city": "London"})
print(user)`, output: `{'name': 'Ada', 'age': 36, 'city': 'London'}`, explain: "update() takes the argument dict and splices both pairs into user. \"name\" already existed and is kept unchanged. The result is a dict with three key-value pairs." },

{ id: "f3-079", cat: "dicts", title: "setdefault()", desc: "setdefault(key, default) reads a key, inserting the default only if the key is missing. The method always returns the value now stored under the key. This is a compact pattern for initializing counters or caches.", code: `user = {'name': 'Ada'}
# setdefault() inserts only if the key is absent
email = user.setdefault("email", "ada@example.com")
print(email)
print(user)`, output: `ada@example.com
{'name': 'Ada', 'email': 'ada@example.com'}`, explain: "Because \"email\" is absent, setdefault() inserts it with the default value. It returns that value, stored in email. The dict now holds both pairs." },

{ id: "f3-080", cat: "dicts", title: "pop()", desc: "pop(key) removes a key from a dict and returns its value. An optional second argument is returned if the key is missing. Without it, a missing key raises a KeyError.", code: `user = {'name': 'Ada', 'age': 36}
# pop() removes a key and returns its value
age = user.pop("age")
print(age)
print(user)`, output: `36
{'name': 'Ada'}`, explain: "pop(\"age\") pulls the value 36 out of the dict and returns it into age. The pair is removed from user. The remaining dict holds only the name." },

{ id: "f3-081", cat: "dicts", title: "popitem()", desc: "popitem() removes and returns the last inserted (key, value) pair as a tuple. It needs no arguments. On an empty dict it raises a KeyError.", code: `user = {'name': 'Ada', 'age': 36}
# popitem() removes the last inserted pair
last = user.popitem()
print(last)
print(user)`, output: `('age', 36)
{'name': 'Ada'}`, explain: "popitem() takes the newest pair, (\"age\", 36), out of the dict. The tuple is printed. Only the \"name\" pair remains in user." },

{ id: "f3-082", cat: "dicts", title: "clear()", desc: "clear() removes every key-value pair from a dict. The dict object remains valid and reusable. This is the quick way to empty a dict in place.", code: `user = {'name': 'Ada', 'age': 36}
# clear() removes every key-value pair
user.clear()
print(user)`, output: `{}`, explain: "clear() deletes both pairs in one call. The variable user still points to an empty, usable dict. Printing shows a bare pair of curly braces." },

{ id: "f3-083", cat: "dicts", title: "del by Key", desc: "The del statement removes a key-value pair by key. Unlike pop(), del returns nothing. Deleting a missing key raises a KeyError.", code: `user = {'name': 'Ada', 'age': 36}
# del removes a key without returning it
del user["age"]
print(user)`, output: `{'name': 'Ada'}`, explain: "del user[\"age\"] removes the age pair in place. Nothing is returned to capture. The dict now contains only the name entry." },

{ id: "f3-084", cat: "dicts", title: "Membership (in)", desc: "The in operator on a dict checks its keys, not its values. It returns True when a key exists. Checking values requires looking at values() explicitly.", code: `user = {'name': 'Ada', 'age': 36}
# in checks keys (not values) by default
print("name" in user)
print("email" in user)`, output: `True
False`, explain: "\"name\" is a key in user, so the first check returns True. \"email\" is not a key, so the second returns False. Membership never raises an error." },

{ id: "f3-085", cat: "dicts", title: "len()", desc: "len() on a dict returns the number of key-value pairs. It counts keys, not values. This works on dicts of any size, including empty ones.", code: `user = {'name': 'Ada', 'age': 36}
# len() counts the key-value pairs
print(len(user))`, output: `2`, explain: "The dict holds two pairs, so len(user) returns 2. Adding or removing pairs changes this count. The dict itself is not modified by the call." },

{ id: "f3-086", cat: "dicts", title: "Nested Dict", desc: "A dict can store other dicts as values, creating nested structures. Accessing inner values chains one key lookup per level. Nested dicts model configuration files and JSON-like data.", code: `people = {'ada': {'age': 36, 'city': 'London'}}
# Chain keys to reach inner values
print(people["ada"]["city"])`, output: `London`, explain: "people[\"ada\"] retrieves the inner dict of Ada's details. The second lookup [\"city\"] pulls the value \"London\" from it. Each key peels one level deeper." },

{ id: "f3-087", cat: "dicts", title: "Iterate Keys", desc: "Iterating a dict directly yields its keys. No call to keys() is needed for a plain loop. This is the most common way to walk through a dict.", code: `user = {'name': 'Ada', 'age': 36}
# Iterating a dict yields its keys
for key in user:
    print(key)`, output: `name
age`, explain: "The for loop walks the dict and hands back one key at a time. \"name\" prints first, then \"age\", matching insertion order. To get values, look them up by key inside the loop." },

{ id: "f3-088", cat: "dicts", title: "Iterate Items", desc: "items() is the standard way to loop over keys and values together. Each iteration unpacks a (key, value) tuple into two variables. This avoids a second lookup inside the loop body.", code: `user = {'name': 'Ada', 'age': 36}
# items() unpacks each pair in the loop
for key, value in user.items():
    print(key, value)`, output: `name Ada
age 36`, explain: "Each pass yields one (key, value) tuple that unpacks into key and value. The first pair prints \"name Ada\" and the second \"age 36\". Both variables are available inside the loop body." },

{ id: "f3-089", cat: "dicts", title: "Dict Comprehension", desc: "A dict comprehension builds a dict with a key: value expression. It reads like a loop condensed into one line. Any expression may appear on either side of the colon.", code: `# Build a dict with a comprehension
squares = {n: n * n for n in range(3)}
print(squares)`, output: `{0: 0, 1: 1, 2: 4}`, explain: "For each n from 0 to 2, the comprehension stores n as the key and n * n as the value. The result maps each number to its square. The dict is created in one expression." },

{ id: "f3-090", cat: "dicts", title: "fromkeys()", desc: "fromkeys() creates a dict where every key shares the same initial value. It takes an iterable of keys and an optional shared value. This is a concise way to initialize counters or flags.", code: `keys = ['a', 'b']
# fromkeys() makes a dict with one shared value
d = dict.fromkeys(keys, 0)
print(d)`, output: `{'a': 0, 'b': 0}`, explain: "dict.fromkeys(keys, 0) maps each key in the list to the value 0. Both \"a\" and \"b\" start at zero. Without the second argument, the shared value would be None." },

{ id: "f3-091", cat: "dicts", title: "copy()", desc: "copy() makes a shallow, independent copy of a dict. Adding or removing keys in the copy does not affect the original. For nested values, the copy shares the inner objects.", code: `user = {'name': 'Ada', 'age': 36}
# copy() makes an independent shallow copy
copy = user.copy()
copy["age"] = 99
print(user["age"])
print(copy["age"])`, output: `36
99`, explain: "copy() duplicates the dict into a separate object. Changing the age in copy affects only the copy. The original still reports 36, proving they are independent." },

{ id: "f3-092", cat: "dicts", title: "Merge with |", desc: "Python 3.9 introduced the | operator for merging dicts. It returns a brand-new dict combining both pairs. When keys repeat, values from the right dict win.", code: `d1 = {'a': 1}
d2 = {"b": 2}
# Python 3.9+ | merges dicts
print(d1 | d2)`, output: `{'a': 1, 'b': 2}`, explain: "d1 | d2 builds a new dict holding pairs from both inputs. The \"a\" pair comes from d1 and \"b\" from d2. Neither source dict is modified." },

{ id: "f3-093", cat: "dicts", title: "Merge with **", desc: "The ** unpacking operator spreads dict pairs into a new dict literal. Multiple dicts can be merged in one expression. Later dicts override earlier ones on duplicate keys.", code: `d1 = {'a': 1}
d2 = {"b": 2}
# ** unpacks dicts into a new one
merged = {**d1, **d2}
print(merged)`, output: `{'a': 1, 'b': 2}`, explain: "The braces collect pairs from both dicts as they are unpacked. {\"a\": 1} contributes its pair and {\"b\": 2} contributes its own. The merged result contains both." },

{ id: "f3-094", cat: "dicts", title: "Sort by Key", desc: "sorted() orders a dict's keys alphabetically. Loop over the sorted keys and look up each value. This prints a dict's contents in key order without modifying it.", code: `scores = {'bob': 3, 'ada': 5, 'cara': 2}
# sorted() orders the keys alphabetically
for key in sorted(scores):
    print(key, scores[key])`, output: `ada 5
bob 3
cara 2`, explain: "sorted(scores) sorts the keys into alphabetical order. The loop visits ada, bob, then cara, looking up each score. The original dict keeps its insertion order." },

{ id: "f3-095", cat: "dicts", title: "Sort by Value", desc: "Passing key=scores.get to sorted() orders keys by their values. The get method supplies each key's value for comparison. This ranks a dict from lowest to highest value.", code: `scores = {'bob': 3, 'ada': 5, 'cara': 2}
# key=scores.get sorts by each value
for key in sorted(scores, key=scores.get):
    print(key, scores[key])`, output: `cara 2
bob 3
ada 5`, explain: "For each key, scores.get returns its value as the sort key. The keys are ordered 2, 3, 5, so cara prints first and ada last. The lookup inside the loop prints each value with its key." },

{ id: "f3-096", cat: "dicts", title: "defaultdict", desc: "defaultdict is a dict subclass that supplies a default value for missing keys. The factory argument, such as int, is called to create each missing value. This removes manual existence checks when counting.", code: `from collections import defaultdict

# defaultdict(int) returns 0 for missing keys
counts = defaultdict(int)
counts["x"] += 1
print(counts["x"])
print(counts["missing"])`, output: `1
0`, explain: "Reading counts[\"x\"] first creates it with int() giving 0, then += 1 makes it 1. The untouched key \"missing\" is created on demand as 0. No KeyError ever occurs." },

{ id: "f3-097", cat: "dicts", title: "Counter", desc: "Counter is a dict subclass specialized for tallying items. It accepts any iterable and counts every occurrence. Counting values are accessed by key like a normal dict.", code: `from collections import Counter

# Counter tallies occurrences of items
c = Counter("banana")
print(c["a"])`, output: `3`, explain: "Counter(\"banana\") counts each letter of the string. The letter a appears three times, so c[\"a\"] returns 3. Missing letters simply return 0." },

{ id: "f3-098", cat: "dicts", title: "Safe Nested Get", desc: "Chaining .get() on nested dicts avoids KeyErrors at every level. Each fallback {} handles a missing inner dict. A final default covers the deepest missing key.", code: `config = {'db': {'host': 'localhost'}}
# Chain .get() to avoid KeyError deep inside
host = config.get("db", {}).get("host", "unknown")
print(host)`, output: `localhost`, explain: "config.get(\"db\", {}) returns the inner dict, or an empty dict if absent. Its .get(\"host\", \"unknown\") then reads the host safely. Here the real value \"localhost\" is found and printed." },

{ id: "f3-099", cat: "dicts", title: "Add New Key", desc: "Assigning to a brand-new key adds a pair to the dict. The syntax is the same as updating an existing key. New keys are appended in insertion order.", code: `user = {'name': 'Ada'}
# Simple assignment adds a brand-new key
user["email"] = "ada@example.com"
print(user)`, output: `{'name': 'Ada', 'email': 'ada@example.com'}`, explain: "The assignment user[\"email\"] = \"ada@example.com\" adds a new pair because the key did not exist. The dict grows to two entries. The new pair appears after the original one." },

{ id: "f3-100", cat: "dicts", title: "Modify Value", desc: "Assigning to an existing key replaces its value. The key stays in its original position. This is how you update stored state in a dict.", code: `user = {'name': 'Ada', 'age': 36}
# Assigning to an existing key updates it
user["age"] = 37
print(user["age"])`, output: `37`, explain: "Because \"age\" already exists, assignment overwrites its value from 36 to 37. The key keeps its place in the dict. Reading it back prints the new value." },

{ id: "f3-101", cat: "dicts", title: "Dict from zip()", desc: "zip() pairs two sequences, and dict() converts those pairs into a dict. The first sequence becomes the keys and the second the values. Both sequences must have equal length for a clean map.", code: `keys = ['a', 'b']
values = [1, 2]
# zip() pairs keys with values
d = dict(zip(keys, values))
print(d)`, output: `{'a': 1, 'b': 2}`, explain: "zip() produces (\"a\", 1) and (\"b\", 2). dict() consumes these pairs and builds the mapping. The resulting dict matches each key with its corresponding value." },

{ id: "f3-102", cat: "dicts", title: "Dict as Switch", desc: "A dict can replace chains of if and elif statements. Values can be looked up by the condition's result. The get() method also provides a default for unmatched cases.", code: `def describe(op):
    # A dict can replace if/elif chains
    names = {"add": "addition", "sub": "subtraction"}
    return names.get(op, "unknown")

print(describe("add"))
print(describe("mul"))`, output: `addition
unknown`, explain: "describe(\"add\") looks up \"add\" in the dict and returns \"addition\". describe(\"mul\") finds no matching key, so get() returns the default \"unknown\". The dict serves as a compact lookup table." },

{ id: "f3-103", cat: "dicts", title: "Count Occurrences", desc: "Counting items in a loop uses the get() trick to start counters at zero. Each occurrence reads the current count, adds one, and stores it back. This pattern appears constantly in real code.", code: `word = 'abracadabra'
counts = {}
# Tally characters with get()
for ch in word:
    counts[ch] = counts.get(ch, 0) + 1
print(counts["a"])`, output: `5`, explain: "For each character, counts.get(ch, 0) returns the existing count or 0 the first time. Adding 1 and storing it back increments the tally. The letter a appears five times in \"abracadabra\"." },

{ id: "f3-104", cat: "dicts", title: "Invert Dict", desc: "Inverting a dict swaps its keys and values. A comprehension builds the reversed mapping in one line. Inverted dicts enable fast lookups by the original values.", code: `d = {'a': 1, 'b': 2}
# Swap keys and values with a comprehension
inverted = {value: key for key, value in d.items()}
print(inverted)`, output: `{1: 'a', 2: 'b'}`, explain: "The comprehension unpacks each pair and stores it reversed. Value 1 becomes a key pointing to \"a\", and 2 points to \"b\". This works best when the original values are unique." },

{ id: "f3-105", cat: "dicts", title: "Max Key by Value", desc: "max() with a key function finds the key holding the largest value. Passing scores.get makes it compare values instead of keys. This is the classic way to find a winner in score dicts.", code: `scores = {'ada': 5, 'bob': 3, 'cara': 2}
# max(..., key=...) finds the key with the top value
best = max(scores, key=scores.get)
print(best)`, output: `ada`, explain: "max(scores, key=scores.get) ranks keys by their values and returns the key with the highest score. scores.get supplies 5, 3, and 2 for comparison, so \"ada\" wins. The dict itself is never modified." },

{ id: "f3-106", cat: "comprehensions", title: "List Comp Basic", desc: "A list comprehension builds a list directly from a loop in one expression. It reads as a for loop condensed into a single line. The result is a complete list of all produced values.", code: `# Build a list directly with a one-line loop
squares = [n * n for n in range(5)]
print(squares)`, output: `[0, 1, 4, 9, 16]`, explain: "For each n from 0 to 4, the expression n * n is evaluated and collected. The result is the list of squares in the same order. The comprehension replaces a longer multi-line loop." },

{ id: "f3-107", cat: "comprehensions", title: "List Comp with Condition", desc: "An if clause at the end of a comprehension filters items. Only values that pass the test are collected. Everything else is skipped entirely.", code: `# The if filters which values make it in
evens = [n for n in range(10) if n % 2 == 0]
print(evens)`, output: `[0, 2, 4, 6, 8]`, explain: "range(10) offers each number from 0 to 9. The condition n % 2 == 0 keeps only even numbers. The collected list contains exactly five evens." },

{ id: "f3-108", cat: "comprehensions", title: "List Comp with if/else", desc: "An if/else placed before the for transforms every value. Unlike a trailing if, it always produces an item. The condition picks which expression is used.", code: `# if/else transforms each value before adding
labels = ["even" if n % 2 == 0 else "odd" for n in range(4)]
print(labels)`, output: `['even', 'odd', 'even', 'odd']`, explain: "For each n, the ternary picks \"even\" when n % 2 == 0 and \"odd\" otherwise. Every value yields exactly one label. The list length matches the number of inputs, four." },

{ id: "f3-109", cat: "comprehensions", title: "Cubes", desc: "Any expression can appear on the left side of a comprehension. Exponentiation is a common choice. This builds numeric sequences without writing an explicit loop.", code: `# Any expression works on the left side
cubes = [n ** 3 for n in range(1, 6)]
print(cubes)`, output: `[1, 8, 27, 64, 125]`, explain: "The loop feeds n the values 1 through 5. Each is raised to the third power with n ** 3. The printed list holds the five cubes in order." },

{ id: "f3-110", cat: "comprehensions", title: "String Transform", desc: "Comprehensions can apply a method to every element of a collection. Each transformed result is stored in the new list. This is the concise way to process a whole list of strings.", code: `words = ['hello', 'world']
# Apply a method to every string
upper = [w.upper() for w in words]
print(upper)`, output: `['HELLO', 'WORLD']`, explain: "The loop hands each word to the expression w.upper(). Both strings are converted to uppercase. The source list words is never modified." },

{ id: "f3-111", cat: "comprehensions", title: "Nested Comp (Matrix)", desc: "Nested comprehensions build two-dimensional structures in one expression. The inner comprehension runs fully for every outer iteration. This creates rows that are independent list objects.", code: `# Inner loop runs for every outer iteration
matrix = [[i * j for j in range(3)] for i in range(3)]
print(matrix)`, output: `[[0, 0, 0], [0, 1, 2], [0, 2, 4]]`, explain: "The outer loop sets i to 0, 1, and 2. For each i, the inner loop builds a row with j from 0 to 2, computing i * j. The result is a 3 by 3 grid of products." },

{ id: "f3-112", cat: "comprehensions", title: "Flatten with Comp", desc: "Two for clauses in one comprehension flatten nested lists. The loops read left to right: outer loop first, then inner loop. Every innermost value is collected in order.", code: `nested = [[1, 2], [3, 4]]
# Read loops left to right: row, then item
flat = [x for row in nested for x in row]
print(flat)`, output: `[1, 2, 3, 4]`, explain: "The first loop visits each row, and the second visits each element of that row. Elements are appended row by row. The flat result contains all four values in their original order." },

{ id: "f3-113", cat: "comprehensions", title: "Dict Comp", desc: "A dict comprehension uses key: value syntax instead of a plain expression. It builds a dict in a single statement. The comprehension loop supplies both sides of each pair.", code: `# key: value expression builds a dict
squares = {n: n ** 2 for n in range(1, 5)}
print(squares)`, output: `{1: 1, 2: 4, 3: 9, 4: 16}`, explain: "For each n, the key is n and the value is n ** 2. The result maps numbers 1 through 4 to their squares. The dict preserves the order the pairs were produced." },

{ id: "f3-114", cat: "comprehensions", title: "Dict Comp with Condition", desc: "A trailing if filters which pairs enter a dict comprehension. Only pairs meeting the condition are included. This is the compact way to sub-select dict contents.", code: `prices = {'apple': 3, 'pear': 1, 'banana': 2}
# Keep only pairs meeting the condition
cheap = {k: v for k, v in prices.items() if v < 3}
print(cheap)`, output: `{'pear': 1, 'banana': 2}`, explain: "items() feeds each (k, v) pair to the comprehension. The condition v < 3 drops the apple pair worth 3. The new dict keeps only the two cheaper fruits." },

{ id: "f3-115", cat: "comprehensions", title: "Set Comp", desc: "Curly braces with a single expression create a set comprehension. Duplicates collapse because sets store unique values. The result is an unordered collection of unique outputs.", code: `nums = [1, 2, 2, 3, 3]
# Curly braces with an expression make a set
unique = {n for n in nums}
print(unique)`, output: `{1, 2, 3}`, explain: "The comprehension iterates over nums and collects each value into a set. The repeated 2s and 3s collapse to single entries. The printed set shows the three unique values." },

{ id: "f3-116", cat: "comprehensions", title: "Generator Comp", desc: "Parentheses around a comprehension create a generator instead of a list. Generators produce values lazily, one at a time. Convert with list() to see all values at once.", code: `# Parentheses make a lazy generator, not a list
squares = (n * n for n in range(5))
print(list(squares))`, output: `[0, 1, 4, 9, 16]`, explain: "The parentheses create a lazy generator that computes squares on demand. list() consumes it and collects the five values. Generators save memory for very large sequences." },

{ id: "f3-117", cat: "comprehensions", title: "enumerate in Comp", desc: "enumerate() feeds index and value pairs into a comprehension. This builds indexed lists in one line. The index starts at zero by default.", code: `fruits = ['apple', 'banana']
# enumerate() feeds index and value in pairs
indexed = [(i, f) for i, f in enumerate(fruits)]
print(indexed)`, output: `[(0, 'apple'), (1, 'banana')]`, explain: "enumerate(fruits) yields (0, \"apple\") then (1, \"banana\"). Each pair unpacks into i and f and is stored as a tuple. The result is a list of (index, item) tuples." },

{ id: "f3-118", cat: "comprehensions", title: "List of Tuples Comp", desc: "A tuple expression on the left builds a list of pairs. Combining two values with a comma creates each tuple. This is a compact way to generate coordinate-style data.", code: `# Build pairs by combining values
pairs = [(x, x * 2) for x in range(3)]
print(pairs)`, output: `[(0, 0), (1, 2), (2, 4)]`, explain: "For each x from 0 to 2, the tuple (x, x * 2) is created. The pair (1, 2) shows the doubling rule clearly. All three tuples are collected in order." },

{ id: "f3-119", cat: "comprehensions", title: "Filter Even Numbers", desc: "A comprehension with an if clause filters an existing list. Only elements satisfying the test are kept. The source list is left untouched.", code: `nums = [1, 4, 7, 10, 13]
# Keep only the even values from a list
even = [n for n in nums if n % 2 == 0]
print(even)`, output: `[4, 10]`, explain: "Each number in nums is tested with n % 2 == 0. The odd values 1, 7, and 13 are skipped. Only 4 and 10 survive into the new list." },

{ id: "f3-120", cat: "comprehensions", title: "Filter None Values", desc: "The is not None check removes missing values from a list. The condition keeps every element that is not None. This cleans data before processing it.", code: `data = [1, None, 2, None, 3]
# is not None drops missing values
cleaned = [x for x in data if x is not None]
print(cleaned)`, output: `[1, 2, 3]`, explain: "The comprehension walks data and tests each value against None. The two None entries fail the check and are dropped. The cleaned list holds only the real numbers." }

]);

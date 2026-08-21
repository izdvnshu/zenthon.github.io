/* ZENTHON — Python examples (file 5 of 5): ADVANCED, DATETIME, REGEX, OS, ALGORITHMS, PROJECTS */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f5-001", cat: "advanced", title: "Generator Function", desc: "A generator function uses the yield keyword instead of return. Each call of next() resumes execution right after the previous yield, producing values lazily one at a time.", code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

for value in countdown(3):
    print(value)`, output: `3
2
1`, explain: "The first iteration runs until yield n (3). The next resumes after yield with n decremented to 2, and so on until the while exits." },

{ id: "f5-002", cat: "advanced", title: "Generator Expression", desc: "A generator expression is a compact, lazy version of a comprehension: (expr for x in it). It computes items on demand instead of building a list.", code: `squares = (x * x for x in range(5))
print(sum(squares))`, output: `30`, explain: "squares yields 0, 1, 4, 9, 16 one by one. sum() consumes the generator, adding them to 30. No list is ever stored." },

{ id: "f5-003", cat: "advanced", title: "Next() on a Generator", desc: "The built-in next(gen) manually pulls the next value from a generator. When the generator is exhausted it raises StopIteration.", code: `def zen():
    yield "code"
    yield "compile"

g = zen()
print(next(g))
print(next(g))`, output: `code
compile`, explain: "Each next(g) executes the function until the next yield. After two calls the generator is empty and further next() calls would raise StopIteration." },

{ id: "f5-004", cat: "advanced", title: "Iter() Builtin", desc: "iter(obj) converts any iterable into an iterator object that can be driven one item at a time with next().", code: `word = 'ZEN'
it = iter(word)
print(next(it))
print(next(it))
print(next(it))`, output: `Z
E
N`, explain: "iter() wraps the string in an iterator. Each next() pulls the following character until the iterator is exhausted." },

{ id: "f5-005", cat: "advanced", title: "Custom Iterator Class", desc: "A class implementing __iter__ (returning self) and __next__ (returning the next item or raising StopIteration) is a full iterator, usable in for loops.", code: `class CountUp:
    def __init__(self, limit):
        self.n = 0
        self.limit = limit
    def __iter__(self):
        return self
    def __next__(self):
        if self.n >= self.limit:
            raise StopIteration
        self.n += 1
        return self.n

for x in CountUp(3):
    print(x)`, output: `1
2
3`, explain: "The for loop calls __iter__ once, then __next__ repeatedly. __next__ raises StopIteration at the limit, which ends the loop cleanly." },

{ id: "f5-006", cat: "advanced", title: "List from Generator", desc: "Passing a generator to list() materializes all of its values into a real list.", code: `def evens(n):
    for i in range(n):
        if i % 2 == 0:
            yield i

print(list(evens(8)))`, output: `[0, 2, 4, 6]`, explain: "evens(8) yields 0, 2, 4, 6 lazily; list() pulls every value and stores them in a list." },

{ id: "f5-007", cat: "advanced", title: "Basic Decorator", desc: "A decorator is a function that takes another function and returns a wrapped version of it. The @syntax applies the wrapper automatically.", code: `def shout(func):
    def wrapper():
        print("HELLO " + func().upper() + " !")
    return wrapper

@shout
def greet():
    return "zen"

greet()`, output: `HELLO ZEN !`, explain: "@shout replaces greet with wrapper. Calling greet() runs wrapper, which calls the original greet() and formats its result." },

{ id: "f5-008", cat: "advanced", title: "Timer Decorator", desc: "A timer decorator measures how long a function takes by wrapping it with time tracking logic.", code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"took {elapsed:.6f}s")
        return result
    return wrapper

@timer
def slow():
    time.sleep(0.1)
    return "done"

print(slow())`, output: `took 0.100xxx s
done`, explain: "wrapper records the time before and after calling slow(), printing the difference. *args/**kwargs pass through any arguments untouched." },

{ id: "f5-009", cat: "advanced", title: "Memoize Decorator", desc: "Memoization caches a function's results so repeated calls with the same arguments return instantly instead of recomputing.", code: `cache = {}

def memoize(func):
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(35))`, output: `9227465`, explain: "Without caching, fib(35) would explode into millions of calls. The cache stores each result once, turning the recursion into a fast lookup." },

{ id: "f5-010", cat: "advanced", title: "functools.wraps", desc: "functools.wraps copies the original function's metadata (name, docstring) onto the wrapper so decorated functions keep their identity.", code: `from functools import wraps

def decorator(func):
    @wraps(func)
    def wrapper():
        return func()
    return wrapper

@decorator
def hello():
    """Says hello."""
    return "hi"

print(hello.__name__)
print(hello.__doc__)`, output: `hello
Says hello.`, explain: "Without @wraps, hello.__name__ would be 'wrapper'. wraps copies name and docstring back, preserving the function's identity." },

{ id: "f5-011", cat: "advanced", title: "Closures", desc: "A closure is a nested function that remembers variables from its enclosing scope even after the outer function has returned.", code: `def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())
print(counter())`, output: `1
2`, explain: "increment captures count from make_counter's scope. Each call updates that same captured variable — the state survives between calls." },

{ id: "f5-012", cat: "advanced", title: "Walrus Operator", desc: "The walrus operator := assigns a value to a variable inside an expression, letting you use the result immediately.", code: `values = [5, 8, 3]
if (n := len(values)) > 2:
    print("Length is", n)`, output: `Length is 3`, explain: "len(values) is stored into n as part of the if expression, then n is reused in the print. One line, no separate assignment." },

{ id: "f5-013", cat: "advanced", title: "Transpose with zip(*)", desc: "zip(*matrix) unzips rows into columns: passing the rows as separate arguments pairs the elements position by position.", code: `matrix = [[1, 2], [3, 4], [5, 6]]
cols = list(zip(*matrix))
print(cols)`, output: `[(1, 3, 5), (2, 4, 6)]`, explain: "The * unpacks matrix into three row lists. zip pairs first elements (1, 3, 5) and second elements (2, 4, 6) into the columns." },

{ id: "f5-014", cat: "advanced", title: "Collections.deque", desc: "A deque (double-ended queue) supports fast appends and pops on BOTH ends — much faster than a list for queue-style access.", code: `from collections import deque

q = deque([1, 2])
q.append(3)
q.appendleft(0)
print(q)
print(q.pop())
print(q.popleft())`, output: `deque([0, 1, 2, 3])
3
0`, explain: "append/appendleft add at either end; pop/popleft remove from either end. All four operations run in O(1) time." },

{ id: "f5-015", cat: "advanced", title: "Counter Most Common", desc: "collections.Counter counts hashable items. .most_common(n) returns the n most frequent elements with their counts.", code: `from collections import Counter

text = "a b a c b a"
counts = Counter(text.split())
print(counts.most_common(2))`, output: `[('a', 3), ('b', 2)]`, explain: "Counter tallies 'a' 3 times and 'b' 2 times. most_common(2) returns the top two as (item, count) tuples." },

{ id: "f5-016", cat: "advanced", title: "Defaultdict Grouping", desc: "defaultdict never raises KeyError: missing keys get a default value automatically. Ideal for grouping items.", code: `from collections import defaultdict

groups = defaultdict(list)
for word in ["zen", "code", "dev", "zen"]:
    groups[word[0]].append(word)

print(dict(groups))`, output: `{'z': ['zen', 'zen'], 'c': ['code'], 'd': ['dev']}`, explain: "Accessing groups[word[0]] creates an empty list on first use, so append() always works — no manual key checking needed." },

{ id: "f5-017", cat: "advanced", title: "Namedtuple Fields", desc: "namedtuple creates lightweight classes with named fields — like tuples but with attribute access and readable code.", code: `from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x + p.y)
print(p[0])`, output: `7
3`, explain: "p.x and p.y are named attributes, while p[0] still works like a plain tuple. Fields can be listed as a string too." },

{ id: "f5-018", cat: "advanced", title: "itertools.count", desc: "itertools.count(start, step) counts forever. Combine it with a stopping condition or takewhile to bound it.", code: `from itertools import count, takewhile

evens = takewhile(lambda x: x < 10, count(0, 2))
print(list(evens))`, output: `[0, 2, 4, 6, 8]`, explain: "count(0, 2) yields 0, 2, 4, ... forever; takewhile cuts the stream at the first value not below 10." },

{ id: "f5-019", cat: "advanced", title: "itertools.cycle", desc: "itertools.cycle repeats an iterable endlessly, looping back to the start after the last element.", code: `from itertools import cycle

colors = cycle(["R", "G", "B"])
for _ in range(7):
    print(next(colors))`, output: `R
G
B
R
G
B
R`, explain: "After 'B', the cycle wraps around to 'R' again. Perfect for round-robin scheduling or repeating patterns." },

{ id: "f5-020", cat: "advanced", title: "itertools.product", desc: "itertools.product computes the Cartesian product of iterables — every possible combination of one item from each.", code: `from itertools import product

for combo in product([1, 2], ["a", "b"]):
    print(combo)`, output: `(1, 'a')
(1, 'b')
(2, 'a')
(2, 'b')`, explain: "product pairs every first element with every second element, producing all 2 x 2 = 4 combinations." },

{ id: "f5-021", cat: "advanced", title: "itertools.permutations", desc: "permutations(iterable, r) yields all ordered arrangements of r items — order matters.", code: `from itertools import permutations

print(list(permutations([1, 2, 3], 2)))`, output: `[(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]`, explain: "(1, 2) and (2, 1) are distinct because permutations care about order. With 3 items taken 2 at a time there are 6 results." },

{ id: "f5-022", cat: "advanced", title: "itertools.combinations", desc: "combinations(iterable, r) yields unordered selections — (a, b) and (b, a) are the same and appear once.", code: `from itertools import combinations

print(list(combinations(["a", "b", "c"], 2)))`, output: `[('a', 'b'), ('a', 'c'), ('b', 'c')]`, explain: "Order does not matter: only 3 pairs exist out of the 6 permutations, because ('b', 'a') duplicates ('a', 'b')." },

{ id: "f5-023", cat: "advanced", title: "itertools.chain", desc: "itertools.chain glues multiple iterables into one continuous stream, as if they were a single sequence.", code: `from itertools import chain

print(list(chain([1, 2], [3, 4], [5])))`, output: `[1, 2, 3, 4, 5]`, explain: "chain concatenates the three lists lazily without copying data, iterating through them one after another." },

{ id: "f5-024", cat: "advanced", title: "functools.lru_cache", desc: "lru_cache automatically memoizes a function using a least-recently-used cache — instant speedup for recursive functions.", code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))`, output: `12586269025`, explain: "lru_cache stores every computed fib value. Computing fib(50) without it would require an astronomically large number of calls." },

{ id: "f5-025", cat: "advanced", title: "functools.partial", desc: "partial fixes some arguments of a function, creating a new function with fewer parameters.", code: `from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
print(square(5))
print(square(7))`, output: `25
49`, explain: "square is power with exp locked to 2. Calling square(5) fills base=5, computing 5 squared. partial reuses logic cleanly." },

{ id: "f5-026", cat: "advanced", title: "functools.reduce", desc: "reduce(func, iterable) applies func cumulatively to the items, collapsing the whole iterable into one value.", code: `from functools import reduce

nums = [1, 2, 3, 4]
product = reduce(lambda a, b: a * b, nums)
print(product)`, output: `24`, explain: "reduce first combines 1 * 2 = 2, then 2 * 3 = 6, then 6 * 4 = 24 — a running fold over the list." },

{ id: "f5-027", cat: "advanced", title: "Map with Multiple Iterables", desc: "map(func, a, b) passes one element from each iterable into the function per call, stopping at the shortest.", code: `a = [1, 2, 3]
b = [10, 20, 30]
print(list(map(lambda x, y: x + y, a, b)))`, output: `[11, 22, 33]`, explain: "Each call of the lambda receives one value from a and one from b: 1+10, 2+20, 3+30." },

{ id: "f5-028", cat: "advanced", title: "Multiple Sort Keys", desc: "sorted() with key=lambda can sort by several criteria at once by returning a tuple; ties fall through to the next key.", code: `players = [('Zen', 7), ('Max', 3), ('Ivy', 7)]
by_rank = sorted(players, key=lambda p: (-p[1], p[0]))
print(by_rank)`, output: `[('Ivy', 7), ('Zen', 7), ('Max', 3)]`, explain: "The key returns (negative score, name). Scores sort high-to-low first, and equal scores break ties alphabetically: Ivy before Zen." },

{ id: "f5-029", cat: "advanced", title: "heapq.nlargest", desc: "heapq.nlargest(n, iterable) returns the n largest items efficiently — faster than sorting when n is small.", code: `import heapq

scores = [42, 7, 99, 13, 55]
print(heapq.nlargest(2, scores))
print(heapq.nsmallest(2, scores))`, output: `[99, 55]
[7, 13]`, explain: "nlargest walks the data once with a heap of size 2, keeping 99 and 55. nsmallest mirrors it for the two smallest." },

{ id: "f5-030", cat: "advanced", title: "Any and All", desc: "any() returns True if at least one element is truthy; all() returns True only if every element is truthy. Both short-circuit.", code: `nums = [2, 4, 6]
print(any(n % 2 == 1 for n in nums))
print(all(n % 2 == 0 for n in nums))`, output: `False
True`, explain: "No odd number exists, so any() is False. Every number is even, so all() is True. The generators stop early when possible." },

{ id: "f5-031", cat: "datetime", title: "Current Date and Time", desc: "datetime.now() returns the current local date and time as a datetime object with year, month, day, hour, minute, second.", code: `from datetime import datetime

now = datetime.now()
print(now.year)
print(now.month)
print(now.hour)`, output: `Random`, explain: "now is a full datetime object. Accessing its .year, .month and .hour attributes gives the current calendar values." },

{ id: "f5-032", cat: "datetime", title: "Today's Date", desc: "date.today() returns only the date part — year, month and day — with no time components.", code: `from datetime import date

today = date.today()
print(today)
print(today.day)`, output: `Random`, explain: "today is a date object like 2026-08-18. The .day attribute extracts the day-of-month number." },

{ id: "f5-033", cat: "datetime", title: "Time Object", desc: "time(hour, minute, second) builds a time-only object, useful for schedules where the date is irrelevant.", code: `from datetime import time

t = time(14, 30, 45)
print(t)
print(t.minute)`, output: `14:30:45
30`, explain: "The time object prints as HH:MM:SS. t.minute gives the minute component (30) directly." },

{ id: "f5-034", cat: "datetime", title: "Timedelta Arithmetic", desc: "timedelta represents a duration. Adding or subtracting it from a date or datetime shifts the moment in time.", code: `from datetime import date, timedelta

today = date(2026, 8, 18)
week_later = today + timedelta(days=7)
print(week_later)
print(week_later - today)`, output: `2026-08-25
7 days, 0:00:00`, explain: "today plus 7 days lands on 2026-08-25. Subtracting two dates yields a timedelta showing the gap: 7 days." },

{ id: "f5-035", cat: "datetime", title: "Format with strftime", desc: "strftime() formats a datetime into a custom string using codes like %Y (year), %m (month), %d (day), %H (hour).", code: `from datetime import datetime

now = datetime(2026, 8, 18, 15, 5)
print(now.strftime("%d/%m/%Y %H:%M"))
print(now.strftime("%A, %B %d"))`, output: `18/08/2026 15:05
Tuesday, August 18`, explain: "The format codes control every piece: %d/%m/%Y prints day/month/year; %A gives the weekday name and %B the month name." },

{ id: "f5-036", cat: "datetime", title: "Parse with strptime", desc: "strptime() parses a string into a datetime object using format codes — the reverse of strftime.", code: `from datetime import datetime

text = "18-08-2026 15:05"
parsed = datetime.strptime(text, "%d-%m-%Y %H:%M")
print(parsed.year)
print(parsed.minute)`, output: `2026
5`, explain: "The format string %d-%m-%Y %H:%M describes exactly how the text is arranged, letting Python extract 2026 and minute 5." },

{ id: "f5-037", cat: "datetime", title: "Weekday", desc: "weekday() returns Monday=0 through Sunday=6; isoweekday() returns Monday=1 through Sunday=7.", code: `from datetime import date

d = date(2026, 8, 18)
print(d.weekday())
print(d.isoweekday())`, output: `1
2`, explain: "2026-08-18 is a Tuesday. weekday() counts from 0 (so Tuesday is 1); isoweekday() counts from 1 (so Tuesday is 2)." },

{ id: "f5-038", cat: "datetime", title: "Timestamp", desc: "timestamp() converts a datetime into a float counting seconds since the Unix epoch (1970-01-01 UTC).", code: `from datetime import datetime

d = datetime(2026, 1, 1)
ts = d.timestamp()
print(ts > 1700000000)`, output: `True`, explain: "The epoch for 2026-01-01 is roughly 1767225600 seconds — well past the 2023 reference, so the comparison is True." },

{ id: "f5-039", cat: "datetime", title: "Timezone-Aware Now", desc: "datetime.now(timezone.utc) attaches a timezone to the result, making it unambiguous for comparisons across regions.", code: `from datetime import datetime, timezone

now_utc = datetime.now(timezone.utc)
print(now_utc.tzinfo)`, output: `UTC`, explain: "The tzinfo attribute holds the timezone.UTC object, marking the datetime as UTC-aware instead of naive." },

{ id: "f5-040", cat: "datetime", title: "Sleep with time.sleep", desc: "time.sleep(seconds) pauses the program for the given duration. Useful for pacing, retries and animations.", code: `import time

start = time.perf_counter()
time.sleep(0.05)
elapsed = time.perf_counter() - start
print(elapsed >= 0.05)`, output: `True`, explain: "sleep(0.05) blocks for at least 50 milliseconds, so the measured elapsed time is always >= 0.05 seconds." },

{ id: "f5-041", cat: "regex", title: "re.match", desc: "re.match(pattern, text) checks whether the pattern matches at the START of the string, returning a match object or None.", code: `import re

m = re.match(r"Zen", "Zen X Dev")
print(bool(m))
m2 = re.match(r"Dev", "Zen X Dev")
print(m2)`, output: `True
None`, explain: "The first pattern matches at position 0. \"Dev\" starts later in the string, so match() — anchored to the start — returns None." },

{ id: "f5-042", cat: "regex", title: "re.search", desc: "re.search(pattern, text) finds the pattern ANYWHERE in the string, unlike match() which only checks the beginning.", code: `import re

m = re.search(r"Dev", "Zen X Dev")
print(m.start())`, output: `6`, explain: "search() scans the whole string and finds \"Dev\" starting at index 6, returning a match object with .start()." },

{ id: "f5-043", cat: "regex", title: "re.findall", desc: "re.findall(pattern, text) returns a list of every non-overlapping match of the pattern in the string.", code: `import re

text = "1 apple, 2 oranges, 3 lemons"
print(re.findall(r"\\d+", text))`, output: `['1', '2', '3']`, explain: "The pattern \\d+ matches one or more digits. findall() collects all three numbers into a list." },

{ id: "f5-044", cat: "regex", title: "re.finditer", desc: "re.finditer(pattern, text) returns an iterator of match objects — ideal for large texts since it works lazily.", code: `import re

text = "cat bat rat"
for m in re.finditer(r"at", text):
    print(m.start())`, output: `1
5
9`, explain: "Each iteration yields a match object; m.start() reports where \"at\" begins: indices 1, 5 and 9." },

{ id: "f5-045", cat: "regex", title: "re.sub", desc: "re.sub(pattern, repl, text) replaces every match with a replacement string, returning the modified text.", code: `import re

text = "zen@dev.zen"
print(re.sub(r"@", " [at] ", text))`, output: `zen [at] dev.zen`, explain: "The pattern @ matches the single at-sign, which is replaced by \" [at] \" everywhere it occurs." },

{ id: "f5-046", cat: "regex", title: "re.split", desc: "re.split(pattern, text) splits the string at every match of the pattern — a more powerful cousin of str.split().", code: `import re

text = "a1b22c3d"
print(re.split(r"\\d+", text))`, output: `['a', 'b', 'c', 'd']`, explain: "\\d+ matches each run of digits (1, 22, 3). split() cuts the text at those points, leaving only the letters." },

{ id: "f5-047", cat: "regex", title: "re.compile", desc: "re.compile(pattern) pre-compiles a regex into an object you can reuse many times, which is faster and cleaner in loops.", code: `import re

pattern = re.compile(r"\\bpy\\w+")
text = "python py pycode xyz"
print(pattern.findall(text))`, output: `['python', 'py', 'pycode']`, explain: "\\b is a word boundary and \\w+ matches word characters. The compiled pattern finds every word starting with \"py\"." },

{ id: "f5-048", cat: "regex", title: "Character Classes", desc: "Square brackets define a set of allowed characters: [aeiou] matches any vowel, [0-9] any digit, [^a] anything but 'a'.", code: `import re

text = "hello 42 world"
print(re.findall(r"[aeiou]", text))
print(re.findall(r"[0-9]", text))`, output: `['e', 'o', 'o'] 
['4', '2']`, explain: "The first class collects every vowel; the second every digit. Classes match exactly one character from the set." },

{ id: "f5-049", cat: "regex", title: "Quantifiers", desc: "Quantifiers control repetition: * means zero or more, + one or more, ? zero or one, {2,4} between two and four.", code: `import re

text = "gooood"
print(re.findall(r"go*d", text))
print(re.findall(r"go+d", text))
print(re.findall(r"go?d", text))`, output: `['gooood']
['gooood']
[]`, explain: "go*d matches the many o's; go+d requires at least one 'o'; go?d allows at most one 'o', so it matches nothing here." },

{ id: "f5-050", cat: "regex", title: "Anchors", desc: "Anchors pin matches to positions: ^ forces the start of the string, $ the end. They match position, not characters.", code: `import re

print(bool(re.search(r"^Zen", "Zen Dev")))
print(bool(re.search(r"Dev$", "Zen Dev")))
print(bool(re.search(r"^Dev$", "Zen Dev")))`, output: `True
True
False`, explain: "^Zen' only matches at position 0 and 'Dev$' only at the end — both succeed. '^Dev$' would need the WHOLE string to be \"Dev\"." },

{ id: "f5-051", cat: "regex", title: "Groups", desc: "Parentheses create capture groups; m.group(1) extracts the first captured part of a match.", code: `import re

m = re.search(r"(\\w+)@(\\w+)", "zen@dev")
print(m.group(1))
print(m.group(2))`, output: `zen
dev`, explain: "Group 1 captures \"zen\" before the @, group 2 captures \"dev\" after it. Groups let you pull structured parts out." },

{ id: "f5-052", cat: "regex", title: "Extract Emails", desc: "A practical regex for finding emails in messy text: word chars, dots, then @, then a domain.", code: `import re

text = "contact zen@dev.com or max@code.io today!"
emails = re.findall(r"[\\w.]+@[\\w.]+\\.\\w+", text)
print(emails)`, output: `['zen@dev.com', 'max@code.io']`, explain: "The pattern matches a local part, an @, and a dotted domain. Both addresses are extracted from the sentence." },

{ id: "f5-053", cat: "os-sys", title: "Current Directory", desc: "os.getcwd() returns the current working directory — where the script considers relative paths to start from.", code: `import os

cwd = os.getcwd()
print(os.path.isdir(cwd))`, output: `True`, explain: "getcwd() returns a path string; isdir() confirms it is a real directory on disk." },

{ id: "f5-054", cat: "os-sys", title: "List a Directory", desc: "os.listdir(path) returns the names of all files and folders inside a directory as a list.", code: `import os

entries = os.listdir(".")
print(isinstance(entries, list))`, output: `True`, explain: "listdir(\".\") reads the current folder and returns its entries. The result is always a list of name strings." },

{ id: "f5-055", cat: "os-sys", title: "Create Directories", desc: "os.makedirs(path) creates folders, including every missing parent folder along the way.", code: `import os

path = "temp_dir/nested/level"
os.makedirs(path, exist_ok=True)
print(os.path.isdir(path))`, output: `True`, explain: "makedirs builds temp_dir, nested and level in one call. exist_ok=True prevents an error if they already exist." },

{ id: "f5-056", cat: "os-sys", title: "Walk a Tree", desc: "os.walk(root) yields (dirpath, dirnames, filenames) for the root and every subfolder — a full recursive traversal.", code: `import os

os.makedirs("walk_demo/sub", exist_ok=True)
open("walk_demo/a.txt", "w").close()
open("walk_demo/sub/b.txt", "w").close()
for root, dirs, files in os.walk("walk_demo"):
    print(root, files)` , output: `walk_demo ['a.txt']
walk_demo\\sub ['b.txt']`, explain: "os.walk descends into every subfolder automatically. Each triple holds the current folder and its files, so you see both levels." },

{ id: "f5-057", cat: "os-sys", title: "Join Paths", desc: "os.path.join() combines path pieces with the correct separator for your operating system.", code: `import os

full = os.path.join("home", "zen", "notes.txt")
print(full)`, output: `home\\zen\\notes.txt`, explain: "On Windows, join() uses backslashes; on Linux, forward slashes. Paths built this way are portable between systems." },

{ id: "f5-058", cat: "os-sys", title: "Command Line Arguments", desc: "sys.argv holds the script name and every command-line argument passed when it was launched.", code: `import sys

print("script:", sys.argv[0])
print("args:", sys.argv[1:])`, output: `script: script.py
args: []`, explain: "argv[0] is always the script name. Everything after it — argv[1:] — is the user's arguments; none were passed here." },

{ id: "f5-059", cat: "os-sys", title: "Exit a Program", desc: "sys.exit(code) terminates the script immediately. A code of 0 means success; non-zero signals an error.", code: `import sys

print("before")
sys.exit(0)
print("never reached")`, output: `before`, explain: "sys.exit(0) halts execution instantly, so \"never reached\" never prints. The 0 tells the shell the program succeeded." },

{ id: "f5-060", cat: "os-sys", title: "Platform Module", desc: "platform.system() reports the operating system name, useful for writing cross-platform logic.", code: `import platform

name = platform.system()
print(name in ["Windows", "Linux", "Darwin"])`, output: `True`, explain: "On Windows the value is \"Windows\", on macOS \"Darwin\", on Linux \"Linux\". One of the three always matches." },

{ id: "f5-061", cat: "algorithms", title: "Linear Search", desc: "Linear search scans every element until the target is found. Slow but works on any list, sorted or not.", code: `def linear_search(items, target):
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1

print(linear_search([5, 2, 9, 1], 9))
print(linear_search([5, 2, 9, 1], 7))`, output: `2
-1`, explain: "The loop checks each element in turn. Index 2 holds 9, so it returns 2; 7 is absent, so it returns -1." },

{ id: "f5-062", cat: "algorithms", title: "Binary Search", desc: "Binary search repeatedly halves a sorted list, comparing the middle element to the target. Runs in O(log n) time.", code: `def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 7))`, output: `3`, explain: "First mid is 5 (value 9, too big), so high drops. Next mid is 2 (value 5, too small), so low rises. Mid 3 matches 7." },

{ id: "f5-063", cat: "algorithms", title: "Bubble Sort", desc: "Bubble sort swaps adjacent out-of-order pairs, bubbling the largest value to the end each pass. Simple but O(n^2).", code: `def bubble_sort(items):
    items = items[:]
    n = len(items)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
    return items

print(bubble_sort([4, 2, 9, 1]))`, output: `[1, 2, 4, 9]`, explain: "Each pass pushes the next largest number to its final position. After n-1 passes the list is fully sorted." },

{ id: "f5-064", cat: "algorithms", title: "Selection Sort", desc: "Selection sort finds the smallest remaining element and swaps it into position, one index at a time.", code: `def selection_sort(items):
    items = items[:]
    for i in range(len(items)):
        smallest = i
        for j in range(i + 1, len(items)):
            if items[j] < items[smallest]:
                smallest = j
        items[i], items[smallest] = items[smallest], items[i]
    return items

print(selection_sort([7, 3, 8, 2]))`, output: `[2, 3, 7, 8]`, explain: "Pass 1 finds 2 and swaps it to index 0. Pass 2 finds 3 at index 1, and so on — each pass locks one item into place." },

{ id: "f5-065", cat: "algorithms", title: "Insertion Sort", desc: "Insertion sort builds the sorted part one item at a time, inserting each new element into its correct spot.", code: `def insertion_sort(items):
    items = items[:]
    for i in range(1, len(items)):
        key = items[i]
        j = i - 1
        while j >= 0 and items[j] > key:
            items[j + 1] = items[j]
            j -= 1
        items[j + 1] = key
    return items

print(insertion_sort([6, 1, 8, 3]))`, output: `[1, 3, 6, 8]`, explain: "Each key shifts larger elements right until it finds its slot. Great for nearly-sorted data." },

{ id: "f5-066", cat: "algorithms", title: "Merge Sort", desc: "Merge sort splits the list in half recursively, sorts each half, then merges them. Guaranteed O(n log n).", code: `def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

print(merge_sort([5, 2, 8, 1, 9]))`, output: `[1, 2, 5, 8, 9]`, explain: "The list halves until single elements, then merges sorted pairs upward, always comparing the fronts of two sorted halves." },

{ id: "f5-067", cat: "algorithms", title: "Quick Sort", desc: "Quick sort picks a pivot, partitions smaller and larger elements around it, and recurses on both sides.", code: `def quick_sort(items):
    if len(items) <= 1:
        return items
    pivot = items[0]
    less = [x for x in items[1:] if x <= pivot]
    greater = [x for x in items[1:] if x > pivot]
    return quick_sort(less) + [pivot] + quick_sort(greater)

print(quick_sort([9, 3, 7, 1, 5]))`, output: `[1, 3, 5, 7, 9]`, explain: "With pivot 9 the first call, everything lands in less. Recursion repeats until each piece holds one element, then concatenates." },

{ id: "f5-068", cat: "algorithms", title: "Factorial Iterative", desc: "The factorial n! can be computed with a simple loop instead of recursion — no call stack worries.", code: `def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial(5))`, output: `120`, explain: "The loop multiplies result by 2, 3, 4, 5 in turn: 1*2*3*4*5 = 120." },

{ id: "f5-069", cat: "algorithms", title: "Fibonacci Iterative", desc: "The iterative Fibonacci tracks the last two numbers with two variables, avoiding exponential recursion.", code: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fib(10))`, output: `55`, explain: "Each step slides a, b forward: 0,1 -> 1,1 -> 1,2 -> 2,3 ... After 10 steps a holds the 10th Fibonacci number, 55." },

{ id: "f5-070", cat: "algorithms", title: "Fibonacci Memoized", desc: "Memoized recursion stores computed values in a dictionary, taming the exponential blowup of naive recursion.", code: `cache = {}

def fib(n):
    if n in cache:
        return cache[n]
    if n < 2:
        return n
    cache[n] = fib(n - 1) + fib(n - 2)
    return cache[n]

print(fib(40))`, output: `102334155`, explain: "Each result is stored before returning. fib(40) then costs about 40 steps instead of billions of recursive calls." },

{ id: "f5-071", cat: "algorithms", title: "Prime Check", desc: "A number is prime if it has no divisors between 2 and its square root. Checking only up to sqrt(n) keeps it fast.", code: `import math

def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(math.sqrt(n)) + 1):
        if n % d == 0:
            return False
    return True

print(is_prime(17))
print(is_prime(21))`, output: `True
False`, explain: "17 has no divisors up to 4 (its sqrt rounded), so it is prime. 21 is divisible by 3 and 7, so it returns False." },

{ id: "f5-072", cat: "algorithms", title: "Sieve of Eratosthenes", desc: "The sieve marks multiples of each prime as composite, leaving only primes. The classic fast way to list primes up to n.", code: `def sieve(n):
    prime = [True] * (n + 1)
    prime[0] = prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if prime[i]:
            for j in range(i * i, n + 1, i):
                prime[j] = False
    return [i for i in range(n + 1) if prime[i]]

print(sieve(20))`, output: `[2, 3, 5, 7, 11, 13, 17, 19]`, explain: "Starting from 2, every multiple of 2, then 3, then 5 is crossed out. Numbers never crossed are prime." },

{ id: "f5-073", cat: "algorithms", title: "GCD with Euclid", desc: "Euclid's algorithm: gcd(a, b) = gcd(b, a mod b). Repeat until the remainder is zero; the last divisor is the GCD.", code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(48, 36))`, output: `12`, explain: "48 % 36 = 12, then 36 % 12 = 0, so 12 is the greatest common divisor of 48 and 36." },

{ id: "f5-074", cat: "algorithms", title: "LCM", desc: "The least common multiple of two numbers is their product divided by their GCD: lcm(a,b) = a*b / gcd(a,b).", code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)

print(lcm(4, 6))`, output: `12`, explain: "gcd(4, 6) is 2, so lcm = 4 * 6 // 2 = 12 — the smallest number divisible by both 4 and 6." },

{ id: "f5-075", cat: "algorithms", title: "Palindrome Check", desc: "A palindrome reads the same forwards and backwards. Comparing a string to its reverse is the whole test.", code: `def is_palindrome(text):
    return text == text[::-1]

print(is_palindrome("radar"))
print(is_palindrome("zen"))`, output: `True
False`, explain: "text[::-1] reverses the string. \"radar\" equals its reverse (True); \"zen\" becomes \"nez\" (False)." },

{ id: "f5-076", cat: "algorithms", title: "Reverse a List", desc: "The in-place method .reverse() reverses the list and returns None; slicing [::-1] returns a new reversed copy.", code: `nums = [1, 2, 3]
nums.reverse()
print(nums)
nums = [1, 2, 3]
print(nums[::-1])`, output: `[3, 2, 1]
[3, 2, 1]`, explain: "reverse() mutates the original list. The slice [::-1] builds a new reversed list, leaving the original untouched." },

{ id: "f5-077", cat: "algorithms", title: "Anagram Check", desc: "Two strings are anagrams if they use the same letters in different orders. Sorting both and comparing proves it.", code: `def is_anagram(a, b):
    return sorted(a) == sorted(b)

print(is_anagram("listen", "silent"))
print(is_anagram("zen", "dev"))`, output: `True
False`, explain: "sorted(\"listen\") and sorted(\"silent\") both produce ['e','i','l','n','s','t']. \"zen\" and \"dev\" sort differently." },

{ id: "f5-078", cat: "algorithms", title: "Word Frequency", desc: "A Counter turns a text into a dictionary of word frequencies in one line.", code: `from collections import Counter

text = "the zen the code the zen"
words = Counter(text.split())
print(words["the"])
print(words["zen"])`, output: `3
2`, explain: "split() breaks the text into words, and Counter tallies each. \"the\" appears 3 times, \"zen\" 2 times." },

{ id: "f5-079", cat: "algorithms", title: "FizzBuzz", desc: "FizzBuzz prints Fizz for multiples of 3, Buzz for multiples of 5, FizzBuzz for both, and the number otherwise. A classic interview warm-up.", code: `for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`, output: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`, explain: "Checking % 15 first catches numbers divisible by both 3 and 5. The other branches handle each single case." },

{ id: "f5-080", cat: "algorithms", title: "Kadane Max Subarray", desc: "Kadane's algorithm finds the contiguous subarray with the largest sum in one pass, in O(n) time.", code: `def max_subarray(nums):
    best = current = nums[0]
    for n in nums[1:]:
        current = max(n, current + n)
        best = max(best, current)
    return best

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`, output: `6`, explain: "The best run is 4 + (-1) + 2 + 1 = 6. The algorithm either extends the current run or restarts at n, tracking the best seen." },

{ id: "f5-081", cat: "algorithms", title: "Two Sum", desc: "Two Sum finds a pair of indices whose values add up to a target, using a dictionary for O(n) lookups.", code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))`, output: `[0, 1]`, explain: "At index 0, 9-2=7 is not seen, so 2 is stored. At index 1, 9-7=2 IS seen, so [0, 1] is the answer." },

{ id: "f5-082", cat: "algorithms", title: "Collatz Sequence", desc: "The Collatz conjecture: if n is even halve it, if odd triple it and add 1, until reaching 1. No one has found a counterexample.", code: `def collatz(n):
    steps = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        steps += 1
    return steps

print(collatz(6))`, output: `8`, explain: "6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1: eight transitions before reaching 1." },

{ id: "f5-083", cat: "algorithms", title: "Armstrong Number", desc: "An Armstrong number equals the sum of its own digits each raised to the power of the digit count. 153 = 1^3 + 5^3 + 3^3.", code: `def is_armstrong(n):
    s = str(n)
    return n == sum(int(d) ** len(s) for d in s)

print(is_armstrong(153))
print(is_armstrong(123))`, output: `True
False`, explain: "For 153: 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153, matching n. 1^3 + 2^3 + 3^3 = 36, far from 123." },

{ id: "f5-084", cat: "algorithms", title: "Sum of Digits", desc: "Repeatedly taking the last digit with % 10 and removing it with // 10 sums a number's digits.", code: `def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

print(digit_sum(9876))`, output: `30`, explain: "Each loop peels off the last digit: 6 + 7 + 8 + 9 = 30. Integer division drops the digit just consumed." },

{ id: "f5-085", cat: "algorithms", title: "Binary to Decimal", desc: "Reading a binary string right to left, each 1 bit contributes 2 raised to its position.", code: `def bin_to_dec(bits):
    value = 0
    for bit in bits:
        value = value * 2 + int(bit)
    return value

print(bin_to_dec("1011"))`, output: `11`, explain: "Walking left to right: 1 -> 1, then 1*2+0=2, then 2*2+1=5, then 5*2+1=11. This is Horner's method." },

{ id: "f5-086", cat: "algorithms", title: "Second Largest", desc: "A single pass can find the second largest element by tracking the top two values simultaneously.", code: `def second_largest(nums):
    first = second = float("-inf")
    for n in nums:
        if n > first:
            second = first
            first = n
        elif n > second:
            second = n
    return second

print(second_largest([3, 9, 1, 8]))`, output: `8`, explain: "9 becomes first and 3 becomes second, then 8 replaces 3 as second. The runner-up ends up as 8." },

{ id: "f5-087", cat: "algorithms", title: "Common Elements", desc: "Set intersection finds elements present in both lists with the & operator in one line.", code: `a = [1, 2, 3, 4]
b = [3, 4, 5, 6]
common = list(set(a) & set(b))
print(common)`, output: `[3, 4]`, explain: "set(a) & set(b) computes the intersection {3, 4}; list() converts it back for a familiar container." },

{ id: "f5-088", cat: "algorithms", title: "Unique Characters", desc: "Comparing a string's length with its set's length tells you immediately whether all characters are unique.", code: `def all_unique(text):
    return len(text) == len(set(text))

print(all_unique("zen"))
print(all_unique("hello"))`, output: `True
False`, explain: "Sets drop duplicates. \"zen\" keeps all 3 chars (3 == 3), while \"hello\" shrinks to 4 chars, proving a repeat." },

{ id: "f5-089", cat: "projects", title: "Guess the Number", desc: "The computer picks a secret number; the player guesses until they hit it, with hints after every wrong try.", code: `import random

secret = random.randint(1, 100)
guess = None
tries = 0
while guess != secret:
    guess = int(input("Guess (1-100): "))
    tries += 1
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
print(f"Correct in {tries} tries!")`, output: `None`, explain: "The loop keeps asking until the guess matches. Comparison messages guide the player; tries counts the attempts. Run it to play!" },

{ id: "f5-090", cat: "projects", title: "Rock Paper Scissors", desc: "A classic game: rock beats scissors, scissors beats paper, paper beats rock. The computer picks at random.", code: `import random

moves = ["rock", "paper", "scissors"]
user = input("Your move: ")
computer = random.choice(moves)
print("Computer:", computer)
if user == computer:
    print("Draw!")
elif (user == "rock" and computer == "scissors") or \\
     (user == "paper" and computer == "rock") or \\
     (user == "scissors" and computer == "paper"):
    print("You win!")
else:
    print("You lose!")`, output: `None`, explain: "The three winning combos are listed with or. Any other outcome — or an invalid move — falls into the else and loses." },

{ id: "f5-091", cat: "projects", title: "Dice Roller", desc: "A virtual die: each roll produces a random number from 1 to 6, printed one per line.", code: `import random

for roll in range(5):
    print(random.randint(1, 6))`, output: `Random`, explain: "Each iteration simulates one die roll with randint(1, 6). Rerun the program for a new set of five results." },

{ id: "f5-092", cat: "projects", title: "Password Generator", desc: "Random characters from letters, digits and symbols form a strong password of any requested length.", code: `import random
import string

length = 12
chars = string.ascii_letters + string.digits + "!@#$%^&*"
password = "".join(random.choice(chars) for _ in range(length))
print(password)`, output: `Random`, explain: "string.ascii_letters and string.digits provide the alphabet; random.choice picks each character; join() assembles the password." },

{ id: "f5-093", cat: "projects", title: "Mad Libs", desc: "The player fills in blanks, and the program inserts their words into a story template.", code: `name = input('A name: ')
place = input("A place: ")
food = input("A food: ")
print(f"{name} went to {place} and ate {food}.")`, output: `None`, explain: "Three inputs are collected and woven into a single sentence with an f-string. The story changes with every play." },

{ id: "f5-094", cat: "projects", title: "Hangman", desc: "A word-guessing game: the player names letters, and each wrong guess reduces their remaining lives.", code: `import random

word = random.choice(["python", "zen", "code", "pixel"])
guessed = set()
lives = 5
while lives > 0:
    shown = "".join(c if c in guessed else "_" for c in word)
    print(shown, "| lives:", lives)
    letter = input("Letter: ")
    if letter in word:
        guessed.add(letter)
    else:
        lives -= 1
    if all(c in guessed for c in word):
        print("You won:", word)
        break
else:
    print("Out of lives. Word was:", word)`, output: `None`, explain: "guessed stores correct letters; the display reveals them. The while-else catches running out of lives without a win." },

{ id: "f5-095", cat: "projects", title: "Caesar Cipher", desc: "Each letter shifts by a fixed amount in the alphabet to encrypt, and shifts back to decrypt. The classic ancient cipher.", code: `def caesar(text, shift):
    result = ""
    for ch in text:
        if ch.isalpha():
            base = ord("a") if ch.islower() else ord("A")
            result += chr((ord(ch) - base + shift) % 26 + base)
        else:
            result += ch
    return result

encrypted = caesar("hello", 3)
print(encrypted)
print(caesar(encrypted, -3))`, output: `khoor
hello`, explain: "shift +3 moves each letter forward in the alphabet with wraparound via % 26. Shifting back by -3 restores the original." },

{ id: "f5-096", cat: "projects", title: "Quiz Game", desc: "A dictionary of questions and answers drives a simple quiz with score tracking.", code: `questions = {
    "What is 2 + 2?": "4",
    "What color is grass?": "green",
}
score = 0
for question, answer in questions.items():
    user = input(question + " ")
    if user.lower() == answer:
        score += 1
print(f"Score: {score}/{len(questions)}")`, output: `None`, explain: "The dict pairs each question with its answer; the loop compares the lowercase input. Extend the dict to grow the quiz." },

{ id: "f5-097", cat: "projects", title: "Word Count Tool", desc: "A text analyzer counts characters, words and lines — the core of tools like wc.", code: `text = input('Paste text: ')
print("Chars:", len(text))
print("Words:", len(text.split()))
print("Lines:", text.count("\\n") + 1)`, output: `None`, explain: "len() counts characters; split() breaks words on spaces; counting newlines (plus one) approximates the number of lines." },

{ id: "f5-098", cat: "projects", title: "Temperature Converter", desc: "A converter between Celsius and Fahrenheit using the two standard formulas.", code: `def c_to_f(c):
    return c * 9 / 5 + 32

def f_to_c(f):
    return (f - 32) * 5 / 9

print(c_to_f(100))
print(round(f_to_c(212)))`, output: `212.0
100`, explain: "Water boils at 100 C = 212 F, so both functions round-trip that famous pair. round() cleans the float result." },

{ id: "f5-099", cat: "projects", title: "Simple Calculator", desc: "A loop-based calculator that applies an operator to two numbers and repeats until the user quits.", code: `while True:
    expr = input("Type an expression (like 2 + 3, or q to quit): ")
    if expr.lower() == "q":
        break
    a, op, b = expr.split()
    a, b = float(a), float(b)
    if op == "+":
        print(a + b)
    elif op == "-":
        print(a - b)
    elif op == "*":
        print(a * b)
    elif op == "/":
        print(a / b)`, output: `None`, explain: "split() unpacks the three tokens; the if/elif chain picks the operation. Invalid operators are silently ignored — try extending it!" },

{ id: "f5-100", cat: "projects", title: "To-Do List", desc: "A console task manager: add, list and remove tasks. A list holds the state; a menu drives the actions.", code: `tasks = []
while True:
    cmd = input("(a)dd (l)ist (r)emove (q)uit: ")
    if cmd == "a":
        tasks.append(input("Task: "))
    elif cmd == "l":
        for i, t in enumerate(tasks, 1):
            print(i, t)
    elif cmd == "r":
        idx = int(input("Number: ")) - 1
        if 0 <= idx < len(tasks):
            tasks.pop(idx)
    elif cmd == "q":
        break`, output: `None`, explain: "Each command mutates the tasks list. enumerate with start=1 numbers the display; pop removes by index. Run it to manage tasks!" },

{ id: "f5-101", cat: "projects", title: "Phonebook App", desc: "A dictionary-based phonebook with add, lookup and list operations, all in a menu loop.", code: `book = {}
while True:
    cmd = input("(a)dd (f)ind (s)how (q)uit: ")
    if cmd == "a":
        name = input("Name: ")
        book[name] = input("Phone: ")
    elif cmd == "f":
        print(book.get(input("Name: "), "Not found"))
    elif cmd == "s":
        for name, phone in book.items():
            print(name, phone)
    elif cmd == "q":
        break`, output: `None`, explain: "Names are keys and phones are values. get() with a default avoids KeyError for unknown names." },

{ id: "f5-102", cat: "projects", title: "Bank Account Class", desc: "A small banking system as a class: deposit, withdraw and balance, with validation against overdraft.", code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False

acc = BankAccount("Zen", 100)
acc.deposit(50)
print(acc.withdraw(200))
print(acc.balance)`, output: `False
150`, explain: "Depositing 50 makes the balance 150. The 200 withdrawal is refused because it exceeds the balance; the guard returns False." },

{ id: "f5-103", cat: "projects", title: "Shopping Cart", desc: "A cart as a dictionary: products map to quantities. add, remove, total — the core of e-commerce logic.", code: `cart = {}
cart["apple"] = 2
cart["banana"] = 3
prices = {"apple": 0.5, "banana": 0.3}
total = sum(prices[item] * qty for item, qty in cart.items())
print(f"Total: \${total:.2f}")
print("Items:", sum(cart.values()))`, output: `Total: $1.90
Items: 5`, explain: "The generator expression multiplies each price by its quantity: 2*0.5 + 3*0.3 = $1.90. sum() counts total items." },

{ id: "f5-104", cat: "projects", title: "Grade Manager", desc: "Grades live in a dictionary; the app computes the average and letter grade for each student.", code: `grades = {'Zen': [90, 85], 'Max': [70, 75]}
for student, scores in grades.items():
    avg = sum(scores) / len(scores)
    letter = "A" if avg >= 90 else "B" if avg >= 80 else "C"
    print(student, avg, letter)`, output: `Zen 87.5 B
Max 72.5 C`, explain: "Each student's average is computed from their score list; the nested ternary maps it to a letter grade." },

{ id: "f5-105", cat: "projects", title: "Lottery Picker", desc: "A lottery draw picks a set of unique numbers from a range — random.sample guarantees no repeats.", code: `import random

numbers = random.sample(range(1, 50), 6)
print(sorted(numbers))`, output: `Random`, explain: "random.sample draws 6 distinct numbers from 1-49 without repetition, then sorted() presents them neatly." },

{ id: "f5-106", cat: "projects", title: "Morse Code Converter", desc: "Text translates to Morse code through a dictionary, with spaces between letters.", code: `morse = {
    "a": ".-", "b": "-...", "c": "-.-.", "d": "-..",
    "e": ".", "f": "..-.", "g": "--.", "h": "....",
    "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
    "m": "--", "n": "-.", "o": "---", "p": ".--.",
    "q": "--.-", "r": ".-.", "s": "...", "t": "-",
    "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
    "y": "-.--", "z": "--..",
}
text = input("Text: ").lower()
print(" ".join(morse[ch] for ch in text if ch in morse))`, output: `None`, explain: "The generator looks up each letter in the morse dict and join() spaces the codes. Non-letters are filtered out." },

{ id: "f5-107", cat: "projects", title: "Pig Latin Translator", desc: "A word game language: words starting with consonants move the first letters to the end and add 'ay'.", code: `def pig_latin(word):
    vowels = "aeiou"
    if word[0] in vowels:
        return word + "way"
    for i, ch in enumerate(word):
        if ch in vowels:
            return word[i:] + word[:i] + "ay"
    return word + "ay"

print(pig_latin("hello"))
print(pig_latin("apple"))`, output: `ellohay
appleway`, explain: "\"hello\" shifts 'h' to the end plus 'ay' = \"ellohay\". Vowel-initial words just gain \"way\": \"appleway\"." },

{ id: "f5-108", cat: "projects", title: "Countdown Timer", desc: "A command-line countdown that ticks down every second using time.sleep.", code: `import time

seconds = 5
while seconds > 0:
    print(f"{seconds}...")
    time.sleep(1)
    seconds -= 1
print("GO!")`, output: `5...
4...
3...
2...
1...
GO!`, explain: "Each loop prints the remaining time, sleeps for one real second, then decrements. When it hits zero, \"GO!\" fires." },

{ id: "f5-109", cat: "projects", title: "Tic-Tac-Toe Board", desc: "A 3x3 grid represented as a list; display and move logic for a two-player console game.", code: `board = [' '] * 9

def show():
    for i in range(0, 9, 3):
        print("|".join(board[i:i + 3]))

player = "X"
for turn in range(9):
    show()
    pos = int(input(f"Player {player}, position 0-8: "))
    if board[pos] == " ":
        board[pos] = player
        player = "O" if player == "X" else "X"
show()
print("Game over")`, output: `None`, explain: "board holds nine cells; show() prints them in rows. Turns alternate by swapping player, and invalid moves are ignored. Run it!" },

{ id: "f5-110", cat: "projects", title: "Email Extractor", desc: "A real-world tool: pull every email address out of a block of text with one regex.", code: `import re

text = """
Reach zen@dev.com for coding,
max@code.io for design,
or the team at support@zenx.dev.
"""
emails = re.findall(r"[\\w.-]+@[\\w.-]+\\.\\w+", text)
print(emails)`, output: `['zen@dev.com', 'max@code.io', 'support@zenx.dev']`, explain: "The pattern matches word chars, dots and dashes before @, then a domain with a dotted TLD. All three addresses are found." },

{ id: "f5-111", cat: "projects", title: "Coin Flip Simulator", desc: "A fair coin flipped many times, with the results tallied — the law of large numbers in action.", code: `import random

heads = 0
for _ in range(1000):
    if random.random() < 0.5:
        heads += 1
print("Heads:", heads)
print("Tails:", 1000 - heads)`, output: `Random`, explain: "random.random() is uniform on [0, 1), so values below 0.5 count as heads. Over 1000 flips, heads lands near 500." },

{ id: "f5-112", cat: "projects", title: "Unit Converter", desc: "A table-driven converter: one dictionary of conversion factors handles many units at once.", code: `factors = {'km': 1000, 'm': 1, 'cm': 0.01, 'mm': 0.001}
value = float(input("Value: "))
unit = input("From (km/m/cm/mm): ")
target = input("To (km/m/cm/mm): ")
meters = value * factors[unit]
print(f"{value} {unit} = {meters / factors[target]} {target}")`, output: `None`, explain: "Every unit converts to meters first, then to the target — the dictionary stores the factors, and one formula covers all pairs." }

]);
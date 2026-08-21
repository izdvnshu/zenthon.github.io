/* ZENTHON — Python examples (file 4 of 5): FUNCTIONS, OOP, MODULES, ERRORS, FILES */
window.PY_DATA = window.PY_DATA || [];
window.PY_DATA = window.PY_DATA.concat([

{ id: "f4-001", cat: "functions", title: "Define a Function", desc: "A function is a reusable block of code that runs only when you call it. You define one with the def keyword followed by a name, parentheses, and a colon. The body is indented underneath and can contain any Python statements.", code: `def greet():
    print("Hello!")`, output: `None`, explain: "The def keyword creates a function named greet that takes no parameters. Nothing runs until the function is called with greet(), which executes the indented print statement." },

{ id: "f4-002", cat: "functions", title: "Return a Value", desc: "The return statement sends a value back from a function to the caller. The returned value can be stored in a variable or used directly in an expression. Once return executes, the function stops immediately.", code: `def square(x):
    return x * x

result = square(5)
print(result)`, output: `25`, explain: "square(5) computes 5 * 5 and return sends the value 25 back. The caller stores it in result, and print displays 25." },

{ id: "f4-003", cat: "functions", title: "Return Multiple Values", desc: "Python functions can return several values at once by separating them with commas. The values are packed into a tuple automatically. The caller can unpack them into individual variables.", code: `def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([4, 9, 1, 7])
print(lo)
print(hi)`, output: `1
7`, explain: "The return statement creates the tuple (1, 7) from min and max. Tuple unpacking assigns 1 to lo and 7 to hi, and each is printed on its own line." },

{ id: "f4-004", cat: "functions", title: "Implicit None Return", desc: "A function without a return statement automatically returns the special value None. Functions that only print or mutate data rely on this implicit behavior. None is Python's way of saying nothing was returned.", code: `def do_nothing():
    pass

result = do_nothing()
print(result)`, output: `None`, explain: "The pass statement makes the function valid but empty. Since no return exists, Python returns None, which print displays as the word None." },

{ id: "f4-005", cat: "functions", title: "Required Parameters", desc: "Parameters are variables listed inside a function's parentheses that receive values from the caller. A required parameter has no default, so calling the function without it raises a TypeError. The number and order of arguments must match the parameters.", code: `def add(a, b):
    return a + b

print(add(3, 4))
print(add(3))`, output: `7
TypeError: add() missing 1 required positional argument: 'b'`, explain: "The first call passes both arguments and prints 7. The second call passes only one argument, so Python raises a TypeError because b is required but missing." },

{ id: "f4-006", cat: "functions", title: "Default Parameter Values", desc: "Parameters can be assigned a default value with the equals sign in the definition. If the caller omits that argument, the default is used instead. Defaults make functions flexible and optional arguments easy to use.", code: `def greet(name='friend'):
    print(f"Hello, {name}!")

greet("Zen")
greet()`, output: `Hello, Zen!
Hello, friend!`, explain: "The first call passes the value Zen, which replaces the default. The second call supplies no argument, so the default friend is used in the greeting." },

{ id: "f4-007", cat: "functions", title: "Keyword Arguments", desc: "Keyword arguments pass values by name instead of position using the name=value syntax in the call. This makes calls more readable and lets you skip optional parameters. Order does not matter when every argument is named.", code: `def introduce(name, age):
    print(f"{name} is {age} years old")

introduce(age=30, name="Zen")
introduce("Ada", 25)`, output: `Zen is 30 years old
Ada is 25 years old`, explain: "The first call uses keyword arguments, so order does not matter and age=30 binds to the age parameter. The second call uses positional arguments, which must follow the definition order." },

{ id: "f4-008", cat: "functions", title: "Positional-only and Keyword-only Parameters", desc: "The / marker makes everything before it positional-only, so those arguments cannot be passed by keyword. The * marker makes everything after it keyword-only, so those arguments must be passed by name. This gives precise control over how a function may be called.", code: `def mix(a, b, /, c, *, d):
    return f"{a}-{b}-{c}-{d}"

print(mix(1, 2, 3, d=4))
print(mix(1, 2, c=3, d=4))`, output: `1-2-3-4
1-2-3-4`, explain: "a and b are positional-only, so they are always given by position. c can be positional or keyword, while d is keyword-only and must always be named. Both calls therefore work and produce the same output." },

{ id: "f4-009", cat: "functions", title: "*args Packing", desc: "A single star before a parameter, conventionally named *args, collects any number of extra positional arguments into a tuple. It lets a function accept a variable number of arguments. Inside the function, args behaves like a normal tuple.", code: `def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))
print(total(5, 10))`, output: `10
15`, explain: "The first call packs 1, 2, 3, 4 into the tuple (1, 2, 3, 4), and sum returns 10. The second call packs (5, 10) and returns 15, showing the function handles any count of arguments." },

{ id: "f4-010", cat: "functions", title: "**kwargs Packing", desc: "A double star before a parameter, conventionally named **kwargs, collects all extra keyword arguments into a dictionary. Keys are the argument names and values are the passed values. It lets a function accept arbitrary named options.", code: `def describe(**kwargs):
    for key, value in kwargs.items():
        print(f"{key} = {value}")

describe(name="Zen", level=10, online=True)`, output: `name = Zen
level = 10
online = True`, explain: "The three named arguments are packed into the dictionary {'name': 'Zen', 'level': 10, 'online': True}. The for loop iterates over the items and prints each key-value pair." },

{ id: "f4-011", cat: "functions", title: "*args and **kwargs Combined", desc: "Using *args and **kwargs together creates a universal function signature that accepts any number of positional and keyword arguments. The order in the definition must be positional, *args, then **kwargs. This pattern is common in wrappers and decorators.", code: `def log(level, *args, **kwargs):
    print("Level:", level)
    print("Args:", args)
    print("Kwargs:", kwargs)

log("INFO", "boot", "ready", user="Zen")`, output: `Level: INFO
Args: ('boot', 'ready')
Kwargs: {'user': 'Zen'}`, explain: "The string INFO fills the required level parameter. The extra positional values boot and ready pack into the args tuple, and the named argument user ends up in the kwargs dictionary." },

{ id: "f4-012", cat: "functions", title: "Docstring", desc: "A docstring is a string literal right after the function definition that documents what the function does. It is accessible through the special __doc__ attribute. Triple quotes allow multi-line documentation.", code: `def multiply(a, b):
    """Multiplies two numbers and returns the product."""
    return a * b

print(multiply(3, 7))
print(multiply.__doc__)`, output: `21
Multiplies two numbers and returns the product.`, explain: "The triple-quoted string is stored as the function's documentation. Calling multiply returns 21, and accessing multiply.__doc__ retrieves and prints the docstring text." },

{ id: "f4-013", cat: "functions", title: "Type Annotations", desc: "Type annotations hint at the expected types of parameters and the return value. They do not enforce anything at runtime, but tools and IDEs can use them for checks and autocompletion. The hints are stored in the __annotations__ dictionary.", code: `def add(a: int, b: int) -> int:
    return a + b

print(add(3, 5))
print(add.__annotations__)`, output: `8
{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}`, explain: "The annotation a: int marks a as an integer and -> int marks the return type. The function still just adds and prints 8, while __annotations__ reveals the stored type hints." },

{ id: "f4-014", cat: "functions", title: "Local vs Global Scope", desc: "A variable assigned inside a function lives in that function's local scope and cannot be seen outside. A variable assigned at the top level lives in the global scope. Assigning a name inside a function creates a local variable even if a global with the same name exists.", code: `level = 'global'

def show():
    level = "local"
    print("Inside:", level)

show()
print("Outside:", level)`, output: `Inside: local
Outside: global`, explain: "Inside show, the assignment creates a local level that shadows the global one, so the first print shows local. After the call, the global level is untouched, so the second print shows global." },

{ id: "f4-015", cat: "functions", title: "global Keyword", desc: "The global statement declares that a name refers to the global variable instead of creating a local one. This allows a function to modify a variable defined outside it. Without global, assigning the name would create a new local variable.", code: `count = 0

def bump():
    global count
    count += 1

bump()
bump()
print(count)`, output: `2`, explain: "The global count line tells Python to use the top-level count variable. Each call to bump increments the shared global, so after two calls count holds 2." },

{ id: "f4-016", cat: "functions", title: "nonlocal Keyword", desc: "The nonlocal statement lets a nested function rebind a variable from the enclosing (outer) function's scope. It works one level out, unlike global which reaches module scope. It is required when a nested function assigns to an outer function's variable.", code: `def outer():
    value = 10

    def inner():
        nonlocal value
        value += 5

    inner()
    print(value)

outer()`, output: `15`, explain: "The inner function declares nonlocal value, so value += 5 modifies the variable in outer instead of creating a local one. After the call, outer prints the updated value 15." },

{ id: "f4-017", cat: "functions", title: "Nested Function", desc: "A nested function is a function defined inside another function. It is local to the outer function and cannot be called from outside. Nested functions are useful for helper logic that only the outer function needs.", code: `def outer(a):
    def helper(x):
        return x * 2
    return helper(a) + 1

print(outer(10))`, output: `21`, explain: "outer calls its nested helper with the argument 10, which returns 20. Adding 1 gives 21, which is printed after outer returns." },

{ id: "f4-018", cat: "functions", title: "Closure Returning Inner Function", desc: "A closure is created when an inner function captures variables from its enclosing scope. The inner function keeps access to those variables even after the outer function finishes. Returning the inner function lets you build configurable, reusable functions.", code: `def make_multiplier(factor):
    def multiply(n):
        return n * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))
print(triple(5))`, output: `10
15`, explain: "Each call to make_multiplier returns a multiply function that remembers its own factor. double multiplies by 2, giving 10, while triple multiplies by 3, giving 15." },

{ id: "f4-019", cat: "functions", title: "Recursion Countdown", desc: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case that stops the calls. A countdown prints decreasing numbers until the base case triggers.", code: `def countdown(n):
    if n <= 0:
        print("Blast off!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`, output: `3
2
1
Blast off!`, explain: "Each call prints n and then calls itself with n - 1. When n reaches 0, the base case prints Blast off! and returns, unwinding the chain of calls." },

{ id: "f4-020", cat: "functions", title: "Factorial Recursive", desc: "The factorial of n, written n!, is the product of all integers from 1 to n. Recursively, n! equals n times (n - 1)!. The base case is 1! or 0!, both equal to 1.", code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`, output: `120`, explain: "factorial(5) calls factorial(4), which calls factorial(3), and so on until factorial(1) returns 1. The results multiply back up the chain: 2 * 3 * 4 * 5 = 120." },

{ id: "f4-021", cat: "functions", title: "Fibonacci Recursive", desc: "The Fibonacci sequence starts 0, 1, and each next number is the sum of the previous two. A recursive version defines fib(n) as fib(n-1) + fib(n-2). The base cases return n directly when n is 0 or 1.", code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`, output: `55`, explain: "fib(10) splits into fib(9) plus fib(8), and each of those splits further until the base cases return 0 or 1. Summing up the base values along the tree gives the 10th Fibonacci number, 55." },

{ id: "f4-022", cat: "functions", title: "Lambda Basic", desc: "A lambda is a tiny anonymous function written as a single expression. The syntax is lambda parameters: expression, and the expression's value is returned automatically. Lambdas are handy for short throwaway functions.", code: `double = lambda x: x * 2
print(double(7))`, output: `14`, explain: "The lambda takes x and returns x * 2 as its implicit result. Assigning it to double lets you call it like a normal function, and double(7) evaluates to 14." },

{ id: "f4-023", cat: "functions", title: "Lambda as Sort Key", desc: "The sort method and sorted function accept a key function that extracts the value to sort by. A lambda is often used as the key because it is short and defined inline. The list is ordered by the values the key function returns.", code: `scores = [('Zen', 88), ('Ada', 95), ('Bob', 70)]
scores.sort(key=lambda pair: pair[1])
print(scores)`, output: `[('Bob', 70), ('Zen', 88), ('Ada', 95)]`, explain: "For each tuple, the lambda returns the second element, the score. Python sorts the pairs by those scores, producing Bob (70), Zen (88), then Ada (95)." },

{ id: "f4-024", cat: "functions", title: "map()", desc: "The map function applies a given function to every item of an iterable. In Python 3 it returns an iterator, so you wrap it with list() to get the results. It is a functional alternative to writing a manual loop.", code: `names = ['zen', 'ada', 'bob']
upper = list(map(str.upper, names))
print(upper)`, output: `['ZEN', 'ADA', 'BOB']`, explain: "map calls the str.upper method on each name, converting it to uppercase. Wrapping the iterator in list() collects the results into ['ZEN', 'ADA', 'BOB']." },

{ id: "f4-025", cat: "functions", title: "filter()", desc: "The filter function keeps only the items of an iterable for which a test function returns True. It also returns an iterator in Python 3. The test is usually written as a lambda.", code: `numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda n: n % 2 == 0, numbers))
print(evens)`, output: `[2, 4, 6]`, explain: "The lambda returns True for numbers divisible by 2. filter drops the odd numbers and keeps 2, 4, and 6, which list() collects into the final list." },

{ id: "f4-026", cat: "functions", title: "reduce()", desc: "The reduce function, from the functools module, combines all items of an iterable into one value. It applies a two-argument function cumulatively from left to right. It is the functional equivalent of accumulating in a loop.", code: `from functools import reduce

numbers = [1, 2, 3, 4]
product = reduce(lambda a, b: a * b, numbers)
print(product)`, output: `24`, explain: "reduce first multiplies 1 and 2 to get 2, then multiplies that by 3 to get 6, then by 4 to get 24. The single value 24 is returned and printed." },

{ id: "f4-027", cat: "functions", title: "sum() with start", desc: "The built-in sum function adds up all items of an iterable. An optional second argument is a starting value added to the total. This is useful for offsets or initializing an accumulator.", code: `print(sum([1, 2, 3]))
print(sum([1, 2, 3], 10))`, output: `6
16`, explain: "The first call sums 1 + 2 + 3 to get 6. The second call starts at 10, so the total becomes 10 + 6 = 16." },

{ id: "f4-028", cat: "functions", title: "Pass Function as Argument", desc: "Functions are first-class objects in Python, so they can be passed to other functions as arguments. A function that accepts another function is called a higher-order function. This enables flexible, reusable behavior.", code: `def apply_twice(func, value):
    return func(func(value))

def add_one(x):
    return x + 1

print(apply_twice(add_one, 5))`, output: `7`, explain: "apply_twice calls add_one on 5, getting 6, then calls add_one again on 6. The double application returns 7, proving the function was passed and used twice." },

{ id: "f4-029", cat: "functions", title: "Function Returning a Function", desc: "A function can return another function, which is the foundation of factories and decorators. The returned function captures the outer function's arguments through a closure. Each call can produce a specialized version.", code: `def power_of(exp):
    def power(base):
        return base ** exp
    return power

square = power_of(2)
cube = power_of(3)
print(square(4))
print(cube(4))`, output: `16
64`, explain: "power_of(2) returns a function that raises its argument to the power of 2, and power_of(3) returns one that cubes. square(4) gives 16, while cube(4) gives 64." },

{ id: "f4-030", cat: "functions", title: "Unpacking Arguments in a Call", desc: "Placing a star before an iterable in a function call unpacks it into separate positional arguments. This lets a list or tuple be spread across the function's parameters. It is the call-side counterpart of *args packing.", code: `def add_three(a, b, c):
    return a + b + c

args = [10, 20, 30]
print(add_three(*args))`, output: `60`, explain: "The *args syntax in the call unpacks the list into three separate arguments, so a=10, b=20, and c=30. The function adds them to produce 60." },

{ id: "f4-031", cat: "functions", title: "Function That Sums *args", desc: "A function can use *args to accept any number of values and process them as a tuple. Combining *args with the built-in sum gives a flexible total function. It works with zero, one, or many arguments.", code: `def sum_all(*numbers):
    return sum(numbers)

print(sum_all())
print(sum_all(1, 2, 3))
print(sum_all(4, 5, 6, 7))`, output: `0
6
22`, explain: "With no arguments the tuple is empty and sum returns 0. The second call sums the tuple (1, 2, 3) to 6, and the third sums (4, 5, 6, 7) to 22." },

{ id: "f4-032", cat: "functions", title: "Default Mutable Argument Pitfall", desc: "Default values are evaluated once when the function is defined, not per call. A mutable default like a list is shared by every call, so changes persist. The fix is to use None as the default and create a new list inside the function.", code: `def append_to(item, bucket=[]):
    bucket.append(item)
    return bucket

print(append_to(1))
print(append_to(2))
print(append_to(3))`, output: `[1]
[1, 2]
[1, 2, 3]`, explain: "All three calls share the same default list, so each call appends to the previous result. The third call returns [1, 2, 3] instead of [3], demonstrating the shared-default bug." },

{ id: "f4-033", cat: "functions", title: "Pure Function Example", desc: "A pure function always returns the same output for the same input and has no side effects. It never modifies its arguments or any global state. Pure functions are easy to test and reason about.", code: `def pure_add(a, b):
    return a + b

x = 5
y = 10
result = pure_add(x, y)
print(result)
print(x, y)`, output: `15
5 10`, explain: "pure_add only reads a and b and returns their sum, never touching the outside world. The variables x and y keep their values, proving the function had no side effects." },

{ id: "f4-034", cat: "functions", title: "Function Aliasing", desc: "Assigning a function to another name creates an alias, not a copy. Both names point to the same function object, so calling either behaves identically. Aliasing is often used to shorten names or create local references.", code: `def shout():
    print("LOUD NOISE")

speak = shout
shout()
speak()`, output: `LOUD NOISE
LOUD NOISE`, explain: "The assignment speak = shout makes speak refer to the exact same function. Calling shout and calling speak both execute the same code, so the message prints twice." },

{ id: "f4-035", cat: "functions", title: "Early Return Pattern", desc: "The early return pattern exits a function as soon as the answer is known. Guards near the top handle error or special cases with an immediate return. The remaining code then runs without nested conditionals.", code: `def is_positive(n):
    if n <= 0:
        return False
    return True

print(is_positive(7))
print(is_positive(-3))`, output: `True
False`, explain: "For -3, the guard catches it and returns False immediately. For 7, the guard is skipped and the function returns True, keeping the logic flat and readable." },

{ id: "f4-036", cat: "oop", title: "Class Basic", desc: "A class is a blueprint for creating objects that bundle data and behavior together. The class keyword starts the definition, and pass can stand in for an empty body. Instances are created by calling the class like a function.", code: `class Dog:
    pass

d = Dog()
print(type(d).__name__)`, output: `Dog`, explain: "The Dog class is defined with an empty body using pass. Calling Dog() creates an instance, and type(d).__name__ reveals that the instance's type is Dog." },

{ id: "f4-037", cat: "oop", title: "__init__", desc: "The __init__ method is the constructor that runs automatically when an instance is created. It receives the arguments passed to the class name and typically sets up the instance's initial state. The method name has double underscores on both sides.", code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Zen", 30)
print(p.name, p.age)`, output: `Zen 30`, explain: "Creating Person(\"Zen\", 30) triggers __init__, which stores the arguments on the new instance as name and age. Accessing p.name and p.age prints the stored values." },

{ id: "f4-038", cat: "oop", title: "self", desc: "self is the first parameter of every instance method and refers to the specific instance the method was called on. It is how methods access the instance's own attributes and other methods. The name self is a convention, though Python passes the instance automatically.", code: `class Robot:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"I am {self.name}"

r = Robot("R2")
print(r.greet())`, output: `I am R2`, explain: "When r.greet() runs, Python passes r as self automatically. Inside greet, self.name reads the name stored on that instance, producing the greeting I am R2." },

{ id: "f4-039", cat: "oop", title: "Instance Method", desc: "An instance method is a function defined inside a class that operates on a specific instance. It always receives self as its first argument. Instance methods can read and modify instance attributes.", code: `class Calculator:
    def __init__(self, model):
        self.model = model

    def add(self, a, b):
        return a + b

calc = Calculator("Zen-100")
print(calc.add(2, 3))
print(calc.model)`, output: `5
Zen-100`, explain: "The add method receives self plus the two operands and returns their sum, so calc.add(2, 3) gives 5. The constructor stored the model Zen-100, which is printed from the instance attribute." },

{ id: "f4-040", cat: "oop", title: "Instance Attribute", desc: "Instance attributes are variables stored on a specific object, usually set in __init__. Each instance has its own independent copy, so changing one object's attribute does not affect others. They hold the per-object state of a class.", code: `class Car:
    def __init__(self, brand):
        self.brand = brand

c1 = Car("Pixel")
c2 = Car("Neon")
c2.brand = "Turbo"
print(c1.brand)
print(c2.brand)`, output: `Pixel
Turbo`, explain: "Both cars get their own brand attribute from the constructor. Reassigning c2.brand only changes that instance, so c1 keeps Pixel while c2 becomes Turbo." },

{ id: "f4-041", cat: "oop", title: "Class Attribute", desc: "A class attribute is a variable defined directly inside the class body, shared by all instances. It is accessed via the class name or through any instance. Class attributes suit values that all objects should share.", code: `class Player:
    team = "Zen Squad"

p1 = Player()
p2 = Player()
print(Player.team)
print(p1.team)
print(p2.team)`, output: `Zen Squad
Zen Squad
Zen Squad`, explain: "The team attribute lives on the class itself. Accessing it through the class or through either instance returns the same shared string, Zen Squad." },

{ id: "f4-042", cat: "oop", title: "Class Attribute vs Instance Attribute", desc: "Assigning a name on an instance creates an instance attribute that shadows the same-named class attribute for that object. The class attribute remains unchanged for the class and other instances. Python looks up instance attributes before class attributes.", code: `class Enemy:
    speed = 5

e1 = Enemy()
e2 = Enemy()
e1.speed = 10
print(e1.speed)
print(e2.speed)
print(Enemy.speed)`, output: `10
5
5`, explain: "e1.speed = 10 creates a new instance attribute on e1 only. e2 and the class still see the shared class value 5, demonstrating the shadowing behavior." },

{ id: "f4-043", cat: "oop", title: "classmethod", desc: "A classmethod receives the class itself as its first argument, conventionally named cls. It is decorated with @classmethod and can be called on the class or an instance. Classmethods are often used as alternative constructors.", code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, birth_year):
        return cls(name, 2026 - birth_year)

p = Person.from_birth_year("Zen", 1996)
print(p.name, p.age)`, output: `Zen 30`, explain: "The classmethod receives Person as cls instead of an instance. It computes the age from the birth year and calls cls(...) to build a new Person, yielding Zen with age 30." },

{ id: "f4-044", cat: "oop", title: "staticmethod", desc: "A staticmethod is a method that neither receives self nor cls, making it a plain function inside the class namespace. It is decorated with @staticmethod and is called through the class. Staticmethods group related utility functions with a class.", code: `class MathUtils:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathUtils.is_even(4))
print(MathUtils.is_even(7))`, output: `True
False`, explain: "is_even takes only n because it is a staticmethod with no implicit first argument. Calling MathUtils.is_even checks the modulo and returns True for 4 and False for 7." },

{ id: "f4-045", cat: "oop", title: "Property Getter", desc: "The @property decorator turns a method into a read-only attribute. Accessing the attribute name runs the method and returns its value. This hides computation behind a simple attribute syntax.", code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def diameter(self):
        return self.radius * 2

c = Circle(5)
print(c.diameter)`, output: `10`, explain: "The @property decorator makes diameter behave like an attribute, not a method. Reading c.diameter runs the getter, which multiplies the radius 5 by 2 and returns 10." },

{ id: "f4-046", cat: "oop", title: "Property Setter", desc: "A property setter is defined with @name.setter and runs when the attribute is assigned to. It can validate the new value before storing it. Setters keep attribute assignment syntax while adding logic.", code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

t = Temperature(25)
t.celsius = 30
print(t.celsius)`, output: `30`, explain: "The assignment t.celsius = 30 triggers the setter, which checks the value against absolute zero and then stores it in the private _celsius. The getter then reads it back and prints 30." },

{ id: "f4-047", cat: "oop", title: "Simple Inheritance", desc: "Inheritance lets a new class reuse the attributes and methods of an existing class. The child class lists the parent class in parentheses after its name. The child can add new functionality while inheriting everything from the parent.", code: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def fetch(self):
        return f"{self.name} fetches the ball"

d = Dog("Rex")
print(d.name)
print(d.fetch())`, output: `Rex
Rex fetches the ball`, explain: "Dog inherits Animal's constructor, so Dog(\"Rex\") stores the name. The extra fetch method is new to Dog and uses the inherited name attribute to produce the message." },

{ id: "f4-048", cat: "oop", title: "super()", desc: "The super function returns a proxy to the parent class, letting a child method call parent methods. It is most common inside __init__ to reuse the parent's setup. This avoids duplicating initialization code.", code: `class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")

c = Cat("Momo")
print(c.name)
print(c.sound)`, output: `Momo
Meow`, explain: "Cat's __init__ calls super().__init__ with the name and the fixed sound Meow. The parent constructor stores both attributes, and printing them shows Momo and Meow." },

{ id: "f4-049", cat: "oop", title: "Method Override", desc: "Method overriding is when a child class redefines a method that already exists in the parent. The child's version runs instead of the parent's for child instances. This lets subclasses customize behavior.", code: `class Animal:
    def speak(self):
        return "Some sound"

class Duck(Animal):
    def speak(self):
        return "Quack"

d = Duck()
print(d.speak())`, output: `Quack`, explain: "Duck redefines speak, overriding the parent's version. Calling d.speak() on the Duck instance executes the child method and returns Quack." },

{ id: "f4-050", cat: "oop", title: "Multiple Inheritance", desc: "Multiple inheritance allows a class to inherit from more than one parent class. The parents are listed inside the parentheses, separated by commas. The child then has access to methods from all its parents.", code: `class Swimmer:
    def swim(self):
        return "Swimming"

class Flyer:
    def fly(self):
        return "Flying"

class Duck(Swimmer, Flyer):
    pass

d = Duck()
print(d.swim())
print(d.fly())`, output: `Swimming
Flying`, explain: "Duck inherits from both Swimmer and Flyer. The instance d can call swim from the first parent and fly from the second, combining both sets of behavior." },

{ id: "f4-051", cat: "oop", title: "isinstance()", desc: "The isinstance function checks whether an object is an instance of a given class. It also returns True for subclasses, since inheritance creates an is-a relationship. The function returns a boolean.", code: `class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(isinstance(d, Dog))
print(isinstance(d, Animal))
print(isinstance(d, str))`, output: `True
True
False`, explain: "d is directly a Dog, so the first check is True. Because Dog inherits from Animal, d is also an instance of Animal. It is unrelated to str, so the last check is False." },

{ id: "f4-052", cat: "oop", title: "issubclass()", desc: "The issubclass function checks whether one class is derived from another. It returns True if the first argument is a subclass of the second. The order of the arguments matters.", code: `class Vehicle:
    pass

class Bike(Vehicle):
    pass

print(issubclass(Bike, Vehicle))
print(issubclass(Vehicle, Bike))`, output: `True
False`, explain: "Bike inherits from Vehicle, so the first call returns True. Vehicle is not a subclass of Bike, so the reversed call returns False." },

{ id: "f4-053", cat: "oop", title: "__str__", desc: "The __str__ method defines the friendly string representation shown to users, such as by print. It must return a string. Without it, print falls back to the default object representation.", code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(p)
print(str(p))`, output: `(3, 4)
(3, 4)`, explain: "Both print(p) and str(p) invoke the __str__ method. The method returns the nicely formatted string (3, 4), which appears twice in the output." },

{ id: "f4-054", cat: "oop", title: "__repr__", desc: "The __repr__ method defines the unambiguous representation of an object, used by the interpreter and repr(). It should ideally look like valid code that recreates the object. It is the fallback for print when __str__ is absent.", code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p = Point(1, 2)
print(repr(p))`, output: `Point(1, 2)`, explain: "Calling repr(p) triggers the __repr__ method, which builds the string Point(1, 2). The output is developer-oriented and echoes the constructor call." },

{ id: "f4-055", cat: "oop", title: "__eq__", desc: "The __eq__ method defines how the == operator compares two objects for equality. By default, objects compare by identity, but __eq__ lets you compare by value. It should return a boolean.", code: `class Money:
    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

a = Money(10)
b = Money(10)
c = Money(20)
print(a == b)
print(a == c)`, output: `True
False`, explain: "The __eq__ method compares the amount attributes. a and b both hold 10, so the comparison is True, while c holds 20, making a == c False." },

{ id: "f4-056", cat: "oop", title: "Operator Overload __add__", desc: "The __add__ method lets you define what the + operator does for your class. It receives the right-hand operand and should return a new object or value. This makes custom types behave like built-in ones.", code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)`, output: `Vector(4, 6)`, explain: "The expression v1 + v2 calls v1's __add__ with v2 as other. The components add element-wise to build Vector(4, 6), and __str__ formats it for printing." },

{ id: "f4-057", cat: "oop", title: "__len__", desc: "The __len__ method makes an object work with the built-in len() function. It must return a non-negative integer. It is often implemented by delegating to an underlying collection.", code: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)

pl = Playlist(["a", "b", "c"])
print(len(pl))`, output: `3`, explain: "Calling len(pl) invokes the __len__ method, which delegates to len(self.songs). The underlying list holds three songs, so 3 is returned." },

{ id: "f4-058", cat: "oop", title: "__iter__ / __next__ Custom Iterator", desc: "Defining __iter__ and __next__ makes a class work as an iterator for for loops. __iter__ returns the iterator object, and __next__ returns the next value or raises StopIteration when done. This customizes how iteration behaves.", code: `class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(3):
    print(n)`, output: `3
2
1`, explain: "The for loop calls __iter__ to get the object, then repeatedly calls __next__. Each call returns the decreasing count until the current value hits 0, when StopIteration ends the loop." },

{ id: "f4-059", cat: "oop", title: "Private Naming Convention (_name)", desc: "A single leading underscore signals that an attribute is internal to the class. It is only a convention, not real protection, and the attribute can still be accessed. Double underscores trigger name mangling for a stronger form of privacy.", code: `class Bank:
    def __init__(self):
        self._balance = 0

    def deposit(self, amount):
        self._balance += amount

b = Bank()
b.deposit(50)
print(b._balance)`, output: `50`, explain: "The attribute _balance is conventionally private, meaning you should treat it as internal. The deposit method modifies it through a controlled interface, and reading it directly still works since it is only a convention." },

{ id: "f4-060", cat: "oop", title: "dataclass", desc: "The @dataclass decorator from the dataclasses module auto-generates boilerplate like __init__, __repr__, and __eq__ from type annotations. Fields are declared as annotated class variables. This makes simple data containers compact and readable.", code: `from dataclasses import dataclass

@dataclass
class Hero:
    name: str
    level: int = 1

h = Hero("Zen")
print(h.name)
print(h.level)
print(h)`, output: `Zen
1
Hero(name='Zen', level=1)`, explain: "The decorator generates a constructor that takes name and an optional level defaulting to 1. It also provides __repr__, so printing h shows the readable form Hero(name='Zen', level=1)." },

{ id: "f4-061", cat: "oop", title: "Composition (has-a)", desc: "Composition models a has-a relationship where one object contains another object. A class can create or receive other objects as attributes. This builds complex behavior by combining simpler parts.", code: `class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()

    def drive(self):
        return "Car drives"

c = Car()
print(c.engine.start())
print(c.drive())`, output: `Engine started
Car drives`, explain: "The Car constructor creates an Engine and stores it in the engine attribute. The car calls engine.start() through composition, and its own drive method returns its message." },

{ id: "f4-062", cat: "oop", title: "Polymorphism via Duck Typing", desc: "Duck typing means an object's suitability is judged by its methods, not its declared type. If it quacks like a duck, it is a duck. Any object providing the required method can be passed to a function expecting it.", code: `def make_sound(thing):
    return thing.sound()

class Duck:
    def sound(self):
        return "Quack"

class Alarm:
    def sound(self):
        return "Beep"

print(make_sound(Duck()))
print(make_sound(Alarm()))`, output: `Quack
Beep`, explain: "make_sound only calls thing.sound(), never checking types. Both Duck and Alarm provide that method, so each object works and returns its own distinct sound." },

{ id: "f4-063", cat: "oop", title: "Animal Sound Example", desc: "This classic example shows inheritance and polymorphism together. Each subclass overrides the speak method with its own sound. A loop can call speak on different animals without knowing their exact type.", code: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"

for pet in [Dog(), Cat(), Animal()]:
    print(pet.speak())`, output: `Woof
Meow
...`, explain: "Each element in the list is a different animal class. Calling speak dispatches to each class's own override, so the loop prints Woof, Meow, and the base class's default sound." },

{ id: "f4-064", cat: "oop", title: "BankAccount Class", desc: "A BankAccount class bundles an owner, a balance, and operations like deposit and withdraw together. The withdraw method validates that enough money exists before allowing the transaction. This encapsulates money handling rules.", code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return "OK"

acc = BankAccount("Zen", 100)
print(acc.deposit(50))
print(acc.withdraw(200))
print(acc.balance)`, output: `None
Insufficient funds
150`, explain: "deposit returns nothing, so its print shows None. The 200 withdrawal exceeds the 150 balance, so withdraw returns Insufficient funds without changing anything. The final balance stays 150." },

{ id: "f4-065", cat: "oop", title: "Point Class", desc: "A Point class represents a position with x and y coordinates. Its methods can compute derived values from the coordinates. The Pythagorean theorem gives the distance from the origin.", code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p.distance_from_origin())`, output: `5.0`, explain: "The constructor stores the coordinates 3 and 4. distance_from_origin computes the square root of 3 squared plus 4 squared, which is the classic 3-4-5 triangle, returning 5.0." },

{ id: "f4-066", cat: "oop", title: "Counter Class", desc: "A Counter class tracks a running count with simple operations. increment and decrement adjust the stored value by one. The reset method restores the counter to zero.", code: `class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1

    def decrement(self):
        self.value -= 1

    def reset(self):
        self.value = 0

c = Counter()
c.increment()
c.increment()
c.decrement()
print(c.value)
c.reset()
print(c.value)`, output: `1
0`, explain: "Two increments raise the count to 2, then one decrement lowers it to 1, which is printed. The reset call sets the value back to 0 for the final print." },

{ id: "f4-067", cat: "oop", title: "Book Class", desc: "A Book class models a book's title, author, and page count. Its summary method formats those details into a readable sentence. This example shows methods that combine stored attributes.", code: `class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def summary(self):
        return f"{self.title} by {self.author}, {self.pages} pages"

book = Book("Zen Coding", "Pixel Master", 320)
print(book.summary())`, output: `Zen Coding by Pixel Master, 320 pages`, explain: "The constructor stores the three book details. Calling summary builds one f-string from all attributes, producing the complete sentence in a single line." },

{ id: "f4-068", cat: "oop", title: "Car Class", desc: "A Car class tracks brand, model, and current speed. accelerate increases speed by an amount, while brake stops the car completely. This models the state and actions of a vehicle.", code: `class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.speed = 0

    def accelerate(self, amount):
        self.speed += amount

    def brake(self):
        self.speed = 0

car = Car("Pixel", "Turbo X")
car.accelerate(60)
car.brake()
print(car.brand, car.model, car.speed)`, output: `Pixel Turbo X 0`, explain: "The car starts at speed 0. Accelerating by 60 would raise the speed, but brake resets it to 0, so the final print shows the brand, model, and a speed of 0." },

{ id: "f4-069", cat: "oop", title: "Stack Class", desc: "A Stack is a last-in, first-out data structure. push adds an item to the top, and pop removes and returns the top item. is_empty reports whether the stack has no items.", code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def is_empty(self):
        return len(self.items) == 0

s = Stack()
s.push("a")
s.push("b")
print(s.pop())
print(s.is_empty())
print(s.pop())
print(s.is_empty())`, output: `b
False
a
True`, explain: "After pushing a then b, pop returns b, the most recent item, while one item remains so is_empty is False. The second pop returns a, and the empty stack makes is_empty True." },

{ id: "f4-070", cat: "oop", title: "Employee Class", desc: "An Employee class stores a name and a monthly salary. Its methods compute the annual salary and apply a raise as a percentage. This demonstrates business logic living with the data.", code: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def annual_salary(self):
        return self.salary * 12

    def raise_salary(self, percent):
        self.salary += self.salary * percent / 100

e = Employee("Zen", 3000)
print(e.annual_salary())
e.raise_salary(10)
print(e.salary)`, output: `36000
3300.0`, explain: "annual_salary multiplies the monthly 3000 by 12 to get 36000. A 10 percent raise adds 300 to the salary, leaving 3300.0 after the floating-point calculation." },

{ id: "f4-071", cat: "modules", title: "import math", desc: "The import statement loads a module so its names become available under the module name. The math module provides many mathematical functions and constants. Functions are accessed with dot notation like math.sqrt.", code: `import math

print(math.sqrt(16))
print(math.floor(7.8))`, output: `4.0
7`, explain: "Importing math makes its contents available as math.<name>. math.sqrt(16) returns 4.0, and math.floor(7.8) rounds down to 7." },

{ id: "f4-072", cat: "modules", title: "from math import sqrt", desc: "The from-import syntax pulls specific names directly into the current namespace. You can then use the function without the module prefix. This is convenient but can risk name collisions.", code: `from math import sqrt

print(sqrt(81))
print(sqrt(2))`, output: `9.0
1.4142135623730951`, explain: "Only sqrt is imported, so it is called directly without a prefix. sqrt(81) gives 9.0, and sqrt(2) prints the full floating-point approximation." },

{ id: "f4-073", cat: "modules", title: "Import with Alias", desc: "The as keyword renames a module at import time, creating an alias. Short aliases make repeated calls more concise. The original module name is no longer available.", code: `import math as m

print(m.floor(3.7))
print(m.ceil(3.2))`, output: `3
4`, explain: "math is imported under the alias m, so calls use m.floor and m.ceil. floor rounds 3.7 down to 3, while ceil rounds 3.2 up to 4." },

{ id: "f4-074", cat: "modules", title: "Import Multiple Names", desc: "A single from-import statement can bring in several names at once by separating them with commas. Each imported name becomes directly usable. Parentheses are allowed for readability on long lists.", code: `from math import pi, sqrt

print(pi)
print(sqrt(2))`, output: `3.141592653589793
1.4142135623730951`, explain: "Both pi and sqrt are imported in one statement, so they are used without any prefix. pi prints its full value, and sqrt(2) prints the square root approximation." },

{ id: "f4-075", cat: "modules", title: "dir() on Module", desc: "The dir function lists all names defined in a module, including functions, classes, and constants. It returns a sorted list of strings. Checking membership in this list confirms whether a name exists.", code: `import math

names = dir(math)
print("ceil" in names)
print("not_a_real_name" in names)`, output: `True
False`, explain: "dir(math) returns the full list of math module names. The string ceil appears in that list, so the first check is True, while the made-up name is absent, making the second False." },

{ id: "f4-076", cat: "modules", title: "if __name__ == \"__main__\"", desc: "This guard runs code only when the script is executed directly, not when it is imported as a module. When run directly, Python sets __name__ to \"__main__\". When imported, __name__ becomes the module name instead.", code: `def main():
    print("Running main()")

if __name__ == "__main__":
    main()`, output: `Running main()`, explain: "Running this file directly sets __name__ to \"__main__\", so the condition is true and main() runs. If another file imported it, main would not execute automatically." },

{ id: "f4-077", cat: "modules", title: "import random", desc: "The random module generates pseudo-random numbers and offers random choices. The randint function returns a random integer between two inclusive bounds. Seeding with random.seed makes the output reproducible.", code: `import random

random.seed(1)
print(random.randint(1, 10))`, output: `2`, explain: "Setting the seed to 1 makes the generator produce a fixed, repeatable sequence. The first randint(1, 10) call therefore always returns 2, matching the seeded stream." },

{ id: "f4-078", cat: "modules", title: "import datetime", desc: "The datetime module provides classes for dates and times. A date object stores a year, month, and day with validation. Individual parts are read through attributes like year and month.", code: `import datetime

d = datetime.date(2026, 8, 18)
print(d.year)
print(d.month)
print(d.day)
print(d.strftime("%A"))`, output: `2026
8
18
Tuesday`, explain: "datetime.date builds a date from year, month, and day values. Reading d.year, d.month, and d.day prints the components, and strftime(\"%A\") formats the date as its weekday name, Tuesday." },

{ id: "f4-079", cat: "modules", title: "import json", desc: "The json module encodes and decodes JavaScript Object Notation data. The dumps function serializes Python objects into JSON strings. Python True becomes JSON true during conversion.", code: `import json

person = {"name": "Zen", "level": 5, "online": True}
print(json.dumps(person))`, output: `{"name": "Zen", "level": 5, "online": true}`, explain: "json.dumps converts the dictionary into a JSON string. Strings stay quoted, numbers stay numbers, and the boolean True becomes the lowercase JSON token true." },

{ id: "f4-080", cat: "modules", title: "Math Constants (pi, e)", desc: "The math module ships with common mathematical constants. math.pi is the ratio of a circle's circumference to its diameter. math.e is the base of natural logarithms, and both come with high precision.", code: `import math

print(round(math.pi, 3))
print(round(math.e, 3))`, output: `3.142
2.718`, explain: "math.pi and math.e hold full-precision floating-point values. The round function trims each constant to three decimal places, giving 3.142 and 2.718." },

{ id: "f4-081", cat: "errors", title: "try/except Basic", desc: "The try/except statement catches and handles runtime errors. Code that might fail goes in the try block, and the handling code goes in except. Even after an error is handled, execution continues below the block.", code: `try:
    result = 10 / 0
except:
    print("Something went wrong")

print("Program continues")`, output: `Something went wrong
Program continues`, explain: "Dividing by zero inside try raises a ZeroDivisionError. The bare except catches every exception and prints the message, then execution moves on to the final print." },

{ id: "f4-082", cat: "errors", title: "except Specific Exception (ValueError)", desc: "An except clause can name a specific exception class to catch only that kind of error. Converting a non-numeric string with int raises a ValueError. Specific handlers keep the error message in a variable with as.", code: `try:
    num = int("abc")
except ValueError as e:
    print("Caught ValueError:", e)`, output: `Caught ValueError: invalid literal for int() with base 10: 'abc'`, explain: "int(\"abc\") cannot be converted and raises ValueError. The matching except clause captures the exception as e, and printing e shows Python's built-in error message." },

{ id: "f4-083", cat: "errors", title: "Multiple Except Clauses", desc: "A try block can have several except clauses, each handling a different exception type. Python checks them in order and runs the first matching handler. Unmatched exceptions still propagate out of the block.", code: `def convert(value):
    return int(value)

try:
    convert("xyz")
except TypeError:
    print("Bad type")
except ValueError:
    print("Bad number")`, output: `Bad number`, explain: "convert(\"xyz\") raises a ValueError, not a TypeError. Python skips the TypeError clause, matches the ValueError clause, and prints Bad number." },

{ id: "f4-084", cat: "errors", title: "except with Tuple of Types", desc: "An except clause can list multiple exception types inside a tuple, catching any of them with one handler. This groups related errors that share the same response. The type of the actual error is still available.", code: `try:
    x = "5" + 5
except (ValueError, TypeError) as e:
    print("Caught:", type(e).__name__)`, output: `Caught: TypeError`, explain: "Adding a string and an integer raises TypeError, which is in the tuple (ValueError, TypeError). The handler prints the name of the real exception class via type(e).__name__." },

{ id: "f4-085", cat: "errors", title: "else Clause", desc: "The else clause runs only when the try block completes without any exception. It is placed after all except clauses. Using else keeps success-path code separate from error handling.", code: `try:
    value = int("42")
except ValueError:
    print("Conversion failed")
else:
    print("Success:", value)`, output: `Success: 42`, explain: "int(\"42\") converts without error, so the except clause is skipped. The else clause runs instead and prints the successfully converted value, 42." },

{ id: "f4-086", cat: "errors", title: "finally Clause", desc: "The finally clause always runs, whether the try block succeeds, fails, or returns early. It is the standard place for cleanup like closing resources. Even if an exception escapes, finally executes first.", code: `try:
    result = 10 // 2
    print("Result:", result)
finally:
    print("Cleanup always runs")`, output: `Result: 5
Cleanup always runs`, explain: "The try block computes 10 // 2 and prints 5 with no error. Regardless of that outcome, the finally block runs afterward and prints the cleanup message." },

{ id: "f4-087", cat: "errors", title: "raise", desc: "The raise statement deliberately throws an exception, stopping normal execution. It is used to signal invalid inputs or impossible states. The caller can catch it with try/except or let the program fail.", code: `def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

try:
    check_age(-5)
except ValueError as e:
    print("Caught:", e)`, output: `Caught: Age cannot be negative`, explain: "check_age receives -5 and raises ValueError with a custom message. The try/except block around the call catches it, and printing e displays the message from the raise." },

{ id: "f4-088", cat: "errors", title: "raise Custom Message", desc: "Raising a built-in exception with a string creates a custom message for that error. The message travels with the exception and is shown in tracebacks or accessible as the exception value. Messages should explain what went wrong.", code: `def connect():
    raise ConnectionError("No internet connection")

try:
    connect()
except ConnectionError as e:
    print("Error:", e)`, output: `Error: No internet connection`, explain: "connect raises ConnectionError carrying the descriptive message. The except clause catches it and prints the message, making the failure reason clear." },

{ id: "f4-089", cat: "errors", title: "Custom Exception Class", desc: "You can define your own exception classes by inheriting from Exception. Custom exceptions make error handling precise and domain-specific. A pass body is enough, since Exception provides all standard behavior.", code: `class LevelTooHighError(Exception):
    pass

def set_level(level):
    if level > 100:
        raise LevelTooHighError(f"Level {level} is too high")
    return level

try:
    set_level(150)
except LevelTooHighError as e:
    print("Caught custom error:", e)`, output: `Caught custom error: Level 150 is too high`, explain: "LevelTooHighError inherits everything from Exception. set_level(150) raises it with a formatted message, and the dedicated except clause catches exactly this custom type." },

{ id: "f4-090", cat: "errors", title: "ZeroDivisionError", desc: "ZeroDivisionError occurs when code divides by zero in Python. It also triggers on modulo by zero. The exception type can be caught specifically to give users a friendlier message.", code: `try:
    print(1 / 0)
except ZeroDivisionError:
    print("Cannot divide by zero")`, output: `Cannot divide by zero`, explain: "The expression 1 / 0 inside try raises ZeroDivisionError. The except clause for that exact type catches it and prints the friendly message instead of crashing." },

{ id: "f4-091", cat: "errors", title: "TypeError", desc: "TypeError is raised when an operation is applied to an incompatible type. Adding a string and an integer, for example, has no valid meaning. Catching it lets the program respond gracefully.", code: `try:
    text = "Zen" + 42
except TypeError as e:
    print("TypeError:", e)`, output: `TypeError: can only concatenate str (not "int") to str`, explain: "The + operator between a string and an integer is undefined, so Python raises TypeError. The except clause prints both the exception name and Python's explanatory message." },

{ id: "f4-092", cat: "errors", title: "KeyError", desc: "KeyError is raised when a dictionary lookup uses a key that does not exist. The missing key is the exception's value. The .get method is a common alternative that returns a default instead of raising.", code: `scores = {'Zen': 90}

try:
    print(scores["Ada"])
except KeyError:
    print("Key not found")`, output: `Key not found`, explain: "The dictionary only contains the key Zen. Accessing scores[\"Ada\"] raises KeyError, which the except clause catches and turns into the printed message Key not found." },

{ id: "f4-093", cat: "errors", title: "IndexError", desc: "IndexError occurs when a sequence is accessed at an index outside its range. Lists with fewer elements than the requested index trigger it. It is a subclass of LookupError.", code: `nums = [10, 20, 30]

try:
    print(nums[5])
except IndexError:
    print("Index out of range")`, output: `Index out of range`, explain: "The list has indices 0 through 2, so index 5 does not exist. Accessing nums[5] raises IndexError, and the except clause prints the friendly message." },

{ id: "f4-094", cat: "errors", title: "FileNotFoundError", desc: "FileNotFoundError is raised when an open() call targets a file that does not exist. It only occurs when opening in read mode or another mode that requires the file. Catching it lets you create the file or warn the user.", code: `try:
    with open("ghost.txt", "r") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found")`, output: `File not found`, explain: "Since ghost.txt does not exist, open in read mode raises FileNotFoundError. The except clause catches it before the with block can do anything, printing File not found." },

{ id: "f4-095", cat: "errors", title: "assert Statement", desc: "The assert statement checks a condition and raises AssertionError when it is False. An optional message after the comma is included in the error. Asserts document invariants and catch bugs during development.", code: `x = 5
assert x > 0, "x must be positive"
print("Assertion passed")`, output: `Assertion passed`, explain: "The condition x > 0 is true for x = 5, so the assert silently passes. Execution continues to the print statement, which confirms the assertion succeeded." },

{ id: "f4-096", cat: "errors", title: "try/finally Cleanup", desc: "A try/finally pair guarantees cleanup code runs even when an error occurs. The pattern is used to release resources manually instead of relying on with. finally executes before the exception propagates.", code: `def read_file(path):
    try:
        f = open(path, "r")
        return f.read()
    finally:
        print("File closed")

with open("temp.txt", "w") as w:
    w.write("data")

print(read_file("temp.txt"))`, output: `File closed
data`, explain: "Inside read_file, the finally block prints File closed before the function returns. The caller then prints the data read from the file, so the cleanup message appears first." },

{ id: "f4-097", cat: "errors", title: "Nested Try", desc: "Try blocks can be nested, with an inner block handling errors before the outer one ever sees them. If the inner except handles the error, the outer except is skipped. Nested tries allow fine-grained recovery at different levels.", code: `try:
    try:
        x = int("hello")
    except ValueError:
        print("Inner caught it")
    print("Still running")
except:
    print("Outer caught it")`, output: `Inner caught it
Still running`, explain: "int(\"hello\") raises ValueError inside the inner try, and the inner except handles it. Because the error is already handled, the outer except never runs and the program prints the continuing message." },

{ id: "f4-098", cat: "errors", title: "Catching Exception Broadly", desc: "Catching the base Exception class captures almost every error in one handler. The as e form exposes the actual exception object for inspection. Broad catching is convenient for logging, but specific handlers are preferred in production.", code: `try:
    result = [1, 2][10]
except Exception as e:
    print(type(e).__name__)`, output: `IndexError`, explain: "Indexing past the end of the list raises IndexError, which is a subclass of Exception. The broad handler catches it, and type(e).__name__ reveals the exact class name." },

{ id: "f4-099", cat: "errors", title: "Re-raising with raise", desc: "A bare raise inside an except clause re-raises the exact exception that was caught. This lets a handler do partial work, like logging, and then pass the error up unchanged. The outer level can catch it again.", code: `try:
    try:
        raise ValueError("boom")
    except ValueError:
        print("Inner handler, re-raising...")
        raise
except ValueError as e:
    print("Outer caught:", e)`, output: `Inner handler, re-raising...
Outer caught: boom`, explain: "The inner except prints its message and then re-raises with bare raise. The same ValueError propagates to the outer try, whose except catches it again and prints the message boom." },

{ id: "f4-100", cat: "errors", title: "Exception Ordering (Specific Before General)", desc: "Except clauses are checked top to bottom, so specific exceptions must come before their parent classes. If the general clause came first, it would catch everything and the specific one would be unreachable. ZeroDivisionError is a subclass of ArithmeticError, illustrating the ordering.", code: `def divide(a, b):
    return a / b

try:
    divide(10, 0)
except ZeroDivisionError:
    print("Specific handler")
except ArithmeticError:
    print("General handler")`, output: `Specific handler`, explain: "divide(10, 0) raises ZeroDivisionError. The first except clause matches it specifically, so the Specific handler message prints and the more general ArithmeticError clause is never reached." },

{ id: "f4-101", cat: "files", title: "open() Read Mode", desc: "The open function returns a file object, and the mode string \"r\" opens a file for reading. The read method reads the entire file as one string. Files are closed automatically when used inside a with block.", code: `with open('notes.txt', 'w') as f:
    f.write("line one\\nline two")

with open("notes.txt", "r") as f:
    content = f.read()

print(content)`, output: `line one
line two`, explain: "The first block writes the two-line file so the example runs anywhere. Opening it in \"r\" mode, read pulls the whole text into content, and print shows both lines exactly as stored." },

{ id: "f4-102", cat: "files", title: ".readline()", desc: "The readline method reads a single line from a file, including its trailing newline. Each call advances to the next line. Repeated calls walk through the file line by line.", code: `with open('lines.txt', 'w') as f:
    f.write("alpha\\nbeta\\ngamma")

with open("lines.txt", "r") as f:
    first = f.readline()
    second = f.readline()

print(first.strip())
print(second.strip())`, output: `alpha
beta`, explain: "Two calls to readline pull the first two lines into first and second. The strip method removes the newline characters so printing shows clean words, alpha and beta." },

{ id: "f4-103", cat: "files", title: ".readlines()", desc: "The readlines method reads all remaining lines and returns them as a list of strings. Each list element keeps its trailing newline. It is convenient when you want the whole file as a collection.", code: `with open('lines.txt', 'w') as f:
    f.write("one\\ntwo\\nthree")

with open("lines.txt", "r") as f:
    lines = f.readlines()

print(lines)`, output: `['one\\n', 'two\\n', 'three\\n']`, explain: "readlines returns the three lines as a list. Every element retains the newline character at the end, exactly as it appears when the list is printed." },

{ id: "f4-104", cat: "files", title: "Write Mode", desc: "Opening a file in \"w\" mode creates it for writing, or overwrites it completely if it already exists. The write method stores a string in the file. The file is flushed and closed when the with block ends.", code: `with open('greeting.txt', 'w') as f:
    f.write("Hello, Zen!")

with open("greeting.txt", "r") as f:
    print(f.read())`, output: `Hello, Zen!`, explain: "Write mode creates greeting.txt and stores the text Hello, Zen!. Reopening it in read mode and calling read returns the exact same string for printing." },

{ id: "f4-105", cat: "files", title: "Append Mode", desc: "Opening a file in \"a\" mode adds new content at the end instead of erasing existing data. If the file does not exist, append mode creates it. This is ideal for logs and growing records.", code: `with open('log.txt', 'w') as f:
    f.write("first\\n")

with open("log.txt", "a") as f:
    f.write("second\\n")

with open("log.txt", "r") as f:
    print(f.read())`, output: `first
second`, explain: "The first block writes first with a newline. The append-mode write adds second after it without deleting anything, and reading the file back shows both lines in order." },

{ id: "f4-106", cat: "files", title: "with Statement", desc: "The with statement manages file resources automatically, closing the file when the block ends. This happens even if an error occurs inside. The closed attribute confirms the file object is no longer open.", code: `with open('auto.txt', 'w') as f:
    f.write("data")

print("File closed:", f.closed)`, output: `File closed: True`, explain: "The with block writes the file and then automatically closes it at the block boundary. Checking f.closed afterward returns True, proving the resource was released." },

{ id: "f4-107", cat: "files", title: "Overwrite vs Append", desc: "Write mode always replaces the entire file, while append mode preserves existing content. Writing \"B\" over a file containing \"A\" leaves only B. Appending \"C\" after that produces BC. This distinction is crucial for safe file handling.", code: `with open('t.txt', 'w') as f:
    f.write("A")

with open("t.txt", "w") as f:
    f.write("B")

with open("t.txt", "r") as f:
    print("After write:", f.read())

with open("t.txt", "a") as f:
    f.write("C")

with open("t.txt", "r") as f:
    print("After append:", f.read())`, output: `After write: B
After append: BC`, explain: "The second write-mode open discards the original A and writes only B. Opening in append mode then adds C after the existing text, so the final content reads BC." },

{ id: "f4-108", cat: "files", title: "Binary Read", desc: "Opening a file in \"rb\" mode reads it as raw bytes rather than text. The read method returns a bytes object. Bytes are integer values from 0 to 255 that store any kind of data.", code: `with open('data.bin', 'wb') as f:
    f.write(bytes([72, 105, 33]))

with open("data.bin", "rb") as f:
    data = f.read()

print(data)`, output: `b'Hi!'`, explain: "Binary write stores the byte values 72, 105, 33, which encode the ASCII letters H, i, and !. Reading back in binary mode returns the bytes object b'Hi!'." },

{ id: "f4-109", cat: "files", title: ".seek() / .tell()", desc: "The tell method reports the current read position inside a file. The seek method moves the position to a given offset, allowing re-reading from any point. These methods enable random access within files.", code: `with open('seek.txt', 'w') as f:
    f.write("0123456789")

with open("seek.txt", "r") as f:
    print(f.tell())
    print(f.read(4))
    f.seek(0)
    print(f.read(2))`, output: `0
0123
01`, explain: "tell initially reports position 0, then read(4) consumes 0123. seek(0) rewinds to the start, and the final read(2) fetches 01 again from the beginning." },

{ id: "f4-110", cat: "files", title: "CSV Reader", desc: "The csv module reads comma-separated value files. csv.reader wraps a file object and yields each row as a list of strings. Every field is parsed as text, even numeric-looking values.", code: `import csv

with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age"])
    writer.writerow(["Zen", 25])

with open("people.csv", "r") as f:
    for row in csv.reader(f):
        print(row)`, output: `['name', 'age']
['Zen', '25']`, explain: "The setup block creates the CSV with a header and one data row. The reader then splits each line into a list, so the loop prints the header list and the data list, where 25 becomes the string '25'." },

{ id: "f4-111", cat: "files", title: "CSV Writer", desc: "The csv.writer writes lists as comma-separated rows into a file. Opening with newline=\"\" prevents unwanted extra blank lines. Each writerow call produces one line of comma-delimited fields.", code: `import csv

with open("scores.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Alice", 90])
    writer.writerow(["Bob", 85])

print("CSV written")

with open("scores.csv", "r") as f:
    print(f.read())`, output: `CSV written
Alice,90
Bob,85`, explain: "Each writerow writes one comma-separated line, producing Alice,90 and Bob,85. After confirming the write, reading the raw file shows the exact CSV contents." },

{ id: "f4-112", cat: "files", title: "json.dump", desc: "The json.dump function serializes a Python object and writes it directly to a file. It takes the data and the file object as arguments. This is the standard way to persist structured data.", code: `import json

data = {"name": "Zen", "score": 99}

with open("data.json", "w") as f:
    json.dump(data, f)

print("Saved to data.json")

with open("data.json", "r") as f:
    print(f.read())`, output: `Saved to data.json
{"name": "Zen", "score": 99}`, explain: "json.dump converts the dictionary to JSON and writes it into data.json. Reading the file back shows the stored JSON text, identical to the original dictionary's structure." },

{ id: "f4-113", cat: "files", title: "json.load", desc: "The json.load function reads a file containing JSON and parses it back into a Python object. It is the reverse of json.dump. The resulting dictionary behaves like any normal dictionary.", code: `import json

with open("data.json", "w") as f:
    json.dump({"player": "Pixel", "hp": 100}, f)

with open("data.json", "r") as f:
    saved = json.load(f)

print(saved["player"], saved["hp"])`, output: `Pixel 100`, explain: "The setup writes a JSON file with two keys. json.load parses the file back into a dictionary, and reading its keys prints the player name and hit points." },

{ id: "f4-114", cat: "files", title: "os.remove + os.rename + os.path.exists", desc: "The os module provides file-management functions. os.path.exists checks whether a path exists, os.rename moves or renames a file, and os.remove deletes it permanently. Combining them safely manages files on disk.", code: `import os

with open("old.txt", "w") as f:
    f.write("bye")

print("Exists:", os.path.exists("old.txt"))
os.rename("old.txt", "new.txt")
print("Old exists:", os.path.exists("old.txt"))
print("New exists:", os.path.exists("new.txt"))
os.remove("new.txt")
print("Gone:", os.path.exists("new.txt"))`, output: `Exists: True
Old exists: False
New exists: True
Gone: False`, explain: "The file starts existing, then rename moves it from old.txt to new.txt, flipping the existence checks. Finally os.remove deletes it, so the last check returns False." },

{ id: "f4-115", cat: "files", title: "pathlib.Path Usage", desc: "The pathlib module provides object-oriented paths. A Path object bundles operations like write_text, read_text, and exists into methods. Attributes like name expose parts of the path without string parsing.", code: `from pathlib import Path

p = Path("pixel.txt")
p.write_text("hello")
print(p.read_text())
print(p.exists())
print(p.name)`, output: `hello
True
pixel.txt`, explain: "Path(\"pixel.txt\") creates a path object, and write_text saves the text. read_text retrieves it, exists returns True since the file was just created, and name gives the file name." },

]);

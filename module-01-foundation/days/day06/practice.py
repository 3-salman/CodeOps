
from abc import ABC, abstractmethod


class ReportGenerator:
    def __init__(self ,title ,content):
        self.title=title
        self.content=content

    def generate(self):
        return f"=== {self.title} ===\n{self.content}"

class ReportSaver:
    def save_to_file(self, report_text , filename):
        with open(filename , "w") as f:
            f.write(report_text)
        print(f"[SRP] Report saved successfully to {filename}")
        
class ReportEmailer:
    def send_email(self , report_text , recipient):
        print(f"[SRP] Emailing report to {recipient}...\nBody:\n{report_text}")


gen=ReportGenerator("Financials", "Revenue: 50,000 ETB")
report_data=gen.generate()

saver=ReportSaver()
saver.save_to_file(report_data, "report.txt")

emailer=ReportEmailer()
emailer.send_email(report_data, "manager@addisbank.et")
print()


print(" Refactor to OCP")
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        area_of_Rectangle= self.width * self.height
        print(f"Rectangle Area:{area_of_Rectangle}")
        

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self) :
        area_of_Circle= 3.141 * (self.radius ** 2)
        print(f"Circle Area:{area_of_Circle}")
        

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        area_of_Triangle=0.5 * self.base * self.height
        print(f"Triangle Area:{area_of_Triangle}")


shapes=[ Rectangle(5,4),Circle(3), Triangle(6, 4)]
for s in shapes:
    s.area()
print()


print("checking Singleton ")
class AppSettings:
    _instance=None

    def __new__(cls):
        if cls._instance is None:
            cls._instance=super().__new__(cls)
            cls._instance.currency="ETB"
            cls._instance.theme="Dark"
        return cls._instance

settings1=AppSettings()
settings2 = AppSettings()

print(f"Settings 1 Currency: {settings1.currency}")
print(f"Settings 2 Currency: {settings2.currency}")

print(f"Are settings1 and settings2 the same object? {settings1 is settings2}")
print()


print("Factory")
class ShapeFactory:
    @staticmethod
    def create(Kind):
        Kind = Kind.strip().lower()
        if Kind == "circle":
            return Circle(5)
        elif Kind == "square":
            return Rectangle(4,4)
        elif Kind == "triangle":
            return Triangle(3, 8)
        else:
            raise ValueError(f"Unknown shape type: '{Kind}'")

s1 = ShapeFactory.create("circle")
s2 = ShapeFactory.create("square")
s3 = ShapeFactory.create("triangle")

print(f"Factory created: {s1.__class__.__name__} with area {s1.area()}")
print(f"Factory created: {s2.__class__.__name__} with area {s2.area()}")
print(f"Factory created: {s3.__class__.__name__} with area {s3.area()}")
print()


print("Observer pair")
class Observer(ABC):
    @abstractmethod
    def update(self, news):
        pass

class EmailSubscriber(Observer):
    def __init__(self, email):
        self.email = email

    def update(self, news):
        print(f"[Email to {self.email}] Breaking News: {news}")

class SMSSubscriber(Observer):
    def __init__(self, phone: str):
        self.phone = phone

    def update(self, news: str) -> None:
        print(f"[SMS to {self.phone}] Breaking News: {news}")


class NewsAgency:
    def __init__(self):
        self._subscribers = []

    def attach(self, observer):
        self._subscribers.append(observer)

    def detach(self, observer):
        self._subscribers.remove(observer)

    def notify(self, news):
        for subscriber in self._subscribers:
            subscriber.update(news)

agency= NewsAgency()

sub1 = EmailSubscriber("perez@gmail.com")
sub2 = SMSSubscriber("+251900000000")

agency.attach(sub1)
agency.attach(sub2)

agency.notify("Ethiopian Coffee exports reach record highs!")
+++
outputs = ["Reveal"]
weight = 3
+++

{{% section %}}

# Java 9

---

## JShell

- The Java Shell tool (JShell) is an interactive tool for learning the Java programming language and prototyping Java code.
- JShell is a Read-Evaluate-Print Loop (`REPL`), which evaluates declarations, statements, and expressions as they are entered and immediately shows the results.
- The tool is run from the command line.
- **Using JShell, you can enter program elements one at a time, immediately see the result, and make adjustments as needed.**
- You can use Java to write scripts!

---

## Modules
(Java 9 Platform Module System - `JPMS`)

> **Modularity adds a higher level of aggregation above `package`s.**

- The key new language element is the `module`:
  - a uniquely named, reusable group of related packages, as well as resources (such as images and XML files) and a module descriptor specifying.

---

## Private interface Methods

```java{}
public interface MyInterface {

    void normalInterfaceMethod();

    default void interfaceMethodWithDefault() {  init(); }

    default void anotherDefaultMethod() { init(); }

    // This method is not part of the public API exposed by MyInterface
    private void init() { System.out.println("Initializing"); }
    
    // This method is not part of the public API exposed by MyInterface
    private static void doSomething() { System.out.println("Doing Something!"); }
}
```

---

## Collection Factory Methods

```java{}

Set<Integer> ints = Set.of(1, 2, 3);
List<String> strings = List.of("first", "second");

```

---

## More Resources

- [9 new features in Java 9](https://www.pluralsight.com/blog/software-development/java-9-new-features)
- [Java 9 Features with Examples](https://www.journaldev.com/13121/java-9-features-with-examples#repl)
- [Java Platform, Standard Edition Java Shell User’s Guide](https://docs.oracle.com/javase/9/jshell/introduction-jshell.htm#JSHEL-GUID-630F27C8-1195-4989-9F6B-2C51D46F52C8)
- [Understanding Java 9 Modules](https://www.oracle.com/corporate/features/understanding-java-9-modules.html)
- [A Guide to Java 9 Modularity](https://www.baeldung.com/java-9-modularity)

{{% /section %}}

function multiplyByTwo(num: unknown) {
  /**
   * unknown throws an error until you decide what the type is unlike any
   */

  if (typeof num == "number") {
    // Narrow the type
    return num * 2;
  }
  return "Provide a number";
}

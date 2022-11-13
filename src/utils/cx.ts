const cx = (...classNames: string[] | any[]) => {
  return classNames
    .filter((className) => className)
    .map((className) => {
      if (typeof className === "string") {
        return className;
      }
      return Object.keys(className)
        .filter((key) => className[key])
        .join(" ");
    })
    .join(" ");
};

export { cx };

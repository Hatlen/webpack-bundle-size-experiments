class A {
  constructor(options) {
    this.state = options;
  }

  greet() {
    console.log(this.state.greeting);
  }
  superGreet = () => {
    console.log("==================");
    this.greet();
    console.log("==================");
  };
}

const a = new A({ greeting: "hej världen!" });
a.superGreet();

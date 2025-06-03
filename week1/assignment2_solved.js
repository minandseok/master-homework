// ## 2. 의도적인 메모리 누수 코드와 해결된 코드 구현
function createHeavyObject() {
  let heavyArray = new Array(1000000).fill("Data");

  return {
    useHeavy: () => {
      console.log("이 함수는 heavyArray를 계속 참조", heavyArray);
    },
    removeLeak: () => {
      heavyArray = null;
    },
  };
}

let leakyFunction = createHeavyObject();

leakyFunction.useHeavy();
leakyFunction.removeLeak();

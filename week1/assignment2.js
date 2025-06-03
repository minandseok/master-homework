// ## 2. 의도적인 메모리 누수 코드와 해결된 코드 구현
function createHeavyObject() {
  const heavyArray = new Array(1000000).fill("Data");

  return function () {
    console.log("이 함수는 heavyArray를 계속 참조", heavyArray);
  };
}

let leakyFunction = createHeavyObject(); // 이 이후로 heavyArray를 사용할 일이 없음. 하지만 메모리에 계속 남아 있음. -> 메모리 누수

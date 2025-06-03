# ⛱️ 1주차(5월 31일, 6월 1일 수업에 대한) 과제

## 1. 의도적인 데드락 코드와 해결된 코드 구현

### 문제

- 상황: 계좌 a와 b가 동시에 송금을 할 때의 데드락 발생 상황
  - 송금을 하기 위해선 송금을 당하는 계좌의 송금 과정이 완료되어야 함.
  - 만약 동시에 a가 b로 송금을 하고 있고, b도 a로 송금을 하고 있다면?

- 자바스크립트라 이렇게 강제로 b계좌가 송금 중이라고 설정했습니다.
```js
bAccount.transferring = true; // a가 b로 송금하는 동시에, b도 a로 송금하고 있음
```

- 만약 a에서 b로 송금하는데 a의 잔액이 부족해 송금 실패가 뜬다면 b에서 a로의 송금은 성공함.
```js
bAccount.transferring = true; // a가 b로 송금하는 동시에, b도 a로 송금하고 있음
(async () => {
  await Promise.all([
    aAccount.transferTo(bAccount, 1001), // a가 b로 송금
    bAccount.transferTo(aAccount, 50), // b가 a로 송금
  ]);
})();
```
```
잔액이 부족합니다.
송금에 실패했습니다.
b -> a: 50 송금 완료
a's balance = 1050
b's balance = 450
```

### 해결

- 계좌가 만들어진 시간 + 주민등록번호로 송금 우선순위 키를 구현
```js
this.ssn = ssn; // 주민등록번호
this.createdAt = Date.now();

this.priorityKey = BigInt(`${this.createdAt}${this.ssn}`); // 우선순위 키
```

- 우선순위 키로 동시에 송금이 발생할 때 순서 결정
```js
const [first, second] = [this, to].sort((a, b) => {
  return a.priorityKey < b.priorityKey ? -1 : 1;
});
```

## 2. 의도적인 메모리 누수 코드와 해결된 코드 구현

### 문제

- 상황: 어떤 객체의 요소를 사용하고 그 요소를 더 이상 사용할 일이 없지만, 그 요소는 메모리에 계속 남아있기 때문에, 메모리 누수가 발생한다.

### 해결

- 객체 내부 요소를 let로 하고 그 요소의 참조를 해제하는 메서드를 활용.
```js
removeLeak: () => {
  heavyArray = null;
},
```
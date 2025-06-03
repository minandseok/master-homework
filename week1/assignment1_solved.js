// ## 의도적인 데드락 코드와 해결된 코드 구현

// 계좌 만들기
class Account {
  constructor(balance = 0, name, ssn) {
    this.balance = balance;
    this.name = name;
    this.ssn = ssn; // 주민등록번호
    this.createdAt = Date.now();

    // 이 계좌는 송금을 받을 수 있는 상태인지 체크하는 프로미스
    this.readyPromise = new Promise((resolve) => {
      this._resolve = resolve;
    });

    this.transferring = false; // 송금 중 여부

    this.priorityKey = BigInt(`${this.createdAt}${this.ssn}`); // 우선순위 키
  }

  // 출금
  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    console.log("잔액이 부족합니다.");
    return false;
  }

  // 입금
  deposit(amount) {
    this.balance += amount;
  }

  // 잔액
  getBalance() {
    console.log(`${this.name}'s balance = ${this.balance}`);
  }

  // 송금
  async transferTo(to, amount) {
    this.transferring = true; // 송금 시작

    // 상대 계좌가 송금 중이라면
    if (to.transferring === true) {
      console.log(`${to.name}로 송금 대기중...`);
      // 우선순위 체크
      const [first, second] = [this, to].sort((a, b) => {
        return a.priorityKey < b.priorityKey ? -1 : 1;
      });

      // 우선순위 실행(상대 계좌의 송금 완료를 기다림, 현재 계좌가 더 높은 우선순위를 가짐)
      if (second === this) {
        await to.readyPromise;
      }
      console.log(`${to.name}로 송금 시작`);
    }

    // 잔액 체크
    const balanceCheck = this.withdraw(amount);
    if (balanceCheck === false) {
      console.log("송금에 실패했습니다.");
      return false;
    }

    to.deposit(amount); // 상대 계좌로 입금

    console.log(`${this.name} -> ${to.name}: ${amount} 송금 완료`);
    this.getBalance();
    this.transferring = false; // 송금 완료
    this._resolve(); // 프로미스 완료
  }
}

const aAccount = new Account(1000, "a", 9001011234567);
const bAccount = new Account(500, "b", 8505057654321);

bAccount.transferring = true; // a가 b로 송금하는 동시에, b도 a로 송금하고 있음
(async () => {
  await Promise.all([
    aAccount.transferTo(bAccount, 1000), // a가 b로 송금
    bAccount.transferTo(aAccount, 50), // b가 a로 송금
  ]);

  console.log("전체 잔액");
  aAccount.getBalance();
  bAccount.getBalance();
})();

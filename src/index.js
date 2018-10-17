// 게임판의 상태를 만들기

let boardState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

// 상태로부터 화면을 그리는 역할과 책임을 가지고 있는 함수! 화면을 그리는 것은 다 여기다!
function drawBoard() {
  // 게임판에 1이 적혀있으면 그것은 X표시!
  // 일단, board안에 있는 모든 row들을 선택해보자
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    // 이렇게 사용하면 rowEl의 자식 요소들에서 찾는다.
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      // 중첩루프나 마찬가지인 것으로, 보드스테이트의 요소들을 지정
      if (boardState[rowIndex][colIndex] === 1) {
        colEl.classList.add("checked");
      } else {
        colEl.classList.remove("checked");
      }
    });
  });

  if (bingo(boardState)) {
    document.querySelector(".result").textContent = "빙고!";
    document.querySelector(".reset").classList.add("show");
  } else {
    document.querySelector(".result").textContent = "";
    document.querySelector(".reset").classList.remove("show");
  }
}

// 빙고 체크 로직
function bingo(arr) {
  // 가로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[i][j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  // 세로줄 확인 (루프)
  for (let i = 0; i < 5; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][i] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  {
    // 대각선 확인 (루프)
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  {
    // 반대쪽 대각선 확인 (루프)
    let checked = true;
    for (let j = 0; j < 5; j++) {
      if (arr[j][4 - j] === 0) {
        checked = false;
      }
    }
    if (checked) {
      return true;
    }
  }

  return false;
}

document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
      // 빙고라면 더 이상 클릭이 되면 안된다!
      if (!bingo(boardState)) {
        boardState[rowIndex][colIndex] = 1;
        drawBoard();
      }
    });
  });
});

// 다시 시작 버튼 - 이벤트리스너는 바깥에 생성해주자!
document.querySelector(".reset").addEventListener("click", e => {
  // 상태를 초기화 한 다음에 다시 그려준다!
  // alert("!!!!");
  boardState = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  drawBoard();
});

// 함수를 호출했을 때!! boardState의 상태에서 그려지게!
drawBoard();

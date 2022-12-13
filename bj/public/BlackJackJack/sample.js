
var currentProvider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(currentProvider);
let tokenAddress = "0xE387cC87AC9ec21A223420A535a6Db30b9989E19";
let walletAddress = "0x1E07f4b714733fC8a8F4D64CBDfE35aE0C9F5978";
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

const contract = new web3.eth.Contract(minABI,tokenAddress);

// 引数にウォレットのアドレスを渡して、balanceOf 関数を呼ぶ
//const [balance, setBalance] = React.useState(0);
async function print(){
const balance = await contract.methods.balanceOf(walletAddress).call();
console.log(balance)
  //setBalance(balance / 10 ** 18);
}
print();
// カードの山（配列）
let cards = [];

// 自分のカード（配列）
let myCards = [];

// 相手のカード（配列）
let comCards = [];

// 勝敗決定フラグ（論理型）
let isGameOver = false;

let resetNum = 0;

let money = 0;

let userNum = 0;

let latchFlag = false;

let myFields = document.querySelectorAll(".myCard");
let comFields = document.querySelectorAll(".comCard");
const btn = document.getElementById("btn");
const myToken = document.getElementById("myToken");
const latch = document.getElementById("guessField");
const disLatch = document.getElementById("decLatch");
const test = document.getElementById("test");

/***********************************************
  イベントハンドラの割り当て
************************************************/

window.addEventListener("load", loadHandler);

// 「カードを引く」ボタンを押したとき実行する関数を登録
document.querySelector("#pick").addEventListener("click", clickPickHandler);

// 「勝負する！」ボタンを押したとき実行する関数を登録
document.querySelector("#judge").addEventListener("click", clickJudgeHandler);

// 「もう1回遊ぶ」ボタンを押したとき実行する関数を登録
document.querySelector("#reset").addEventListener("click", clickResetHandler);

/***********************************************
  イベントハンドラ
************************************************/

if (resetNum === 0){
  money = balance;
}
myToken.textContent = "持ち金：" + money + "チップ";
latch.focus();

btn.addEventListener("click", () => {
  if(latchFlag == false){
    userNum = Number(latch.value);
    if(userNum>0 && userNum<=money){
      disLatch.textContent = "掛け金：" + userNum + "チップ";
      latch.value = "";
      latchFlag = true;
      updateView();
    } else if(userNum === 0){
      alert("掛け金を入力してください");
      latch.value = "";
    } else if(userNum > money){
      alert("持ち金の範囲で掛け金を入力してください");
      latch.value = "";
    }
  } else{
    alert("掛け金の変更はできません");
  }
});

// ページの読み込みが完了したとき実行する関数
function loadHandler() {
  if (resetNum === 0){
    money = balance;
  }
  myToken.textContent = "持ち金：" + money + "チップ";
  latch.focus();
  // シャッフル
  shuffle();
  // 自分がカードを引く
  pickMyCard();
  // 相手がカードを引く
  pickComCard();
  // 自分がカードを引く
  pickMyCard();
  // 相手がカードを引く
  pickComCard();
  // 画面を更新する
  updateView();
}

// 「カードを引く」ボタンを押したとき実行する関数
function clickPickHandler() {
  // 勝敗が未決定の場合
  if (isGameOver == false && latchFlag == true) {
    // 自分がカードを引く
    pickMyCard();
    // 相手がカードを引く
    pickComCard();
    // 画面を更新する
    updateView();
    // 自分の合計が21を超えた場合、勝敗判定に移る
    if (getTotal(myCards) > 21) {
      clickJudgeHandler();
    }
  }
}

// 「勝負する！」ボタンを押したとき実行する関数
function clickJudgeHandler() {
  let result = "";
  // 勝敗が未決定の場合
  if (isGameOver == false && latchFlag == true) {
    // 画面を更新する（相手のカードを表示する）
    updateView(true);
    comFields[0].setAttribute('src', getCardPath(comCards[0]));
    // 勝敗を判定する
    result = judge();
    // 1秒後に勝敗を画面に表示する
    setTimeout(showResult, 1000, result);
    // 勝敗決定フラグを「決定」に変更
    isGameOver = true;
  }
}

// 「もう1回遊ぶ」ボタンを押したとき実行する関数
function clickResetHandler() {
  // 画面を初期表示に戻す
  // reloadメソッドでページを再読み込みする
  if(isGameOver == true && latchFlag == true){
    cards = [];
    myCards = [];
    comCards = [];
    isGameOver = false;
    resetNum++;
    disLatch.textContent = "";
    latchFlag = false;
    disLatch.textContent = "";

    for (let i = 0; i < myFields.length; i++) {
        myFields[i].src = "";
    }
    // 相手のカードを表示する
    for (let i = 0; i < comFields.length; i++) {
        comFields[i].src = "";
    }

    loadHandler()
  }
}

/***********************************************
  ゲーム関数
************************************************/

// カードの山をシャッフルする関数
function shuffle() {
  // カードの初期化
  for (let i = 1; i <= 52; i++) {
    cards.push(i);
  }
  // 100回繰り返す
  for (let i = 0; i < 100; i++) {
    // カードの山からランダムに選んだ2枚を入れ替える
    let j = Math.floor(Math.random() * 52);
    let k = Math.floor(Math.random() * 52);
    let temp = cards[j];
    cards[j] = cards[k];
    cards[k] = temp;
  }
}

// 自分がカードを引く関数
function pickMyCard() {
  // 自分のカードの枚数が4枚以下の場合
  if ( myCards.length <= 4 ) {
    // カードの山（配列）から1枚取り出す
    let card = cards.pop();
    // 取り出した1枚を自分のカード（配列）に追加する
    myCards.push(card);
  }
}

// 相手がカードを引く関数
function pickComCard() {
  // 相手のカードの枚数が4枚以下の場合
  // カードを引くかどうか考える
  while ( pickAI(comCards) && comCards.length <= 4 ) {
    // カードの山（配列）から1枚取り出す
    let card = cards.pop();
    // 取り出した1枚を相手のカード（配列）に追加する
    comCards.push(card);
  }
}

// カードを引くかどうか考える関数
function pickAI(handCards) {

  // 現在のカードの合計を求める
  let total = getTotal(handCards);
  // カードを引くかどうか
  let isPick = false;

  // 合計が16以下なら「引く」
  if (total <= 16) {
    isPick = true;
  }
  // 合計が17以上なら「引かない」
  else {
    isPick = false;
  }
  // 引くか引かないかを戻り値で返す
  return isPick;
}

// カードの合計を計算する関数
function getTotal(handCards) {
  let total = 0;    // 計算した合計を入れる変数
  let number = 0;   // カードの数字を入れる変数
  for (let i = 0; i < handCards.length; i++) {
    // 13で割った余りを求める
    number = handCards[i] % 13;
    // J,Q,K（余りが11,12,0）のカードは10と数える
    if (number == 11 || number == 12 || number == 0) {
      total += 10;
    } else {
      total += number;
    }
  }
  // 「A」のカードを含んでいる場合
  if (handCards.includes(1) || handCards.includes(14) || handCards.includes(27) || handCards.includes(40)) {
    // 「A」を11と数えても合計が21を超えなければ11と数える
    if (total + 10 <= 21) {
      total += 10;
    }
  }
  // 合計を返す
  return total;
}

// 画面の表示を更新する関数
function updateView(showComCards = false) {
  if (latchFlag == true){
    for (let i = 0; i < myFields.length; i++) {
      // 自分のカードの枚数がiより大きい場合
      if (i < myCards.length) {
        // 表面の画像を表示する
        myFields[i].src = getCardPath(myCards[i]);
      } else {
        // 裏面の画像を表示する
        myFields[i].src = "";
      }
    }
    // 相手のカードを表示する
    for (let i = 0; i < comFields.length; i++) {
      // 相手のカードの枚数がiより大きい場合
      if (i == 0 || (i < comCards.length && showComCards == true)) {
        comFields[i].src = "red.png";
      } else if (i == 1 || (i < comCards.length && showComCards == true)) {
        // 表面の画像を表示する
        comFields[i].src = getCardPath(comCards[i]);
      } else {
        // 裏面の画像を表示する
        comFields[i].src = "";
      }
    }
  } else if(latchFlag == false){
    for (let i = 0; i < myFields.length; i++) {
      if (i < myCards.length) {
        myFields[i].src = "blue.png";
      }
    }
    for (let i = 0; i < comFields.length; i++) {
      if (i === 0 || i === 1) {
        comFields[i].src = "red.png";
      }
    }
  }
  // 自分のカードを表示する

  // カードの合計を再計算する
  if(latchFlag == true){
    document.querySelector("#myTotal").innerText = getTotal(myCards);
    if (showComCards == true) {
      document.querySelector("#comTotal").innerText = getTotal(comCards);
    } else if(showComCards == false){
      document.querySelector("#comTotal").innerText = '';
    }
  } else {
    document.querySelector("#myTotal").innerText = "";
  }

}

// カードの画像パスを求める関数
function getCardPath(card) {
  // カードのパスを入れる変数
  let path = "";
  // カードの数字が1桁なら先頭にゼロをつける
  if (card <= 9) {
    path = "0" + card + ".png";
  } else {
    path = card + ".png";
  }
  // カードのパスを返す
  return path;
}

// 勝敗を判定する関数
function judge() {
  // 勝敗をあらわす変数
  let result = "";
  // 自分のカードの合計を求める
  let myTotal = getTotal(myCards);
  // 相手のカードの合計を求める
  let comTotal = getTotal(comCards);

  let copy = money;
  // 勝敗のパターン表に当てはめて勝敗を決める
  if (myTotal > 21 && comTotal <= 21) {
    // 自分の合計が21を超えていれば負け
    result = "loose";
    money -= userNum;
  }
  else if (myTotal <= 21 && comTotal > 21) {
    // 相手の合計が21を超えていれば勝ち
    result = "win";
    money += userNum * 2;
  }
  else if (myTotal > 21 && comTotal > 21) {
    // 自分も相手も21を超えていれば負け
    result = "loose";
    money -= userNum;
  }
  else {
    // 自分も相手も21を超えていない場合
    if (myTotal > comTotal) {
      // 自分の合計が相手の合計より大きければ勝ち
      result = "win";
      money += userNum * 2;
    } else if (myTotal < comTotal) {
      // 自分の合計が相手の合計より小さければ負け
      result = "loose";
      money -= userNum;
    } else {
      // 自分の合計が相手の合計と同じなら負け
      result = "loose";
      money -= userNum;
    }
  }
  myToken.textContent = "持ち金：" + money + "チップ";
  if(copy < money){
    disLatch.textContent = userNum * 2 +"チップ獲得しました";
  } else {
    disLatch.textContent = userNum +"チップ無くなりました";
  }
  // 勝敗を呼び出し元に返す
  return result;
}

// 勝敗を画面に表示する関数
function showResult(result) {
  // メッセージを入れる変数
  let message = "";
  // 勝敗に応じてメッセージを決める
  switch (result) {
    case "win":
      message = "あなたの勝ちです！";
      break;
    case "loose":
      message = "あなたの負けです！";
      break;
    case "draw":
      message = "引き分けです！";
      break;
  }
  // メッセージを表示する
  alert(message);
}

/***********************************************
  デバッグ関数
************************************************/

// グローバル変数をコンソールに出力する関数
function debug() {
  console.log("カードの山", cards);
  console.log("自分のカード", myCards, "合計" + getTotal(myCards));
  console.log("相手のカード", comCards, "合計" + getTotal(comCards));
  console.log("勝敗決定フラグ", isGameOver);
}

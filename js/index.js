fetch('data.json')
  .then(function (res) {
    return res.json()
  })
  .then(function (obj) {
    할일(obj)
  })

function 할일(obj) {
  const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
      let group = el[key]

      if (carry[group] === undefined) {
        carry[group] = []
      }

      carry[group].push(el)
      return carry
    }, {})
  }

  // console.log(obj)
  let historyList = groupBy(obj, 'date')
  console.log('historyList')
  console.log(historyList)

  const historyEl = document.querySelector('.history-scroll')
  const historyDayEl = document.querySelector('.history-day')

  for (const [key, value] of Object.entries(historyList)) {
    totalPayment(key, value)
  }

  //오늘, 총 지출 설정하는 함수
  function totalPayment(key, val) {
    const total = totalAmount(val)
    const moneyWrapEl = document.createElement('div') //.day-money-wrap
    moneyWrapEl.classList.add('day-money-wrap')

    const useWrapEl = document.createElement('div') //.day-use__wrap
    useWrapEl.classList.add('day-use__wrap')

    const dayEl = document.createElement('p') //p.day
    dayEl.classList.add('day')
    dayEl.textContent = key

    const daySpenEl = document.createElement('p') //p.day-spen
    daySpenEl.classList.add('day-spen')
    daySpenEl.textContent = Number(total).toLocaleString() + '원 지출'

    useWrapEl.appendChild(dayEl) //명세
    useWrapEl.appendChild(daySpenEl) //금액
    moneyWrapEl.appendChild(useWrapEl) //명세+금액
    moneyWrapEl.appendChild(dayList(val)) //명세+금액

    historyDayEl.appendChild(moneyWrapEl) //명세+금액+리스트
  }

  //총 지출 계산 함수
  function totalAmount(value) {
    var ans = 0
    value.map((ele) => {
      if (ele['inOut'] === 'out') {
        ans += ele['price']
      }
    })
    return ans
  }

  //일별 이력 설정하는 함수
  function dayList(value) {
    const ulElem = document.createElement('ul')
    ulElem.classList.add('money-history')

    for (let i = 0; i < value.length; i++) {
      //li만들기
      const li = document.createElement('li')
      li.classList.add('history__list')

      // item 값 가져오기
      // li에 item 값 넣기
      const pItem = document.createElement('p')
      pItem.classList.add('item')
      pItem.textContent = value[i].item

      const pPrice = document.createElement('p')
      pPrice.classList.add('price')
      if (value[i].price === null) {
        pPrice.textContent = 0
      } else {
        if (value[i].inOut === 'in') {
          pPrice.textContent = '+' + value[i].price
          pPrice.classList.add('in')
        } else {
          pPrice.textContent = value[i].price
        }
      }
      // ul에 li붙이기
      li.appendChild(pItem)
      li.appendChild(pPrice)
      ulElem.appendChild(li)
    }

    return ulElem
  }
}

//////////////////////////////////////////
//click Event

// let drageable = false
// let currentY = 0
const dragBtn = document.querySelector('.drag-btn')
const historyScroll = document.querySelector('.history-scroll')
let clicked = false
// const initYEl = document.querySelector('.initY')
// const firstYEl = document.querySelector('.firstY')

let historywrap = document.getElementById('history-wrap'),
  //   // initX,
  initY,
  //   // firstX,
  firstY

dragBtn.addEventListener('mousedown', function (e) {
  // console.log(e.currentY)
  clicked = !clicked
  if (clicked) {
    historywrap.style.top = '90px'
    historyScroll.style.height = '62vh'
  } else {
    historywrap.style.top = '350px'
    historyScroll.style.height = '27vh'
  }
})

//getGraph()
function getGraph() {
  console.log('graph')
  const chartEl = document.querySelector('.hidden')
  chartEl.style.transform = 'translateY(-753px)'
}
//getGraph()
function getClose() {
  console.log('close')
  const chartEl = document.querySelector('.hidden')
  chartEl.style.transform = 'translateY(0px)'
}

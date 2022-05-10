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
//drag Event

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
    historyScroll.style.height = '36vw'
  } else {
    historywrap.style.top = '350px'
    historyScroll.style.height = '19vw'
  }
})

// dragBtn.addEventListener(
//   'mousedown',
//   function (e) {
//     e.preventDefault()

//     // //최대값과 최소값
//     // if (e.clientY < 90) {
//     //   return
//     // }
//     // if (e.clientY > 350) {
//     //   return
//     // }

//     // initX = object.offsetLeft
//     initY = historywrap.offsetTop
//     // firstX = e.pageX
//     firstY = e.pageY

//     historywrap.addEventListener('mousemove', dragIt, false)

//     window.addEventListener(
//       'mouseup',
//       function () {
//         historywrap.removeEventListener('mousemove', dragIt, false)
//       },
//       false
//     )
//   },
//   false
// )

// object.addEventListener(
//   'touchstart',
//   function (e) {
//     e.preventDefault()
//     initX = object.offsetLeft
//     initY = object.offsetTop
//     var touch = e.touches
//     firstX = touch[0].pageX
//     firstY = touch[0].pageY

//     object.addEventListener('touchmove', swipeIt, false)

//     window.addEventListener(
//       'touchend',
//       function (e) {
//         e.preventDefault()
//         object.removeEventListener('touchmove', swipeIt, false)
//       },
//       false
//     )
//   },
//   false
// )

// function dragIt(e) {
//   initYEl.textContent = initY
//   firstYEl.textContent = firstY
//   // this.style.left = initX + e.pageX - firstX + 'px'
//   historywrap.style.top = initY + e.pageY - firstY + 'px'
//   console.log(historywrap.style.top)
// }

// // function swipeIt(e) {
// //   var contact = e.touches
// //   // this.style.left = initX + contact[0].pageX - firstX + 'px'
// //   historywrap.style.top = initY + contact[0].pageY - firstY + 'px'
// // }

// function checkboundary() {
//   // let outer = slider.getBoundingClientRect()
//   // let inner = innerSlider.getBoundingClientRect()

//   if (parseInt(historywrap.offsetTop) > 250) {
//     historywrap.style.top = '350px'
//   } else if (parseInt(historywrap.offsetTop) < 200) {
//     historywrap.style.top = '90px'
//   }
// }

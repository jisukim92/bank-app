fetch('data.json')
  .then(function (res) {
    return res.json()
  })
  .then(function (obj) {
    setLineGraph(obj)
    setDoughnutGraph(obj)
  })

function setLineGraph(obj) {
  const bankList = obj['bankList'] //.filter((e, i) => i < 10)

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

  let groupByBankList = groupBy(obj, 'date') //날짜 별 그룹
  console.log('groupByBankList')
  console.log(groupByBankList)

  let labels = []
  let totalOut = []
  for (const [key, value] of Object.entries(groupByBankList)) {
    // console.log(key)
    // console.log(new Date(key).getDate())
    labels.push(('00' + new Date(key).getDate()).slice(-2))
    totalOut.push(totalAmount(value))
  }
  // console.log(labels)
  // console.log(totalOut)

  const data = {
    labels: labels,
    datasets: [
      {
        label: '일간 리포트',
        data: totalOut,
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgb(75, 192, 192)'],
        borderWidth: 1,
      },
      {
        label: '선 그래프',
        data: totalOut,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgb(54, 162, 235)',
        type: 'line',
        order: 0,
      },
    ],
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }

  const lineBarChart = new Chart(
    document.getElementById('lineBarChart'),
    config
  )
}

function setDoughnutGraph(obj) {
  const currentMonth = new Date().getMonth() + 1
  const patternTitle = document.querySelector('.pattern_title')
  patternTitle.textContent = `${currentMonth}월 지출 패턴`
  const bankList = obj.filter((e, i) => {
    if (
      new Date(e['date']).getMonth() + 1 === new Date().getMonth() + 1 &&
      e['inOut'] === 'out'
    ) {
      return e
    }
  })
  console.log(bankList)
  // console.log(new Date(obj[0]['date']).getMonth() + 1)

  const groupBy = function (data, key) {
    return data.reduce(function (carry, el) {
      let group = el[key] || 'others'
      // console.log('group')
      // console.log(group)

      if (carry[group] === undefined) {
        carry[group] = []
      }

      carry[group].push(el)
      return carry
    }, {})
  }

  let groupByBankList = groupBy(bankList, 'type') //타입 별 그룹
  console.log('groupByBankList')
  console.log(groupByBankList)

  let doughnutLabels = []
  let totalOut = []
  for (const [key, value] of Object.entries(groupByBankList)) {
    console.log(key)
    // console.log(new Date(key).getDate())
    doughnutLabels.push(key)
    totalOut.push(totalAmount(value))
  }
  console.log(doughnutLabels)
  console.log(totalOut)

  const data = {
    labels: doughnutLabels,
    datasets: [
      {
        label: 'My First Dataset',
        data: totalOut,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  const config = {
    type: 'doughnut',
    data: data,
  }

  const doughnutChart = new Chart(
    document.getElementById('doughnutChart'),
    config
  )

  const typeListEl = document.querySelector('.type_list > ul')
  doughnutLabels.map((e, i) => {
    const liEl = document.createElement('li')
    const divTypeInfo = document.createElement('div')
    divTypeInfo.classList.add('type_info')
    const divEl1 = document.createElement('div')
    // const imgEl = document.createElement('img')
    divEl1.classList.add('type_img')
    if (e === 'eatout') {
      var img = new Image()
      img.src = '../img/eatout.svg'
      divEl1.appendChild(img)
    } else if (e === 'transport') {
      var img = new Image()
      img.src = '../img/transport.svg'
      divEl1.appendChild(img)
    } else if (e === 'shopping') {
      var img = new Image()
      img.src = '../img/shopping.svg'
      divEl1.appendChild(img)
    }

    const divEl2 = document.createElement('div')
    divEl2.classList.add('type_text')
    divEl2.textContent = e

    const divEl3 = document.createElement('div')
    divEl3.classList.add('type_amount')
    divEl3.textContent = Number(totalOut[i]).toLocaleString() + '원'

    divTypeInfo.appendChild(divEl1)
    divTypeInfo.appendChild(divEl2)
    liEl.appendChild(divTypeInfo)
    liEl.appendChild(divEl3)
    typeListEl.appendChild(liEl)
  })
}

function getdate(val) {}
//총 지출 계산 함수
function totalAmount(value) {
  console.log(value)
  var ans = 0
  value.map((ele) => {
    if (ele['inOut'] === 'out') {
      ans += ele['price']
    }
  })
  return ans
}

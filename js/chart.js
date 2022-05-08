fetch('bank.json')
  .then(function (res) {
    return res.json()
  })
  .then(function (obj) {
    setGraph(obj)
  })

function setGraph(obj) {
  const bankList = obj['bankList'] //.filter((e, i) => i < 10)
  console.log(bankList[0])
  console.log(new Date(bankList[0]['date']).getMonth() + 1)

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

  let groupByBankList = groupBy(bankList, 'date')
  console.log('groupByBankList')
  console.log(groupByBankList)

  let labels = []
  let totalOut = []
  for (const [key, value] of Object.entries(groupByBankList)) {
    console.log(key)
    console.log(new Date(key).getDate())
    labels.push(('00' + new Date(key).getDate()).slice(-2))
    totalOut.push(totalAmount(value))
  }
  console.log(labels)
  console.log(totalOut)

  const data = {
    labels: labels,
    datasets: [
      {
        label: '일간 리포트',
        data: totalOut,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
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

  const myChart = new Chart(document.getElementById('myChart'), config)
}

function getdate(val) {}
//총 지출 계산 함수
function totalAmount(value) {
  var ans = 0
  value.map((ele) => {
    if (ele['income'] === 'out') {
      ans += ele['price']
    }
  })
  return ans
}

// 数据
const dataTep = [
    {
        id: 0,
        code: 'ST20200508210344',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '13443'
    },
    {
        id: 1,
        code: 'ST20200508210004',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '45344'
    },
    {
        id: 2,
        code: 'ST20200508210003',
        supplier: '公司一',
        supplierId: 1,
        type: 0,
        date: '2020-05-01',
        amount: '234'
    },
    {
        id: 3,
        code: 'ST20200508210404',
        supplier: '公司一',
        supplierId: 1,
        type: 0,
        date: '2020-05-01',
        amount: '5334'
    },
    {
        id: 4,
        code: 'ST20200508770004',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '3442'
    },
    {
        id: 5,
        code: 'ST20200508210994',
        supplier: '公司二',
        supplierId: 2,
        type: 2,
        date: '2020-05-01',
        amount: '3445'
    },
    {
        id: 6,
        code: 'ST20200508210022',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-05-01',
        amount: '3445'
    },
    {
        id: 7,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-01',
        amount: '84897'
    },
    {
        id: 8,
        code: 'ST20200508210005',
        supplier: '公司二',
        supplierId: 2,
        type: 2,
        date: '2020-05-01',
        amount: '34566'
    },
    {
        id: 9,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-05-01',
        amount: '34534'
    },
    {
        id: 10,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-01',
        amount: '12344'
    },
    {
        id: 11,
        code: 'ST20200508210004',
        supplier: '公司一',
        supplierId: 1,
        type: 2,
        date: '2020-05-01',
        amount: '32212'
    },
    {
        id: 12,
        code: 'ST20200508210004',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '233'
    },
    {
        id: 13,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-01',
        amount: '3423'
    },
    {
        id: 14,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-01',
        amount: '45334'
    },
    {
        id: 15,
        code: 'ST20200508210004',
        supplier: '公司一',
        supplierId: 1,
        type: 2,
        date: '2020-05-01',
        amount: '234445'
    },
    {
        id: 16,
        code: 'ST20200508212304',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '324432'
    },
    {
        id: 17,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-05-01',
        amount: '32443'
    },
    {
        id: 18,
        code: 'ST20200508210104',
        supplier: '公司一',
        supplierId: 1,
        type: 0,
        date: '2020-05-01',
        amount: '213'
    },
    {
        id: 19,
        code: 'ST20200508213604',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '2342'
    },
    {
        id: 20,
        code: 'ST20200508213204',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-02-01',
        amount: '345353'
    },
    {
        id: 21,
        code: 'ST20200508223004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-12',
        amount: '34534'
    },
    {
        id: 22,
        code: 'ST20200508210074',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-05-01',
        amount: '12243'
    },
    {
        id: 23,
        code: 'ST20200504510004',
        supplier: '公司二',
        supplierId: 2,
        type: 1,
        date: '2020-05-01',
        amount: '5436'
    },
    {
        id: 24,
        code: 'ST20200508510004',
        supplier: '公司二',
        supplierId: 2,
        type: 2,
        date: '2020-05-01',
        amount: '13442'
    },
    {
        id: 25,
        code: 'ST20200508210004',
        supplier: '公司二',
        supplierId: 2,
        type: 0,
        date: '2020-05-01',
        amount: '23422'
    },
    {
        id: 26,
        code: 'ST20200458210004',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-21',
        amount: '3345'
    },
    {
        id: 27,
        code: 'ST20200508210655',
        supplier: '公司一',
        supplierId: 1,
        type: 1,
        date: '2020-05-01',
        amount: '2346'
    },
    {
        id: 28,
        code: 'ST20200508210064',
        supplier: '公司一',
        supplierId: 1,
        type: 2,
        date: '2020-05-03',
        amount: '344245'
    },
]
// 模拟字典
const dict = [
    {
        key: 0,
        value: '待结算'
    },
    {
        key: 1,
        value: '已付款'
    },
    {
        key: 2,
        value: '结算中'
    },
]
const supplierArr=[
    {
        id: 1,
        value: '公司一'
    },{
        id: 2,
        value: '公司二'
    },
]
export {dataTep, dict,supplierArr}


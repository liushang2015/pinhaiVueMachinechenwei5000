<template>
    <div id="app">
        <div class="box">
            <div class="search">
                <el-form :model="searchForm" label-position="right" label-width="120px" ref="searchForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="编码：">
                                <el-input v-model="searchForm.code" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="供应商：">
                                <el-select v-model="searchForm.supplierId" placeholder="请选择供应商" size="small">
                                    <el-option v-for="item in supplierArr" :key="item.id" :label="item.value"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="结算日期：">
                                <el-date-picker
                                        size="small"
                                        v-model="searchForm.date"
                                        type="daterange"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3" style="margin-top: 5px;">
                            <el-button
                                    type="primary"
                                    size="small">
                                查询
                            </el-button>
                            <el-button
                                    size="small">
                                重置
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="table">
                <div class="title">
                    <el-button
                            type="primary"
                            icon="el-icon-circle-plus"
                            @click="add"
                            size="small">
                        新增
                    </el-button>
                    <el-button
                            type="danger"
                            icon="el-icon-delete-solid"
                            size="small"
                            @click="removeBatch"
                    >
                        批量删除
                    </el-button>
                </div>
                <el-table
                        height="600"
                        :data="tableData"
                        stripe
                        border
                        size="small"
                        show-summary
                        :summary-method="getSummaries"
                        @selection-change="selectionChange"
                        style="width: 1200px">
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column
                            prop="code"
                            label="结算编码"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="supplier"
                            label="供货商"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="状态">
                        <template slot-scope="scope">
                            <el-tag size="small" :type="transSty(scope.row.type)">{{dictTrans(scope.row.type)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="结算总额">
                        <template slot-scope="scope">
                            <p>{{'¥ ' + toThousands(scope.row.amount,2) }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    class="icon-btn"
                                    type="primary"
                                    icon="el-icon-edit"
                                    @click="operate(scope.row)"
                                    size="small">
                            </el-button>
                            <el-button
                                    class="icon-btn"
                                    type="danger"
                                    @click="removeOpen(scope.row)"
                                    icon="el-icon-delete-solid"
                                    size="small">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        @size-change="sizeChange"
                        @current-change="currentChange"
                        :current-page="currentPage"
                        :page-sizes="[20, 50, 100]"
                        :page-size="defaultPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="dialogFormVisible" width="600px" center>
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="结算编码：" prop="code">
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="供应商：" prop="supplierId">
                            <el-select v-model="form.supplierId" placeholder="请选择供应商">
                                <el-option v-for="item in supplierArr" :key="item.id" :label="item.value"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="状态：" prop="type">
                            <el-select v-model="form.type" placeholder="请选择供应商">
                                <el-option v-for="item in dict" :key="item.key" :label="item.value"
                                           :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="日期：" prop="date">
                            <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="form.date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="金额：" prop="amount">
                            <el-input v-model="form.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {dataTep, dict, supplierArr} from './data'
    import {toThousands, clearMerge} from './utils'

    const formDataTep = {
        supplier: '',
        supplierId: '',
        code: '',
        date: '',
        amount: '',
        type: '',
    }
    export default {
        name: 'app',
        data() {
            let validateAmount = (rule, value, callback) => {
                let rat = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                if (value === '') {
                    callback(new Error('请输入金额'));
                    return false
                }
                if (!rat.test(value)) {
                    callback(new Error('请输入正确金额'));
                    return false
                }
                callback();
            }
            let validateCode = (rule, value, callback) => {
                let rat = /^[0-9]*$/;
                if (value === '') {
                    callback(new Error('请填写结算编码'));
                    return false
                }
                if (!rat.test(value)) {
                    callback(new Error('请输入正确结算编码'));
                    return false
                }
                callback();
            }
            return {
                dict,
                supplierArr,
                toThousands,
                id: null,
                defaultPageSize: 20,
                currentPage: 1,
                data: _.cloneDeep(dataTep),
                tableData: [],
                checkArr: [],
                total: 0,
                formLabelWidth: '100',
                dialogFormVisible: false,
                operateType: false,
                form: {
                    supplier: '',
                    supplierId: '',
                    code: '',
                    date: '',
                    amount: '',
                    type: '',
                },
                searchForm: {
                    code: '',
                    supplierId: '',
                    data: '',
                },
                rules: {
                    code: [
                        {required: true, message: '请填写结算编码', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'}
                    ],
                    supplierId: [
                        {required: true, message: '请选择供应商', trigger: 'change'},
                    ],
                    type: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ],
                    date: [
                        {required: true, message: '请选择日期', trigger: 'change'},
                    ],
                    amount: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        {validator: validateAmount, trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.getInfo(1)
        },
        methods: {
            getInfo(currentPage = 1) {
                let list = _.cloneDeep(this.data)
                this.tableData = list.slice((currentPage - 1) * this.defaultPageSize, currentPage * this.defaultPageSize)
                //    总页数
                this.total = list.length
            },
            currentChange(page) {
                this.currentPage = page
                this.getInfo(page)
            },
            sizeChange(size) {
                this.defaultPageSize = size
                this.getInfo()
            },
            // 模拟数据字典转换至
            dictTrans(id) {
                return _.result(_.find(dict, {key: id}), 'value')
            },
            // 根据id 变换样式
            transSty(id) {
                if (id === 0) {
                    return null
                }
                if (id === 1) {
                    return 'info'
                }
                if (id === 2) {
                    return 'warning'
                }
            },
            // 储存多选数据
            selectionChange(arr) {
                this.checkArr = arr
            },
            // 刪除
            remove(row) {
                let list = _.cloneDeep(this.data),
                    index = _.findIndex(list, {id: row.id})
                list.splice(index, 1)
                this.data = list
                if (this.tableData.length > 1) {
                    this.getInfo(this.currentPage)
                } else {
                    this.getInfo(this.currentPage - 1)
                }
                this.$message({
                    message: '成功',
                    type: 'success'
                });
            },
            // 批量删除验证
            removeBatch() {
                if(this.checkArr.length < 1) {
                    this.$message({
                        type: 'warning',
                        message: '请选择删除数据'
                    });
                    return
                }
                this.removeOpen(undefined, 'batch')
            },
            //批量删除
            removeList(){
                let arr = _.cloneDeep(this.data)
                _.forEach(this.checkArr, item => {
                    let index = _.findIndex(arr, {id: item.id})
                    arr.splice(index, 1)
                })
                this.data = arr
                if ((this.data.length / this.defaultPageSize) > this.currentPage - 1) {
                    this.getInfo(this.currentPage)
                } else {
                    this.getInfo(this.currentPage - 1)
                }
            },
            removeOpen(row, type) {
                this.$confirm('请确认是否删除', {
                    cancelButtonText: '否',
                    confirmButtonText: '是',
                    center: true
                }).then(() => {
                    if(type === 'batch'){
                        this.removeList()
                    }else{
                        this.remove(row)
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 修改
            operate(row) {
                this.form = clearMerge(row, this.form)
                this.id = row.id
                this.dialogFormVisible = true
                this.operateType = true
            },
            add() {
                this.dialogFormVisible = true
                this.operateType = false
            },
            operateData() {
                let arr = _.cloneDeep(this.data),
                    index = _.findIndex(arr, {id: this.id}),
                    form = _.cloneDeep(this.form)
                form.supplier = _.result(_.find(supplierArr, {id: this.form.supplierId}), 'value')
                form.id = this.id
                arr[index] = form
                this.data = arr
                this.cleanForm()
                this.getInfo(this.currentPage)
            },
            // 新增数据
            addData() {
                let arr = _.cloneDeep(this.data),
                    form = _.cloneDeep(this.form)
                form.id = arr.length + 1
                form.supplier = _.result(_.find(supplierArr, {id: form.supplierId}), 'value')
                arr.unshift(form)
                this.data = arr
                this.$refs['form'].resetFields()
                this.getInfo(1)
            },
            // 取消
            cancel() {
                this.dialogFormVisible = false
                this.cleanForm()
            },
            // 清空表单
            cleanForm() {
                this.form = _.cloneDeep(formDataTep)
                this.$refs['form'].resetFields()
            },
            // 弹窗保存
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 修改
                        if (!this.operateType) {
                            this.addData()
                        } else {
                            this.operateData()
                        }
                        this.cleanForm()
                        this.dialogFormVisible = false
                        this.operateType = false
                        this.$message({
                            message: '成功',
                            type: 'success'
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 合计
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                _.forEach(columns, (column, index) => {
                    if (index === 1) {
                        sums[index] = '合计：' + data.length + ' 行';
                        return;
                    }
                    if (index === 5) {
                        const values = data.map(item => item[column.property]);
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return Number(prev) + Number(curr);
                                } else {
                                    return Number(prev);
                                }
                            }, 0);
                            sums[index] = '¥' + toThousands(sums[index], 2);
                        } else {
                            sums[index] = 'N/A';
                        }
                    }
                });
                return sums;
            },
        }
    }
</script>

<style>
    @import './style/index.css';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

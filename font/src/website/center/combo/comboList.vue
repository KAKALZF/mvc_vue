<template>
    <div id="comboList">
        <div>
                <el-button type="primary" @click="delClick" icon="el-icon-search">点击</el-button>
        </div>
        <!--表格-->
        <el-table :data="tableData" border height="500px" max-height="500px">
            <el-table-column prop="id" label="编号" align="center"/>
            <el-table-column prop="openid" label="用户" align="center"/>
            <el-table-column prop="replycontent" label="接收的内容" align="center"/>
            <el-table-column prop="sendcontent" label="恢复内容" align="center"/>
            <el-table-column prop="type" label="消息类型" align="center"/>
        </el-table>
        <!--翻页-->
        <!--      <div>
                  <pageHelper :current-page="currentPage" :total="total" @sizeChange="handleSizeChange"
                              @currentChange="handleCurrentChange" class="my_pagenation"></pageHelper>
              </div>-->

        <loading v-if="loading"></loading>
    </div>
</template>

<script>
    import axios from 'axios';
    import pageHelper from '@/website/center/common/pageHelper';
    import {timeFormat} from '@/module/tools';
    import {getMonthStartDate} from '@/module/dateUtil';
    import {Loading} from 'element-ui';

    export default {
        name: 'comboList',
        components: {pageHelper, Loading},
        data() {
            return {
                currentPage: 2,
                total: 120,
                tableData: [{
                    id: '黑皮40G',
                    openid: '12132',
                    replycontent: '月套餐',
                    sendcontent: '当月有效',
                    type: '40G'
                }]
            };
        },
        methods: {
            delClick() {
                axios.post(
                    API_PATH + "/message_list.do",
                    {
                        page: 10,
                        row: 20,
                    }
                ).then(
                    res => {
                        console.debug(res);
                    },
                );
            }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .express-ctr-item {
        margin-top: 12px;
    }

    .express-ctr-item .express-ctr-label {
        display: inline-block;
        width: 100px;
        text-align: right;
        line-height: 32px;
    }

    .my-input {
        width: 40%;
    }

    .my_el_form input {
        width: 200px;
    }

</style>


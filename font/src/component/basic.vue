<template>
    <div>
        <el-form :model="basic" class="demo-form-inline">
            <el-form-item label="公司账号:">
                <span>{{ basic.account }}</span>
            </el-form-item>
            <el-form-item label="公司名称:">
                <span>{{ basic.companyName }}</span>
            </el-form-item>
            <el-form-item label="公司纳税号:">
                <span>{{ basic.companyId }}</span>
            </el-form-item>
            <el-form-item label="公司法人:">
                <span>{{ basic.corporation }}</span>
            </el-form-item>
            <el-form-item label="法人身份证:">
                <span>{{ basic.idCard }}</span>
            </el-form-item>
            <el-form-item label="营业执照:">
                <img :src="basic.business_url">
            </el-form-item>
            <el-form-item label="身份证正面:">
                <img :src="basic.idCard_up_url">
            </el-form-item>
            <el-form-item label="身份证反面:">
                <img :src="basic.idCard_down_url">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="showModifyPassword">修改密码</el-button>
                <el-button v-if="basic.status == 0" type="primary" @click="showDialog">去实名</el-button>
                <el-button v-else type="primary" disabled="true">已实名</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="修改密码" :visible.sync="dialogVisible1" width="500px">
            <template>
                <el-form ref="form" :model="change" label-width="100px">
                    <el-form-item label="账户:">
                        <span>{{ change.account }}</span>
                    </el-form-item>
                    <el-form-item label="原密码:">
                        <el-input v-model="change.oldPassword" placeholder="请输入原密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:">
                        <el-input v-model="change.newPassword" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="modifyPassword">确定</el-button>
                        <el-button @click="closeDialog1">取消</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>

        <el-dialog title="账户信息" :visible.sync="dialogVisible" width="800px">
            <template>
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="账户:">
                        <el-input v-model="form.account" placeholder="请输入账户"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称:">
                        <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="公司纳税号:">
                        <el-input v-model="form.companyId" placeholder="请输入纳税号"></el-input>
                    </el-form-item>
                    <el-form-item label="法人:">
                        <el-input v-model="form.corporation" placeholder="请输入法人"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证:">
                        <el-input v-model="form.idCard" placeholder="请输入法人身份证"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照:">
                        <image-file-input v-model="form.business_name" :img-url.sync="form.business_url"></image-file-input>
                    </el-form-item>
                    <el-form-item label="身份证正面:">
                        <image-file-input v-model="form.idCard_up_name" :img-url.sync="form.idCard_up_url"></image-file-input>
                    </el-form-item>
                    <el-form-item label="身份证反面:">
                        <image-file-input v-model="form.idCard_down_name" :img-url.sync="form.idCard_down_url"></image-file-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                        <el-button @click="closeDialog">取消</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>

    </div>

</template>

<script>
    import axios from 'axios';
    import {mytips} from "../module/tools";
    import ImageFileInput from "./imageFileInput";

    export default {
        name: 'basicMessage',
        components: {ImageFileInput},
        data() {
            return {
                basic: {
                    account: '',
                    password: '',
                    companyName: '',
                    companyId: '',
                    corporation: '',
                    idCard: '',
                    status: 0,
                    business_url: 'http://hfbimg.wukongcz.com/366019153533840444450c5bf64d2a4c.jpg',
                    business_name: '啦啦啦',
                    idCard_up_url: 'http://hfbimg.wukongcz.com/366019153533840444450c5bf64d2a4c.jpg',
                    idCard_up_name: '我是',
                    idCard_down_url: 'http://hfbimg.wukongcz.com/7196091535594976484宝宝.jpg',
                    idCard_down_name: '你爹'
                },
                change: {
                    account: '',
                    oldPassword: '',
                    newPassword: ''
                },
                form: {
                    account: '',
                    companyName: '',
                    companyId: '',
                    corporation: '',
                    idCard: '',
                    business_url: '',
                    business_name: '',
                    idCard_up_url: '',
                    idCard_up_name: '',
                    idCard_down_url: '',
                    idCard_down_name: ''
                },
                dialogVisible: false,
                dialogVisible1: false
            };
        },
        mounted() {
            this.getBasic();
        },
        methods: {

            getBasic() {
                axios.get(
                    API_PATH + '/user'
                ).then(res => {
                    if (res.data.code == 0) {
                        //todo
                    }
                })
            },

            showDialog() {
              this.dialogVisible = true;
              this.form.account = this.basic.account;
              this.form.companyName = this.basic.companyName;
              this.form.companyId = this.basic.companyId;
              this.form.corporation = this.basic.corporation;
              this.form.idCard = this.basic.idCard;
              this.form.business_name = this.basic.business_name;
              this.form.business_url = this.basic.business_url;
              this.form.idCard_up_url = this.basic.idCard_up_url;
              this.form.idCard_up_name = this.basic.idCard_up_name;
              this.form.idCard_down_url = this.basic.idCard_down_url;
              this.form.idCard_down_name = this.basic.idCard_down_name;
            },
            //表单
            onSubmit() {
                axios.post(
                    API_PATH + '/am/upload',
                    {
                        account: this.form.account,
                        companyName: this.form.companyName,
                        companyId: this.form.companyId,
                        business_name: this.form.business_name,
                        business_url: this.form.business_url,
                        idCard_up_url: this.form.idCard_up_url,
                        idCard_up_name: this.form.idCard_up_name,
                        idCard_down_url: this.form.idCard_down_url,
                        idCard_down_name: this.form.idCard_down_name
                    }
                ).then(res => {
                    if (res.data.code == 0) {
                        mytips('上传成功');
                    }
                })
            },
            //关闭实名信息框
            closeDialog() {
                this.dialogVisible = false;
                this.form.account = '';
                this.form.companyName = '';
                this.form.companyId = '';
                this.form.corporation = '';
                this.form.idCard = '';
            },
            //修改密码框
            showModifyPassword() {
                this.dialogVisible1 = true;
                this.change.account = this.basic.account;
            },
            //修改密码
            modifyPassword() {
                if (!this.change.oldPassword) {
                    mytips('请输入旧密码');
                    return false;
                }
                if (!this.change.newPassword) {
                    mytips('请输入新密码');
                    return false;
                }
                if (this.change.oldPassword != this.basic.password) {
                    mytips('旧密码输入错误!!!');
                    return false;
                }
                axios.post(
                    API_PATH + '/modify',
                    {
                        account: this.change.account,
                        oldPassword: this.change.oldPassword,
                        newPassword: this.change.newPassword
                    }
                ).then(res => {
                    if (res.data.code == 0) {
                        mytips('修改成功');

                    }
                })
            },
            //关闭修改密码框
            closeDialog1() {
                this.dialogVisible1 = false;
                this.change.account = '';
                this.change.oldPassword = '';
                this.change.newPassword = '';
            },
        }
    };

</script>

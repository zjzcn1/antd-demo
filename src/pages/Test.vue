<template>
    <section style="padding: 32px 16px">
        <!--查询栏-->
        <a-form class="query-bar">
            <a-row type="flex" justify="space-around">
                <a-col :span="7">
                    <a-form-item label="ID:" :label-col="{span: 6}">
                        <a-input v-model="queryParams.id" clearable placeholder="ID"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item label="应用ID:" :label-col="{span: 6}">
                        <a-input v-model="queryParams.appId" clearable placeholder="应用ID"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item label="场景名:" :label-col="{span: 6}">
                        <a-input v-model="queryParams.name" clearable placeholder="场景名"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row type="flex" justify="space-around">
                <a-col :span="7">
                    <a-form-item label="场景编码:" :label-col="{span: 6}">
                        <a-input v-model="queryParams.code" clearable placeholder="场景编码"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item label="场景描述:" :label-col="{span: 6}">
                        <a-input v-model="queryParams.description" clearable placeholder="场景描述"></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="7">
                    <a-form-item style="float: right">
                        <a-button @click="queryList(1)" style="margin-right: 24px">查询</a-button>
                        <a-button type="primary" @click="showCreate">创建</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <!--列表-->
        <a-table :data-source="dataList"
                 :columns="columnList"
                 :row-key="record => record.login.uuid"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
            <template #operation="{ record }">
                <a-button type="link" @click="showUpdate(record)">修改</a-button>
                <a-divider direction="vertical"></a-divider>
                <a-popconfirm
                        title="确定删除吗？"
                        @confirm="submitDelete(record)">
                    <a-button type="link">删除</a-button>
                </a-popconfirm>
            </template>
        </a-table>

        <!--创建对话框-->
        <a-modal title="创建" v-model:visible="createFormVisible" @ok="submitCreate">
            <a-form :model="createForm" labal-width="120px" :rules="createFormRules" ref="createForm"
                    style="width: 80%">
                <a-form-item label="应用ID" prop="appId">
                    <a-input v-model="createForm.appId" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景名" prop="name">
                    <a-input v-model="createForm.name" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景编码" prop="code">
                    <a-input v-model="createForm.code" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景描述" prop="description">
                    <a-input v-model="createForm.description" clearable></a-input>
                </a-form-item>
            </a-form>
        </a-modal>

        <!--修改对话框-->
        <a-modal title="修改" v-model:visible="updateFormVisible" @ok="submitUpdate">
            <a-form :model="updateForm" laba-width="120px" :rules="updateFormRules" ref="updateForm" style="width: 80%">
                <a-form-item label="应用ID" prop="appId">
                    <a-input v-model="updateForm.appId" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景名" prop="name">
                    <a-input v-model="updateForm.name" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景编码" prop="code">
                    <a-input v-model="updateForm.code" clearable></a-input>
                </a-form-item>
                <a-form-item label="场景描述" prop="description">
                    <a-input v-model="updateForm.description" clearable></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
    </section>
</template>

<script>
  import webapi from '@/common/webapi';
  import axios from 'axios';

  const queryData = params => {
    return axios.get('https://randomuser.me/api', { params: params });
  };

  export default {
    data() {
      return {
        queryParams: {},
        dataList: [],
        columnList: [
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '20%',
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
              { text: 'Male', value: 'male' },
              { text: 'Female', value: 'female' },
            ],
            width: '20%',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
        ],
        pagination: {},
        loading: false,
        
        createFormVisible: false,
        createForm: {},
        createFormRules: {
          appId: [
            {required: true, message: '请输入应用ID', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入场景名', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入场景编码', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入场景描述', trigger: 'blur'},
          ],
        },

        updateFormVisible: false,
        updateForm: {},
        updateFormRules: {
          appId: [
            {required: true, message: '请输入应用ID', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入场景名', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入场景编码', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入场景描述', trigger: 'blur'},
          ],
        }
      }
    },
    mounted() {
      this.fetch();
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {
        this.loading = true;
        queryData({
          results: 10,
          ...params,
        }).then(({ data }) => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.loading = false;
          this.dataList = data.results;
          this.pagination = pagination;
        });
      },
      queryList(page) {
        if (page) {
          this.page = page;
        }
        let params = {
          size: this.size,
          page: this.page,
          params: this.queryParams
        };
        webapi.pageAbScene(params).then(
          res => {
            this.dataList = res.data.data.list;
            this.total = res.data.data.total;
          }
        );
      },
      showCreate() {
        this.createFormVisible = true;
        this.createForm = {};
      },
      submitCreate() {
        this.$refs.createForm.validate((valid) => {
          if (valid) {
            webapi.createAbScene(this.createForm).then(
              () => {
                this.createFormVisible = false;
                this.queryList();
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
              }
            );
          }
        });
      },
      showUpdate(record) {
        this.updateFormVisible = true;
        this.updateForm = Object.assign({}, record);
      },
      submitUpdate() {
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            webapi.updateAbScene(this.updateForm).then(
              () => {
                this.updateFormVisible = false;
                this.queryList();
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success'
                });
              }
            );
          }
        });
      },
      submitDelete(record) {
        webapi.deleteAbScene(record.id).then(
          () => {
            this.queryList();
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          }
        );
      }
    }
  }
</script>

<style scoped lang="less">

</style>

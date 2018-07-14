<template>
	<div>
		<el-dialog title="参数设置" v-model="settings.visible" size="small">
			<div>
				<h2>显示/隐藏列</h2>
				<el-checkbox v-for="col in table.columns" v-model="col.visible" :key="col.id" :label="col.prop">{{col.label}}</el-checkbox>
			</div>
		</el-dialog>
		<el-dialog :title="actionName" v-model="dialog.visible" size="small">
			<el-form ref="form" :model="form" :rules="rules" :label-width="dialog.formLabelWidth">
				<el-form-item label="编号" prop="id">
					<el-input v-model="form.id" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓" prop="first_name">
					<el-input v-model="form.first_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="名" prop="last_name">
					<el-input v-model="form.last_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电子邮箱" prop="email">
					<el-input v-model="form.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Ip地址" prop="ip_address">
					<el-input v-model="form.ip_address" auto-complete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-select v-model="form.gender" placeholder="请选择性别">
						<el-option label="男" value="Male"></el-option>
						<el-option label="女" value="Female"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancelButton">取 消</el-button>
				<el-button type="primary" @click="handleOkButton">确 定</el-button>
			</div>
		</el-dialog>
		<toolstrip @add-workbench="handleAddToWorkbench">
			<template slot="toolstrip">
				<ul class="list-unstyled button-item">
					<li class="btn">
						<el-dropdown @command="handleCommand" trigger="click">
							<el-button type="text" :plain="true" :disabled="!hasSelectedRow">批量操作<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="delete"><i class="el-icon-delete"></i> 删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li class="btn">
						<el-button type="text" size="small" @click="handleOpenCreateForm"><i class="icon plus"></i>创 建</el-button>
					</li>
					<li class="btn">
						<el-button type="text info" size="small" @click="reload"><i class="icon refresh"></i>刷 新</el-button>
					</li>
				</ul>
				<section class="ts-search-container">
					<el-row :gutter="2">
						<el-col :span="2">
							<el-select v-model="search.fieldName" placeholder="请选择字段">
								<el-option v-for="item in store.search.field.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="3">
							<el-input v-model="search.fieldValue" placeholder="请输入关键字..." @keyup.enter.native="handleSearch"></el-input>
						</el-col>
						<el-col :span="2">
							<el-select v-model="search.gender" placeholder="请选择性别">
								<el-option v-for="item in store.search.gender.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="3">
							<el-button type="primary" icon="search" @click="handleSearch">搜 索</el-button>
						</el-col>
					</el-row>
				</section>
			</template>
			<template slot="tsSettings">
				<el-tooltip class="item" effect="dark" content="设置" placement="top">
					<span class="button" @click="handleOpenSettings">
		                <i class="settings icon"></i>
		            </span>
				</el-tooltip>
			</template>
		</toolstrip>
		<el-table :data="table.data" stripe border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="handleSortChange">
			<el-table-column type="selection" width="45" align="center">
			</el-table-column>
			<template v-for="col in showColumns">
				<el-table-column :key="col.id" v-if="col.visible==null || col.visible" :prop="col.prop" :label="col.label" :width="col.width" :min-width="col.minWidth" :sortable="col.sortable">
				</el-table-column>
			</template>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="编辑" placement="top">
						<el-button type="in" size="mini" @click="handleEdit(scope.row.id)" icon="edit"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除" placement="top">
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row.id)" icon="delete"></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pagination.currentPage" :page-sizes="search.pagination.pageSizes" :page-size="search.pagination.pageSize" layout="sizes, prev, pager, next, total" :total="search.pagination.total">
		</el-pagination>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialog: {
				visible: true,
				title: '用户信息',
				action: 'create',
				formLabelWidth: '120px'
			},
			settings: {
				visible: false
			},
			form: {
				id: 0,
				first_name: '',
				last_name: '',
				email: '',
				gender: '',
				ip_address: ''
			},
			rules: {
				email: [{
					required: true,
					message: '请输入邮箱地址',
					trigger: 'blur'
				},
				{
					type: 'email',
					message: '请输入正确的邮箱地址',
					trigger: 'blur,change'
				},
				{
					min: 5,
					message: '长度大于5个字符',
					trigger: 'blur'
				}
				],
			},
			search: {
				fieldName: 'first_name',
				fieldValue: '',
				gender: 'All',
				pagination: {
					currentPage: 1,
					pageSizes: [5, 10, 15, 20, 25, 50, 100, 200, 300, 400, 500],
					pageSize: 20,
					total: 0
				},
				sort: {
					prop: 'id',
					order: 'ascending'
				}
			},
			command: {
				selectedRows: []
			},
			store: {
				search: {
					field: {
						options: [{
							value: 'first_name',
							label: '姓'
						}, {
							value: 'last_name',
							label: '名'
						}, {
							value: 'email',
							label: '邮箱地址'
						}]
					},
					gender: {
						options: [{
							value: 'All',
							label: '全部'
						}, {
							value: 'Male',
							label: '男'
						}, {
							value: 'Female',
							label: '女'
						}]
					}
				}
			},
			table: {
				columns: [{
					label: '#',
					prop: 'id',
					sortable: true,
					width: 60
				},
				{
					label: 'First Name',
					prop: 'first_name',
					sortable: true,
					width: 180,
					visible: true
				},
				{
					label: 'Last Name',
					prop: 'last_name',
					sortable: true,
					visible: true
				},
				{
					label: 'Email',
					prop: 'email',
					sortable: true,
					minWidth: 200
				},
				{
					label: 'Gender',
					prop: 'gender',
					sortable: true,
					width: 100,
					visible: true
				},
				{
					label: 'Ip Address',
					prop: 'ip_address',
					sortable: true,
					visible: true
				}
				],
				data: []
			}
		}
	},
	mounted() {
		this.dialog.visible = false;
		this.reload();
	},
	computed: {
		actionName() {
			let _name = "创建";
			if (this.dialog.action === 'edit') {
				_name = "编辑";
			}
			return _name + this.dialog.title;
		},
		selectedIds() {
			return this.command.selectedRows.join(',');
		},
		hasSelectedRow() {
			return this.command.selectedRows.length > 0;
		},
		showColumns() {
			let cols = this.table.columns.filter(function (x) {
				return !x.hide;
			});
			let sc = cols.map(x => x.prop);
			return cols;
		},
		showColumnKeys() {
			let sc = this.showColumns.map(x => x.prop);
			return sc;
		}
	},
	methods: {
		reload() {
			var vm = this;
			var qs = require('qs');
			this.$axios.post('/user/grid', qs.stringify(vm.search))
				.then(function (response) {
					let res = response.data;
					vm.table.data = res.grid.data;
					vm.search.pagination = res.grid.pagination;
				})
				.catch(function (error) { });
		},
		handleSizeChange(val) {
			this.search.pagination.pageSize = val;
			this.reload();
		},
		handleCurrentChange(val) {
			this.search.pagination.currentPage = val;
			this.reload();
		},
		handleAddToWorkbench() {
			let tab = this.$tab;
			this.$store.commit('WORKBENCH_ADD', tab);
			this.$message({
				type: 'success',
				message: '成功将选项卡 [' + tab.params.title + '] 添加到工作台'
			});
		},
		handleResetForm() {
			try {
				this.$refs.form.resetFields();
			} catch (err) {

			}
		},
		handleOpenCreateForm() {
			this.handleResetForm();
			this.dialog.visible = true;
			this.dialog.action = "create";
		},
		handleEdit(id) {
			var vm = this;
			this.handleResetForm();
			this.dialog.action = "edit";
			this.$axios.get('/user/find?id=' + id)
				.then(function (response) {
					vm.form = response.data.data;
					vm.dialog.visible = true;
				})
				.catch(function (error) { });
		},
		handleCancelButton() {
			this.dialog.visible = false
		},
		handleOkButton() {
			this.$refs.form.validate((valid) => {
				if (valid) {
					switch (this.dialog.action) {
						case 'create':
							this.doCreate();
							break;
						case 'edit':
							this.doUpdate();
							break;
					}
					this.dialog.visible = false;
				} else {
					this.$message({
						type: 'warning',
						message: "表单验证未通过"
					});
					return false;
				}
			});
		},
		handleDelete(index, id) {
			let vm = this;
			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				vm.table.data.splice(index, 1);
				vm.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				vm.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		doCreate() {
			this.$message("创建成功");
			let m = JSON.parse(JSON.stringify(this.form));
			m.id = this.table.data.length + 1;
			m.ip_address = "127.0.0.1";
			this.table.data.push(m);
			//TODO:此处进行后台创建数据操作...
		},
		doUpdate() {
			this.$message("更新成功");
			//TODO:此处进行后台更新数据操作...
		},
		handleSelectionChange(val) {
			this.command.selectedRows = val.map(m => m.id);
		},
		handleSearch() {
			this.reload();
		},
		handleCommand(command) {
			let vm = this;
			this.$confirm('确定对选中的记录执行批量操作吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message('你点击了批量操作中的[' + command + ']按钮,被选中的记录行分别为:' + this.selectedIds);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消批量操作'
				});
			});
		},
		handleSortChange(sort) {
			if (sort.column === null) {
				return;
			}
			this.search.sort.prop = sort.prop;
			this.search.sort.order = sort.order;
			this.reload();
		},
		handleOpenSettings() {
			this.settings.visible = true;
		}
	}
}
</script>

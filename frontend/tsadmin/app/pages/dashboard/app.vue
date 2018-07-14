<template>
<div id="app">
	<div class="main-container">
		<aside id="side_nav" class="sidebar-container">
			<div class="scrollbar-sidebar">
				<div class="scroll-sidebar">
					<div class="sidebar-profile-container">
						<i class="sidebar-logo icon user" title="Admin"></i> <span class="display-name"></span>
					</div>
					<div class="sidebar-menu-container">
						<sidebar-menu :menus="menus"></sidebar-menu>
					</div>
				</div>
			</div>
		</aside>
		<main id="content_container" class="content-container">
			<el-row>
				<el-col :xs="24" :md="24" :lg="24">
					<section class="toolbar-container">
						<span class="btn-toggle-sidebar" @click="toggleSideNav">&#9776;</span>
						<div class="toolbar-items">
							<ul class="list-unstyled toolbar-menu pull-right">
								<li v-if="!workbenchIsEmpty">
									<div class="toolbar-item">
										<el-tooltip class="item" effect="dark" content="我的工作台" placement="bottom">
											<el-dropdown trigger="click">
												<span class="el-dropdown-link">
                                                  <p class="toolbar-menu-title has-badge">
                                                        <i class="grid layout icon"></i>
                                                        <sup class="badge bg-danger">{{workbenches.length}}</sup>
                                                  </p>
                                                </span>
												<el-dropdown-menu slot="dropdown">
													<el-dropdown-item><span @click="handleClearWorkbench"><i class="el-icon-delete txt-color-danger"></i> 清空工作台</span></el-dropdown-item>
													<el-dropdown-item v-for="tab in workbenches" :key="tab.name"><span @click="handleRemoveWorkbenck(tab)" style="margin-right:2px; display:inline-block;"><i class="el-icon-circle-close txt-color-danger"></i></span><span style="display:inline-block" @click="handleOpenWorkbench(tab)">{{tab.params.title}}</span></el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</el-tooltip>
									</div>
								</li>
								<li>
									<div class="toolbar-item">
										<el-tooltip class="item" effect="dark" content="我的资料" placement="bottom">
											<el-dropdown trigger="click">
												<span class="el-dropdown-link"><i class="user icon"></i></span>
												<el-dropdown-menu slot="dropdown">
													<el-dropdown-item>我的账号</el-dropdown-item>
													<el-dropdown-item>未读消息(8)</el-dropdown-item>
													<el-dropdown-item>系统设置</el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
										</el-tooltip>
									</div>
								</li>
								<li>
									<div class="toolbar-item">
										<el-tooltip class="item" effect="dark" content="退出系统" placement="bottom">
											<el-button type="text" class="warning">
												<i class="icon sign out"></i>
											</el-button>
										</el-tooltip>
									</div>
								</li>
							</ul>
						</div>
					</section>
					<section class="content">
						<div id="content_inner" class="content-inner">
							<transition name="fade">
								<vue-tabpanel></vue-tabpanel>
							</transition>
						</div>
					</section>
				</el-col>
			</el-row>
		</main>
	</div>
</div>
</template>

<script>
import SidebarMenu from 'components/sidebar-menu.vue';
import Menus from 'data/menu';

export default {
	components: {
		SidebarMenu
	},
	data() {
		return {
			menus: Menus
		}
	},
	created() {
		this.$taber.$on('vue-tabpanel-active-change', (tab) => {
			if (tab) {
				//this.scrollToTop();
				this.selected = tab.params.uniqueNo;
			} else {
				this.selected = null
			}
		});
		var self = this;
		if (window.attachEvent) {
			window.attachEvent('onresize', function() {
				self.calcContainerHeight();
			});
		} else if (window.addEventListener) {
			window.addEventListener('resize', function() {
				self.calcContainerHeight();
			}, true);
		}

        /*
		window.onerror = function(msg, url, lineNo, columnNo, error) {
			var string = msg.toLowerCase();
            console.info("error msg:",msg);
			var substring = "script error";
			if (string.indexOf(substring) > -1) {
				alert('Script Error: See Browser Console for Detail');
			} else {
				var message = [
					'Message: ' + msg,
					'URL: ' + url,
					'Line: ' + lineNo,
					'Column: ' + columnNo,
					'Error object: ' + JSON.stringify(error)
				].join(' - ');

				alert(message);
			}

			return false;
		};*/

	},
	mounted() {
		this.calcContainerHeight();
	},
	computed: {
		workbenches() {
			return this.$store.getters.workbench;
		},
		workbenchIsEmpty() {
			return this.workbenches.length <= 0;
		}
	},
	methods: {
		toggleSideNav() {
			let cls = "sidebar-on";
			let _html = document.getElementsByTagName("html")[0];
			if (_html.classList.contains(cls)) {
				_html.classList.remove(cls);
			} else {
				_html.classList.add(cls);
			}
		},
		calcContainerHeight() {
			let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			let top = document.getElementById('content_inner').getBoundingClientRect().top;
			document.getElementById("content_inner").style.height = (height - top - 8) + 'px';

			let tabHeight = height - top - 8;
			document.getElementsByClassName('tabs-content-wrapper')[0].style.height = (tabHeight - 36) + 'px';
		},

		scrollToTop() {
			//this.$refs.MainScrollbar.scrollToY(0);
			//this.$refs.MainScrollbar.calculateSize();
		},
		handleOpenWorkbench(tab) {
			this.$taber.open(tab)
		},
		handleRemoveWorkbenck(tab) {
			let vm = this;
			this.$confirm('确定要将选项卡 [' + tab.title + '] 从工作台移除吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				vm.$store.commit('WORKBENCH_REMOVE', tab);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消从工作台移除的操作'
				});
			});
		},
		handleClearWorkbench() {
			let vm = this;
			this.$confirm('确定要清空工作台吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				vm.$store.commit('WORKBENCH_CLEAR');
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消清空工作台的操作'
				});
			});
		}
	}
}
</script>

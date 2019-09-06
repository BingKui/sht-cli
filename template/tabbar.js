// tabbar 底部菜单
const tabbarHtml = `
<div class="v-tab-menu">
    <a href="#" class="tab-menu-item tab-menu-active">
        <i class="v-icon v-icon-home"></i>
        <span class="menu-name">Home</span>
    </a>
    <a href="#" class="tab-menu-item">
        <i class="v-icon v-icon-contact-list"></i>
        <span class="menu-name">Contact</span>
    </a>
    <a href="#" class="tab-menu-item">
        <i class="v-icon v-icon-owner"></i>
        <span class="menu-name">Owner</span>
    </a>
</div>
`;
const tabbarLess = `
// tabbar样式
.v-tab-menu {
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .flex-row-center();
    border-top: @border;
    background-color: @white;
    .tab-menu-item {
        flex: 1;
        height: 100%;
        .flex-column-center();
        color: rgba(0, 0, 0, 0.65);
        &.tab-menu-active {
            color: @primary;

            .v-icon {
                color: @primary;
            }
        }

        .v-icon {
            font-size: 22px;
        }

        .menu-name {
            .m-t(3);
            font-size: @font-size-sm;
        }
    }
}
`;

module.exports = {
    tabbarHtml,
    tabbarLess,
};
document.addEventListener('DOMContentLoaded', function() {
    // 创建导航指示器
    const navLeft = document.querySelector('.nav-left');
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    navLeft.appendChild(indicator);

    // 更新指示器位置的函数
    function updateIndicator(item) {
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.left = `${item.offsetLeft}px`;
    }

    // 导航项交互
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        // 鼠标进入效果
        item.addEventListener('mouseenter', () => {
            updateIndicator(item);
        });

        // 鼠标离开效果
        item.addEventListener('mouseleave', () => {
            const activeItem = document.querySelector('.nav-item.active');
            if (activeItem) {
                updateIndicator(activeItem);
            }
        });

        // 点击效果
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 页面淡出效果
            document.body.style.opacity = '0';
            
            // 延迟跳转
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
    });

    // 初始化指示器位置
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        updateIndicator(activeNav);
    }

    // 搜索框动画
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    searchInput.addEventListener('focus', () => {
        searchBtn.style.color = '#007bff';
    });

    searchInput.addEventListener('blur', () => {
        searchBtn.style.color = '#666';
    });

    // 页面加载动画
    document.body.classList.add('loaded');

    // 窗口大小改变时更新指示器
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
}); 
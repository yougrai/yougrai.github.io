// 添加到现有的 DOMContentLoaded 事件处理函数中
function initSubNavigation() {
    const subNavInner = document.querySelector('.projects-nav-inner, .resources-nav-inner');
    const indicator = document.createElement('div');
    indicator.className = 'subnav-indicator';
    subNavInner.appendChild(indicator);

    function updateSubIndicator(item) {
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.left = `${item.offsetLeft}px`;
    }

    const subNavItems = document.querySelectorAll('.project-nav-item, .resource-nav-item');
    subNavItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            updateSubIndicator(item);
            // 添加图标动画
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const activeItem = document.querySelector('.project-nav-item.active, .resource-nav-item.active');
            if (activeItem) {
                updateSubIndicator(activeItem);
            }
            // 重置图标动画
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新激活状态
            subNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 添加点击波纹效果
            const ripple = document.createElement('div');
            ripple.className = 'nav-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
            
            // 滚动到对应区域
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 初始化指示器位置
    const activeSubNav = document.querySelector('.project-nav-item.active, .resource-nav-item.active');
    if (activeSubNav) {
        updateSubIndicator(activeSubNav);
    }
}

// 在 DOMContentLoaded 事件中调用
document.addEventListener('DOMContentLoaded', function() {
    // ... 现有代码 ...
    initSubNavigation();
}); 
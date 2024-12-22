document.addEventListener('DOMContentLoaded', function() {
    // 添加进入动画
    const cards = document.querySelectorAll('.resource-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 创建导航指示器
    const navInner = document.querySelector('.resources-nav-inner');
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    navInner.appendChild(indicator);

    // 更新指示器位置的函数
    function updateIndicator(item) {
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.left = `${item.offsetLeft}px`;
    }

    // 初始化指示器位置
    const activeNav = document.querySelector('.resource-nav-item.active');
    if (activeNav) {
        updateIndicator(activeNav);
    }

    // 资源分类导航交互
    const navItems = document.querySelectorAll('.resource-nav-item');
    const sections = document.querySelectorAll('.resources-section');

    navItems.forEach(item => {
        // 鼠标进入效果
        item.addEventListener('mouseenter', () => {
            updateIndicator(item);
        });

        // 鼠标离开效果
        item.addEventListener('mouseleave', () => {
            const activeItem = document.querySelector('.resource-nav-item.active');
            if (activeItem) {
                updateIndicator(activeItem);
            }
        });

        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新导航项状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            updateIndicator(this);
            
            // 显示对应区域
            const targetId = this.getAttribute('href').slice(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    // 添加过渡动画
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.classList.add('active');
                    
                    // 触发重排以启动动画
                    section.offsetHeight;
                    
                    // 应用过渡效果
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';

                    // 添加新区域的进入动画
                    const newCards = section.querySelectorAll('.resource-card');
                    newCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        });
    });

    // 添加标签点击筛选功能
    const tags = document.querySelectorAll('.tag-stack span');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase();
            const cards = document.querySelectorAll('.resource-card');
            
            cards.forEach(card => {
                const cardTags = Array.from(card.querySelectorAll('.tag-stack span'))
                    .map(t => t.textContent.toLowerCase());
                
                if (cardTags.includes(tagText)) {
                    card.style.display = 'block';
                    card.style.animation = 'highlight 1s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 搜索功能增强
    const searchInput = document.querySelector('.search-input');
    const resourceCards = document.querySelectorAll('.resource-card');

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.toLowerCase();
        
        searchTimeout = setTimeout(() => {
            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag-stack span'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) ||
                              tags.some(tag => tag.includes(searchTerm));
                
                if (matches) {
                    card.style.display = 'block';
                    card.style.animation = 'highlight 1s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300);
    });

    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { background-color: rgba(0, 123, 255, 0.1); }
            100% { background-color: white; }
        }
    `;
    document.head.appendChild(style);

    // 添加窗口大小改变时更新指示器位置
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.resource-nav-item.active');
        if (activeItem) {
            updateIndicator(activeItem);
        }
    });
}); 
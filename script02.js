document.addEventListener('DOMContentLoaded', function() {
    // 确保页面加载时显示第一个section
    const firstSection = document.querySelector('.notes-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }

        // 导航链接点击效果
        const navLinks = document.querySelectorAll('.nav-item');
    
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // 阻止默认跳转
                
                // 移除所有链接的active类
                navLinks.forEach(item => item.classList.remove('active'));
                // 添加active类到当前点击的链接
                this.classList.add('active');
                
                // 页面淡出效果
                document.body.style.opacity = '0';
                
                // 延迟跳转，等待淡出动画完成
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            });
        });
    
        // 页面加载时的淡入效果
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    
        // 如果脚本中有与背景颜色相关的动态操作，需要更新颜色值
        // 例如：
        document.querySelector('.background').style.backgroundColor = '#ffffff';
    
        // 监听滚动位置，根据内容区域自动更新分类项状态
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            contentSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - 100 && 
                    scrollPosition < sectionTop + sectionHeight - 100) {
                    const targetId = section.id;
                    categoryItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-target') === targetId) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        });
    

    // 笔记分类导航交互
    const noteNavItems = document.querySelectorAll('.note-nav-item');
    const noteSections = document.querySelectorAll('.notes-section');

    noteNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新导航项状态
            noteNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容区域
            const targetId = this.getAttribute('href').substring(1);
            noteSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch(query) {
        if (!query.trim()) return;
        
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
            // 这里添加实际的搜索逻辑
            console.log('搜索:', query);
        }, 1000);
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }

    // 页面加载时的淡入效果
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
}); 
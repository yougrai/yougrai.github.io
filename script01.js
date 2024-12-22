document.addEventListener('DOMContentLoaded', function() {
    // 处理更新提示的关闭
    const updateNotification = document.querySelector('.update-notification');
    const closeBtn = document.querySelector('.close-btn');
    
    if (closeBtn && updateNotification) {
        closeBtn.addEventListener('click', () => {
            updateNotification.style.opacity = '0';
            setTimeout(() => updateNotification.remove(), 500);
        });

        // 5秒后自动消失
        setTimeout(() => {
            updateNotification.style.opacity = '0';
            setTimeout(() => updateNotification.remove(), 500);
        }, 5000);
    }

    // 处理搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }

    // 知识分类交互
    const categoryItems = document.querySelectorAll('.category-list li');
    const contentSections = document.querySelectorAll('.content-section');

    categoryItems.forEach(item => {
        // 添加鼠标进入效果
        item.addEventListener('mouseenter', () => {
            const arrow = item.querySelector('i');
            if (arrow) arrow.style.transform = 'translateX(5px)';
        });

        // 添加鼠标离开效果
        item.addEventListener('mouseleave', () => {
            const arrow = item.querySelector('i');
            if (arrow) arrow.style.transform = 'translateX(0)';
        });

        // 点击切换内容
        item.addEventListener('click', function() {
            // 更新分类项状态
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 获取目标区域ID
            const targetId = this.getAttribute('data-target');
            
            // 隐藏所有内容区域
            contentSections.forEach(section => {
                section.style.opacity = '0';
                setTimeout(() => {
                    section.classList.remove('active');
                }, 300);
            });
            
            // 显示目标内容区域
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                    // 平滑滚动到目标区域
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // 淡入显示
                    setTimeout(() => {
                        targetSection.style.opacity = '1';
                    }, 50);
                }, 300);
            }
            
            // 点击后隐藏侧边栏（在移动设备上）
            if (window.innerWidth <= 768) {
                document.querySelector('.main-left').classList.remove('show');
            }
        });
    });

    // 页面加载时只显示第一个区域
    contentSections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active');
            section.style.opacity = '1';
        }
    });

    // 内容卡片悬浮效果
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // 轮播图功能
    initCarousel();

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

    // 在轮播图下方显示一个提示区域
    const carousel = document.querySelector('.carousel');
    const triggerArea = document.createElement('div');
    triggerArea.style.cssText = `
        position: fixed;
        left: 0;
        top: ${carousel.offsetHeight + 60}px;
        width: 50px;
        height: 100px;
        z-index: 99;
    `;
    document.body.appendChild(triggerArea);

    // 当鼠标移入触发区域时显示分类栏
    triggerArea.addEventListener('mouseenter', () => {
        document.querySelector('.main-left').classList.add('show');
    });

    // 当鼠标离开分类栏时隐藏
    document.querySelector('.main-left').addEventListener('mouseleave', function() {
        this.classList.remove('show');
    });
});

// 搜索功能实现
function performSearch(query) {
    if (!query.trim()) return;
    
    // 这里添加实际的搜索逻辑
    console.log('搜索:', query);
    
    // 显示搜索动画
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // 模拟搜索延迟
    setTimeout(() => {
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        // 这里添加搜索结果显示逻辑
    }, 1000);
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        items[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    }

    // 自动播放
    function startAutoPlay() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // 开始自动播放
    startAutoPlay();
} 
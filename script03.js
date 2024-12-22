// 示例项目数据
const projectsData = [
    {
        title: "个人博客系统",
        description: "使用 Node.js 和 Express 构建的现代化博客系统，支持 Markdown 编辑和实时预览。",
        date: "2024-03-15"
    },
    {
        title: "任务管理应用",
        description: "基于 React 的任务管理应用，具有拖拽排序、标签分类等功能。",
        date: "2024-02-28"
    },
    {
        title: "天气预报工具",
        description: "集成多个天气 API 的天气预报工具，支持全球主要城市的天气查询。",
        date: "2024-02-10"
    }
    // 可以添加更多项目
];

// 动态生成项目卡片
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; // 清空现有内容

    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="card-footer">
                    <span class="date">${project.date}</span>
                    <a href="#" class="read-more">阅读更多</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// 搜索功能
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projectsData.filter(project => 
            project.title.toLowerCase().includes(searchTerm) || 
            project.description.toLowerCase().includes(searchTerm)
        );
        
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = ''; // 清空现有内容
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="card-footer">
                        <span class="date">${project.date}</span>
                        <a href="#" class="read-more">阅读更多</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 项目卡片进入动画
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // 技术标签点击筛选
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const selectedTech = this.textContent.toLowerCase();
            
            cards.forEach(card => {
                const cardTechs = Array.from(card.querySelectorAll('.tech-tag'))
                    .map(t => t.textContent.toLowerCase());
                
                if (cardTechs.includes(selectedTech)) {
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
    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.toLowerCase();
        
        searchTimeout = setTimeout(() => {
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const techs = Array.from(card.querySelectorAll('.tech-tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) ||
                              techs.some(tech => tech.includes(searchTerm));
                
                if (matches) {
                    card.style.display = 'block';
                    card.style.animation = 'highlight 1s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300);
    });

    // 进度条动画
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
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

    // 平滑滚动到相应的内容区域
    document.querySelectorAll('.project-nav-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为
            const targetId = this.getAttribute('href'); // 获取目标ID
            const targetElement = document.querySelector(targetId); // 获取目标元素

            if (targetElement) {
                // 使用 scrollIntoView 方法实现平滑滚动
                targetElement.scrollIntoView({
                    behavior: 'smooth', // 平滑滚动
                    block: 'start' // 滚动到目标元素的顶部
                });
            }
        });
    });
}); 

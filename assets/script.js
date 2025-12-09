// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 为所有卡片添加悬停效果
    const cards = document.querySelectorAll('.card, .course-card, .quiz-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // 注册表单提交处理
    const signupForm = document.querySelector('.signup-card');
    if (signupForm) {
        const submitButton = signupForm.querySelector('button');
        const inputs = signupForm.querySelectorAll('input');
        
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f44336';
                    input.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
                } else {
                    input.style.borderColor = '#4CAF50';
                    input.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.2)';
                }
            });
            
            if (isValid) {
                // 模拟注册成功
                submitButton.textContent = "注册成功！🎉";
                submitButton.style.background = "linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%)";
                submitButton.disabled = true;
                
                // 重置表单
                setTimeout(() => {
                    inputs.forEach(input => input.value = '');
                    inputs.forEach(input => {
                        input.style.borderColor = '#e0e0e0';
                        input.style.boxShadow = 'none';
                    });
                    submitButton.textContent = "创建账户";
                    submitButton.style.background = "";
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }
    
    const links = {
    "开始学习": "https://www.bilibili.com/video/BV12Y411p7cT/?spm_id_from=333.337.search-card.all.click&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c",
    "立即体验": "https://www.bilibili.com/video/BV1yL4y1p7eG/?spm_id_from=333.337.search-card.all.click&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c",
    "了解更多": "https://www.bilibili.com/video/BV1e4411Q7uv?spm_id_from=333.788.videopod.episodes&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c&p=45"
};

document.querySelectorAll('.course-card button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        window.open(links[btn.textContent], "_blank")
    })
})

    
    // 添加页面加载完成的动画类
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('loaded');
    }
});

// 滚动到顶部按钮
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #60afe7ff 0%, #60afe7ff 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

scrollToTopButton.addEventListener('mouseenter', () => {
    scrollToTopButton.style.transform = 'scale(1.1)';
});

scrollToTopButton.addEventListener('mouseleave', () => {
    scrollToTopButton.style.transform = 'scale(1)';
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTopButton);

// 显示/隐藏滚动到顶部按钮
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});
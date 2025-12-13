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
    
    // 课程卡片按钮链接跳转
    const links = {
        "开始学习": "https://www.bilibili.com/video/BV12Y411p7cT/?spm_id_from=333.337.search-card.all.click&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c",
        "立即体验": "https://www.bilibili.com/video/BV1yL4y1p7eG/?spm_id_from=333.337.search-card.all.click&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c",
        "了解更多": "https://www.bilibili.com/video/BV1e4411Q7uv?spm_id_from=333.788.videopod.episodes&vd_source=c809e863f6d3e6bd0e71b7e1bdd8e85c&p=45"
    };
    
    // 为所有课程卡片按钮添加点击事件
document.querySelectorAll('.course-card button').forEach(btn => {
    btn.addEventListener('click', function () {
        const link = this.dataset.link; // 读取 data-link

        if (link) {
            window.open(link, "_blank");
            console.log("跳转到:", link);
        } else {
            console.warn("按钮缺少 data-link 属性");
        }
    });
});

            
            // 检查按钮文本是否在links对象中
            if (links[buttonText]) {
                window.open(links[buttonText], "_blank");
                console.log('跳转到:', links[buttonText]);
                
                // 记录学习进度
                recordLearningProgress(buttonText, this.closest('.course-card'));
            } else {
                console.warn('未找到对应的链接，按钮文本:', buttonText);
            }
        });
    
    
    // 添加页面加载完成的动画类
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('loaded');
    }
    
    // 初始化进度追踪
    initProgressTracking();


// 学习进度追踪功能
function initProgressTracking() {
    // 只在主页初始化进度追踪
    const progressCard = document.querySelector('.progress-card');
    if (!progressCard) return; // 如果不在主页，直接返回
    
    // 初始化本地存储数据
    if (!localStorage.getItem('learningProgress')) {
        const defaultProgress = {
            completedLessons: 0,
            completedQuizzes: 0,
            studyTime: 0,
            recentActivities: []
        };
        localStorage.setItem('learningProgress', JSON.stringify(defaultProgress));
    }
    
    // 更新进度显示
    updateProgressDisplay();
    
    // 查看个人资料按钮
    const viewProfileBtn = document.getElementById('view-profile');
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', function() {
            // 显示个人资料模态框
            showProfileModal();
        });
    }
}

// 记录学习进度
function recordLearningProgress(buttonText, courseCard) {
    // 如果之前没有记录这个课程的点击
    const lessonKey = `lesson_${buttonText}`;
    if (!localStorage.getItem(lessonKey)) {
        localStorage.setItem(lessonKey, 'completed');
        
        // 更新进度数据
        const progress = JSON.parse(localStorage.getItem('learningProgress')) || {
            completedLessons: 0,
            completedQuizzes: 0,
            studyTime: 0,
            recentActivities: []
        };
        
        progress.completedLessons += 1;
        progress.studyTime += 0.5; // 假设每次学习0.5小时
        
        // 添加活动记录
        const activity = {
            type: 'lesson',
            title: buttonText,
            time: new Date().toLocaleString(),
            description: courseCard.querySelector('h3').textContent
        };
        
        progress.recentActivities.unshift(activity);
        // 只保留最近5个活动
        if (progress.recentActivities.length > 5) {
            progress.recentActivities = progress.recentActivities.slice(0, 5);
        }
        
        localStorage.setItem('learningProgress', JSON.stringify(progress));
        
        // 更新显示（如果正在主页）
        updateProgressDisplay();
        
        // 显示通知
        showProgressNotification(`完成了一个新课程！获得 +1 课程进度。`);
    }
}

// 更新进度显示
function updateProgressDisplay() {
    const progress = JSON.parse(localStorage.getItem('learningProgress')) || {
        completedLessons: 0,
        completedQuizzes: 0,
        studyTime: 0,
        recentActivities: []
    };
    
    // 更新统计数据
    const completedLessonsEl = document.getElementById('completed-lessons');
    const completedQuizzesEl = document.getElementById('completed-quizzes');
    const studyTimeEl = document.getElementById('study-time');
    
    if (completedLessonsEl) completedLessonsEl.textContent = progress.completedLessons;
    if (completedQuizzesEl) completedQuizzesEl.textContent = progress.completedQuizzes;
    if (studyTimeEl) studyTimeEl.textContent = progress.studyTime;
    
    // 计算总体进度（假设最多10个课程和测验）
    const maxProgress = 20; // 10课程 + 10测验
    const currentProgress = progress.completedLessons + progress.completedQuizzes;
    const progressPercent = Math.min(100, (currentProgress / maxProgress) * 100);
    
    // 更新进度条
    const overallProgressEl = document.getElementById('overall-progress');
    const progressFillEl = document.getElementById('progress-fill');
    
    if (overallProgressEl) overallProgressEl.textContent = `${Math.round(progressPercent)}%`;
    if (progressFillEl) progressFillEl.style.width = `${progressPercent}%`;
    
    // 更新最近活动列表
    updateActivityList(progress.recentActivities);
}

// 更新活动列表
function updateActivityList(activities) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    // 清空列表
    activityList.innerHTML = '';
    
    if (activities.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无活动记录，开始学习吧！';
        li.setAttribute('data-translate', 'home.noActivity');
        activityList.appendChild(li);
        // 重新应用翻译
        if (typeof applyTranslations === 'function') {
            applyTranslations(currentLanguage);
        }
    } else {
        activities.forEach((activity, index) => {
            const li = document.createElement('li');
            
            // 根据活动类型设置图标
            let icon = '📚';
            if (activity.type === 'quiz') icon = '🎯';
            if (activity.type === 'study') icon = '⏱️';
            
            li.innerHTML = `
                <span style="margin-right: 10px;">${icon}</span>
                <span>${activity.description || activity.title}</span>
                <span style="margin-left: auto; font-size: 12px; opacity: 0.7;">${formatTime(activity.time)}</span>
            `;
            activityList.appendChild(li);
        });
    }
}

// 格式化时间
function formatTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diffHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffHours < 1) return '刚刚';
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}天前`;
    return time.toLocaleDateString();
}

// 显示进度通知
function showProgressNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #2e7d32 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 显示个人资料模态框
function showProfileModal() {
    const progress = JSON.parse(localStorage.getItem('learningProgress')) || {
        completedLessons: 0,
        completedQuizzes: 0,
        studyTime: 0,
        recentActivities: []
    };
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        ">
            <h2 style="margin-bottom: 20px; color: #333; text-align: center;">个人学习资料</h2>
            
            <div style="margin-bottom: 25px; text-align: center;">
                <div style="
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #F7B733 0%, #fc4a1a 100%);
                    margin: 0 auto 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    color: white;
                ">
                    👤
                </div>
                <h3 style="margin-bottom: 5px; color: #333;">学习者</h3>
                <p style="color: #666; margin-bottom: 20px;">中文学习爱好者</p>
            </div>
            
            <div style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-bottom: 25px;
            ">
                <div style="
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; font-weight: bold; color: #e53935;">${progress.completedLessons}</div>
                    <div style="color: #666; font-size: 14px;">已学课程</div>
                </div>
                <div style="
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">${progress.completedQuizzes}</div>
                    <div style="color: #666; font-size: 14px;">完成测验</div>
                </div>
                <div style="
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; font-weight: bold; color: #FF9800;">${progress.studyTime}</div>
                    <div style="color: #666; font-size: 14px;">学习时间(小时)</div>
                </div>
                <div style="
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; font-weight: bold; color: #2196F3;">${Math.round((progress.completedLessons + progress.completedQuizzes) / 20 * 100)}%</div>
                    <div style="color: #666; font-size: 14px;">总体进度</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 15px; color: #333;">学习目标</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">🎯 完成HSK1所有课程</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">🗣️ 掌握100个日常会话短语</li>
                    <li style="padding: 8px 0;">📚 每周学习时间不少于5小时</li>
                </ul>
            </div>
            
            <button id="close-modal" style="
                width: 100%;
                padding: 12px;
                background: linear-gradient(135deg, #e53935 0%, #c62828 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 10px;
            ">关闭</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    modal.querySelector('#close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

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
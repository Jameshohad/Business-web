// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 首先检查登录状态
    checkLoginStatus();
    
    // 初始化卡片悬停效果
    initCardHoverEffect();
    
    // 初始化注册表单
    initSignupForm();
    
    // 初始化课程卡片按钮
    initCourseButtons();
    
    // 添加页面加载动画类
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('loaded');
    }
});

// ============ 登录状态检查相关函数 ============

// 检查登录状态
function checkLoginStatus() {
    const progressContainer = document.getElementById('progress-container');
    const loginPrompt = document.getElementById('login-prompt');
    const logoutBtn = document.getElementById('logout-btn');

    // 获取当前用户信息
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('检查登录状态，currentUser:', currentUser);

    if (currentUser) {
        // 用户已登录
        try {
            const user = JSON.parse(currentUser);
            console.log('用户已登录:', user.email);
            
            // 显示进度追踪，隐藏登录提示
            if (progressContainer) {
                progressContainer.style.display = 'block';
                console.log('显示进度追踪容器');
            }
            
            if (loginPrompt) {
                loginPrompt.style.display = 'none';
                console.log('隐藏登录提示');
            }

            // 显示用户名
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                const userName = user.email ? user.email.split('@')[0] : '用户';
                userNameElement.textContent = userName;
                console.log('设置用户名:', userName);
            }

            // 初始化学习进度
            initProgressTracking();

            // 添加登出事件监听
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
                console.log('添加登出事件监听');
            }

        } catch (error) {
            console.error('解析用户数据失败:', error);
            showLoginPrompt();
        }
    } else {
        // 用户未登录
        console.log('用户未登录');
        showLoginPrompt();
    }
}

// 显示登录提示
function showLoginPrompt() {
    const progressContainer = document.getElementById('progress-container');
    const loginPrompt = document.getElementById('login-prompt');

    if (progressContainer) {
        progressContainer.style.display = 'none';
    }
    
    if (loginPrompt) {
        loginPrompt.style.display = 'block';
    }
    
    console.log('显示登录提示');
}

// 登出处理
function handleLogout() {
    if (confirm('确定要登出吗？')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberEmail');
        showNotification('已成功登出！', 'success');
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

// ============ 学习进度相关函数 ============

function initProgressTracking() {
    console.log('初始化进度追踪');
    
    const progressCard = document.querySelector('.progress-card');
    if (!progressCard) {
        console.warn('未找到 progress-card 元素');
        return;
    }

    if (!localStorage.getItem('learningProgress')) {
        const defaultProgress = {
            completedLessons: 0,
            completedQuizzes: 0,
            studyTime: 0,
            recentActivities: []
        };
        localStorage.setItem('learningProgress', JSON.stringify(defaultProgress));
    }

    updateProgressDisplay();

    const viewProfileBtn = document.getElementById('view-profile');
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', function() {
            showProfileModal();
        });
    }
}

function updateProgressDisplay() {
    const progress = JSON.parse(localStorage.getItem('learningProgress')) || {
        completedLessons: 0,
        completedQuizzes: 0,
        studyTime: 0,
        recentActivities: []
    };

    const completedLessonsEl = document.getElementById('completed-lessons');
    const completedQuizzesEl = document.getElementById('completed-quizzes');
    const studyTimeEl = document.getElementById('study-time');

    if (completedLessonsEl) completedLessonsEl.textContent = progress.completedLessons;
    if (completedQuizzesEl) completedQuizzesEl.textContent = progress.completedQuizzes;
    if (studyTimeEl) studyTimeEl.textContent = progress.studyTime.toFixed(1);

    const maxProgress = 20;
    const currentProgress = progress.completedLessons + progress.completedQuizzes;
    const progressPercent = Math.min(100, (currentProgress / maxProgress) * 100);

    const overallProgressEl = document.getElementById('overall-progress');
    const progressFillEl = document.getElementById('progress-fill');

    if (overallProgressEl) overallProgressEl.textContent = `${Math.round(progressPercent)}%`;
    if (progressFillEl) progressFillEl.style.width = `${progressPercent}%`;

    updateActivityList(progress.recentActivities);
}

function updateActivityList(activities) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    activityList.innerHTML = '';

    if (activities.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无活动记录，开始学习吧！';
        li.setAttribute('data-translate', 'home.noActivity');
        activityList.appendChild(li);
    } else {
        activities.forEach((activity) => {
            const li = document.createElement('li');
            let icon = '📚';
            if (activity.type === 'quiz') icon = '🎯';
            if (activity.type === 'study') icon = '⏱️';

            li.innerHTML = `
                <span style="margin-right: 10px;">${icon}</span>
                <span>${activity.description || activity.title}</span>
                <span style="margin-left: auto; font-size: 12px; opacity: 0.7;">
                    ${formatTime(activity.time)}
                </span>
            `;
            activityList.appendChild(li);
        });
    }
}

function formatTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diffHours = Math.floor((now - time) / (1000 * 60 * 60));

    if (diffHours < 1) return '刚刚';
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}天前`;
    return time.toLocaleDateString();
}

function showProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const progress = JSON.parse(localStorage.getItem('learningProgress')) || {
        completedLessons: 0,
        completedQuizzes: 0,
        studyTime: 0,
        recentActivities: []
    };

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

    const userEmail = currentUser.email || '未知用户';
    const userName = userEmail.split('@')[0];

    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 30px; width: 90%; max-width: 500px;">
            <h2 style="text-align: center; color: #333;">📊 学习统计</h2>
            <div style="text-align: center; margin-bottom: 25px;">
                <h3 style="color: #333;">${userName}</h3>
                <p style="color: #666;">${userEmail}</p>
                <p style="color: #999; font-size: 14px;">登录时间: ${currentUser.loginTime}</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px;">
                <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #e53935;">${progress.completedLessons}</div>
                    <div style="color: #666; font-size: 14px;">已学课程</div>
                </div>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">${progress.completedQuizzes}</div>
                    <div style="color: #666; font-size: 14px;">完成测验</div>
                </div>
            </div>
            <button id="close-modal" style="width: 100%; padding: 12px; background: #e53935; color: white; border: none; border-radius: 10px; cursor: pointer;">关闭</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ============ 其他相关函数 ============

function initCardHoverEffect() {
    const cards = document.querySelectorAll('.card, .course-card, .quiz-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function initSignupForm() {
    const signupForm = document.querySelector('.signup-card');
    if (!signupForm) return;

    const submitButton = signupForm.querySelector('button');
    const inputs = signupForm.querySelectorAll('input');

    if (!submitButton) return;

    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleSignup(inputs, submitButton);
    });
}

function handleSignup(inputs, submitButton) {
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#f44336';
        } else {
            input.style.borderColor = '#4CAF50';
        }
    });

    if (isValid) {
        const email = Array.from(inputs).find(i => i.type === 'email')?.value || '';
        const password = Array.from(inputs).find(i => i.type === 'password')?.value || '';

        if (email && password) {
            const userData = {
                email: email,
                password: password,
                registrationTime: new Date().toLocaleString(),
                isRegistered: true
            };

            localStorage.setItem('registeredUser', JSON.stringify(userData));
            submitButton.textContent = "注册成功！🎉";
            submitButton.disabled = true;

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    }
}

function initCourseButtons() {
    const links = {
        "开始学习": "https://www.bilibili.com/video/BV12Y411p7cT/",
        "立即体验": "https://www.bilibili.com/video/BV1yL4y1p7eG/",
        "了解更多": "https://www.bilibili.com/video/BV1e4411Q7uv/"
    };

    document.querySelectorAll('.course-card button').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const link = this.dataset.link || links[buttonText];

            if (link) {
                window.open(link, "_blank");
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;

    let backgroundColor = '#2196F3';
    if (type === 'error') backgroundColor = '#f44336';
    else if (type === 'success') backgroundColor = '#4CAF50';
    else if (type === 'warning') backgroundColor = '#ff9800';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加全局动画样式
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

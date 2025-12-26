// 登录页面功能脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化登录功能
    initLoginForm();
    initPasswordToggle();
    initSocialLogin();
    initRememberMe();
});

// 初始化登录表单
function initLoginForm() {
    const loginBtn = document.getElementById('login-submit');
    const passwordInput = document.getElementById('login-password');

    if (!loginBtn) return;

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Enter键提交表单
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }
}

// 处理登录逻辑
function handleLogin() {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-submit');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // 清除之前的错误状态
    emailInput.classList.remove('error', 'success');
    passwordInput.classList.remove('error', 'success');

    // 验证输入
    let isValid = true;

    if (!email) {
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailInput.classList.add('success');
    }

    if (!password) {
        passwordInput.classList.add('error');
        isValid = false;
    } else if (password.length < 6) {
        passwordInput.classList.add('error');
        isValid = false;
    } else {
        passwordInput.classList.add('success');
    }

    if (!isValid) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }

    // 模拟登录请求
    loginBtn.disabled = true;
    loginBtn.textContent = '正在登录...';

    // 从localStorage获取已注册的用户
    const storedUser = localStorage.getItem('registeredUser');

    setTimeout(() => {
        // 验证用户名和密码
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.email === email && user.password === password) {
                    // 登录成功
                    loginSuccessful(email);
                } else {
                    // 登录失败
                    showNotification('邮箱或密码错误', 'error');
                    loginBtn.disabled = false;
                    loginBtn.textContent = '🚀 登录';
                    passwordInput.classList.add('error');
                }
            } catch (error) {
                showNotification('用户数据解析错误', 'error');
                loginBtn.disabled = false;
                loginBtn.textContent = '🚀 登录';
            }
        } else {
            // 如果没有注册过，显示错误
            showNotification('该邮箱未注册，请先注册账户', 'error');
            loginBtn.disabled = false;
            loginBtn.textContent = '🚀 登录';
            emailInput.classList.add('error');
        }
    }, 1500);
}

// 登录成功处理
function loginSuccessful(email) {
    const loginForm = document.getElementById('login-form');
    const loginSuccess = document.getElementById('login-success');

    // 保存登录状态
    const loginData = {
        email: email,
        loginTime: new Date().toLocaleString(),
        isLoggedIn: true
    };

    localStorage.setItem('currentUser', JSON.stringify(loginData));

    // 显示成功通知
    showNotification('登录成功！欢迎回来 ' + email, 'success');

    // 隐藏表单，显示成功消息
    if (loginForm) {
        loginForm.style.display = 'none';
    }

    if (loginSuccess) {
        loginSuccess.style.display = 'block';
    }

    // 倒计时重定向
    let countdown = 3;
    const countdownElement = document.getElementById('countdown');

    const interval = setInterval(() => {
        countdown--;
        if (countdownElement) {
            countdownElement.textContent = countdown;
        }

        if (countdown === 0) {
            clearInterval(interval);
            // 重定向到首页
            console.log('即将重定向到 index.html');
            window.location.href = 'index.html';
        }
    }, 1000);
}

// 密码显示/隐藏切换
function initPasswordToggle() {
    const passwordToggle = document.getElementById('login-password-toggle');
    const passwordInput = document.getElementById('login-password');

    if (!passwordToggle || !passwordInput) return;

    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = '👁️';
        }
    });
}

// 初始化社交登录按钮
function initSocialLogin() {
    const googleBtn = document.getElementById('google-login');
    const wechatBtn = document.getElementById('wechat-login');
    const githubBtn = document.getElementById('github-login');

    if (googleBtn) {
        googleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSocialLogin('Google');
        });
    }

    if (wechatBtn) {
        wechatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSocialLogin('WeChat');
        });
    }

    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSocialLogin('GitHub');
        });
    }
}

// 处理社交媒体登录
function handleSocialLogin(platform) {
    showNotification(`正在使用 ${platform} 登录...`, 'info');
    console.log(`社交登录: ${platform}`);

    // 这里可以集成真实的OAuth登录流程
    setTimeout(() => {
        showNotification(`${platform} 登录暂未开放，请使用邮箱登录`, 'warning');
    }, 1500);
}

// 记住我功能
function initRememberMe() {
    const rememberCheckbox = document.getElementById('remember-checkbox');
    const emailInput = document.getElementById('login-email');

    if (!rememberCheckbox || !emailInput) return;

    // 加载保存的邮箱
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }

    // 监听记住我复选框
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked && emailInput.value) {
            localStorage.setItem('rememberEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberEmail');
        }
    });

    // 当邮箱改变时，如果已勾选记住我，则保存
    emailInput.addEventListener('change', function() {
        if (rememberCheckbox.checked && this.value) {
            localStorage.setItem('rememberEmail', this.value);
        }
    });
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;

    let backgroundColor = '#2196F3'; // 默认蓝色
    if (type === 'error') {
        backgroundColor = '#f44336'; // 红色
    } else if (type === 'success') {
        backgroundColor = '#4CAF50'; // 绿色
    } else if (type === 'warning') {
        backgroundColor = '#ff9800'; // 橙色
    }

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

// 添加动画样式 - 确保只添加一次
function addAnimationStyles() {
    if (!document.querySelector('style[data-login-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-login-animations', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化时添加动画样式
addAnimationStyles();

// 翻译功能
const translations = {
    'zh-CN': {
        // 导航栏
        'nav.home': '主页',
        'nav.courses': '课程',
        'nav.quiz': '测验',
        'nav.about': '关于',
        'nav.signup': '注册',
        'nav.translate': 'English',
        
        // 注册页面
        'signup.title': '创建您的免费账户',
        'signup.subtitle': '加入全球中文学习者社区，开始您的语言学习之旅',
        'signup.username': '👤 用户名',
        'signup.usernamePlaceholder': '请输入用户名 (4-20个字符)',
        'signup.usernameHint': '英文字母、数字或中文，不能包含特殊字符',
        'signup.email': '📧 邮箱地址',
        'signup.emailPlaceholder': '请输入有效邮箱地址',
        'signup.emailHint': '我们将通过此邮箱发送验证邮件',
        'signup.password': '🔒 密码',
        'signup.passwordPlaceholder': '请输入密码 (至少8位)',
        'signup.passwordStrength': '密码强度: 弱',
        'signup.confirmPassword': '🔑 确认密码',
        'signup.confirmPasswordPlaceholder': '请再次输入密码',
        'signup.confirmPasswordHint': '请确保两次输入的密码一致',
        'signup.goal': '🎯 您的学习目标是什么？',
        'signup.goalBeginner': '零基础入门',
        'signup.goalConversation': '日常会话',
        'signup.goalBusiness': '商务中文',
        'signup.goalTravel': '旅游交流',
        'signup.terms': '我已阅读并同意 <a href="#" class="terms-link">服务条款</a> 和 <a href="#" class="terms-link">隐私政策</a>',
        'signup.submit': '🚀 创建账户',
        'signup.login': '已有账户？ <a href="#" onclick="alert(\'Login coming soon!\')">立即登录</a>',
        'signup.socialText': '或使用以下方式注册',
        'signup.successTitle': '注册成功！',
        'signup.successMessage1': '欢迎加入 Learn Chinese 社区！',
        'signup.successMessage2': '我们已经向您的邮箱发送了验证邮件，请查收。',
        'signup.startLearning': '开始学习中文 →',
        
        // 页脚
        'footer.copyright': '© 2025 Learn Chinese. 保留所有权利。',
        'footer.slogan': '让世界听见中文的声音！'
    },
    'en': {
        // Navigation
        'nav.home': 'Home',
        'nav.courses': 'Courses',
        'nav.quiz': 'Quiz',
        'nav.about': 'About',
        'nav.signup': 'Sign Up',
        'nav.translate': '中文',
        
        // Signup page
        'signup.title': 'Create Your Free Account',
        'signup.subtitle': 'Join the global Chinese learners community and start your language learning journey',
        'signup.username': '👤 Username',
        'signup.usernamePlaceholder': 'Enter username (4-20 characters)',
        'signup.usernameHint': 'Letters, numbers, or Chinese characters, no special characters',
        'signup.email': '📧 Email Address',
        'signup.emailPlaceholder': 'Enter a valid email address',
        'signup.emailHint': 'We will send verification email to this address',
        'signup.password': '🔒 Password',
        'signup.passwordPlaceholder': 'Enter password (at least 8 characters)',
        'signup.passwordStrength': 'Password Strength: Weak',
        'signup.confirmPassword': '🔑 Confirm Password',
        'signup.confirmPasswordPlaceholder': 'Re-enter your password',
        'signup.confirmPasswordHint': 'Please make sure passwords match',
        'signup.goal': '🎯 What is your learning goal?',
        'signup.goalBeginner': 'Beginner',
        'signup.goalConversation': 'Daily Conversation',
        'signup.goalBusiness': 'Business Chinese',
        'signup.goalTravel': 'Travel Communication',
        'signup.terms': 'I have read and agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>',
        'signup.submit': '🚀 Create Account',
        'signup.login': 'Already have an account? <a href="#" onclick="alert(\'Login coming soon!\')">Login now</a>',
        'signup.socialText': 'Or sign up with',
        'signup.successTitle': 'Registration Successful!',
        'signup.successMessage1': 'Welcome to the Learn Chinese community!',
        'signup.successMessage2': 'We have sent a verification email to your inbox.',
        'signup.startLearning': 'Start Learning Chinese →',
        
        // Footer
        'footer.copyright': '© 2025 Learn Chinese. All rights reserved.',
        'footer.slogan': 'Let the world hear the voice of Chinese!'
    }
};

let currentLanguage = 'zh-CN';

// 初始化翻译功能
function initTranslation() {
    // 创建翻译按钮
    const translateBtn = document.createElement('a');
    translateBtn.href = '#';
    translateBtn.id = 'translate-btn';
    translateBtn.className = 'translate-btn';
    translateBtn.innerHTML = 'English';
    translateBtn.onclick = toggleLanguage;
    
    // 添加到导航栏
    const navMenu = document.querySelector('.menu');
    if (navMenu) {
        navMenu.appendChild(translateBtn);
    }
    
    // 为所有元素添加翻译属性
    applyTranslations(currentLanguage);
}

// 切换语言
function toggleLanguage(e) {
    if (e) e.preventDefault();
    
    currentLanguage = currentLanguage === 'zh-CN' ? 'en' : 'zh-CN';
    applyTranslations(currentLanguage);
    
    // 更新按钮文本
    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.innerHTML = currentLanguage === 'zh-CN' ? 'English' : '中文';
    }
}

// 应用翻译
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = lang;
}

// 页面加载完成后初始化翻译
document.addEventListener('DOMContentLoaded', initTranslation);
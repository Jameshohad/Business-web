// 测验数据
const questions = [
    {
        question: "“你好” in English means?",
        options: ["Goodbye", "Hello", "Thank you"],
        answer: "Hello"
    },
    {
        question: "How do you say 'Thank you' in Chinese?",
        options: ["对不起", "谢谢", "再见"],
        answer: "谢谢"
    },
    {
        question: "What does '再见' mean?",
        options: ["Hello", "Goodbye", "Please"],
        answer: "Goodbye"
    },
    {
        question: "How do you say 'I love you' in Chinese?",
        options: ["我爱你", "你好", "谢谢"],
        answer: "我爱你"
    },
    {
        question: "What does '谢谢' mean?",
        options: ["Sorry", "Thank you", "Goodbye"],
        answer: "Thank you"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// DOM元素
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');

// 初始化测验
function initQuiz() {
    loadQuestion();
    updateProgress();
}

// 加载问题
function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    
    // 创建选项按钮
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
    
    // 重置反馈和按钮状态
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    selectedOption = null;
}

// 选择答案
function selectAnswer(choice) {
    if (selectedOption !== null) return; // 防止重复选择
    
    selectedOption = choice;
    const question = questions[currentQuestion];
    const buttons = optionsElement.querySelectorAll('button');
    
    // 禁用所有按钮
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });
    
    // 显示正确/错误样式
    buttons.forEach(btn => {
        if (btn.textContent === question.answer) {
            btn.classList.add('correct');
        } else if (btn.textContent === choice && choice !== question.answer) {
            btn.classList.add('wrong');
        }
    });
    
    // 更新分数和显示反馈
    if (choice === question.answer) {
        score++;
        feedbackElement.textContent = "✅ 正确！";
        feedbackElement.style.color = "#4CAF50";
    } else {
        feedbackElement.textContent = `❌ 错误！正确答案是: ${question.answer}`;
        feedbackElement.style.color = "#f44336";
    }
    
    // 显示下一题按钮
    nextButton.style.display = 'inline-block';
}

// 下一题
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// 更新进度
function updateProgress() {
    progressElement.textContent = `问题 ${currentQuestion + 1} / ${questions.length}`;
}

// 显示结果
function showResults() {
    questionElement.textContent = "测验完成！";
    optionsElement.innerHTML = '';
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    
    scoreElement.textContent = `🎯 最终得分: ${score} / ${questions.length}`;
    scoreElement.style.display = 'block';
    
    // 根据分数显示不同消息
    let message = '';
    if (score === questions.length) {
        message = "太棒了！你是中文大师！🌟";
    } else if (score >= questions.length * 0.7) {
        message = "做得很好！继续加油！👍";
    } else {
        message = "再接再厉！继续学习会更好的！💪";
    }
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.marginTop = '20px';
    messageElement.style.fontSize = '20px';
    messageElement.style.fontWeight = 'bold';
    scoreElement.parentNode.insertBefore(messageElement, scoreElement.nextSibling);
}

// 重置测验
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    scoreElement.style.display = 'none';
    initQuiz();
}

// 添加重置按钮
const resetButton = document.createElement('button');
resetButton.textContent = "重新开始测验";
resetButton.className = "next-btn";
resetButton.style.marginTop = "20px";
resetButton.style.backgroundColor = "#2196F3";
resetButton.addEventListener('click', resetQuiz);
document.querySelector('.quiz').appendChild(resetButton);

// 页面加载完成后初始化测验
document.addEventListener('DOMContentLoaded', initQuiz);
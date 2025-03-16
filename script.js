document.addEventListener('DOMContentLoaded', function() {
    const thoughtInput = document.getElementById('thoughtInput');
    const saveButton = document.getElementById('saveButton');
    const thoughtsList = document.getElementById('thoughtsList');
    
    // 加载已保存的想法
    loadThoughts();
    
    // 保存按钮点击事件
    saveButton.addEventListener('click', function() {
        saveThought();
    });
    
    // 保存想法到 localStorage
    function saveThought() {
        const thoughtText = thoughtInput.value.trim();
        if (thoughtText === '') return;
        
        const now = new Date();
        const thought = {
            id: Date.now(),
            content: thoughtText,
            date: now.toISOString()
        };
        
        // 获取已有的想法
        let thoughts = JSON.parse(localStorage.getItem('thoughts') || '[]');
        
        // 添加新想法
        thoughts.unshift(thought);
        
        // 保存回 localStorage
        localStorage.setItem('thoughts', JSON.stringify(thoughts));
        
        // 清空输入框
        thoughtInput.value = '';
        
        // 重新加载想法列表
        loadThoughts();
    }
    
    // 从 localStorage 加载想法
    function loadThoughts() {
        const thoughts = JSON.parse(localStorage.getItem('thoughts') || '[]');
        thoughtsList.innerHTML = '';
        
        if (thoughts.length === 0) {
            thoughtsList.innerHTML = '<p>还没有记录想法，开始写下你的第一个想法吧！</p>';
            return;
        }
        
        thoughts.forEach(thought => {
            const date = new Date(thought.date);
            const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            const thoughtElement = document.createElement('div');
            thoughtElement.className = 'thought-card';
            thoughtElement.innerHTML = `
                <div class="thought-date">${formattedDate}</div>
                <div class="thought-content">${thought.content}</div>
                <div class="thought-actions">
                    <button class="delete-btn" data-id="${thought.id}">删除</button>
                </div>
            `;
            
            thoughtsList.appendChild(thoughtElement);
        });
        
        // 添加删除按钮事件
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteThought(id);
            });
        });
    }
    
    // 删除想法
    function deleteThought(id) {
        let thoughts = JSON.parse(localStorage.getItem('thoughts') || '[]');
        thoughts = thoughts.filter(thought => thought.id !== id);
        localStorage.setItem('thoughts', JSON.stringify(thoughts));
        loadThoughts();
    }
});

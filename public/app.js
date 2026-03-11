const fileInput = document.getElementById('file-upload');
const fileName = document.getElementById('file-name');
const uploadBtn = document.getElementById('upload-btn');
const uploadStatus = document.getElementById('upload-status');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let isUploading = false;

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    }
};

uploadBtn.onclick = async () => {
    if (!fileInput.files[0] || isUploading) return;

    isUploading = true;
    uploadBtn.textContent = 'Indexing...';
    uploadStatus.textContent = 'Processing document...';
    uploadStatus.style.color = '#94A3B8';

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            uploadStatus.textContent = '✅ Document ready!';
            uploadStatus.style.color = '#10B981';
            userInput.disabled = false;
            sendBtn.disabled = false;
            appendMessage('system', 'Knowledge base updated. You can now ask questions about this document.');
        } else {
            throw new Error(data.error || 'Upload failed');
        }
    } catch (error) {
        uploadStatus.textContent = '❌ Error: ' + error.message;
        uploadStatus.style.color = '#EF4444';
    } finally {
        isUploading = false;
        uploadBtn.textContent = 'Index Document';
    }
};

sendBtn.onclick = async () => {
    const question = userInput.value.trim();
    if (!question) return;

    appendMessage('user', question);
    userInput.value = '';

    // Typing indicator
    const aiMsgId = 'ai-' + Date.now();
    appendMessage('ai', 'Thinking...', aiMsgId);

    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        const data = await response.json();

        const aiMsgElement = document.getElementById(aiMsgId);
        if (response.ok) {
            aiMsgElement.textContent = data.answer;
        } else {
            aiMsgElement.textContent = 'Sorry, I encountered an error: ' + (data.error || 'Unknown error');
        }
    } catch (error) {
        document.getElementById(aiMsgId).textContent = 'Connection error. Is the server running?';
    }
};

userInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendBtn.click();
};

function appendMessage(role, text, id = null) {
    const div = document.createElement('div');
    div.className = `message ${role}`;
    if (id) div.id = id;
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

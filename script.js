const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const fileItems = document.querySelectorAll('.file-item');
const tabs = document.querySelectorAll('.tab');
const codeBlock = document.getElementById('codeBlock');
const langSelect = document.querySelector('.lang-select');

let dark = true;

const files = {
  'index.js': `function greet(name) {
  return \`Hello, \${name}\`;
}

console.log(greet("CodeCollab"));`,

  'style.css': `body {
  background: #0f172a;
  color: white;
  font-family: sans-serif;
}`,

  'README.md': `# CodeCollab

A collaborative code editor UI built using HTML, CSS and JavaScript.`
};

themeBtn.addEventListener('click', () => {
  dark = !dark;

  if (!dark) {
    body.style.background = '#dbeafe';
    document.querySelector('.app').style.background = '#f8fafc';
    themeBtn.textContent = '☀';
  } else {
    body.style.background = '#030712';
    document.querySelector('.app').style.background = '#080d16';
    themeBtn.textContent = '☾';
  }
});

// File Switching
fileItems.forEach(item => {
  item.addEventListener('click', () => {
    fileItems.forEach(f => f.classList.remove('active'));
    item.classList.add('active');

    const fileName = item.querySelector('.file-name').textContent;

    codeBlock.textContent = files[fileName];

    tabs.forEach(tab => {
      tab.classList.remove('active');

      if (tab.textContent === fileName) {
        tab.classList.add('active');
      }
    });
  });
});

// Typing Simulation
let typing = false;

function fakeTyping(text) {
  if (typing) return;

  typing = true;
  codeBlock.textContent = '';

  let i = 0;

  const interval = setInterval(() => {
    codeBlock.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      typing = false;
    }
  }, 12);
}

// Language Switcher
langSelect.addEventListener('change', (e) => {
  const lang = e.target.value;

  if (lang === 'Python') {
    fakeTyping(`def greet(name):
    return f"Hello, {name}"

print(greet("CodeCollab"))`);
  }

  else if (lang === 'C++') {
    fakeTyping(`#include <iostream>
using namespace std;

int main() {
   cout << "Hello CodeCollab";
}`);
  }

  else {
    fakeTyping(files['index.js']);
  }
});

// Live collaborator simulation
const collaboratorNames = ['Chahat is typing...', 'Nikita saved changes', 'README updated'];
const liveText = document.querySelector('.live-text');

let index = 0;

setInterval(() => {
  liveText.textContent = collaboratorNames[index];
  index = (index + 1) % collaboratorNames.length;
}, 3000);
// Injects the dynamic background HTML into the body if not already present
export function injectDynamicBackground() {
  if (document.querySelector('.background')) return;
  const bg = document.createElement('div');
  bg.className = 'background';
  for (let i = 1; i <= 10; i++) {
    const span = document.createElement('span');
    bg.appendChild(span);
  }
  document.body.prepend(bg);
}

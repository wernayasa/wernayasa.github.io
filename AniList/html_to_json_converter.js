function convertHtmlToJson(htmlElement) {
  // Ambil semua karakter dari HTML
  const characters = Array.from(document.querySelectorAll('.role-card')).map(card => {
    const character = card.querySelector('.character');
    const staff = card.querySelector('.staff');
    
    return {
      id: character.querySelector('a')?.href.split('/').pop() || '',
      img: character.querySelector('img')?.src || '',
      name: character.querySelector('.name')?.textContent || '',
      role: character.querySelector('.role')?.textContent || '',
      url: character.querySelector('a')?.href || '',
      voice_actors: staff ? [{
        id: staff.querySelector('a')?.href.split('/').pop() || '',
        img: staff.querySelector('img')?.src || '',
        name: staff.querySelector('.name')?.textContent || '',
        language: staff.querySelector('.role')?.textContent.toUpperCase() || '',
        url: staff.querySelector('a')?.href || ''
      }] : []
    };
  });

  // Tampilkan hasil JSON dalam textarea
  const textArea = document.createElement('textarea');
  textArea.value = JSON.stringify(characters, null, 2);
  textArea.style.width = '100%';
  textArea.style.height = '500px';
  textArea.style.fontFamily = 'monospace';
  
  // Ganti konten HTML dengan textarea
  htmlElement.innerHTML = '';
  htmlElement.appendChild(textArea);
}

// Tambahkan tombol konversi
document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.createElement('button');
  convertBtn.textContent = 'Convert to JSON';
  convertBtn.className = 'text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded';
  convertBtn.onclick = () => {
    const content = document.querySelector('.grid');
    if (content) {
      convertHtmlToJson(content);
    }
  };
  
  // Tambahkan tombol ke halaman
  document.querySelector('h2')?.parentNode.insertBefore(convertBtn, document.querySelector('h2'));
});

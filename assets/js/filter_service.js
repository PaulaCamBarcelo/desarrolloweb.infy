
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('search-form');
  const resetButton = document.getElementById('reset-button');
  const noResultsMessage = document.getElementById('no-results-message');
  const services = document.querySelectorAll('.service-item');

  function highlightKeyword(element, keyword) {
    if (!keyword) return;

    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    const nodes = element.querySelectorAll("*:not(script):not(style)");

    nodes.forEach(node => {
      if (node.children.length === 0 && regex.test(node.textContent)) {
        node.innerHTML = node.textContent.replace(regex, '<mark class="highlight">$1</mark>');
      }
    });
  }

  function clearHighlights() {
    document.querySelectorAll('mark.highlight').forEach(mark => {
      mark.outerHTML = mark.innerText;
    });
  }

  function filterServices(keyword, selectedCategory) {
    let matchFound = false;

    services.forEach(service => {
      const title = service.querySelector('h4')?.innerText.toLowerCase() || '';
      const content = service.innerText.toLowerCase();
      const category = service.dataset.service?.toLowerCase();

      const keywordLower = keyword.toLowerCase().trim();
      const categoryLower = selectedCategory.toLowerCase();

      const matchesKeyword = keywordLower === '' || title.includes(keywordLower) || content.includes(keywordLower);
      const matchesCategory = categoryLower === 'todos' || category === categoryLower;

      if (matchesKeyword && matchesCategory) {
        service.style.display = 'block';
        highlightKeyword(service, keywordLower);
        matchFound = true;
      } else {
        service.style.display = 'none';
      }
    });

    noResultsMessage.style.display = matchFound ? 'none' : 'block';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const keyword = form.keyword.value;
    const selectedCategory = form.Category.value;

    clearHighlights();
    filterServices(keyword, selectedCategory);
  });

  resetButton.addEventListener('click', function () {
    form.reset();
    clearHighlights();
    noResultsMessage.style.display = 'none';

    services.forEach(service => {
      service.style.display = 'block';
    });
  });
});


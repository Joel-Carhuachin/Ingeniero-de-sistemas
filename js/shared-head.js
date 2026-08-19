(function() {
    // Get parameters from data attributes
    const title = document.querySelector('script[data-title]').getAttribute('data-title') || 'Joel CARHUACHIN';
    const pageCss = document.querySelector('script[data-page-css]').getAttribute('data-page-css') || '';
    
    // Common head elements (always included)
    const commonElements = [
        `<meta charset="UTF-8">`,
        `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
        `<link rel="stylesheet" href="css/style.css">`,
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`
    ].join('\n');
    
    // Inject common elements
    document.head.innerHTML = commonElements;
    
    // Set title
    document.title = title;
    
    // Add page-specific CSS if provided
    if (pageCss) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = pageCss;
        document.head.appendChild(cssLink);
    }
})();
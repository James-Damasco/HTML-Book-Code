export interface Chapter {
    id: string;
    number: number;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'locked';
    completedLessons: number;
    totalLessons: number;
    tagsCovered: string[];
}

export interface LessonMeta {
    id: string;
    chapterId: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: string;
    status: 'completed' | 'in-progress' | 'not-started' | 'locked';
    progress: number;
    tags: string[];
}

export interface HowItWorksItem {
    line: string;
    code: string;
    explanation: string;
}

export interface Mistake {
    id: string;
    title: string;
    description: string;
    fix?: string;
}

export interface Lesson extends LessonMeta {
    chapter: string;
    explanation: string;
    syntax: string;
    example: string;
    howItWorks: HowItWorksItem[];
    commonMistakes: Mistake[];
    relatedTags: string[];
    tryItYourself: string;
}

export const chapters: Chapter[] = [
    {
        id: 'ch-1',
        number: 1,
        title: 'HTML Fundamentals',
        description: 'Learn what HTML is, how it works, and the basic structure of every HTML document.',
        status: 'completed',
        completedLessons: 6,
        totalLessons: 6,
        tagsCovered: ['<!DOCTYPE>', '<html>', '<head>', '<title>', '<body>', '<!-- -->'],
    },
    {
        id: 'ch-2',
        number: 2,
        title: 'Document Structure',
        description: 'Understand how to properly structure an HTML document with metadata and essential tags.',
        status: 'completed',
        completedLessons: 4,
        totalLessons: 4,
        tagsCovered: ['<meta>', '<link>', '<script>', '<style>'],
    },
    {
        id: 'ch-3',
        number: 3,
        title: 'Text & Formatting',
        description: 'Master headings, paragraphs, and all the text formatting tags HTML provides.',
        status: 'active',
        completedLessons: 4,
        totalLessons: 5,
        tagsCovered: ['<h1>–<h6>', '<p>', '<br>', '<hr>', '<strong>', '<em>', '<mark>', '<small>', '<del>', '<ins>', '<sub>', '<sup>'],
    },
    {
        id: 'ch-4',
        number: 4,
        title: 'Links',
        description: 'Create hyperlinks to other pages, sections, emails, and downloadable files.',
        status: 'active',
        completedLessons: 2,
        totalLessons: 3,
        tagsCovered: ['<a>', 'href', 'target', 'download'],
    },
    {
        id: 'ch-5',
        number: 5,
        title: 'Images & Media',
        description: 'Embed images, audio, video, and iframes into your HTML documents.',
        status: 'active',
        completedLessons: 2,
        totalLessons: 4,
        tagsCovered: ['<img>', '<audio>', '<video>', '<source>', '<iframe>'],
    },
    {
        id: 'ch-6',
        number: 6,
        title: 'Lists',
        description: 'Create ordered, unordered, and description lists to organize content.',
        status: 'locked',
        completedLessons: 0,
        totalLessons: 2,
        tagsCovered: ['<ul>', '<ol>', '<li>', '<dl>', '<dt>', '<dd>'],
    },
    {
        id: 'ch-7',
        number: 7,
        title: 'Tables',
        description: 'Build HTML tables to display structured, tabular data.',
        status: 'locked',
        completedLessons: 0,
        totalLessons: 3,
        tagsCovered: ['<table>', '<tr>', '<th>', '<td>', '<thead>', '<tbody>', '<tfoot>'],
    },
    {
        id: 'ch-8',
        number: 8,
        title: 'Forms',
        description: 'Create interactive forms with inputs, buttons, and validation attributes.',
        status: 'locked',
        completedLessons: 0,
        totalLessons: 5,
        tagsCovered: ['<form>', '<input>', '<label>', '<textarea>', '<select>', '<button>'],
    },
    {
        id: 'ch-9',
        number: 9,
        title: 'Semantic HTML',
        description: 'Write meaningful HTML using semantic elements that improve accessibility and SEO.',
        status: 'locked',
        completedLessons: 0,
        totalLessons: 4,
        tagsCovered: ['<header>', '<nav>', '<main>', '<section>', '<article>', '<aside>', '<footer>', '<figure>'],
    },
    {
        id: 'ch-10',
        number: 10,
        title: 'HTML5 Features',
        description: 'Explore modern HTML5 elements including canvas, SVG, dialogs, and data attributes.',
        status: 'locked',
        completedLessons: 0,
        totalLessons: 5,
        tagsCovered: ['<canvas>', '<svg>', '<details>', '<summary>', '<dialog>', 'data-*'],
    },
];

const lessonsMeta: LessonMeta[] = [
    // Chapter 1
    { id: 'l-1-1', chapterId: 'ch-1', title: 'What is HTML?', description: 'Understand what HTML is, what it stands for, and why it is the foundation of every webpage.', difficulty: 'easy', duration: '5 min', status: 'completed', progress: 100, tags: ['HTML', 'web'] },
    { id: 'l-1-2', chapterId: 'ch-1', title: 'How HTML Works', description: 'Learn how a browser reads and renders HTML into a visible webpage.', difficulty: 'easy', duration: '6 min', status: 'completed', progress: 100, tags: ['browser', 'rendering'] },
    { id: 'l-1-3', chapterId: 'ch-1', title: 'HTML Document Structure', description: 'Discover the skeleton of every HTML document — DOCTYPE, html, head, and body.', difficulty: 'easy', duration: '8 min', status: 'completed', progress: 100, tags: ['<!DOCTYPE>', '<html>', '<head>', '<body>'] },
    { id: 'l-1-4', chapterId: 'ch-1', title: 'HTML Elements & Tags', description: 'Learn the difference between elements and tags, and how opening and closing tags work.', difficulty: 'easy', duration: '7 min', status: 'completed', progress: 100, tags: ['elements', 'tags'] },
    { id: 'l-1-5', chapterId: 'ch-1', title: 'HTML Attributes', description: 'Add extra information to HTML elements using attributes like class, id, and style.', difficulty: 'easy', duration: '6 min', status: 'completed', progress: 100, tags: ['attributes', 'class', 'id'] },
    { id: 'l-1-6', chapterId: 'ch-1', title: 'HTML Comments', description: 'Write notes in your HTML code that are invisible to users but helpful for developers.', difficulty: 'easy', duration: '4 min', status: 'completed', progress: 100, tags: ['<!-- -->'] },
    // Chapter 2
    { id: 'l-2-1', chapterId: 'ch-2', title: 'The <head> Element', description: 'Learn what belongs inside the <head> tag and how it affects your webpage.', difficulty: 'easy', duration: '6 min', status: 'completed', progress: 100, tags: ['<head>', '<title>', '<meta>'] },
    { id: 'l-2-2', chapterId: 'ch-2', title: 'Meta Tags', description: 'Use <meta> tags to set character encoding, viewport, and page descriptions.', difficulty: 'easy', duration: '7 min', status: 'completed', progress: 100, tags: ['<meta>', 'charset', 'viewport'] },
    { id: 'l-2-3', chapterId: 'ch-2', title: 'Linking CSS & JavaScript', description: 'Connect external stylesheets and scripts to your HTML document.', difficulty: 'easy', duration: '8 min', status: 'completed', progress: 100, tags: ['<link>', '<script>'] },
    { id: 'l-2-4', chapterId: 'ch-2', title: 'HTML vs CSS vs JavaScript', description: 'Understand the role of each technology in building a complete webpage.', difficulty: 'easy', duration: '5 min', status: 'completed', progress: 100, tags: ['HTML', 'CSS', 'JS'] },
    // Chapter 3
    { id: 'l-3-1', chapterId: 'ch-3', title: 'Headings (h1–h6)', description: 'Use heading tags to organize content and create a clear document hierarchy.', difficulty: 'easy', duration: '6 min', status: 'completed', progress: 100, tags: ['<h1>', '<h2>', '<h3>'] },
    { id: 'l-3-2', chapterId: 'ch-3', title: 'Paragraphs & Line Breaks', description: 'Create text blocks with <p> and control line breaks with <br>.', difficulty: 'easy', duration: '5 min', status: 'completed', progress: 100, tags: ['<p>', '<br>', '<hr>'] },
    { id: 'l-3-3', chapterId: 'ch-3', title: 'Bold & Italic Text', description: 'Make text bold with <strong> or <b>, and italic with <em> or <i>.', difficulty: 'easy', duration: '5 min', status: 'completed', progress: 100, tags: ['<strong>', '<b>', '<em>', '<i>'] },
    { id: 'l-3-4', chapterId: 'ch-3', title: 'Text Decoration Tags', description: 'Underline, highlight, strikethrough, and use subscript/superscript text.', difficulty: 'easy', duration: '7 min', status: 'completed', progress: 100, tags: ['<u>', '<mark>', '<del>', '<ins>', '<sub>', '<sup>'] },
    { id: 'l-3-5', chapterId: 'ch-3', title: 'Inline vs Block Elements', description: 'Understand the fundamental difference between block and inline HTML elements.', difficulty: 'medium', duration: '9 min', status: 'in-progress', progress: 65, tags: ['<div>', '<span>', 'block', 'inline'] },
    // Chapter 4
    { id: 'l-4-1', chapterId: 'ch-4', title: 'Creating Links with <a>', description: 'Use the anchor tag to create clickable hyperlinks to other pages and websites.', difficulty: 'easy', duration: '7 min', status: 'completed', progress: 100, tags: ['<a>', 'href'] },
    { id: 'l-4-2', chapterId: 'ch-4', title: 'Link Targets & Types', description: 'Control where links open using the target attribute, and create email and download links.', difficulty: 'medium', duration: '8 min', status: 'in-progress', progress: 30, tags: ['target', '_blank', 'mailto:', 'download'] },
    { id: 'l-4-3', chapterId: 'ch-4', title: 'Anchor Links', description: 'Create links that jump to a specific section of the same page using id attributes.', difficulty: 'medium', duration: '6 min', status: 'not-started', progress: 0, tags: ['id', '#anchor', 'href'] },
    // Chapter 5
    { id: 'l-5-1', chapterId: 'ch-5', title: 'Adding Images with <img>', description: 'Embed images in your HTML using the <img> tag with src and alt attributes.', difficulty: 'easy', duration: '8 min', status: 'completed', progress: 100, tags: ['<img>', 'src', 'alt', 'width', 'height'] },
    { id: 'l-5-2', chapterId: 'ch-5', title: 'Image Attributes', description: 'Control image size, accessibility, and loading behavior with HTML attributes.', difficulty: 'easy', duration: '6 min', status: 'in-progress', progress: 50, tags: ['alt', 'width', 'height', 'loading'] },
    { id: 'l-5-3', chapterId: 'ch-5', title: 'Audio & Video', description: 'Embed audio and video files directly into your HTML page without plugins.', difficulty: 'medium', duration: '10 min', status: 'not-started', progress: 0, tags: ['<audio>', '<video>', '<source>', 'controls'] },
    { id: 'l-5-4', chapterId: 'ch-5', title: 'Embedding with <iframe>', description: 'Embed other webpages, maps, or videos inside your page using iframe.', difficulty: 'medium', duration: '8 min', status: 'not-started', progress: 0, tags: ['<iframe>', 'src', 'sandbox'] },
    // Chapters 6–10 locked
    { id: 'l-6-1', chapterId: 'ch-6', title: 'Unordered & Ordered Lists', description: 'Create bulleted and numbered lists with <ul>, <ol>, and <li>.', difficulty: 'easy', duration: '6 min', status: 'locked', progress: 0, tags: ['<ul>', '<ol>', '<li>'] },
    { id: 'l-6-2', chapterId: 'ch-6', title: 'Description Lists', description: 'Build definition/description lists using <dl>, <dt>, and <dd>.', difficulty: 'easy', duration: '5 min', status: 'locked', progress: 0, tags: ['<dl>', '<dt>', '<dd>'] },
    { id: 'l-7-1', chapterId: 'ch-7', title: 'Creating Tables', description: 'Build data tables using <table>, <tr>, <th>, and <td>.', difficulty: 'medium', duration: '10 min', status: 'locked', progress: 0, tags: ['<table>', '<tr>', '<th>', '<td>'] },
    { id: 'l-7-2', chapterId: 'ch-7', title: 'Table Sections', description: 'Organize tables with <thead>, <tbody>, and <tfoot>.', difficulty: 'medium', duration: '7 min', status: 'locked', progress: 0, tags: ['<thead>', '<tbody>', '<tfoot>'] },
    { id: 'l-7-3', chapterId: 'ch-7', title: 'colspan & rowspan', description: 'Merge table cells across columns and rows with colspan and rowspan.', difficulty: 'hard', duration: '9 min', status: 'locked', progress: 0, tags: ['colspan', 'rowspan'] },
    { id: 'l-8-1', chapterId: 'ch-8', title: 'HTML Forms Basics', description: 'Create user input forms with the <form> element and basic input fields.', difficulty: 'medium', duration: '10 min', status: 'locked', progress: 0, tags: ['<form>', '<input>', '<label>'] },
    { id: 'l-8-2', chapterId: 'ch-8', title: 'Input Types', description: 'Explore all HTML5 input types: text, email, password, number, date, color, and more.', difficulty: 'medium', duration: '12 min', status: 'locked', progress: 0, tags: ['type=text', 'type=email', 'type=password', 'type=date'] },
    { id: 'l-8-3', chapterId: 'ch-8', title: 'Textarea & Select', description: 'Create multi-line text inputs and dropdown menus.', difficulty: 'medium', duration: '8 min', status: 'locked', progress: 0, tags: ['<textarea>', '<select>', '<option>'] },
    { id: 'l-8-4', chapterId: 'ch-8', title: 'Form Validation Attributes', description: 'Use required, minlength, maxlength, pattern and min/max for client-side validation.', difficulty: 'hard', duration: '10 min', status: 'locked', progress: 0, tags: ['required', 'pattern', 'minlength', 'maxlength'] },
    { id: 'l-8-5', chapterId: 'ch-8', title: 'Buttons', description: 'Create submit, reset, and custom buttons with the <button> element.', difficulty: 'easy', duration: '6 min', status: 'locked', progress: 0, tags: ['<button>', 'type=submit', 'type=reset'] },
    { id: 'l-9-1', chapterId: 'ch-9', title: 'Semantic HTML Introduction', description: 'Learn why semantic HTML matters for accessibility, SEO, and code readability.', difficulty: 'medium', duration: '8 min', status: 'locked', progress: 0, tags: ['semantic', 'accessibility', 'SEO'] },
    { id: 'l-9-2', chapterId: 'ch-9', title: 'Page Structure Tags', description: 'Use <header>, <nav>, <main>, and <footer> to structure your page semantically.', difficulty: 'medium', duration: '9 min', status: 'locked', progress: 0, tags: ['<header>', '<nav>', '<main>', '<footer>'] },
    { id: 'l-9-3', chapterId: 'ch-9', title: 'Content Tags', description: 'Organize content with <section>, <article>, <aside>, <figure>, and <figcaption>.', difficulty: 'medium', duration: '10 min', status: 'locked', progress: 0, tags: ['<section>', '<article>', '<aside>', '<figure>'] },
    { id: 'l-9-4', chapterId: 'ch-9', title: 'Complete Semantic Page', description: 'Build a full webpage using only semantic HTML5 elements.', difficulty: 'hard', duration: '15 min', status: 'locked', progress: 0, tags: ['semantic', '<header>', '<main>', '<footer>'] },
    { id: 'l-10-1', chapterId: 'ch-10', title: 'HTML5 Canvas', description: 'Draw graphics, charts, and animations using the <canvas> element and JavaScript.', difficulty: 'hard', duration: '12 min', status: 'locked', progress: 0, tags: ['<canvas>', 'JavaScript', 'drawing'] },
    { id: 'l-10-2', chapterId: 'ch-10', title: 'SVG in HTML', description: 'Embed scalable vector graphics directly into HTML for crisp icons and illustrations.', difficulty: 'hard', duration: '10 min', status: 'locked', progress: 0, tags: ['<svg>', '<circle>', '<rect>', '<path>'] },
    { id: 'l-10-3', chapterId: 'ch-10', title: 'Details & Summary', description: 'Create collapsible content sections without JavaScript using <details> and <summary>.', difficulty: 'medium', duration: '6 min', status: 'locked', progress: 0, tags: ['<details>', '<summary>'] },
    { id: 'l-10-4', chapterId: 'ch-10', title: 'HTML Dialog Element', description: 'Build native modal dialogs using the <dialog> element.', difficulty: 'medium', duration: '8 min', status: 'locked', progress: 0, tags: ['<dialog>', 'open', 'showModal()'] },
    { id: 'l-10-5', chapterId: 'ch-10', title: 'Data Attributes', description: 'Store custom data on HTML elements using data-* attributes.', difficulty: 'medium', duration: '7 min', status: 'locked', progress: 0, tags: ['data-*', 'dataset', 'JavaScript'] },
];

const lessonsDetail: Record<string, Lesson> = {
    'l-1-3': {
        ...lessonsMeta.find((l) => l.id === 'l-1-3')!,
        chapter: 'Chapter 1 — HTML Fundamentals',
        explanation: `Every HTML document follows the same basic structure. Think of it like a house — it needs a foundation, walls, and a roof before you can put furniture inside.\n\nThe structure starts with a DOCTYPE declaration that tells the browser this is an HTML5 document. Then comes the <html> element which wraps everything. Inside that, we have two main sections: the <head> (invisible information about the page) and the <body> (the visible content).`,
        syntax: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Page Title</title>
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>`,
        example: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>`,
        howItWorks: [
            { line: '1', code: '<!DOCTYPE html>', explanation: 'Tells the browser this is an HTML5 document. Always the very first line.' },
            { line: '2', code: '<html lang="en">', explanation: 'The root element that wraps the entire page. lang="en" tells browsers and screen readers the language is English.' },
            { line: '3', code: '<head>', explanation: 'Opens the head section. Content here is NOT shown on the page — it contains meta-information.' },
            { line: '4', code: '<meta charset="UTF-8">', explanation: 'Sets the character encoding to UTF-8, allowing special characters like é, ü, and emoji to display correctly.' },
            { line: '5', code: '<title>My First Webpage</title>', explanation: 'Sets the text shown in the browser tab and bookmarks. Always include a descriptive title.' },
            { line: '6', code: '</head>', explanation: 'Closes the head section.' },
            { line: '7', code: '<body>', explanation: 'Opens the body section. Everything visible on the webpage goes inside here.' },
            { line: '8', code: '<h1>Hello, World!</h1>', explanation: 'A level-1 heading — the most important heading on the page. There should only be one <h1> per page.' },
            { line: '9', code: '<p>This is my first HTML page.</p>', explanation: 'A paragraph element. Use <p> for all regular text content.' },
            { line: '10', code: '</body>', explanation: 'Closes the body section.' },
            { line: '11', code: '</html>', explanation: 'Closes the html root element. This is always the last line of an HTML document.' },
        ],
        commonMistakes: [
            { id: 'm-1', title: 'Forgetting the DOCTYPE', description: 'Without <!DOCTYPE html>, browsers may render the page in "quirks mode" causing layout issues.', fix: 'Always start with <!DOCTYPE html> on line 1.' },
            { id: 'm-2', title: 'Putting content outside <body>', description: 'Visible content placed outside the <body> tag may not render correctly across all browsers.', fix: 'All visible content must go inside <body>...</body>.' },
            { id: 'm-3', title: 'Nesting tags incorrectly', description: 'Tags must be closed in reverse order. <b><i>text</b></i> is wrong.', fix: '<b><i>text</i></b> — close the inner tag first.' },
        ],
        relatedTags: ['<!DOCTYPE>', '<html>', '<head>', '<meta>', '<title>', '<body>'],
        tryItYourself: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Practice Page</title>
  </head>
  <body>
    <h1>Welcome to My Page</h1>
    <p>Edit this code and click Run to see the result!</p>
  </body>
</html>`,
    },
    'l-3-1': {
        ...lessonsMeta.find((l) => l.id === 'l-3-1')!,
        chapter: 'Chapter 3 — Text & Formatting',
        explanation: `HTML provides six levels of headings, from <h1> (most important) to <h6> (least important). Headings create a visual hierarchy that helps readers scan your page and helps search engines understand your content structure.\n\nThink of headings like a book: <h1> is the book title, <h2> is chapter titles, <h3> is section titles, and so on. Never skip heading levels — go in order.`,
        syntax: `<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Sub-subsection</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>`,
        example: `<h1>HTML Headings</h1>
<h2>Chapter 1: Getting Started</h2>
<h3>1.1 What is HTML?</h3>
<p>HTML stands for HyperText Markup Language.</p>
<h3>1.2 Why Learn HTML?</h3>
<p>HTML is the foundation of every webpage on the internet.</p>
<h2>Chapter 2: Basic Tags</h2>
<h3>2.1 The Paragraph Tag</h3>`,
        howItWorks: [
            { line: '1', code: '<h1>HTML Headings</h1>', explanation: 'The main page title. Should appear only once per page. Largest and most important heading.' },
            { line: '2', code: '<h2>Chapter 1: Getting Started</h2>', explanation: 'A major section heading. Use <h2> for top-level sections within the page.' },
            { line: '3', code: '<h3>1.1 What is HTML?</h3>', explanation: 'A subsection within Chapter 1. <h3> is one level below <h2>.' },
            { line: '4', code: '<p>HTML stands for...</p>', explanation: 'Regular paragraph text following the heading.' },
            { line: '7', code: '<h2>Chapter 2: Basic Tags</h2>', explanation: 'A second major section. Note we return to <h2> — not <h4> or <h5>.' },
        ],
        commonMistakes: [
            { id: 'm-1', title: 'Using multiple <h1> tags', description: 'Each page should have exactly one <h1> tag for SEO and accessibility.', fix: 'Use <h1> once for the page title, then <h2> for sections.' },
            { id: 'm-2', title: 'Skipping heading levels', description: 'Jumping from <h2> directly to <h5> breaks the document outline.', fix: 'Always use headings in sequential order: h1, h2, h3...' },
            { id: 'm-3', title: 'Using headings just for styling', description: 'Headings should represent document structure, not just make text bigger.', fix: 'Use CSS for font size. Use headings for document hierarchy.' },
        ],
        relatedTags: ['<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>', '<p>'],
        tryItYourself: `<h1>My Website</h1>
<h2>About Me</h2>
<p>Write something about yourself here.</p>
<h2>My Hobbies</h2>
<h3>Coding</h3>
<p>I love learning HTML!</p>
<h3>Reading</h3>
<p>Books are great.</p>`,
    },
    'l-4-1': {
        ...lessonsMeta.find((l) => l.id === 'l-4-1')!,
        chapter: 'Chapter 4 — Links',
        explanation: `The <a> (anchor) element creates hyperlinks — the clickable text or images that take you from one page to another. The most important attribute is href, which stands for "Hypertext Reference" and contains the URL of the destination.\n\nLinks can point to external websites, other pages on your site, sections on the same page, email addresses, and downloadable files.`,
        syntax: `<a href="URL">Link Text</a>

<!-- External link -->
<a href="https://www.example.com">Visit Example</a>

<!-- Internal link -->
<a href="about.html">About Us</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send Email</a>`,
        example: `<p>Visit <a href="https://www.wikipedia.org">Wikipedia</a> to learn more.</p>

<p>Go to our <a href="about.html">About Page</a>.</p>

<p>Questions? <a href="mailto:help@example.com">Email us</a>!</p>

<p>
  <a href="report.pdf" download>Download the Report (PDF)</a>
</p>`,
        howItWorks: [
            { line: '1', code: '<a href="https://www.wikipedia.org">', explanation: 'Opens an anchor tag. The href attribute holds the full URL of the destination page.' },
            { line: '1b', code: 'Wikipedia', explanation: 'This is the visible link text — what the user sees and clicks on.' },
            { line: '1c', code: '</a>', explanation: 'Closes the anchor tag. Everything between <a> and </a> becomes the clickable link.' },
            { line: '3', code: '<a href="about.html">', explanation: 'An internal link using a relative path. "about.html" refers to a file in the same folder.' },
            { line: '5', code: '<a href="mailto:help@example.com">', explanation: 'A mailto: link. Clicking it opens the user\'s default email app with the address pre-filled.' },
            { line: '8', code: 'download', explanation: 'The download attribute tells the browser to download the file instead of opening it.' },
        ],
        commonMistakes: [
            { id: 'm-1', title: 'Missing https:// on external links', description: 'Writing href="www.google.com" without https:// creates a relative link that goes nowhere.', fix: 'Always include https:// for external links: href="https://www.google.com"' },
            { id: 'm-2', title: 'Forgetting the closing </a> tag', description: 'Without </a>, everything after the opening tag becomes part of the link.', fix: 'Always close: <a href="...">Link Text</a>' },
            { id: 'm-3', title: 'Using empty or "#" hrefs without purpose', description: 'href="#" scrolls to the top of the page, which is often unintended.', fix: 'Use a real URL or a proper anchor ID like href="#section-2"' },
        ],
        relatedTags: ['<a>', 'href', 'target', 'download', 'mailto:'],
        tryItYourself: `<h2>My Favourite Links</h2>
<ul>
  <li><a href="https://www.google.com">Google</a></li>
  <li><a href="https://www.github.com">GitHub</a></li>
  <li><a href="mailto:me@example.com">Email Me</a></li>
</ul>

<p><a href="myfile.pdf" download>Download My File</a></p>`,
    },
    'l-5-1': {
        ...lessonsMeta.find((l) => l.id === 'l-5-1')!,
        chapter: 'Chapter 5 — Images & Media',
        explanation: `The <img> tag embeds an image into your HTML page. Unlike most HTML tags, <img> is a self-closing tag — it doesn't need a closing tag.\n\nThe two required attributes are src (the path to the image file) and alt (alternative text for screen readers and when the image fails to load).`,
        syntax: `<img src="image.jpg" alt="Description of image">

<!-- With width and height -->
<img src="photo.png" alt="A sunset over the ocean" width="400" height="300">

<!-- From a URL -->
<img src="https://example.com/logo.png" alt="Company logo">`,
        example: `<h2>My Photo Gallery</h2>

<img src="https://picsum.photos/300/200" alt="A random beautiful landscape photo" width="300" height="200">

<p>Caption: A beautiful landscape.</p>

<img src="https://picsum.photos/150/150" alt="A square sample photo" width="150" height="150">`,
        howItWorks: [
            { line: '1', code: '<img', explanation: 'Opens the image tag. Note: <img> has no closing tag — it is a void element.' },
            { line: '1b', code: 'src="https://picsum.photos/300/200"', explanation: 'The src attribute holds the path or URL to the image file. The browser fetches this file and displays it.' },
            { line: '1c', code: 'alt="A random beautiful landscape photo"', explanation: 'Alt text describes the image for screen readers and appears if the image fails to load. Always write descriptive alt text.' },
            { line: '1d', code: 'width="300" height="200"', explanation: 'Sets the display size in pixels. Setting both prevents layout shift while the image loads.' },
            { line: '1e', code: '>', explanation: 'Closes the self-closing <img> tag. No </img> needed.' },
        ],
        commonMistakes: [
            { id: 'm-1', title: 'Missing alt attribute', description: 'Omitting alt makes your page inaccessible to screen reader users and fails validation.', fix: 'Always include alt="description". For decorative images use alt="".' },
            { id: 'm-2', title: 'Wrong file path in src', description: 'If the image path is wrong, a broken image icon appears.', fix: 'Double-check the file path. Use browser DevTools to see the exact error.' },
            { id: 'm-3', title: 'Not setting width and height', description: 'Without dimensions, the page layout shifts when the image loads, causing a poor user experience.', fix: 'Always set width and height attributes matching the image\'s natural dimensions.' },
        ],
        relatedTags: ['<img>', 'src', 'alt', 'width', 'height', '<figure>', '<figcaption>'],
        tryItYourself: `<h2>My Image</h2>
<img
  src="https://picsum.photos/320/180"
  alt="A sample landscape image"
  width="320"
  height="180"
>
<p>Try changing the width and height values above!</p>`,
    },
};

// Fill in remaining lessons with minimal detail so they can be rendered
lessonsMeta.forEach((meta) => {
    if (!lessonsDetail[meta.id]) {
        lessonsDetail[meta.id] = {
            ...meta,
            chapter: chapters.find((c) => c.id === meta.chapterId)?.title
                ? `Chapter ${chapters.find((c) => c.id === meta.chapterId)!.number} — ${chapters.find((c) => c.id === meta.chapterId)!.title}`
                : 'HTML Code Book',
            explanation: `${meta.description}\n\nThis lesson covers the ${meta.tags.join(', ')} tags in detail with practical examples.`,
            syntax: `<!-- ${meta.title} syntax -->\n${meta.tags.map((t) => `${t}`).join('\n')}`,
            example: `<!-- ${meta.title} example -->\n<div>\n  <p>Example for ${meta.title}</p>\n</div>`,
            howItWorks: [
                { line: '1', code: `<!-- ${meta.title} -->`, explanation: `This lesson covers ${meta.title}.` },
            ],
            commonMistakes: [
                { id: `${meta.id}-m1`, title: 'Forgetting to close tags', description: 'Always close your HTML tags to avoid unexpected rendering issues.', fix: 'Use a validator to check your HTML.' },
            ],
            relatedTags: meta.tags,
            tryItYourself: `<!-- Try ${meta.title} here -->\n<h2>${meta.title}</h2>\n<p>Edit this code and click Run!</p>`,
        };
    }
});

export function getLessonsForChapter(chapterId: string): LessonMeta[] {
    return lessonsMeta.filter((l) => l.chapterId === chapterId);
}

export function getLessonById(id: string): Lesson | undefined {
    return lessonsDetail[id];
}

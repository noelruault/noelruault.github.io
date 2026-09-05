export default (config, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${config.title}</title>
<meta name="description" content="${config.description}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="style.css">
<noscript><style>.fa-reveal{opacity:1 !important;transform:none !important}</style></noscript>
</head>
<body class="bg-fa-paper text-fa-ink antialiased">

${body}

<script src="main.js"></script>
</body>
</html>
`;

export default (config, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${config.title}</title>
<meta name="description" content="${config.description}">
<link rel="icon" href="data:,">
<link rel="stylesheet" href="style.css">
</head>
<body class="ct-body h-dvh overflow-hidden bg-ct-dark font-ct-sans text-ct-light antialiased" data-view="projects">

${body}

<script src="main.js"></script>
</body>
</html>
`;

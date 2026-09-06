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
<body class="bg-lk-navy text-white antialiased">
<svg width="0" height="0" class="absolute" aria-hidden="true"><defs>
<linearGradient id="lk-metal" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${config.theme.metal[0]}"/><stop offset="1" stop-color="${config.theme.metal[1]}"/>
</linearGradient>
</defs></svg>

${body}

</body>
</html>
`;

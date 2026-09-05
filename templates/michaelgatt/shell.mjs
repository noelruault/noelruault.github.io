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
<body class="mg-body h-dvh overflow-hidden bg-black font-mg-serif text-white antialiased">
<noscript>
<style>
.mg-intro { display: none; }
.mg-reveal { opacity: 1 !important; }
.mg-chrome { opacity: 1 !important; }
</style>
</noscript>

${body}

<script src="main.js"></script>
</body>
</html>
`;

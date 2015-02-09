requirejs.config({
  baseUrl: '../',
  paths: {
    app: 'js/app',
    jquery: 'lib/jquery/jquery',
    bootstrap: 'lib/bootstrap/bootstrap',
    math: 'lib/mathjs/math.min',
    react: 'lib/react/react',
    text: 'js/lib/text',
    JSXTransformer: 'js/lib/JSXTransformer',
    jsx: 'js/lib/jsx',
  },
  shim: {
    'bootstrap': ['jquery'],
  },
  jsx: {
    fileExtension: '.jsx'
  },
});

require(['jsx!js/app/main']);

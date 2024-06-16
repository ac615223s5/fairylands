module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './collections/_widgets/*.{html,md,markdown}',
    './*.{html,md,markdown}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'arial':['arial'],
        'opensans':["open sans", "Verdana", "sans-serif"],
        'poppins':['poppins'],
        'forte':['forte'],
      },
      colors: {
        'brightpurple': '#bf49ff',
        'brightpink': '#f37fff',
      }
    },
  },
  corePlugins: {
  },
  plugins: []
}
module.exports = {
  // chainWebpack: config => {
  //   config.plugin('html').tap(args => {
  //     args[0].title = 'Where in the world';
  //     return args;
  //   });
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};

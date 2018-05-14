module.exports = function () {

    var config = {

        allTs: './src/**/!(*.d).ts',
        allCSS: './src/**/*.css',
        allImages: './src/app/assets/images/**/*',
        allSCSS: './src/**/*.scss',
        allHTML: './src/**/*.html',
        allPhpFiles: './src/app/assets/php/**/*',
        tslint: './tslint-rules.json',
        tsOutputPath: './dist/',
        imagesOutputPath: './dist/app/assets/images/',
        phpOutputPath: './dist/app/assets/php',
        excluded: '!./src/system-config.ts'
    };

    return config;
};

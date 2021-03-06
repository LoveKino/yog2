var fis = module.exports = require('fis');

// 让 yogurt 打头的先加载。
fis.require.prefixes.unshift('yog2');
fis.require.prefixes.unshift('yogurt');

fis.cli.name = 'yog2';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.help.commands = ['init', 'install', 'release'];

fis.config.set('template', '/views');
fis.config.set('app', '/app');
fis.config.set('static', '/static');
fis.config.set('config', '/conf');

// 配置插件，引入less、fis-components等功能
fis.config.set('modules.parser.less', 'less');
fis.config.set('modules.preprocessor.tpl', 'components, extlang');
fis.config.set('modules.postprocessor.tpl', 'require-async');
fis.config.set('modules.postprocessor.js', 'jswrapper, require-async');

fis.config.set('settings.postprocessor.jswrapper.type', 'amd');
fis.config.set('roadmap.ext.less', 'css');
fis.config.set('component.dir', '/client/components');

var clientRoadmap = [{
    reg: /^\/client\/components\/(.*\.js)$/i,
    isMod: true,
    id: 'components/$1',
    release: '${static}/${namespace}/components/$1'
}, {
    reg: /^\/client\/widget\/(.+\.tpl)$/i,
    isMod: true,
    id: 'widget/$1',
    url: '${namespace}/widget/$1',
    release: '${template}/${namespace}/widget/$1'
}, {
    reg: /^\/client\/widget\/(.*\.js)$/i,
    isMod: true,
    id: 'widget/$1',
    release: '${static}/${namespace}/widget/$1'
}, {
    reg: /^\/client\/page\/(.+\.tpl)$/i,
    isMod: true,
    id: 'page/$1',
    url: '${namespace}/page/$1',
    release: '${template}/${namespace}/page/$1',
    extras: {
        isPage: true
    }
}, {
    reg: /^\/client\/test\/(.*)/i,
    useMap: false,
    release: '/test/${namespace}/$1'
}, {
    reg: '/client/server.conf',
    useMap: false,
    release: '${config}/server.conf'
}, {
    reg: /^\/client\/(.*)/i,
    id: '$1',
    release: '${static}/${namespace}/$1'
}];

var serverRoadmap = [{
    reg: /^\/server\/(.+)/i,
    useMap: false,
    useCompile: false,
    useHash: false,
    useDomain: false,
    release: '${app}/${namespace}/$1'
}];

var commonRoadmap = [{
    reg: "**.sh",
    release: false
}, {
    reg: '${namespace}-map.json',
    release: '${config}/fis/${namespace}-map.json'
}, {
    reg: '**',
    release: '${static}/${namespace}/$&'
}];

fis.config.set('roadmap.path', clientRoadmap.concat(serverRoadmap).concat(commonRoadmap));
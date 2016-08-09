module.exports = {
  root: true,
  "env": {
    "browser": true,
    "node": true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
   "indent": [ //缩进两个空格
        "error",
        2
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "quotes": [ //单引号
        "error",
        "single"
    ],
    "semi": [
        "warn",
        "never"
    ],
    "no-console": 1,
    "no-alert": 1,
    "no-unused-vars": 1,    //定义的变量未使用
    "no-empty-function": 1, //不允许空函数
    "no-multi-spaces": 2,   //等号两遍空格数对称
    "no-cond-assign": 2,    //条件判断中不能出现赋值
    "no-undef": 2,          //变量未定义
    "no-native-reassign": 2,//禁止覆盖原生对象
    "no-floating-decimal": 1,//禁止浮点数 .1 2.写法
    "no-loop-func": 1,      //禁止在循环中定义函数
    "no-void": 2,           //禁用void
    "no-with": 2,           //禁用with
    "space-infix-ops": 2,   //操作符后有空格
    "comma-style": ["error", "last"],   //数组,对象元素的逗号在同一行
    "space-in-parens": ["error", "never"], //
    "key-spacing": ["error", { "beforeColon": false }], //关键词前空格
    "array-bracket-spacing": [2, "never"],  //数组两侧[ ]无空格
    "brace-style": ["error", "stroustrup"], //大括号换行
    "no-dupe-args": "error",    //函数参数多余
    "no-inner-declarations": ["error", "both"], //函数或者变量的声明要放在程序的最外层或者另一个函数体内
    "comma-spacing": [
        "error",
        {
            "before": false,
            "after": true
        }
    ],                      //逗号后面有空格
    "space-before-function-paren": [
        "error",
        "never"
    ],
    "keyword-spacing": [
        "error",
        {
            "before": true,
            "after": true
        }
    ],                      //关键词前后空格
    "yield-star-spacing": [
        "error",
        {
            "before": true,
            "after": false
        }
      ],                     //yeild星号位置
    "comma-dangle": ["error", "never"], //数组,对象中最后一个元素之后的逗号
    "generator-star-spacing": ["error", "after"], //generator星号位置
    "valid-jsdoc": 1,        //jsdoc
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

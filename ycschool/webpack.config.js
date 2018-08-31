const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
    	header: './src/js/header/header.js',
    	footer: './src/js/footer/footer.js',
    	login: './src/js/login/login.js',
    	search: './src/js/search/search.js',
        index: './src/js/index/index.js',

        // 在线题库
        onlinequestionbank:'./src/js/onlinequestionbank/onlinequestionbank.js',

        // 文化社区
        uploadImg:'./src/js/culturalcommunity/upload.js',
        culturalcommunity: './src/js/culturalcommunity/culturalcommunity.js',
        askquestion:'./src/js/culturalcommunity/askquestion.js',
        askteacherquestion:'./src/js/culturalcommunity/askteacherquestion.js',
        replydetail:'./src/js/culturalcommunity/replydetail.js',
        questionlist:'./src/js/culturalcommunity/questionlist.js',
        parentclass:'./src/js/culturalcommunity/parentclass.js',
        parentingarticle:'./src/js/culturalcommunity/parentingarticle.js',

        // 老师个人空间
        teacherlist:'./src/js/teacherqzone/teacherlist.js',
        teacherindex:'./src/js/teacherqzone/teacherindex.js',
        teachermicroclass:'./src/js/teacherqzone/teachermicroclass.js',
        teacheractivity:'./src/js/teacherqzone/teacheractivity.js',
        teacherresource:'./src/js/teacherqzone/teacherresource.js',
        teacherphoto:'./src/js/teacherqzone/teacherphoto.js',

        // 老师个人中心
        teachercenter:'./src/js/teachercenter/teachercenter.js',
        arrangetaskPop:'./src/js/teachercenter/arrangetaskPop.js',
        selectquestionPop:'./src/js/teachercenter/selectquestionPop.js',
        phototaskPop:'./src/js/teachercenter/phototaskPop.js',
        batchimportquestion:'./src/js/teachercenter/batchimportquestion.js',
        uploadcourse:'./src/js/teachercenter/uploadcourse.js',
        uploadresource:'./src/js/teachercenter/uploadresource.js',
        teachercentercourse:'./src/js/teachercenter/teachercentercourse.js',
        teachercenterhomework:'./src/js/teachercenter/teachercenterhomework.js',
        teachercenterresource:'./src/js/teachercenter/teachercenterresource.js',
        teachercenteroffice:'./src/js/teachercenter/teachercenteroffice.js',
        addapply:'./src/js/teachercenter/addapply.js',
        teachercenterattendanc:'./src/js/teachercenter/teachercenterattendanc.js',
        namingdetail:'./src/js/teachercenter/namingdetail.js',
        recorddetail:'./src/js/teachercenter/recorddetail.js',
        teachercenterscore:'./src/js/teachercenter/teachercenterscore.js',
        teachercenterscoredetail:'./src/js/teachercenter/teachercenterscoredetail.js',
        teachercenteractivity:'./src/js/teachercenter/teachercenteractivity.js',
        teachercenteranswer:'./src/js/teachercenter/teachercenteranswer.js',
        creatediscuss:'./src/js/teachercenter/creatediscuss.js',
        updateachievement:'./src/js/teachercenter/updateachievement.js',
        teacherinf:'./src/js/teachercenter/teacherinf.js',
        tasktemplate:'./src/js/teachercenter/tasktemplate.js',
        
        
        tapplication:'./src/js/teachercenter/tapplication.js',
        task:'./src/js/teachercenter/task.js',
        myclass:'./src/js/teachercenter/myclass.js',
        hrecord:'./src/js/teachercenter/hrecord.js',
        pmeeting:'./src/js/teachercenter/pmeeting.js',
        

        learningactivity: './src/js/learningactivities/learningactivities.js',
        teachingactivities: './src/js/teachingactivities/teachingactivities.js',
        details: './src/js/teachingactivities/details.js',
        tdetails: './src/js/teachingactivities/tdetails.js',
        //教育教学
        digitalbooks:'./src/js/educationteaching/digitalbooks.js',
        bookdetails:'./src/js/educationteaching/bookdetails.js',
        //在线课堂
        onlineclassroom:'./src/js/onlineclassroom/onlineclassroom.js',
        onlineclassmore:'./src/js/onlineclassroom/onlineclassmore.js',
        
        material: './src/js/material/material.js',

        player:'./src/js/player/player.js',
        //学生中心
        studentcenter:'./src/js/studentcenter/studentcenter.js',
        study:'./src/js/studentcenter/study.js',
        checkwork:'./src/js/studentcenter/checkwork.js',
        evateaching:'./src/js/studentcenter/evateaching.js',
        homeschool:'./src/js/studentcenter/homeschool.js',
        userinf:'./src/js/studentcenter/userinf.js',
        modifypwd:'./src/js/studentcenter/modifypwd.js',
        activity:'./src/js/studentcenter/activity.js',
        answer:'./src/js/studentcenter/answer.js',
        workdetail:'./src/js/studentcenter/workdetail.js',
        taskresultsummary:'./src/js/studentcenter/taskresultsummary.js',
        taskresultdetail:'./src/js/studentcenter/taskresultdetail.js',
        application:'./src/js/studentcenter/application.js',
        
        
        //H5
        mtactivity:'./src/js/mobile/mtactivity.js',
        mactivity:'./src/js/mobile/mactivity.js',

    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{test: /\.(js|jsx)$/,use: 'babel-loader',},
                {test: /\.(htm|html)$/i,loader: 'html-withimg-loader'},
                {test: /\.css$/,use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{loader: 'css-loader',options: {minimize: true}}]})
                },
                {test: /\.scss/,use: ExtractTextPlugin.extract({
                    use: [{loader: 'css-loader',options: {minimize: true}}, {loader: 'sass-loader'}],
                    fallback: 'style-loader'})
                },
                {test: /\.less/,use: ExtractTextPlugin.extract({
                    use: [{loader: 'css-loader',options: {minimize: true}}, {loader: 'less-loader',}],
                    fallback: 'style-loader'})
                },
                {test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
                    use: [{loader: 'url-loader',
                    options: {limit: 5000, outputPath: 'images/',
                              name: '[name].[ext]?[hash]',
                              publicPath: '../images/',}}]
                }]
        },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),

        new HtmlWebpackPlugin({
            filename: 'header.html', //输出的html路径  
            template: './src/html/header/header.html', //html模板路径  
            inject: true,
            chunks: ['header'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'footer.html', //输出的html路径  
            template: './src/html/footer/footer.html', //html模板路径  
            inject: true,
            chunks: ['header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({
            filename: 'search.html', //输出的html路径  
            template: './src/html/search/search.html', //html模板路径  
            inject: true,
            chunks: ['search','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
              
        new HtmlWebpackPlugin({ //主页
            filename: 'index.html', //输出的html路径
            template: './src/html/index/index.html', //html模板路径
            inject: true,
            chunks: ['index','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //在线题库
            filename: 'onlinequestionbank.html', //输出的html路径
            template: './src/html/onlinequestionbank/onlinequestionbank.html', //html模板路径
            inject: true,
            chunks: ['onlinequestionbank','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区
            filename: 'cindex.html', //输出的html路径
            template: './src/html/culturalcommunity/cindex.html', //html模板路径
            inject: true,
            chunks: ['culturalcommunity','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--提积分问题
            filename: 'askquestion.html', //输出的html路径
            template: './src/html/culturalcommunity/askquestion.html', //html模板路径
            inject: true,
            chunks: ['uploadImg','header','footer','askquestion'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--向老师提问题
            filename: 'askteacherquestion.html', //输出的html路径
            template: './src/html/culturalcommunity/askteacherquestion.html', //html模板路径
            inject: true,
            chunks: ['uploadImg','header','footer','askteacherquestion'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--问题详情页
            filename: 'replydetail.html', //输出的html路径
            template: './src/html/culturalcommunity/replydetail.html', //html模板路径
            inject: true,
            chunks: ['uploadImg','header','footer','replydetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--等你来答列表页
            filename: 'questionlist.html', //输出的html路径
            template: './src/html/culturalcommunity/questionlist.html', //html模板路径
            inject: true,
            chunks: ['uploadImg','header','footer','questionlist'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--家庭课程列表页
            filename: 'parentclass.html', //输出的html路径
            template: './src/html/culturalcommunity/parentclass.html', //html模板路径
            inject: true,
            chunks: ['header','footer','parentclass'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //文化社区--育儿文章列表页
            filename: 'parentingarticle.html', //输出的html路径
            template: './src/html/culturalcommunity/parentingarticle.html', //html模板路径
            inject: true,
            chunks: ['header','footer','parentingarticle'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--名师列表
            filename: 'teacherlist.html', //输出的html路径
            template: './src/html/teacherqzone/teacherlist.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teacherlist'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--主页
            filename: 'teacherindex.html', //输出的html路径
            template: './src/html/teacherqzone/teacherindex.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teacherindex'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--微课
            filename: 'teachermicroclass.html', //输出的html路径
            template: './src/html/teacherqzone/teachermicroclass.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teachermicroclass'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--活动
            filename: 'teacheractivity.html', //输出的html路径
            template: './src/html/teacherqzone/teacheractivity.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teacheractivity'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--资源
            filename: 'teacherresource.html', //输出的html路径
            template: './src/html/teacherqzone/teacherresource.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teacherresource'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人空间--照片/视频页
            filename: 'teacherphoto.html', //输出的html路径
            template: './src/html/teacherqzone/teacherphoto.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teacherphoto'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心主页面
            filename: 'teachercenter.html', //输出的html路径
            template: './src/html/teachercenter/teachercenter.html', //html模板路径
            inject: true,
            chunks: ['header','footer','teachercenter'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--课程
            filename: 'teachercentercourse.html', //输出的html路径
            template: './src/html/teachercenter/teachercentercourse.html', //html模板路径
            inject: true,
            chunks: ['teachercentercourse'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--上传课程
            filename: 'uploadcourse.html', //输出的html路径
            template: './src/html/teachercenter/uploadcourse.html', //html模板路径
            inject: true,
            chunks: ['uploadcourse'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--资源
            filename: 'teachercenterresource.html', //输出的html路径
            template: './src/html/teachercenter/teachercenterresource.html', //html模板路径
            inject: true,
            chunks: ['teachercenterresource'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--上传资源
            filename: 'uploadresource.html', //输出的html路径
            template: './src/html/teachercenter/uploadresource.html', //html模板路径
            inject: true,
            chunks: ['uploadresource'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--考勤
            filename: 'teachercenterattendanc.html', //输出的html路径
            template: './src/html/teachercenter/teachercenterattendanc.html', //html模板路径
            inject: true,
            chunks: ['teachercenterattendanc'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--点名详情
            filename: 'namingdetail.html', //输出的html路径
            template: './src/html/teachercenter/namingdetail.html', //html模板路径
            inject: true,
            chunks: ['namingdetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--往期记录详情
            filename: 'recorddetail.html', //输出的html路径
            template: './src/html/teachercenter/recorddetail.html', //html模板路径
            inject: true,
            chunks: ['recorddetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--作业
            filename: 'teachercenterhomework.html', //输出的html路径
            template: './src/html/teachercenter/teachercenterhomework.html', //html模板路径
            inject: true,
            chunks: ['teachercenterhomework'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--作业模板页
            filename: 'tasktemplate.html', //输出的html路径
            template: './src/html/teachercenter/tasktemplate.html', //html模板路径
            inject: true,
            chunks: ['tasktemplate'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--布置作业弹窗
            filename: 'arrangetaskPop.html', //输出的html路径
            template: './src/html/teachercenter/arrangetaskPop.html', //html模板路径
            inject: true,
            chunks: ['arrangetaskPop'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--题库选题弹窗
            filename: 'selectquestionPop.html', //输出的html路径
            template: './src/html/teachercenter/selectquestionPop.html', //html模板路径
            inject: true,
            chunks: ['selectquestionPop'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--图片作业弹框
            filename: 'phototaskPop.html', //输出的html路径
            template: './src/html/teachercenter/phototaskPop.html', //html模板路径
            inject: true,
            chunks: ['uploadImg','phototaskPop'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--批量导题
            filename: 'batchimportquestion.html', //输出的html路径
            template: './src/html/teachercenter/batchimportquestion.html', //html模板路径
            inject: true,
            chunks: ['batchimportquestion'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--成绩
            filename: 'teachercenterscore.html', //输出的html路径
            template: './src/html/teachercenter/teachercenterscore.html', //html模板路径
            inject: true,
            chunks: ['teachercenterscore'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--成绩详情
            filename: 'teachercenterscoredetail.html', //输出的html路径
            template: './src/html/teachercenter/teachercenterscoredetail.html', //html模板路径
            inject: true,
            chunks: ['teachercenterscoredetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--办公
            filename: 'teachercenteroffice.html', //输出的html路径
            template: './src/html/teachercenter/teachercenteroffice.html', //html模板路径
            inject: true,
            chunks: ['teachercenteroffice'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--办公 添加申请
            filename: 'addapply.html', //输出的html路径
            template: './src/html/teachercenter/addapply.html', //html模板路径
            inject: true,
            chunks: ['addapply'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--教研
            filename: 'teachercenteractivity.html', //输出的html路径
            template: './src/html/teachercenter/teachercenteractivity.html', //html模板路径
            inject: true,
            chunks: ['teachercenteractivity'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--发起教研讨论
            filename: 'creatediscuss.html', //输出的html路径
            template: './src/html/teachercenter/creatediscuss.html', //html模板路径
            inject: true,
            chunks: ['creatediscuss'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--上传教研成果
            filename: 'updateachievement.html', //输出的html路径
            template: './src/html/teachercenter/updateachievement.html', //html模板路径
            inject: true,
            chunks: ['updateachievement'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--问答
            filename: 'teachercenteranswer.html', //输出的html路径
            template: './src/html/teachercenter/teachercenteranswer.html', //html模板路径
            inject: true,
            chunks: ['teachercenteranswer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //老师个人中心--个人信息
            filename: 'teacherinf.html', //输出的html路径
            template: './src/html/teachercenter/teacherinf.html', //html模板路径
            inject: true,
            chunks: ['teacherinf'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //学习活动
            filename: 'learningactivities.html', //输出的html路径
            template: './src/html/learningactivities/learningactivities.html', //html模板路径
            inject: true,
            chunks: ['learningactivity','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),

        new HtmlWebpackPlugin({ //login
            filename: 'login.html', //输出的html路径
            template: './src/html/login/login.html', //html模板路径
            inject: true,
            chunks: ['login'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),

        new HtmlWebpackPlugin({ //学校活动
            filename: 'teachingactivities.html', //输出的html路径
            template: './src/html/teachingactivities/teachingactivities.html', //html模板路径
            inject: true,
            chunks: ['teachingactivities','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //详情页
            filename: 'details.html', //输出的html路径
            template: './src/html/teachingactivities/details.html', //html模板路径
            inject: true,
            chunks: ['details','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //教学活动详情页
            filename: 'tdetails.html', //输出的html路径
            template: './src/html/teachingactivities/tdetails.html', //html模板路径
            inject: true,
            chunks: ['tdetails','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //数字图书
            filename: 'digitalbooks.html', //输出的html路径
            template: './src/html/educationteaching/digitalbooks.html', //html模板路径
            inject: true,
            chunks: ['digitalbooks','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //数字图书详情
            filename: 'bookdetails.html', //输出的html路径
            template: './src/html/educationteaching/bookdetails.html', //html模板路径
            inject: true,
            chunks: ['bookdetails','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //数字图书详情
            filename: 'miframe.html', //输出的html路径
            template: './src/html/educationteaching/miframe.html', //html模板路径
            inject: true,
            chunks: ['bookdetails','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //播发器
            filename: 'player.html', //输出的html路径
            template: './src/html/player/player.html', //html模板路径
            inject: true,
            chunks: ['player','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //播发器
            filename: 'material.html', //输出的html路径
            template: './src/html/material/material.html', //html模板路径
            inject: true,
            chunks: ['material','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),

      //学生中心Model
        new HtmlWebpackPlugin({ //学生中心
            filename: 'studentcenter.html', //输出的html路径
            template: './src/html/studentcenter/studentcenter.html', //html模板路径
            inject: true,
            chunks: ['studentcenter','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //学习
            filename: 'study.html', //输出的html路径
            template: './src/html/studentcenter/study.html', //html模板路径
            inject: true,
            chunks: ['study'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //学生个人中心--作业模板页
            filename: 'workdetail.html', //输出的html路径
            template: './src/html/studentcenter/workdetail.html', //html模板路径
            inject: true,
            chunks: ['workdetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //学生个人中心--作业报告页
            filename: 'taskresultsummary.html', //输出的html路径
            template: './src/html/studentcenter/taskresultsummary.html', //html模板路径
            inject: true,
            chunks: ['taskresultsummary'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //学生个人中心--作业解析页
            filename: 'taskresultdetail.html', //输出的html路径
            template: './src/html/studentcenter/taskresultdetail.html', //html模板路径
            inject: true,
            chunks: ['taskresultdetail'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //考勤
            filename: 'checkwork.html', //输出的html路径
            template: './src/html/studentcenter/checkwork.html', //html模板路径
            inject: true,
            chunks: ['checkwork'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //评教
            filename: 'evateaching.html', //输出的html路径
            template: './src/html/studentcenter/evateaching.html', //html模板路径
            inject: true,
            chunks: ['evateaching'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //家校
            filename: 'homeschool.html', //输出的html路径
            template: './src/html/studentcenter/homeschool.html', //html模板路径
            inject: true,
            chunks: ['homeschool'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //问答
            filename: 'answer.html', //输出的html路径
            template: './src/html/studentcenter/answer.html', //html模板路径
            inject: true,
            chunks: ['answer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //个人信息
            filename: 'studentinf.html', //输出的html路径
            template: './src/html/studentcenter/studentinf.html', //html模板路径
            inject: true,
            chunks: ['userinf'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new HtmlWebpackPlugin({ //修改密码
            filename: 'modifypwd.html', //输出的html路径
            template: './src/html/studentcenter/modifypwd.html', //html模板路径
            inject: true,
            chunks: ['modifypwd'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }), 
        new HtmlWebpackPlugin({ //活动
            filename: 'activity.html', //输出的html路径
            template: './src/html/studentcenter/activity.html', //html模板路径
            inject: true,
            chunks: ['activity'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }), 
        
        new HtmlWebpackPlugin({ //应用
            filename: 'application.html', //输出的html路径
            template: './src/html/studentcenter/application.html', //html模板路径
            inject: true,
            chunks: ['application'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }), 
        
        new HtmlWebpackPlugin({ //应用
            filename: 'tapplication.html', //输出的html路径
            template: './src/html/teachercenter/tapplication.html', //html模板路径
            inject: true,
            chunks: ['tapplication'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }), 
        
        new HtmlWebpackPlugin({ //考试
            filename: 'task.html', //输出的html路径
            template: './src/html/teachercenter/task.html', //html模板路径
            inject: true,
            chunks: ['task'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //考试
            filename: 'myclass.html', //输出的html路径
            template: './src/html/teachercenter/myclass.html', //html模板路径
            inject: true,
            chunks: ['myclass'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //考试
            filename: 'hrecord.html', //输出的html路径
            template: './src/html/teachercenter/hrecord.html', //html模板路径
            inject: true,
            chunks: ['myclass'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //考试
            filename: 'pmeeting.html', //输出的html路径
            template: './src/html/teachercenter/pmeeting.html', //html模板路径
            inject: true,
            chunks: ['myclass'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //在线课堂
            filename: 'onlineclassroom.html', //输出的html路径
            template: './src/html/onlineclassroom/onlineclassroom.html', //html模板路径
            inject: true,
            chunks: ['onlineclassroom','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),

        new HtmlWebpackPlugin({ //在线课堂
            filename: 'onlineclassmore.html', //输出的html路径
            template: './src/html/onlineclassroom/onlineclassmore.html', //html模板路径
            inject: true,
            chunks: ['onlineclassmore','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //mactivity
            filename: 'mactivity.html', //输出的html路径
            template: './src/html/mobile/mactivity.html', //html模板路径
            inject: true,
            chunks: ['mactivity','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
        new HtmlWebpackPlugin({ //mactivity
            filename: 'mtactivity.html', //输出的html路径
            template: './src/html/mobile/mtactivity.html', //html模板路径
            inject: true,
            chunks: ['mtactivity','header','footer'], //见entry
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        
    ],
};
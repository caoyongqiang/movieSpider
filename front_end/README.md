#豆瓣高分电影爬虫

------
#使用方法
1、初始化

```
git clone https://github.com/caoyongqiang/movieSpider.git && cd movieSpider/front-end

npm run init
```

2、配置

配置`server.config.js`与`spider.config.js`


3、构建并开始

```
npm run build

npm run start // Server runs at localhost:3000
```

4、数据库构建
a, 配置MySQL数据库
    创建表结构示例
        create table movies (
            id varchar(50) not null,
            title varchar(100) not null,
            rate varchar(10) not null,
            url varchar(100) not null,
            createdAt bigint not null,
            updatedAt bigint not null,
            version bigint not null,
            primary key (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
b, cd movieSpider/db
c,npm install
d,npm run build
e,npm run start

------
#配置
1、`spider.config.js`

- `cookie` [string]（必填项） : 自己在豆瓣上的cookie
- `tag` [string]（必填项）: 查询电影的类型
- `page_limit` [int]（必填项）: 每次查询的电影数（建议20）
- `sort` [string]（必填项）: 排序标准，可选'recommend','time','rank'
- `movie_amount` [int]（必填项）: 查询电影总数

2、`server.config.js`

- `socketPort` [number]（必填项） : 用于websocket的端口号
- `httpPort` [number]（必填项）: 用于http的端口号

#已知的BUG或者缺陷

1. 获取电影总数过多时，豆瓣会屏蔽爬取

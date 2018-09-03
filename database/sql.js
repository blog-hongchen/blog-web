module.exports = {
	"selectBlogTitle": "select * from blog where state=1;select * from blog where title like '%?%' or content like '%?%' and state=1 order by create_time desc limit ?,?;",
	"selectBlog": "select * from blog where state=1;select * from blog where state=1 order by create_time desc limit ?,?;",
	"selectAllBlog": "select * from blog where state=1;"
}
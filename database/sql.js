module.exports = {
	"selectBlogByTitle": "select * from blog where state=1;select * from blog where title like '%?%' or content like '%?%' and state=1 order by create_time desc limit ?,?;",
	"selectBlogList": "select * from blog where state=1;select * from blog where state=1 order by create_time desc limit ?,?;",
	"selectAllBlog": "select * from blog where state=1;",
	"updateBlog": "update blog set title = ? , article = ? , classification = ? where id = ?;",
	"selectBlog": "select * from blog where state=1 and id = ?"
}
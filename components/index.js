const fs = require("fs-extra");
const path = require("path");

fs.outputFile(
  path.join(process.cwd(), "dist", "index.html"),
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>汪站 | Wang Site</title>
    <link rel="stylesheet" href="../output.css">
</head>
<body>
	一条川渝混血咸鱼。不吃辣。浪掷五年于信息竞赛，换来赤裸的身体与坚定的心。摇滚热，V 家粉，不通音律。乒乓迷，底板碳素 190，双面反胶，正手省狂，反手白金，直横混打。半吊子足球运动员，伤病劝退。目前最喜欢的词是《鹧鸪天·西都作》
	<p>
		我是清都山水郎，天教分付与疏狂。曾批给雨支风券，累上留云借月章。<br>
		诗万首，酒千觞。几曾着眼看侯王？玉楼金阙慵归去，且插梅花醉洛阳。
	</p>
	<script src="../components/layout.js"></script>
</body>
</html>
`
);

//24時間起動に必要(web)
const http = require('http');
http.createServer(function (req, res) {
  res.write("login");
  res.end();
}).listen(8080);

//必要
const discord = require("discord.js");
const ytdl = require('ytdl-core');
const yt = require('yt-search');
const fetch = require("node-fetch")
const client = new discord.Client();
const prefix = 'b.'

//起動時にログに通知
client.on('ready', () => {
	console.log(`正常に起動しました\nバージョンは${discord.version}です`);
});

client.on("ready", () => {
  client.user.setActivity(prefix + 'help')
});

//起動通知
client.on('ready', ()  => {
	const embed = new discord.MessageEmbed()
		.setTitle('起動通知')
		.setDescription('正常に起動しました')
		.setTimestamp(new Date())
		.setColor(0x02d5ad6);
	const channel = client.channels.cache.get('869254281075757076');
	channel.send(embed);
});

//Fortniteアイテム検索
client.on("message", async message => {
  if (message.content.startsWith("b.item")) {
    const args = message.content.split(" ").slice(1).join("");
    if (!args) return message.channel.send({embed: {
      color: 0x0fc0303,
      title: 'エラー',
      description: 'アイテムを指定してください'
    }})
    let res = await fetch("https://fortnite-api.com/v2/cosmetics/br/search/all?name=" + encodeURIComponent(args) + "&matchMethod=starts&language=ja&searchLanguage=ja");
    if (!res.ok) return message.channel.send({embed: {
      color: 0x0fc0303,
      title: 'エラー',
      description: 'アイテムが見つかりません'
    }})
    res = await res.json();
    res.data.forEach(data => {
      message.channel.send(data.id)
    if (!res.status !== 200) return message.channel.send({embed: {
        color: 0x0fc0303,
        title: data.type.displayValue,
        thumbnail: {
          url: data.images.icon
        },
        fields: [
          {
            name: "アイテム名",
            value: data.name,
            inline: true
          },
          {
            name: "アイテムID",
            value: data.id,
            inline: true
          },
          {
            name: "説明",
            value: data.description,
            inline: true
          },
          {
            name: "レアリティ",
            value: data.rarity.displayValue,
            inline: true
          },
          {
            name: "導入日",
            value: data.introduction.text,
            inline: true
          },
        ]
      }});
    });
  }
});

//地震
client.on("message", async message => {
    if (message.content ==='b.eew') {
    let res = await fetch("https://api.p2pquake.net/v2/history?codes=551&codes")
    res = await res.json();
    message.channel.send(
      {embed: {
      color: 0x0fc0303,
      title: '地震速報',
      fields: [
        {
          name: '発生時刻',
          value: `${res[0].earthquake.time}`
        },
        {
          name: '震源地',
          value: `${res[0].earthquake.hypocenter.name}`
        },
        {
          name: '津波',
          value: `${res[0].earthquake.domesticTsunami}`
        },
        {
          name: '最大震度',
          value: `${res[0].earthquake.maxScale}`
        },
        {
          name: '震源の深さ',
          value: `${res[0].earthquake.hypocenter.depth}`
        },
        {
          name: 'マグニチュード',
          value: `${res[0].earthquake.hypocenter.magnitude}`
        },
        {
          name: '揺れを観測した地域',
          value: `${res[0].points[0].addr}:震度${res[0].points[0].scale}\n詳しく知りたい方は[こちら](https://www.nhk.or.jp/kishou-saigai/earthquake/)をご覧ください`
        },
      ]
    }}
    )
  }}
  );

//フォートナイトアイテムショップ
client.on('message', async msg => {
	 if (msg.content === 'b.shop') {
	  msg.channel.send(
      {embed: {
    color: 0x0fc0303,
    title: 'Fortniteアイテムショップ',
    image: {
    url:   'https://api.nitestats.com/v1/shop/image'
    }
  }}
);
}}
);

//フォートナイトマップ
client.on("message", async message => {
  if (message.content.startsWith("b.map")) {
    let res = await fetch("https://fortnite-api.com/v1/map?language=ja");
    res = await res.json();
	  message.channel.send(
      {embed: {
    color: 0x0fc0303,
    title: 'Fortniteマップ',
    image: {
    url:  `${res.data.images.pois}`
    }
  }}
  );
  }}
  );
  
//音楽
client.on('message', async message => {
     if (message.content.startsWith("b.play")){
       const channel = message.member.voice.channel
     if (!channel) return message.reply(
         {embed: {
             color: 0x0032cfc,
    description: 'エラー\nボイスチャンネルに接続して下さい'
  }}
);
     const connection = await channel.join()
     const msg = await message.channel.send(
    {embed: {
    color: 0x0032cfc,
    description: 'ボイスチャンネルに接続してます...'
  }}
);
     const AKB = message.content.split(" ").slice(1).join(" ")
     if (!AKB) return message.channel.send(
    {embed: {
      color: 0x0032cfc,
      title: 'エラー',
    description: '曲名を指定して下さい'
  }}
);
     const yts = require( 'yt-search' )
   msg.edit(
    {embed: {
    color: 0x0032cfc,
    description: '検索中...'
  }}
);
yts( AKB, function ( err, r ) {
const videos = r.videos
const playlists = r.playlists || r.lists
const channels = r.channels || r.accounts
  msg.edit(
      {embed: {
    color: 0x0fc0303,
    description: '以下を再生します'
  }}
);
    const video = r.videos[0];
    const stream = ytdl(ytdl.getURLVideoID(video.url), { filter: 'audioonly' })
    const dispatcher = connection.play(stream)
message.channel.send(
        {embed: {
    color: 0x0fc0303,
    description: `タイトル\n[${videos[ 0 ].title}](${videos[ 0 ].url})\n投稿者\n[${videos[ 0 ].author.name}](${videos[ 0 ].author.url})\n再生回数\n${videos[0].views}回\n再生時間\n${videos[ 0 ].duration}`
  }}
);
})}})

client.on('message', async message => {
  if (message.content.startsWith('b.p') && message.guild) {
    const url = message.content.split(' ')[1]
    const channel = message.member.voice.channel
    const connection = await channel.join()
    const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
    const dispatcher = connection.play(stream)
message.channel.send(
        {embed: {
    color: 0x0fc0303,
    description: '再生します'
  }}
);
  }
})

//ボイスチャンネルに接続
client.on('message', async message => {
  if (message.content.startsWith('b.join') && message.guild) {
  const channel = message.member.voice.channel
  if (!channel) return message.reply(
      {embed: {
    color: 0x0fc0303,
     title: 'エラー',
    description: 'ボイスチャンネルに接続してください'
  }}
);
  const connection = await channel.join()
  message.channel.send(
        {embed: {
    color: 0x0032cfc,
    description: '接続\nボイスチャンネルに接続しました'
  }}
);
  }}
  );
  
  //ボイスチャンネルから切断
  client.on('message', async message => {
  if (message.content.startsWith('b.leave') && message.guild) {
  message.member.voice.channel.leave()
  message.channel.send(
        {embed: {
    color: 0x0fc0303,
    description: '切断\nボイスチャンネルから切断しました'
  }}
);
}}
);

//入力中の表示に必要
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  //YouTube検索
  client.on('message', async message => {
  if (message.content.startsWith("b.Search")){
  const AKB = message.content.split(" ").slice(1).join(" ")
  if (!AKB) return message.channel.send("```エラー\n空白に問題があるまたは内容を書いてません```");
  const yts = require( 'yt-search' )
  const msg = await message.channel.send(
    {embed: {
    color: 0x0032cfc,
    description: '検索中...'
  }}
);

message.channel.startTyping()
    await sleep(1000)
  yts( AKB, function ( err, r ) {

  message.channel.stopTyping()
  const videos = r.videos
  const playlists = r.playlists || r.lists
  const channels = r.channels || r.accounts
  msg.edit(
      {embed: {
    color: 0x0fc0303,
    description: `検索結果\n${videos[ 0 ].url}`
  }}
);
  })}})

  //メッセージ削除(指定)
  client.on("message", async message => {
    if (message.content.startsWith("b.clear")) {
      //コマンド
      if (!message.member.hasPermission("ADMINISTRATOR"))　return message.channel.send(
                {embed: {
    color: 0x0fc0303,
    description: 'エラー\n管理者専用コマンドです'
  }}
  );
      const args = message.content.split(" ").slice(1).join("");
      if (!args) return message.channel.send(
        {embed: {
    color: 0x0fc0303,
    description: 'エラー\n空白に問題または数字を書いてません'
  }}
  );
      const messages = await message.channel.messages.fetch({ limit: args });
      message.channel.bulkDelete(messages);
      const sdsd = await message.channel.send(
            {embed: {
    color: 0x0fc0303,
    description: args + "件のメッセージを削除しました"
  }}
          );
          sdsd;
      }
  });

//NGワード
client.on('message', (message) =>{
    if (message.author.bot) return;
 if (message.content.match(/死ね|シネ|しね/)) {
	const embed = new discord.MessageEmbed()
		.setTitle('NGワード')
		.setDescription(`**送信者** : ${message.author.username}`)
		.addField("鯖",`${message.guild.name}`)
		.addField("チャンネル",`${message.channel.name}`)
		.addField("メッセージ",`${message.content}`)
		.setTimestamp(new Date())
		.setColor(0x02d5ad6);
	message.channel.send(embed);
  message.delete()
}
})

//メッセージ削除
client.on("messageReactionAdd", (reaction, user) => {
  if(reaction.emoji.name == '❌'){
    reaction.message.delete()
    .then(() => console.log("メッセージの削除に成功しました"))
    .catch(err => console.log(`削除にエラーが発生しました:${err}`));
  }
});

  //招待発行
  client.on("message", async message => {
    if (message.content.startsWith("b.invite")) {
      const args = message.content.split(" ").slice(1).join("");
      if (!args) return message.channel.send(
        {embed: {
    color: 0x0fc0303,
    title: 'エラー',
    description: 'IDを指定してください'
  }}
  );
      const sdsd = await message.channel.send(
            {embed: {
    color: 0x0fc0303,
    description: "botの招待リンクを発行しました\n[管理者権限付きで招待する](https://discord.com/oauth2/authorize?client_id=" + args + "&permissions=8&scope=bot)\n\n[権限を選択して招待する](https://discord.com/api/oauth2/authorize?client_id=" + args + "&permissions=2147483639&scope=bot)\n\n[権限なしで招待する](https://discord.com/api/oauth2/authorize?client_id=" + args + "&permissions=0&scope=bot)"
  }}
          );
          sdsd;
      }
  });

//replit検索
  client.on("message", async message => {
    if (message.content.startsWith("b.replit")) {
      const args = message.content.split(" ").slice(1).join("");
      if (!args) return message.channel.send(
        {embed: {
    color: 0x0fc0303,
    title: 'エラー',
    description: 'IDを指定してください'
  }}
  );
      const sdsd = await message.channel.send(
            {embed: {
    color: 0x0fc0303,
    description: "検索結果\nhttps://replit.com/@" + args
  }}
            );
          sdsd;
      }
  });

    //help
    client.on('message', message=> {
    if (message.content ==='b.help')
  message.channel.send(
    {embed: {
     color: 7506394,
      fields: [
      {
         name: "__help__",
         value: "b.ehelp - 地震の詳細を送信します\nb.info - botの情報を送信します\nb.play [曲名] - 音楽を再生します\nb.join - ボイスチャンネルに接続します\nb.leave - ボイスチャンネルから切断します\nb.Search [検索内容] - YouTubeでの検索します\nb.replit [ID] - replitのユーザーを検索します\nb.eew - 地震情報を送信します\nb.clear [消したい数] - メッセージを削除します\nb.invite [id] - 招待リンクを発行します\nb.item [アイテム名] - Fortniteのアイテムを検索します\nb.shop - Fortniteのアイテムショップを送信します\nb.map - Fortniteのマップを送信します"
        },
      ]
    }}
)});

//eewhelp
    client.on('message', message=> {
    if (message.content ==='b.ehelp')
  message.channel.send(
    {embed: {
     color: 7506394,
      fields: [
      {
         name: "地震詳細",
         value: "震度詳細\n0(なし),10(震度1),20(震度2),30(震度3),40(震度4),45(5弱),50(5強),55(6弱),60(6強),70(7)\n津波詳細\nNone(なし),Unknown(不明),Checking(調査中),NonEffective(若干の海面変動[被害の心配なし]),Watch(津波注意報),Warning(津波予報[種類不明])"
        },
      ]
    }}
)});

    //botの情報
    client.on('message', message=> {
    if (message.content ==='b.info')
  message.channel.send(
    {embed: {
     color: 7506394,
      fields: [
      {
         name: "__botの情報__",
         value: "バージョン:1.0.0\n作成者:[ぼうそうBOT#8380](https://mobile.twitter.com/bousouBOT1)\n公式鯖:[ぼうそうBOTの公式鯖](https://discord.gg/MrfAWR7kc9)\n現在の問題:なし\nお知らせ:一部のコマンドが使用できません\n予定:なし"
        },
      ]
    }}
)});

 //接続時に必要
client.login(process.env.TOKEN);
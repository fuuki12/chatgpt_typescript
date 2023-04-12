import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function ask(content: string, model = "gpt-4") {
  const response = await openai.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: content }],
  });

  const answer = response.data.choices[0].message?.content;
  console.log(`${answer}`);
}

const question = `
日本語の読解について質問があります。
[text]を読んで、質問への答えを書いてください。
[text]から質問に対する答えを推測できない場合は、「わかりません」と答えてください。

[text]
次の文章に誤字脱字があれば「はい」、なければ「いいえ」を答えてください。
「私の名前はソル・バッドガイです。 格闘ゲームで主人公をやらせてもらっています。得意技は「バンデッドブリンガー」です。よろしくお願いいたします。」
`;
ask(question);

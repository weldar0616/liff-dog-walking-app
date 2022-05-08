# [LIFFアプリ]犬の散歩報告
非公開のLINE公式アカウントに家族を招待。<br>
リッチメニューと連動したLIFFアプリで、犬の散歩に行ったことを家族へ簡単に共有することができる。

<img src="https://user-images.githubusercontent.com/46868883/164761775-b6ef745c-da3c-4bf7-9c57-73015020eeec.jpg" width="360px">

散歩当番を忘れやすいこと、また、散歩に行ったかどうかで発生する無駄なやり取りを回避することを目的に、<br>

以下の機能を備えたアプリを開発。
## 機能
- 散歩報告機能
    - スキップ報告機能
- 当番表確認機能
- 当番交換機能
- ~~設定変更機能~~
- ~~リマインド機能~~
## 技術スタック
### クライアント
- React ([Next.js](https://nextjs.org/))
- [TypeScript](https://www.typescriptlang.org/)
- [LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/)
- [Messaging API](https://developers.line.biz/ja/docs/messaging-api/)
- [Calendar API](https://developers.google.com/calendar/api)
- [MUI](https://mui.com/)
### API
- [AWS Lambda](https://aws.amazon.com/jp/lambda/)
- [Amazon API Gateway](https://aws.amazon.com/jp/api-gateway/)
### デプロイ / ホスティング
- [Vercel](https://vercel.com/)
- [GitHub Actions](https://github.co.jp/features/actions)
### テスティング
- [Jest](https://jestjs.io/ja/)
- [Cypress](https://www.cypress.io/)

---

当番交換機能

<img src="https://user-images.githubusercontent.com/46868883/167261034-ab9d476d-c250-4253-bb08-6dadf84411f5.gif" width="360px">

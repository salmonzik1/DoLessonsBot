# Telegram bot for organize your lessons ✨
Telegram bot for organize your lessons based on [grammY](https://grammy.dev) bot frameword und [MongoDB](https://mongodb.com) ORM

## Usage
Clone this repo via link
```bash
git clone https://github.com/fulltiltgg/DoLessonsBot
```
1. Install dependencies
```bash
yarn install
```
2. Create environment variables file

3. Choose beetwen `development` und `production` in `.env`

4. Run mongodb locally
<details>
	<summary>MongoDB</summary>
	1. Start MongoDB
	```bash
	sudo systemctl start mongod
	```
	2. Verify that service is running
	```bash
	sudo systemctl status mongod
	```
</details>

5. Run app
```bash
yarn start
```

## Environment variables reference
| Variable | Desciption |
| --- | --- |
| NODE_ENV | Node environment (`development,production`) |
| LOG_LEVEL | Log level (`trace,debug,info,warn,error,fatal,silent`) |
| BOT_SERVER_HOST | Server address |
| BOT_SERVER_POST | Server port |
| BOT_ALLOWED_UPDATES | List of [update types](https://core.telegram.org/bots/api#update) to receive |
| BOT_TOKEN | Telegram bot token, get it from [@BotFather](https://t.me/BotFather) |
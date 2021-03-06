import requests
import telegram
from telegram import Bot
from flask import render_template


class Messenger:
    def __init__(self, token, chat_id):
        self.bot_token = token
        self.chat_id = chat_id
        self.bot = Bot(self.bot_token)

    def send_simple_text(self, bot_message):
        send_text = 'https://api.telegram.org/bot' + self.bot_token + '/sendMessage?chat_id=' + self.chat_id + '&parse_mode=Markdown&text=' + bot_message

        response = requests.get(send_text)

        return response.json()

    def send_html(self, lead_json):
        # format the text using a jinja
        text = render_template('telegram_lead.html', information=lead_json)

        self.bot.send_message(chat_id=self.chat_id,
                              text=text,
                              parse_mode=telegram.ParseMode.HTML)
